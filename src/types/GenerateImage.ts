import { GameState } from './GameState';

export interface GenerateImageRequest {
  prompt: string;//生成するためのプロンプトテキスト
  n: number; // 生成する画像の数
  size: string; // 例: "256x256"
  userId : string; // ユーザーID
  gameId: string; // ゲームID
}

export interface GenerateImageResponse {
  url: string ; // 生成された画像のURL
  isError:boolean; // エラーが発生したかどうか
  error : Error | null; // エラーが発生した場合のエラー
  gameState: GameState; // 更新されたゲームステート
}

export interface GeneratedImageProps {
  imageUrl: string;
}
