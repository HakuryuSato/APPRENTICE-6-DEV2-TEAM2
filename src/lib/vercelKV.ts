import { createClient } from '@vercel/kv';

// Vercel KV用クライアント
export const vercelKVClient = createClient({
  url: process.env.KV_REST_API_URL, // KV REST APIのURL
  token: process.env.KV_REST_API_TOKEN, // KV REST APIのトークン
});

