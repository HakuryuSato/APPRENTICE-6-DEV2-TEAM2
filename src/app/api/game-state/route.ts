import { NextRequest } from 'next/server';
import { handleExternalApiRequest } from '@/utils/server/handleExternalApiRequest';
import { handleGetGameState, handlePutGameState } from '@/utils/server/api/gameState';

export async function GET(req: NextRequest) {
  return handleExternalApiRequest(() => handleGetGameState(req));
}

export async function POST(req: NextRequest) {
  return handleExternalApiRequest(() => handlePutGameState(req));
}


