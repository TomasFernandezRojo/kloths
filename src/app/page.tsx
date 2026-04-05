"use client";

import { useRef, useEffect, useState } from "react";
import HeroSection from "@/components/HeroSection";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { drop2Products } from "@/data/products";

function useReveal() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return { ref, visible };
}

const revealStyle = (visible: boolean, delay = 0) => ({
  opacity: visible ? 1 : 0,
  transform: visible ? "translateY(0)" : "translateY(30px)",
  transition: `opacity 600ms ease-out ${delay}ms, transform 600ms ease-out ${delay}ms`,
});

export default function HomePage() {
  const drop2 = useReveal();
  const banner = useReveal();
  const about = useReveal();

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <HeroSection />

      {/* ── Drop 2 ────────────────────────────────────────────────────────── */}
      <section
        ref={drop2.ref as React.RefObject<HTMLElement>}
        className="bg-[#FAFAF7] py-28 px-6 md:px-10"
        style={revealStyle(drop2.visible)}
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-14">
            <p
              className="text-xs tracking-[0.25em] uppercase text-[#7A7568] mb-3"
              style={{ fontFamily: "var(--font-outfit-face)" }}
            >
              Verano 25/26
            </p>
            <h2
              className="text-4xl md:text-5xl font-semibold italic text-[#111111] leading-tight tracking-[0.02em]"
              style={{ fontFamily: "var(--font-cormorant-face)" }}
            >
              Drop 2
            </h2>
            <p
              className="mt-3 text-base font-light text-[#7A7568]"
              style={{ fontFamily: "var(--font-outfit-face)" }}
            >
              7 piezas diseñadas para vivir el verano.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {drop2Products.map((product, i) => (
              <ProductCard key={product.id} product={product} priority={i < 4} index={i} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/shop"
              className="inline-block text-sm font-light text-[#111111] link-underline-gold"
              style={{ fontFamily: "var(--font-outfit-face)" }}
            >
              Ver todos los productos →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Brand banner ──────────────────────────────────────────────────── */}
      <section
        ref={banner.ref as React.RefObject<HTMLElement>}
        className="bg-[#111111] py-28 px-6 text-center overflow-hidden"
      >
        {/* Gold line top */}
        <div
          className="w-16 h-px bg-[#C8A96E] mx-auto mb-10"
          style={{
            opacity: banner.visible ? 1 : 0,
            transition: "opacity 600ms ease-out",
          }}
        />
        <p
          className="font-bold italic text-[#FAFAF7]/90 leading-snug"
          style={{
            fontFamily: "var(--font-playfair-face)",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            opacity: banner.visible ? 1 : 0,
            clipPath: banner.visible ? "inset(0 0 0 0)" : "inset(0 100% 0 0)",
            transition: "opacity 700ms ease-out 200ms, clip-path 700ms cubic-bezier(0.4, 0, 0.2, 1) 200ms",
          }}
        >
          Born from salt &amp; sun.
        </p>
        <p
          className="mt-4 text-base font-light text-[#FAFAF7]/50"
          style={{
            fontFamily: "var(--font-outfit-face)",
            opacity: banner.visible ? 1 : 0,
            transform: banner.visible ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 600ms ease-out 400ms, transform 600ms ease-out 400ms",
          }}
        >
          Costa argentina. Desde 2025.
        </p>
        {/* Gold line bottom */}
        <div
          className="w-16 h-px bg-[#C8A96E] mx-auto mt-10"
          style={{
            opacity: banner.visible ? 1 : 0,
            transition: "opacity 600ms ease-out 600ms",
          }}
        />
      </section>

      {/* ── Sobre kloths. ─────────────────────────────────────────────────── */}
      <section
        id="nosotros"
        ref={about.ref as React.RefObject<HTMLElement>}
        className="bg-[#F0EDE6] py-28 px-6 md:px-10"
        style={revealStyle(about.visible)}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16 items-center">
          {/* Image — 60% = 3/5 */}
          <div className="md:col-span-3 relative aspect-[4/3] overflow-hidden">
            <Image
              src="/images/products/lifestyle-playa.jpg"
              alt="Sobre kloths. — flat lay en la playa"
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover"
            />
          </div>

          {/* Text — 40% = 2/5 */}
          <div className="md:col-span-2">
            {/* Decorative gold line */}
            <div className="w-8 h-px bg-[#C8A96E] mb-5" />
            <p
              className="text-xs tracking-[0.25em] uppercase text-[#7A7568] mb-4"
              style={{ fontFamily: "var(--font-outfit-face)" }}
            >
              Sobre kloths.
            </p>
            <h2
              className="text-3xl md:text-4xl font-semibold italic text-[#111111] leading-snug tracking-[0.02em] mb-6"
              style={{ fontFamily: "var(--font-cormorant-face)" }}
            >
              Nacimos en la costa.
            </h2>
            <p
              className="text-base font-light text-[#7A7568] leading-relaxed mb-8"
              style={{ fontFamily: "var(--font-outfit-face)" }}
            >
              kloths. nace de la cultura surf y el streetwear argentino.
              Diseñamos ropa oversize con telas de alto gramaje, pensada para
              durar. Cada drop es una colección chica, con prendas que tienen
              identidad propia. Sin apuros, sin excesos. Solo diseño limpio y
              calidad real.
            </p>
            <Link
              href="/shop"
              className="inline-block text-sm font-light text-[#111111] link-underline-gold"
              style={{ fontFamily: "var(--font-outfit-face)" }}
            >
              Explorar el shop →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
