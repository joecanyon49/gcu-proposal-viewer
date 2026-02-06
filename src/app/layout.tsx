import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "GCU Proposal",
    description: "Grand Canyon University Partnership Proposal",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="antialiased">
                {children}
            </body>
        </html>
    );
}
