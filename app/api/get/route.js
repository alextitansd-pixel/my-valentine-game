import { createClient } from '@libsql/client';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get('key');

  if (!key) return Response.json({ error: 'No key' }, { status: 400 });

  const client = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });

  try {
    const result = await client.execute({
      sql: 'SELECT * FROM games WHERE id = ?',
      args: [key],
    });

    if (result.rows.length === 0) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    return Response.json({ data: result.rows[0] });
  } catch (err) {
    return Response.json({ error: 'Server error' }, { status: 500 });
  }
}
