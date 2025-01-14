import OpenAI from 'openai';
import { kvSet } from '@/utils/server/vercelKVHandler'

// OpenAI APIを用いて画像を生成する関数
export async function generateImage(prompt: string) { // gameState引数を増やす
  // ここでGameStateを受け取り、内部からuserId、roundを取り出す。
  
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const response = await openai.images.generate({
      prompt,
      n: 1,
      size: '256x256',
    });

    const imageUrl = response.data[0]?.url ?? ''


    // ここでkvSetを呼び出し、更新されたGameStateを作成して上書き

    return imageUrl
  } catch (error) {
    return error;
  }
}
