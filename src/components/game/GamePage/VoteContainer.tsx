import { Vote } from './VoteContainer/Vote';

export const VoteContainer: React.FC = () => {
  // ここでhandleVoted時に、投票主のuserIdと投票先のuserIdをGameStateAPIへ送信する必要があります(注：まだAPI側でVote未実装です)
  const handleVoted = () => {
    console.log('投票されたよ');
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="grid grid-cols-2 gap-4 w-full">
        <Vote
          handleVoted={handleVoted}
          imageUrl="https://images.unsplash.com/photo-1736010755388-68a7d4cc0d62?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <Vote
          handleVoted={handleVoted}
          imageUrl="https://images.unsplash.com/photo-1736010755388-68a7d4cc0d62?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <Vote
          handleVoted={handleVoted}
          imageUrl="https://images.unsplash.com/photo-1736010755388-68a7d4cc0d62?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <Vote imageUrl="https://images.unsplash.com/photo-1736010755388-68a7d4cc0d62?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
      </div>
    </div>
  );
};
