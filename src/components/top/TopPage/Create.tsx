import React from 'react';
import { useAtom } from "jotai";
import { gameIdAtom, topPageModeAtom, userNameAtom } from "@/atoms/state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from 'next/navigation';
// import { fetchGameState, updateGameState } from '@/utils/client/apiClient';
// import { UserStatus } from '@/types/UserStatus';


export const Create: React.FC = () => {
    const router = useRouter();
    const [userName] = useAtom(userNameAtom);
    // const [userId, setUserId] =useAtom(userIdAtom)
    const [,setGameId] = useAtom(gameIdAtom);
    const [temporaryTopPageLayoutMode, setTemporaryTopPageLayoutMode] = useAtom(topPageModeAtom); // グローバルステートから取得
    
    const [inputText, setInputText] = useState('')
    const [errorText, setErrorText] = useState('')

    const handleClickBack = () => {
      setTemporaryTopPageLayoutMode({ mode: 'select' });
    }
    

    const handleClickSubmit = async () => {
      if (!inputText.trim()) {
        setErrorText("任意のゲームIDを入力してください。");
        return;
      }

      // const gameState = await fetchGameState(inputText.trim());
      // console.log("fetchGameState のレスポンス:", gameState)
      // if (gameState !== null && !(Array.isArray(gameState) && gameState.length === 0) && Object.keys(gameState).length !== 0){
      //   setErrorText(`${inputText.trim()}は使用中です。別の合言葉を作成してください。`);
      // } else {
      //   try {
      //     const userStatus: UserStatus = {
      //       userId: userId,
      //       userName: userName,
      //       isReady: false,
      //     };
        
      //     console.log("updateGameState に渡すデータ:", {
      //       gameId: inputText.trim(),
      //       gameStateRequestType: "create",
      //       userStatus,
      //     });
        
      //     const response = await updateGameState({
      //       gameId: inputText.trim(),
      //       gameStateRequestType: "create",
      //       userStatus, 
      //     });
        
      //     if (response && response.success) {
      //       console.log("ゲーム状態の保存に成功:", response);
      //       // 成功時の処理
      //       setGameId(inputText.trim()); 
      //       router.push(`/game/${inputText.trim()}`);
      //     } else {
      //       console.log("ゲーム状態の保存に失敗:", response);
      //       setErrorText("ゲームの作成に失敗しました。もう一度お試しください。");
      //     }
      //   } catch (error) {
      //     console.error("エラーが発生しました:", error);
      //     setErrorText("エラーが発生しました。もう一度お試しください。");
      //   }
        
      // }
      setGameId(inputText.trim()); 
      router.push(`/game/${inputText.trim()}`);
    }

  return (
    <div className="flex flex-col items-center gap-4">
      <h1>現在は {temporaryTopPageLayoutMode.mode}モードです。</h1>
      <p>ニックネーム: {userName}</p>

      <h1>任意のゲームIDを入力してください</h1>
      <Input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="ゲームID"
        className="w-[300px]"
      />
      <p className='text-red-500'>{errorText}</p>
      <div className="flex gap-4">
        <Button onClick={handleClickSubmit}>roomを作る</Button>
        <Button className="bg-slate-500" onClick={handleClickBack}>戻る</Button>
      </div>
    </div>


  );
};

export default Create;
