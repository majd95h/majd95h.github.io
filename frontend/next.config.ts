import type { NextConfig } from "next";

// STATIC_EXPORT=1 builds a plain static site in `out/` (used for GitHub Pages).
// Without it, the app builds normally for hosts like Vercel or Netlify.
const staticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  // Partial prerendering features need a server, so they are off for static export.
  cacheComponents: !staticExport,
  partialPrefetching: !staticExport,
  ...(staticExport && {
    output: "export",
    images: { unoptimized: true },
    trailingSlash: true,
  }),
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
