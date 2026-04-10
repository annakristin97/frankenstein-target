"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/* ═══════════════════════════════════════════
   SCENE 1: THE MEETING
   Steinar approaches a unicorn, pets it, mounts it
   ═══════════════════════════════════════════ */
const scene1: string[] = [
  // 0: empty field, unicorn grazing alone
  `
                                        ___
                                       /   \\
                  .                    | o   |
                                       \\   /
                                    ____/ \\____
                                   /    \\ /    \\
                                  |      |      |
                                  |      |      |
                                  /      |      \\
                                 /  /    |    \\  \\
___________________________________/_____|_____\\______
  ~~~  ~~~   MOSFELLSBÆR  ~~~   ~~~  ~~~  ~~~  ~~~
`,
  // 1: Steinar appears from the left
  `
                                        ___
                                       /   \\
                  .                    | o   |
     o/                                \\   /
    /|                              ____/ \\____
    / \\                            /    \\ /    \\
                                  |      |      |
                                  |      |      |
                                  /      |      \\
                                 /  /    |    \\  \\
___________________________________/_____|_____\\______
  ~~~  ~~~   MOSFELLSBÆR  ~~~   ~~~  ~~~  ~~~  ~~~
`,
  // 2: Steinar walks closer
  `
                                        ___
                                       /   \\
                  .                    | o   |
              o/                       \\   /
             /|                     ____/ \\____
             / \\                   /    \\ /    \\
                                  |      |      |
                                  |      |      |
                                  /      |      \\
                                 /  /    |    \\  \\
___________________________________/_____|_____\\______
  ~~~  ~~~   MOSFELLSBÆR  ~~~   ~~~  ~~~  ~~~  ~~~
`,
  // 3: getting close, unicorn notices
  `
                                        ___
                                       /   \\
                  .                    |  o  |  !
                   o/                  \\   /
                  /|                ____/ \\____
                  / \\              /    \\ /    \\
                                  |      |      |
                                  |      |      |
                                  /      |      \\
                                 /  /    |    \\  \\
___________________________________/_____|_____\\______
  ~~~  ~~~   MOSFELLSBÆR  ~~~   ~~~  ~~~  ~~~  ~~~
`,
  // 4: reaches out hand
  `
                                        ___
                                       /   \\
                  .                    |  o  |  ?
                     o__               \\   /
                    /|                 / \\____
                    / \\              /    \\ /  \\
                                    |     |     |
                                    |     |     |
                                    /     |     \\
                                   /  /   |  \\   \\
___________________________________/______|______\\____
  ~~~  ~~~   MOSFELLSBÆR  ~~~   ~~~  ~~~  ~~~  ~~~
`,
  // 5: petting the unicorn
  `
                                        ___
                                       /   \\
                  .                    | ^_^ |
                      o~~------->      \\   /
                     /|              ___/ \\____
                     / \\            /   \\ /    \\
                                   |     |      |
                       ♥  ♥        |     |      |
                                   /     |      \\
                                  /  /   |   \\   \\
___________________________________/_____|_____\\______
  ~~~  ~~~   MOSFELLSBÆR  ~~~   ~~~  ~~~  ~~~  ~~~
`,
  // 6: climbing on
  `
                                        ___
                                       /   \\
                  .                    | ^_^ |
                                       \\   /
                       o/           ____/ \\____
                      /|\\          /    \\ /    \\
                      / \\---->    |      |      |
                                  |      |      |
                       ♥  ♥  ♥    /      |      \\
                                 /  /    |    \\  \\
___________________________________/_____|_____\\______
  ~~~  ~~~   MOSFELLSBÆR  ~~~   ~~~  ~~~  ~~~  ~~~
`,
  // 7: mounted!
  `
                                      \\o/
                                       |
                                       ___
                                      /   \\
                  .                   | ^o^ |
                                      \\   /
                                   ____/ \\____
                                  /    \\ /    \\
                       ♥  ♥  ♥   |      |      |
                                 |      |      |
                                 /      |      \\
                                /  /    |    \\  \\
___________________________________/_____|_____\\______
  ~~~  ~~~   MOSFELLSBÆR  ~~~   ~~~  ~~~  ~~~  ~~~
`,
  // 8: ready to ride!
  `
                                     \\o/  READY!
                                      |
                                      ___
                                     /   \\
                  .  .  .            | >o< |
                                     \\   /
                                  ____/ \\____
              ★  ★  ★            /    \\ /    \\
                       ♥  ♥  ♥  |      |      |
                                |      |      |
                                 /     |     \\
                                / /    |   \\  \\
___________________________________/_____|_____\\______
  ~~~  ~~~   MOSFELLSBÆR  ~~~   ~~~  ~~~  ~~~  ~~~
`,
];

