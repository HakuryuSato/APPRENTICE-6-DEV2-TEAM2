/*
クライアントサイドからAPI群を呼び出すための関数群
response.dataからの展開はこの関数内で行い、展開後のデータをクライアントサイドへ返している。
*/


/**
 * 共通のAPI fetchエラーハンドリング関数
 * 指定されたURLにHTTPリクエストを送信し、レスポンスのJSONデータを取得します。
 * 
 * @template T - レスポンスのジェネリクスデータ型（引数として渡された型としてデータを扱う)
 * @param {string} url - APIのURL (例："api/translate")
 * @param {RequestInit} [options] - 送信が必要なデータ
 * @returns {Promise<T>} - レスポンスから抽出されたデータを型Tを含むPromiseとして返す
 * @throws {Error} - フェッチ処理中にエラーが発生した場合の処理
 */
async function handleFetch<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(url, options);
    const result = await response.json();

    if (response.ok && result && 'data' in result) {
      console.log('apiClient:', result.data)
      return result.data as T;
    } else {
      console.error(`Error fetching ${url}:`, result);
      return [] as unknown as T;
    }
  } catch (error) {
    console.error('An error occurred:', error);
    return [] as unknown as T;
  }
}
