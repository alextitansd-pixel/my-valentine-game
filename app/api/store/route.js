import { kv } from '@vercel/kv';

export async function POST(request) {
  const body = await request.json();
  const { key, to, from: fromName, msg, img } = body;

  if (!key || !to || !fromName) {
    return Response.json({ error: 'Missing fields' }, { status: 400 });
  }

  await kv.set(key, JSON.stringify({ to, from: fromName, msg, img: img || '' }));
  return Response.json({ success: true, url: `${process.env.NEXT_PUBLIC_VERCEL_URL || 'https://' + request.headers.get('host')}?key=${key}` });
}
