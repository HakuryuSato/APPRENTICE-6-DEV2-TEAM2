import { NextRequest, NextResponse } from 'next/server';
import type { GameState, GameStateRequest } from '@/types/GameState';
import type { UserStatus } from '@/types/UserStatus';
import { kvGet, kvSet, kvDel } from '@/utils/server/vercelKVHandler';
import {
  respondWithError,
  addUserToGameState,
  createGameState,
  handleGoToNextPhase,
} from './gameState/gameStateUtils';

// HTTPリクエストごとの処理 ---------------------------------------------------------------------------------------------------
// GET  -------------------------------------------------
export async function handleGetGameState (req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const gameId = searchParams.get('gameId');

  // gameIdが存在しなければエラー
  if (!gameId) {
    return respondWithError('Missing gameId', 400);
  }

  const gameState = await kvGet(gameId);

  // gameStateが存在すればgameStateを、存在しなければnullを返す
  return gameState ?? null;
}

// POST  -------------------------------------------------
export async function handlePOSTGameState (req: NextRequest) {
  // 展開
  const { gameId, gameStateRequestType, userStatus } =
    (await req.json()) as GameStateRequest;

  // gameIdまたはgameStateRequestTypeがなければエラー
  if (!gameId || !gameStateRequestType) {
    return respondWithError('Missing gameId', 400);
  }

  // gameStateの取得
  let gameState = (await kvGet(gameId)) as GameState;

  // create以外でGameStateが存在しないならエラー
  if (!gameState && gameStateRequestType !== 'create') {
    return respondWithError('Missing GameState', 400);
  }

  // RequestTypeに応じて処理
  switch (gameStateRequestType) {
    // 作成
    case 'create': {
      // 既にgameStateが存在するならば終了
      if (gameState) break;

      // 存在しないならば作成
      gameState = createGameState(gameId, userStatus);
      addUserToGameState(gameState, userStatus);
      await kvSet(gameId, gameState);
      break;
    }

    // ユーザーの追加
    case 'enter': {
      // userIdまたはuserNameがなければエラー
      if (!userStatus.userId || !userStatus.userName) {
        return respondWithError('playerInfo not found', 404);
      }

      addUserToGameState(gameState, userStatus);

      handleGoToNextPhase(gameState);
      break;
    }

    // ユーザーの準備完了
    case 'ready': {
      // GameStateが存在しないなら終了
      if (!gameState) break;

      if (userStatus) {
        const user = gameState.users.find(
          user => user.userId === userStatus.userId
        );
        if (user) {
          // 参照渡し
          user.isReady = userStatus.isReady;
          handleGoToNextPhase(gameState);
        }
      }
      break;
    }
  }
  // 最後に変更内容を反映したGameStateまたはnull返す
  return (await kvGet(gameId)) ?? null;
}

// DELETE -------------------------------------------------
export async function handleDeleteGameState (req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const gameId = searchParams.get('gameId');

  if (!gameId) {
    return respondWithError('Missing gameId', 400);
  }

  await kvDel(gameId);
  // bodyなしで返却
  return new NextResponse(null, { status: 204 });
}
