import { GameState } from './GameState';

export interface GenerateImageRequest {
  prompt: string;//生成するためのプロンプトテキスト
  n: number; // 生成する画像の数
  size: string; // 例: "256x256"
  userId : string; // ユーザーID
  gameId: string; // ゲームID
}

export interface GenerateImage {
  url: string;
}

export interface GeneratedImageProps extends GenerateImage {
  className: string;
}
