import { NextRequest } from 'next/server';
import { handleExternalApiRequest } from '@/utils/server/handleExternalApiRequest';
import { translatePrompt } from '@/utils/server/api/translatePrompt';

export async function POST(request: NextRequest) {
  const { text, targetLang } = await request.json();
  return handleExternalApiRequest(() => translatePrompt(text, targetLang));
}
