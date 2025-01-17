import { UserStatus } from '@/types/UserStatus';
import Image from 'next/image';
import React from 'react';
import { GeneratedImage } from '../../GeneratedImage';

type User = UserStatus & {
  vote: number; // 追加したい項目
};

interface OnlyResultProps {
  firstUser: User;
  otherUsers: User[];
}

const OnlyResult: React.FC<OnlyResultProps> = ({ firstUser, otherUsers }) => {
  console.log(firstUser);
  console.log(otherUsers);
  const imageUrl =
    'https://images.unsplash.com/photo-1736010755388-68a7d4cc0d62?q=80&w=2787&auto=format&fit=crop';

  return (
    <>
      <h1 className="font-semibold text-2xl text-fly-navy">Result</h1>

      {/* 1位のユーザー */}
      <div className="flex flex-col items-center rounded-lg mb-4">
        <div className="flex flex-col items-center justify-center p-4 max-w-300 bg-fly-softPurple rounded-lg">
          <GeneratedImage className="" url={imageUrl} />
          <div className="flex flex-row items-center justify-center py-4">
            <h3 className="text-4xl font-bold text-fly-navy">
              {firstUser.userName}
            </h3>
            <h3 className="text-2xl ml-8 p-1 rounded-md font-semibold bg-fly-navy text-white">
              {firstUser.vote} point
            </h3>
          </div>
        </div>
      </div>

      {otherUsers.map((user) => (
        <div
          key={user.userId}
          className="flex flex-col items-center justify-center p-2 bg-fly-softPurple rounded-lg shadow-md"
        >
          <GeneratedImage className="" url={imageUrl} />
          <div className="flex flex-col items-center justify-center pt-2">
            <h3 className="text-xl font-bold text-fly-navy">{user.userName}</h3>
            <h3 className="text-x mt-1 py-1 px-2 rounded-md bg-fly-navy text-white">
              {user.vote} points
            </h3>
          </div>
        </div>
      ))}
    </>
  );
};

export default OnlyResult;
