"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { label: "Inicio", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Nosotros", href: "/#nosotros" },
  { label: "Contacto", href: "/#contacto" },
];

export default function Navbar() {
  const { totalItems, openDrawer } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const prevTotalItems = useRef(totalItems);
  const [badgeBounce, setBadgeBounce] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (totalItems > prevTotalItems.current) {
      setBadgeBounce(false);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setBadgeBounce(true));
      });
    }
    prevTotalItems.current = totalItems;
  }, [totalItems]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header
        className="sticky top-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: "rgba(250,250,247,0.92)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: scrolled ? "1px solid #DDD8CE" : "1px solid transparent",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="hover:opacity-70 transition-opacity duration-200">
            <Image
              src="/images/logo-kloths.png"
              alt="kloths."
              width={110}
              height={40}
              style={{ height: "auto", display: "block" }}
              priority
            />
          </Link>

          {/* Nav links — desktop */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-light text-[#111111] link-underline transition-opacity duration-200"
                style={{ fontFamily: "var(--font-outfit-face)" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side: cart + hamburger */}
          <div className="flex items-center gap-4">
            {/* Cart icon */}
            <button
              onClick={openDrawer}
              className="relative flex items-center hover:opacity-70 transition-opacity duration-200"
              aria-label="Ver carrito"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#111111"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {totalItems > 0 && (
                <span
                  className={`absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#111111] text-[#FAFAF7] text-[10px] rounded-full flex items-center justify-center font-medium ${
                    badgeBounce ? "badge-bounce" : ""
                  }`}
                  onAnimationEnd={() => setBadgeBounce(false)}
                >
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </button>

            {/* Hamburger — mobile only */}
            <button
              className="md:hidden flex flex-col justify-center gap-[5px] w-6 h-6"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menú"
            >
              <span className="block w-full h-px bg-[#111111] transition-all duration-300" />
              <span className="block w-full h-px bg-[#111111] transition-all duration-300" />
              <span className="block w-3/4 h-px bg-[#111111] transition-all duration-300" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile fullscreen menu overlay */}
      <div
        className={`fixed inset-0 z-[100] bg-[#FAFAF7] flex flex-col transition-transform duration-300 ease-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close button */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#DDD8CE]">
          <Link href="/" onClick={() => setMenuOpen(false)}>
            <Image
              src="/images/logo-kloths.png"
              alt="kloths."
              width={110}
              height={40}
              style={{ height: "auto", display: "block" }}
            />
          </Link>
          <button
            onClick={() => setMenuOpen(false)}
            aria-label="Cerrar menú"
            className="text-[#111111] hover:opacity-60 transition-opacity duration-200"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Links */}
        <nav className="flex flex-col items-center justify-center flex-1 gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-4xl font-light text-[#111111] link-underline tracking-tight"
              style={{ fontFamily: "var(--font-cormorant-face)" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Bottom social */}
        <div className="px-6 pb-8 flex gap-6">
          <a
            href="https://www.instagram.com/kloths_"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-[0.2em] uppercase text-[#7A7568] link-underline"
            style={{ fontFamily: "var(--font-outfit-face)" }}
          >
            @kloths_
          </a>
          <a
            href="https://wa.link/a179a4"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-[0.2em] uppercase text-[#7A7568] link-underline"
            style={{ fontFamily: "var(--font-outfit-face)" }}
          >
            WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
