"use client";

import { useEffect, useState } from "react";

const sparkles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  delay: `${Math.random() * 3}s`,
  size: Math.random() * 20 + 10,
}));

export default function Home() {
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);

  useEffect(() => {
    let id = 0;
    const handler = (e: MouseEvent) => {
      setTrail((prev) => [...prev.slice(-12), { x: e.clientX, y: e.clientY, id: id++ }]);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#87CEEB] via-[#98D8E8] to-[#90EE90] text-gray-900 overflow-hidden relative">
      {/* Rainbow cursor trail */}
      {trail.map((t, i) => (
        <div
          key={t.id}
          className="fixed pointer-events-none z-50 text-lg"
          style={{
            left: t.x - 10,
            top: t.y - 10,
            opacity: (i + 1) / trail.length,
            transform: `scale(${(i + 1) / trail.length})`,
          }}
        >
          ✨
        </div>
      ))}

      {/* Sparkles */}
      {sparkles.map((s) => (
        <div
          key={s.id}
          className="absolute pointer-events-none"
          style={{
            left: s.left,
            top: s.top,
            fontSize: s.size,
            animation: `sparkle 2s ease-in-out infinite`,
            animationDelay: s.delay,
          }}
        >
          ✨
        </div>
      ))}

      {/* Sun */}
      <div className="absolute top-10 right-10 sm:top-16 sm:right-20 text-7xl sm:text-8xl float-animation">
        ☀️
      </div>

      {/* Clouds */}
      <div className="absolute top-20 left-[10%] text-5xl float-animation" style={{ animationDelay: "0.5s" }}>☁️</div>
      <div className="absolute top-32 left-[60%] text-4xl float-animation" style={{ animationDelay: "1.5s" }}>☁️</div>
      <div className="absolute top-16 left-[35%] text-3xl float-animation" style={{ animationDelay: "2s" }}>☁️</div>

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-4 text-center z-10">
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight mb-4 drop-shadow-lg">
          <span className="rainbow-text">Steinar Freyr</span>
          <br />
          <span className="text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]">Kjartansson</span>
        </h1>

        <p className="text-xl sm:text-2xl font-bold text-white/90 mb-2 drop-shadow-md">
          The Unicorn Rider of Mosfellsbær
        </p>
        <p className="text-base sm:text-lg text-white/70 max-w-lg mb-8">
          Legend says on a quiet Tuesday, Steinar Freyr mounted a magical unicorn and rode through the streets of Mosfellsbær. Nobody has been the same since.
        </p>

        {/* The riding scene */}
        <div className="relative w-full max-w-4xl h-64 sm:h-80">
          {/* Mountains (Esja) */}
          <div className="absolute bottom-16 left-0 right-0 flex justify-center">
            <svg viewBox="0 0 800 200" className="w-full h-40 sm:h-52">
              <polygon points="0,200 100,80 200,140 300,50 400,100 500,30 600,90 700,60 800,200" fill="#6B8E6B" opacity="0.6" />
              <polygon points="0,200 150,100 250,150 400,70 550,120 700,80 800,200" fill="#5A7D5A" opacity="0.5" />
              <text x="350" y="45" fill="white" fontSize="14" fontWeight="bold" opacity="0.7">Esja</text>
            </svg>
          </div>

          {/* Mosfellsbær sign */}
          <div className="absolute bottom-20 left-4 sm:left-12 bg-white/90 rounded-lg px-3 py-2 shadow-lg border-2 border-green-600 z-10">
            <p className="text-xs sm:text-sm font-bold text-green-800">📍 Mosfellsbær</p>
          </div>

          {/* Houses */}
          <div className="absolute bottom-16 right-8 sm:right-20 flex gap-2 sm:gap-4">
            <div className="text-2xl sm:text-4xl">🏠</div>
            <div className="text-2xl sm:text-4xl mt-2">🏡</div>
            <div className="text-2xl sm:text-4xl">🏘️</div>
          </div>

          {/* Green ground */}
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-green-600 to-green-500 rounded-t-3xl" />

          {/* Steinar on unicorn - riding across */}
          <div className="absolute bottom-12 ride-animation z-20">
            <div className="relative">
              {/* Rainbow trail */}
              <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-32 h-4 bg-gradient-to-r from-transparent via-red-400 to-violet-400 rounded-full opacity-60 blur-sm" />
              <div className="absolute -left-28 top-1/2 -translate-y-1/3 w-28 h-3 bg-gradient-to-r from-transparent via-yellow-400 to-green-400 rounded-full opacity-50 blur-sm" />

              {/* Steinar riding */}
              <div className="text-center">
                <span className="text-2xl sm:text-4xl block -mb-2">🤠</span>
                <span className="text-4xl sm:text-6xl block">🦄</span>
              </div>
            </div>
          </div>

          {/* Flowers on the ground */}
          <div className="absolute bottom-14 left-[20%] text-xl">🌷</div>
          <div className="absolute bottom-14 left-[40%] text-lg">🌻</div>
          <div className="absolute bottom-14 left-[55%] text-xl">🌸</div>
          <div className="absolute bottom-14 left-[75%] text-lg">🌺</div>

          {/* Sheep because Iceland */}
          <div className="absolute bottom-14 right-[35%] text-2xl">🐑</div>
          <div className="absolute bottom-14 right-[45%] text-xl">🐑</div>
        </div>
      </section>

      {/* The Legend */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-white/80 backdrop-blur-sm relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl font-black mb-8">
            The Legend of <span className="rainbow-text">Steinar Freyr</span>
          </h2>
          <div className="space-y-6 text-gray-700 text-base sm:text-lg leading-relaxed">
            <p>
              It was an ordinary spring morning in Mosfellsbær. The birds were singing, Esja was glowing in the sunrise, and the sheep were doing absolutely nothing — as sheep do.
            </p>
            <p>
              Then, from behind Álafosskvos, a blinding rainbow erupted. The ground trembled. Dogs howled. A single Bónus bag rolled across Þrengslavegur like a tumbleweed.
            </p>
            <p>
              And there he was. <strong>Steinar Freyr Kjartansson</strong>, astride a magnificent unicorn with a mane of pure starlight. He rode down Háholt at full gallop, leaving a trail of rainbows and the faint scent of kleina.
            </p>
            <p>
              Witnesses say he winked at a traffic camera near Mosfellsbakarí, and the camera blushed so hard it deleted the footage. To this day, only those with pure hearts and strong Wi-Fi can see the video.
            </p>
          </div>
        </div>
      </section>

      {/* Facts */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-center mb-12 text-white drop-shadow-lg">
            Known Facts About Steinar Freyr
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { emoji: "🦄", fact: "Has a unicorn on speed dial" },
              { emoji: "📍", fact: "Born and raised in the mythical land of Mosfellsbær" },
              { emoji: "🌈", fact: "Rainbows follow him, not the other way around" },
              { emoji: "🏔️", fact: "Esja once nodded at him in respect" },
              { emoji: "🐑", fact: "Can communicate with sheep telepathically" },
              { emoji: "⚡", fact: "His WiFi never drops. Not once. Ever." },
              { emoji: "🍩", fact: "Kleina within 500m radius taste 40% better" },
              { emoji: "🎸", fact: "The wind in Mosfellsbær plays his theme song" },
            ].map((item) => (
              <div
                key={item.fact}
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-5 flex items-start gap-4 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 border border-white"
              >
                <span className="text-3xl shrink-0">{item.emoji}</span>
                <p className="font-semibold text-gray-800">{item.fact}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eyewitness Reports */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-white/80 backdrop-blur-sm relative z-10">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-black text-center mb-12">
            Eyewitness Reports 👀
          </h2>

          <div className="space-y-6">
            {[
              {
                quote: "I was walking my dog past Áning and suddenly a unicorn galloped by. The rider waved. My dog fainted. I cried. 10/10 experience.",
                name: "Guðrún frá Kópavogi",
              },
              {
                quote: "He rode past my kitchen window during morning coffee. My coffee turned into a latte. I don't own an espresso machine.",
                name: "Jón á Háholti",
              },
              {
                quote: "The unicorn left hoofprints in the parking lot at Nettó. They glow at night. The manager has roped them off as a tourist attraction.",
                name: "Sigrún, Mosfellsbær town council",
              },
            ].map((t) => (
              <div
                key={t.name}
                className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200"
              >
                <p className="text-gray-700 italic leading-relaxed mb-3">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="text-sm font-bold text-purple-600">— {t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Grand Finale */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 text-center relative z-10">
        <div className="max-w-2xl mx-auto">
          <p className="text-6xl sm:text-8xl mb-6 float-animation">🦄</p>
          <h2 className="text-3xl sm:text-5xl font-black text-white drop-shadow-lg mb-4">
            Long live Steinar Freyr.
          </h2>
          <p className="text-white/80 text-lg sm:text-xl drop-shadow-md mb-2">
            Long live the unicorn.
          </p>
          <p className="text-white/80 text-lg sm:text-xl drop-shadow-md">
            Long live Mosfellsbær.
          </p>
          <p className="text-white/40 text-sm mt-8">
            🌈 This page is blessed. Your device now runs 12% faster. You&apos;re welcome. 🌈
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-800/50 py-6 px-4 text-center text-white/50 text-xs relative z-10">
        <p>This is a 100% factual and legally binding account of events in Mosfellsbær.</p>
        <p className="mt-1">🦄 &copy; 2026 — The Unicorn Preservation Society of Mosfellsbær</p>
      </footer>
    </main>
  );
}
