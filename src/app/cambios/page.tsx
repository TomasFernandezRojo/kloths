import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cambios y devoluciones — kloths.",
  description: "Política de cambios y devoluciones de kloths. 30 días para cambiar tu producto.",
};

const sections = [
  {
    title: "Cambios de talle o producto",
    items: [
      {
        label: "Plazo",
        detail: "30 días desde la compra",
        sub: "",
      },
      {
        label: "Condición",
        detail: "",
        sub: "La prenda tiene que estar sin uso, sin lavar y con todas las etiquetas originales.",
      },
      {
        label: "¿Cómo hacerlo?",
        detail: "",
        sub: "Escribinos por WhatsApp con tu número de pedido y te coordinamos el cambio. Sin vueltas.",
      },
      {
        label: "Costo del cambio",
        detail: "",
        sub: "Si el error fue nuestro (talle incorrecto, producto defectuoso), el envío del cambio corre por nuestra cuenta. Si el cambio es por preferencia, el costo de envío lo cubre el cliente.",
      },
    ],
  },
  {
    title: "Devolución de dinero",
    items: [
      {
        label: "¿Cuándo aplica?",
        detail: "",
        sub: "Solo en caso de producto defectuoso o error de nuestra parte. No hacemos devolución de dinero por cambio de opinión.",
      },
      {
        label: "Plazo de acreditación",
        detail: "5–10 días hábiles",
        sub: "Depende del medio de pago que hayas usado en MercadoPago.",
      },
    ],
  },
  {
    title: "Productos en oferta o sale",
    items: [
      {
        label: "Sin cambio ni devolución",
        detail: "",
        sub: "Los productos adquiridos con descuento especial no tienen cambio ni devolución, salvo defecto de fabricación.",
      },
    ],
  },
  {
    title: "Lo que NO tiene cambio",
    items: [
      {
        label: "Gorros y accesorios",
        detail: "",
        sub: "Por higiene, los gorros no tienen cambio una vez usados.",
      },
      {
        label: "Prendas lavadas o usadas",
        detail: "",
        sub: "No podemos aceptar cambios de prendas que ya fueron usadas o lavadas.",
      },
    ],
  },
];

export default function CambiosPage() {
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
            Cambios y devoluciones
          </h1>
          <p
            className="mt-4 text-base font-light text-[#7A7568] leading-relaxed max-w-lg"
            style={{ fontFamily: "var(--font-outfit-face)" }}
          >
            Tenés 30 días para cambiar tu producto. Lo resolvemos directo por WhatsApp, sin formularios ni trámites.
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
            ¿Querés iniciar un cambio?
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
