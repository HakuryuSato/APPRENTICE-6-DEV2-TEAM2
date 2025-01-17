import React from "react";
import { useAtom } from "jotai";
import { topPageModeAtom, userNameAtom } from "@/atoms/state";
import ThreeDButton from "@/components/3DButton/3DButton";
import { Button } from "@/components/ui/button";

export const Select: React.FC = () => {
  const [userName] = useAtom(userNameAtom);
  const [temporaryTopPageLayoutMode, setTemporaryTopPageLayoutMode] = useAtom(
    topPageModeAtom,
  ); // グローバルステートから取得

  const handleClickCreate = () => {
    setTemporaryTopPageLayoutMode({ mode: "create" });
  };
  const handleClickEnter = () => {
    setTemporaryTopPageLayoutMode({ mode: "enter" });
  };
  const handleClickBack = () => {
    setTemporaryTopPageLayoutMode({ mode: "sign-up" });
  };

  return (
    <>
      {/* 戻るボタン：親を無視して左4px,上4pxの位置に配置 */}
      <Button
        onClick={handleClickBack}
        className="absolute top-4 left-4 hover:bg-primary/90"
      >
        戻る
      </Button>

      <p>ニックネーム: {userName}</p>
      <div
        style={{
          display: "flex",
          gap: "2rem",
          justifyContent: "center",
          marginBottom: "2rem",
        }}
      >
        <div style={{ width: "200px", height: "200px" }}>
          <ThreeDButton
            text="部屋を作る"
            handleEnter={handleClickCreate}
            initialImage="/images/SimpleHome.png"
            onHoverImage="/images/SimpleHome.png"
          />
        </div>
        <div style={{ width: "200px", height: "200px" }}>
          <ThreeDButton
            text="部屋に入る"
            handleEnter={handleClickEnter}
            initialImage="/images/DoorClose.png"
            onHoverImage="/images/DoorOpen.png"
          />
        </div>
      </div>
    </>
  );
};

export default Select;
