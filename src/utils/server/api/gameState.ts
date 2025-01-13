import { NextRequest, NextResponse } from 'next/server'
import type { GameStateRequest } from '@/types/GameState'
import type { UserStatus } from '@/types/UserStatus'
import { getGameState, putGameState } from '@/utils/server/vercelKVStore'
import { handleExternalApiRequest } from '@/utils/server/handleExternalApiRequest'

function getAllReady (users: UserStatus[]) {
  if (users.length === 0) return false
  return users.every(user => user.isReady)
}

function toPlayerList (users: UserStatus[]) {
  return users.map(user => ({ id: user.userId, ready: user.isReady }))
}

export async function handleGetGameState (req: NextRequest) {
  return handleExternalApiRequest(async () => {
    const { gameId } = (await req.json()) as GameStateRequest
    const gameState = await getGameState(gameId)
    if (!gameState) {
      return NextResponse.json(
        { error: 'Game state not found' },
        { status: 404 }
      )
    }
    return NextResponse.json({
      allReady: getAllReady(gameState.users)
    })
  })
}

export async function handlePutGameState (req: NextRequest) {
  return handleExternalApiRequest(async () => {

    // 展開
    const { gameId, gameStateRequestType, playerId } =
      (await req.json()) as GameStateRequest & { playerId?: string }

    // gameIdまたはgameStateRequestTypeがなければエラー
    if (!gameId || !gameStateRequestType) {
      return NextResponse.json({ error: 'Missing gameId' }, { status: 400 })
    }
    const gameState = await getGameState(gameId)

    // gameStateが存在しなければエラー
    if (!gameState) {
      return NextResponse.json(
        { error: 'Game state not found' },
        { status: 404 }
      )
    }

    // RequestTypeに応じて処理
    switch (gameStateRequestType) {
      // ユーザーの追加
      case 'join': {
        // ユーザーidがなければエラー
        if (!playerId){
          return NextResponse.json(
            { error: 'playerId not found' },
            { status: 404 }
          )
        }

        // 
        if (playerId && !gameState.users.some(user => user.userId === playerId)) {
          gameState.users.push({ userId: playerId, userName: '', isReady: false })
          await putGameState(gameState)
        }

        return NextResponse.json({}, { status: 200 })
      }

      // ユーザーの準備完了
      case 'ready': {
        if (playerId) {
          const user = gameState.users.find(user => user.userId === playerId)
          if (user) {
            user.isReady = true
            await putGameState(gameState)
          }
        }
        return NextResponse.json({
          round: gameState.round,
          users: toPlayerList(gameState.users),
          allReady: getAllReady(gameState.users)
        })
      }

      default:
        return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
    }
  })
}
