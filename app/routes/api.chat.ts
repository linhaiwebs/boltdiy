import { type ActionFunctionArgs } from '@remix-run/node';
import type { ModelMessage, UIMessage } from 'ai';
import { MAX_RESPONSE_SEGMENTS, MAX_TOKENS } from '~/lib/.server/llm/constants';
import { CONTINUE_PROMPT } from '~/lib/.server/llm/prompts';
import { streamText, type StreamTextOptions } from '~/lib/.server/llm/stream-text';
import SwitchableStream from '~/lib/.server/llm/switchable-stream';
import { getBestAvailableProviderOnServer, isProviderAvailableOnServer } from '~/lib/.server/llm/provider-availability';
import { getDefaultModel } from '~/lib/.server/llm/model-config';
import type { AIProvider } from '~/lib/.server/llm/providers/types';

export async function loader() {
  return new Response('This endpoint only accepts POST requests', {
    status: 405,
    statusText: 'Method Not Allowed',
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}

export async function action(args: ActionFunctionArgs) {
  return chatAction(args);
}

function uiToModelMessages(uiMessages: UIMessage[]): ModelMessage[] {
  return uiMessages
    .filter((m) => m.role === 'user' || m.role === 'assistant')
    .map((m) => {
      const text = Array.isArray((m as any).parts)
        ? (m as any).parts
            .filter((p: any) => p?.type === 'text' && typeof p.text === 'string')
            .map((p: any) => p.text)
            .join('')
        : ((m as any).content ?? '');
      return { role: m.role as 'user' | 'assistant', content: text };
    });
}

async function chatAction({ request }: ActionFunctionArgs) {
  const body = (await request.json()) as any;
  const uiMessages = (body?.messages ?? []) as UIMessage[];
  const messages = uiToModelMessages(uiMessages);

  let fullModelId = body?.model as string | undefined;
  console.log(`[api.chat] Received model from request body: ${fullModelId}`);

  if (fullModelId) {
    const [provider] = fullModelId.split(':') as [AIProvider, string];
    if (!isProviderAvailableOnServer(provider)) {
      console.warn(`[api.chat] Provider ${provider} is not available (no API key). Falling back to best available provider.`);
      const fallbackProvider = getBestAvailableProviderOnServer();
      if (fallbackProvider) {
        const fallbackModel = getDefaultModel(fallbackProvider);
        if (fallbackModel) {
          fullModelId = `${fallbackProvider}:${fallbackModel.id}`;
          console.log(`[api.chat] Using fallback model: ${fullModelId}`);
        }
      }
    }
  } else {
    const fallbackProvider = getBestAvailableProviderOnServer();
    if (fallbackProvider) {
      const fallbackModel = getDefaultModel(fallbackProvider);
      if (fallbackModel) {
        fullModelId = `${fallbackProvider}:${fallbackModel.id}`;
        console.log(`[api.chat] No model specified, using: ${fullModelId}`);
      }
    }
  }

  const stream = new SwitchableStream();

  const createOnFinishHandler = (streamOptions: StreamTextOptions) => {
    return async ({ text: content, finishReason }: { text: string; finishReason: string }) => {
      if (finishReason !== 'length') {
        return stream.close();
      }

      if (stream.switches >= MAX_RESPONSE_SEGMENTS) {
        throw Error('Cannot continue message: Maximum segments reached');
      }

      const switchesLeft = MAX_RESPONSE_SEGMENTS - stream.switches;
      console.log(`Reached max token limit (${MAX_TOKENS}): Continuing message (${switchesLeft} switches left)`);

      messages.push({ role: 'assistant', content });
      messages.push({ role: 'user', content: CONTINUE_PROMPT });

      const continued = await streamText(messages, streamOptions);
      const continuedResp = continued.toUIMessageStreamResponse({ sendStart: false });

      return stream.switchSource(continuedResp.body!);
    };
  };

  try {
    const options: StreamTextOptions = {
      toolChoice: 'none',
      fullModelId,
    };

    options.onFinish = createOnFinishHandler(options);

    const result = await streamText(messages, options);
    const resp = result.toUIMessageStreamResponse();

    await stream.switchSource(resp.body!);

    return new Response(stream.readable, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'x-vercel-ai-data-stream': 'v1',
      },
    });
  } catch (error) {
    console.log(error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    if (errorMessage.includes('Missing API key')) {
      if (fullModelId) {
        console.log(`API key missing for selected model, falling back to default model`);

        try {
          const fallbackOptions: StreamTextOptions = {
            toolChoice: 'none',
          };

          fallbackOptions.onFinish = createOnFinishHandler(fallbackOptions);

          const result = await streamText(messages, fallbackOptions);
          const resp = result.toUIMessageStreamResponse();

          await stream.switchSource(resp.body!);

          return new Response(stream.readable, {
            status: 200,
            headers: {
              'Content-Type': 'text/plain; charset=utf-8',
              'x-vercel-ai-data-stream': 'v1',
            },
          });
        } catch (fallbackError) {
          console.error('Fallback to default model also failed:', fallbackError);
        }
      }

      throw new Response(errorMessage, {
        status: 401,
        statusText: 'API Key Missing',
      });
    }

    throw new Response(null, {
      status: 500,
      statusText: 'Internal Server Error',
    });
  }
}
