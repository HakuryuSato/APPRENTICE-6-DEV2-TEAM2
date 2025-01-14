import React from 'react';
import { useSignUp } from '@/hooks/top/TopPage/useSignUp';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAtom } from 'jotai';
import { userNameAtom } from '@/atoms/state';

export const SignUp: React.FC = () => {
  const [userName, setUserName] = useAtom(userNameAtom);
  console.log(userName);
  const { inputText, setInputText, handleClickSubmit } = useSignUp(setUserName);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
      }}
    >
      <h1>ようこそ、まずはニックネームを入力！ :D</h1>
      <Input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="ニックネーム"
        style={{ width: '300px' }}
      />
      <Button onClick={handleClickSubmit}>はじめる</Button>
    </div>
  );
};

export default SignUp;
