import type { UserStatus } from './UserStatus';
import type { GenerateImageResponse } from './GenerateImage';

export type GamePhase = 'prepare' | 'generate' | 'vote' | 'result';
export type GameStateRequestType = 'create' | 'enter' | 'ready';

export interface GameState {
  gameId: string;
  gamePhase: GamePhase;
  round: number;
  users: UserStatus[];
  isAllUsersReady: boolean;

  images: {
    imageUrl: Pick<GenerateImageResponse, 'url'>;
    generateUserId: Pick<UserStatus, 'userId'>;
    generatedRound: number;
  };
}

export interface GameStateRequest {
  gameId: string;
  gameStateRequestType: GameStateRequestType;
  userStatus: UserStatus;
}
