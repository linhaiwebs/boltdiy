/*
  # Create user_settings table

  ## Summary
  Adds a dedicated table for persisting per-user application settings so that
  editor preferences, AI model configuration, and general user preferences
  survive page reloads and work across sessions.

  ## New Tables

  ### user_settings
  Stores one row per authenticated user, containing three JSONB blobs:
  - `editor_settings` — code editor configuration (tab size, font, word wrap, etc.)
  - `ai_settings`     — AI assistant configuration (model, temperature, max tokens)
  - `preferences`     — general user preferences (language, notifications, auto-save)

  ## Security

  RLS is enabled. Policies are restrictive: each user can only read and write
  their own settings row, identified by matching `auth.uid()` to the `user_id`
  column. Unauthenticated users have no access.

  ## Notes
  1. `user_id` references `auth.users(id)` with CASCADE DELETE so settings are
     automatically removed when a user account is deleted.
  2. All JSONB columns default to an empty object `{}` so the row can be
     inserted without supplying values.
  3. `updated_at` is automatically set to the current timestamp on every update
     via a trigger.
*/

CREATE TABLE IF NOT EXISTS user_settings (
  user_id         uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  editor_settings jsonb NOT NULL DEFAULT '{}',
  ai_settings     jsonb NOT NULL DEFAULT '{}',
  preferences     jsonb NOT NULL DEFAULT '{}',
  updated_at      timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE user_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own settings"
  ON user_settings
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own settings"
  ON user_settings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own settings"
  ON user_settings
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own settings"
  ON user_settings
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION update_user_settings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER user_settings_updated_at
  BEFORE UPDATE ON user_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_user_settings_updated_at();
