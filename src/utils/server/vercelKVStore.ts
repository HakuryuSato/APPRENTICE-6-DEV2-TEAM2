// VercelKV用の関数群

import { Redis } from '@upstash/redis';
import type { GameState } from '@/types/GameState';

// VercelKVはVercel上でRedisを使用します
const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

/**
 * VercelKVから値を取得する関数
 * @param {string} key - 引数:key
 * @returns {Promise<object | null>} 値が存在する場合はデータを、存在しない場合はnullを返す
 * @throws {Error} エラーの場合はエラーを返す
 */
async function readVercelKV(key: string): Promise<object | null> {
  try {
    const value = await redis.get(key);
    return value ?? null;
  } catch (error) {
    console.error('Error reading from VercelKV:', error);
    throw error;
  }
}

// VercelKVに値を書き込む関数
async function writeVercelKV(key: string, value: object): Promise<void> {
  try {
    await redis.set(key, value);
  } catch (error) {
    console.error('Error writing to VercelKV:', error);
    throw error;
  }
}

// GameStateを取得する関数
// gameIdを引数としGameStateまたはnullを返す
async function getGameState(gameId: string): Promise<GameState | null> {
  return (await readVercelKV(gameId)) as GameState | null;
}

// GameStateを作成または更新する関数
// 渡されたGameStateからgameIdを取得してキーとし、GameStateをputする
async function putGameState(gameState: GameState): Promise<void> {
  await writeVercelKV(gameState.gameId, gameState);
}

export { writeVercelKV, readVercelKV, getGameState, putGameState };
