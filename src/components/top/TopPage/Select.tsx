import React from 'react';
import { useAtom } from 'jotai';
import { topPageModeAtom, userNameAtom } from '@/atoms/state';
import ThreeDButton from '@/components/3DButton/3DButton';

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
      <div style={{ display: 'flex', gap: '1rem' }}>
        <ThreeDButton
          firstText="ルームを作る"
          secondText="作成する"
          handleEnter={handleClickCreate}
        />
        <ThreeDButton
          firstText="ルームに入る"
          secondText="入室する"
          handleEnter={handleClickEnter}
        />
      </div>
      <div style={{ marginTop: '1rem' }}>
        <ThreeDButton
          firstText="戻る"
          secondText="戻る"
          handleEnter={handleClickBack}
        />
      </div>
    </>
  );
};

export default Select;
