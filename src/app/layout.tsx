import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import "../styles/globals.css";
import { site } from "@/content/content";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Preloader from "@/components/layout/Preloader";
import MobileCTABar from "@/components/layout/MobileCTABar";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";
import FloatingWhatsApp from "@/components/layout/FloatingWhatsApp";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  metadataBase: new URL("https://aibischamp.com"),
  openGraph: {
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    url: "https://aibischamp.com",
    siteName: site.name,
    images: [{ url: site.ogImage, width: 1200, height: 630, alt: site.name }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: [site.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="grain">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Preloader />
        <SmoothScrollProvider>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </SmoothScrollProvider>
        <FloatingWhatsApp />
        <MobileCTABar />
      </body>
    </html>
  );
}
