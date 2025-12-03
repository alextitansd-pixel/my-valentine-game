'use client';
import { useState } from 'react';

export default function PasswordForm({ shareKey }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const res = await fetch(`/api/get?key=${shareKey}`);
    const json = await res.json();

    if (!json.data || json.data.password !== password) {
      setError('密碼錯誤！');
      return;
    }

    // 密碼正確 → 跳轉到真實遊戲頁
    window.location.href = `/${shareKey}/${json.data.gameKey}`;
  };

  return (
    <div style={{ textAlign: 'center', padding: '100px', background: '#ffebee' }}>
      <h1>私人信件</h1>
      <p>這是寫給你的專屬訊息，請輸入密碼才能閱讀</p>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="輸入密碼"
          style={{ padding: '10px', fontSize: '18px' }}
        />
        <button type="submit" style={{ padding: '10px 20px', marginLeft: '10px' }}>
          進入我的世界
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
