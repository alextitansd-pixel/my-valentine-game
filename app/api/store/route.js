import { createClient } from '@libsql/client/web';

export async function POST(request) {
  const body = await request.json();
  const { key, to, from, msg, img, password = '5201314' } = body;

  if (!key || !to || !from) {
    return Response.json({ error: 'Missing fields' }, { status: 400 });
  }

  const client = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
    skipMigrations: true   // 這一行解決所有 400 錯誤
  });

  try {
    await client.execute(`
      CREATE TABLE IF NOT EXISTS games (
        id TEXT PRIMARY KEY,
        recipient TEXT NOT NULL,
        sender NOT NULL,
        msg TEXT,
        img TEXT DEFAULT '',
        password TEXT DEFAULT '5201314'
      )
    `);

    await client.execute({
      sql: `INSERT OR REPLACE INTO games (id, recipient, sender, msg, img, password) VALUES (?, ?, ?, ?, ?, ?)`,
      args: [key, to, from, msg || '', img || '', password],
    });

    const host = request.headers.get('host') || 'localhost:3000';
    const url = `https://${host}/${key}`;

    return Response.json({ success: true, url });
  } catch (error) {
    console.error('Store error:', error);
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}
