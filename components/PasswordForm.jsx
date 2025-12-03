'use client';
import { useState } from 'react';

export default function PasswordForm({ shareKey }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch(`/api/get?key=${shareKey}`);
      const json = await res.json();

      if (!json.data || json.data.password !== password) {
        setError('密碼錯誤！');
        setLoading(false);
        return;
      }

      // 檢查 gameKey 是否存在
      if (!json.data.gameKey) {
        setError('資料錯誤，請聯絡客服');
        setLoading(false);
        return;
      }

      // 跳轉到真實遊戲頁
      window.location.href = `/${shareKey}/${json.data.gameKey}`;
    } catch (err) {
      setError('載入失敗，請再試一次');
      console.error('Password error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '100px', background: '#ffebee' }}>
      <h1 style={{ color: '#d63384', fontSize: '2.5rem', marginBottom: '20px' }}>私人信件</h1>
      <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '30px' }}>
        這是寫給你的專屬訊息<br />請輸入密碼才能閱讀
      </p>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="輸入密碼..."
          disabled={loading}
          style={{ 
            padding: '15px', 
            fontSize: '18px', 
            width: '80%', 
            maxWidth: '300px', 
            borderRadius: '25px', 
            border: '2px solid #ff9a9e', 
            textAlign: 'center', 
            marginBottom: '15px',
            outline: 'none'
          }}
          autoFocus
        />
        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            padding: '15px 30px', 
            fontSize: '18px', 
            background: '#ff4081', 
            color: 'white', 
            border: 'none', 
            borderRadius: '25px', 
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1
          }}
        >
          {loading ? '載入中…' : '進入我的世界 ❤️'}
        </button>
      </form>
      {error && <p style={{ color: '#d32f2f', fontWeight: 'bold', marginTop: '10px' }}>{error}</p>}
    </div>
  );
}
