import { atom } from 'nanostores';
import type { AIProvider } from '~/types/model';

export const availableProviders = atom<Set<AIProvider>>(new Set());
export const unavailableProviders = atom<Set<AIProvider>>(new Set());

const ALL_PROVIDERS: AIProvider[] = ['anthropic', 'openai', 'google', 'deepseek', 'xai', 'mistral', 'zhipuai'];

export async function initializeProviderAvailability() {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const res = await fetch('/api/providers');
    if (!res.ok) throw new Error('Failed to fetch providers');
    const data = (await res.json()) as { available: AIProvider[] };
    const available = new Set(data.available);
    const unavailable = new Set(ALL_PROVIDERS.filter((p) => !available.has(p)));
    availableProviders.set(available);
    unavailableProviders.set(unavailable);
  } catch {
    availableProviders.set(new Set());
    unavailableProviders.set(new Set(ALL_PROVIDERS));
  }
}

export function getFirstAvailableProvider(preferences: AIProvider[]): AIProvider | undefined {
  const available = availableProviders.get();
  for (const provider of preferences) {
    if (available.has(provider)) {
      return provider;
    }
  }
  return undefined;
}

export const FALLBACK_ORDER: AIProvider[] = [
  'zhipuai',
  'deepseek',
  'mistral',
  'google',
  'openai',
  'anthropic',
  'xai',
];

export function getBestAvailableProvider(): AIProvider | undefined {
  return getFirstAvailableProvider(FALLBACK_ORDER);
}
