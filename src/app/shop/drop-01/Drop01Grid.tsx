"use client";

import { useState } from "react";

type Product = {
  slug: string;
  name: string;
  price: number;
  sizes: string[];
  imageFront: string;
  imageBack: string;
  category: string;
};

function formatPrice(n: number) {
  return "$" + n.toLocaleString("es-AR");
}

export default function Drop01Grid({ products }: { products: Product[] }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
      gap: "24px",
    }}>
      {products.map((product) => (
        <FlipCard key={product.slug} product={product} />
      ))}
    </div>
  );
}

function FlipCard({ product }: { product: Product }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onTouchStart={() => setFlipped((v) => !v)}
      style={{ perspective: "1000px", cursor: "pointer" }}
    >
      {/* Card wrapper */}
      <div style={{
        position: "relative",
        transformStyle: "preserve-3d",
        transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        transition: "transform 550ms cubic-bezier(0.4, 0, 0.2, 1)",
      }}>

        {/* ── Front ── */}
        <div style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}>
          <div style={{
            aspectRatio: "3/4",
            background: "#111111",
            overflow: "hidden",
            position: "relative",
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.imageFront}
              alt={product.name}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
            {/* Subtle hover hint */}
            <div style={{
              position: "absolute",
              bottom: "12px",
              right: "12px",
              background: "rgba(0,0,0,0.6)",
              color: "#888",
              fontSize: "9px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              padding: "4px 8px",
              fontFamily: "var(--font-outfit-face)",
              opacity: flipped ? 0 : 1,
              transition: "opacity 200ms ease",
            }}>
              Ver dorso
            </div>
          </div>

          {/* Info */}
          <div style={{ padding: "16px 4px 8px" }}>
            <p style={{
              fontFamily: "var(--font-outfit-face)",
              fontSize: "10px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#333333",
              marginBottom: "6px",
            }}>
              {product.category}
            </p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <p style={{
                fontFamily: "var(--font-outfit-face)",
                fontSize: "14px",
                fontWeight: 300,
                color: "#D0D0D0",
              }}>
                {product.name}
              </p>
              <p style={{
                fontFamily: "var(--font-outfit-face)",
                fontSize: "13px",
                fontWeight: 300,
                color: "#555555",
              }}>
                {formatPrice(product.price)}
              </p>
            </div>
            {/* Sizes */}
            <div style={{ display: "flex", gap: "8px", marginTop: "10px", flexWrap: "wrap" }}>
              {product.sizes.map((s) => (
                <span key={s} style={{
                  fontFamily: "var(--font-outfit-face)",
                  fontSize: "10px",
                  color: "#3A3A3A",
                  border: "1px solid #222222",
                  padding: "3px 7px",
                  letterSpacing: "0.05em",
                }}>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Back ── */}
        <div style={{
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
          position: "absolute",
          inset: 0,
        }}>
          <div style={{
            aspectRatio: "3/4",
            background: "#111111",
            overflow: "hidden",
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.imageBack}
              alt={`${product.name} — dorso`}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
          {/* Info back side */}
          <div style={{ padding: "16px 4px 8px" }}>
            <p style={{
              fontFamily: "var(--font-outfit-face)",
              fontSize: "10px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#333333",
              marginBottom: "6px",
            }}>
              Dorso
            </p>
            <p style={{
              fontFamily: "var(--font-outfit-face)",
              fontSize: "14px",
              fontWeight: 300,
              color: "#D0D0D0",
            }}>
              {product.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
