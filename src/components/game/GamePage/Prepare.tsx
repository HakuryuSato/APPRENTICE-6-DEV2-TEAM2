// app/game/[game-uuid]/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/components/ui/button';
import { useAtom } from 'jotai';
import { userNameAtom, gamePageModeAtom, gameIdAtom } from '@/atoms/state';
import { UserStatus } from '@/types/UserStatus';
import { fetchGameState, updateGameState } from '@/utils/client/apiClient';

export const Prepare: React.FC = () => {
  const router = useRouter();
  const [gameId] = useAtom(gameIdAtom);
  const [playerId] = useState(() => uuidv4());
  const [round, setRound] = useState<number>(1);
  const [allReady, setAllReady] = useState<boolean>(false);
  const [images, setImages] = useState<string[]>([]);
  const [isReady, setIsReady] = useState<boolean>(false);
  const pollingRef = useRef<NodeJS.Timer | null>(null);
  //下記の行を追加。userNameAtomを使ってuserNameを取得可能
  const [userName] = useAtom(userNameAtom);
  const [, setTemporaryTopGameLayoutMode] = useAtom(gamePageModeAtom);

  // 全員準備完了確認のポーリング
  useEffect(() => {
    if (isReady && !allReady) {
      pollingRef.current = setInterval(async () => {
        const res = await fetchGameState(gameId);
        console.log(res);
        setRound(res.round);
        setAllReady(res.isAllUsersReady);
      }, 1000);

      return () => {
        if (pollingRef.current)
          clearInterval(pollingRef.current as NodeJS.Timeout); // 型アサーションを追加
      };
    } else {
      setTemporaryTopGameLayoutMode({ mode: 'prepare' });
    }
  }, [isReady, allReady, gameId]);

  const handleReady = async () => {
    const res = await fetch('/api/gameState', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'ready', gameId, playerId }),
    });
    const data = await res.json();
    setAllReady(data.allReady);
    setIsReady(true);
  };

  // const handleGenerateImage = async () => {
  //   const res = await fetch('/api/gameState', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ action: 'generateImage', gameId }),
  //   });
  //   const data = await res.json();
  //   setImages(data.images || []);
  // };

  // const handleNextRound = async () => {
  //   const res = await fetch('/api/gameState', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ action: 'nextRound', gameId }),
  //   });
  //   const data = await res.json();
  //   setRound(data.round);
  //   setAllReady(false);
  //   setIsReady(false);
  //   setImages(data.images || []);
  // };

  const handleClickReady = () => {
    const userStatus: UserStatus = {
      userId: playerId,
      userName: userName,
      isReady: true,
    };
    const response = updateGameState({
      gameId: gameId,
      gameStateRequestType: 'create',
      userStatus,
    });
  };

  const handleClickBack = () => {
    router.push('/');
  };

  return (
    <div>
      <p>Name: {userName}</p>
      <h1>Game: {gameId}</h1>
      <h2>Round: {round}</h2>
      {isReady && !allReady && <p>待機中...</p>}
      <div className="flex gap-4">
        {!isReady && <Button onClick={handleReady}>準備完了</Button>}

        <Button onClick={handleClickBack}>戻る</Button>
      </div>
    </div>
  );
};
