'use client';

import { GeneratedImage } from '@/components/game/GeneratedImage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function WithImagePage() {
  return (
    // generate,result
    <div className="flex flex-col justify-center items-center h-screen space-y-4 p-8">
      {/* <p>デザインページ</p> */}
      <GeneratedImage
        className="w-full"
        url="https://images.unsplash.com/photo-1736010755388-68a7d4cc0d62?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      <Input />
      <div className="relative w-full overflow-hidden rounded-lg">
        <div className="before:block before:content-[''] before:pt-[14%]">
          <Button className="absolute inset-0 w-full h-full flex items-center justify-center bg-blue-500 text-white font-bold rounded-lg">
            Register Username
          </Button>
        </div>
      </div>
    </div>
  );
}
