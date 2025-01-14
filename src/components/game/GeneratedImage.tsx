import React from "react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { GeneratedImageProps } from "@/types/GenerateImage";

export const GeneratedImage: React.FC<GeneratedImageProps> = ({ imageUrl }) => {
  return (
    <div className="w-full">
      {/* ratioで画像の比率を変えられます */}
      <AspectRatio ratio={4 / 3}>
        <Image
          src={imageUrl}
          alt="Generated Image"
          className="rounded-md object-cover"
          fill
        />
      </AspectRatio>
    </div>
  );
};
