import React from 'react';
import { useAtom } from 'jotai';
import { topPageModeAtom, userNameAtom } from '@/atoms/state';
import ThreeDButton from '@/components/3DButton/3DButton';
import { Button } from '@/components/ui/button';

export const Select: React.FC = () => {
  const [userName] = useAtom(userNameAtom);
  const [, setTemporaryTopPageLayoutMode] = useAtom(topPageModeAtom); // グローバルステートから取得

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
      {/* 戻るボタン：親を無視して左4px,上4pxの位置に配置 */}
      <Button
        onClick={handleClickBack}
        className="absolute top-4 left-4 bg-fly-softPurple hover:bg-fly-blue text-black"
      >
        戻る
      </Button>

      <p>ニックネーム: {userName}</p>
      <div
        style={{
          width: '100%',
          display: 'flex',
          height: '30%', // ここで3Dボタンの高さ変更
          gap: '2rem',
          justifyContent: 'center',
          marginBottom: '2rem',
        }}
      >
        <div className="w-full h-auto flex flex-row justify-center items-center space-x-8 m-2">
          <ThreeDButton
            text="部屋を作る"
            handleEnter={handleClickCreate}
            initialImage="/images/SimpleHome.png"
            onHoverImage="/images/SimpleHome.png"
          />
          <ThreeDButton
            text="部屋に入る"
            handleEnter={handleClickEnter}
            initialImage="/images/DoorClose.png"
            onHoverImage="/images/DoorOpen.png"
          />
        </div>
      </div>
    </>
  );
};

export default Select;
