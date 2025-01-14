// 形式のため作りましたが、不要であれば削除してください。import React from 'react';
import { useAtom } from "jotai";
import { topPageModeAtom, userNameAtom } from "@/atoms/state";
import { Button } from "@/components/ui/button";


export const Select: React.FC = () => {

    const [userName] = useAtom(userNameAtom);
    const [temporaryTopPageLayoutMode, setTemporaryTopPageLayoutMode] = useAtom(topPageModeAtom); // グローバルステートから取得


    const handleClickCreate = () => {
        setTemporaryTopPageLayoutMode({ mode: 'create' });
    }
    const handleClickEnter = () => {
        setTemporaryTopPageLayoutMode({ mode: 'enter' });
    }
    const handleClickBack = () => {
      setTemporaryTopPageLayoutMode({ mode: 'sign-up' });
    }


  return (
    <div className="flex flex-col items-center gap-4">
      <h1>現在は {temporaryTopPageLayoutMode.mode}モードです。</h1>
      <p>ニックネーム: {userName}</p>

      <div className="flex gap-4">
        <Button onClick={handleClickCreate}>ルームを作る</Button>
        <Button onClick={handleClickEnter}>ルームに入る</Button>
      </div>
      <Button className="bg-slate-500" onClick={handleClickBack}>戻る</Button>
    </div>


  );
};

export default Select;
