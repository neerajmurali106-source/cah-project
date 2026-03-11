"use client";
import { useEffect, useState } from "react";

const cards = [
  { text: "Explaining how vaginas work.", black: false, rotate: -15, x: 28, y: 2, z: 1 },
  { text: "The prostate.", black: false, rotate: 8, x: 58, y: 0, z: 2 },
  { text: "A really cool hat.", black: false, rotate: -25, x: 15, y: 22, z: 3 },
  { text: "What's that smell?", black: true, rotate: -5, x: 45, y: 18, z: 4 },
  { text: "A four-hour depression nap.", black: false, rotate: 10, x: 30, y: 42, z: 2 },
  { text: "Agriculture.", black: false, rotate: 15, x: 68, y: 28, z: 1 },
  { text: "A saxophone solo.", black: false, rotate: 5, x: 62, y: 42, z: 3 },
];

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden">
      <div className="absolute inset-0">
        {cards.map((card, i) => (
          <div
            key={i}
            className={`absolute w-44 md:w-52 rounded-2xl p-4 shadow-2xl border transition-all duration-700 ${
              card.black
                ? "bg-black border-white/30 text-white"
                : "bg-white border-gray-200 text-black"
            } ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            style={{
              left: `${card.x}%`,
              top: `${card.y}%`,
              transform: `rotate(${card.rotate}deg)`,
              transitionDelay: `${i * 100}ms`,
              zIndex: card.z,
            }}
          >
            <p className="font-bold text-base md:text-lg leading-tight mb-8">{card.text}</p>
            <div className={`flex items-center gap-1 mt-auto ${card.black ? "text-white/60" : "text-black/40"}`}>
              <div className={`w-4 h-4 rounded-sm border ${card.black ? "border-white/40" : "border-black/30"}`} />
              <span className="text-xs font-medium">Cards Against Humanity</span>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute top-24 left-6 md:left-10 z-10">
        <h1
          className={`text-5xl md:text-7xl font-black text-white leading-none transition-all duration-700 ${
            mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
          }`}
        >
          Cards<br />Against<br />Humanity
        </h1>
      </div>

      <div
        className={`absolute bottom-16 left-6 md:left-10 z-10 flex items-center gap-3 transition-all duration-700 delay-500 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <svg width="36" height="52" viewBox="0 0 36 52" fill="white" opacity="0.8">
          <path d="M18 0 C10 8 4 18 4 28 C4 38 10 46 18 52 C18 44 14 36 14 28 C14 18 16 8 18 0Z" />
          <path d="M18 8 C8 14 4 22 6 32 C8 14 14 12 18 8Z" />
          <path d="M18 16 C10 20 6 28 8 38 C10 22 14 18 18 16Z" />
        </svg>
        <div>
          <p className="text-white font-black text-2xl md:text-3xl italic">"Stupid."</p>
          <p className="text-white/60 text-sm font-medium">Bloomberg</p>
        </div>
        <svg width="36" height="52" viewBox="0 0 36 52" fill="white" opacity="0.8" style={{ transform: "scaleX(-1)" }}>
          <path d="M18 0 C10 8 4 18 4 28 C4 38 10 46 18 52 C18 44 14 36 14 28 C14 18 16 8 18 0Z" />
          <path d="M18 8 C8 14 4 22 6 32 C8 14 14 12 18 8Z" />
          <path d="M18 16 C10 20 6 28 8 38 C10 22 14 18 18 16Z" />
        </svg>
      </div>
    </section>
  );
}