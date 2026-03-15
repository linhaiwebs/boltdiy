import { createAnthropic } from '@ai-sdk/anthropic';
import type { LanguageModel } from 'ai';
import { createModel, getDefaultModelInstance } from './provider-factory';
import type { AIProvider } from './providers/types';

export function getAnthropicModel(apiKey: string) {
  const anthropic = createAnthropic({
    apiKey,
  });

  return anthropic('claude-3-5-sonnet-20240620');
}

export function getModel(provider?: AIProvider, modelId?: string): LanguageModel {
  if (!provider) {
    return getDefaultModelInstance();
  }

  return createModel(provider, modelId);
}

export function getModelFromFullId(fullId?: string): LanguageModel {
  if (!fullId) {
    return getDefaultModelInstance();
  }

  const [provider, modelId] = fullId.split(':') as [AIProvider, string];

  return createModel(provider, modelId);
}
