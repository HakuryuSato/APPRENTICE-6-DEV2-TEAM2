import React from "react";
import { useAtom } from "jotai";
import {
  gameIdAtom,
  topPageModeAtom,
  userIdAtom,
  userNameAtom,
} from "@/atoms/state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { fetchGameState, updateGameState } from "@/utils/client/apiClient";
import { UserStatus } from "@/types/UserStatus";

export const Enter: React.FC = () => {
  const router = useRouter();
  const [userName] = useAtom(userNameAtom);
  const [userId] = useAtom(userIdAtom);
  const [, setGameId] = useAtom(gameIdAtom);
  const [, setTemporaryTopPageLayoutMode] = useAtom(topPageModeAtom);

  const [inputText, setInputText] = useState("");
  const [errorText, setErrorText] = useState("");

  const handleClickBack = () => {
    setTemporaryTopPageLayoutMode({ mode: "select" });
  };

  const handleClickSubmit = async () => {
    if (!inputText.trim()) {
      setErrorText("ゲームIDを入力してください。");
      return;
    }
    try {
      const gameState = await fetchGameState(inputText.trim());
      if (gameState === null) {
        setErrorText(`${inputText.trim()}の部屋が見つかりません`);
        return;
      }
      const userStatus: UserStatus = {
        userId: userId,
        userName: userName,
        isReady: true,
      };

      const response = await updateGameState({
        gameId: inputText.trim(),
        gameStateRequestType: "enter",
        userStatus,
      });

      if (response) {
        setGameId(inputText.trim());
        router.push(`/game/${inputText.trim()}`);
      } else {
        setErrorText("部屋の作成に失敗しました。もう一度お試しください。");
      }
    } catch (error) {
      console.error("エラー:", error);
      setErrorText(
        "あいことばの確認中にエラーが発生しました。もう一度お試しください。",
      );
    }
  };

  return (
    <>
      {/* 戻るボタン：親を無視して左4px,上4pxの位置に配置 */}
      <Button
        onClick={handleClickBack}
        className="absolute top-4 left-4 bg-fly-softPurple hover:bg-fly-blue text-black"
      >
        戻る
      </Button>

      <p>ニックネーム: {userName}</p>

      <h1>あいことばを入力してね</h1>
      <Input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="あいことば"
      />
      <h2>*一緒に遊ぶには同じあいことばが必要です</h2>
      <p className="text-red-500">{errorText}</p>

      <div>
        <Button onClick={handleClickSubmit}>部屋に入る</Button>
      </div>
    </>
  );
};

export default Enter;
