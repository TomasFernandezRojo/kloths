"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const shopLinks = [
  { label: "Drop 2", href: "/shop" },
  { label: "Remeras", href: "/shop?category=Remeras" },
  { label: "Bermudas", href: "/shop?category=Bermudas" },
  { label: "Accesorios", href: "/shop?category=Accesorios" },
];

const infoLinks = [
  { label: "Sobre kloths.", href: "/#nosotros" },
  { label: "Envíos", href: "/#envios" },
  { label: "Cambios y devoluciones", href: "/#cambios" },
  { label: "Preguntas frecuentes", href: "/#faq" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#111111] text-[#FAFAF7]">
      {/* Logo grande */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-20 pb-10 border-b border-[#FAFAF7]/10">
        <Image
          src="/images/logo-kloths-negro.png"
          alt="kloths."
          width={110}
          height={40}
          style={{ height: "auto", display: "block", opacity: 0.9, filter: "brightness(0) invert(1)" }}
        />
        <p
          className="mt-3 text-sm font-light text-[#FAFAF7]/50 tracking-wider"
          style={{ fontFamily: "var(--font-outfit-face)" }}
        >
          surfwear argentino — drop 2 verano 25/26
        </p>
      </div>

      {/* Columnas */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-14 grid grid-cols-2 md:grid-cols-4 gap-10">
        {/* Newsletter */}
        <div className="col-span-2 md:col-span-1">
          <h4
            className="text-xs tracking-[0.2em] uppercase text-[#FAFAF7]/40 mb-5"
            style={{ fontFamily: "var(--font-outfit-face)" }}
          >
            Newsletter
          </h4>
          <p
            className="text-sm font-light text-[#FAFAF7]/60 mb-4 leading-relaxed"
            style={{ fontFamily: "var(--font-outfit-face)" }}
          >
            Suscribite para enterarte de los próximos drops.
          </p>
          {subscribed ? (
            <p
              className="text-sm font-light text-[#C8A96E]"
              style={{ fontFamily: "var(--font-outfit-face)" }}
            >
              ¡Listo, te avisamos!
            </p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex items-end gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                required
                className="flex-1 bg-transparent border-b text-[#FAFAF7] text-sm font-light py-1.5 outline-none placeholder:text-[#FAFAF7]/30 transition-colors duration-200 focus:border-[#C8A96E]"
                style={{
                  fontFamily: "var(--font-outfit-face)",
                  borderColor: "#C8A96E",
                }}
              />
              <button
                type="submit"
                className="text-[#C8A96E] hover:text-[#FAFAF7] transition-colors duration-200 pb-1.5 text-base"
                aria-label="Suscribirse"
              >
                →
              </button>
            </form>
          )}
        </div>

        {/* Shop */}
        <div>
          <h4
            className="text-xs tracking-[0.2em] uppercase text-[#FAFAF7]/40 mb-5"
            style={{ fontFamily: "var(--font-outfit-face)" }}
          >
            Shop
          </h4>
          <ul className="space-y-3">
            {shopLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-light text-[#FAFAF7]/70 link-underline hover:text-[#FAFAF7] transition-colors duration-200"
                  style={{ fontFamily: "var(--font-outfit-face)" }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Info */}
        <div>
          <h4
            className="text-xs tracking-[0.2em] uppercase text-[#FAFAF7]/40 mb-5"
            style={{ fontFamily: "var(--font-outfit-face)" }}
          >
            Info
          </h4>
          <ul className="space-y-3">
            {infoLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-light text-[#FAFAF7]/70 link-underline hover:text-[#FAFAF7] transition-colors duration-200"
                  style={{ fontFamily: "var(--font-outfit-face)" }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contacto */}
        <div id="contacto">
          <h4
            className="text-xs tracking-[0.2em] uppercase text-[#FAFAF7]/40 mb-5"
            style={{ fontFamily: "var(--font-outfit-face)" }}
          >
            Contacto
          </h4>
          <ul className="space-y-4">
            <li>
              <a
                href="https://www.instagram.com/kloths_"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm font-light text-[#FAFAF7]/70 hover:text-[#FAFAF7] transition-colors duration-200"
                style={{ fontFamily: "var(--font-outfit-face)" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
                </svg>
                <span className="link-underline">@kloths_</span>
              </a>
            </li>
            <li>
              <a
                href="https://wa.link/a179a4"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm font-light text-[#FAFAF7]/70 hover:text-[#FAFAF7] transition-colors duration-200"
                style={{ fontFamily: "var(--font-outfit-face)" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                </svg>
                <span className="link-underline">+54 9 11 3072-0743</span>
              </a>
            </li>
            <li>
              <a
                href="mailto:klothsarg@gmail.com"
                className="flex items-center gap-2.5 text-sm font-light text-[#FAFAF7]/70 hover:text-[#FAFAF7] transition-colors duration-200"
                style={{ fontFamily: "var(--font-outfit-face)" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <polyline points="2,4 12,13 22,4" />
                </svg>
                <span className="link-underline">klothsarg@gmail.com</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-6 border-t border-[#FAFAF7]/10">
        <p
          className="text-xs font-light text-[#FAFAF7]/30 tracking-wide"
          style={{ fontFamily: "var(--font-outfit-face)" }}
        >
          © 2026 kloths. todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
