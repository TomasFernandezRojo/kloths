"use client";

import { useState } from "react";

const MESSAGE =
  "DROP 2 DISPONIBLE\u2002—\u2002ENVÍOS A TODO EL PAÍS\u2002—\u2002BERMUDAS · REMERAS · GORROS\u2002—\u2002DROP 2 DISPONIBLE\u2002—\u2002";

export default function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="relative bg-[#111111] text-[#C8A96E] py-2 overflow-hidden">
      {/* Marquee */}
      <div className="overflow-hidden">
        <div className="marquee-track">
          <span
            className="text-xs tracking-[0.2em] uppercase whitespace-nowrap pr-12"
            style={{ fontFamily: "var(--font-outfit-face)" }}
          >
            {MESSAGE}
          </span>
          <span
            className="text-xs tracking-[0.2em] uppercase whitespace-nowrap pr-12"
            style={{ fontFamily: "var(--font-outfit-face)" }}
          >
            {MESSAGE}
          </span>
        </div>
      </div>

      {/* Close button */}
      <button
        onClick={() => setVisible(false)}
        aria-label="Cerrar anuncio"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#C8A96E]/60 hover:text-[#C8A96E] transition-colors duration-200 leading-none"
        style={{ fontFamily: "var(--font-outfit-face)", fontSize: "14px" }}
      >
        ✕
      </button>
    </div>
  );
}
