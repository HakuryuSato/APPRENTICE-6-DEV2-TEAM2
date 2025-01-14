import React from 'react';
import { SignUp } from './TopPage/SignUp';
import { Select } from './TopPage/Select';
import { Create } from './TopPage/Create';
import { Enter } from './TopPage/Enter';
import { useAtom } from 'jotai';
import { topPageModeAtom } from '@/atoms/state';

import { GlobalState } from '@/components/state/GlobalState';

export const TopPage: React.FC = () => {
  const [temporaryTopPageLayoutMode] = useAtom(topPageModeAtom); // グローバルステートから現在のモードを取得

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column', // ここで縦並びに設定
      }}
    >
      <div>
        {/* モードが 'sign-up' の場合に SignUp コンポーネントを表示 */}
        {temporaryTopPageLayoutMode?.mode === 'sign-up' && <SignUp />}
        {temporaryTopPageLayoutMode?.mode === 'select' && <Select />}
        {temporaryTopPageLayoutMode?.mode === 'create' && <Create />}
        {temporaryTopPageLayoutMode?.mode === 'enter' && <Enter />}
      </div>
      <div
        style={{
          marginTop: '20px', // 上のコンポーネントとの間隔を追加
        }}
      >
        <GlobalState />
      </div>
    </div>
  );
};
