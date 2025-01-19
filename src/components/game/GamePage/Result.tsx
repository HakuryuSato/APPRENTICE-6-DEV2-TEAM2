'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { gameIdAtom } from '@/atoms/state';
import { Button } from '@/components/ui/button';
import { useResetState } from '@/hooks/top/TopPage/useResetState';
import { useRouter } from 'next/navigation';
import { fetchGameState } from '@/utils/client/apiClient';
import DrawResult from './ResultPattern/DrawResult';
import OnlyResult from './ResultPattern/OnlyResult';
import { useAtom } from 'jotai';
import { GameState } from '@/types/GameState';

import { useResetVercelKV } from '@/hooks/top/TopPage/useResetVercelKV';

export const Result: React.FC = () => {
  // const gameState: GameState = {
  //   gameId: "game12345", // ゲームの一意識別子
  //   targetTheme: "未来の都市", // 今回のゲームのテーマ
  //   round: 1, // 現在のラウンド
  //   users: [
  //     {
  //       userId: "user1", // ユーザーのID
  //       userName: "Alice", // ユーザーの名前
  //       isReady: true, // 準備完了かどうか
  //       votedCount:  0, // 投票された回数（オプショナル）
  //     },
  //     {
  //       userId: "user2",
  //       userName: "Bob",
  //       isReady: false,
  //       votedCount: 1,
  //     },
  //     {
  //       userId: "user3",
  //       userName: "Charlie",
  //       isReady: true,
  //       votedCount: 2,
  //     },
  //     {
  //       userId: "user4",
  //       userName: "Diana",
  //       isReady: false,
  //       votedCount: 3,
  //     },
  //   ], // ゲームに参加しているユーザーのリスト
  //   isAllUsersReady: false, // 全員が準備完了かどうか
  //   images: {
  //     user1: [
  //       {
  //         url: "https://images.unsplash.com/photo-1736010755388-68a7d4cc0d62?q=80&w=2787&auto=format&fit=crop", // ラウンド1の画像URL
  //         isError: false, // エラーが発生していない
  //         error: null, // エラーがない場合はnull
  //       },
  //     ],
  //     user2: [
  //       {
  //         url: "https://images.unsplash.com/photo-1736010755388-68a7d4cc0d62?q=80&w=2787&auto=format&fit=crop",
  //         isError: true, // 画像生成でエラーが発生した
  //         error: new Error("Image generation failed"), // エラーの詳細
  //       },
  //     ],
  //     user3: [
  //       {
  //         url: "https://images.unsplash.com/photo-1736010755388-68a7d4cc0d62?q=80&w=2787&auto=format&fit=crop", // ラウンド1の画像URL
  //         isError: false,
  //         error: null,
  //       },
  //     ],
  //     user4: [
  //       {
  //         url: "https://images.unsplash.com/photo-1736010755388-68a7d4cc0d62?q=80&w=2787&auto=format&fit=crop", // ラウンド1の画像URL
  //         isError: false,
  //         error: null,
  //       },
  //     ],
  //   },
  // };

  const [gameState, setGameState] = useState<GameState | null>(null);
  const [gameId] = useAtom(gameIdAtom);
  const router = useRouter(); // useRouter もトップレベルで呼び出す
  const resetState = useResetState(); // フックをトップレベルで呼び出す
  // vercelKVの削除用
  const { resetVercelKV } = useResetVercelKV();

  useEffect(() => {
    const fetchData = async () => {
      if (!gameId) return;

      try {
        const state = await fetchGameState(gameId);
        if (state) {
          setGameState(state);
        } else {
          console.error('Game state not found');
        }
      } catch (error) {
        console.error('Error fetching game state:', error);
      }
    };
    fetchData();
  }, [gameId]);

  // 効果音再生
  useEffect(() => {
    if (gameState) {
      const audio = new Audio("/sound/和太鼓でカカッ.mp3"); // 効果音ファイルのパス（public/sound/effect.mp3 に配置）
      audio.volume = 0.5; // 音量を設定
      audio.play().catch((error) => {
        console.warn("効果音の再生がブロックされました:", error);
      });
    }
  }, [gameState]);

  // ロード中表示
  if (!gameState) {
    return <p>Loading...</p>;
  } //Apiが完成したらコメントアウトを外す

  const resultUsers = gameState.users.map((user) => {
    const userImages = gameState.images[user.userId] || [];
    const firstImage = userImages[0]?.url || ''; // 画像URLを取得（存在しない場合は空文字）

    return {
      userId: user.userId,
      userName: user.userName,
      votedCount: user.votedCount || 0, // votedCountがない場合は0を設定
      image: {
        user: {
          url: firstImage,
        },
      },
    };
  });

  if (resultUsers.length === 0) {
    return <p>Loading...</p>; // ロード中の表示
  }

  // 1位のユーザーを抽出
  const sortedUsers = [...resultUsers].sort(
    (a, b) => b.votedCount - a.votedCount
  );
  const maxVote = sortedUsers[0].votedCount;
  // 同率1位のユーザーをフィルタリング
  const drawUsers = sortedUsers.filter((user) => user.votedCount === maxVote);
  const otherUsers = sortedUsers.slice(drawUsers.length);

  // ゲームリセットの処理
  const handleClickResetGame = () => {
    resetVercelKV(gameId); // 該当GameIDの情報をVercelKVから削除
    resetState(); // 状態リセット
    router.push('/'); // トップページに遷移
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4 p-4">
      <h1 className="font-semibold text-2xl mb-2">結果発表！！</h1>
      {drawUsers.length > 1 ? (
        // 同率1位が複数人いる場合
        <DrawResult drawUsers={drawUsers} otherUsers={otherUsers} />
      ) : (
        // 1人だけ1位の場合
        <OnlyResult firstUser={drawUsers[0]} otherUsers={otherUsers} />
      )}

      <Button
        onClick={handleClickResetGame}
        className="mt-4 p-2 bg-black text-white rounded-lg"
      >
        ゲーム終了
      </Button>
    </div>
  );
};
