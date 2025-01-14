//開発中に確認とリセットができるように、グローバルステートを表示するコンポーネント
//TopPageの<GlobalState />をコメントアウトすることで、非表示にできる

import React from 'react';
import { useAtom } from 'jotai';
import {
  userNameAtom,
  gameIdAtom,
  userIdAtom,
  topPageModeAtom,
  gamePageModeAtom,
} from '../../atoms/state';
import { Button } from '../ui/button';
import { useResetState } from '@/hooks/top/TopPage/useResetState';

export const GlobalState: React.FC = () => {
  const [userName] = useAtom(userNameAtom);
  const [gameId] = useAtom(gameIdAtom);
  const [userId] = useAtom(userIdAtom);
  const [temporaryTopPageLayoutMode] = useAtom(topPageModeAtom);
  const [gamePageMode] = useAtom(gamePageModeAtom);

  const handleReset = useResetState(); //状態リセットのための関数を取得

  return (
    <div className="bg-fly-blue rounded-lg shadow-md p-6 max-w-md w-full text-center">
      <h2 className="mb-4 text-xl font-semibold text-fly-navy">
        Global State for DEV
      </h2>
      <div className="grid gap-4">
        <div className="flex justify-between bg-fly-cream p-3 rounded-md">
          <span className="font-bold text-fly-navy">UserName:</span>
          <span>{userName || 'N/A'}</span>
        </div>
        <div className="flex justify-between bg-fly-cream p-3 rounded-md">
          <span className="font-bold text-fly-navy">GameId:</span>
          <span>{gameId || 'N/A'}</span>
        </div>
        <div className="flex justify-between bg-fly-cream p-3 rounded-md">
          <span className="font-bold text-fly-navy">UserId:</span>
          <span>{userId || 'N/A'}</span>
        </div>
        <div className="flex justify-between bg-fly-cream p-3 rounded-md">
          <span className="font-bold text-fly-navy">TopPageMode:</span>
          <span>{temporaryTopPageLayoutMode?.mode || 'N/A'}</span>
        </div>
        <div className="flex justify-between bg-fly-cream p-3 rounded-md">
          <span className="font-bold text-fly-navy">GamePageMode:</span>
          <span>{gamePageMode?.mode || 'N/A'}</span>
        </div>
      </div>
      <Button onClick={handleReset} className="bg-fly-purple text-white mt-4 px-4 py-2 rounded-md">
        ResetState
      </Button>
    </div>
  );
}
