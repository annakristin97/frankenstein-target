"use client";

import { useEffect, useState, useRef } from "react";

const ASCII_STEINAR = `
              \\o/
               |
              / \\
        ~~~~~~~~~~~~~
       /               \\
      /  S T E I N A R  \\
     /   F R E Y R       \\
    /                      \\
   /   ★  LEGEND  ★         \\
  /    of Mosfellsbær        \\
 /___________________________\\
        ||          ||
        ||          ||
       ====        ====
`;

const ASCII_UNICORN = `
                              ,%%%,
                            ,%%%' %==--
                           ,%%'( '|
                          ,%%% /\\  |
                    ,%%%%%&%&&%% \\ |
               ,%&\\%&&%&&%&&&&  \\ |
              %&&%&%&/%&&%&\\%&  \\ |
              %&&%/ %&%%&&&&\\   | |   ╔══════════════════╗
              %&&% \\  %&&&&&    | |   ║  STEINAR  FREYR  ║
         ,--- %&\\  \\  %%&&&     ||    ║  rides at dawn    ║
        /     \\%&   \\  %&&      ||    ╚══════════════════╝
       /  \\    \\%    \\          ||
      |    \\    \\     \\     \\__/  \\__/
      |     \\    \\_____\\___/ \\      /
       \\     \\_____         /  \\  /
        \\         /________/    \\/
         \\_______/    \\   \\
                       \\   \\
                        ~   ~
`;

const ASCII_MOSFELLSBAER = `
                          /\\
                         /  \\           /\\
                /\\      /    \\    /\\   /  \\
          /\\   /  \\    /  ESJA\\  /  \\ / Mt.\\
         /  \\ /    \\  /________\\/    \\______\\
        /    \\______\\/                        \\
    ___/                                       \\___
   /                                               \\

      ___       ___       ___       ___
     | . |     |___|     | . |     |   |
     | . |     |   |     |___|     | . |
     |___|_____|___|_____|___|_____|___|_____
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
          M O S F E L L S B Æ R
       ~ where unicorns roam free ~
`;

const misquotes = [
  {
    quote: "To be, or not to be — that is the password.",
    author: "— William Shakespeare (IT department)",
  },
  {
    quote: "In the middle of difficulty lies opportunity. And also Steinar on a unicorn.",
    author: "— Albert Einstein (probably)",
  },
  {
    quote: "Ask not what your country can do for you — ask where Steinar parked the unicorn.",
    author: "— John F. Kennedy (Mosfellsbær branch)",
  },
  {
    quote: "The only thing we have to fear is fear itself. And running out of kleina.",
    author: "— Franklin D. Roosevelt (Bónus loyalty member)",
  },
];

const sparkles = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  top: `${Math.random() * 100}%`,
  delay: `${Math.random() * 3}s`,
  size: Math.random() * 20 + 10,
}));

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, visible };
}

function ParallaxSection({ children, speed = 0.3, className = "" }: { children: React.ReactNode; speed?: number; className?: string }) {
  const [offset, setOffset] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const viewH = window.innerHeight;
      const progress = (viewH - rect.top) / (viewH + rect.height);
      setOffset((progress - 0.5) * speed * 200);
    };
    window.addEventListener("scroll", handler, { passive: true });
    handler();
    return () => window.removeEventListener("scroll", handler);
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      <div style={{ transform: `translateY(${offset}px)` }}>
        {children}
      </div>
    </div>
  );
}

function AsciiSlide({ art, color }: { art: string; color: string }) {
  const { ref, visible } = useInView();
  return (
    <div ref={ref} className={`transition-all duration-1000 ${visible ? "slide-up" : "opacity-0 translate-y-16"}`}>
      <pre className={`${color} text-[8px] sm:text-xs md:text-sm leading-tight font-mono whitespace-pre overflow-x-auto glow-pulse`}>
        {art}
      </pre>
    </div>
  );
}

