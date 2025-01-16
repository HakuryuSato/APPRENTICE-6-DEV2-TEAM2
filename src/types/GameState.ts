import type { UserStatus } from './UserStatus';

export type GamePhase = 'prepare' | 'generate' | 'vote' | 'result';
export type GameStateRequestType = 'create' | 'enter' | 'ready';

export interface GameState {
  gameId: string;
  targetTheme: string;
  round: number;
  users: UserStatus[];
  isAllUsersReady: boolean;
  images: {
    
  }
}

export interface GameStateRequest {
  gameId: string;
  gameStateRequestType: GameStateRequestType;
  userStatus: UserStatus;
}
