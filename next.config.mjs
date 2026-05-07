/** @type {import('next').NextConfig} */
const PORTAL = 'https://gcu-development-portal.vercel.app';

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
    // Proxy new Design Generator share URLs to the main portal so the viewer
    // domain stays in the donor's URL bar but the portal owns the renderer
    // and data layer (Recharts, design-canvas CSS, Supabase queries, etc.).
    // Old proposal-builder URLs (no `?s=` token) still resolve via the local
    // Drizzle path in src/app/[id]/page.tsx.
    async rewrites() {
        return {
            beforeFiles: [
                // Donor share URL: /<design_id>?s=<token>. The has-query
                // matcher means legacy URLs (no s param) skip this rule.
                {
                    source: '/:id',
                    has: [{ type: 'query', key: 's' }],
                    destination: `${PORTAL}/share/design/:id`,
                },
                // The proxied portal page references these paths relatively.
                // Forwarding them keeps the donor's browser pointed at this
                // hostname while the actual bytes come from the portal.
                { source: '/_next/:path*',     destination: `${PORTAL}/_next/:path*` },
                { source: '/brand/:path*',     destination: `${PORTAL}/brand/:path*` },
                { source: '/api/design/:path*', destination: `${PORTAL}/api/design/:path*` },
            ],
        };
    },
};

export default nextConfig;
