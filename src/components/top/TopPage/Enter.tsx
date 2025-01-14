import React from 'react';
import { useAtom } from 'jotai';
import { gameIdAtom, topPageModeAtom, userNameAtom } from '@/atoms/state';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchGameState } from '@/utils/client/apiClient';

export const Enter: React.FC = () => {
  const router = useRouter();
  const [userName] = useAtom(userNameAtom);
  const [gameId, setGameId] = useAtom(gameIdAtom);
  const [, setTemporaryTopPageLayoutMode] = useAtom(topPageModeAtom); // グローバルステートから取得

  const [inputText, setInputText] = useState('');
  const [errorText, setErrorText] = useState('');

  const handleClickBack = () => {
    setTemporaryTopPageLayoutMode({ mode: 'select' });
  };

  const handleClickSubmit = async () => {
    if (!inputText.trim()) {
      setErrorText('ゲームIDを入力してください。');
      return;
    }
    try {
      const gameState = await fetchGameState(inputText.trim());
      if (gameState === null) {
        setErrorText(`${inputText.trim()}のroomが見つかりません`);
        return;
      }
      setGameId(inputText.trim());
      router.push(`/game/${inputText.trim()}`);
    } catch (error) {
      console.error('エラー:', error);
      setErrorText(
        'ゲームIDの確認中にエラーが発生しました。もう一度お試しください。'
      );
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <p>ニックネーム: {userName}</p>

      <h1>ゲームIDを入力してください</h1>
      <Input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="ゲームID"
        className="w-[300px]"
      />
      <p className="text-red-500">{errorText}</p>
      <div className="flex gap-4">
        <Button onClick={handleClickSubmit}>roomに入る</Button>
        <Button className="bg-slate-500" onClick={handleClickBack}>
          戻る
        </Button>
      </div>
    </div>
  );
};

export default Enter;
