import React, { useState } from 'react';
import { GeneratedImage } from '../../GeneratedImage';

interface VoteProps {
  imageUrl: string;
  handleVoted?: () => void;
  isSelected: boolean;
  onTap: () => void;
}

export const Vote: React.FC<VoteProps> = ({
  handleVoted,
  imageUrl,
  isSelected,
  onTap,
}) => {
  const handleTap = () => {
    if (!isSelected) {
      onTap(); // 現在の選択状態を親に通知
    } else if (handleVoted) {
      handleVoted(); // 選択状態で2回目のタップ時に発火
    }
  };

  return (
    <div
      className={`flex flex-col items-center space-y-4 ${
        handleVoted ? 'cursor-pointer' : 'opacity-50'
      }`}
      role="button"
      onClick={handleTap}
    >
      <div className="relative w-full h-full rounded-md overflow-hidden">
        <GeneratedImage url={imageUrl} />
        {handleVoted && isSelected && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white text-xs font-bold">投票する</span>
          </div>
        )}
      </div>
    </div>
  );
};
