// layout.tsx : defines shared UI that wraps pages beneath it
import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
// import type : only needed by TypeScript, not while the website is running.

// The title appears in the browser tab, while the description may be used by search engines and link previews.
// Individual pages can provide their own metadata when needed.
export const metadata: Metadata = {
  title: "Rishabh Tamhane",
  description:
    "Software engineer writing about systems, machine learning, things I build, and life outside software.",
};

// Describes the props accepted by RootLayout
type RootLayoutProps = {
  children: ReactNode;
};

// The children value is the page or nested layout that Next.js wants to render inside this layout.
export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
