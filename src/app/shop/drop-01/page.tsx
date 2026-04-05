import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Drop 01 — kloths.",
  description: "Drop 01 de kloths. La primera colección de remeras.",
};

// Los productos del Drop 01 se cargan acá
const drop01Products: {
  name: string;
  price: number;
  sizes: string[];
  image: string;
}[] = [
  // proximamente...
];

function formatPrice(n: number) {
  return "$" + n.toLocaleString("es-AR");
}

export default function Drop01Page() {
  return (
    <div className="bg-[#FAFAF7] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-20">

        {/* Header */}
        <div className="mb-14">
          <p
            className="text-xs tracking-[0.25em] uppercase text-[#7A7568] mb-3"
            style={{ fontFamily: "var(--font-outfit-face)" }}
          >
            Temporada anterior
          </p>
          <h1
            className="text-4xl md:text-5xl font-semibold italic text-[#111111] tracking-[0.02em]"
            style={{ fontFamily: "var(--font-cormorant-face)" }}
          >
            Drop 01
          </h1>
          <p
            className="mt-3 text-base font-light text-[#7A7568]"
            style={{ fontFamily: "var(--font-outfit-face)" }}
          >
            La primera colección de kloths. — remeras.
          </p>
        </div>

        {/* Products grid */}
        {drop01Products.length === 0 ? (
          <div className="py-24 text-center">
            <p
              className="text-2xl font-semibold italic text-[#111111]/20 mb-4"
              style={{ fontFamily: "var(--font-cormorant-face)" }}
            >
              Próximamente
            </p>
            <p
              className="text-sm font-light text-[#7A7568]"
              style={{ fontFamily: "var(--font-outfit-face)" }}
            >
              Estamos cargando los productos del Drop 01.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {drop01Products.map((product) => (
              <div key={product.name} className="group">
                <div className="relative aspect-[3/4] bg-[#E8E4DD] overflow-hidden mb-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p
                  className="text-sm font-light text-[#111111]"
                  style={{ fontFamily: "var(--font-outfit-face)" }}
                >
                  {product.name}
                </p>
                <p
                  className="text-sm font-light text-[#7A7568] mt-0.5"
                  style={{ fontFamily: "var(--font-outfit-face)" }}
                >
                  {formatPrice(product.price)}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 pt-10 border-t border-[#E0DCD5]">
          <Link
            href="/shop"
            className="text-sm font-light text-[#7A7568] link-underline-gold"
            style={{ fontFamily: "var(--font-outfit-face)" }}
          >
            Ver Drop 02 — colección actual →
          </Link>
        </div>
      </div>
    </div>
  );
}
