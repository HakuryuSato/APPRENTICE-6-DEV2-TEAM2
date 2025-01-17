import { useCallback } from 'react';
import { deleteGameState } from '@/utils/client/apiClient';

// vercelKVの該当
export const useResetVercelKV = () => {
  const resetVercelKV = useCallback(async (gameId: string) => {
    if (!gameId) return;
    await deleteGameState(gameId);
  }, []);

  return { resetVercelKV };
};
