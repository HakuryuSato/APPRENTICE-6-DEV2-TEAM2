/*
クライアントサイドからAPI群を呼び出すための関数群
response.dataからの展開はこの関数内で行い、展開後のデータをクライアントサイドへ返している。
*/

import type { GenerateImageResponse } from '@/types/GenerateImage';
import { TranslatePromptResponse } from '@/types/TranslatePrompt';
import type { GameState, GameStateRequest } from '@/types/GameState';

/**
 * 共通のAPI fetchエラーハンドリング関数
 * 指定されたURLにHTTPリクエストを送信し、レスポンスのJSONデータを取得します。
 *
 * @template T - レスポンスのジェネリクスデータ型（引数として渡された型としてデータを扱う)
 * @param {string} url - APIのURL (例："api/translate")
 * @param {RequestInit} [options] - 送信が必要なデータ
 * @returns {Promise<T>} - レスポンスから抽出されたデータを型Tを含むPromiseとして返す
 * @throws {Error} - フェッチ処理中にエラーが発生した場合の処理
 */
async function handleFetchApi<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(url, options);
    const result = await response.json();

    if (response.ok && result && 'data' in result) {
      console.log('apiClient:', result.data);
      return result.data as T;
    } else {
      console.error(`Error fetching ${url}:`, result);
      return [] as unknown as T;
    }
  } catch (error) {
    console.error('An error occurred:', error);
    return [] as unknown as T;
  }
}

// プロンプトから画像生成 -------------------------------------------------
export async function fetchGenerateImage(
  prompt: string
): Promise<GenerateImageResponse | null> {
  return await handleFetchApi<GenerateImageResponse>('/api/generate-image', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });
}

// プロンプトを英語に翻訳 --------------------------------------------------
export async function fetchTranslatePrompt(
  prompt: string
): Promise<TranslatePromptResponse | null> {
  return await handleFetchApi<TranslatePromptResponse>(
    '/api/translate-prompt',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: prompt, targetLang: 'en-GB' }),
    }
  );
}

// ゲーム状態を取得 -------------------------------------------------
export async function fetchGameState(gameId: string): Promise<GameState | null> {
  return await handleFetchApi<GameState>(`/api/game-state?gameId=${encodeURIComponent(gameId)}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
}

// ゲーム状態を更新 -------------------------------------------------
export async function updateGameState({
  gameId,
  gameStateRequestType,
  userStatus,
}: GameStateRequest): Promise<void> {
  const gameStateRequest = {
    gameId,
    gameStateRequestType,
    userStatus,
  };
  await handleFetchApi<void>(`/api/game-state`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(gameStateRequest),
  });
}
