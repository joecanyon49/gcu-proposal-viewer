import { db } from '@/db';
import { proposals } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import Preview from '@/components/Preview';
import { ProposalData } from '@/types/proposal';

export const dynamic = 'force-dynamic';

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
    <div className="min-h-screen bg-white flex flex-col items-center overflow-y-auto text-black" style={{ colorScheme: 'light' }}>
      <div className="bg-white w-full md:w-[816px] min-h-screen">
        <Preview data={data} />
      </div>

      <div className="mt-8 mb-4 text-xs text-gray-300 print:hidden">
        Powered by GCU
      </div>
    </div>
  );
}
