import { GameState } from './GameState';

export interface GenerateImageRequest {
  prompt: string;
  n: number; // 生成する画像の数
  size: string; // 例: "256x256"
  userId: string;//ユーザーID
  gameState: GameState;//ゲームステート
}

export interface GenerateImageResponse {
  url: string;
}

export interface GeneratedImageProps {
  imageUrl: string;
}
