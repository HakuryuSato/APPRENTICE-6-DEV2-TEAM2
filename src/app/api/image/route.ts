// app/api/image/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  // デモ用に適当なPNGバイナリを返す（実際には有効な256x256のPNGを返してください）
  const pngBuffer = Buffer.from([
    0x89,0x50,0x4E,0x47,0x0D,0x0A,0x1A,0x0A,
    // ここに256x256 PNGのバイナリデータを埋め込む必要あり（デモ省略）
  ]);

  return new NextResponse(pngBuffer, {
    headers: {
      'Content-Type': 'image/png',
      'Content-Length': pngBuffer.length.toString()
    }
  });
}
