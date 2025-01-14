import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["images.unsplash.com", "picsum.photos"], // 許可する画像のホスト名を追加
  },
};

export default nextConfig;
