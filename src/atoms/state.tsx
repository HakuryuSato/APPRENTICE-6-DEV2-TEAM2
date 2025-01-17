import { atomWithStorage } from 'jotai/utils';

export const userNameAtom = atomWithStorage('userName', '');
export const gameIdAtom = atomWithStorage('gameId', '');
export const userIdAtom = atomWithStorage('userId', '');
export const promptsAtom = atomWithStorage('prompt', '');
export const roundAtom = atomWithStorage('round', 1);

//temporaryTopPageLayoutModeは　sign-up, select, create, enter
export const topPageModeAtom = atomWithStorage('temporaryTopPageLayoutMode', {
  mode: 'sign-up',
});
//
export const gamePageModeAtom = atomWithStorage('gamePageMode', {
  mode: 'prepare',
});
