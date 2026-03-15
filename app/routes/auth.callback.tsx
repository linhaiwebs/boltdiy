import type { LoaderFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { createSupabaseServerClient } from '~/lib/supabase/server';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const next = url.searchParams.get('next') || '/';

  if (code) {
    try {
      const { supabase, headers } = createSupabaseServerClient(request);
      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        console.error('Auth callback error:', error);

        return redirect('/?auth_error=callback_failed');
      }

      return redirect(next, { headers });
    } catch (error) {
      console.error('Auth callback exception:', error);
      return redirect('/?auth_error=callback_exception');
    }
  }

  return redirect(next);
};
