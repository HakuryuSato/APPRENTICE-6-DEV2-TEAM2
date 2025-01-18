import React from "react";
import { useSignUp } from "@/hooks/top/TopPage/useSignUp";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useBgm } from "@/context/BgmContext"; 

export const SignUp: React.FC = () => {
  const { inputText, setInputText, handleClickSubmit } = useSignUp();
  const { togglePlay } = useBgm(); // ここでBGMを再生する

  const handleStart = () => {
    togglePlay(); // BGM を再生
    handleClickSubmit(); // SignUp のロジックを実行
  };

  return (
    <>
      <h1>ニックネームを入力してね</h1>
      <Input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="ニックネーム"
      />
      <Button className="" onClick={handleStart}>はじめる</Button>
    </>
  );
};

export default SignUp;
