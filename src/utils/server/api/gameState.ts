import { NextRequest, NextResponse } from 'next/server'
import type { GameState, GameStateRequest } from '@/types/GameState'
import type { UserStatus } from '@/types/UserStatus'
import { kvGet, kvSet, kvDel } from '@/utils/server/vercelKVHandler'
import { handleExternalApiRequest } from '@/utils/server/handleExternalApiRequest'

// 汎用関数  ---------------------------------------------------------------------------------------------------
// GameState更新用共通関数
async function handleSetGameState (gameState: GameState) {
  await kvSet(gameState.gameId, gameState)
  return NextResponse.json({}, { status: 200 })
}

// エラー処理用共通関数
function respondWithError (errorMessage: string, statusCode: number) {
  return NextResponse.json({ error: errorMessage }, { status: statusCode })
}

// 全ユーザーが準備完了済みか判定する関数
function getAllReady (users: UserStatus[]) {
  if (users.length === 0) return false
  return users.every(user => user.isReady)
}

// 各メソッド用関数 ---------------------------------------------------------------------------------------------------
// GET  -------------------------------------------------
export async function handleGetGameState (req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const gameId = searchParams.get('gameId')

  if (!gameId) {
    return respondWithError('Missing gameId', 400)
  }

  const gameState = await kvGet(gameId)

  if (!gameState) {
    return respondWithError('Game state not found', 404)
  }

  return NextResponse.json(gameState, { status: 200 })
}

// POST  -------------------------------------------------
export async function handlePOSTGameState (req: NextRequest) {
  return handleExternalApiRequest(async () => {
    // 展開
    const { gameId, gameStateRequestType, userStatus } =
      (await req.json()) as GameStateRequest

    // gameIdまたはgameStateRequestTypeがなければエラー
    if (!gameId || !gameStateRequestType) {
      return respondWithError('Missing gameId', 400)
    }

    // gameStateの取得
    const gameState = await kvGet(gameId)

    // gameStateが存在しなければエラー
    if (!gameState) {
      return respondWithError('Game state not found', 404)
    }

    // RequestTypeに応じて処理
    switch (gameStateRequestType) {
      case 'create': {
        // 新たなGameStateの作成
        const gameState = {
          gameId: gameId
        } as GameState

        await handleSetGameState(gameState)
        break
      }

      case 'enter': {
        // ユーザーの追加
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
        if (userStatus) {
          const user = gameState.users.find(
            user => user.userId === userStatus.userId
          )
          if (user) {
            user.isReady = true
            gameState.isAllUsersReady = getAllReady(gameState.users) // フラグ更新
            await handleSetGameState(gameState)
          }
        }

        break
      }

      default:
        return respondWithError('Unknown action', 400)
    }
  })
}

// 削除 -------------------------------------------------
export async function handleDeleteGameState (req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const gameId = searchParams.get('gameId')

  if (!gameId) {
    return respondWithError('Missing gameId', 400)
  }

  const gameState = await kvDel(gameId)
  return NextResponse.json(gameState, { status: 200 })
}
