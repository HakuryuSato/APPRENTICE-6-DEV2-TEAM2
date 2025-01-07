import OpenAI from 'openai'

export async function generateImage (prompt: string) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  })

  try {
    const response = await openai.images.generate({
      prompt,
      n: 1,
      size: '256x256'
    })
    return response

  } catch (error) {
    return error
  }
}
