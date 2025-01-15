import OpenAI from 'openai';
import { kvSet,kvGet } from '@/utils/server/vercelKVHandler'
import { GameState, GeneratedImage } from '@/types/GameState';
import { GenerateImageRequest, GenerateImageResponse } from '@/types/GenerateImage';


// OpenAI APIを用いて画像を生成する関数
export async function generateImage(request: GenerateImageRequest): Promise<GenerateImageResponse> { // gameState引数を増やす
  // リクエストから必要なデータを取得
  const { prompt, userId, gameId } = request;
  
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });


  try {

    const response = await openai.images.generate({
      prompt,
      n: 1,
      size: '256x256',
    });

    const currentGameState = await kvGet(gameId);//最新のゲームステートを取得
    if (!currentGameState) throw new Error('GameState not found');

    const imageUrl = response.data[0]?.url ?? ''
    if( !imageUrl ) throw new Error('Image not generated');

    // ここでkvSetを呼び出し、更新されたGameStateを作成して上書き 
    const generatedImage: GeneratedImage = {
      url: imageUrl,
      isError: false,
      error: null
    }

    currentGameState.images[userId].push(generatedImage);

    await kvSet(gameId, currentGameState)

    return { url: imageUrl,
             gameState: currentGameState,
             isError: false,
             error: null
            } as GenerateImageResponse;

  } catch (error) {

    return { url: '',
             gameState: {} as GameState,
             isError: true,
             error: error as Error
            } as GenerateImageResponse;
  }
}
