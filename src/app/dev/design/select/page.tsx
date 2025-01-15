'use client';

import { Button } from '@/components/ui/button';

export default function SelectPage() {
  return (
    // JoinModelSelect
    <div className="flex flex-col justify-center items-center h-screen space-y-4 p-8">
      <div className="relative w-full rounded-lg overflow-hidden">
        <div className="before:block before:content-[''] before:pt-[50%]">
          <Button className="absolute inset-0 w-full h-full flex items-center justify-center rounded-lg">
            Create
          </Button>
        </div>
      </div>
      <div className="relative w-full rounded-lg overflow-hidden">
        <div className="before:block before:content-[''] before:pt-[50%]">
          <Button className="absolute inset-0 w-full h-full flex items-center justify-center rounded-lg">
            Enter
          </Button>
        </div>
      </div>
    </div>
  );
}
