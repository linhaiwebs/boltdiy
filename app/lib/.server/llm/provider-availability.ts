/**
 * Server-side provider availability checking.
 * Determines which AI providers have valid API keys configured.
 */

import { getProviderApiKey } from './provider-factory';
import type { AIProvider } from './providers/types';

/**
 * Fallback order for providers when default is unavailable.
 * Ordered by cost-effectiveness and availability.
 */
export const SERVER_FALLBACK_ORDER: AIProvider[] = [
  'zhipuai',    // Default (free tier available)
  'deepseek',   // Very affordable
  'mistral',    // Good balance
  'google',     // Large context
  'openai',     // High quality
  'anthropic',  // Premium
  'xai',        // Alternative
];

/**
 * Check if a provider has an API key configured on the server.
 */
export function isProviderAvailableOnServer(provider: AIProvider, env: Env): boolean {
  const apiKey = getProviderApiKey(provider, env);
  return !!apiKey && apiKey.trim() !== '';
}

/**
 * Get list of available providers on the server.
 */
export function getAvailableProvidersOnServer(env: Env): AIProvider[] {
  return SERVER_FALLBACK_ORDER.filter(provider => isProviderAvailableOnServer(provider, env));
}

/**
 * Get the first available provider from a preference list.
 */
export function getFirstAvailableProviderOnServer(
  preferences: AIProvider[],
  env: Env
): AIProvider | undefined {
  for (const provider of preferences) {
    if (isProviderAvailableOnServer(provider, env)) {
      return provider;
    }
  }
  return undefined;
}

/**
 * Get the best available provider based on fallback order.
 */
export function getBestAvailableProviderOnServer(env: Env): AIProvider | undefined {
  return getFirstAvailableProviderOnServer(SERVER_FALLBACK_ORDER, env);
}
