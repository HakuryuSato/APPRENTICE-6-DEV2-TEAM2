import { useState } from 'react';
import { Vote } from './VoteContainer/Vote';

export const VoteContainer: React.FC = () => {
  // ここでhandleVoted時に、投票主のuserIdと投票先のuserIdをGameStateAPIへ送信する必要があります(注：まだAPI側でVote未実装です)
  const userId = 1;
  const [selectedVoteImage, setSelectedVoteImage] = useState<number | null>(
    null
  );
  const handleVoted = (index: number) => {
    console.log(`Vote ${index + 1} clicked!`);
  };
  const handleBackgroundClick = () => {
    setSelectedVoteImage(null); // 画像以外をクリックしたら選択解除
  };

  return (
    <div
      className="flex items-center justify-center h-screen"
      onClick={handleBackgroundClick}
    >
      <div
        className="grid grid-cols-2 gap-4 w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {[0, 1, 2, 3].map((index) => (
          <Vote
            key={index}
            imageUrl={`https://images.unsplash.com/photo-1736010755388-68a7d4cc0d62?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
            handleVoted={
              userId !== index ? () => handleVoted(index) : undefined
            }
            isSelected={selectedVoteImage === index}
            onTap={() => setSelectedVoteImage(index)}
          />
        ))}
      </div>
    </div>
  );
};
