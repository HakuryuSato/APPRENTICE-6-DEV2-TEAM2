import { NextRequest, NextResponse } from 'next/server';
import { getGameState } from '@/app/utils/store';
import { randomUUID } from 'crypto';

function getAllReady(state: { players: Record<string, boolean> }) {
  const playerIds = Object.keys(state.players);
  if (playerIds.length === 0) return false;
  return playerIds.every(id => state.players[id]);
}

function toPlayerList(players: Record<string, boolean>) {
  return Object.entries(players).map(([id, ready]) => ({ id, ready }));
}

export async function POST(req: NextRequest) {
  const { action, gameId, playerId } = await req.json() as { action: string; gameId: string; playerId?: string; };
  const state = getGameState(gameId);

  switch (action) {
    case 'join': {
      if (playerId && !(playerId in state.players)) {
        state.players[playerId] = false;
      }
      return NextResponse.json({
        round: state.round,
        players: toPlayerList(state.players),
        allReady: getAllReady(state),
        images: state.images
      });
    }
    case 'ready': {
      if (playerId && (playerId in state.players)) {
        state.players[playerId] = true;
      }
      return NextResponse.json({
        round: state.round,
        players: toPlayerList(state.players),
        allReady: getAllReady(state),
        images: state.images
      });
    }
    case 'status': {
      return NextResponse.json({
        round: state.round,
        players: toPlayerList(state.players),
        allReady: getAllReady(state),
        images: state.images
      });
    }
    case 'generateImage': {
      if (getAllReady(state)) {
        const imageUrl = `/api/image?${randomUUID()}`; 
        state.images[state.round - 1] = imageUrl;
      }
      return NextResponse.json({
        round: state.round,
        players: toPlayerList(state.players),
        allReady: getAllReady(state),
        images: state.images
      });
    }
    case 'nextRound': {
      if (getAllReady(state)) {
        state.round++;
        // 次のラウンドに進む際、全員の準備状態をfalseに戻す
        for (const p in state.players) {
          state.players[p] = false;
        }
      }
      return NextResponse.json({
        round: state.round,
        players: toPlayerList(state.players),
        allReady: getAllReady(state),
        images: state.images
      });
    }
    default:
      return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  }
}
