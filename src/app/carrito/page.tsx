"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/data/products";

function calcularEnvioCliente(cp: string, subtotal: number): number | null {
  if (!cp.trim()) return null;
  const sanitized = cp.trim().replace(/\D/g, "");
  if (sanitized.length < 4) return null;

  if (subtotal >= 70000) return 0;

  const cpNum = parseInt(sanitized, 10);
  if (isNaN(cpNum)) return null;

  if ((cpNum >= 1629 && cpNum <= 1638) || cpNum === 1669) return 0;

  if (
    sanitized.startsWith("16") ||
    sanitized.startsWith("17") ||
    sanitized.startsWith("18") ||
    sanitized.startsWith("19") ||
    (cpNum >= 1000 && cpNum <= 1499)
  ) {
    return 5000;
  }

  return 8000;
}

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();
  const [postalCode, setPostalCode] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const shippingCost = useMemo(
    () => calcularEnvioCliente(postalCode, totalPrice),
    [postalCode, totalPrice]
  );

  const total = totalPrice + (shippingCost ?? 0);

  const handleCheckout = async () => {
    if (!postalCode.trim() || postalCode.replace(/\D/g, "").length < 4) {
      setError("Ingresá tu código postal para continuar.");
      return;
    }
    if (!phone.trim()) {
      setError("Ingresá tu número de celular.");
      return;
    }
    if (!address.trim()) {
      setError("Ingresá tu dirección (calle y número).");
      return;
    }
    if (!city.trim()) {
      setError("Ingresá tu ciudad o localidad.");
      return;
    }
    if (!province.trim()) {
      setError("Ingresá tu provincia.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({
            slug: i.product.slug,
            quantity: i.quantity,
            size: i.size,
          })),
          postalCode: postalCode.trim(),
          phone: phone.trim(),
          address: address.trim(),
          city: city.trim(),
          province: province.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.init_point) {
        setError(data.error ?? "Error al procesar el pago. Intentá de nuevo.");
        return;
      }
      window.location.href = data.init_point;
    } catch {
      setError("Error de conexión. Intentá de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="bg-[#FAFAF7] min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <p
          className="text-6xl md:text-7xl font-semibold italic text-[#111111]/10 mb-6"
          style={{ fontFamily: "var(--font-cormorant-face)" }}
        >
          kloths.
        </p>
        <h1
          className="text-3xl font-semibold text-[#111111] mb-3"
          style={{ fontFamily: "var(--font-cormorant-face)" }}
        >
          Tu carrito está vacío
        </h1>
        <p
          className="text-sm font-light text-[#7A7568] mb-8"
          style={{ fontFamily: "var(--font-outfit-face)" }}
        >
          Todavía no agregaste ningún producto.
        </p>
        <Link
          href="/shop"
          className="inline-block bg-[#111111] text-[#FAFAF7] text-sm font-light px-8 py-4 hover:bg-[#333333] transition-colors duration-300 tracking-[0.05em] uppercase"
          style={{ fontFamily: "var(--font-outfit-face)" }}
        >
          Ir al shop →
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FAFAF7] min-h-screen">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-12">
        <h1
          className="text-4xl md:text-5xl font-semibold text-[#111111] tracking-[0.02em] mb-10"
          style={{ fontFamily: "var(--font-cormorant-face)" }}
        >
          Tu carrito
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Items list */}
          <div className="lg:col-span-2">
            <div className="divide-y divide-[#DDD8CE]">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.size}`} className="flex gap-5 py-6">
                  {/* Image */}
                  <div className="relative w-24 h-24 shrink-0 bg-[#DDD8CE] overflow-hidden">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <p
                          className="text-[10px] tracking-[0.15em] uppercase text-[#C8A96E]"
                          style={{ fontFamily: "var(--font-outfit-face)" }}
                        >
                          {item.product.drop}
                        </p>
                        <Link
                          href={`/shop/${item.product.slug}`}
                          className="text-base font-light text-[#111111] hover:opacity-70 transition-opacity duration-200 link-underline"
                          style={{ fontFamily: "var(--font-outfit-face)" }}
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-xs text-[#7A7568] mt-0.5" style={{ fontFamily: "var(--font-outfit-face)" }}>
                          Talle: {item.size}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id, item.size)}
                        className="text-[#7A7568] hover:text-[#111111] transition-colors duration-200 shrink-0"
                        aria-label="Eliminar producto"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-[#DDD8CE]">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-[#111111] hover:bg-[#DDD8CE] transition-colors duration-200 text-sm"
                        >−</button>
                        <span
                          className="w-8 h-8 flex items-center justify-center text-sm text-[#111111] border-x border-[#DDD8CE]"
                          style={{ fontFamily: "var(--font-outfit-face)" }}
                        >
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-[#111111] hover:bg-[#DDD8CE] transition-colors duration-200 text-sm"
                        >+</button>
                      </div>
                      <p className="text-sm font-semibold text-[#111111]" style={{ fontFamily: "var(--font-outfit-face)" }}>
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Link
              href="/shop"
              className="inline-block mt-6 text-sm font-light text-[#7A7568] link-underline-gold"
              style={{ fontFamily: "var(--font-outfit-face)" }}
            >
              ← Seguir comprando
            </Link>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="border border-[#DDD8CE] p-6 sticky top-24">
              <h2
                className="text-xl font-semibold text-[#111111] tracking-[0.02em] mb-6"
                style={{ fontFamily: "var(--font-cormorant-face)" }}
              >
                Resumen del pedido
              </h2>

              {/* Postal code */}
              <div className="mb-5">
                <label
                  className="text-xs tracking-[0.15em] uppercase text-[#111111] block mb-2"
                  style={{ fontFamily: "var(--font-outfit-face)" }}
                >
                  Código postal
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={8}
                  value={postalCode}
                  onChange={(e) => {
                    setPostalCode(e.target.value);
                    setError("");
                  }}
                  placeholder="Ej: 1638"
                  className="w-full border-b border-[#DDD8CE] bg-transparent text-sm font-light text-[#111111] py-1.5 outline-none placeholder:text-[#7A7568]/50 focus:border-[#C8A96E] transition-colors duration-200"
                  style={{ fontFamily: "var(--font-outfit-face)" }}
                />
                {shippingCost !== null && (
                  <p
                    className="mt-1.5 text-xs text-[#C8A96E]"
                    style={{ fontFamily: "var(--font-outfit-face)" }}
                  >
                    {shippingCost === 0 ? "✓ Envío gratis" : `Envío: ${formatPrice(shippingCost)}`}
                  </p>
                )}
              </div>

              {/* Shipping data */}
              <div className="mb-5">
                <p
                  className="text-xs tracking-[0.15em] uppercase text-[#111111] mb-3"
                  style={{ fontFamily: "var(--font-outfit-face)" }}
                >
                  Datos de envío
                </p>

                <div className="space-y-3">
                  <input
                    type="tel"
                    inputMode="tel"
                    maxLength={30}
                    value={phone}
                    onChange={(e) => { setPhone(e.target.value); setError(""); }}
                    placeholder="Celular (ej: +54 9 11 3072-0743)"
                    className="w-full border-b border-[#DDD8CE] bg-transparent text-sm font-light text-[#111111] py-1.5 outline-none placeholder:text-[#7A7568]/50 focus:border-[#C8A96E] transition-colors duration-200"
                    style={{ fontFamily: "var(--font-outfit-face)" }}
                  />
                  <input
                    type="text"
                    maxLength={120}
                    value={address}
                    onChange={(e) => { setAddress(e.target.value); setError(""); }}
                    placeholder="Calle y número (ej: San Martín 542)"
                    className="w-full border-b border-[#DDD8CE] bg-transparent text-sm font-light text-[#111111] py-1.5 outline-none placeholder:text-[#7A7568]/50 focus:border-[#C8A96E] transition-colors duration-200"
                    style={{ fontFamily: "var(--font-outfit-face)" }}
                  />
                  <input
                    type="text"
                    maxLength={80}
                    value={city}
                    onChange={(e) => { setCity(e.target.value); setError(""); }}
                    placeholder="Ciudad / Localidad"
                    className="w-full border-b border-[#DDD8CE] bg-transparent text-sm font-light text-[#111111] py-1.5 outline-none placeholder:text-[#7A7568]/50 focus:border-[#C8A96E] transition-colors duration-200"
                    style={{ fontFamily: "var(--font-outfit-face)" }}
                  />
                  <input
                    type="text"
                    maxLength={60}
                    value={province}
                    onChange={(e) => { setProvince(e.target.value); setError(""); }}
                    placeholder="Provincia"
                    className="w-full border-b border-[#DDD8CE] bg-transparent text-sm font-light text-[#111111] py-1.5 outline-none placeholder:text-[#7A7568]/50 focus:border-[#C8A96E] transition-colors duration-200"
                    style={{ fontFamily: "var(--font-outfit-face)" }}
                  />
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-light text-[#7A7568]" style={{ fontFamily: "var(--font-outfit-face)" }}>Subtotal</span>
                  <span className="text-sm font-light text-[#111111]" style={{ fontFamily: "var(--font-outfit-face)" }}>{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-light text-[#7A7568]" style={{ fontFamily: "var(--font-outfit-face)" }}>Envío</span>
                  <span className="text-sm font-light text-[#7A7568]" style={{ fontFamily: "var(--font-outfit-face)" }}>
                    {shippingCost === null ? "Ingresá tu CP" : shippingCost === 0 ? "Gratis" : formatPrice(shippingCost)}
                  </span>
                </div>
              </div>

              <div className="border-t border-[#DDD8CE] pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-light text-[#111111]" style={{ fontFamily: "var(--font-outfit-face)" }}>Total</span>
                  <span className="text-lg font-semibold text-[#111111]" style={{ fontFamily: "var(--font-outfit-face)" }}>
                    {shippingCost !== null ? formatPrice(total) : formatPrice(totalPrice)}
                  </span>
                </div>
              </div>

              {error && (
                <p className="text-xs text-red-500 mb-4" style={{ fontFamily: "var(--font-outfit-face)" }}>
                  {error}
                </p>
              )}

              <button
                onClick={handleCheckout}
                disabled={loading}
                className={`w-full py-4 text-sm font-light tracking-[0.05em] uppercase transition-all duration-300 ${
                  loading
                    ? "bg-[#7A7568] text-[#FAFAF7] cursor-not-allowed"
                    : "bg-[#111111] text-[#FAFAF7] hover:bg-[#333333]"
                }`}
                style={{ fontFamily: "var(--font-outfit-face)" }}
              >
                {loading ? "Procesando..." : "Finalizar compra"}
              </button>

              <p className="mt-4 text-xs font-light text-[#7A7568] text-center" style={{ fontFamily: "var(--font-outfit-face)" }}>
                Envíos a todo el país · Cambios en 30 días
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
