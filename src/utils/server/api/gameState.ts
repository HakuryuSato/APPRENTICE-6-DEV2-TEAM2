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
  return users.map(user => ({ id: user.uuid, ready: user.isReady }))
}

export async function handleGetGameState (req: NextRequest) {
  return handleExternalApiRequest(async () => {
    const { gameId } = (await req.json()) as GameStateRequest
    const state = await getGameState(gameId)
    if (!state) {
      return NextResponse.json({ error: 'Game state not found' }, { status: 404 });
    }
    return NextResponse.json({
      round: state.round,
      users: toPlayerList(state.users),
      allReady: getAllReady(state.users)
    });
  })
}

export async function handlePutGameState (req: NextRequest) {
  return handleExternalApiRequest(async () => {
    const { action, gameId, playerId } = (await req.json()) as GameStateRequest & { playerId?: string }

    if (!gameId) {
      return NextResponse.json({ error: 'Missing gameId' }, { status: 400 })
    }

    switch (action) {
      case 'join': {
        const state = await getGameState(gameId);
    if (!state) {
      return NextResponse.json({ error: 'Game state not found' }, { status: 404 });
    }
    if (playerId && !state.users.some(user => user.uuid === playerId)) {
      state.users.push({ uuid: playerId, userName: '', isReady: false });
      await putGameState(state);
    }
    return NextResponse.json({
      round: state.round,
      users: toPlayerList(state.users),
      allReady: getAllReady(state.users)
    });
      }
      case 'ready': {
        const state = await getGameState(gameId);
    if (!state) {
      return NextResponse.json({ error: 'Game state not found' }, { status: 404 });
    }
    if (playerId) {
      const user = state.users.find(user => user.uuid === playerId);
      if (user) {
        user.isReady = true;
        await putGameState(state);
      }
    }
    return NextResponse.json({
      round: state.round,
      users: toPlayerList(state.users),
      allReady: getAllReady(state.users)
    });
      }
      case 'status' as string: {
        const state = await getGameState(gameId)
    if (!state) {
      return NextResponse.json({ error: 'Game state not found' }, { status: 404 });
    }
    return NextResponse.json({
      round: state.round,
      users: toPlayerList(state.users),
      allReady: getAllReady(state.users)
    });
      }

      default:
        return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
    }
  })
}
