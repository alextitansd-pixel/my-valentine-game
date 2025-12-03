import { createClient } from '@libsql/client';

export async function POST(request) {
  const body = await request.json();
  const { key, to, from, msg, img, password = "5201314" } = body;

  if (!key || !to || !from) {
    return Response.json({ error: 'Missing fields' }, { status: 400 });
  }

  const client = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });

  // 第一次存時創建表
  await client.execute(`
    CREATE TABLE IF NOT EXISTS games (
      id TEXT PRIMARY KEY,
      to TEXT,
      from TEXT,
      msg TEXT,
      img TEXT,
      password TEXT
    )
  `);

  // 存資料
  await client.execute({
    sql: 'INSERT OR REPLACE INTO games (id, to, from, msg, img, password) VALUES (?, ?, ?, ?, ?, ?)',
    args: [key, to, from, msg, img || '', password],
  });

  const host = request.headers.get('host') || 'localhost:3000';
  const url = `https://${host}/${key}`;

  return Response.json({ success: true, url });
}
