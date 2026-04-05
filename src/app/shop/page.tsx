"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import ProductCard from "@/components/ProductCard";
import { products, Product, Category } from "@/data/products";

type SortKey = "default" | "price-asc" | "price-desc";

const categories: { label: string; value: Category | "todo" }[] = [
  { label: "Remeras", value: "Remeras" },
  { label: "Bermudas", value: "Bermudas" },
  { label: "Accesorios", value: "Accesorios" },
  { label: "Todo", value: "todo" },
];

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-xs px-4 py-1.5 border transition-all duration-200 ${
        active
          ? "bg-[#111111] border-[#111111] text-[#FAFAF7]"
          : "bg-transparent border-[#DDD8CE] text-[#7A7568] hover:border-[#C8A96E] hover:text-[#111111]"
      }`}
      style={{ fontFamily: "var(--font-outfit-face)" }}
    >
      {children}
    </button>
  );
}

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");

  const [activeCategory, setActiveCategory] = useState<Category | "todo">(
    (initialCategory as Category) || "todo"
  );
  const [sortKey, setSortKey] = useState<SortKey>("default");

  const filtered = useMemo(() => {
    let result: Product[] = [...products];
    if (activeCategory !== "todo") result = result.filter((p) => p.category === activeCategory);
    if (sortKey === "price-asc") result.sort((a, b) => a.price - b.price);
    if (sortKey === "price-desc") result.sort((a, b) => b.price - a.price);
    return result;
  }, [activeCategory, sortKey]);

  return (
    <>
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 pt-16 pb-10 border-b border-[#DDD8CE]">
        <h1
          className="text-5xl md:text-6xl font-semibold text-[#111111] tracking-[0.02em]"
          style={{ fontFamily: "var(--font-cormorant-face)" }}
        >
          Shop
        </h1>
        <p
          className="mt-2 text-sm font-light text-[#7A7568]"
          style={{ fontFamily: "var(--font-outfit-face)" }}
        >
          Mostrando {filtered.length} {filtered.length === 1 ? "producto" : "productos"}
        </p>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-6 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-start gap-4">
          {/* Left: filter groups */}
          <div className="flex-1 flex flex-col gap-3">
            {/* Categoría */}
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="text-xs tracking-[0.15em] uppercase text-[#7A7568] w-20 shrink-0"
                style={{ fontFamily: "var(--font-outfit-face)" }}
              >
                Categoría
              </span>
              {categories.map((c) => (
                <FilterPill
                  key={c.value}
                  active={activeCategory === c.value}
                  onClick={() => setActiveCategory(c.value as Category | "todo")}
                >
                  {c.label}
                </FilterPill>
              ))}
            </div>
          </div>

          {/* Sort dropdown */}
          <select
            value={sortKey}
            onChange={(e) => setSortKey(e.target.value as SortKey)}
            className="text-xs font-light text-[#7A7568] border border-[#DDD8CE] bg-transparent px-3 py-1.5 outline-none cursor-pointer hover:border-[#111111] transition-colors duration-200 appearance-none pr-8 self-start"
            style={{
              fontFamily: "var(--font-outfit-face)",
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%237A7568' strokeWidth='1.2' fill='none' strokeLinecap='round'/%3E%3C/svg%3E\")",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 10px center",
            }}
          >
            <option value="default">Ordenar</option>
            <option value="price-asc">Precio: menor a mayor</option>
            <option value="price-desc">Precio: mayor a menor</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 pb-28">
        {filtered.length === 0 ? (
          <div className="py-24 text-center">
            <p
              className="text-lg font-light text-[#7A7568]"
              style={{ fontFamily: "var(--font-outfit-face)" }}
            >
              No hay productos con estos filtros.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} priority={i < 4} index={i} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default function ShopPage() {
  return (
    <div className="bg-[#FAFAF7] min-h-screen">
      <Suspense
        fallback={
          <div className="py-32 text-center">
            <p
              className="text-sm font-light text-[#7A7568]"
              style={{ fontFamily: "var(--font-outfit-face)" }}
            >
              Cargando...
            </p>
          </div>
        }
      >
        <ShopContent />
      </Suspense>
    </div>
  );
}
