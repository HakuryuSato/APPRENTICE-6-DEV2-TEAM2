import React, { useState } from "react";
import { GeneratedImage } from "../../GeneratedImage";

interface VoteProps {
  imageUrl: string;
  handleVoted?: () => void;
}

export const Vote: React.FC<VoteProps> = ({ handleVoted, imageUrl }) => {
  const [isNotTapped, setIsNotTapped] = useState(true);

  const handleTap = () => {
    if (!isNotTapped) {
      // 2回目のタップで handleVoted を発火
      if (handleVoted) {
        handleVoted();
      }
    }
    setIsNotTapped(!isNotTapped);
  };

  return (
    <div
      className={`flex flex-col items-center space-y-4 ${
        handleVoted ? "cursor-pointer" : "opacity-50"
      }`}
      role="button"
      onClick={handleTap}
    >
      <div className="relative w-full h-full rounded-md overflow-hidden">
        <GeneratedImage imageUrl={imageUrl} />
        {handleVoted && !isNotTapped && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white text-xs font-bold">投票する</span>
          </div>
        )}
      </div>
    </div>
  );
};
