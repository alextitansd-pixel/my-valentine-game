// app/[key]/page.js
import PasswordGate from '@/components/PasswordGate';

export const dynamic = 'force-dynamic';

export default function CustomHome({ params }) {
  const { key } = params;

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #ff9a9e, #fad0c4)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.95)', padding: '3rem', borderRadius: '20px', boxShadow: '0 15px 35px rgba(0,0,0,0.3)', maxWidth: '400px' }}>
        <h1 style={{ fontSize: '2.8rem', color: '#d63384', marginBottom: '1rem' }}>💌 私人信件</h1>
        <p style={{ fontSize: '1.3rem', color: '#666', marginBottom: '2rem' }}>
          這是寫給你的專屬訊息<br />請輸入密碼才能閱讀
        </p>
        <PasswordGate correctKey={key} />
      </div>
    </div>
  );
}
