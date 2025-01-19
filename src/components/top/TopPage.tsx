import React from "react";
import { SignUp } from "./TopPage/SignUp";
import { Select } from "./TopPage/Select";
import { Create } from "./TopPage/Create";
import { Enter } from "./TopPage/Enter";
import { useAtom } from "jotai";
import { topPageModeAtom } from "@/atoms/state";

import { GlobalState } from "@/components/state/GlobalState";

export const TopPage: React.FC = () => {
  const [temporaryTopPageLayoutMode] = useAtom(topPageModeAtom); // グローバルステートから現在のモードを取得

  return (
    <>
    {/* 子要素をすべて
    ・上下中央揃え
    ・左右中央揃え
    ・コンポーネント間の空白:4
    ・パディング:4 */}
     
    <div className="flex flex-col justify-center items-center h-screen space-y-4 p-4">
      {/* モードが 'sign-up' の場合に SignUp コンポーネントを表示 */}
      {temporaryTopPageLayoutMode?.mode === "sign-up" && <SignUp />}
      {temporaryTopPageLayoutMode?.mode === "select" && <Select />}
      {temporaryTopPageLayoutMode?.mode === "create" && <Create />}
      {temporaryTopPageLayoutMode?.mode === "enter" && <Enter />}
    </div>
      {/* <GlobalState /> */}

      </>
       
  );
};
