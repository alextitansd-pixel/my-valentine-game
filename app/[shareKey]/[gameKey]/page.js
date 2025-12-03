import { createClient } from '@libsql/client/web';
import Game from '@/components/Game';

export default async function GamePage({ params }) {
  const { shareKey, gameKey } = params;

  const client = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
    syncSchema: false
  });

  const result = await client.execute({
    sql: 'SELECT * FROM games WHERE id = ? AND gameKey = ?',
    args: [shareKey, gameKey],
  });

  if (result.rows.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '100px', fontSize: '24px' }}>
        無效或過期的連結
      </div>
    );
  }

  const data = result.rows[0];
  return <Game data={{
    to: data.recipient,
    from: data.sender,
    msg: data.msg,
    img: data.img
  }} />;
}
