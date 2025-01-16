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
    <div>
      {/* モードが 'sign-up' の場合に SignUp コンポーネントを表示 */}
      {temporaryTopPageLayoutMode?.mode === 'sign-up' && <SignUp />}
      {temporaryTopPageLayoutMode?.mode === 'select' && <Select />}
      {temporaryTopPageLayoutMode?.mode === 'create' && <Create />}
      {temporaryTopPageLayoutMode?.mode === 'enter' && <Enter />}
    </div>
    //   <GlobalState />
  );
};
