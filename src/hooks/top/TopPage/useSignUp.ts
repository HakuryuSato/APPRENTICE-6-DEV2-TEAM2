import { useState } from 'react';

export const useSignUp = () => {
  const [inputText, setInputText] = useState('');

  const handleClickSubmit = () => {
    console.log(inputText);
  };

  return {
    inputText,
    setInputText,
    handleClickSubmit,
  };
};
