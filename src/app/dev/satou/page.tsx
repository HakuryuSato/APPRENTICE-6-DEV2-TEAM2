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
    setGameState(data)
  }


  // Create,Enterは自動でuserStatusのisReadyをtrueにします
  // Create
  const handleCreate = async () => {
    // 例として、"create" で新規 GameState を作成
    await updateGameState({
      gameId: testGameId,
      gameStateRequestType: 'create',
      userStatus: { userId: '1', userName: 'a', isReady: false }
    })
  }

    // Enter 
    const handleEnter = async () => {
      await updateGameState({
        gameId: testGameId,
        gameStateRequestType: 'enter',
        userStatus: { userId: '2', userName: 'b', isReady: false } 
      })
    }

    // Ready
    const handleReady = async () => {
      await updateGameState({
        gameId: testGameId,
        gameStateRequestType: 'ready',
        userStatus: { userId: '2', userName: 'b', isReady: false }
      })
    }


  // Delete
  const handleDelete = async () => {
    const deleted = await deleteGameState(testGameId)
    console.log('Deleted:', deleted)
  }

  return (
    <div style={{ padding: '1rem' }}>
      <button onClick={handleFetch}>取得</button>
      <button onClick={handleCreate} style={{ marginLeft: '0.5rem' }}>作成</button>
      <button onClick={handleEnter} style={{ marginLeft: '0.5rem' }}>入室</button>
      <button onClick={handleReady} style={{ marginLeft: '0.5rem' }}>準備完了解除</button>
      <button onClick={handleDelete} style={{ marginLeft: '0.5rem' }}>削除</button>

      {/* Fetch結果を表示（無ければ 'なし'） */}
      <div style={{ marginTop: '1rem' }}>
        <p>Fetch結果: {gameState ? JSON.stringify(gameState) : 'なし'}</p>
      </div>
    </div>
  )
}
