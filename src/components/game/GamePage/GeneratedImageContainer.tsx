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
    { userId: string; imageUrl: string }[]
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

  const handleVoted = (
    value: { userId: string; imageUrl: string },
    index: number
  ) => {
    console.log(`Vote ${index + 1} clicked!`);
    // voteではuserStatusは現在未使用ですが、拡張性を考慮して含めています
    const userStatus = {
      userId: userId,
      userName: userName,
      isReady: true,
    };
    updateGameState({
      gameId: gameId,
      gameStateRequestType: 'vote',
      userStatus,
      voteTargetUserId: value.userId,
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
    value: { userId: string; imageUrl: string },
    index: number
  ) => {
    if (round !== 4 && isAllUsersReady) return;
    if (selectedVoteImage !== index) {
      setSelectedVoteImage(index);
    } else if (userId !== value.userId) {
      handleVoted(value, index);
    }
  };

  const isDisabled = (
    value: { userId: string; imageUrl: string },
    index: number
  ) => {
    if (round !== 4 && isAllUsersReady) return false;
    return userId === value.userId;
  };

  const isVoteOverlayVisible = (
    value: { userId: string; imageUrl: string },
    index: number
  ) => {
    if (round !== 4 && isAllUsersReady) return false;
    return userId !== value.userId && selectedVoteImage === index;
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen space-y-4 p-4"
      onClick={handleBackgroundClick}
    >
      {round !== 4 && isAllUsersReady && (
        <>
          <p>全員揃ったから次のステージに移動するね！</p>
          <CountDown seconds={10} onZero={handleZero} />
        </>
      )}
      {round === 4 && isAllUsersReady && (
        <>
          <p>一番テーマに近い画像に投票してね！</p>
        </>
      )}
      {round === 4 && !isAllUsersReady && (
        <>
          <p>集計中だよ！</p>
        </>
      )}
      {round !== 4 && !isAllUsersReady && (
        <>
          <p>ROUND{round}</p>
          <p>全員揃うまでもう少し待ってね！</p>
        </>
      )}

      <div className="grid grid-cols-2 gap-4 w-full">
        {/* 特定のユーザーを先頭に並べ替える */}
        {[...roundImages]
          .sort((a, b) => (a.userId === userId ? -1 : 1))

          .map((value, index) => (
            <div
              key={index}
              className={`flex flex-col items-center space-y-4 ${
                round === 4 && isDisabled(value, index) ? 'opacity-50' : ''
              }`}
              role="button"
              onClick={() => handleTap(value, index)}
            >
              <div className="relative w-full h-full rounded-md overflow-hidden border border-gray-300">
                {/* 左上に userName を表示 */}
                <div className="absolute top-0 left-0 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-br-md">
                  {value.userName}
                </div>
                {/* 画像またはプレースホルダー */}
                <GeneratedImage className="" url={value.imageUrl || ''} />
                {isVoteOverlayVisible(value, index) && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">
                      投票する
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
