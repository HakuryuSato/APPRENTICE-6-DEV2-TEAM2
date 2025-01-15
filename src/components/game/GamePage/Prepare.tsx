// app/game/[game-uuid]/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAtom } from 'jotai';
import {
  userNameAtom,
  gamePageModeAtom,
  gameIdAtom,
  userIdAtom,
} from '@/atoms/state';
import { fetchGameState } from '@/utils/client/apiClient';

export const Prepare: React.FC = () => {
  const router = useRouter();
  const [gameId] = useAtom(gameIdAtom);
  const [isAllUsersReady, setIsAllUsersReady] = useState<boolean>(false);

  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [userName] = useAtom(userNameAtom);
  const [userId] = useAtom(userIdAtom);
  const [, setTemporaryTopGameLayoutMode] = useAtom(gamePageModeAtom);

  const startPolling = () => {
    pollingRef.current = setInterval(async () => {
      try {
        const gameState = await fetchGameState(gameId);
        if (gameState && gameState.users) {
          console.log(`人数：${gameState.users.length}`);
          setIsAllUsersReady(gameState.isAllUsersReady);
        } else {
          console.error('Game state or users are undefined');
        }
      } catch (error) {
        console.error('Error fetching game state:', error);
      }
    }, 1000);
  };

  const stopAllTimers = () => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  useEffect(() => {
    startPolling();
    return () => stopAllTimers();
  }, [gameId, userId, userName]);

  useEffect(() => {
    if (isAllUsersReady) {
      stopAllTimers();

      // 3秒後にモードを変更
      timeoutRef.current = setTimeout(() => {
        setTemporaryTopGameLayoutMode({ mode: 'generate' });
      }, 4000);
    }
  }, [isAllUsersReady]);

  const handleClickBack = () => {
    router.push('/');
    // キャッシュの削除を追加する
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-center">
        <p className="font-semibold">Name: {userName}</p>
        <p className="font-semibold">Room: {gameId}</p>
      </div>

      {!isAllUsersReady ? (
        <h3 className="text-red-500 text-lg font-medium">
          全員揃うまでお待ちください
        </h3>
      ) : (
        <div className="text-center">
          <p className="text-fly-purple font-bold text-xl animate-pop-in">
            ゲームスタート
          </p>
        </div>
      )}

      <Button onClick={handleClickBack}>戻る</Button>
    </div>
  );
};
