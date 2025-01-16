import { atomWithStorage } from 'jotai/utils';
import type { GameState } from '@/types/GameState';

export const userNameAtom = atomWithStorage('userName', '');
export const gameIdAtom = atomWithStorage('gameId', '');
export const userIdAtom = atomWithStorage('userId', '');

//temporaryTopPageLayoutModeは　sign-up, select, create, enter
export const topPageModeAtom = atomWithStorage('temporaryTopPageLayoutMode', {
  mode: 'sign-up',
});
//
export const gamePageModeAtom = atomWithStorage('gamePageMode', {
  mode: 'prepare',
});

export const gameStateAtom = atomWithStorage<Partial<GameState>>(
  "gameState",
  {},
);