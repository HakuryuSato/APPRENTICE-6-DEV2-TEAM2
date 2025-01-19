'use client';

import { CountDown } from '@/components/game/GamePage/CountDown';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function DesignPage() {
  return (
    // SignUp, Create, Enter, Prepare

    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          flexDirection: 'column', // ここで縦並びに設定
        }}
      >
        <div>
          <div className="flex flex-col items-center justify-center h-screen space-y-4 p-4 relative">
            <div>
              <CountDown
                seconds={10}
                onZero={() => {
                  console.log('１');
                }}
              />
              <div className="text-xl font-medium text-gray-800">
                全員揃ったから次のステージに移動するね！
              </div>
            </div>
            <div className="w-full h-56"></div>
          </div>
        </div>
      </div>
    </>
  );
}
