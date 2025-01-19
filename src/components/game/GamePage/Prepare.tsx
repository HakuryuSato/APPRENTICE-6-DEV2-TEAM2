// app/game/[game-uuid]/page.tsx
'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { useAtom } from 'jotai';
import {
  userNameAtom,
  gamePageModeAtom,
  gameIdAtom,
  userIdAtom,
} from '@/atoms/state';
import { fetchGameState } from '@/utils/client/apiClient';
import { usePolling } from '@/hooks/game/GamePage/usePolling';

export const Prepare: React.FC = () => {
  const router = useRouter();
  const [gameId] = useAtom(gameIdAtom);
  const [isAllUsersReady, setIsAllUsersReady] = useState<boolean>(false);
  const [userName] = useAtom(userNameAtom);
  const [userId] = useAtom(userIdAtom);
  const [, setTemporaryTopGameLayoutMode] = useAtom(gamePageModeAtom);
  const [usersLength, setUsersLength] = useState<number>(0);
  const [progress, setProgress] = useState<number>(13);

  const { startPolling, stopPolling } = usePolling(async () => {
    try {
      const gameState = await fetchGameState(gameId);
      if (gameState && gameState.users) {
        console.log(`人数：${gameState.users.length}`);
        setUsersLength(gameState.users.length);

        if (gameState.users.length === 4) {
          setProgress(100);
        }
        setIsAllUsersReady(gameState.isAllUsersReady);
      } else {
        console.error('Game state or users are undefined');
      }
    } catch (error) {
      console.error('Error fetching game state:', error);
    }
  }, 100000);

  useEffect(() => {
    const progressMapping = [0, 25, 50, 75, 100];
    setProgress(progressMapping[usersLength] || 0);
  }, [usersLength]);

  useEffect(() => {
    startPolling();
    return () => stopPolling();
  }, [gameId]);

  useEffect(() => {
    if (isAllUsersReady) {
      stopPolling();
      const timeout = setTimeout(() => {
        setTemporaryTopGameLayoutMode({ mode: 'generate' });
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [isAllUsersReady]);

  const handleClickBack = () => {
    router.push('/');
    // キャッシュの削除を追加する
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Button
        onClick={handleClickBack}
        className="absolute top-4 left-4 bg-fly-softPurple hover:bg-fly-blue text-black"
      >
        戻る
      </Button>
      <div className="flex items-center justify-center">
        <img
          src="/images/agawasan.svg"
          alt="agawasan"
          className="rounded-full w-[80%] h-[80%]"
        />
      </div>
      <div className="text-center">
        <p className="font-semibold">ニックネーム: {userName}</p>
        <p className="font-semibold">部屋の合言葉: {gameId}</p>
      </div>

      {!isAllUsersReady ? (
        <>
          <h3 className="text-red-500 text-lg font-medium">
            全員参加するまでお待ちください
          </h3>
          <p>{`${usersLength} / 4`}</p>
          <Progress value={progress} className="w-full" />
        </>
      ) : (
        <div className="text-center">
          <p className="text-fly-purple font-bold text-xl animate-pop-in">
            ゲームスタート
          </p>
        </div>
      )}
    </div>
  );
};
