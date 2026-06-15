import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeScript } from "@/components/ThemeScript";
import { site } from "@/lib/site";
import { DEFAULT_THEME } from "@/lib/theme";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s — ${site.title}` },
  description: site.description,
  applicationName: site.title,
  authors: [{ name: site.author, url: site.gitUrl }],
  creator: site.author,
  publisher: site.author,
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": [{ url: "/rss.xml", title: site.title }],
    },
  },
  openGraph: {
    type: "website",
    siteName: site.title,
    title: { default: site.title, template: `%s — ${site.title}` },
    description: site.description,
    url: site.url,
    locale: site.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: { default: site.title, template: `%s — ${site.title}` },
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased${DEFAULT_THEME === "dark" ? " dark" : ""}`}
    >
      <body className="min-h-full">
        <ThemeScript />
        {children}
      </body>
    </html>
  );
}
