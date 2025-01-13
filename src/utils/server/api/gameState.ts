import { NextRequest, NextResponse } from 'next/server'
import type { GameStateRequest } from '@/types/GameState'
import type { UserStatus } from '@/types/UserStatus'
import { getGameState, updateGameState } from '@/utils/server/vercelKVStore'
import { handleExternalApiRequest } from '@/utils/server/handleExternalApiRequest'

function getAllReady (players: Record<string, UserStatus>) {
  const playerIds = Object.keys(players)
  if (playerIds.length === 0) return false
  return playerIds.every(id => players[id].isReady)
}

function toPlayerList (players: Record<string, UserStatus>) {
  return Object.entries(players).map(([id, user]) => ({ id, ready: user.isReady }))
}

export async function handleGetGameState (req: NextRequest) {
  return handleExternalApiRequest(async () => {
    const { gameId } = (await req.json()) as GameStateRequest
    const state = await getGameState(gameId)
        return NextResponse.json({
          round: state.round,
          players: toPlayerList(state.players),
          allReady: getAllReady(state.players),
          images: state.images
        })
  })
}

export async function handleChangeGameState (req: NextRequest) {
  return handleExternalApiRequest(async () => {
    const { action, gameId, playerId } = (await req.json()) as GameStateRequest & { playerId?: string }

    if (!gameId) {
      return NextResponse.json({ error: 'Missing gameId' }, { status: 400 })
    }

    switch (action) {
      case 'join': {
        const state = await updateGameState(gameId, s => {
          if (playerId && !(playerId in s.players)) {
            s.players[playerId] = { uuid: playerId, userName: '', isReady: false }
          }
        })
        return NextResponse.json({
          round: state.round,
          players: toPlayerList(state.players),
          allReady: getAllReady(state.players),
          images: state.images
        })
      }
      case 'ready': {
        const state = await updateGameState(gameId, s => {
          if (playerId && playerId in s.players) {
            if (s.players[playerId]) {
              s.players[playerId].isReady = true
            }
          }
        })
        return NextResponse.json({
          round: state.round,
          players: toPlayerList(state.players),
          allReady: getAllReady(state.players),
          images: state.images
        })
      }
      case 'status' as string: {
        const state = await getGameState(gameId)
        return NextResponse.json({
          round: state.round,
          players: toPlayerList(state.players),
          allReady: getAllReady(state.players),
          images: state.images
        })
      }

      default:
        return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
    }
  })
}
