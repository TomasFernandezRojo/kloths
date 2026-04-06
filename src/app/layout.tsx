import type { Metadata } from "next";
import {
  Playfair_Display,
  Cormorant_Garamond,
  Outfit,
} from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import WhatsAppButton from "@/components/WhatsAppButton";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-face",
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant-face",
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit-face",
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kloths.com.ar"),
  title: {
    default: "kloths. — surfwear argentino",
    template: "%s | kloths.",
  },
  description:
    "Drop 2 — Verano 25/26. Surfwear argentino diseñado para vivir el verano. 7 piezas nuevas.",
  keywords: [
    "surfwear",
    "ropa de surf",
    "argentina",
    "kloths",
    "verano",
    "drop 2",
    "moda surf",
  ],
  openGraph: {
    title: "kloths. — surfwear argentino",
    description:
      "Drop 2 — Verano 25/26. Surfwear argentino diseñado para vivir el verano.",
    type: "website",
    locale: "es_AR",
    url: "https://kloths.com.ar",
    siteName: "kloths.",
    images: [
      {
        url: "/images/products/lifestyle-playa.jpg",
        width: 1200,
        height: 630,
        alt: "kloths. — surfwear argentino",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "kloths. — surfwear argentino",
    description: "Drop 2 — Verano 25/26. Surfwear argentino diseñado para vivir el verano.",
    images: ["/images/products/lifestyle-playa.jpg"],
  },
  alternates: {
    canonical: "https://kloths.com.ar",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  other: {
    "theme-color": "#111111",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${cormorant.variable} ${outfit.variable}`}
    >
      <body className="flex flex-col min-h-screen">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:bg-[#111111] focus:text-[#FAFAF7] focus:px-4 focus:py-2 focus:text-sm"
          style={{ fontFamily: "var(--font-outfit-face)" }}
        >
          Saltar al contenido principal
        </a>
        <CartProvider>
          <AnnouncementBar />
          <Navbar />
          <main id="main-content" className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <WhatsAppButton />
        </CartProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "kloths.",
              url: "https://kloths.com.ar",
              logo: "https://kloths.com.ar/images/logo-kloths.png",
              sameAs: ["https://www.instagram.com/kloths__"],
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+54-9-11-3072-0743",
                contactType: "customer service",
                availableLanguage: "Spanish",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
