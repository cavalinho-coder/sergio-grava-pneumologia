import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async redirects() {
    const canonicalOrigin = new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://sergio-grava-pneumologia.vercel.app");
    // Activate host redirects together with the final domain, never before DNS migration.
    if (canonicalOrigin.hostname !== "drsergiograva.com.br") return [];
    return [
      { source: "/:path*", has: [{ type: "host", value: "www.drsergiograva.com.br" }], destination: "https://drsergiograva.com.br/:path*", statusCode: 301 },
      { source: "/:path*", has: [{ type: "host", value: "sergio-grava-pneumologia.vercel.app" }], destination: "https://drsergiograva.com.br/:path*", statusCode: 301 },
      { source: "/index.php", destination: "/", statusCode: 301 },
    ];
  },
};

export default nextConfig;