/* ═══════════════════════════════════════════
   SCENE 2: THE RIDE
   Galloping through town, landscape scrolling
   ═══════════════════════════════════════════ */
const scene2: string[] = [
  `
        \\o/                                        __
         |     ~~                                  |  |
        ___                                   ___  |  |
       / ^ \\                                 |   | |__|
      | >o< |        .  .  .                 |   |_____
       \\   /                                 |        |
    ____\\ /____                              |   []   |
   /    / \\    \\                             |   []   |
  |     | |     |                            |________|
__|_____|_|_____|_____________________________________
  ~~~ 🌷  ~~~ 🌻  ~~~ HÁHOLT ~~~ 🌸 ~~~ 🌷 ~~~
`,
  `
                \\o/                            __
                 |     ~~                      |  |
                ___                       ___  |  |
               / ^ \\                     |   | |__|
              | >o< |    .  .  .         |   |_____
               \\   /                     |        |
            ____\\ /____                  |   []   |
           /    / \\    \\                 |   []   |
          |     | |     |                |________|
__________|_____|_|_____|_____________________________
  ~~~ 🌷  ~~~ HÁHOLT ~~~ 🌻  ~~~ 🌸 ~~~ 🌷 ~~~
`,
  `
                         \\o/                __
          ★               |    ~~           |  |
                         ___           ___  |  |
                        / ^ \\         |   | |__|
           ★           | >o< |  .  .  |   |_____
                        \\   /         |        |
           ★         ____\\ /____      |   []   |
                    /    / \\    \\     |   []   |
                   |     | |     |    |________|
___________________|_____|_|_____|________________
  ~~~ 🌷 ÞRENGSLAVEGUR ~~~ 🌻  ~~~ 🌸 ~~~ 🌷
`,
  `
      ★     ★                  \\o/
                    ★           |    ~~
      ★                        ___
                              / ^ \\        ___
         ★        ★          | >o< |      |   |
                              \\   /       |   |
               ★           ____\\ /____    |   |
                          /    / \\    \\   |___|
         🌈 🌈           |     | |     |
_________________________|_____|_|_____|__________
  ~~~ 🌷  MOSFELLSBAKARÍ ~~~ 🌻  ~~~ 🌸 ~~~
`,
  `
    ★   ★   ★   ★                 \\o/
                         ★          |    ~~
    ★       ★                      ___
                                  / ^ \\
       ★       ★     ★           | >o< |
                                  \\   /
          ★       ★            ____\\ /____
                 🌈           /    / \\    \\
        🌈  🌈  🌈          |     | |     |
___________________________________| |_____|______
  ~~~ 🌷  ~~~ 🌻 LEAVING TOWN ~~~ 🌸 ~~~ 🌷
`,
  `
  ★ ★ ★ ★ ★ ★ ★ ★ ★                \\o/  WHEEE!
                            ★  ★      |
  ★   ★   ★   ★                     ___
                                    / ^ \\
     ★   ★   ★   ★   ★            | >o< |
                                    \\   /
        ★   ★   ★              _____\\ /______
                              /     / \\      \\
      🌈 🌈 🌈 🌈 🌈        |      | |       |
______________________________________|_|________|____
  ~~~ INTO THE SUNSET ~~~ 🌅 ~~~ 🌅 ~~~ 🌅 ~~~
`,
];

/* ═══════════════════════════════════════════
   SCENE 3: THE ASCENSION
   Unicorn takes flight, rises into the sky
   ═══════════════════════════════════════════ */
