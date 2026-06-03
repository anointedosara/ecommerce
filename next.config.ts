import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Several product/illustration assets are SVGs served from /public.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
