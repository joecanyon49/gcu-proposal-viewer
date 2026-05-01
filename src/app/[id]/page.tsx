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
}

export default async function ProposalPage({ params }: PageProps) {
  const { id } = await params;

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
