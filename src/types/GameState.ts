import type { UserStatus } from "./UserStatus";

export type GamePhase = 'prepare' | 'generate' | 'vote' | 'result';
export type GameAction = 'join' | 'ready';

export interface GameState {
    gameId: string;
    gamePhase: GamePhase;
    round: number;
    users: UserStatus[];
}

export interface GameStateRequest {
    gameId: string;
    action: GameAction;
    users: UserStatus[];
}