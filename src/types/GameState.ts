import type { UserStatus } from './UserStatus'

export type GamePhase = 'prepare' | 'generate' | 'vote' | 'result'
export type GameStateRequestType = 'join' | 'ready'

export interface GameState {
  gameId: string
  gamePhase: GamePhase
  round: number
  users: UserStatus[]
}

export interface GameStateRequest {
  gameId: string
  gameStateRequestType: GameStateRequestType
  userId: string
}
