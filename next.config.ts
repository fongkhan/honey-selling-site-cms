import { withPayload } from '@payloadcms/next/withPayload';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: { reactCompiler: false },
  // Standalone build is the cleanest target for shared hosting + Docker.
  output: 'standalone',
};

export default withPayload(nextConfig);
