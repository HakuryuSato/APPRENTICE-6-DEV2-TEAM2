import { useSetAtom } from 'jotai';
import { userNameAtom, gameIdAtom, userIdAtom, topPageModeAtom, gamePageModeAtom } from '@/atoms/state';

export const useResetState = () => {
  // グローバルステートの更新関数を取得
  const setUserName = useSetAtom(userNameAtom);
  const setGameId = useSetAtom(gameIdAtom);
  const setUserId = useSetAtom(userIdAtom);
  const setTopPageMode = useSetAtom(topPageModeAtom);
  const setGamePageMode = useSetAtom(gamePageModeAtom);

  // リセット関数を返す
  const resetState = () => {
    setUserName(''); // ニックネームを初期値に
    setGameId(''); // ゲームIDを初期値に
    setUserId(''); // ユーザIDを初期値に
    setTopPageMode({ mode: 'sign-up' }); // ページモードを初期値に
    setGamePageMode({ mode: 'prepare' }); // ゲームページモードを初期値に
  };

  return resetState;
};
