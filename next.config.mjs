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
};

export default nextConfig;
