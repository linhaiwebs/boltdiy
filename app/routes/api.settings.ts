import { type ActionFunctionArgs, type LoaderFunctionArgs, json } from '@remix-run/node';
import { createSupabaseServerClient } from '~/lib/supabase/server';

export async function loader({ request }: LoaderFunctionArgs) {
  const { supabase, headers } = createSupabaseServerClient(request);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return json({ error: 'Unauthorized' }, { status: 401, headers });
  }

  const { data, error } = await supabase
    .from('user_settings')
    .select('editor_settings, ai_settings, preferences')
    .eq('user_id', user.id)
    .maybeSingle();

  if (error) {
    return json({ error: error.message }, { status: 500, headers });
  }

  return json({ settings: data }, { headers });
}

export async function action({ request }: ActionFunctionArgs) {
  if (request.method !== 'POST') {
    return json({ error: 'Method not allowed' }, { status: 405 });
  }

  const { supabase, headers } = createSupabaseServerClient(request);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return json({ error: 'Unauthorized' }, { status: 401, headers });
  }

  const body = (await request.json()) as {
    editor_settings?: Record<string, unknown>;
    ai_settings?: Record<string, unknown>;
    preferences?: Record<string, unknown>;
  };

  const { error } = await supabase.from('user_settings').upsert(
    {
      user_id: user.id,
      ...(body.editor_settings !== undefined && { editor_settings: body.editor_settings }),
      ...(body.ai_settings !== undefined && { ai_settings: body.ai_settings }),
      ...(body.preferences !== undefined && { preferences: body.preferences }),
    },
    { onConflict: 'user_id' },
  );

  if (error) {
    return json({ error: error.message }, { status: 500, headers });
  }

  return json({ success: true }, { headers });
}
