/** @type {import('next').NextConfig} */
const nextConfig = {
    // Allow images from any domain for proposal assets
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
        ],
    },
    eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors. This matches the builder's behavior.
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
