'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PasswordGate({ correctKey }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const res = await fetch(`/api/get?key=${correctKey}`);
    const { data } = await res.json();

    if (data?.password && input === data.password) {
      router.push(`/${correctKey}/game`);
    } else {
      setError('密碼錯誤哦～再試一次');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
      <input
        type="password"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="輸入你的專屬密碼..."
        style={{ padding: '1rem', fontSize: '1.3rem', width: '100%', borderRadius: '50px', border: '3px solid #ff9a9e', textAlign: 'center', marginBottom: '1rem', outline: 'none' }}
        autoFocus
      />
      {error && <p style={{ color: 'red', fontWeight: 'bold', margin: '0.5rem 0' }}>{error}</p>}
      <button type="submit" style={{ padding: '1rem 3rem', fontSize: '1.3rem', background: '#ff6b6b', color: 'white', border: 'none', borderRadius: '50px', cursor: 'pointer' }}>
        進入我的世界
      </button>
    </form>
  );
}
