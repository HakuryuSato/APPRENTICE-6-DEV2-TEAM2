// 形式のため作りましたが、不要であれば削除してください。import React from 'react';
import { useAtom } from 'jotai';
import { topPageModeAtom, userNameAtom } from '@/atoms/state';
import { Button } from '@/components/ui/button';

export const Create: React.FC = () => {
  const [userName] = useAtom(userNameAtom);
  const [temporaryTopPageLayoutMode, setTemporaryTopPageLayoutMode] =
    useAtom(topPageModeAtom); // グローバルステートから取得

  const handleClickSubmit = () => {
    setTemporaryTopPageLayoutMode({ mode: 'enter' });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
      }}
    >
      <h1>現在は {temporaryTopPageLayoutMode.mode}モードです。</h1>
      <h1 className="text-red-300">
        表示しなくていいコンポーネントかもしれません。
      </h1>
      <p>ニックネーム: {userName}</p>

      <Button onClick={handleClickSubmit}>はじめる</Button>
    </div>
  );
};

export default Create;
