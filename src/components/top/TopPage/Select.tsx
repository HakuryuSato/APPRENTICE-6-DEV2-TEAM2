import React from 'react';
import { useAtom } from 'jotai';
import { topPageModeAtom, userNameAtom } from '@/atoms/state';
import ThreeDButton from '@/components/3DButton/3DButton';
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
      <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginBottom: '2rem' }}>
        <div style={{ width: '200px', height: '200px' }}>
        <ThreeDButton
            firstText="部屋を作る"
            secondText="部屋を作る"
            handleEnter={handleClickCreate}
            style={{
              width: '100%',
              height: '100%',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            initialImage="/images/DoorClose.png"
            afterClickImage="/images/DoorOpen.png"
          />
        </div>
        <div style={{ width: '200px', height: '200px' }}>
          <ThreeDButton
            firstText="部屋に入る"
            secondText="部屋に入る"
            handleEnter={handleClickEnter}
            style={{
              width: '100%',
              height: '100%',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
            initialImage="/images/DoorClose.png"
            afterClickImage="/images/DoorOpen.png"
          />
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Button onClick={handleClickBack}>戻る</Button>
      </div>
    </>
  );
};

export default Select;
