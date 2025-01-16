import type { UserStatus } from './UserStatus';
import type { GenerateImageResponse } from './GenerateImage';

export type GamePhase = 'prepare' | 'generate' | 'vote' | 'result';
export type GameStateRequestType = 'create' | 'enter' | 'ready';


export interface GeneratedImage {
  url: string;
  isError: boolean;
  error: Error | null;
}

export interface GameState {
  gameId: string;
  targetTheme: string;
  round: number;
  users: UserStatus[];
  isAllUsersReady: boolean;
  images: {
    [userId:string] : GeneratedImage[];  // ←辞書でユーザごとに生成した画像を格納したほうが後々便利だと思ったので定義を少し変えました。
  }
}

/* 使用例 ⇨　images[userId][roundCount].url
   images[ユーザーID][ラウンド数].url
   images[ユーザーID][ラウンド数].isError
   images[ユーザーID][ラウンド数].error
*/



export interface GameStateRequest {
  gameId: string;
  gameStateRequestType: GameStateRequestType;
  userStatus: UserStatus;
}
