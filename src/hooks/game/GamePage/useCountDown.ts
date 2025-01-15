import { useEffect, useState } from 'react';

export const useCountDown = (seconds: number, onZero: () => void) => {
  const [remainSeconds, setRemainSeconds] = useState(seconds);

  useEffect(() => {
    // カウントダウン
    let timer: NodeJS.Timeout;
    if (remainSeconds > 0) {
      timer = setInterval(() => {
        setRemainSeconds((prev) => prev - 1);
      }, 1000);
    } else if (remainSeconds === 0) {
      onZero();
    }
    return () => clearInterval(timer);
  }, [remainSeconds, onZero]);

  useEffect(() => {
    // 音声再生ロジック
    if (remainSeconds > 0 && remainSeconds <= 3) {
      const audio = new Audio("/sound/和太鼓でドン.mp3");
      audio.play().catch((e) => {
        console.log("Audio play error:", e);
      });
    } else if (remainSeconds === 0) {
      const audio = new Audio("/sound/和太鼓でカカッ.mp3");
      audio.play().catch((e) => {
        console.log("Audio play error:", e);
      });
    }
  }, [remainSeconds]);

  return {
    remainSeconds,
  };
};