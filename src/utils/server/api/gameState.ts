import { NextRequest, NextResponse } from 'next/server';
import type { GameState, GameStateRequest } from '@/types/GameState';
import { kvGet, kvSet, kvDel } from '@/utils/server/vercelKVHandler';
import { handleGameStateRequest } from './gameState/gameStateUtils';
import { responseWithError } from '../responseWithError';

// HTTPリクエストごとの処理 ---------------------------------------------------------------------------------------------------
// GET  -------------------------------------------------
export async function handleGetGameState (req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const gameId = searchParams.get('gameId');

  // gameIdが存在しなければエラー
  if (!gameId) {
    return responseWithError('Missing gameId', 400);
  }

  const gameState = await kvGet(gameId);

  // gameStateが存在すればgameStateを、存在しなければnullを返す
  return gameState ?? null;
}

// POST  -------------------------------------------------
export async function handlePOSTGameState(req: NextRequest) {
  const request = await req.json() as GameStateRequest;
  return handleGameStateRequest(request);
}

// DELETE -------------------------------------------------
export async function handleDeleteGameState (req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const gameId = searchParams.get('gameId');

  if (!gameId) {
    return responseWithError('Missing gameId', 400);
  }

  await kvDel(gameId);
  // bodyなしで返却
  return new NextResponse(null, { status: 204 });
}
