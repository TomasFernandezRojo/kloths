import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Envíos — kloths.",
  description: "Todo sobre los envíos de kloths. Zonas, precios y tiempos de entrega.",
};

const sections = [
  {
    title: "Zonas y precios",
    items: [
      {
        label: "Pilar y alrededores",
        detail: "Gratis",
        sub: "Incluye Pilar, Del Viso, Manzanares, Manuel Alberti y zonas cercanas.",
      },
      {
        label: "AMBA / GBA",
        detail: "$5.000",
        sub: "Capital Federal y todo el Gran Buenos Aires.",
      },
      {
        label: "Interior del país",
        detail: "$8.000",
        sub: "Cualquier provincia fuera del área metropolitana.",
      },
      {
        label: "Envío gratis",
        detail: "Compras +$70.000",
        sub: "En pedidos que superen los $70.000 el envío es sin cargo a todo el país.",
      },
    ],
  },
  {
    title: "¿Cómo funciona?",
    items: [
      {
        label: "1. Hacés tu pedido",
        detail: "",
        sub: "Elegís tus productos, cargás tu dirección y pagás por MercadoPago.",
      },
      {
        label: "2. Te contactamos",
        detail: "",
        sub: "Una vez confirmado el pago, te escribimos por WhatsApp para coordinar la entrega.",
      },
      {
        label: "3. Recibís tu pedido",
        detail: "",
        sub: "Coordinamos el envío según tu zona. Los tiempos varían entre 2 y 7 días hábiles.",
      },
    ],
  },
  {
    title: "Tiempos de entrega",
    items: [
      {
        label: "Pilar y alrededores",
        detail: "1–2 días hábiles",
        sub: "",
      },
      {
        label: "AMBA / GBA",
        detail: "2–4 días hábiles",
        sub: "",
      },
      {
        label: "Interior del país",
        detail: "4–7 días hábiles",
        sub: "",
      },
    ],
  },
];

export default function EnviosPage() {
  return (
    <div className="bg-[#FAFAF7] min-h-screen">
      <div className="max-w-3xl mx-auto px-6 md:px-10 py-20">

        {/* Header */}
        <div className="mb-16">
          <div className="w-8 h-px bg-[#C8A96E] mb-6" />
          <p
            className="text-xs tracking-[0.25em] uppercase text-[#7A7568] mb-3"
            style={{ fontFamily: "var(--font-outfit-face)" }}
          >
            Info
          </p>
          <h1
            className="text-4xl md:text-5xl font-semibold italic text-[#111111] tracking-[0.02em]"
            style={{ fontFamily: "var(--font-cormorant-face)" }}
          >
            Envíos
          </h1>
          <p
            className="mt-4 text-base font-light text-[#7A7568] leading-relaxed max-w-lg"
            style={{ fontFamily: "var(--font-outfit-face)" }}
          >
            Enviamos a todo el país. Coordinamos cada pedido personalmente para asegurarnos de que llegue bien.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-16">
          {sections.map((section) => (
            <div key={section.title}>
              <h2
                className="text-xl font-semibold text-[#111111] mb-6 pb-3 border-b border-[#E0DCD5]"
                style={{ fontFamily: "var(--font-cormorant-face)" }}
              >
                {section.title}
              </h2>
              <div className="space-y-6">
                {section.items.map((item) => (
                  <div key={item.label} className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                    <div className="flex-1">
                      <p
                        className="text-sm font-light text-[#111111]"
                        style={{ fontFamily: "var(--font-outfit-face)" }}
                      >
                        {item.label}
                      </p>
                      {item.sub && (
                        <p
                          className="text-xs font-light text-[#7A7568] mt-0.5 leading-relaxed"
                          style={{ fontFamily: "var(--font-outfit-face)" }}
                        >
                          {item.sub}
                        </p>
                      )}
                    </div>
                    {item.detail && (
                      <p
                        className="text-sm font-light text-[#C8A96E] sm:text-right shrink-0"
                        style={{ fontFamily: "var(--font-outfit-face)" }}
                      >
                        {item.detail}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 pt-10 border-t border-[#E0DCD5] flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <p
            className="text-sm font-light text-[#7A7568]"
            style={{ fontFamily: "var(--font-outfit-face)" }}
          >
            ¿Tenés alguna duda sobre tu envío?
          </p>
          <a
            href="https://wa.link/a179a4"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#111111] text-[#FAFAF7] text-sm font-light px-7 py-3.5 hover:bg-[#333333] transition-colors duration-300 tracking-[0.05em] uppercase"
            style={{ fontFamily: "var(--font-outfit-face)" }}
          >
            Escribinos por WhatsApp →
          </a>
        </div>

        <div className="mt-10">
          <Link
            href="/"
            className="text-sm font-light text-[#7A7568] link-underline-gold"
            style={{ fontFamily: "var(--font-outfit-face)" }}
          >
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
