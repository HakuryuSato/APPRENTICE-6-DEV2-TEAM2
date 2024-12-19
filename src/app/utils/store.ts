// src/util/store.ts
export type GameState = {
    players: Record<string, boolean>; // playerId -> ready状態
    round: number;
    images: string[];
  };
  
  const games = new Map<string, GameState>();
  
  export function getGameState(gameId: string): GameState {
    if (!games.has(gameId)) {
      games.set(gameId, {
        players: {},
        round: 1,
        images: []
      });
    }
    return games.get(gameId)!;
  }
  