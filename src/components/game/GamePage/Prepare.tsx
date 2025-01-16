"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import {
  gamePageModeAtom,
  gameStateAtom,
  userIdAtom,
  userNameAtom,
} from "@/atoms/state";
import { usePolling } from "@/hooks/game/GamePage/usePolling";
import { selectAtom } from "jotai/utils";
import { useGameState } from "@/hooks/game/GamePage/useGameState";

// 特定のプロパティのみを監視
const gameIdSelector = selectAtom(gameStateAtom, (state) => state.gameId ?? "");
const isAllUsersReadySelector = selectAtom(gameStateAtom,(state) => state.isAllUsersReady ?? false);

export const Prepare: React.FC = () => {
  const router = useRouter();
  const [gameId] = useAtom(gameIdSelector);
  const [isAllUsersReady] = useAtom(isAllUsersReadySelector);
  const [userName] = useAtom(userNameAtom);
  const [userId] = useAtom(userIdAtom);
  const [, setTemporaryTopGameLayoutMode] = useAtom(gamePageModeAtom);
  const { refreshGameState } = useGameState();

  const { startPolling, stopPolling } = usePolling(
    () => refreshGameState({ gameId }),
    1000,
  );

  useEffect(() => {
    startPolling();
    return () => stopPolling();
  }, [gameId]);

  useEffect(() => {
    if (isAllUsersReady) {
      stopPolling();
      const timeout = setTimeout(() => {
        setTemporaryTopGameLayoutMode({ mode: "generate" });
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [isAllUsersReady]);

  const handleClickBack = () => {
    router.push("/");
    // キャッシュの削除を追加する
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-center">
        <p className="font-semibold">Name: {userName}</p>
        <p className="font-semibold">Room: {gameId}</p>
      </div>

      {!isAllUsersReady
        ? (
          <h3 className="text-red-500 text-lg font-medium">
            全員揃うまでお待ちください
          </h3>
        )
        : (
          <div className="text-center">
            <p className="text-fly-purple font-bold text-xl animate-pop-in">
              ゲームスタート
            </p>
          </div>
        )}

      <Button onClick={handleClickBack}>戻る</Button>
    </div>
  );
};
