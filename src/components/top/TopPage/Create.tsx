import React from 'react';
import { useAtom } from 'jotai';
import {
  gameIdAtom,
  topPageModeAtom,
  userIdAtom,
  userNameAtom,
} from '@/atoms/state';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchGameState, updateGameState } from '@/utils/client/apiClient';
import { UserStatus } from '@/types/UserStatus';

export const Create: React.FC = () => {
  const router = useRouter();
  const [userName] = useAtom(userNameAtom);
  const [userId] = useAtom(userIdAtom);
  const [, setGameId] = useAtom(gameIdAtom);
  const [, setTemporaryTopPageLayoutMode] = useAtom(topPageModeAtom); // グローバルステートから取得

  const [inputText, setInputText] = useState('');
  const [errorText, setErrorText] = useState('');

  const handleClickBack = () => {
    setTemporaryTopPageLayoutMode({ mode: 'select' });
  };

  const handleClickSubmit = async () => {
    if (!inputText.trim()) {
      setErrorText('任意のゲームIDを入力してください。');
      return;
    }

    try {
      const gameState = await fetchGameState(inputText.trim());
      if (gameState !== null) {
        setErrorText(
          `${inputText.trim()}は使用中です。別の合言葉を作成してください。`
        );
        return;
      }

      const userStatus: UserStatus = {
        userId: userId,
        userName: userName,
        isReady: true,
      };

      const response = await updateGameState({
        gameId: inputText.trim(),
        gameStateRequestType: 'create',
        userStatus,
      });

      if (response) {
        setGameId(inputText.trim());
        router.push(`/game/${inputText.trim()}`);
      } else {
        setErrorText('ゲームの作成に失敗しました。もう一度お試しください。');
      }
    } catch (error) {
      console.error('エラー:', error);
      setErrorText(
        error instanceof Error
          ? `エラーが発生しました: ${error.message}`
          : '不明なエラーが発生しました。もう一度お試しください。'
      );
    }
  };

  return (
    <>
      <p>ニックネーム: {userName}</p>

      <h1>任意のゲームIDを入力してください</h1>
      <Input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="ゲームID"
      />
      <p className="text-red-500">{errorText}</p>
      <div>
        <Button onClick={handleClickSubmit}>roomを作る</Button>
        <Button onClick={handleClickBack}>戻る</Button>
      </div>
    </>
  );
};

export default Create;
