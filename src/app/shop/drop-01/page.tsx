import type { Metadata } from "next";
import Link from "next/link";
import Drop01Grid from "./Drop01Grid";

export const metadata: Metadata = {
  title: "Drop 01 — kloths.",
  description: "Drop 01 de kloths. La primera colección.",
};

export const drop01Products = [
  {
    slug: "chomba-rayada-d1",
    name: "Chomba Rayada",
    price: 45000,
    sizes: ["S", "M", "L", "XL"],
    imageFront: "/images/drop01/chomba-frente.jpg",
    imageBack: "/images/drop01/chomba-dorso.jpg",
    category: "Remeras",
  },
  {
    slug: "bermuda-negra-d1",
    name: "Bermuda Negra",
    price: 45000,
    sizes: ["38", "40", "42", "44"],
    imageFront: "/images/drop01/bermuda-negra-frente.jpg",
    imageBack: "/images/drop01/bermuda-negra-dorso.jpg",
    category: "Bermudas",
  },
  {
    slug: "bermuda-jean-celeste-d1",
    name: "Bermuda Jean Celeste",
    price: 45000,
    sizes: ["38", "40", "42", "44"],
    imageFront: "/images/drop01/bermuda-jean-frente.jpg",
    imageBack: "/images/drop01/bermuda-jean-dorso.jpg",
    category: "Bermudas",
  },
];

export default function Drop01Page() {
  return (
    <div style={{ background: "#0C0C0C", minHeight: "100vh" }}>

      {/* ── Hero header ─────────────────────────────────────────── */}
      <div style={{ borderBottom: "1px solid #1E1E1E", padding: "80px 0 60px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 clamp(24px, 5vw, 40px)" }}>
          <p style={{
            fontFamily: "var(--font-outfit-face)",
            fontSize: "10px",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#3A3A3A",
            marginBottom: "24px",
          }}>
            kloths. — Temporada anterior
          </p>

          <h1 style={{
            fontFamily: "var(--font-playfair-face)",
            fontSize: "clamp(4rem, 10vw, 9rem)",
            fontWeight: 700,
            fontStyle: "italic",
            color: "#F0F0F0",
            lineHeight: 1,
            letterSpacing: "-0.02em",
            marginBottom: "28px",
          }}>
            Drop 01
          </h1>

          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ width: "40px", height: "1px", background: "#2A2A2A" }} />
            <p style={{
              fontFamily: "var(--font-outfit-face)",
              fontSize: "12px",
              fontWeight: 300,
              color: "#3A3A3A",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}>
              {drop01Products.length} piezas · Pasá el cursor para ver el dorso
            </p>
          </div>
        </div>
      </div>

      {/* ── Grid (client component for hover) ───────────────────── */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "60px clamp(24px, 5vw, 40px) 100px" }}>
        <Drop01Grid products={drop01Products} />

        {/* Footer link */}
        <div style={{
          marginTop: "80px",
          paddingTop: "32px",
          borderTop: "1px solid #1E1E1E",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
        }}>
          <p style={{
            fontFamily: "var(--font-outfit-face)",
            fontSize: "10px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#252525",
          }}>
            kloths. © 2026
          </p>
          <Link href="/shop" style={{
            fontFamily: "var(--font-outfit-face)",
            fontSize: "12px",
            fontWeight: 300,
            color: "#444444",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            textDecoration: "none",
            borderBottom: "1px solid #2A2A2A",
            paddingBottom: "2px",
          }}>
            Drop 02 — colección actual →
          </Link>
        </div>
      </div>
    </div>
  );
}
