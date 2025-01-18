import { UserStatus } from '@/types/UserStatus';
import Image from 'next/image';
import React from 'react';
import { GeneratedImage } from '../../GeneratedImage';

interface OnlyResultProps {
  firstUser: {
    userId: string;
    userName: string;
    image: {
      user: {
        url: string;
      };
    };
    votedCount: number;
  };
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
}

const OnlyResult: React.FC<OnlyResultProps> = ({ firstUser, otherUsers }) => {
  console.log(firstUser);
  console.log(otherUsers);
  // const imageUrl =
  //   'https://images.unsplash.com/photo-1736010755388-68a7d4cc0d62?q=80&w=2787&auto=format&fit=crop';

  return (
    <>
      {/* 1位のユーザー */}
      <div className="flex flex-col items-center rounded-lg mb-3 shadow-md">
        <div className="flex flex-col items-center justify-center p-3 max-w-300 bg-fly-softPurple rounded-lg">
          <GeneratedImage
            className="w-52 shadow-md"
            url={firstUser.image.user.url}
          />
          <div className="flex flex-row items-between justify-between pt-4">
            <h3 className="text-3xl font-bold text-fly-navy">
              {firstUser.userName}
            </h3>
            <h3 className="text-xl p-2 ml-4 rounded-md font-semibold bg-fly-navy text-white shadow-lg">
              {firstUser.votedCount} 票
            </h3>
          </div>
        </div>
      </div>

      {otherUsers.map((user) => (
        <div
          key={user.userId}
          className="flex flex-row items-center justify-between p-2 bg-fly-softPurple w-full rounded-lg shadow-md mb-2"
        >
          <GeneratedImage
            className="w-32 shadow-md"
            url={user.image.user.url}
          />
          <div className="flex flex-col items-center justify-center flex-1">
            <h3 className="text-x font-bold text-fly-navy">{user.userName}</h3>
            <h3 className="text-x mt-1 py-1 px-2 rounded-md bg-fly-navy text-white shadow-lg">
              {user.votedCount} 票
            </h3>
          </div>
        </div>
      ))}
    </>
  );
};

export default OnlyResult;
