// next.config.mjs
import withBundleAnalyzer from '@next/bundle-analyzer';

const nextConfig = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})({
  // You can add other Next.js configurations here if needed
});

export default nextConfig;
