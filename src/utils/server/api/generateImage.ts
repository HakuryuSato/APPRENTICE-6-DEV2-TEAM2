import OpenAI from 'openai';
import type { ImagesResponse } from 'openai/resources/images.js';
import { kvSet, kvGet } from '@/utils/server/vercelKVHandler';
import { GameState, GeneratedImage } from '@/types/GameState';
import { GenerateImageRequest, GenerateImage } from '@/types/GenerateImage';
import { responseWithError } from '../responseWithError';
import type { UserStatus } from '@/types/UserStatus';

type ImageSize =
  | '256x256'
  | '512x512'
  | '1024x1024'
  | '1792x1024'
  | '1024x1792';

interface OpenAiImageRequest {
  prompt: string;
  n: number;
  size: ImageSize;
}

export async function insertImageUrlToGameState (
  url: string,
  userId: string,
  gameState: GameState
) {
  try {
    const currentGameState = (await kvGet(gameState.gameId)) as GameState;

    const generatedImage: GeneratedImage = {
      url: url,
      isError: false,
      error: null,
    };

    // 不正なラウンド番号をチェック
    if (gameState.round < 0) {
      throw new Error('Invalid round number: Round cannot be negative');
    }

    // ユーザーのimages配列が存在しない場合は初期化
    if (!currentGameState.images[userId]) {
      currentGameState.images[userId] = [];
    }

    // 現在のラウンドが配列の長さと一致することを確認
    if (gameState.round !== currentGameState.images[userId].length) {
      throw new Error(`Invalid round number: Expected round ${currentGameState.images[userId].length}, got ${gameState.round}`);
    }

    // GeneratedImage型のオブジェクトを配列に追加
    currentGameState.images[userId].push(generatedImage);

    await kvSet(gameState.gameId, currentGameState);
  } catch (error) {
    console.error('Error inserting image to game state:', error);
    throw error;
  }
}

// POST
export async function generateImage (
  request: GenerateImageRequest
): Promise<GenerateImage> {
  // リクエストから必要なデータを取得
  const { prompt, userId, gameState } = request;

  // 引数が不足していればエラー
  if (!prompt || !userId || !gameState)
    return responseWithError('Need prompt, userId, gameState.', 400);

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  try {
    const context: OpenAiImageRequest = {
      prompt: prompt,
      n: 1,
      size: '256x256',
    };

    const response: ImagesResponse = await openai.images.generate(context);
    const imageUrl = response.data[0]?.url;

    // OpenAI APIからのレスポンスにurlがなければエラー
    if (!imageUrl)
      return responseWithError(
        'No image was returned from the OpenAI API.',
        404
      );

    // 非同期で画像をGameStateに追加
    await insertImageUrlToGameState(imageUrl, userId, gameState);

    // urlを返す
    return { url: imageUrl };
  } catch (error) {
    console.error(
      'Image generation error:',
      error instanceof Error ? error.message : 'Unknown error'
    );
    return { url: '' };
  }
}
