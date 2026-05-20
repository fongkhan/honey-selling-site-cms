import { withPayload } from '@payloadcms/next/withPayload';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: { reactCompiler: false },
  // Standalone build is the cleanest target for shared hosting + Docker in production.
  output: process.env.NODE_ENV === 'production' ? 'standalone' : undefined,
};

export default withPayload(nextConfig);
