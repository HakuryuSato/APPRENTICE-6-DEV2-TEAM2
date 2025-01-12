import { NextRequest, NextResponse } from 'next/server';
import { getGameState, updateGameState } from '@/app/utils/store'
import { randomUUID } from 'crypto';

function getAllReady(players: Record<string, boolean>) {
  const playerIds = Object.keys(players);
  if (playerIds.length === 0) return false;
  return playerIds.every(id => players[id]);
}

function toPlayerList(players: Record<string, boolean>) {
  return Object.entries(players).map(([id, ready]) => ({ id, ready }));
}

export async function POST(req: NextRequest) {
  const { action, gameId, playerId } = await req.json() as { action: string; gameId: string; playerId?: string };

  if (!gameId) {
    return NextResponse.json({ error: 'Missing gameId' }, { status: 400 });
  }

  switch (action) {
    case 'join': {
      const state = await updateGameState(gameId, (s) => {
        if (playerId && !(playerId in s.players)) {
          s.players[playerId] = false;
        }
      });
      return NextResponse.json({
        round: state.round,
        players: toPlayerList(state.players),
        allReady: getAllReady(state.players),
        images: state.images
      });
    }
    case 'ready': {
      const state = await updateGameState(gameId, (s) => {
        if (playerId && (playerId in s.players)) {
          s.players[playerId] = true;
        }
      });
      return NextResponse.json({
        round: state.round,
        players: toPlayerList(state.players),
        allReady: getAllReady(state.players),
        images: state.images
      });
    }
    case 'status': {
      const state = await getGameState(gameId);
      return NextResponse.json({
        round: state.round,
        players: toPlayerList(state.players),
        allReady: getAllReady(state.players),
        images: state.images
      });
    }
    case 'generateImage': {
      const state = await updateGameState(gameId, (s) => {
        if (getAllReady(s.players)) {
          const imageUrl = `/api/image?${randomUUID()}`; 
          s.images[s.round - 1] = imageUrl;
        }
      });
      return NextResponse.json({
        round: state.round,
        players: toPlayerList(state.players),
        allReady: getAllReady(state.players),
        images: state.images
      });
    }
    case 'nextRound': {
      const state = await updateGameState(gameId, (s) => {
        if (getAllReady(s.players)) {
          s.round++;
          for (const p in s.players) {
            s.players[p] = false;
          }
        }
      });
      return NextResponse.json({
        round: state.round,
        players: toPlayerList(state.players),
        allReady: getAllReady(state.players),
        images: state.images
      });
    }
    default:
      return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  }
}
