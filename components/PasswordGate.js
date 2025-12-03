// components/PasswordGate.js
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PasswordGate({ correctKey }) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // 這裡你可以自訂密碼規則，例如：
    // 1. 固定密碼（全客戶都一樣）
    // if (input === '5201314') return router.push(`/${correctKey}/game`);

    // 2. 客戶自訂密碼（存在 KV 時一起存）
    // 我們之後會教你怎麼存「password」欄位

    // 目前先用最簡單：直接正確就進去（或你告訴客戶密碼是生日之類）
    if (input.trim().length >= 4) {
      router.push(`/${correctKey}/game`);
    } else {
      setError('密碼錯誤哦～再試一次💕');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '2rem' }}>
      <input
        type="password"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="輸入密碼..."
        style={{ padding: '1rem', fontSize: '1.3rem', width: '100%', borderRadius: '50px', border: '3px solid #ff9a9e', textAlign: 'center', marginBottom: '1rem' }}
        autoFocus
      />
      {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
      <button type="submit" style={{ padding: '1rem 3rem', fontSize: '1.3rem', background: '#ff6b6b', color: 'white', border: 'none', borderRadius: '50px', cursor: 'pointer' }}>
        進入我的世界 ❤️
      </button>
    </form>
  );
}