const scene3: string[] = [
  `


                                       \\o/
                                        |
                                       ___
                                      / ^ \\
                                     | >o< |
                                      \\   /
                                   ____\\ /____
                                  /    / \\    \\
                                 |     | |     |
_________________________________|_____|_|_____|______
 ^^^  ^^^  ^^^   EDGE OF MOSFELLSBÆR   ^^^  ^^^  ^^^
`,
  `

                                       \\o/
                                        |
                                       ___
                                      / ^ \\
                                     | >o< |
                                      \\   /
                                   ____\\ /____
                                  /    / \\    \\
                                 |     | |     |
                                    ___|_|___
__________________________________/          \\________
 ^^^  ^^^  ^^^  ^^^  LIFTOFF!  ^^^  ^^^  ^^^  ^^^
`,
  `
                                       \\o/
                                        |
                                       ___
                                      / ^ \\
                                     | >o< |
                                      \\   /
                                   ____\\ /____
                                  /    / \\    \\
                                 |     | |     |

                                        🌈
__________________________________________________
 ^^^  ^^^  ^^^  ^^^  ^^^  ^^^  ^^^  ^^^  ^^^  ^^^
`,
  `
                                       \\o/
                                        |
                                       ___
                                      / ^ \\
                                     | >o< |
                                      \\   /
                                   ____\\ /____
                                  /    / \\    \\

                                     🌈  🌈
                                   🌈  🌈  🌈
__________________________________________________
 ^^^  ^^^  ^^^  ^^^  ^^^  ^^^  ^^^  ^^^  ^^^  ^^^
`,
  `

                                       \\o/
                                        |
                                       ___
                                      / ^ \\
                                     | >o< |
                                      \\   /
                                   ____\\ /____

                                  🌈  🌈  🌈
                                🌈  🌈  🌈  🌈
                              🌈  🌈  🌈  🌈  🌈
__________________________________________________
`,
  `


                                       \\o/
                                        |
                                       ___
                                      / ^ \\
                                     | >o< |
                                      \\   /

                               🌈  🌈  🌈  🌈
                             🌈  🌈  🌈  🌈  🌈
                           🌈  🌈  🌈  🌈  🌈  🌈
__________________________________________________
`,
  `



                                       \\o/
                                        |
                                       ___
                                      / ^ \\
                                     | ^o^ |

                            🌈  🌈  🌈  🌈  🌈
                          🌈  🌈  🌈  🌈  🌈  🌈
                        🌈  🌈  🌈  🌈  🌈  🌈  🌈
__________________________________________________
`,
  `




                                      \\o/  ★
                                       |
                                      ___
                                     / ^ \\

                         🌈  🌈  🌈  🌈  🌈  🌈
                       🌈  🌈  🌈  🌈  🌈  🌈  🌈
                     🌈  🌈  🌈  🌈  🌈  🌈  🌈  🌈
__________________________________________________
`,
  `

                  ★           ★           ★

                        ★           ★

                              .  ★  .
                           ★  \\o/  ★
                               |
                         🌈  🌈 🌈  🌈  🌈  🌈
                       🌈  🌈  🌈  🌈  🌈  🌈  🌈
                     🌈  🌈  🌈  🌈  🌈  🌈  🌈  🌈
                   🌈  🌈  🌈  🌈  🌈  🌈  🌈  🌈  🌈
__________________________________________________
`,
  `
           ★        ★        ★        ★        ★
                ★        ★        ★        ★
           ★        ★        ★        ★        ★
                         ★  ★  ★
                       ★  G O N E  ★
                         ★  ★  ★
                    🌈  🌈  🌈  🌈  🌈  🌈  🌈
                  🌈  🌈  🌈  🌈  🌈  🌈  🌈  🌈
                🌈  🌈  🌈  🌈  🌈  🌈  🌈  🌈  🌈
              🌈  🌈  🌈  🌈  🌈  🌈  🌈  🌈  🌈  🌈
            🌈  🌈  🌈  🌈  🌈  🌈  🌈  🌈  🌈  🌈  🌈
__________________________________________________
`,
];

const misquotes = [
  { quote: "To be, or not to be — that is the password.", author: "— William Shakespeare (IT department)" },
  { quote: "One small step for man, one giant leap for a man on a unicorn.", author: "— Neil Armstrong (Mosfellsbær observatory)" },
  { quote: "The only thing we have to fear is running out of kleina.", author: "— Franklin D. Roosevelt (Bónus loyalty member)" },
];

const scenes = [
  { frames: scene1, title: "Chapter I: The Meeting", color: "text-cyan-400", subtitle: "Steinar finds his destiny in a field outside Mosfellsbær" },
  { frames: scene2, title: "Chapter II: The Ride", color: "text-pink-400", subtitle: "Through the streets at full gallop, leaving rainbows in his wake" },
  { frames: scene3, title: "Chapter III: The Ascension", color: "text-yellow-300", subtitle: "What goes up... doesn't always come down" },
];

/* ═══════════════════════════════════════════ */

