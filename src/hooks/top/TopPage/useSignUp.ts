import { useState } from 'react';

export const useSignUp = () => {
  const [inputText, setInputText] = useState('');

  const handleClickSubmit = () => {
    // ここでinputTextをGlobalStateのuserNameに格納するよう変更
    console.log(inputText);
  };

  return {
    inputText,
    setInputText,
    handleClickSubmit,
  };
};
