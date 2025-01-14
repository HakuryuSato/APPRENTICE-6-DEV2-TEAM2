'use client'

import React, { useState } from 'react'
import {
  fetchGameState,
  updateGameState,
  deleteGameState
} from '@/utils/client/apiClient'
import type { GameState } from '@/types/GameState'

export default function DevSatouPage() {
  const [gameState, setGameState] = useState<GameState|null>(null)
  const testGameId = 'test-game-id'

  // Fetch
  const handleFetch = async () => {
    const data = await fetchGameState(testGameId)
    console.log('Fetched:', data)
    setGameState(data)
  }

  // Update
  const handleUpdate = async () => {
    // 例として、"create" で新規 GameState を作成
    await updateGameState({
      gameId: testGameId,
      gameStateRequestType: 'create',
      userStatus: { userId: '', userName: '', isReady: false }
    })
    console.log('Updated (created).')
  }

  // Delete
  const handleDelete = async () => {
    const deleted = await deleteGameState(testGameId)
    console.log('Deleted:', deleted)
  }

  return (
    <div style={{ padding: '1rem' }}>
      <button onClick={handleFetch}>取得</button>
      <button onClick={handleUpdate} style={{ marginLeft: '0.5rem' }}>更新</button>
      <button onClick={handleDelete} style={{ marginLeft: '0.5rem' }}>削除</button>

      {/* Fetch結果を表示（無ければ 'なし'） */}
      <div style={{ marginTop: '1rem' }}>
        <p>Fetch結果: {gameState ? JSON.stringify(gameState) : 'なし'}</p>
      </div>
    </div>
  )
}
