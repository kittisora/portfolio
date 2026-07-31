/** @type {import('next').NextConfig} */
const nextConfig = {
    // All imagery is served from `public/`, so no `images.remotePatterns` entry
    // is needed. Add one here if a remote image host is ever introduced.
    experimental: {
        // Only list packages that are actually installed and imported — a stale
        // entry here is silently ignored, which hides the fact that it is dead.
        optimizePackageImports: ["@untitledui/icons", "react-aria-components"],
    },
};

export default nextConfig;
