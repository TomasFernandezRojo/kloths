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
        <CartProvider>
          <AnnouncementBar />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
