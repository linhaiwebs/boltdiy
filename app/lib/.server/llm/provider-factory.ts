import type { LanguageModel } from 'ai';
import { DEFAULT_PROVIDER, DEFAULT_MODEL_ID, getModel } from './model-config';
import {
  anthropicProvider,
  deepseekProvider,
  googleProvider,
  openaiProvider,
  xaiProvider,
  mistralProvider,
  zhipuaiProvider,
} from './providers';
import type { AIProvider } from './providers/types';

const PROVIDERS = {
  anthropic: anthropicProvider,
  deepseek: deepseekProvider,
  google: googleProvider,
  openai: openaiProvider,
  xai: xaiProvider,
  mistral: mistralProvider,
  zhipuai: zhipuaiProvider,
} as const;

export function getProviderApiKey(provider: AIProvider): string | undefined {
  const providerConfig = PROVIDERS[provider]?.config;

  if (!providerConfig) {
    return undefined;
  }

  return process.env[providerConfig.apiKeyEnvVar];
}

export function createModel(provider: AIProvider = DEFAULT_PROVIDER, modelId?: string): LanguageModel {
  const providerImpl = PROVIDERS[provider];

  if (!providerImpl) {
    throw new Error(`Unsupported provider: ${provider}`);
  }

  const apiKey = getProviderApiKey(provider);

  if (!apiKey) {
    throw new Error(
      `Missing API key for provider ${provider}. Please set ${providerImpl.config.apiKeyEnvVar} in your environment.`,
    );
  }

  if (modelId) {
    const modelInfo = getModel(provider, modelId);

    if (!modelInfo) {
      console.warn(`Model ${modelId} not found for provider ${provider}. Using default.`);
      modelId = undefined;
    }
  }

  return providerImpl.createModel(apiKey, modelId);
}

export function createModelFromFullId(fullId: string): LanguageModel {
  const [provider, modelId] = fullId.split(':') as [AIProvider, string];

  if (!provider) {
    return createModel(DEFAULT_PROVIDER, DEFAULT_MODEL_ID);
  }

  return createModel(provider, modelId);
}

export function getDefaultModelInstance(): LanguageModel {
  return createModel(DEFAULT_PROVIDER, DEFAULT_MODEL_ID);
}
