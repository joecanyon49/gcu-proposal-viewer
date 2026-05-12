'use client';

import { useEffect, useRef, useState } from 'react';
import Preview from './Preview';
import type { ProposalData } from '@/types/proposal';

/**
 * Donor-facing mobile-fit wrapper. Renders Preview at its native 816px
 * design width and uses `transform: scale()` to visually shrink it to
 * the device viewport.
 *
 * Why not the viewport=816 trick: Next.js auto-injects
 * `initial-scale=1` in the viewport meta unless YOU explicitly set it
 * (createDefaultViewport in next/dist/lib/metadata/default-metadata.js).
 * Page-level `viewport: { width: 816 }` merges to
 * `width=816, initial-scale=1` — iOS Safari honors the 1× scale and
 * renders the 816-wide page at full size on a 390 phone. Body's
 * `overflow-x-hidden` hides the right half. Donor sees only the left
 * strip of every page.
 *
 * Why not CSS zoom: iOS Safari < 16 doesn't support `zoom`; layout
 * inconsistencies in older Android Chrome.
 *
 * Known tradeoff: video iframes inside a `transform: scale()` parent
 * can render as solid black on some Safari versions. The donor-facing
 * legacy proposals from the proposal-builder era rarely use video, and
 * the cover/synopsis pages (the most-viewed parts) have no iframes.
 */
export default function ScaledPreview({ data }: { data: ProposalData }) {
  const [fitScale, setFitScale] = useState(1);
  const [scaledHeight, setScaledHeight] = useState<number | undefined>(undefined);
  const innerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const recompute = () => {
      const w = window.innerWidth;
      const s = Math.min(1, w / 816);
      setFitScale(s);
      if (innerRef.current) {
        setScaledHeight(innerRef.current.scrollHeight * s);
      }
    };
    recompute();
    window.addEventListener('resize', recompute);
    window.addEventListener('orientationchange', recompute);
    return () => {
      window.removeEventListener('resize', recompute);
      window.removeEventListener('orientationchange', recompute);
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !innerRef.current) return;
    const observer = new ResizeObserver(() => {
      if (innerRef.current) {
        setScaledHeight(innerRef.current.scrollHeight * fitScale);
      }
    });
    observer.observe(innerRef.current);
    return () => observer.disconnect();
  }, [fitScale]);

  return (
    <div
      className="mx-auto"
      style={{
        width: `${816 * fitScale}px`,
        height: scaledHeight,
      }}
    >
      <div
        ref={innerRef}
        style={{
          width: 816,
          transform: `scale(${fitScale})`,
          transformOrigin: 'top left',
        }}
      >
        <Preview data={data} />
      </div>
    </div>
  );
}
