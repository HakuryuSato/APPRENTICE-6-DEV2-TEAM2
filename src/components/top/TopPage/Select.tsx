// 形式のため作りましたが、不要であれば削除してください。import React from 'react';
import { useAtom } from 'jotai';
import { topPageModeAtom, userNameAtom } from '@/atoms/state';
import { Button } from '@/components/ui/button';

export const Select: React.FC = () => {
  const [userName] = useAtom(userNameAtom);
  const [temporaryTopPageLayoutMode, setTemporaryTopPageLayoutMode] =
    useAtom(topPageModeAtom); // グローバルステートから取得

  const handleClickCreate = () => {
    setTemporaryTopPageLayoutMode({ mode: 'create' });
  };
  const handleClickEnter = () => {
    setTemporaryTopPageLayoutMode({ mode: 'enter' });
  };
  const handleClickBack = () => {
    setTemporaryTopPageLayoutMode({ mode: 'sign-up' });
  };

  return (
    <>
      <p>ニックネーム: {userName}</p>
      <div>
        <Button onClick={handleClickCreate}>ルームを作る</Button>
        <Button onClick={handleClickEnter}>ルームに入る</Button>
      </div>
      <Button onClick={handleClickBack}>戻る</Button>
    </>
  );
};

export default Select;
