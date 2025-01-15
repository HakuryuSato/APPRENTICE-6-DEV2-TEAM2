import Image from 'next/image';
import React from 'react';
import { GeneratedImage } from '../GeneratedImage';
import { Button } from '@/components/ui/button';
import { useResetState } from '@/hooks/top/TopPage/useResetState';
import { useRouter } from 'next/navigation';

export const Result: React.FC = () => {
  const resetState = useResetState();  // フックをトップレベルで呼び出す
  const router = useRouter();  // useRouter もトップレベルで呼び出す

  const handleResetState = () => {
    resetState();  // 状態リセット
    router.push('/');  // トップページに遷移
  };

  return (
    <>
      <h1 className="font-semibold text-2xl">Result</h1>

      <div className="flex flex-col items-center rounded-lg">
        <div className="flex flex-row items-center justify-center p-4 bg-fly-blue rounded-lg">
          {/* <GeneratedImage imageUrl="https://source.unsplash.com/random/256x256" /> */}
          <Image
            // src={imageUrl}
            src="https://images.unsplash.com/photo-1736159427273-189b0e49f19b?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Generated Image"
            className="rounded-md object-cover"
            width={160}
            height={160}
          />
          <div className="flex flex-col items-center justify-center pl-8">
            <h3 className="text-2xl">Taro1234</h3>
            <h3 className="font-semibold">1 point</h3>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center rounded-lg">
        <div className="flex flex-row items-center justify-center p-4 bg-fly-blue rounded-lg">
          {/* <GeneratedImage imageUrl="https://source.unsplash.com/random/256x256" /> */}
          <Image
            // src={imageUrl}
            src="https://images.unsplash.com/photo-1736159427273-189b0e49f19b?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Generated Image"
            className="rounded-md object-cover"
            width={160}
            height={160}
          />
          <div className="flex flex-col items-center justify-center pl-8">
            <h3 className="text-2xl">Taro1234</h3>
            <h3 className="font-semibold">1 point</h3>
          </div>
        </div>
      </div>

      <Button onClick={handleResetState} className="mt-4 p-2 bg-fly-purple text-white rounded-lg">
        end game
      </Button>
    </>
  );
};
