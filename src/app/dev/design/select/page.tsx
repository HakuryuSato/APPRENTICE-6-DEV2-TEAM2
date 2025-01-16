'use client';

import ThreeDButton from '@/components/3DButton/3DButton';
import { Button } from '@/components/ui/button';

export default function SelectPage() {
  const handleEnter = () => {
    console.log('2回目のタップが発生しました！');
  };
  return (
    // JoinModelSelect
    <div className="flex flex-col justify-center items-center h-screen space-y-4 p-8">
      <ThreeDButton
        firstText="部屋を作成"
        secondText="する"
        handleEnter={handleEnter} // 2回目のタップ時に実行される関数
      />
      <ThreeDButton
        firstText="部屋に"
        secondText="入る"
        handleEnter={handleEnter} // 2回目のタップ時に実行される関数
      />
      {/* <Button className="w-full py-20 rounded-lg">Create</Button>
      <Button className="w-full py-20 rounded-lg">Enter</Button> */}
    </div>
  );
}
