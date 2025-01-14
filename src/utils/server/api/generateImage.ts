import OpenAI from 'openai';
import { GameState } from '@/types/GameState';
import { GenerateImageRequest } from '@/types/GenerateImage';
import { kvSet } from '@/utils/server/vercelKVHandler';



// OpenAI APIを用いて画像を生成する関数
export async function generateImage(request: GenerateImageRequest): Promise<{ url: string  } | Error> {
  //OpenAIのAPIキーを環境変数から設定して、OpenAIクライアントを生成
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  // リクエストから必要なデータを取得
  const { prompt, userId, gameState } = request;

  try {
    // OpenAI APIを用いて画像を生成
    const response = await openai.images.generate({
      prompt,
      n:1,
      size: '256x256',
    });


    // 生成した画像のURLを取得
    const imageUrl:string = response.data[0]?.url ?? '';

    // 生成した画像のURLをGameStateに追加
    gameState.images[userId].push(imageUrl);

    // GameStateを更新
    await kvSet(gameState.gameId, gameState);


    return {
      url: imageUrl,
    };
  } catch (error) {
    return error as Error;
  } 
}
