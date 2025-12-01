import { kv } from '@vercel/kv';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key');

  if (!key) {
    return Response.json({ error: 'No key provided' }, { status: 400 });
  }

  const stored = await kv.get(key);
  if (!stored) {
    return Response.json({ error: 'Key not found' }, { status: 404 });
  }

  return Response.json({ data: JSON.parse(stored) });
}
