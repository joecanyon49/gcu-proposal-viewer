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
 * overflow on phones. Rather than rewrite every section, we transform the
 * whole tree with CSS scale on narrow viewports. The wrapper height is
 * adjusted to match so vertical scrolling continues to work.
 *
 * Print is left untouched — `@media print` reverses the scale so PDFs
 * render at full resolution.
 */
export default function ScaledPreview({ data }: { data: ProposalData }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [innerHeight, setInnerHeight] = useState<number | null>(null);

  useEffect(() => {
    const recalc = () => {
      const containerW = containerRef.current?.clientWidth ?? window.innerWidth;
      // Cap at 1 so wide screens render the design at 100% — never upscale.
      const next = Math.min(1, containerW / DESIGN_WIDTH);
      setScale(next);
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

  // Track the inner content height so the outer wrapper is tall enough
  // to expose every scaled section to vertical scroll.
  useEffect(() => {
    if (!innerRef.current) return;
    const measure = () => {
      const h = innerRef.current?.scrollHeight ?? 0;
      setInnerHeight(h);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(innerRef.current);
    return () => ro.disconnect();
  }, [scale, data]);

  const wrapperHeight = innerHeight !== null ? innerHeight * scale : undefined;

  return (
    <div
      ref={containerRef}
      className="w-full overflow-hidden print:overflow-visible"
      style={{ height: wrapperHeight }}
    >
      <div
        ref={innerRef}
        className="origin-top-left print:!transform-none"
        style={{
          width: DESIGN_WIDTH,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
        }}
      >
        <Preview data={data} />
      </div>
    </div>
  );
}
