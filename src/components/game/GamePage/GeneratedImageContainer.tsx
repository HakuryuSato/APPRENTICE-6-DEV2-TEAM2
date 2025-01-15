import React, { useState } from 'react';
import { GeneratedImage } from '../GeneratedImage';

export const GeneratedImageContainer: React.FC = () => {
  // ここでhandleVoted時に、投票主のuserIdと投票先のuserIdをGameStateAPIへ送信する必要があります(注：まだAPI側でVote未実装です)
  // gameStateをポーリングして取得、4人が揃ったらGenerateへ移動
  // 未実装：投票API、fetchGameState(ポーリングあり)、isAllReady関連のもの

  const userId = '1'; // ログイン中のユーザー ID
  const userIds = ['0', '1', '2', '3'];
  const round = 3;
  const imageUrl =
    'https://images.unsplash.com/photo-1736010755388-68a7d4cc0d62?q=80&w=2787&auto=format&fit=crop';
  // モードかラウンドによって、投票用機能表示
  const [selectedVoteImage, setSelectedVoteImage] = useState<number | null>(
    null
  );

  const handleVoted = (index: number) => {
    console.log(`Vote ${index + 1} clicked!`);
    // APIに投票内容を送信するロジックを追加予定
  };

  // 画像以外をクリックしたら選択解除
  const handleBackgroundClick = () => {
    setSelectedVoteImage(null);
  };

  // タップ1回目：画像に投票の文字、2回目：投票機能発火
  const handleTap = (value: string, index: number) => {
    if (round !== 3) return;

    if (selectedVoteImage !== index) {
      setSelectedVoteImage(index);
    } else if (userId !== value) {
      handleVoted(index);
    }
  };

  const isDisabled = (value: string, index: number) =>
    userId === value && round === 3;

  const isVoteOverlayVisible = (value: string, index: number) =>
    userId !== value && selectedVoteImage === index && round === 3;

  return (
    <div
      className="flex items-center justify-center h-screen"
      onClick={handleBackgroundClick}
    >
      <div
        className="grid grid-cols-2 gap-4 w-full"
        onClick={(e) => e.stopPropagation()} // 背景クリックの伝播を防ぐ
      >
        {userIds.map((value, index) => (
          <div
            key={index}
            className={`flex flex-col items-center space-y-4 ${
              isDisabled(value, index) ? 'opacity-50' : ''
            }`}
            role="button"
            onClick={() => handleTap(value, index)}
          >
            <div className="relative w-full h-full rounded-md overflow-hidden">
              <GeneratedImage className="" url={imageUrl} />
              {isVoteOverlayVisible(value, index) && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">投票する</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
