import type { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => {
    // '@' 별칭을 프로젝트의 루트 디렉토리로 설정
    config.resolve.alias['@'] = path.resolve(__dirname);

    return config;
  },
};

export default nextConfig;
