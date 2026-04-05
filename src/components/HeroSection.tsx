"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Video background */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translateY(${scrollY * 0.35}px) scale(1.15)`,
          willChange: "transform",
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/products/lifestyle-playa.jpg"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        >
          <source src="/images/hero-video.mp4" type="video/mp4" />
        </video>
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content — posicionado al 60% de la altura */}
      <div className="absolute z-10 flex flex-col items-center text-center px-6" style={{ top: "60%", left: 0, right: 0, transform: "translateY(-50%)" }}>
        {/* Logo — imagen invertida a blanco */}
        <div
          className={`transition-all duration-[800ms] ease-out ${
            mounted ? "opacity-100 scale-100" : "opacity-0 scale-90"
          }`}
        >
          <Image
            src="/images/logo-kloths.png"
            alt="kloths."
            width={340}
            height={120}
            priority
            style={{
              height: "auto",
              filter: "brightness(0) invert(1)",
            }}
          />
        </div>

        {/* Button */}
        <div
          className="mt-8"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 600ms ease-out 600ms, transform 600ms ease-out 600ms",
          }}
        >
          <Link
            href="/shop"
            className="inline-block bg-white text-[#111111] text-sm font-light px-8 py-4 hover:bg-[#111111] hover:text-white transition-all duration-300 tracking-[0.05em] uppercase"
            style={{ fontFamily: "var(--font-outfit-face)" }}
          >
            Explorar Drop 2 →
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span
          className="text-[10px] tracking-[0.2em] uppercase text-white/50"
          style={{ fontFamily: "var(--font-outfit-face)" }}
        >
          Scroll
        </span>
        <div
          className="w-px bg-gradient-to-b from-white/40 to-transparent animate-bounce"
          style={{ height: "36px" }}
        />
      </div>
    </section>
  );
}
