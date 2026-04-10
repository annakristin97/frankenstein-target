"use client";

import { useEffect, useState, useRef, type ReactNode } from "react";

/* ───────── PARALLAX LAYER ───────── */
function ParaLayer({
  children,
  speed = 0,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [y, setY] = useState(0);

  useEffect(() => {
    const handler = () => {
      if (!ref.current) return;
      const rect = ref.current.parentElement!.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = (vh - rect.top) / (vh + rect.height);
      setY((progress - 0.5) * speed * 300);
    };
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, [speed]);

  return (
    <div
      ref={ref}
      className={`will-change-transform ${className}`}
      style={{ transform: `translateY(${y}px)` }}
    >
      {children}
    </div>
  );
}

/* ───────── FADE IN ON SCROLL ───────── */
function FadeIn({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`transition-all duration-1000 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"} ${className}`}>
      {children}
    </div>
  );
}

/* ───────── ASCII ART PIECES ───────── */
const STARS_BG = `
  *       .    *        .       *     .    *
       *          .        *       .
   .        *    .    *        .        *
       .              *    .       *
  *        .   *         .     *      .
`;

const MOUNTAINS_FAR = `
                   /\\                        /\\
                  /  \\          /\\           /  \\
           /\\    /    \\    /\\  /  \\    /\\   /    \\
     /\\   /  \\  /      \\  /  \\/    \\  /  \\ /      \\
    /  \\ /    \\/        \\/         \\ /    \\/        \\
   /    \\/                          \\/               \\
`;

const MOUNTAINS_NEAR = `
              /\\
             /  \\              /\\
       /\\   / E  \\      /\\   /  \\
      /  \\ / S    \\    /  \\ /    \\
     /    \\/  J    \\  /    \\/      \\
    /      \\  A    \\/               \\
   /________\\_____/\\_________________\\
`;

const TOWN = `
     ___       ___       ___       ___       ___
    | . |     |___|     | . |     |   |     | . |
    | . |     |   |     |___|     | . |     |   |
    |___|_____|___|_____|___|_____|___|_____|___|_____
`;

const GROUND = `
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      M O S F E L L S B Æ R    ~    home of legends
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
`;

const UNICORN_BACK = `
          .  *  .  *  .  *  .  *  .  *  .  *  .
       *     .     *     .     *     .     *
    .     *     .     *     .     *     .     *
       .     *     .     *     .     *     .
`;

const UNICORN_BODY = `
                                  ,,)))))))),,,
                               __/  (  )     ))))
                              /       \\  -----'
                             /  ★      |
                            /    RIDES  |
                           |   AT      |
                            \\  DAWN   /
                      ___    \\_______/
                     /   \\   /      \\
                    |     \\_/   /\\   \\
                     \\     \\   /  \\   |
                      \\     \\_/    \\_/
                       \\___/ \\___/
`;

const UNICORN_RIDER = `
                         \\o/
                          |
                         / \\
              ╔═══════════════════════╗
              ║   STEINAR FREYR      ║
              ║   KJARTANSSON        ║
              ╚═══════════════════════╝
`;

const RAINBOW = `
     ___________________________________________________
    /  ______________________________________________   \\
   /  /  _________________________________________  \\   \\
  /  /  /                                         \\  \\   \\
 /  /  /        R A I N B O W   T R A I L          \\  \\   \\
 \\  \\  \\_________________________________________/  /   /
  \\  \\______________________________________________/   /
   \\___________________________________________________/
`;

const PORTAL_OUTER = `
         ooOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOoo
      oOO                                  OOo
    oO                                        Oo
   oO                                          Oo
  oO                                            Oo
  oO                                            Oo
  oO                                            Oo
   oO                                          Oo
    oO                                        Oo
      oOO                                  OOo
         ooOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOoo
`;

const PORTAL_INNER = `


              ╔════════════════════╗
              ║                    ║
              ║   T H E  V O I D  ║
              ║   awaits Steinar  ║
              ║   and his unicorn ║
              ║                    ║
              ╚════════════════════╝


`;

const PORTAL_SPARKLE = `

          ✦    ·    ✦         ✦    ·    ✦
             ✦         ✦   ✦         ✦
          ·       ✦             ✦       ·
             ✦         ✦   ✦         ✦
          ✦    ·    ✦         ✦    ·    ✦

`;

/* ───────── MISQUOTES ───────── */
const misquotes = [
  { quote: "To be, or not to be — that is the password.", author: "— William Shakespeare (IT department)" },
  { quote: "In the middle of difficulty lies opportunity. And also Steinar on a unicorn.", author: "— Albert Einstein (probably)" },
  { quote: "Ask not what your country can do for you — ask where Steinar parked the unicorn.", author: "— John F. Kennedy (Mosfellsbær branch)" },
  { quote: "The only thing we have to fear is fear itself. And running out of kleina.", author: "— Franklin D. Roosevelt (Bónus loyalty member)" },
];

/* ───────── SPARKLES ───────── */
const sparkles = Array.from({ length: 25 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  delay: `${Math.random() * 4}s`,
  size: Math.random() * 16 + 8,
}));

