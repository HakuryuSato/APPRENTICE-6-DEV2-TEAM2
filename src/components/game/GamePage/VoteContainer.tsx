import { Vote } from "./VoteContainer/Vote";

export const VoteContainer: React.FC = () => {
  // ここでhandleVoted時に、投票主のuserIdと投票先のuserIdをGameStateAPIへ送信する必要があります(注：まだAPI側でVote未実装です)
  return (
    <>
    {/* ループして生成された画像と投票ボタンを表示 */}
      <Vote/>
      <Vote/>
      <Vote/>
      <Vote/>
    </>
  );
};
