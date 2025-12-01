import { kv } from '@vercel/kv';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key');

  if (!key) return Response.json({ error: 'No key' }, { status: 400 });

  try {
    const value = await kv.get(key);
    if (!value) return Response.json({ error: 'Not found' }, { status: 404 });
    return Response.json({ data: JSON.parse(value) });
  } catch (err) {
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}
