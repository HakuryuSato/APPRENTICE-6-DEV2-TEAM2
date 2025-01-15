import { topPageModeAtom, userIdAtom, userNameAtom } from '@/atoms/state';
import { useAtom } from 'jotai';
import { useState } from 'react';

export const useSignUp = () => {
  const [inputText, setInputText] = useState('');

  // グローバルステート群
  const [topPageLayoutMode, setTopPageLayoutMode] = useAtom(topPageModeAtom);
  const [userName, setUserName] = useAtom(userNameAtom);
  const [userId, setUserId] = useAtom(userIdAtom);

  const handleClickSubmit = () => {
    if (inputText !== '') {
      const uuid = crypto.randomUUID() // 例)"ee3e7d94-b735-4865-ada1-7e86a7723c8f"

      setUserName(inputText);
      setUserId(uuid); // uuid生成
      setTopPageLayoutMode({ mode: 'select' });
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
