import { kv } from '@vercel/kv'

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
        return (await kv.get(key)) ?? null
      case 'set':
        // 今回はオブジェクト以外格納予定がないためvalueは''
        if (obj) {
          await kv.set(key, '', obj)
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
async function kvGet (key: string): Promise<object | null> {
  return (await handleKvOperation('get', key)) as object | null
}

// 書き込み *値があれば上書き
async function kvSet (key: string, obj: object): Promise<void> {
  await handleKvOperation('set', key, obj)
}

// 削除
async function kvDel (key: string): Promise<void> {
  await handleKvOperation('del', key)
}


export {
  kvWrite,
  kvRead,
  kvDelete
}
