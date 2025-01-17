import React from "react";
import { useSignUp } from "@/hooks/top/TopPage/useSignUp";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const SignUp: React.FC = () => {
  const { inputText, setInputText, handleClickSubmit } = useSignUp();

  return (
    <>
      <h1>ニックネームの入力</h1>
      <Input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="ニックネーム"
      />
      <Button onClick={handleClickSubmit}>はじめる</Button>
    </>
  );
};

export default SignUp;
