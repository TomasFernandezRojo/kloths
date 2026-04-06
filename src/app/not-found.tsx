import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-[#FAFAF7] min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <p
        className="text-8xl md:text-9xl font-semibold italic text-[#111111]/10 mb-6"
        style={{ fontFamily: "var(--font-cormorant-face)" }}
      >
        404
      </p>

      <div className="w-12 h-px bg-[#C8A96E] mb-6" />

      <h1
        className="text-3xl md:text-4xl font-semibold text-[#111111] mb-3"
        style={{ fontFamily: "var(--font-cormorant-face)" }}
      >
        Página no encontrada
      </h1>

      <p
        className="text-sm font-light text-[#7A7568] mb-8 max-w-md"
        style={{ fontFamily: "var(--font-outfit-face)" }}
      >
        La página que buscás no existe o fue movida.
      </p>

      <Link
        href="/shop"
        className="inline-block bg-[#111111] text-[#FAFAF7] text-sm font-light px-8 py-4 hover:bg-[#333333] transition-colors duration-300 tracking-[0.05em] uppercase"
        style={{ fontFamily: "var(--font-outfit-face)" }}
      >
        Volver al shop →
      </Link>
    </div>
  );
}