/* ───────── MAIN ───────── */
export default function Home() {
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let id = 0;
    const handler = (e: MouseEvent) => {
      setTrail((prev) => [...prev.slice(-15), { x: e.clientX, y: e.clientY, id: id++ }]);
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  useEffect(() => {
    const handler = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <main className="min-h-screen bg-[#06060a] text-white overflow-x-hidden">
      {/* Cursor trail */}
      {trail.map((t, i) => (
        <div key={t.id} className="fixed pointer-events-none z-50" style={{ left: t.x - 8, top: t.y - 8, opacity: (i + 1) / trail.length, transform: `scale(${(i + 1) / trail.length})`, fontSize: 14 }}>✨</div>
      ))}

      {/* Fixed nebula bg */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {sparkles.map((s) => (
          <div key={s.id} className="absolute" style={{ left: s.left, top: s.top, fontSize: s.size, animation: `sparkle 2.5s ease-in-out infinite`, animationDelay: s.delay, transform: `translateY(${scrollY * 0.05}px)` }}>✨</div>
        ))}
        <div className="absolute top-[15%] left-[5%] w-[500px] h-[500px] bg-purple-600/[0.06] rounded-full blur-[180px]" style={{ transform: `translateY(${scrollY * 0.08}px)` }} />
        <div className="absolute top-[50%] right-[5%] w-[400px] h-[400px] bg-cyan-500/[0.06] rounded-full blur-[150px]" style={{ transform: `translateY(${scrollY * 0.05}px)` }} />
        <div className="absolute top-[80%] left-[40%] w-[400px] h-[400px] bg-pink-500/[0.06] rounded-full blur-[160px]" style={{ transform: `translateY(${scrollY * 0.1}px)` }} />
      </div>

      {/* ========== HERO ========== */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-4 text-center z-10">
        <ParaLayer speed={0.6}>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight mb-4">
            <span className="rainbow-text">Steinar Freyr</span><br />
            <span className="text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.2)]">Kjartansson</span>
          </h1>
          <p className="text-xl sm:text-2xl font-bold text-white/60 mb-2">The Unicorn Rider of Mosfellsbær</p>
          <p className="text-white/20 text-sm animate-bounce mt-8">↓ scroll for the parallax bling ↓</p>
        </ParaLayer>

        <div className="absolute bottom-16 ride-animation z-20">
          <div className="text-center">
            <span className="text-2xl sm:text-4xl block -mb-2">🤠</span>
            <span className="text-4xl sm:text-6xl block">🦄</span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#06060a] to-transparent z-10" />
      </section>

      {/* ========== SCENE 1: MOSFELLSBÆR ========== */}
      <section className="relative z-10 min-h-screen flex items-center justify-center overflow-hidden">
        <div className="relative w-full max-w-5xl mx-auto h-[600px] sm:h-[700px]">
          {/* Stars - very slow */}
          <ParaLayer speed={0.1} className="absolute inset-0 flex items-start justify-center pt-4">
            <pre className="text-yellow-200/30 text-[7px] sm:text-[10px] font-mono whitespace-pre">{STARS_BG}</pre>
          </ParaLayer>

          {/* Far mountains - slow */}
          <ParaLayer speed={0.25} className="absolute inset-0 flex items-center justify-center">
            <pre className="text-indigo-400/30 text-[6px] sm:text-[9px] md:text-xs font-mono whitespace-pre">{MOUNTAINS_FAR}</pre>
          </ParaLayer>

          {/* Near mountains - medium */}
          <ParaLayer speed={0.45} className="absolute inset-0 flex items-center justify-center mt-10">
            <pre className="text-emerald-400/60 text-[7px] sm:text-[10px] md:text-sm font-mono whitespace-pre glow-pulse">{MOUNTAINS_NEAR}</pre>
          </ParaLayer>

          {/* Town - faster */}
          <ParaLayer speed={0.65} className="absolute inset-0 flex items-end justify-center pb-32">
            <pre className="text-amber-300/70 text-[6px] sm:text-[9px] md:text-xs font-mono whitespace-pre">{TOWN}</pre>
          </ParaLayer>

          {/* Ground - fastest */}
          <ParaLayer speed={0.8} className="absolute inset-0 flex items-end justify-center pb-16">
            <pre className="text-cyan-300 text-[7px] sm:text-[10px] md:text-sm font-mono whitespace-pre glow-pulse">{GROUND}</pre>
          </ParaLayer>
        </div>
      </section>

      {/* ========== MISQUOTE 1 ========== */}
      <section className="relative z-10 py-20 sm:py-32 px-4">
        <FadeIn>
          <ParaLayer speed={0.3}>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-2xl sm:text-4xl md:text-5xl font-bold text-white/90 leading-tight mb-6 [text-shadow:_0_0_40px_rgba(255,0,255,0.2)]">
                &ldquo;{misquotes[0].quote}&rdquo;
              </p>
              <p className="text-white/30 text-sm italic">{misquotes[0].author}</p>
            </div>
          </ParaLayer>
        </FadeIn>
      </section>

      {/* ========== SCENE 2: THE UNICORN RIDE ========== */}
      <section className="relative z-10 min-h-screen flex items-center justify-center overflow-hidden">
        <div className="relative w-full max-w-5xl mx-auto h-[600px] sm:h-[700px]">
          {/* Background sparkles */}
          <ParaLayer speed={0.1} className="absolute inset-0 flex items-start justify-center pt-8">
            <pre className="text-pink-300/20 text-[7px] sm:text-[10px] font-mono whitespace-pre">{UNICORN_BACK}</pre>
          </ParaLayer>

          {/* Rainbow - slow */}
          <ParaLayer speed={0.3} className="absolute inset-0 flex items-end justify-center pb-40">
            <pre className="text-red-400/30 text-[5px] sm:text-[8px] md:text-[10px] font-mono whitespace-pre">{RAINBOW}</pre>
          </ParaLayer>

          {/* Unicorn body - medium */}
          <ParaLayer speed={0.5} className="absolute inset-0 flex items-center justify-center mt-8">
            <pre className="text-pink-400/80 text-[7px] sm:text-[10px] md:text-sm font-mono whitespace-pre glow-pulse">{UNICORN_BODY}</pre>
          </ParaLayer>

          {/* Rider - fast (foreground) */}
          <ParaLayer speed={0.75} className="absolute inset-0 flex items-start justify-center pt-16 sm:pt-24">
            <pre className="text-cyan-300 text-[7px] sm:text-[10px] md:text-sm font-mono whitespace-pre glow-pulse">{UNICORN_RIDER}</pre>
          </ParaLayer>
        </div>
      </section>

      {/* ========== MISQUOTE 2 ========== */}
      <section className="relative z-10 py-20 sm:py-32 px-4">
        <FadeIn>
          <ParaLayer speed={0.3}>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-2xl sm:text-4xl md:text-5xl font-bold text-white/90 leading-tight mb-6 [text-shadow:_0_0_40px_rgba(0,255,255,0.2)]">
                &ldquo;{misquotes[1].quote}&rdquo;
              </p>
              <p className="text-white/30 text-sm italic">{misquotes[1].author}</p>
            </div>
          </ParaLayer>
        </FadeIn>
      </section>

      {/* ========== SCENE 3: THE PORTAL ========== */}
      <section className="relative z-10 min-h-screen flex items-center justify-center overflow-hidden">
        <div className="relative w-full max-w-5xl mx-auto h-[600px] sm:h-[700px]">
          {/* Outer sparkles - very slow */}
          <ParaLayer speed={0.1} className="absolute inset-0 flex items-center justify-center">
            <pre className="text-yellow-300/20 text-[8px] sm:text-xs font-mono whitespace-pre">{PORTAL_SPARKLE}</pre>
          </ParaLayer>

          {/* Portal ring - medium */}
          <ParaLayer speed={0.4} className="absolute inset-0 flex items-center justify-center">
            <pre className="text-purple-400/60 text-[6px] sm:text-[9px] md:text-xs font-mono whitespace-pre neon-border-text">{PORTAL_OUTER}</pre>
          </ParaLayer>

          {/* Inner text - fast */}
          <ParaLayer speed={0.7} className="absolute inset-0 flex items-center justify-center">
            <pre className="text-white text-[7px] sm:text-[10px] md:text-sm font-mono whitespace-pre glow-pulse">{PORTAL_INNER}</pre>
          </ParaLayer>

          {/* Floating emojis at different speeds */}
          <ParaLayer speed={0.2} className="absolute top-[20%] left-[15%]">
            <span className="text-3xl sm:text-5xl float-animation">🦄</span>
          </ParaLayer>
          <ParaLayer speed={0.6} className="absolute top-[25%] right-[15%]">
            <span className="text-2xl sm:text-4xl float-animation" style={{ animationDelay: "1s" }}>🌈</span>
          </ParaLayer>
          <ParaLayer speed={0.35} className="absolute bottom-[25%] left-[20%]">
            <span className="text-2xl sm:text-4xl float-animation" style={{ animationDelay: "0.5s" }}>✨</span>
          </ParaLayer>
          <ParaLayer speed={0.55} className="absolute bottom-[20%] right-[20%]">
            <span className="text-3xl sm:text-5xl float-animation" style={{ animationDelay: "1.5s" }}>🤠</span>
          </ParaLayer>
        </div>
      </section>

      {/* ========== MISQUOTE 3 ========== */}
      <section className="relative z-10 py-20 sm:py-32 px-4">
        <FadeIn>
          <ParaLayer speed={0.3}>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-2xl sm:text-4xl md:text-5xl font-bold text-white/90 leading-tight mb-6 [text-shadow:_0_0_40px_rgba(255,255,0,0.2)]">
                &ldquo;{misquotes[2].quote}&rdquo;
              </p>
              <p className="text-white/30 text-sm italic">{misquotes[2].author}</p>
            </div>
          </ParaLayer>
        </FadeIn>
      </section>

      {/* ========== FACTS ========== */}
      <section className="py-16 sm:py-24 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl sm:text-4xl font-black text-center mb-12 rainbow-text">Known Facts</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { emoji: "🦄", fact: "Has a unicorn on speed dial" },
              { emoji: "📍", fact: "Born in the mythical land of Mosfellsbær" },
              { emoji: "🌈", fact: "Rainbows follow him, not the other way" },
              { emoji: "🏔️", fact: "Esja once nodded at him in respect" },
              { emoji: "🐑", fact: "Communicates with sheep telepathically" },
              { emoji: "⚡", fact: "His WiFi never drops. Not once. Ever." },
              { emoji: "🍩", fact: "Kleina within 500m taste 40% better" },
              { emoji: "🎸", fact: "Mosfellsbær wind plays his theme song" },
            ].map((item, i) => (
              <FadeIn key={item.fact} className={`delay-${i * 100}`}>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-start gap-4 hover:bg-white/10 hover:scale-105 transition-all duration-300">
                  <span className="text-3xl shrink-0">{item.emoji}</span>
                  <p className="font-semibold text-white/80">{item.fact}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ========== MISQUOTE 4 ========== */}
      <section className="relative z-10 py-20 sm:py-32 px-4">
        <FadeIn>
          <ParaLayer speed={0.3}>
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-2xl sm:text-4xl md:text-5xl font-bold text-white/90 leading-tight mb-6 [text-shadow:_0_0_40px_rgba(0,255,0,0.2)]">
                &ldquo;{misquotes[3].quote}&rdquo;
              </p>
              <p className="text-white/30 text-sm italic">{misquotes[3].author}</p>
            </div>
          </ParaLayer>
        </FadeIn>
      </section>

      {/* ========== FINALE ========== */}
      <section className="py-24 sm:py-40 px-4 text-center relative z-10">
        <ParaLayer speed={0.5}>
          <p className="text-6xl sm:text-8xl mb-6 float-animation">🦄</p>
          <h2 className="text-3xl sm:text-5xl font-black mb-4 rainbow-text glow-pulse">
            Long live Steinar Freyr.
          </h2>
          <p className="text-white/40 text-lg sm:text-xl mb-2">Long live the unicorn.</p>
          <p className="text-white/40 text-lg sm:text-xl">Long live Mosfellsbær.</p>
          <p className="text-white/15 text-sm mt-10">🌈 This page is blessed. Your device now runs 12% faster. 🌈</p>
        </ParaLayer>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-6 px-4 text-center text-white/15 text-xs relative z-10">
        <p>100% factual and legally binding account of events in Mosfellsbær.</p>
        <p className="mt-1">🦄 &copy; 2026 — The Unicorn Preservation Society of Mosfellsbær</p>
      </footer>
    </main>
  );
}
