import "@/styles/globals.scss";

import type { Metadata } from "next";
import { Inter } from "next/font/google";

// import { CursorFollower } from "@/components/shared";
import ThemeProvider from "@/providers/theme-provider";
import { AuthProvider } from "@/contexts/auth-context";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Loomic - Build. Showcase. Sell.",
  description:
    "Your creative portfolio ecosystem. Build stunning portfolios, showcase your work, and sell your creations.",
  keywords: ["portfolio", "showcase", "marketplace", "creative", "builder"],
  authors: [{ name: "Loomic" }],
  creator: "Loomic",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://loomic.com",
    title: "Loomic - Build. Showcase. Sell.",
    description: "Your creative portfolio ecosystem",
    siteName: "Loomic",
  },
  twitter: {
    card: "summary_large_image",
    title: "Loomic - Build. Showcase. Sell.",
    description: "Your creative portfolio ecosystem",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className="antialiased bg-clr-background text-clr-foreground min-h-screen">
        <ThemeProvider>
          <AuthProvider>
            {children}
            {/* <CursorFollower /> */}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
