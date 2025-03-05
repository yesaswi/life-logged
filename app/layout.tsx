import "./global.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Navbar } from "./components/nav";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "./components/footer";
import { auth } from "./lib/auth";
import { SessionProvider } from "./components/auth-provider";
import { Toaster } from "./components/ui/toaster";

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://life-logged.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Life, Logged",
    template: "%s | Life, Logged",
  },
  description: "A personal journey through life, projects, and books.",
  openGraph: {
    title: "Life, Logged",
    description: "A personal journey through life, projects, and books.",
    url: baseUrl,
    siteName: "Life, Logged",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} dark`}
      suppressHydrationWarning
      style={{ colorScheme: 'dark' }}
    >
      <body className="min-h-screen bg-background font-sans antialiased">
        <SessionProvider session={session}>
          <div className="mx-auto max-w-2xl px-4">
            <Navbar />
            <main>
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
          <Analytics />
          <SpeedInsights />
        </SessionProvider>
      </body>
    </html>
  );
}
