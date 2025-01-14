import OpenAI from 'openai';

// OpenAI APIを用いて画像を生成する関数
export async function generateImage(prompt: string) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const response = await openai.images.generate({
      prompt,
      n: 1,
      size: '256x256',
    });

    return {
      url: response.data[0]?.url ?? '',
    };
  } catch (error) {
    return error;
  }
}
