"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";

export default function CartDrawer() {
  const { items, totalPrice, totalItems, drawerOpen, closeDrawer, removeItem } = useCart();
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeDrawer();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeDrawer]);

  return (
    <>
      {/* Backdrop */}
      <div
        ref={overlayRef}
        onClick={closeDrawer}
        className="fixed inset-0 z-[200] bg-black/40 transition-opacity duration-300"
        style={{ opacity: drawerOpen ? 1 : 0, pointerEvents: drawerOpen ? "auto" : "none" }}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        role="dialog"
        aria-label="Carrito"
        className="fixed top-0 right-0 h-full w-full sm:w-[400px] z-[201] bg-[#F5F3EE] flex flex-col shadow-2xl transition-transform duration-300 ease-out"
        style={{ transform: drawerOpen ? "translateX(0)" : "translateX(100%)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E0DCD5]">
          <div className="flex items-center gap-3">
            <h2
              className="text-base font-light text-[#1A1A1A] tracking-wide"
              style={{ fontFamily: "var(--font-outfit-face)" }}
            >
              Carrito
            </h2>
            {totalItems > 0 && (
              <span
                className="text-xs text-[#6B6560]"
                style={{ fontFamily: "var(--font-outfit-face)" }}
              >
                ({totalItems} {totalItems === 1 ? "producto" : "productos"})
              </span>
            )}
          </div>
          <button
            onClick={closeDrawer}
            aria-label="Cerrar carrito"
            className="text-[#1A1A1A] hover:opacity-60 transition-opacity duration-200"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <p
                className="text-sm font-light text-[#6B6560]"
                style={{ fontFamily: "var(--font-outfit-face)" }}
              >
                Tu carrito está vacío.
              </p>
              <button
                onClick={closeDrawer}
                className="text-sm font-light text-[#1A1A1A] link-underline"
                style={{ fontFamily: "var(--font-outfit-face)" }}
              >
                Explorar el shop →
              </button>
            </div>
          ) : (
            <ul className="space-y-6">
              {items.map((item) => (
                <li key={`${item.product.id}-${item.size}`} className="flex gap-4">
                  {/* Thumbnail */}
                  <div className="relative w-20 h-20 shrink-0 bg-[#E0DCD5] overflow-hidden">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-sm font-light text-[#1A1A1A] truncate"
                      style={{ fontFamily: "var(--font-outfit-face)" }}
                    >
                      {item.product.name}
                    </p>
                    <p
                      className="text-xs text-[#6B6560] mt-0.5"
                      style={{ fontFamily: "var(--font-outfit-face)" }}
                    >
                      Talle {item.size} · Cant. {item.quantity}
                    </p>
                    <p
                      className="text-sm text-[#1A1A1A] mt-1"
                      style={{ fontFamily: "var(--font-outfit-face)" }}
                    >
                      {formatPrice(item.product.price * item.quantity)}
                    </p>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item.product.id, item.size)}
                    aria-label="Eliminar producto"
                    className="text-[#6B6560] hover:text-[#1A1A1A] transition-colors duration-200 self-start"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[#E0DCD5] px-6 py-6 space-y-4">
            <div className="flex items-center justify-between">
              <span
                className="text-sm font-light text-[#6B6560]"
                style={{ fontFamily: "var(--font-outfit-face)" }}
              >
                Total
              </span>
              <span
                className="text-base font-light text-[#1A1A1A]"
                style={{ fontFamily: "var(--font-outfit-face)" }}
              >
                {formatPrice(totalPrice)}
              </span>
            </div>

            <Link
              href="/carrito"
              onClick={closeDrawer}
              className="block w-full bg-[#1A1A1A] text-[#F5F3EE] text-sm font-light text-center py-3.5 hover:bg-[#333] transition-colors duration-200 tracking-widest"
              style={{ fontFamily: "var(--font-outfit-face)", borderRadius: "2px" }}
            >
              Ver carrito →
            </Link>

            <button
              onClick={closeDrawer}
              className="block w-full text-sm font-light text-[#6B6560] text-center link-underline"
              style={{ fontFamily: "var(--font-outfit-face)" }}
            >
              Seguir comprando
            </button>
          </div>
        )}
      </div>
    </>
  );
}
