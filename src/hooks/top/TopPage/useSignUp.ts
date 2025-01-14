import { topPageModeAtom } from '@/atoms/state';
import { useAtom } from 'jotai';
import { useState } from 'react';

export const useSignUp = (setUserName: (name: string) => void) => {
  const [inputText, setInputText] = useState('');
  const [temporaryTopPageLayoutMode, setTemporaryTopPageLayoutMode] =
    useAtom(topPageModeAtom); // グローバルステートから取得]

  const handleClickSubmit = () => {
    if (inputText.trim() !== '') {
      // GlobalStateのuserNameを更新
      setUserName(inputText);
      setTemporaryTopPageLayoutMode({ mode: 'select' });
      console.log('userName updated:', inputText);
      console.log('temporaryTopPageLayoutMode:', temporaryTopPageLayoutMode);
    } else {
      alert('ニックネームを入力してください。');
    }
  };

  return {
    inputText,
    setInputText,
    handleClickSubmit,
  };
};
