import { useEffect, useState } from 'react';

export const useCountDown = (seconds: number, onZero: () => void) => {
  const [remainSeconds, setRemainSeconds] = useState(seconds);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    // カウントダウン処理
    if (remainSeconds > 0) {
      timer = setInterval(() => {
        setRemainSeconds(prev => prev - 1);
      }, 1000);

      // 音声再生処理（3秒以内の場合）
      if (remainSeconds <= 3) {
        const audio = new Audio('/sound/和太鼓でドン.mp3');
        audio.play()
      }
    } else if (remainSeconds === 0) {
      // 音声再生処理（0秒の場合）
      const audio = new Audio('/sound/和太鼓でカカッ.mp3');
      audio.play()

      // ゼロになったら親から渡された関数を実行
      onZero();
    }

    // クリーンアップ処理
    return () => clearInterval(timer);
  }, [remainSeconds, onZero]);

  return {
    remainSeconds,
  };
};
