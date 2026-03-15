import { type ActionFunctionArgs } from '@remix-run/node';
import { streamText } from '~/lib/.server/llm/stream-text';
import { stripIndents } from '~/utils/stripIndent';

export async function action(args: ActionFunctionArgs) {
  return enhancerAction(args);
}

async function enhancerAction({ request }: ActionFunctionArgs) {
  const body = await request.json<{ message: string; model?: string }>();
  const { message } = body;

  const fullModelId = body?.model as string | undefined;

  const enhancerMessages = [
    {
      role: 'user' as const,
      content: stripIndents`
        I want you to improve the user prompt that is wrapped in \`<original_prompt>\` tags.

        IMPORTANT: Only respond with the improved prompt and nothing else!

        <original_prompt>
          ${message}
        </original_prompt>
      `,
    },
  ];

  try {
    const result = await streamText(enhancerMessages, {
      fullModelId,
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.log(error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    if (errorMessage.includes('Missing API key')) {
      if (fullModelId) {
        console.log(`API key missing for selected model, falling back to default model`);

        try {
          const result = await streamText(enhancerMessages, {});

          return result.toTextStreamResponse();
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
