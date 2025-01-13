import { useSetAtom } from 'jotai';
import { userNameAtom, topPageModeAtom } from '@/atoms/state';

export const useResetState = () => {
  // グローバルステートの更新関数を取得
  const setUserName = useSetAtom(userNameAtom);
  const setTopPageMode = useSetAtom(topPageModeAtom);

  // リセット関数を返す
  const resetState = () => {
    setUserName(''); // ニックネームを初期値に
    setTopPageMode({ mode: 'sign-up' }); // ページモードを初期値に
  };

  return resetState;
};