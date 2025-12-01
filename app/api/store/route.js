import { kv } from '@vercel/kv';

export async function POST(request) {
  const { key, to, from, msg, img } = await request.json();

  // 存到 KV（key 就是隨機 ID，如 'ming520'）
  await kv.set(key, JSON.stringify({ to, from, msg, img }));

  return Response.json({ success: true, shortUrl: `https://my-valentine-game-njy7-2025.vercel.app?key=${key}` });
}
