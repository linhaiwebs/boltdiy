import { type LoaderFunctionArgs } from '@remix-run/cloudflare';
import { getAvailableProvidersOnServer } from '~/lib/.server/llm/provider-availability';

export async function loader({ context }: LoaderFunctionArgs) {
  const available = getAvailableProvidersOnServer(context.cloudflare.env);

  return new Response(JSON.stringify({ available }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  });
}
