import React, { useEffect, useState } from 'react';
import { GeneratedImage } from '../GeneratedImage';
import { useAtom } from 'jotai';
import {
  gameIdAtom,
  gamePageModeAtom,
  roundAtom,
  userIdAtom,
  userNameAtom,
} from '@/atoms/state';
import { usePolling } from '@/hooks/game/GamePage/usePolling';
import { fetchGameState, updateGameState } from '@/utils/client/apiClient';
import { CountDown } from './CountDown';

export const GeneratedImageContainer: React.FC = () => {
  const [userId] = useAtom(userIdAtom);
  const [gameId] = useAtom(gameIdAtom);
  const [userName] = useAtom(userNameAtom);
  const [round, setRound] = useAtom(roundAtom);
  const [isAllUsersReady, setIsAllUsersReady] = useState<boolean>(false);
  const [roundImages, setRoundImages] = useState<
    { userId: string; imageUrl: string; userName: string }[]
  >([]);
  const [, setTemporaryTopGameLayoutMode] = useAtom(gamePageModeAtom);
  const [selectedVoteImage, setSelectedVoteImage] = useState<number | null>(
    null
  );

  const fetchAndUpdateImages = async () => {
    try {
      const gameState = await fetchGameState(gameId);
      if (gameState && gameState.images && gameState.users) {
        const newImages = Object.entries(gameState.images)
          .map(([userId, userImages]) => {
            const userName =
              gameState.users.find((user) => user.userId === userId)
                ?.userName || 'Unknown';
            const imageUrl = userImages[round - 1]?.url;
            return { userId, userName, imageUrl };
          })
          .filter((entry) => entry.imageUrl);

        setRoundImages((prevImages) => {
          const updatedImages = [...prevImages];
          newImages.forEach((newImage) => {
            const exists = updatedImages.some(
              (img) => img.userId === newImage.userId
            );
            if (!exists) {
              updatedImages.push(newImage);
            }
          });
          return updatedImages;
        });
        setIsAllUsersReady(gameState.isAllUsersReady);
      }
    } catch (error) {
      console.error('Error fetching game state:', error);
    }
  };
  const fetchAndUpdateVote = async () => {
    const gameState = await fetchGameState(gameId);
    if (gameState) {
      setIsAllUsersReady(gameState.isAllUsersReady);
    }
  };

  const { startPolling, stopPolling } = usePolling(fetchAndUpdateImages, 1000);
  const { startPolling: startVotePolling, stopPolling: stopVotePolling } =
    usePolling(fetchAndUpdateVote, 1000);

  useEffect(() => {
    startPolling();
    return () => stopPolling();
  }, [gameId]);

  useEffect(() => {
    if (isAllUsersReady) {
      stopPolling();
      stopVotePolling(); // ポーリング停止
      if (round === 4) {
        setTemporaryTopGameLayoutMode({ mode: 'result' });
      } else {
        setRound(round + 1);
      }
    }
  }, [isAllUsersReady]);

  const handleZero = () => {
    setTemporaryTopGameLayoutMode({ mode: 'generate' });
  };

  const handleVoted = async (
    value: { userId: string; imageUrl: string; userName?: string },
    index: number
  ) => {
    console.log(`Vote ${index + 1} clicked!`);
    // voteではuserStatusは現在未使用ですが、拡張性を考慮して含めています
    const userStatus = {
      userId: userId,
      userName: userName,
      isReady: true,
    };
    await updateGameState({
      gameId: gameId,
      gameStateRequestType: 'vote',
      userStatus,
      voteTargetUserId: value.userId,
    });

    await updateGameState({
      gameId: gameId,
      gameStateRequestType: 'ready',
      userStatus,
    });

    setIsAllUsersReady(false);
    startVotePolling();
  };

  // 画像以外をクリックしたら選択解除
  const handleBackgroundClick = () => {
    setSelectedVoteImage(null);
  };

  // タップ1回目：画像に投票の文字、2回目：投票機能発火

  const handleTap = (
    value: { userId: string; imageUrl: string; userName?: string },
    index: number
  ) => {
    if (round !== 4) return;

    if (selectedVoteImage !== index) {
      setSelectedVoteImage(index);
    } else if (userId !== value.userId) {
      handleVoted(value, index);
    }
  };

  const isDisabled = (
    value: { userId: string; imageUrl: string; userName?: string },
    index: number
  ) => {
    return userId === value.userId && round === 4;
  };

  const isVoteOverlayVisible = (
    value: { userId: string; imageUrl: string; userName?: string },
    index: number
  ) => {
    return (
      userId !== value.userId && selectedVoteImage === index && round === 4
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4 p-4">
      {roundImages.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
          {roundImages.map((image, index) => (
            <div
              key={index}
              className={`relative p-2 border rounded-lg transition-transform duration-200 cursor-pointer ${
                selectedVoteImage === index ? 'bg-gray-800/50' : ''
              } ${
                userId === image.userId ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={() => {
                if (userId !== image.userId && round === 4)
                  handleTap(image, index);
              }}
            >
              <p className="absolute top-0 left-0 text-sm bg-white px-2 py-1 rounded shadow">
                {image.userName}
              </p>
              <img
                src={image.imageUrl}
                alt="Generated"
                className="w-full h-auto rounded-lg"
              />
              {selectedVoteImage === index && round === 4 && (
                <p className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/50 text-white font-bold">
                  投票する
                </p>
              )}
            </div>
          ))}
        </div>
      )}
      {round !== 4 && isAllUsersReady && (
        <>
          <p>全員揃ったから次のステージに移動するね！</p>
          <CountDown
            seconds={10}
            onZero={() => setTemporaryTopGameLayoutMode({ mode: 'generate' })}
          />
        </>
      )}
      {round === 4 && isAllUsersReady && (
        <p>一番テーマに近い画像に投票してね！</p>
      )}
      {round === 4 && !isAllUsersReady && <p>集計中だよ！</p>}
      {round !== 4 && !isAllUsersReady && (
        <>
          <p>ROUND {round}</p>
          <p>全員揃うまでもう少し待ってね！</p>
        </>
      )}
    </div>
  );
};
