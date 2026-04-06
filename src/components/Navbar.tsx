"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { label: "Inicio", href: "/" },
  { label: "Nosotros", href: "/#nosotros" },
  { label: "Contacto", href: "/#contacto" },
];

const dropLinks = [
  { label: "Drop 02", href: "/shop", sub: "Verano 25/26 — 7 piezas" },
  { label: "Drop 01", href: "/shop/drop-01", sub: "Temporada anterior" },
];

export default function Navbar() {
  const { totalItems, openDrawer } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);
  const prevTotalItems = useRef(totalItems);
  const [badgeBounce, setBadgeBounce] = useState(false);
  const shopRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  const handleShopEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShopOpen(true);
  };

  const handleShopLeave = () => {
    timeoutRef.current = setTimeout(() => setShopOpen(false), 120);
  };

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
              src="/images/logo-klt.png"
              alt="klt."
              width={90}
              height={36}
              style={{ height: "auto", display: "block" }}
              priority
            />
          </Link>

          {/* Nav links — desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-light text-[#111111] link-underline transition-opacity duration-200"
              style={{ fontFamily: "var(--font-outfit-face)" }}
            >
              Inicio
            </Link>

            {/* Shop dropdown */}
            <div
              ref={shopRef}
              className="relative"
              onMouseEnter={handleShopEnter}
              onMouseLeave={handleShopLeave}
            >
              <button
                className="flex items-center gap-1 text-sm font-light text-[#111111] link-underline transition-opacity duration-200"
                style={{ fontFamily: "var(--font-outfit-face)" }}
              >
                Shop
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  style={{
                    transition: "transform 200ms ease",
                    transform: shopOpen ? "rotate(180deg)" : "rotate(0deg)",
                    marginTop: "1px",
                  }}
                >
                  <polyline points="1 3 5 7 9 3" />
                </svg>
              </button>

              {/* Dropdown */}
              <div
                style={{
                  opacity: shopOpen ? 1 : 0,
                  pointerEvents: shopOpen ? "auto" : "none",
                  transform: shopOpen ? "translateY(0)" : "translateY(-6px)",
                  transition: "opacity 180ms ease, transform 180ms ease",
                  position: "absolute",
                  top: "calc(100% + 12px)",
                  left: "50%",
                  translate: "-50%",
                  minWidth: "180px",
                  background: "#FAFAF7",
                  border: "1px solid #E0DCD5",
                  padding: "6px 0",
                  zIndex: 60,
                }}
              >
                {/* Arrow */}
                <div
                  style={{
                    position: "absolute",
                    top: "-5px",
                    left: "50%",
                    transform: "translateX(-50%) rotate(45deg)",
                    width: "8px",
                    height: "8px",
                    background: "#FAFAF7",
                    borderLeft: "1px solid #E0DCD5",
                    borderTop: "1px solid #E0DCD5",
                  }}
                />
                {dropLinks.map((d) => (
                  <Link
                    key={d.href}
                    href={d.href}
                    onClick={() => setShopOpen(false)}
                    className="block px-5 py-3 group hover:bg-[#F0EDE6] transition-colors duration-150"
                  >
                    <span
                      className="block text-sm font-light text-[#111111]"
                      style={{ fontFamily: "var(--font-outfit-face)" }}
                    >
                      {d.label}
                    </span>
                    <span
                      className="block text-[10px] text-[#7A7568] mt-0.5 tracking-wide"
                      style={{ fontFamily: "var(--font-outfit-face)" }}
                    >
                      {d.sub}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/#nosotros"
              className="text-sm font-light text-[#111111] link-underline transition-opacity duration-200"
              style={{ fontFamily: "var(--font-outfit-face)" }}
            >
              Nosotros
            </Link>
            <Link
              href="/#contacto"
              className="text-sm font-light text-[#111111] link-underline transition-opacity duration-200"
              style={{ fontFamily: "var(--font-outfit-face)" }}
            >
              Contacto
            </Link>
          </nav>

          {/* Right side: cart + hamburger */}
          <div className="flex items-center gap-4">
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
              src="/images/logo-klt.png"
              alt="klt."
              width={90}
              height={36}
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
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="text-4xl font-light text-[#111111] link-underline tracking-tight"
            style={{ fontFamily: "var(--font-cormorant-face)" }}
          >
            Inicio
          </Link>

          {/* Shop accordion */}
          <div className="flex flex-col items-center gap-3">
            <button
              onClick={() => setMobileShopOpen((v) => !v)}
              className="flex items-center gap-2 text-4xl font-light text-[#111111] tracking-tight"
              style={{ fontFamily: "var(--font-cormorant-face)" }}
            >
              Shop
              <svg
                width="14"
                height="14"
                viewBox="0 0 10 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                style={{
                  transition: "transform 200ms ease",
                  transform: mobileShopOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
              >
                <polyline points="1 3 5 7 9 3" />
              </svg>
            </button>

            <div
              style={{
                maxHeight: mobileShopOpen ? "120px" : "0px",
                overflow: "hidden",
                transition: "max-height 250ms ease",
              }}
            >
              <div className="flex flex-col items-center gap-2 pt-1">
                {dropLinks.map((d) => (
                  <Link
                    key={d.href}
                    href={d.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-xl font-light text-[#7A7568] hover:text-[#111111] transition-colors duration-200"
                    style={{ fontFamily: "var(--font-cormorant-face)" }}
                  >
                    {d.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link
            href="/#nosotros"
            onClick={() => setMenuOpen(false)}
            className="text-4xl font-light text-[#111111] link-underline tracking-tight"
            style={{ fontFamily: "var(--font-cormorant-face)" }}
          >
            Nosotros
          </Link>
          <Link
            href="/#contacto"
            onClick={() => setMenuOpen(false)}
            className="text-4xl font-light text-[#111111] link-underline tracking-tight"
            style={{ fontFamily: "var(--font-cormorant-face)" }}
          >
            Contacto
          </Link>
        </nav>

        {/* Bottom social */}
        <div className="px-6 pb-8 flex gap-6">
          <a
            href="https://www.instagram.com/kloths__/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs tracking-[0.2em] uppercase text-[#7A7568] link-underline"
            style={{ fontFamily: "var(--font-outfit-face)" }}
          >
            @kloths__
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
