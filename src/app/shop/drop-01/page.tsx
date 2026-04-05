import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Drop 01 — kloths.",
  description: "Drop 01 de kloths. La primera colección de remeras.",
};

const drop01Products: {
  name: string;
  price: number;
  sizes: string[];
  image: string;
}[] = [
  // Se cargan cuando lleguen los productos
];

function formatPrice(n: number) {
  return "$" + n.toLocaleString("es-AR");
}

export default function Drop01Page() {
  return (
    <div style={{ background: "#0C0C0C", minHeight: "100vh" }}>

      {/* ── Hero header ───────────────────────────────────────────── */}
      <div
        style={{
          borderBottom: "1px solid #1E1E1E",
          padding: "80px 0 60px",
        }}
      >
        <div
          style={{
            maxWidth: "1280px",
            margin: "0 auto",
            padding: "0 40px",
          }}
        >
          {/* Label */}
          <p
            style={{
              fontFamily: "var(--font-outfit-face)",
              fontSize: "10px",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#444444",
              marginBottom: "24px",
            }}
          >
            kloths. — Temporada anterior
          </p>

          {/* Big title */}
          <h1
            style={{
              fontFamily: "var(--font-playfair-face)",
              fontSize: "clamp(4rem, 10vw, 9rem)",
              fontWeight: 700,
              fontStyle: "italic",
              color: "#F0F0F0",
              lineHeight: 1,
              letterSpacing: "-0.02em",
              marginBottom: "32px",
            }}
          >
            Drop 01
          </h1>

          {/* Divider + descriptor */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div style={{ width: "40px", height: "1px", background: "#333333" }} />
            <p
              style={{
                fontFamily: "var(--font-outfit-face)",
                fontSize: "13px",
                fontWeight: 300,
                color: "#4A4A4A",
                letterSpacing: "0.05em",
              }}
            >
              Remeras — Streetwear
            </p>
          </div>
        </div>
      </div>

      {/* ── Products ─────────────────────────────────────────────── */}
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "60px 40px 100px",
        }}
      >
        {drop01Products.length === 0 ? (
          /* Empty state */
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "120px 0",
              gap: "16px",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-playfair-face)",
                fontSize: "clamp(3rem, 6vw, 5rem)",
                fontWeight: 700,
                fontStyle: "italic",
                color: "#1E1E1E",
                letterSpacing: "-0.02em",
              }}
            >
              Próximamente.
            </p>
            <p
              style={{
                fontFamily: "var(--font-outfit-face)",
                fontSize: "13px",
                fontWeight: 300,
                color: "#3A3A3A",
                letterSpacing: "0.05em",
              }}
            >
              Estamos cargando los productos del Drop 01.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "2px",
            }}
          >
            {drop01Products.map((product) => (
              <div
                key={product.name}
                style={{
                  background: "#111111",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                }}
                className="drop01-card"
              >
                {/* Image */}
                <div
                  style={{
                    aspectRatio: "3/4",
                    background: "#1A1A1A",
                    overflow: "hidden",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 600ms ease",
                    }}
                    className="drop01-img"
                  />
                </div>

                {/* Info */}
                <div style={{ padding: "16px 20px 20px" }}>
                  <p
                    style={{
                      fontFamily: "var(--font-outfit-face)",
                      fontSize: "13px",
                      fontWeight: 300,
                      color: "#C8C8C8",
                      letterSpacing: "0.02em",
                      marginBottom: "4px",
                    }}
                  >
                    {product.name}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-outfit-face)",
                      fontSize: "12px",
                      fontWeight: 300,
                      color: "#444444",
                    }}
                  >
                    {formatPrice(product.price)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer link */}
        <div
          style={{
            marginTop: "80px",
            paddingTop: "32px",
            borderTop: "1px solid #1E1E1E",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-outfit-face)",
              fontSize: "11px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#2E2E2E",
            }}
          >
            kloths. © 2026
          </p>
          <Link
            href="/shop"
            style={{
              fontFamily: "var(--font-outfit-face)",
              fontSize: "12px",
              fontWeight: 300,
              color: "#4A4A4A",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              textDecoration: "none",
              borderBottom: "1px solid #2A2A2A",
              paddingBottom: "2px",
              transition: "color 200ms ease, border-color 200ms ease",
            }}
          >
            Drop 02 — colección actual →
          </Link>
        </div>
      </div>

      <style>{`
        .drop01-card:hover .drop01-img {
          transform: scale(1.04);
        }
      `}</style>
    </div>
  );
}
