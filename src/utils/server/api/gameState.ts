import { NextRequest, NextResponse } from 'next/server'
import type { GameState, GameStateRequest } from '@/types/GameState'
import type { UserStatus } from '@/types/UserStatus'
import { kvGet, kvSet, kvDel } from '@/utils/server/vercelKVHandler'

// 汎用関数  ---------------------------------------------------------------------------------------------------
// GameState更新用共通関数
async function handleSetGameState (gameState: GameState) {
  await kvSet(gameState.gameId, gameState)
}

// エラー処理用共通関数
function respondWithError(errorMessage: string, statusCode: number) {
  return NextResponse.json({ error: errorMessage }, { status: statusCode });
}

// 全ユーザーが準備完了済みか判定する関数
function getAllReady(users: UserStatus[]) {
  if (users.length === 0) return false;
function getAllReady(users: UserStatus[]) {
  if (users.length === 0) return false;
  return users.every((user) => user.isReady);
}

// GET  -------------------------------------------------
export async function handleGetGameState (req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const gameId = searchParams.get('gameId')

  // gameIdが存在しなければエラー
  if (!gameId) {
    return respondWithError('Missing gameId', 400)
  }

  const gameState = await kvGet(gameId)

  // gameStateが存在すればgameStateを、存在しなければnullを返す
  return gameState ?? null
}

// POST  -------------------------------------------------
export async function handlePOSTGameState (req: NextRequest) {
  // 展開
  const { gameId, gameStateRequestType, userStatus } =
    (await req.json()) as GameStateRequest

  // gameIdまたはgameStateRequestTypeがなければエラー
  if (!gameId || !gameStateRequestType) {
    return respondWithError('Missing gameId', 400)
  }

  // gameStateの取得
  let gameState = (await kvGet(gameId)) as GameState

  // create以外でGameStateが存在しないならエラー
  if (!gameState && gameStateRequestType !== 'create') {
    return respondWithError('Missing GameState', 400)
  }

  // RequestTypeに応じて処理
  switch (gameStateRequestType) {
    // 作成
    case 'create': {
      // 既にgameStateが存在するならば終了
      if (gameState) break

      gameState = {
        gameId: gameId,
        gamePhase: 'prepare',
        round: 0,
        users: [
          // 部屋作成者を追加
          {
            userId: userStatus.userId,
            userName: userStatus.userName,
            isReady: true
          }
        ],
        isAllUsersReady: false
      } as GameState

      await kvSet(gameId, gameState)
      break
    }

    // ユーザーの追加
    case 'enter': {
      // userIdまたはuserNameがなければエラー
      if (!userStatus.userId || !userStatus.userName) {
        return respondWithError('playerId not found', 404)
      }

      gameState.users.push({
        userId: userStatus.userId,
        userName: userStatus.userName,
        isReady: true
      })

      await handleSetGameState(gameState)
      break
    }

    // ユーザーの準備完了
    case 'ready': {
      // GameStateが存在しないなら終了
      if (!gameState) break

      if (userStatus) {
        const user = gameState.users.find(
          user => user.userId === userStatus.userId
        )
        if (user) {
          // 参照渡し
          user.isReady = userStatus.isReady
          gameState.isAllUsersReady = getAllReady(gameState.users)
          await handleSetGameState(gameState)
        }
      }
      break
    }
  }
  // 最後に変更内容を反映したGameStateまたはnull返す
  return (await kvGet(gameId)) ?? null
}

// DELETE -------------------------------------------------
export async function handleDeleteGameState (req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const gameId = searchParams.get('gameId')

  if (!gameId) {
    return respondWithError('Missing gameId', 400)
  }

  await kvDel(gameId)
  // bodyなしで返却
  return new NextResponse(null, { status: 204 })
}
