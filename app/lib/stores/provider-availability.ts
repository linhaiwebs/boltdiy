/**
 * Provider availability store.
 * Tracks which AI providers have API keys configured and are available for use.
 */

import { atom, computed } from 'nanostores';
import { getAvailableProviders, getUnavailableProviders, isProviderAvailable } from '~/lib/env-validation.client';
import type { AIProvider } from '~/types/model';

/**
 * Set of available providers (those with API keys configured).
 */
export const availableProviders = atom<Set<AIProvider>>(new Set());

/**
 * Set of unavailable providers (those without API keys).
 */
export const unavailableProviders = atom<Set<AIProvider>>(new Set());

/**
 * Initialize provider availability on client.
 */
export function initializeProviderAvailability() {
  if (typeof window === 'undefined') {
    return;
  }

  const available = getAvailableProviders();
  const unavailable = getUnavailableProviders();

  availableProviders.set(new Set(available));
  unavailableProviders.set(new Set(unavailable));

  console.log('[Provider Availability] Available providers:', available);
  console.log('[Provider Availability] Unavailable providers:', unavailable);
}

/**
 * Check if a specific provider is available.
 */
export const isProviderAvailableStore = computed(availableProviders, (providers) => {
  return (provider: AIProvider) => providers.has(provider);
});

/**
 * Get the first available provider from a list of preferences.
 */
export function getFirstAvailableProvider(preferences: AIProvider[]): AIProvider | undefined {
  const available = availableProviders.get();

  for (const provider of preferences) {
    if (available.has(provider)) {
      return provider;
    }
  }

  return undefined;
}

/**
 * Fallback order for providers when default is unavailable.
 */
export const FALLBACK_ORDER: AIProvider[] = [
  'zhipuai',    // Default (free tier available)
  'deepseek',   // Very affordable
  'mistral',    // Good balance
  'google',     // Large context
  'openai',     // High quality
  'anthropic',  // Premium
  'xai',        // Alternative
];

/**
 * Get the best available provider based on fallback order.
 */
export function getBestAvailableProvider(): AIProvider | undefined {
  return getFirstAvailableProvider(FALLBACK_ORDER);
}