function StickyScene({ frames, title, color, subtitle }: { frames: string[]; title: string; color: string; subtitle: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [frameIdx, setFrameIdx] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handler = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollable = containerRef.current.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const raw = -rect.top / scrollable;
      const clamped = Math.max(0, Math.min(1, raw));
      setProgress(clamped);
      setFrameIdx(Math.min(Math.floor(clamped * frames.length), frames.length - 1));
    };
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, [frames.length]);

  return (
    <div
      ref={containerRef}
      style={{ height: `${frames.length * 60 + 100}vh` }}
      className="relative"
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
        {/* Progress bar */}
        <div className="absolute top-4 left-4 right-4 sm:left-8 sm:right-8 z-20">
          <div className="flex items-center justify-between mb-2">
            <p className={`text-xs sm:text-sm font-bold ${color} glow-pulse`}>{title}</p>
            <p className="text-white/20 text-xs font-mono">{frameIdx + 1}/{frames.length}</p>
          </div>
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div className={`h-full rounded-full transition-all duration-100 ${color.replace("text-", "bg-")}`} style={{ width: `${progress * 100}%` }} />
          </div>
          <p className="text-white/20 text-[10px] sm:text-xs mt-2 italic">{subtitle}</p>
        </div>

        {/* ASCII frame */}
        <pre className={`${color} text-[6px] leading-[8px] sm:text-[10px] sm:leading-[13px] md:text-xs md:leading-[16px] lg:text-sm lg:leading-[18px] font-mono whitespace-pre transition-opacity duration-150 glow-pulse max-w-full overflow-x-auto`}>
          {frames[frameIdx]}
        </pre>

        {/* Scroll hint */}
        {progress < 0.1 && (
          <p className="absolute bottom-8 text-white/20 text-xs animate-bounce">↓ scroll to animate ↓</p>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════ */

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
    <main className="min-h-screen bg-[#06060a] text-white">
      {/* Cursor sparkle trail */}
      {trail.map((t, i) => (
        <div key={t.id} className="fixed pointer-events-none z-50" style={{ left: t.x - 8, top: t.y - 8, opacity: (i + 1) / trail.length, transform: `scale(${(i + 1) / trail.length})`, fontSize: 14 }}>✨</div>
      ))}

      {/* ===== HERO ===== */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 text-center relative">
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight mb-4">
          <span className="rainbow-text">Steinar Freyr</span><br />
          <span className="text-white/90">Kjartansson</span>
        </h1>
        <p className="text-lg sm:text-2xl text-white/40 font-light mb-2">The Unicorn Rider of Mosfellsbær</p>
        <p className="text-white/15 text-sm max-w-md mt-4">A scroll-driven ASCII saga in three chapters. Keep scrolling.</p>
        <p className="absolute bottom-8 text-white/20 text-sm animate-bounce">↓</p>
      </section>

      {/* ===== SCENE 1 ===== */}
      <StickyScene {...scenes[0]} />

      {/* ===== MISQUOTE 1 ===== */}
      <QuoteBreak {...misquotes[0]} />

      {/* ===== SCENE 2 ===== */}
      <StickyScene {...scenes[1]} />

      {/* ===== MISQUOTE 2 ===== */}
      <QuoteBreak {...misquotes[1]} />

      {/* ===== SCENE 3 ===== */}
      <StickyScene {...scenes[2]} />

      {/* ===== MISQUOTE 3 ===== */}
      <QuoteBreak {...misquotes[2]} />

      {/* ===== FINALE ===== */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
        <p className="text-6xl sm:text-8xl mb-8">🦄</p>
        <h2 className="text-3xl sm:text-5xl font-black rainbow-text glow-pulse mb-6">
          Long live Steinar Freyr.
        </h2>
        <p className="text-white/30 text-lg mb-1">Long live the unicorn.</p>
        <p className="text-white/30 text-lg mb-8">Long live Mosfellsbær.</p>
        <pre className="text-white/10 text-[8px] sm:text-xs font-mono">
{`
    *  .  *  .  *  .  *  .  *  .  *  .  *  .  *
 .     *     .     *     .     *     .     *     .
    *  .  *  .  *  FIN  *  .  *  .  *  .  *  .  *
 .     *     .     *     .     *     .     *     .
    *  .  *  .  *  .  *  .  *  .  *  .  *  .  *
`}
        </pre>
        <p className="text-white/10 text-xs mt-8">🌈 This page is blessed. 🌈</p>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-6 px-4 text-center text-white/10 text-xs">
        <p>100% factual. 🦄 &copy; 2026 Unicorn Preservation Society of Mosfellsbær</p>
      </footer>
    </main>
  );
}

function QuoteBreak({ quote, author }: { quote: string; author: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="min-h-[70vh] flex items-center justify-center px-4">
      <div className={`max-w-3xl text-center transition-all duration-1000 ${vis ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
        <p className="text-2xl sm:text-4xl md:text-5xl font-bold text-white/80 leading-tight mb-6">
          &ldquo;{quote}&rdquo;
        </p>
        <p className="text-white/25 text-sm italic">{author}</p>
      </div>
    </section>
  );
}
