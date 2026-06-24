import type { Metadata } from "next";
import { Geist_Mono, Manrope, Space_Grotesk } from "next/font/google";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import "./globals.css";

const bodyFont = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const displayFont = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Problem Library | Engineering Learning Platform",
  description:
    "Bitta muammoni chuqur o‘rganish uchun markazlashgan design system va komponentli arxitekturaga ega engineering learning platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz">
      <body
        className={`${bodyFont.variable} ${displayFont.variable} ${geistMono.variable} antialiased`}
      >
        <div className="relative flex min-h-screen flex-col">
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
