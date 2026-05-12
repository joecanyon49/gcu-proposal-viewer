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
            ],
            // afterFiles: only fires when the viewer doesn't have the file
            // locally. The proxied portal page's HTML references chunks/CSS
            // under /_next/* — those hashes won't match anything on the
            // viewer's build, so the file lookup fails and the rewrite
            // forwards them to the portal. The viewer's OWN [id] page (legacy
            // ScaledPreview wrapper, etc.) has its own /_next/* chunks that
            // DO match locally — they hit before any rewrite fires.
            //
            // Previously these were in beforeFiles, which intercepted EVERY
            // /_next request before the local file lookup. Result: the
            // viewer's own client-side JS 404'd (chunks routed to the
            // portal where they don't exist), ScaledPreview never hydrated,
            // legacy proposals rendered at scale(1) on mobile = horizontal
            // overflow, donor sees only the left strip.
            afterFiles: [
                { source: '/_next/:path*',     destination: `${PORTAL}/_next/:path*` },
                { source: '/brand/:path*',     destination: `${PORTAL}/brand/:path*` },
                { source: '/api/design/:path*', destination: `${PORTAL}/api/design/:path*` },
            ],
        };
    },
};

export default nextConfig;
