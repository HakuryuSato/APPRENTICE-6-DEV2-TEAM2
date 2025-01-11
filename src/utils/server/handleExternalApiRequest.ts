import { NextResponse } from 'next/server';

/**
 * 外部API呼び出し時の処理を共通化する関数
 * @param handler APIに対するリクエストなどの処理内容
 * @returns NextResponseオブジェクト
 */
export async function handleExternalApiRequest<T>(handler: () => Promise<T>): Promise<NextResponse> {
  try {
    const data = await handler();
    return NextResponse.json({ data }, { status: 200 });

  } catch (error: unknown) {
    let message = 'サーバーエラーが発生しました';
    const status = 500; // 外部APIのエラーは全て500エラーとして扱っています。

    // エラーをそのまま返す
    if (error instanceof Error) {
      message = error.message; // 注意：APIによってはmessageがない可能性もあります。
    }

    return NextResponse.json({ error: message }, { status });
  }
}
