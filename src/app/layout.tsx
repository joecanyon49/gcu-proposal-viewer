import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "GCU Proposal",
    description: "Grand Canyon University Partnership Proposal",
};

// NOTE: do NOT set `initialScale` here. The donor [id] route exports its
// own viewport with `width: 816` so mobile browsers auto-fit the proposal's
// native design width to the device. If we set `initial-scale: 1` at the
// layout level, the merged meta becomes `width=816, initial-scale=1`, and
// iOS Safari honors the initial-scale=1 → renders the 816-wide page at 1×
// on a 390 phone → horizontal-overflow clipped by `overflow-x-hidden`, so
// donors see only the left strip of every page. Leaving initial-scale unset
// lets Safari compute it from `width=816` (≈ 0.48 on a 390 phone) and the
// proposal renders correctly scaled.
export const viewport: Viewport = {
    width: 'device-width',
    maximumScale: 5,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased overflow-x-hidden">
                {children}
            </body>
        </html>
    );
}
