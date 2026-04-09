export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-600 to-purple-700 text-white">
      <header className="p-6 flex justify-between items-center max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold tracking-tight">Frankenstein App</h1>
        <nav className="space-x-6 text-sm font-medium">
          <a href="#features" className="hover:underline">Features</a>
          <a href="#about" className="hover:underline">About</a>
          <a href="#contact" className="hover:underline">Contact</a>
        </nav>
      </header>

      <section className="flex flex-col items-center justify-center py-32 px-4 text-center">
        <h2 className="text-6xl font-extrabold mb-6 leading-tight">
          Welcome to the Future
        </h2>
        <p className="text-xl mb-8 max-w-2xl opacity-90">
          This app is being built live by AI, one prompt at a time.
        </p>
        <button className="bg-white text-purple-700 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors">
          Get Started
        </button>
      </section>

      <section id="features" className="py-20 px-4 bg-white/10">
        <h3 className="text-3xl font-bold text-center mb-12">Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="p-6 bg-white/10 rounded-xl backdrop-blur">
            <h4 className="text-xl font-semibold mb-2">Fast</h4>
            <p className="opacity-80">Built in real-time with AI assistance.</p>
          </div>
          <div className="p-6 bg-white/10 rounded-xl backdrop-blur">
            <h4 className="text-xl font-semibold mb-2">Beautiful</h4>
            <p className="opacity-80">Designed by committee. What could go wrong?</p>
          </div>
          <div className="p-6 bg-white/10 rounded-xl backdrop-blur">
            <h4 className="text-xl font-semibold mb-2">AI-Powered</h4>
            <p className="opacity-80">Every feature was prompted into existence.</p>
          </div>
        </div>
      </section>

      <footer className="p-8 text-center text-sm opacity-60">
        Built with chaos and Claude AI
      </footer>
    </main>
  );
}
