import { Redis } from '@upstash/redis';

export type GameState = {
  players: Record<string, boolean>;
  round: number;
  images: string[];
};

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!
});

async function fetchGameStateFromKV(gameId: string): Promise<GameState | null> {
  const val = await redis.get(gameId);
  console.log('redis.get return:', val);

  if (!val) return null;

  if (typeof val === 'string') {
    // 文字列ならJSON.parse
    return JSON.parse(val) as GameState;
  } else if (typeof val === 'object') {
    // オブジェクトならそのままGameStateとして扱う
    return val as GameState;
  } else {
    // その他は不明な形式
    console.error('Unexpected value type from redis:', typeof val, val);
    return null;
  }
}

async function putGameStateToKV(gameId: string, state: GameState) {
  const json = JSON.stringify(state);
  console.log('Storing state to redis:', json);
  await redis.set(gameId, json);
}

export async function getGameState(gameId: string): Promise<GameState> {
  let state = await fetchGameStateFromKV(gameId);
  if (!state) {
    state = {
      players: {},
      round: 1,
      images: []
    };
    await putGameStateToKV(gameId, state);
  }
  return state;
}

export async function updateGameState(gameId: string, updateFn: (state: GameState) => void): Promise<GameState> {
  const state = await getGameState(gameId);
  updateFn(state);
  await putGameStateToKV(gameId, state);
  return state;
}
