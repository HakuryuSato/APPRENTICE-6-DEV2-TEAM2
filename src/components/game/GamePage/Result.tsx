"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  gameIdAtom,
  gamePageModeAtom,
  userIdAtom,
  userNameAtom,
} from "@/atoms/state";
import { Button } from "@/components/ui/button";
import { useResetState } from "@/hooks/top/TopPage/useResetState";
import { useRouter } from "next/navigation";
import { fetchGameState } from "@/utils/client/apiClient";
import DrawResult from "./ResultPattern/DrawResult";
import OnlyResult from "./ResultPattern/OnlyResult";
import { useAtom } from "jotai";
import { GameState } from "@/types/GameState";
import { UserStatus } from "@/types/UserStatus";
import { useResetVercelKV } from "@/hooks/top/TopPage/useResetVercelKV";

type User = UserStatus & {
  vote: number; // 追加したい項目
};

export const Result: React.FC = () => {
  // const [resultState, setResultState] = useState<GameState | null>(null); // 修正: 初期値を null に変更
  // const resultUsers = resultState?.users || []; // デフォルト値を空配列に
  // console.log(resultState);

  // const [gameId] = useAtom(gameIdAtom);
  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await fetchGameState(gameId);
  //       if (!response.ok) throw new Error('Failed to fetch users');
  //       const data: GameState = await response.json(); // 修正: 型を GameState に指定
  //       setResultState(data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchUsers();
  // }, [gameId]); // 修正: gameId を依存配列に追加

  const resultUsers = [
    { userId: "user1", userName: "Alice", vote: 2, isReady: true },
    { userId: "user2", userName: "Bob", vote: 1, isReady: true },
    { userId: "user3", userName: "Ciel", vote: 0, isReady: true },
    { userId: "user4", userName: "Dave", vote: 1, isReady: true },
  ]; // テスト用のダミーデータ

  if (resultUsers.length === 0) {
    return <p>Loading...</p>; // ロード中の表示
  }

  // 1位のユーザーを抽出
  const sortedUsers = [...resultUsers].sort((a, b) => b.vote - a.vote);
  const maxVote = sortedUsers[0].vote;

  // 同率1位のユーザーをフィルタリング
  const drawUsers = sortedUsers.filter((user) => user.vote === maxVote);
  const otherUsers = sortedUsers.slice(drawUsers.length);

  // ゲームリセットの処理
  const resetState = useResetState(); // フックをトップレベルで呼び出す
  const router = useRouter(); // useRouter もトップレベルで呼び出す
  
  // vercelKVの削除用
  const { resetVercelKV } = useResetVercelKV();
  const [gameId] = useAtom(gameIdAtom)


  const handleClickResetGame = () => {
    resetVercelKV(gameId) // 該当GameIDの情報をVercelKVから削除
    resetState(); // 状態リセット
    router.push("/"); // トップページに遷移
  };

  return (
    <>
      <h1 className="font-semibold text-2xl">Result</h1>
      {drawUsers.length > 1
        ? (
          // 同率1位が複数人いる場合
          <DrawResult drawUsers={drawUsers} otherUsers={otherUsers} />
        )
        : (
          // 1人だけ1位の場合
          <OnlyResult firstUser={drawUsers[0]} otherUsers={otherUsers} />
        )}

      <Button
        onClick={handleClickResetGame}
        className="mt-4 p-2 bg-fly-purple text-white rounded-lg"
      >
        end game
      </Button>
    </>
  );
};
