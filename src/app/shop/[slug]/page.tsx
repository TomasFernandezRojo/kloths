"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, products, formatPrice } from "@/data/products";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";

const sizeGuideRemeras = [
  { talle: "S", ancho: 54, largo: 72 },
  { talle: "M", ancho: 57, largo: 74 },
  { talle: "L", ancho: 60, largo: 76 },
  { talle: "XL", ancho: 63, largo: 78 },
];

const sizeGuideBermudas = [
  { talle: "38", cintura: 38, largo: 52 },
  { talle: "40", cintura: 40, largo: 53 },
  { talle: "42", cintura: 42, largo: 54 },
  { talle: "44", cintura: 44, largo: 55 },
];

export default function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<string | null>(
    product.sizes.length === 1 ? product.sizes[0] : null
  );
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeImage, setActiveImage] = useState(product.images[0]);
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  const related = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const handleAdd = () => {
    if (!selectedSize) return;
    addItem(product, quantity, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: `https://kloths.com.ar${product.images[0]}`,
    brand: { "@type": "Brand", name: "kloths." },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "ARS",
      availability: "https://schema.org/InStock",
      url: `https://kloths.com.ar/shop/${product.slug}`,
    },
  };

  return (
    <div className="bg-[#FAFAF7] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-8">
        <nav
          className="flex items-center gap-2 text-xs font-light text-[#7A7568]"
          style={{ fontFamily: "var(--font-outfit-face)" }}
        >
          <Link href="/" className="hover:text-[#111111] transition-colors duration-200">
            Inicio
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[#111111] transition-colors duration-200">
            Shop
          </Link>
          <span>/</span>
          <span className="text-[#111111]">{product.name}</span>
        </nav>
      </div>

      {/* Main layout */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
        {/* Images */}
        <div className="space-y-3">
          <div className="relative aspect-square overflow-hidden bg-[#DDD8CE]">
            <Image
              src={activeImage}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 55vw"
              className="object-cover transition-opacity duration-300"
              priority
            />
          </div>
          {/* Thumbnail row */}
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(img)}
                  className={`relative w-20 h-20 overflow-hidden border-2 transition-colors duration-200 ${
                    activeImage === img ? "border-[#111111]" : "border-transparent"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} ${i + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col">
          {/* Collection badge */}
          <span
            className="text-xs tracking-[0.25em] uppercase text-[#C8A96E] mb-3"
            style={{ fontFamily: "var(--font-outfit-face)" }}
          >
            {product.drop} — Verano 25/26
          </span>

          <h1
            className="text-4xl md:text-5xl font-semibold text-[#111111] leading-tight tracking-[0.02em] mb-1"
            style={{ fontFamily: "var(--font-cormorant-face)" }}
          >
            {product.name}
          </h1>

          <p
            className="text-sm font-light text-[#7A7568] mb-5"
            style={{ fontFamily: "var(--font-outfit-face)" }}
          >
            {product.subtitle}
          </p>

          <p
            className="text-2xl font-semibold text-[#111111] mb-6"
            style={{ fontFamily: "var(--font-outfit-face)" }}
          >
            {formatPrice(product.price)}
          </p>

          <div className="w-full h-px bg-[#DDD8CE] mb-6" />

          <p
            className="text-sm font-light text-[#7A7568] leading-relaxed mb-8"
            style={{ fontFamily: "var(--font-outfit-face)" }}
          >
            {product.description}
          </p>

          {/* Size selector */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <span
                className="text-xs tracking-[0.15em] uppercase text-[#111111]"
                style={{ fontFamily: "var(--font-outfit-face)" }}
              >
                Talle
              </span>
              {!selectedSize && product.sizes.length > 1 && (
                <span
                  className="text-xs text-[#C8A96E]"
                  style={{ fontFamily: "var(--font-outfit-face)" }}
                >
                  Seleccioná un talle
                </span>
              )}
            </div>
            <div className="flex gap-2 flex-wrap">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-10 text-sm border transition-all duration-200 ${
                    selectedSize === size
                      ? "bg-[#111111] border-[#111111] text-[#FAFAF7]"
                      : "bg-transparent border-[#DDD8CE] text-[#111111] hover:border-[#C8A96E]"
                  }`}
                  style={{ fontFamily: "var(--font-outfit-face)" }}
                >
                  {size}
                </button>
              ))}
            </div>

            {/* Size guide */}
            {product.category !== "Accesorios" && (
              <div className="mt-3">
                <button
                  onClick={() => setShowSizeGuide((v) => !v)}
                  className="text-xs font-light text-[#C8A96E] hover:text-[#111111] transition-colors duration-200"
                  style={{ fontFamily: "var(--font-outfit-face)" }}
                >
                  {showSizeGuide ? "Ocultar guía de talles ✕" : "Guía de talles →"}
                </button>

                {showSizeGuide && (
                  <div className="mt-3 border border-[#E0DCD5] p-4">
                    <p
                      className="text-xs tracking-[0.1em] uppercase text-[#111111] mb-3"
                      style={{ fontFamily: "var(--font-outfit-face)" }}
                    >
                      {product.category === "Remeras" ? "Remeras (Oversize)" : "Bermudas"}
                    </p>
                    <table className="w-full text-xs font-light text-[#111111]" style={{ fontFamily: "var(--font-outfit-face)" }}>
                      <thead>
                        <tr className="border-b border-[#E0DCD5]">
                          <th className="text-left py-2 font-light text-[#7A7568]">Talle</th>
                          {product.category === "Remeras" ? (
                            <>
                              <th className="text-left py-2 font-light text-[#7A7568]">Ancho (cm)</th>
                              <th className="text-left py-2 font-light text-[#7A7568]">Largo (cm)</th>
                            </>
                          ) : (
                            <>
                              <th className="text-left py-2 font-light text-[#7A7568]">Cintura (cm)</th>
                              <th className="text-left py-2 font-light text-[#7A7568]">Largo (cm)</th>
                            </>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {product.category === "Remeras"
                          ? sizeGuideRemeras.map((r) => (
                              <tr key={r.talle} className="border-b border-[#E0DCD5]/50">
                                <td className="py-2">{r.talle}</td>
                                <td className="py-2">{r.ancho}</td>
                                <td className="py-2">{r.largo}</td>
                              </tr>
                            ))
                          : sizeGuideBermudas.map((r) => (
                              <tr key={r.talle} className="border-b border-[#E0DCD5]/50">
                                <td className="py-2">{r.talle}</td>
                                <td className="py-2">{r.cintura}</td>
                                <td className="py-2">{r.largo}</td>
                              </tr>
                            ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <span
              className="text-xs tracking-[0.15em] uppercase text-[#111111] block mb-3"
              style={{ fontFamily: "var(--font-outfit-face)" }}
            >
              Cantidad
            </span>
            <div className="flex items-center gap-0 border border-[#DDD8CE] w-fit">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-10 h-10 flex items-center justify-center text-[#111111] hover:bg-[#DDD8CE] transition-colors duration-200"
              >
                −
              </button>
              <span
                className="w-10 h-10 flex items-center justify-center text-sm text-[#111111] border-x border-[#DDD8CE]"
                style={{ fontFamily: "var(--font-outfit-face)" }}
              >
                {quantity}
              </span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-10 h-10 flex items-center justify-center text-[#111111] hover:bg-[#DDD8CE] transition-colors duration-200"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAdd}
            disabled={!selectedSize}
            className={`w-full py-4 text-sm tracking-[0.05em] uppercase font-light transition-all duration-300 ${
              added
                ? "bg-[#7A7568] text-[#FAFAF7]"
                : selectedSize
                ? "bg-[#111111] text-[#FAFAF7] hover:bg-[#333333]"
                : "bg-[#DDD8CE] text-[#7A7568] cursor-not-allowed"
            }`}
            style={{ fontFamily: "var(--font-outfit-face)" }}
          >
            {added ? "¡Agregado!" : "Agregar al carrito"}
          </button>

          <Link
            href="/carrito"
            className="mt-3 text-center text-xs font-light text-[#7A7568] link-underline-gold"
            style={{ fontFamily: "var(--font-outfit-face)" }}
          >
            Ver carrito →
          </Link>

          {/* Details */}
          <div className="mt-8 border-t border-[#DDD8CE] pt-6 space-y-2">
            <p
              className="text-xs font-light text-[#7A7568]"
              style={{ fontFamily: "var(--font-outfit-face)" }}
            >
              Categoría: {product.category}
            </p>
            <p
              className="text-xs font-light text-[#7A7568]"
              style={{ fontFamily: "var(--font-outfit-face)" }}
            >
              Envío gratis en compras de +$70.000 · Envíos a todo el país
            </p>
            <p
              className="text-xs font-light text-[#7A7568]"
              style={{ fontFamily: "var(--font-outfit-face)" }}
            >
              Pagá con MercadoPago: tarjeta de crédito, débito o transferencia
            </p>
            <p
              className="text-xs font-light text-[#7A7568]"
              style={{ fontFamily: "var(--font-outfit-face)" }}
            >
              Cambios y devoluciones dentro de los 30 días
            </p>
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section className="max-w-7xl mx-auto px-6 md:px-10 py-16 border-t border-[#DDD8CE]">
          <h2
            className="text-2xl font-semibold text-[#111111] tracking-[0.02em] mb-8"
            style={{ fontFamily: "var(--font-cormorant-face)" }}
          >
            Completá tu look
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
