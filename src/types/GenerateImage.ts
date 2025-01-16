import type { GameState } from './GameState';
import type { UserStatus } from './UserStatus';

export interface GenerateImage {
  url: string;
}

export interface GenerateImageRequest {
  gameState: GameState;
  userId: Pick<UserStatus, 'userId'>;
  prompt: string;
}

export interface GeneratedImageProps extends GenerateImage {
  className: string;
}
