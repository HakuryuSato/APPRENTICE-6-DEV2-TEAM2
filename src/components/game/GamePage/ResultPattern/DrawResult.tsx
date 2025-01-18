import Image from 'next/image';
import React from 'react';
import { UserStatus } from '@/types/UserStatus';
import { GameState } from '@/types/GameState';
import { Generate } from '../Generate';
import { GeneratedImage } from '../../GeneratedImage';

type User = UserStatus & {
  vote: number; // 追加したい項目
};

type DrawResultProps = {
  drawUsers: Array<{
    userId: string;
    userName: string;
    image: {
      user: {
        url: string;
      };
    };
    votedCount: number;
  }>;
  otherUsers: Array<{
    userId: string;
    userName: string;
    image: {
      user: {
        url: string;
      };
    };
    votedCount: number;
  }>;
};

const DrawResult: React.FC<DrawResultProps> = ({ drawUsers, otherUsers }) => {
  console.log(drawUsers);
  console.log(otherUsers);

  const imageUrl = 'https://images.unsplash.com/photo-1736010755388-68a7d4cc0d62?q=80&w=2787&auto=format&fit=crop';
  
  return (
    <>
      {/* 同立1位のユーザー（2段2列のグリッド表示） */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {drawUsers.map((user) => (
          <div
            key={user.userId}
            className="flex flex-col items-center justify-center p-2 bg-fly-softPurple rounded-lg shadow-md"
          >
            <GeneratedImage className="w-36 shadow-md" url={user.image.user.url} />
            <div className="flex flex-col items-center justify-center pt-1">
              <h3 className="text-xl font-bold text-fly-navy">{user.userName}</h3>
              <h3 className="text-x mt-1 py-1 px-2 rounded-md bg-fly-navy text-white shadow-md">
                {user.votedCount} 票
              </h3>
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4">
        {otherUsers.map((user) => (
           <div
           key={user.userId}
           className="flex flex-col items-center justify-center p-2 bg-fly-softPurple rounded-lg shadow-md"
         >
           <GeneratedImage className="w-36 shadow-md" url={imageUrl} />
           <div className="flex flex-col items-center justify-center pt-1">
             <h3 className="text-xl font-bold text-fly-navy">{user.userName}</h3>
             <h3 className="text-x mt-1 py-1 px-2 rounded-md bg-fly-navy text-white shadow-md">
               {user.votedCount} 票
             </h3>
           </div>
         </div>
        ))}
      </div>
    </>
  );
};

export default DrawResult;