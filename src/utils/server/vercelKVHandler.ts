import { kv } from '@vercel/kv'
import type { GameState } from '@/types/GameState'

// VercelKV関連の関数群  -------------------------------------------------
// 共通関数
async function handleKvOperation (
  operation: 'get' | 'set' | 'del',
  key: string,
  obj?: object
): Promise<object | void | null> {
  try {
    switch (operation) {
      case 'get':
        const json = (await kv.get(key)) ?? null
        if (json) {
          obj = JSON.parse(json)
        }
        return obj ?? null
      case 'set':
        // 今回はオブジェクト以外格納予定がないためvalueは''
        if (obj) {
          const json = JSON.stringify(obj)
          await kv.set(key, json)
        } else {
          throw new Error('Missing object for "set" operation')
        }
        break
      case 'del':
        await kv.del(key)
        break
      default:
        throw new Error(`Unsupported operation: ${operation}`)
    }
  } catch (error) {
    console.error(`Error during VercelKV operation (${operation}):`, error)
    throw error
  }
}

// 読み取り
async function kvGet (key: string): Promise<GameState | null> {
  return (await handleKvOperation('get', key)) as GameState | null
}

// 書き込み *値があれば上書き
async function kvSet (key: string, obj: object): Promise<void> {
  await handleKvOperation('set', key, obj)
}

// 削除
async function kvDel (key: string): Promise<void> {
  await handleKvOperation('del', key)
}

export { kvGet, kvSet, kvDel }
