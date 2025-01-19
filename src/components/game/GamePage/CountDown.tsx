'use client';
import React from 'react';
import { useCountDown } from '@/hooks/game/GamePage/useCountDown';

type CountDownProps = {
  seconds: number;
  onZero: () => void;
};

export const CountDown: React.FC<CountDownProps> = ({ seconds, onZero }) => {
  const { remainSeconds } = useCountDown(seconds, onZero);
  const isLessThan5Seconds = remainSeconds <= 3;

  const animationStyle = isLessThan5Seconds
    ? { animation: 'zoomInOut 1s infinite' }
    : {};

  return (
    <div className="absolute top-4 right-4 w-1/6 p-4 rounded-lg shadow-md flex items-center justify-center">
      <span
        key={remainSeconds} // リトリガーのためにkeyを動的に設定
        className={`text-6xl font-bold ${
          isLessThan5Seconds
            ? 'text-red-500 animate-scale-up-center'
            : 'text-gray-800'
        }`}
      >
        {Math.floor(remainSeconds)}
      </span>
    </div>
  );
};
