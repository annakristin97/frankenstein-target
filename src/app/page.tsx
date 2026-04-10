export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-lime-400/30 selection:text-lime-200">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-[#0a0a0a]/80 border-b border-white/5">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🦈</span>
            <span className="text-lg font-semibold tracking-tight">Shark Box</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-white/60 font-medium">
            <a href="#plans" className="hover:text-white transition-colors">Plans</a>
            <a href="#whats-inside" className="hover:text-white transition-colors">What&apos;s Inside</a>
            <a href="#reviews" className="hover:text-white transition-colors">Reviews</a>
          </div>
          <a
            href="#plans"
            className="bg-lime-400 text-black text-sm font-semibold px-5 py-2 rounded-full hover:bg-lime-300 transition-colors"
          >
            Subscribe
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/40 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-lime-500/5 blur-[120px]" />

        <div className="relative z-10">
          <p className="text-lime-400 text-sm font-semibold tracking-[0.3em] uppercase mb-6">
            Introducing Shark Box
          </p>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight leading-[0.9] mb-6">
            Luxury<br />
            <span className="bg-gradient-to-r from-lime-300 via-emerald-400 to-teal-500 bg-clip-text text-transparent">
              Decomposition.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/50 max-w-2xl mx-auto mb-4 font-light">
            The world&apos;s first premium rotting fish subscription.
          </p>
          <p className="text-lg text-white/30 max-w-xl mx-auto mb-10">
            Hand-selected, artisanally aged seafood — delivered to your door in a stunning matte-black box you&apos;ll want to display. Until you open it.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#plans"
              className="bg-lime-400 text-black font-semibold px-8 py-4 rounded-full text-lg hover:bg-lime-300 transition-colors hover:scale-105 transform"
            >
              Start Rotting — $49/mo
            </a>
            <a
              href="#whats-inside"
              className="border border-white/20 text-white font-semibold px-8 py-4 rounded-full text-lg hover:bg-white/5 transition-colors"
            >
              Smell the Difference
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
            <div className="w-1.5 h-1.5 bg-lime-400 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Tagline strip */}
      <section className="border-y border-white/5 py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">
            Think different.{" "}
            <span className="text-white/30">Think rancid.</span>
          </p>
        </div>
      </section>

      {/* What's Inside */}
      <section id="whats-inside" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-lime-400 text-sm font-semibold tracking-[0.3em] uppercase mb-4 text-center">
            What&apos;s Inside
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-6 tracking-tight">
            Curated. Aged. Unforgettable.
          </h2>
          <p className="text-white/40 text-center max-w-2xl mx-auto mb-20 text-lg">
            Every Shark Box is a masterclass in controlled decay, packaged with the precision of a Swiss timepiece and the aroma of a harbour at low tide.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "🐟",
                title: "The Centrepiece",
                desc: "One whole fish, aged 14–21 days to peak putrefaction. Wrapped in biodegradable silk. Species varies by season.",
                tag: "SIGNATURE",
              },
              {
                icon: "🧪",
                title: "The Essence",
                desc: "A 30ml vial of concentrated fish oil extract. Use as cologne, room fragrance, or conversation starter.",
                tag: "EXCLUSIVE",
              },
              {
                icon: "🧂",
                title: "The Garnish",
                desc: "Artisan fermented fish salt, hand-harvested from decaying Nordic catch. Pairs beautifully with regret.",
                tag: "LIMITED",
              },
              {
                icon: "📜",
                title: "The Certificate",
                desc: "A signed provenance card detailing your fish's origin, species, and exact decomposition timeline.",
                tag: "AUTHENTIC",
              },
              {
                icon: "🕯️",
                title: "The Candle",
                desc: "A soy wax candle infused with subtle marine decay notes. Burns for 40 hours. Lingers for weeks.",
                tag: "HANDMADE",
              },
              {
                icon: "📦",
                title: "The Box",
                desc: "Matte black, soft-touch finish, magnetic closure. So beautiful you'll forget what's rotting inside.",
                tag: "ICONIC",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group relative bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 hover:bg-white/[0.06] hover:border-lime-400/20 transition-all duration-300"
              >
                <span className="absolute top-4 right-4 text-[10px] font-bold tracking-[0.2em] text-lime-400/60 bg-lime-400/10 px-2 py-1 rounded-full">
                  {item.tag}
                </span>
                <span className="text-4xl mb-4 block">{item.icon}</span>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Big quote */}
      <section className="py-24 px-6 bg-gradient-to-b from-transparent via-emerald-950/20 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
            &ldquo;The <span className="bg-gradient-to-r from-lime-300 to-emerald-400 bg-clip-text text-transparent">future of luxury</span> doesn&apos;t smell like roses.&rdquo;
          </p>
          <p className="text-white/30 mt-8 text-lg">— Shark Box Founder, probably</p>
        </div>
      </section>

      {/* Plans */}
      <section id="plans" className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-lime-400 text-sm font-semibold tracking-[0.3em] uppercase mb-4 text-center">
            Choose Your Rot
          </p>
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-6 tracking-tight">
            Subscription Plans
          </h2>
          <p className="text-white/40 text-center max-w-xl mx-auto mb-16 text-lg">
            All plans include free shipping. No returns. Obviously.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Mildly Off",
                price: "$49",
                period: "/month",
                desc: "For the curious. A gentle introduction to luxury rot.",
                features: [
                  "1 fish, lightly aged (7 days)",
                  "Fish salt sachet",
                  "Provenance card",
                  "Standard black box",
                  "Email support",
                ],
                cta: "Start Mild",
                highlight: false,
              },
              {
                name: "Fully Rancid",
                price: "$99",
                period: "/month",
                desc: "Our most popular tier. Peak decomposition.",
                features: [
                  "1 fish, peak aged (21 days)",
                  "Fish essence vial",
                  "Decay candle",
                  "Fish salt (full jar)",
                  "Premium magnetic box",
                  "Priority support",
                ],
                cta: "Go Rancid",
                highlight: true,
              },
              {
                name: "Biohazard",
                price: "$249",
                period: "/month",
                desc: "For the connoisseur. Legally questionable freshness.",
                features: [
                  "3 fish, extreme aged (30+ days)",
                  "Double essence vials",
                  "Limited edition candle",
                  "Hazmat gloves included",
                  "Collector's box with lock",
                  "24/7 phone support",
                  "Liability waiver included",
                ],
                cta: "Risk It All",
                highlight: false,
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl p-8 flex flex-col ${
                  plan.highlight
                    ? "bg-gradient-to-b from-lime-400/10 to-emerald-400/5 border-2 border-lime-400/30 scale-105"
                    : "bg-white/[0.03] border border-white/[0.06]"
                }`}
              >
                {plan.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-lime-400 text-black text-xs font-bold px-4 py-1 rounded-full tracking-wider">
                    MOST PUNGENT
                  </span>
                )}
                <h3 className="text-xl font-semibold mb-1">{plan.name}</h3>
                <p className="text-white/40 text-sm mb-6">{plan.desc}</p>
                <div className="mb-6">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  <span className="text-white/40">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-white/60">
                      <span className="text-lime-400 mt-0.5">&#10003;</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-full font-semibold transition-colors ${
                    plan.highlight
                      ? "bg-lime-400 text-black hover:bg-lime-300"
                      : "border border-white/20 text-white hover:bg-white/5"
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="py-32 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <p className="text-lime-400 text-sm font-semibold tracking-[0.3em] uppercase mb-4 text-center">
            Testimonials
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 tracking-tight">
            What Our Subscribers Say
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "My neighbours called the authorities. That's how you know it's authentic luxury.",
                name: "Sigga B.",
                title: "Biohazard Subscriber",
                stars: 5,
              },
              {
                quote: "I've never received so many concerned texts from friends and family. The candle alone cleared a room in under 4 minutes.",
                name: "Jón G.",
                title: "Fully Rancid Subscriber",
                stars: 5,
              },
              {
                quote: "The unboxing experience is genuinely world-class. The box is beautiful. I cannot say the same for the contents or the smell.",
                name: "Helga K.",
                title: "Mildly Off Subscriber",
                stars: 4,
              },
            ].map((r) => (
              <div
                key={r.name}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: r.stars }).map((_, i) => (
                    <span key={i} className="text-lime-400">&#9733;</span>
                  ))}
                  {Array.from({ length: 5 - r.stars }).map((_, i) => (
                    <span key={i} className="text-white/10">&#9733;</span>
                  ))}
                </div>
                <p className="text-white/70 text-sm leading-relaxed mb-6 italic">
                  &ldquo;{r.quote}&rdquo;
                </p>
                <div>
                  <p className="font-semibold text-sm">{r.name}</p>
                  <p className="text-white/30 text-xs">{r.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-6xl mb-6 block">🦈</span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Ready to rot?
          </h2>
          <p className="text-white/40 text-lg mb-10 max-w-xl mx-auto">
            Join thousands of subscribers who&apos;ve embraced the stench of luxury. Cancel anytime — the smell won&apos;t.
          </p>
          <a
            href="#plans"
            className="inline-block bg-lime-400 text-black font-semibold px-10 py-4 rounded-full text-lg hover:bg-lime-300 transition-colors hover:scale-105 transform"
          >
            Subscribe Now
          </a>
          <p className="text-white/20 text-xs mt-6">
            Free shipping worldwide. Hazmat surcharge may apply in select regions.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-xl">🦈</span>
            <span className="font-semibold">Shark Box</span>
            <span className="text-white/20 text-sm ml-2">&copy; 2026</span>
          </div>
          <div className="flex gap-8 text-sm text-white/30">
            <a href="#" className="hover:text-white/60 transition-colors">Privacy</a>
            <a href="#" className="hover:text-white/60 transition-colors">Terms</a>
            <a href="#" className="hover:text-white/60 transition-colors">Refund Policy (lol)</a>
            <a href="#" className="hover:text-white/60 transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
