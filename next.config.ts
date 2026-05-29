import type { NextConfig } from "next";

/**
 * When STATIC_EXPORT is set (used by the GitHub Pages deploy workflow) we emit a
 * fully static site under /out. The basePath/assetPrefix are required because
 * project Pages are served from https://<user>.github.io/<repo>/.
 *
 * The default (unset) build is a normal server-capable Next.js build — this is
 * what CI builds and what the production host (Vercel) will run once we add the
 * server-backed features (auth, Postgres, AI generation). See docs/adr/0001.
 */
const isStaticExport = process.env.STATIC_EXPORT === "1";
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  ...(isStaticExport
    ? {
        output: "export",
        basePath,
        assetPrefix: basePath || undefined,
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;
