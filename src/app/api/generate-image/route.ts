import { NextRequest } from 'next/server';
import { handleExternalApiRequest } from '@/utils/server/handleExternalApiRequest';
import { generateImage } from '@/utils/server/api/generateImage';

export async function POST(request: NextRequest) {
  const { prompt } = await request.json();
  return handleExternalApiRequest(() => generateImage(prompt));
}
