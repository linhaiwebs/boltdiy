import { map } from 'nanostores';
import { workbenchStore } from './workbench';

export interface Shortcut {
  key: string;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  metaKey?: boolean;
  ctrlOrMetaKey?: boolean;
  action: () => void;
}

export interface Shortcuts {
  toggleTerminal: Shortcut;
}

export interface EditorSettings {
  tabSize: number;
  fontSize: number;
  fontFamily: string;
  lineHeight: number;
  wordWrap: boolean;
  minimap: boolean;
  lineNumbers: boolean;
}

export interface AISettings {
  model: string;
  temperature: number;
  maxTokens: number;
  streamResponse: boolean;
}

export interface UserPreferences {
  language: string;
  notifications: boolean;
  autoSave: boolean;
  autoSaveDelay: number;
}

export interface Settings {
  shortcuts: Shortcuts;
  editor: EditorSettings;
  ai: AISettings;
  preferences: UserPreferences;
}

export const shortcutsStore = map<Shortcuts>({
  toggleTerminal: {
    key: 'j',
    ctrlOrMetaKey: true,
    action: () => workbenchStore.toggleTerminal(),
  },
});

export const defaultEditorSettings: EditorSettings = {
  tabSize: 2,
  fontSize: 14,
  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
  lineHeight: 1.5,
  wordWrap: true,
  minimap: true,
  lineNumbers: true,
};

export const defaultAISettings: AISettings = {
  model: 'claude-sonnet-3.5',
  temperature: 0.7,
  maxTokens: 8192,
  streamResponse: true,
};

export const defaultUserPreferences: UserPreferences = {
  language: 'en',
  notifications: true,
  autoSave: true,
  autoSaveDelay: 1000,
};

export const settingsStore = map<Settings>({
  shortcuts: shortcutsStore.get(),
  editor: defaultEditorSettings,
  ai: defaultAISettings,
  preferences: defaultUserPreferences,
});

shortcutsStore.subscribe((shortcuts) => {
  settingsStore.set({
    ...settingsStore.get(),
    shortcuts,
  });
});

export function updateEditorSettings(updates: Partial<EditorSettings>) {
  const currentSettings = settingsStore.get();
  settingsStore.set({
    ...currentSettings,
    editor: { ...currentSettings.editor, ...updates },
  });
}

export function updateAISettings(updates: Partial<AISettings>) {
  const currentSettings = settingsStore.get();
  settingsStore.set({
    ...currentSettings,
    ai: { ...currentSettings.ai, ...updates },
  });
}

export function updateUserPreferences(updates: Partial<UserPreferences>) {
  const currentSettings = settingsStore.get();
  settingsStore.set({
    ...currentSettings,
    preferences: { ...currentSettings.preferences, ...updates },
  });
}

export async function loadSettingsFromServer(): Promise<void> {
  try {
    const response = await fetch('/api/settings');

    if (!response.ok) {
      return;
    }

    const { settings } = (await response.json()) as {
      settings: {
        editor_settings: Partial<EditorSettings> | null;
        ai_settings: Partial<AISettings> | null;
        preferences: Partial<UserPreferences> | null;
      } | null;
    };

    if (!settings) {
      return;
    }

    const current = settingsStore.get();
    settingsStore.set({
      ...current,
      editor: settings.editor_settings
        ? { ...defaultEditorSettings, ...settings.editor_settings }
        : current.editor,
      ai: settings.ai_settings ? { ...defaultAISettings, ...settings.ai_settings } : current.ai,
      preferences: settings.preferences
        ? { ...defaultUserPreferences, ...settings.preferences }
        : current.preferences,
    });
  } catch {
    // silently ignore network errors; defaults remain in place
  }
}

export async function saveSettingsToServer(): Promise<void> {
  try {
    const current = settingsStore.get();
    await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        editor_settings: current.editor,
        ai_settings: current.ai,
        preferences: current.preferences,
      }),
    });
  } catch {
    // silently ignore network errors
  }
}
