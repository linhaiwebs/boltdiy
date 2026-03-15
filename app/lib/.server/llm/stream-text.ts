import { streamText as _streamText, type ModelMessage } from 'ai';
import { MAX_TOKENS } from './constants';
import { DEFAULT_MODEL_ID, DEFAULT_PROVIDER, getDefaultModel, getModel as getModelInfo } from './model-config';
import { getSystemPrompt } from './prompts';
import type { AIProvider } from './providers/types';
import { getModel } from '~/lib/.server/llm/model';

export type Messages = ModelMessage[];

export type StreamingOptions = Omit<Parameters<typeof _streamText>[0], 'model' | 'messages' | 'prompt'>;

export interface StreamTextOptions extends StreamingOptions {
  provider?: AIProvider;
  modelId?: string;
  fullModelId?: string;
}

export function streamText(messages: Messages, options?: StreamTextOptions) {
  const { provider, modelId, fullModelId, ...streamOptions } = options || {};

  let selectedProvider = provider;
  let selectedModelId = modelId;

  if (fullModelId) {
    const [p, m] = fullModelId.split(':') as [AIProvider, string];
    selectedProvider = p;
    selectedModelId = m;
    console.log(`[streamText] Parsed fullModelId: ${fullModelId} -> provider: ${p}, modelId: ${m}`);
  }

  const resolvedProvider = selectedProvider ?? DEFAULT_PROVIDER;

  const resolvedModelId =
    selectedModelId ??
    getDefaultModel(resolvedProvider)?.id ??
    (resolvedProvider === DEFAULT_PROVIDER ? DEFAULT_MODEL_ID : undefined);

  console.log(`[streamText] Using provider: ${resolvedProvider}, modelId: ${resolvedModelId}`);

  const model = getModel(resolvedProvider, resolvedModelId);

  const modelInfo = resolvedModelId ? getModelInfo(resolvedProvider, resolvedModelId) : undefined;

  const headers: Record<string, string> = {};

  if (resolvedProvider === 'anthropic') {
    headers['anthropic-beta'] = 'max-tokens-3-5-sonnet-2024-07-15';
  }

  const maxTokens = modelInfo?.maxTokens || MAX_TOKENS;

  return _streamText({
    model,
    system: getSystemPrompt(),
    maxOutputTokens: maxTokens,
    headers,
    messages,
    ...streamOptions,
  });
}
