/**
 * Client-side environment validation for API keys.
 * Checks which AI providers are available based on configured API keys.
 */

import type { AIProvider } from '~/types/model';

/**
 * Map of providers to their environment variable names.
 */
const PROVIDER_ENV_VARS: Record<AIProvider, string> = {
  anthropic: 'ANTHROPIC_API_KEY',
  openai: 'OPENAI_API_KEY',
  google: 'GOOGLE_API_KEY',
  deepseek: 'DEEPSEEK_API_KEY',
  xai: 'XAI_API_KEY',
  mistral: 'MISTRAL_API_KEY',
  zhipuai: 'ZHIPUAI_API_KEY',
};

/**
 * Check if a provider has an API key configured.
 * Note: This checks client-side environment variables.
 * For security, actual API keys should never be exposed to the client.
 * This is just for UI indication purposes.
 */
export function isProviderAvailable(provider: AIProvider): boolean {
  const envVar = PROVIDER_ENV_VARS[provider];

  if (!envVar) {
    return false;
  }

  // Check if API key exists in environment
  // For client-side, we check import.meta.env (Vite)
  const apiKey = (import.meta.env as any)[envVar];

  return !!apiKey && apiKey.trim() !== '';
}

/**
 * Get list of all available providers based on configured API keys.
 */
export function getAvailableProviders(): AIProvider[] {
  const providers: AIProvider[] = ['anthropic', 'openai', 'google', 'deepseek', 'xai', 'mistral', 'zhipuai'];

  return providers.filter(isProviderAvailable);
}

/**
 * Get list of unavailable providers (missing API keys).
 */
export function getUnavailableProviders(): AIProvider[] {
  const providers: AIProvider[] = ['anthropic', 'openai', 'google', 'deepseek', 'xai', 'mistral', 'zhipuai'];

  return providers.filter(provider => !isProviderAvailable(provider));
}

/**
 * Validate if a specific provider has an API key configured.
 * Returns a validation result with error message if unavailable.
 */
export function validateProvider(provider: AIProvider): {
  valid: boolean;
  message?: string;
} {
  const available = isProviderAvailable(provider);

  if (!available) {
    return {
      valid: false,
      message: `API key for ${provider} is not configured. Please set ${PROVIDER_ENV_VARS[provider]} in your environment.`,
    };
  }

  return { valid: true };
}
