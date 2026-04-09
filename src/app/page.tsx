"use client";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#003897] text-white overflow-x-hidden">

      {/* STROBING TOP BANNER */}
      <div className="w-full overflow-hidden bg-black py-2">
        <div className="marquee whitespace-nowrap text-yellow-300 font-black text-lg tracking-widest uppercase">
          🪩 DISCO ICELAND 🇮🇸 &nbsp;&nbsp;&nbsp; ✨ HALLO HALLO HALLO ✨ &nbsp;&nbsp;&nbsp; 🎉 FRANKENSTEIN APP 🎉 &nbsp;&nbsp;&nbsp; 🔴⚪🔵 RAUTT HVÍTT BLÁTT 🔵⚪🔴 &nbsp;&nbsp;&nbsp; 🪩 DISCO ICELAND 🇮🇸 &nbsp;&nbsp;&nbsp; ✨ HALLO HALLO HALLO ✨
        </div>
      </div>

      {/* Icelandic cross stripe — FLASHING */}
      <div className="w-full h-5 bg-white strobe" />
      <div className="w-full h-4 bg-[#d72828] zigzag" />
      <div className="w-full h-5 bg-white strobe" style={{ animationDelay: "0.2s" }} />

      {/* HEADER */}
      <header className="p-6 flex justify-between items-center max-w-6xl mx-auto">
        <h1 className="text-2xl font-black tracking-tight flex items-center gap-3">
          <span className="disco-spin inline-block text-3xl">🪩</span>
          <span className="neon-pulse text-white">Frankenstein App</span>
          <span className="spin-slow inline-block text-2xl">⭐</span>
        </h1>
        <nav className="space-x-6 text-sm font-black uppercase tracking-widest">
          <a href="#features" className="color-cycle hover:scale-125 inline-block transition-transform">Features</a>
          <a href="#about" className="color-cycle inline-block transition-transform" style={{ animationDelay: "0.33s" }}>About</a>
          <a href="#contact" className="color-cycle inline-block transition-transform" style={{ animationDelay: "0.66s" }}>Contact</a>
        </nav>
      </header>

      {/* HERO */}
      <section className="relative flex flex-col items-center justify-center py-32 px-4 text-center overflow-hidden">

        {/* Spinning disco cross stripes behind */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[800px] h-[800px] disco-spin opacity-10">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-16 bg-white" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-full bg-[#d72828]" />
            </div>
          </div>
        </div>

        {/* BIG DISCO BALL */}
        <div className="explode-in text-9xl mb-6 glitter">🪩</div>

        <h2 className="relative text-7xl font-black mb-6 leading-tight uppercase tracking-tight">
          <span className="neon-pulse text-white block">VELKOMIN Í</span>
          <span
            className="text-[#d72828] block bounce-wild"
            style={{
              textShadow: "0 0 20px #d72828, 0 0 40px #d72828, 0 0 80px #d72828, 4px 4px 0 #ffffff"
            }}
          >
            DISCO FUTURE!!!
          </span>
        </h2>

        <p className="relative text-2xl mb-4 max-w-2xl font-bold color-cycle uppercase tracking-wider">
          🔥 This app is being built LIVE by AI 🔥
        </p>
        <p className="relative text-lg mb-10 max-w-xl text-white/80 zigzag">
          One chaotic prompt at a time. Buckle up. 🎊
        </p>

        <div className="flex gap-4 flex-wrap justify-center">
          <button
            className="relative bg-[#d72828] text-white px-10 py-4 rounded-full text-xl font-black hover:scale-110 transition-transform shadow-2xl bounce-wild uppercase tracking-widest"
            style={{ boxShadow: "0 0 20px #d72828, 0 0 40px #d72828, 4px 4px 0 #003897" }}
          >
            🕺 GET STARTED
          </button>
          <button
            className="relative bg-white text-[#003897] px-10 py-4 rounded-full text-xl font-black hover:scale-110 transition-transform shadow-2xl uppercase tracking-widest"
            style={{ boxShadow: "0 0 20px #fff, 0 0 40px #003897, 4px 4px 0 #d72828", animationDelay: "0.5s" }}
          >
            💃 LET&apos;S GOOO
          </button>
        </div>

        {/* Floating emoji crowd */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-around pointer-events-none text-4xl">
          {["🕺", "💃", "🎉", "⭐", "🪩", "🎊", "🔥", "🇮🇸"].map((e, i) => (
            <span
              key={i}
              className="bounce-wild opacity-60"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              {e}
            </span>
          ))}
        </div>
      </section>

      {/* MEGA DIVIDER */}
      <div className="w-full overflow-hidden bg-[#d72828] py-3">
        <div className="marquee whitespace-nowrap font-black text-white text-2xl uppercase tracking-[0.5em]">
          ⭐ FEATURES ⭐ &nbsp;&nbsp;&nbsp; ⭐ FEATURES ⭐ &nbsp;&nbsp;&nbsp; ⭐ FEATURES ⭐ &nbsp;&nbsp;&nbsp; ⭐ FEATURES ⭐ &nbsp;&nbsp;&nbsp; ⭐ FEATURES ⭐
        </div>
      </div>

      {/* FEATURES */}
      <section id="features" className="py-20 px-4 bg-[#002d7a]">
        <h3
          className="text-5xl font-black text-center mb-16 uppercase tracking-widest neon-pulse"
          style={{ textShadow: "4px 4px 0 #d72828" }}
        >
          🎆 FEATURES 🎆
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">

          {[
            { icon: "⚡", title: "FAST AS LIGHTNING", desc: "Built in real-time with AI assistance. ZOOM ZOOM.", delay: "0s" },
            { icon: "🌈", title: "BEAUTIFUL CHAOS", desc: "Designed by committee. What could go wrong?? NOTHING. EVERYTHING. 🔥", delay: "0.2s" },
            { icon: "🤖", title: "AI-POWERED MADNESS", desc: "Every. Single. Feature. Was PROMPTED into existence. Believe it.", delay: "0.4s" },
          ].map(({ icon, title, desc, delay }, i) => (
            <div
              key={i}
              className="p-8 bg-[#003897] rounded-2xl card-flash"
              style={{ animationDelay: delay }}
            >
              <div
                className="text-5xl mb-4 bounce-wild inline-block"
                style={{ animationDelay: delay }}
              >
                {icon}
              </div>
              <h4
                className="text-2xl font-black mb-3 uppercase tracking-wide"
                style={{ textShadow: "2px 2px 0 #d72828" }}
              >
                {title}
              </h4>
              <p className="text-white/80 text-base font-medium">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM MARQUEE */}
      <div className="w-full overflow-hidden bg-black py-3">
        <div className="marquee whitespace-nowrap font-black text-[#d72828] text-xl uppercase tracking-[0.3em]" style={{ animationDirection: "reverse" }}>
          🇮🇸 ÍSLAND 🇮🇸 &nbsp;&nbsp;&nbsp; 🪩 DISCO PARTY 🪩 &nbsp;&nbsp;&nbsp; 🔴 RAUTT 🔴 &nbsp;&nbsp;&nbsp; ⚪ HVÍTT ⚪ &nbsp;&nbsp;&nbsp; 🔵 BLÁTT 🔵 &nbsp;&nbsp;&nbsp; 🇮🇸 ÍSLAND 🇮🇸 &nbsp;&nbsp;&nbsp; 🪩 DISCO PARTY 🪩
        </div>
      </div>

      {/* Cross stripes footer border */}
      <div className="w-full h-5 bg-[#d72828] strobe" />
      <div className="w-full h-3 bg-white strobe" style={{ animationDelay: "0.2s" }} />
      <div className="w-full h-5 bg-[#d72828] strobe" style={{ animationDelay: "0.1s" }} />

      <footer className="p-10 text-center text-sm font-bold bg-black">
        <div className="glitter text-5xl mb-3">🪩</div>
        <div className="color-cycle text-lg uppercase tracking-widest font-black">
          Built with CHAOS, DISCO &amp; Claude AI
        </div>
        <div className="mt-2 text-white/40">
          🇮🇸 &nbsp; Frankenstein App &nbsp; — &nbsp; 100% AI-generated mayhem &nbsp; 🇮🇸
        </div>
      </footer>
    </main>
  );
}
