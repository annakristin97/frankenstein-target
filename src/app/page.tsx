export default function Home() {
  return (
    <main className="min-h-screen bg-[#003897] text-white">
      {/* Icelandic cross stripe across the top */}
      <div className="w-full h-4 bg-white" />
      <div className="w-full h-3 bg-[#d72828]" />

      <header className="p-6 flex justify-between items-center max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <span className="text-[#d72828] font-black">✦</span> Frankenstein App
        </h1>
        <nav className="space-x-6 text-sm font-medium">
          <a href="#features" className="hover:text-[#d72828] transition-colors">Features</a>
          <a href="#about" className="hover:text-[#d72828] transition-colors">About</a>
          <a href="#contact" className="hover:text-[#d72828] transition-colors">Contact</a>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center py-32 px-4 text-center overflow-hidden">
        {/* Decorative vertical cross stripe */}
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 flex">
          <div className="w-16 bg-white/5" />
          <div className="w-10 bg-[#d72828]/10" />
          <div className="w-16 bg-white/5" />
        </div>

        <h2 className="relative text-6xl font-extrabold mb-6 leading-tight">
          <span className="text-white">Welcome to the </span>
          <span className="text-[#d72828]">Future</span>
        </h2>
        <p className="relative text-xl mb-8 max-w-2xl text-white/80">
          This app is being built live by AI, one prompt at a time.
        </p>
        <button className="relative bg-[#d72828] text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-red-600 transition-colors shadow-lg shadow-black/30 border-2 border-white/20">
          Get Started
        </button>
      </section>

      {/* Horizontal cross stripe divider */}
      <div className="w-full h-3 bg-[#d72828]" />
      <div className="w-full h-2 bg-white" />
      <div className="w-full h-3 bg-[#d72828]" />

      {/* Features */}
      <section id="features" className="py-20 px-4 bg-[#002d7a]">
        <h3 className="text-3xl font-bold text-center mb-12 text-white">Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="p-6 bg-[#003897] rounded-xl border border-white/20 shadow-lg">
            <div className="w-8 h-1 bg-[#d72828] mb-4 rounded" />
            <h4 className="text-xl font-semibold mb-2 text-white">Fast</h4>
            <p className="text-white/70">Built in real-time with AI assistance.</p>
          </div>
          <div className="p-6 bg-[#003897] rounded-xl border border-white/20 shadow-lg">
            <div className="w-8 h-1 bg-[#d72828] mb-4 rounded" />
            <h4 className="text-xl font-semibold mb-2 text-white">Beautiful</h4>
            <p className="text-white/70">Designed by committee. What could go wrong?</p>
          </div>
          <div className="p-6 bg-[#003897] rounded-xl border border-white/20 shadow-lg">
            <div className="w-8 h-1 bg-[#d72828] mb-4 rounded" />
            <h4 className="text-xl font-semibold mb-2 text-white">AI-Powered</h4>
            <p className="text-white/70">Every feature was prompted into existence.</p>
          </div>
        </div>
      </section>

      {/* Bottom cross stripe */}
      <div className="w-full h-3 bg-[#d72828]" />
      <div className="w-full h-2 bg-white" />
      <div className="w-full h-3 bg-[#d72828]" />

      <footer className="p-8 text-center text-sm text-white/50 bg-[#002266]">
        Built with chaos and Claude AI &nbsp;·&nbsp; <span className="text-[#d72828]">🇮🇸</span>
      </footer>
    </main>
  );
}
