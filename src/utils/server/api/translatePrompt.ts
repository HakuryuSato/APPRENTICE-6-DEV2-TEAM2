import { TargetLanguageCode, Translator } from 'deepl-node';

// DeepL APIを用いて翻訳を行う関数
export async function translatePrompt(
  text: string,
  targetLang: TargetLanguageCode
) {
  const authKey = process.env.DEEPL_AUTH_KEY || '';
  const translator = new Translator(authKey);

  try {
    const result = await translator.translateText(text, null, targetLang);

    // 結果が単一か配列かを判定して適切に返却
    const translatedText = Array.isArray(result)
      ? result[0]?.text
      : result.text;

    return {
      text: translatedText || '',
    };
  } catch (error) {
    return error;
  }
}
