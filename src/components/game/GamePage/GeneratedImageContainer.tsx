import React, { useState } from 'react';
import { GeneratedImage } from '../GeneratedImage';

export const GeneratedImageContainer: React.FC = () => {
  // ここでhandleVoted時に、投票主のuserIdと投票先のuserIdをGameStateAPIへ送信する必要があります(注：まだAPI側でVote未実装です)
  const userId = 1; // ログイン中のユーザー ID
  const [selectedVoteImage, setSelectedVoteImage] = useState<number | null>(
    null
  );

  const handleVoted = (index: number) => {
    console.log(`Vote ${index + 1} clicked!`);
    // APIに送信するロジックを追加予定
  };

  const handleBackgroundClick = () => {
    setSelectedVoteImage(null); // 画像以外をクリックしたら選択解除
  };

  const handleTap = (index: number) => {
    if (selectedVoteImage !== index) {
      setSelectedVoteImage(index);
    } else if (userId !== index) {
      handleVoted(index); // 選択状態で2回目のタップ時に発火
    }
  };

  return (
    <div
      className="flex items-center justify-center h-screen"
      onClick={handleBackgroundClick}
    >
      <div
        className="grid grid-cols-2 gap-4 w-full"
        onClick={(e) => e.stopPropagation()} // 背景クリックの伝播を防ぐ
      >
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            className={`flex flex-col items-center space-y-4 ${
              userId !== index ? 'cursor-pointer' : 'opacity-50'
            }`}
            role="button"
            onClick={() => handleTap(index)}
          >
            <div className="relative w-full h-full rounded-md overflow-hidden">
              <GeneratedImage
                url={`https://images.unsplash.com/photo-1736010755388-68a7d4cc0d62?q=80&w=2787&auto=format&fit=crop`}
              />
              {userId !== index && selectedVoteImage === index && (
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
