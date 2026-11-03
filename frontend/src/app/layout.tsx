import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { profile } from "@/content";

const unbounded = localFont({
  src: "../fonts/Unbounded.woff2",
  variable: "--font-unbounded",
  weight: "200 900",
  display: "swap",
});

const hanken = localFont({
  src: [
    { path: "../fonts/HankenGrotesk.woff2", style: "normal", weight: "100 900" },
    { path: "../fonts/HankenGrotesk-Italic.woff2", style: "italic", weight: "100 900" },
  ],
  variable: "--font-hanken",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${profile.name} | ${profile.role}`,
  description: profile.intro,
  openGraph: {
    title: `${profile.name} | ${profile.role}`,
    description: profile.headline,
    images: ["/majd.jpg"],
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#4a2cf0",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${unbounded.variable} ${hanken.variable} antialiased`}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
