import { db } from '@/db';
import { proposals } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import type { Viewport } from 'next';
import Preview from '@/components/Preview';
import { ProposalData } from '@/types/proposal';

export const dynamic = 'force-dynamic';

// Render the proposal at its native 816px design width and let mobile
// browsers auto-fit the layout viewport into the device viewport. This
// is the same trick desktop-only sites use to render correctly on phones
// — the browser handles scaling natively, so iframes (the video sections)
// render normally instead of going black like they do inside CSS
// transform:scale or zoom wrappers. Pinch-zoom is preserved (max 5x) so
// donors can zoom in to read fine print.
export const viewport: Viewport = {
  width: 816,
  maximumScale: 5,
};

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ s?: string }>;
}

/**
 * Donor-facing proposal page.
 *
 * Two modes:
 *   1. **New (Design Generator)** — donor URL carries `?s=<share-token>`.
 *      We render an iframe of the main portal's `/share/design/<id>?s=<token>`
 *      route. The portal owns the data + renderer; the viewer URL stays on
 *      `gcu-proposal-viewer.vercel.app/<id>` in the address bar.
 *   2. **Legacy (proposal-builder)** — no `s` param. We fall back to the
 *      historical Vercel Postgres lookup so old shared links keep resolving.
 */
export default async function ProposalPage({ params, searchParams }: PageProps) {
  const { id } = await params;
  const { s: shareToken } = await searchParams;

  // ── Mode 1: Design Generator share token present ─────────────────────────
  if (shareToken) {
    const portalBase = process.env.MAIN_PORTAL_URL || 'https://gcu-development-portal.vercel.app';
    const innerUrl = `${portalBase}/share/design/${encodeURIComponent(id)}?s=${encodeURIComponent(shareToken)}`;
    return (
      <div className="min-h-screen bg-white" style={{ colorScheme: 'light' }}>
        <iframe
          src={innerUrl}
          className="w-screen h-screen border-0 block"
          style={{ minHeight: '100vh' }}
          title="GCU Proposal"
          sandbox="allow-scripts allow-forms allow-popups allow-same-origin allow-downloads"
        />
      </div>
    );
  }

  // ── Mode 2: legacy proposal-builder lookup ───────────────────────────────
  const result = await db.select().from(proposals).where(eq(proposals.id, id)).limit(1);

  if (result.length === 0) {
    notFound();
  }

  const data = result[0].data as ProposalData;

  return (
    <div className="min-h-screen bg-white flex flex-col items-center text-black" style={{ colorScheme: 'light' }}>
      <Preview data={data} />

      <div className="mt-8 mb-4 text-xs text-gray-300 print:hidden">
        Powered by GCU
      </div>
    </div>
  );
}
