/**
 * エラーレスポンスを生成する共通関数
 * @param errorMessage エラーメッセージ
 * @param statusCode HTTPステータスコード
 * @returns Response オブジェクト
 */
export function responseWithError(errorMessage: string, statusCode: number): Response {
  return Response.json({ error: errorMessage }, { status: statusCode });
}
