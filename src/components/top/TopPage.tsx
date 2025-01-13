import React from 'react';
import { SignUp } from './TopPage/SignUp';
import { Select } from './TopPage/Select';
import { Create } from './TopPage/Create';
import { Enter } from './TopPage/Enter';
import { useAtom } from 'jotai';
import { topPageModeAtom } from '@/atoms/state';
import { Button } from '../ui/button';
import { useResetState } from '@/hooks/top/TopPage/useResetState';

export const TopPage: React.FC = () => {
  const [temporaryTopPageLayoutMode] = useAtom(topPageModeAtom); // グローバルステートから現在のモードを取得
  const handleReset = useResetState();//状態リセットのための関数を取得

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div>
        {/* モードが 'sign-up' の場合に SignUp コンポーネントを表示 */}
        {temporaryTopPageLayoutMode?.mode === 'sign-up' && <SignUp />}
        {temporaryTopPageLayoutMode?.mode === 'select' && <Select />}
        {temporaryTopPageLayoutMode?.mode === 'create' && <Create />}
        {temporaryTopPageLayoutMode?.mode === 'enter' && <Enter />}
      </div>
      <Button className="bg-slate-500" onClick={handleReset}>ResetState</Button>
    </div>
  );
};
