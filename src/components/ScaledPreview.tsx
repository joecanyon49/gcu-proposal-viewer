'use client';

import { useEffect, useRef, useState } from 'react';
import Preview from './Preview';
import { ProposalData } from '@/types/proposal';

const DESIGN_WIDTH = 816; // Preview's fixed logical width in px

/**
 * Scales the 816px Preview design to fit any viewport.
 *
 * Preview is mirrored from the portal repo and was designed at a fixed
 * letter-page width — its sections use absolute font/spacing values that
 * overflow on phones. Rather than rewrite every section, we shrink the
 * whole tree on narrow viewports.
 *
 * We use CSS `zoom` (not `transform: scale`) deliberately. Mobile Safari
 * has a long-standing bug where iframes inside a `transform`ed parent
 * render as a black box — which broke the video showcase / video story
 * sections on phones. `zoom` is treated as a layout/rendering property
 * by browsers, so iframes render correctly, and the parent's box model
 * resizes naturally so vertical scrolling Just Works without us tracking
 * scrollHeight manually. Supported in all modern browsers, including
 * iOS Safari and Firefox 126+.
 *
 * Print is left untouched — `@media print` resets zoom so PDFs still
 * render at full resolution.
 */
export default function ScaledPreview({ data }: { data: ProposalData }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const recalc = () => {
      const containerW = containerRef.current?.clientWidth ?? window.innerWidth;
      // Cap at 1 so wide screens render the design at 100% — never upscale.
      setZoom(Math.min(1, containerW / DESIGN_WIDTH));
    };

    recalc();
    const ro = new ResizeObserver(recalc);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener('orientationchange', recalc);
    return () => {
      ro.disconnect();
      window.removeEventListener('orientationchange', recalc);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full print:overflow-visible">
      <style>{`@media print { .scaled-preview-inner { zoom: 1 !important; } }`}</style>
      <div
        className="scaled-preview-inner mx-auto"
        style={{ zoom, width: DESIGN_WIDTH } as React.CSSProperties}
      >
        <Preview data={data} />
      </div>
    </div>
  );
}
