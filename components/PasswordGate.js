'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PasswordGate({ correctKey }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // 強制從 URL 取 key（永遠不會 undefined）
    const url = new URL(window.location.href);
    const finalKey = url.pathname.split('/').pop() || correctKey || '';
    console.log('最終使用的 key:', finalKey);  // Debug: 看 Console 印什麼

    try {
      const res = await fetch(`/api/get?key=${finalKey}`);
      console.log('API 狀態碼:', res.status);  // Debug: 看是否 200

      if (!res.ok) {
        throw new Error(`API 錯誤: ${res.status}`);
      }

      const { data } = await res.json();
      console.log('API 回傳資料:', data);  // Debug: 看有沒有 password

      if (data && data.password && input === data.password) {
        router.push(`/${finalKey}/game`);
      } else {
        setError('密碼錯誤哦～再試一次💕');
      }
    } catch (err) {
      console.error('Fetch 錯誤:', err);  // Debug: 看錯誤是什麼
      setError('載入失敗，請再試一次');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
      <input
        type="password"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="輸入你的專屬密碼..."
        disabled={loading}
        style={{ padding: '1rem', fontSize: '1.3rem', width: '100%', borderRadius: '50px', border: '3px solid #ff9a9e', textAlign: 'center', marginBottom: '1rem', outline: 'none' }}
        autoFocus
      />
      {error && <p style={{ color: 'red', fontWeight: 'bold', margin: '0.5rem 0' }}>{error}</p>}
      <button type="submit" disabled={loading} style={{ padding: '1rem 3rem', fontSize: '1.3rem', background: '#ff6b6b', color: 'white', border: 'none', borderRadius: '50px', cursor: loading ? 'wait' : 'pointer' }}>
        {loading ? '載入中…' : '進入我的世界 ❤️'}
      </button>
    </form>
  );
}
