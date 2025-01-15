import { useRef } from 'react';

// usePolling(実行する関数,ポーリングの間隔)
// startPollingでスタート, stopPollingでストップ
export const usePolling = (callback: () => Promise<void>, interval: number) => {
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startPolling = () => {
    if (!pollingRef.current) {
      pollingRef.current = setInterval(async () => {
        await callback();
      }, interval);
    }
  };

  const stopPolling = () => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  };

  return { startPolling, stopPolling };
};