export default function Home() {
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let id = 0;
    const handler = (e: MouseEvent) => {
      setTrail((prev) => [...prev.slice(-12), { x: e.clientX, y: e.clientY, id: id++ }]);
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
    <main className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      {/* Cursor trail */}
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

      {/* Parallax star field */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {sparkles.map((s) => (
          <div
            key={s.id}
            className="absolute"
            style={{
              left: s.left,
              top: s.top,
              fontSize: s.size,
              animation: `sparkle 2s ease-in-out infinite`,
              animationDelay: s.delay,
              transform: `translateY(${scrollY * 0.1}px)`,
            }}
          >
            ✨
          </div>
        ))}
        {/* Slow parallax nebula blobs */}
        <div
          className="absolute top-[20%] left-[10%] w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[150px]"
          style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        />
        <div
          className="absolute top-[60%] right-[10%] w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[120px]"
          style={{ transform: `translateY(${scrollY * 0.08}px)` }}
        />
        <div
          className="absolute top-[40%] left-[50%] w-[350px] h-[350px] bg-pink-500/10 rounded-full blur-[130px]"
          style={{ transform: `translateY(${scrollY * 0.12}px)` }}
        />
      </div>

      {/* ===== HERO ===== */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-4 text-center z-10">
        <ParallaxSection speed={0.5}>
          <div className="relative">
            <div className="absolute top-10 right-10 sm:top-0 sm:right-0 text-5xl sm:text-7xl float-animation">☀️</div>
            <div className="absolute top-0 left-[10%] text-3xl sm:text-4xl float-animation" style={{ animationDelay: "1s" }}>☁️</div>
            <div className="absolute top-8 left-[55%] text-2xl sm:text-3xl float-animation" style={{ animationDelay: "2s" }}>☁️</div>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight mb-4">
            <span className="rainbow-text">Steinar Freyr</span>
            <br />
            <span className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">Kjartansson</span>
          </h1>
          <p className="text-xl sm:text-2xl font-bold text-white/70 mb-2">
            The Unicorn Rider of Mosfellsbær
          </p>
          <p className="text-base text-white/30 mb-4">scroll down for the bling ↓</p>
        </ParallaxSection>

        {/* Riding unicorn */}
        <div className="absolute bottom-20 ride-animation z-20">
          <div className="relative">
            <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-32 h-4 bg-gradient-to-r from-transparent via-red-400 to-violet-400 rounded-full opacity-60 blur-sm" />
            <div className="absolute -left-28 top-1/2 -translate-y-1/3 w-28 h-3 bg-gradient-to-r from-transparent via-yellow-400 to-green-400 rounded-full opacity-50 blur-sm" />
            <div className="text-center">
              <span className="text-2xl sm:text-4xl block -mb-2">🤠</span>
              <span className="text-4xl sm:text-6xl block">🦄</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0a0a0f] to-transparent z-10" />
      </section>

      {/* ===== ASCII SLIDE 1: STEINAR ===== */}
      <section className="relative z-10 py-20 sm:py-32 px-4">
        <ParallaxSection speed={0.4} className="max-w-4xl mx-auto">
          <div className="neon-border rounded-3xl bg-black/60 backdrop-blur-sm p-6 sm:p-12 text-center">
            <AsciiSlide art={ASCII_STEINAR} color="text-cyan-400" />
          </div>
        </ParallaxSection>
      </section>

      {/* ===== MISQUOTE 1 ===== */}
      <section className="relative z-10 py-16 sm:py-24 px-4">
        <ParallaxSection speed={0.2}>
          <QuoteBlock quote={misquotes[0].quote} author={misquotes[0].author} />
        </ParallaxSection>
      </section>

      {/* ===== ASCII SLIDE 2: UNICORN ===== */}
      <section className="relative z-10 py-20 sm:py-32 px-4">
        <ParallaxSection speed={0.5} className="max-w-4xl mx-auto">
          <div className="neon-border rounded-3xl bg-black/60 backdrop-blur-sm p-6 sm:p-12 text-center">
            <AsciiSlide art={ASCII_UNICORN} color="text-pink-400" />
          </div>
        </ParallaxSection>
      </section>

      {/* ===== MISQUOTE 2 ===== */}
      <section className="relative z-10 py-16 sm:py-24 px-4">
        <ParallaxSection speed={0.3}>
          <QuoteBlock quote={misquotes[1].quote} author={misquotes[1].author} />
        </ParallaxSection>
      </section>

      {/* ===== ASCII SLIDE 3: MOSFELLSBÆR ===== */}
      <section className="relative z-10 py-20 sm:py-32 px-4">
        <ParallaxSection speed={0.4} className="max-w-4xl mx-auto">
          <div className="neon-border rounded-3xl bg-black/60 backdrop-blur-sm p-6 sm:p-12 text-center">
            <AsciiSlide art={ASCII_MOSFELLSBAER} color="text-green-400" />
          </div>
        </ParallaxSection>
      </section>

      {/* ===== MISQUOTE 3 ===== */}
      <section className="relative z-10 py-16 sm:py-24 px-4">
        <ParallaxSection speed={0.2}>
          <QuoteBlock quote={misquotes[2].quote} author={misquotes[2].author} />
        </ParallaxSection>
      </section>

      {/* ===== THE LEGEND (kept) ===== */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 relative z-10">
        <ParallaxSection speed={0.3}>
          <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 p-8 sm:p-14">
            <h2 className="text-3xl sm:text-5xl font-black mb-8 text-center">
              The Legend of <span className="rainbow-text">Steinar Freyr</span>
            </h2>
            <div className="space-y-6 text-white/60 text-base sm:text-lg leading-relaxed">
              <p>It was an ordinary spring morning in Mosfellsbær. The birds were singing, Esja was glowing in the sunrise, and the sheep were doing absolutely nothing — as sheep do.</p>
              <p>Then, from behind Álafosskvos, a blinding rainbow erupted. The ground trembled. Dogs howled. A single Bónus bag rolled across Þrengslavegur like a tumbleweed.</p>
              <p>And there he was. <strong className="text-white">Steinar Freyr Kjartansson</strong>, astride a magnificent unicorn with a mane of pure starlight. He rode down Háholt at full gallop, leaving a trail of rainbows and the faint scent of kleina.</p>
              <p>Witnesses say he winked at a traffic camera near Mosfellsbakarí, and the camera blushed so hard it deleted the footage.</p>
            </div>
          </div>
        </ParallaxSection>
      </section>

      {/* ===== MISQUOTE 4 ===== */}
      <section className="relative z-10 py-16 sm:py-24 px-4">
        <ParallaxSection speed={0.2}>
          <QuoteBlock quote={misquotes[3].quote} author={misquotes[3].author} />
        </ParallaxSection>
      </section>

      {/* ===== FACTS ===== */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 relative z-10">
        <ParallaxSection speed={0.2}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-black text-center mb-12 rainbow-text">
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
                  className="bg-white/5 border border-white/10 rounded-2xl p-5 flex items-start gap-4 hover:bg-white/10 hover:scale-105 hover:border-white/20 transition-all duration-300"
                >
                  <span className="text-3xl shrink-0">{item.emoji}</span>
                  <p className="font-semibold text-white/80">{item.fact}</p>
                </div>
              ))}
            </div>
          </div>
        </ParallaxSection>
      </section>

      {/* ===== GRAND FINALE ===== */}
      <section className="py-20 sm:py-32 px-4 text-center relative z-10">
        <ParallaxSection speed={0.5}>
          <p className="text-6xl sm:text-8xl mb-6 float-animation">🦄</p>
          <h2 className="text-3xl sm:text-5xl font-black mb-4 rainbow-text glow-pulse">
            Long live Steinar Freyr.
          </h2>
          <p className="text-white/50 text-lg sm:text-xl mb-2">Long live the unicorn.</p>
          <p className="text-white/50 text-lg sm:text-xl">Long live Mosfellsbær.</p>
          <p className="text-white/20 text-sm mt-8">
            🌈 This page is blessed. Your device now runs 12% faster. You&apos;re welcome. 🌈
          </p>
        </ParallaxSection>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-6 px-4 text-center text-white/20 text-xs relative z-10">
        <p>This is a 100% factual and legally binding account of events in Mosfellsbær.</p>
        <p className="mt-1">🦄 &copy; 2026 — The Unicorn Preservation Society of Mosfellsbær</p>
      </footer>
    </main>
  );
}

function QuoteBlock({ quote, author }: { quote: string; author: string }) {
  const { ref, visible } = useInView();
  return (
    <div ref={ref} className={`max-w-3xl mx-auto text-center transition-all duration-1000 ${visible ? "slide-up" : "opacity-0 translate-y-16"}`}>
      <p className="text-2xl sm:text-4xl md:text-5xl font-bold text-white/90 leading-tight mb-6 [text-shadow:_0_0_30px_rgba(255,255,255,0.1)]">
        &ldquo;{quote}&rdquo;
      </p>
      <p className="text-white/30 text-sm sm:text-base italic">{author}</p>
    </div>
  );
}
