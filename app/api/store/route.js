import { kv } from '@vercel/kv';

export async function POST(request) {
  const body = await request.json();
  const { key, to, from, msg, img, password = "5201314" } = body;

  if (!key || !to || !from) {
    return Response.json({ error: 'Missing fields' }, { status: 400 });
  }

  await kv.set(key, JSON.stringify({ to, from, msg, img: img || "", password }));

  const host = request.headers.get('host') || 'localhost:3000';
  const url = `https://${host}/${key}`;

  return Response.json({ success: true, url });
}
