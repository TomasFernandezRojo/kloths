import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Error en el pago" };

export default function FailurePage() {
  return (
    <div className="bg-[#FAFAF7] min-h-screen flex flex-col items-center justify-center px-6 text-center">
      {/* X icon */}
      <div className="w-16 h-16 rounded-full border border-[#DDD8CE] flex items-center justify-center mb-8">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7A7568" strokeWidth="1.5" strokeLinecap="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </div>

      <div className="w-12 h-px bg-[#C8A96E] mb-6" />

      <h1
        className="text-4xl md:text-5xl font-semibold italic text-[#111111] mb-4"
        style={{ fontFamily: "var(--font-cormorant-face)" }}
      >
        Hubo un problema
      </h1>

      <p
        className="text-base font-light text-[#7A7568] max-w-md mb-10 leading-relaxed"
        style={{ fontFamily: "var(--font-outfit-face)" }}
      >
        No pudimos procesar tu pago. Podés volver a intentarlo o contactarnos directamente por WhatsApp.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/carrito"
          className="inline-block bg-[#111111] text-[#FAFAF7] text-sm font-light px-8 py-4 hover:bg-[#333333] transition-colors duration-300 tracking-[0.05em] uppercase"
          style={{ fontFamily: "var(--font-outfit-face)" }}
        >
          Reintentar
        </Link>
        <a
          href="https://wa.link/a179a4"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block border border-[#DDD8CE] text-[#111111] text-sm font-light px-8 py-4 hover:border-[#C8A96E] transition-colors duration-300 tracking-[0.05em] uppercase"
          style={{ fontFamily: "var(--font-outfit-face)" }}
        >
          Contactar por WhatsApp
        </a>
      </div>
    </div>
  );
}
