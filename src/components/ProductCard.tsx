"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { Product, formatPrice } from "@/data/products";

type Props = {
  product: Product;
  priority?: boolean;
  index?: number;
};

export default function ProductCard({ product, priority = false, index = 0 }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
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
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Link
      ref={ref}
      href={`/shop/${product.slug}`}
      className="group block"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 500ms ease-out ${index * 90}ms, transform 500ms ease-out ${index * 90}ms`,
      }}
    >
      {/* Image container */}
      <div
        className="relative aspect-square overflow-hidden bg-[#DDD8CE]"
        style={{
          transition: "box-shadow 400ms ease",
          boxShadow: "0 0 0 rgba(0,0,0,0)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 30px rgba(0,0,0,0.06)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 0 rgba(0,0,0,0)";
        }}
      >
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          priority={priority}
        />
        {/* Hover overlay button */}
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span
            className="text-[11px] tracking-[0.15em] uppercase bg-white/90 text-[#111111] px-4 py-2"
            style={{ fontFamily: "var(--font-outfit-face)", borderRadius: "1px" }}
          >
            Ver producto →
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="pt-4 space-y-1">
        {/* Category + badge */}
        <div className="flex items-center gap-3">
          <p
            className="text-[11px] tracking-[0.1em] uppercase text-[#C8A96E]"
            style={{ fontFamily: "var(--font-outfit-face)" }}
          >
            {product.category}
          </p>
        </div>
        <h3
          className="text-base font-light text-[#111111] group-hover:opacity-70 transition-opacity duration-200"
          style={{ fontFamily: "var(--font-outfit-face)" }}
        >
          {product.name}
        </h3>
        <p
          className="text-sm font-semibold text-[#111111]"
          style={{ fontFamily: "var(--font-outfit-face)" }}
        >
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
