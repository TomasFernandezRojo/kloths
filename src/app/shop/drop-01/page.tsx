import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Drop 01 — kloths.",
  description: "Drop 01 de kloths. La primera colección.",
};

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
              Streetwear
            </p>
          </div>
        </div>
      </div>

      {/* ── Coming soon ─────────────────────────────────────────── */}
      <div style={{
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "0 clamp(24px, 5vw, 40px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "40vh",
        textAlign: "center",
        gap: "16px",
      }}>
        <p style={{
          fontFamily: "var(--font-playfair-face)",
          fontSize: "clamp(3rem, 6vw, 5rem)",
          fontWeight: 700,
          fontStyle: "italic",
          color: "#1E1E1E",
          letterSpacing: "-0.02em",
        }}>
          Próximamente.
        </p>
        <p style={{
          fontFamily: "var(--font-outfit-face)",
          fontSize: "12px",
          fontWeight: 300,
          color: "#333333",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}>
          Estamos cargando los productos del Drop 01.
        </p>
      </div>

      {/* Footer link */}
      <div style={{
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "0 clamp(24px, 5vw, 40px) 80px",
        borderTop: "1px solid #1E1E1E",
        paddingTop: "32px",
        display: "flex",
        justifyContent: "flex-end",
      }}>
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
  );
}
