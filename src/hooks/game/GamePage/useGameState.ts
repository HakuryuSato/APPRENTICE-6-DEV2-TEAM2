// ライブラリ
import { useCallback } from 'react';
import { fetchGameState } from '@/utils/client/apiClient';
import { useAtom } from 'jotai';
import { gameStateAtom } from '@/atoms/state';
import { GameState } from '@/types/GameState';

export const useGameState = () => {
  const [, setGameState] = useAtom(gameStateAtom);

  // Global StateへGameStateを保存する関数
  const refreshGameState = useCallback(
    async ({ gameId }: Pick<GameState, 'gameId'>) => {
      const gameState = await fetchGameState(gameId);
      if (gameState) {
        setGameState(gameState);
      }
    },
    [setGameState]
  );

  return { refreshGameState };
};
