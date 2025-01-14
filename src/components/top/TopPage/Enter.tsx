import React from 'react';
import { useAtom } from "jotai";
import { gameIdAtom, topPageModeAtom, userNameAtom } from "@/atoms/state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from 'next/navigation';


export const Enter: React.FC = () => {
    const router = useRouter();
    const [userName] = useAtom(userNameAtom);
    const [gameId, setGameId] = useAtom(gameIdAtom);
    const [temporaryTopPageLayoutMode, setTemporaryTopPageLayoutMode] = useAtom(topPageModeAtom); // グローバルステートから取得
    
    const [inputText, setInputText] = useState('')
    const [errorText, setErrorText] = useState('')

    const handleClickBack = () => {
      setTemporaryTopPageLayoutMode({ mode: 'select' });
    }
  
    const handleClickSubmit = () => {
      if (!inputText.trim()) {
        setErrorText("ゲームIDを入力してください。");
        return;
      }
      setGameId(inputText);
      router.push(`/game/${gameId}`);
    }


  return (
    <div className="flex flex-col items-center gap-4">
      <h1>現在は {temporaryTopPageLayoutMode.mode}モードです。</h1>
      <p>ニックネーム: {userName}</p>

      <h1>ゲームIDを入力してください</h1>
      <Input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="ゲームID"
        className="w-[300px]"
      />
      <p className='text-red-500'>{errorText}</p>
      <div className="flex gap-4">
        <Button onClick={handleClickSubmit}>roomに入る</Button>
        <Button className="bg-slate-500" onClick={handleClickBack}>戻る</Button>
      </div>
    </div>


  );
};

export default Enter;
