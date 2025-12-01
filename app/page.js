'use client';
import { useState } from 'react';
import confetti from 'canvas-confetti';

export default function Home() {
  const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const to = params.get('to') || '寶貝';
  const from = params.get('from') || '我';
  const msg = params.get('msg') || '情人節快樂！\n永遠愛你💕';
  const img = params.get('img') || '';

  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const total = 1314;

  const clickHeart = () => {
    if (done) return;
    const newProg = Math.min(100, progress + (100 / total));
    setProgress(newProg);
    if (newProg >= 100) {
      setDone(true);
      confetti({ particleCount: 300, spread: 100, origin: { y: 0.6 } });
    } else {
      confetti({ particleCount: 8, spread: 70 });
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom right, #ff9a9e, #fad0c4)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div style={{ textAlign: 'center', maxWidth: '500px' }}>
        <h1 style={{ fontSize: '3rem', color: 'white', marginBottom: '2rem', textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
          {from} ♥ {to}
        </h1>
        <p style={{ color: 'white', fontSize: '1.5rem', marginBottom: '3rem' }}>一起點 1314 次吧！</p>

        <button onClick={clickHeart} style={{ fontSize: '10rem', background: 'none', border: 'none', margin: '0 0 3rem 0', animation: 'pulse 2s infinite' }}>
          ❤️
        </button>

        <div style={{ background: 'rgba(255,255,255,0.4)', height: '20px', borderRadius: '10px', margin: '1rem', overflow: 'hidden' }}>
          <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(to right, #ff6b6b, #ee5a52)', transition: 'width 0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
            {progress > 15 && `${Math.round(progress)}%`}
          </div>
        </div>

        {done && (
          <div style={{ background: 'white', borderRadius: '20px', padding: '2rem', marginTop: '3rem', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', animation: 'fadeIn 1s' }}>
            {img && <img src={img} alt="回憶" style={{ width: '100%', maxWidth: '350px', borderRadius: '15px', marginBottom: '1.5rem' }} />}
            <p style={{ fontSize: '1.8rem', color: '#d63384', whiteSpace: 'pre-line', lineHeight: '1.8' }}>{msg}</p>
            <p style={{ textAlign: 'right', marginTop: '2rem', color: '#e91e63', fontSize: '1.3rem' }}>- {from} ❤️</p>
          </div>
        )}
      </div>
    </div>
  );
}
