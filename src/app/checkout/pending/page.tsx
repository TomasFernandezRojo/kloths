import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Pago pendiente" };

export default function PendingPage() {
  return (
    <div className="bg-[#FAFAF7] min-h-screen flex flex-col items-center justify-center px-6 text-center">
      {/* Clock icon */}
      <div className="w-16 h-16 rounded-full border border-[#DDD8CE] flex items-center justify-center mb-8">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C8A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      </div>

      <div className="w-12 h-px bg-[#C8A96E] mb-6" />

      <h1
        className="text-4xl md:text-5xl font-semibold italic text-[#111111] mb-4"
        style={{ fontFamily: "var(--font-cormorant-face)" }}
      >
        Tu pago está pendiente
      </h1>

      <p
        className="text-base font-light text-[#7A7568] max-w-md mb-3 leading-relaxed"
        style={{ fontFamily: "var(--font-outfit-face)" }}
      >
        MercadoPago está procesando tu pago. Esto puede tardar unos minutos.
      </p>
      <p
        className="text-base font-light text-[#7A7568] max-w-md mb-10 leading-relaxed"
        style={{ fontFamily: "var(--font-outfit-face)" }}
      >
        Te avisamos por WhatsApp cuando se confirme.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="inline-block bg-[#111111] text-[#FAFAF7] text-sm font-light px-8 py-4 hover:bg-[#333333] transition-colors duration-300 tracking-[0.05em] uppercase"
          style={{ fontFamily: "var(--font-outfit-face)" }}
        >
          Volver al inicio
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
