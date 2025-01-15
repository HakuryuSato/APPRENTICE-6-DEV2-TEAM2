'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function DesignPage() {
  return (
    // SignUp, Create, Enter, Prepare
    <div className="flex flex-col justify-center items-center h-screen space-y-4 p-8">
      {/* <p>デザインページ</p> */}
      <Input className="w-full py-3" />
      <div className="relative w-full overflow-hidden rounded-lg">
        <div className="before:block before:content-[''] before:pt-[16%]">
          <Button className="absolute inset-0 w-full h-full flex items-center justify-center rounded-lg bg-fly-purple">
            Register Username
          </Button>
        </div>
      </div>
    </div>
  );
}
