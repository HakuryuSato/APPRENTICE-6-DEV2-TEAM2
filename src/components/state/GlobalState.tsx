// 開発中に確認とリセットができるように、グローバルステートを表示するコンポーネント
// TopPageの<GlobalState />をコメントアウトすることで、非表示にできる

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
import { useResetState } from '../../hooks/top/TopPage/useResetState';

export const GlobalState: React.FC = () => {
  const [userName] = useAtom(userNameAtom);
  const [gameId] = useAtom(gameIdAtom);
  const [userId] = useAtom(userIdAtom);
  const [temporaryTopPageLayoutMode] = useAtom(topPageModeAtom);
  const [gamePageMode] = useAtom(gamePageModeAtom);

  const handleReset = useResetState(); // 状態リセットのための関数を取得

  return (
    <div className="bg-blue-50 rounded-xl shadow-lg p-8 max-w-lg w-full text-center">
      <h2 className="mb-6 text-2xl font-semibold text-blue-800">
        Global State for DEV
      </h2>
      <div className="space-y-4">
        <div className="flex justify-between bg-blue-100 p-4 rounded-md">
          <span className="font-semibold text-blue-700">UserName:</span>
          <span>{userName || 'N/A'}</span>
        </div>
        <div className="flex justify-between bg-blue-100 p-4 rounded-md">
          <span className="font-semibold text-blue-700">GameId:</span>
          <span>{gameId || 'N/A'}</span>
        </div>
        <div className="flex justify-between bg-blue-100 p-4 rounded-md">
          <span className="font-semibold text-blue-700">UserId:</span>
          <span>{userId || 'N/A'}</span>
        </div>
        <div className="flex justify-between bg-blue-100 p-4 rounded-md">
          <span className="font-semibold text-blue-700">TopPageMode:</span>
          <span>{temporaryTopPageLayoutMode?.mode || 'N/A'}</span>
        </div>
        <div className="flex justify-between bg-blue-100 p-4 rounded-md">
          <span className="font-semibold text-blue-700">GamePageMode:</span>
          <span>{gamePageMode?.mode || 'N/A'}</span>
        </div>
      </div>
      <Button onClick={handleReset} className="bg-blue-600 text-white mt-6 px-5 py-3 rounded-md hover:bg-blue-700 transition-colors">
        Reset State
      </Button>
    </div>
  );
}
