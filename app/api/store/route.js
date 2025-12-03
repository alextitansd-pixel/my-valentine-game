// app/api/store/route.js（新版）
import { kv } from '@vercel/kv';

export async function POST(request) {
  const body = await request.json();
  const { 
    key, 
    to, 
    from: fromName, 
    msg, 
    img, 
    password = "5201314"   // ← 新增！客戶不填就預設 5201314
  } = body;

  if (!key || !to || !fromName) {
    return Response.json({ error: 'Missing fields' }, { status: 400 });
  }

  // 存入 KV：現在多了 password 欄位
  await kv.set(key, JSON.stringify({ 
    to, 
    from: fromName, 
    msg, 
    img: img || '', 
    password   // ← 關鍵！
  }));

  const url = `${process.env.NEXT_PUBLIC_VERCEL_URL || 'https://' + request.headers.get('host')}/${key}`;
  return Response.json({ success: true, url });
}
