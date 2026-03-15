import { getAvailableProvidersOnServer } from '~/lib/.server/llm/provider-availability';

export async function loader() {
  const available = getAvailableProvidersOnServer();

  return new Response(JSON.stringify({ available }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  });
}
