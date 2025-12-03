// components/Game.jsx
'use client';

import { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

export default function Game({ data }) {
  const { to = '寶貝', from = '我', msg = '我愛你 ❤️', img = '' } = data || {};

  const [count, setCount] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const audioRef = useRef(null);

  const target = 10;

  useEffect(() => {
    // 預載背景音樂（可換成你自己的浪漫音樂連結）
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
    }
  }, []);

  const handleClick = () => {
    if (count >= target) return;

    setCount(prev => prev + 1);

    // 隨機煙花
    confetti({
      particleCount: 8,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff6b6b', '#feca57', '#ff9ff3', '#54a0ff', '#48dbfb'],
    });

    // 到達 1314 次
    if (count + 1 === target) {
      setTimeout(() => {
        setShowMessage(true);
        confetti({
          particleCount: 300,
          spread: 100,
          origin: { y: 0.6 },
          scalar: 1.2,
        });
        if (audioRef.current) {
          audioRef.current.play();
        }
      }, 300);
    }
  };

  return (
    <>
      {/* 背景音樂（可換成你喜歡的） */}
      <audio
        ref={audioRef}
        src="https://assets.mixkit.co/sfx/preview/mixkit-heart-beat-747.mp3"
        loop
      />

      <div
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(to bottom, #ffe6f2, #ffb3d1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Arial, sans-serif',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* 標題 */}
        <h1 style={{ color: '#d63384', fontSize: '2.5rem', marginBottom: '20px' }}>
          親愛的 {to}
        </h1>

        {/* 大心心 */}
        <div
          onClick={handleClick}
          style={{
            width: '280px',
            height: '280px',
            background: '#ff1744',
            borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
            cursor: count < target ? 'pointer' : 'default',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 20px 40px rgba(255,23,68,0.4)',
            animation: count < target ? 'pulse 1.5s infinite' : 'none',
            transition: 'transform 0.1s',
            userSelect: 'none',
          }}
        >
          <span style={{ color: 'white', fontSize: '80px', fontWeight: 'bold' }}>
            {count < target ? '♥' : '♥'}
          </span>
        </div>

        {/* 計數器 */}
        <div style={{ marginTop: '30px', fontSize: '2rem', color: '#c2185b' }}>
          已點擊：{count} / {target} 次
        </div>

        {/* 進度條 */}
        <div style={{ width: '80%', maxWidth: '400px', marginTop: '20px' }}>
          <div
            style={{
              height: '20px',
              background: '#f8bbd0',
              borderRadius: '10px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${(count / target) * 100}%`,
                height: '100%',
                background: '#ff4081',
                transition: 'width 0.3s ease',
              }}
            />
          </div>
        </div>

        {/* 最終告白訊息 */}
        {showMessage && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(0,0,0,0.8)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 999,
              animation: 'fadeIn 1s',
            }}
          >
            {img && (
              <img
                src={img}
                alt="我們的回憶"
                style={{
                  width: '80%',
                  maxWidth: '300px',
                  borderRadius: '20px',
                  marginBottom: '20px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                }}
              />
            )}
            <h2 style={{ color: '#ff4081', fontSize: '3rem', margin: '20px 0' }}>
              {from} 對 {to} 說：
            </h2>
            <p
              style={{
                color: 'white',
                fontSize: '1.8rem',
                textAlign: 'center',
                maxWidth: '90%',
                whiteSpace: 'pre-wrap',
                lineHeight: '2',
              }}
            >
              {msg}
            </p>
            <p style={{ color: '#ff79c6', marginTop: '30px', fontSize: '2rem' }}>
              我愛你 1314 次，一輩子都不夠 ❤️
            </p>
          </div>
        )}

        <style jsx>{`
          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}</style>
      </div>
    </>
  );
}
