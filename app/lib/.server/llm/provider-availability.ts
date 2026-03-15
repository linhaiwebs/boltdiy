import { getProviderApiKey } from './provider-factory';
import type { AIProvider } from './providers/types';

export const SERVER_FALLBACK_ORDER: AIProvider[] = [
  'zhipuai',
  'deepseek',
  'mistral',
  'google',
  'openai',
  'anthropic',
  'xai',
];

export function isProviderAvailableOnServer(provider: AIProvider): boolean {
  const apiKey = getProviderApiKey(provider);
  return !!apiKey && apiKey.trim() !== '';
}

export function getAvailableProvidersOnServer(): AIProvider[] {
  return SERVER_FALLBACK_ORDER.filter(provider => isProviderAvailableOnServer(provider));
}

export function getFirstAvailableProviderOnServer(
  preferences: AIProvider[],
): AIProvider | undefined {
  for (const provider of preferences) {
    if (isProviderAvailableOnServer(provider)) {
      return provider;
    }
  }
  return undefined;
}

export function getBestAvailableProviderOnServer(): AIProvider | undefined {
  return getFirstAvailableProviderOnServer(SERVER_FALLBACK_ORDER);
}
