'use client';
import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function Home({ searchParams }) {
  const key = searchParams?.key || 'demo';
  const [data, setData] = useState(null);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const total = 10;

  // 讀 KV 資料（用 fetch 呼叫 API）
  useEffect(() => {
    if (key === 'demo') {
      setData({ to: '寶貝', from: '我', msg: '情人節快樂！\n永遠愛你💕', img: '' });
      return;
    }

    fetch(`/api/get?key=${key}`)
      .then(res => res.json())
      .then(result => setData(result.data))
      .catch(() => setData({ to: '寶貝', from: '我', msg: '載入中...', img: '' }));
  }, [key]);

  const click = () => {
    if (done || !data) return;
    const newProg = Math.min(100, progress + (100 / total));
    setProgress(newProg);
    if (newProg >= 100) {
      setDone(true);
      confetti({ particleCount: 300, spread: 100, origin: { y: 0.6 } });
    } else {
      confetti({ particleCount: 8, spread: 70 });
    }
  };

  if (!data) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>載入中...</div>;
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to br, #ff9a9e, #fad0c4)', display:'flex', alignItems:'center', justifyContent:'center', padding:'1rem' }}>
      <div style={{ textAlign:'center' }}>
        <h1 style={{ fontSize:'3rem', color:'white', marginBottom:'2rem' }}>{data.from} ♥ {data.to}</h1>
        <p style={{ color:'white', fontSize:'1.5rem', marginBottom:'3rem' }}>一起點 {total} 次吧！</p>
        <button onClick={click} style={{ fontSize:'10rem', background:'none', border:'none', animation:'pulse 2s infinite' }}>❤️</button>
        
        <div style={{ background: 'rgba(255,255,255,0.4)', height: '20px', borderRadius: '10px', margin: '1rem', overflow: 'hidden' }}>
          <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(to right, #ff6b6b, #ee5a52)', transition: 'width 0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
            {progress > 15 && `${Math.round(progress)}%`}
          </div>
        </div>

        {done && (
          <div style={{ background:'white', padding:'2rem', borderRadius:'20px', marginTop:'3rem', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
            {data.img && <img src={data.img} alt="回憶" style={{ width: '100%', maxWidth: '350px', borderRadius: '15px', marginBottom: '1.5rem' }} />}
            <p style={{ fontSize:'1.8rem', color:'#d63384', whiteSpace:'pre-line', lineHeight:'1.8' }}>{data.msg}</p>
            <p style={{ textAlign:'right', marginTop:'2rem', color:'#e91e63', fontSize:'1.3rem' }}>- {data.from} ❤️</p>
          </div>
        )}
      </div>
    </div>
  );
}
