import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  applicationName: "Derivative Calculator Frontend",
  title: "Derivative Calculator Frontend",
  description:
    "Calculate symbolic derivatives, preview mathematical expressions, and visualize function graphs.",
  manifest: "/manifest.json",
  openGraph: {
    title: "Derivative Calculator Frontend",
    description:
      "Calculate symbolic derivatives, preview mathematical expressions, and visualize function graphs.",
    siteName: "Derivative Calculator Frontend",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Derivative Calculator Frontend",
    description:
      "Calculate symbolic derivatives, preview mathematical expressions, and visualize function graphs.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
