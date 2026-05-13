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
                // /_next/* and /brand/* — only proxy to portal when the
                // request was triggered by a proxied portal share page
                // (referer contains `?s=`). The viewer's OWN [id] page
                // (legacy proposal-builder, no token) generates its own
                // client bundle (ScaledPreview etc.) with viewer-specific
                // hashes — those requests must hit viewer's local
                // /_next/* files, NOT get rewritten to portal where they
                // 404. Same-origin referer always includes the full URL
                // with query string (default Referrer-Policy), so the
                // regex reliably distinguishes the two cases.
                //
                // We can't use `afterFiles` for this: Vercel's CDN serves
                // `/_next/static/*` directly before any afterFiles rule
                // fires, so a missing portal chunk on viewer returns 404
                // instead of falling through to the rewrite.
                {
                    source: '/_next/:path*',
                    has: [{ type: 'header', key: 'referer', value: '.*\\?s=.*' }],
                    destination: `${PORTAL}/_next/:path*`,
                },
                {
                    source: '/brand/:path*',
                    has: [{ type: 'header', key: 'referer', value: '.*\\?s=.*' }],
                    destination: `${PORTAL}/brand/:path*`,
                },
                // Same referer-gated pattern as /brand/*: portal ships
                // brand fonts (Thunder) under /fonts/* and references them
                // via `@font-face src: url('/fonts/...')` in globals.css.
                // Without this rewrite the donor's browser requests the
                // font from the viewer hostname and 404s, falling back to
                // Inter. Gated by referer so the viewer's own legacy
                // pages keep serving their local /fonts/* (none today,
                // but stays consistent with /brand/*).
                {
                    source: '/fonts/:path*',
                    has: [{ type: 'header', key: 'referer', value: '.*\\?s=.*' }],
                    destination: `${PORTAL}/fonts/:path*`,
                },
                // /api/design/* is portal-only; viewer has no conflicting
                // route, so proxy unconditionally.
                { source: '/api/design/:path*', destination: `${PORTAL}/api/design/:path*` },
            ],
        };
    },
};

export default nextConfig;
