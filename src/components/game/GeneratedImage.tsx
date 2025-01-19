import React from 'react';
import Image from 'next/image';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { GeneratedImageProps } from '@/types/GenerateImage';

export const GeneratedImage: React.FC<GeneratedImageProps> = ({
  url,
  className,
}) => {
  return (
    <div className={className ? `${className}` : 'w-full'}>
      {/* classNameのwidthによって画像のサイズを変えれます。
          使用する際に、next.config.tsに、許可する画像のホスト名を追加する必要があります
      */}
      <AspectRatio ratio={1 / 1}>
        <Image
          // src={imageUrl}
          src={url}
          alt="Generated Image"
          className="rounded-md object-cover"
          fill
        />
      </AspectRatio>
    </div>
  );
};
