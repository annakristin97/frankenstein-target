"use client";

import { useState } from "react";

const services = [
  {
    icon: "🛡️",
    title: "Netöryggi",
    subtitle: "Cybersecurity",
    desc: "24/7 threat monitoring, penetration testing, and incident response. We find the holes before the hackers do.",
    features: ["SOC-as-a-Service", "Vulnerability scanning", "Incident response", "Security training"],
  },
  {
    icon: "☁️",
    title: "Skýjalausnir",
    subtitle: "Cloud Solutions",
    desc: "Azure, AWS, or hybrid — we architect, migrate, and manage your cloud so you can stop babysitting servers.",
    features: ["Cloud migration", "Infrastructure as Code", "Cost optimization", "Multi-cloud strategy"],
  },
  {
    icon: "🖥️",
    title: "Stýrð þjónusta",
    subtitle: "Managed IT",
    desc: "Your entire IT department, without the drama. Helpdesk, monitoring, patching, and everything in between.",
    features: ["24/7 helpdesk", "Remote monitoring", "Patch management", "Asset tracking"],
  },
  {
    icon: "🔌",
    title: "Innviðir",
    subtitle: "Infrastructure",
    desc: "Networks, servers, and data centers designed by people who actually understand uptime SLAs.",
    features: ["Network design", "Server deployment", "Backup & DR", "Virtualization"],
  },
  {
    icon: "💻",
    title: "Hugbúnaður",
    subtitle: "Software Dev",
    desc: "Custom software, integrations, and automation. If it can be coded, we build it. If it shouldn't be coded, we tell you.",
    features: ["Custom applications", "API integrations", "Process automation", "Legacy modernization"],
  },
  {
    icon: "📊",
    title: "Ráðgjöf",
    subtitle: "IT Consulting",
    desc: "Strategy that isn't just a PowerPoint. Real roadmaps, real budgets, real results.",
    features: ["IT strategy", "Digital transformation", "Vendor management", "Compliance (GDPR/NIS2)"],
  },
];

const stats = [
  { value: "99.97%", label: "Uptime SLA" },
  { value: "< 15 min", label: "Avg response time" },
  { value: "200+", label: "Businesses served" },
  { value: "0", label: "Ragnarök incidents" },
];

const testimonials = [
  {
    quote: "We switched from Gagnverk and our ticket resolution time dropped by 60%. Should have done it years ago.",
    name: "Kristín S.",
    role: "CTO, Norðurljós Software",
  },
  {
    quote: "They migrated our entire on-prem setup to Azure in a weekend. Zero downtime. I thought they were joking when they proposed the timeline.",
    name: "Bjarni H.",
    role: "IT Manager, Fiskiðjan ehf",
  },
  {
    quote: "Finally, an IT company that picks up the phone. And actually fixes things. Revolutionary concept apparently.",
    name: "Sigríður M.",
    role: "CEO, Reykjavík Retail Group",
  },
];

const faqs = [
  {
    q: "Why should we switch from Gagnverk?",
    a: "Better response times, transparent pricing, modern tooling, and we actually answer the phone. We've migrated dozens of companies from legacy providers — we make it painless.",
  },
  {
    q: "What's the onboarding process?",
    a: "We audit your current setup (free), build a transition plan, and execute the migration with zero downtime. Most companies are fully onboarded in 2-4 weeks.",
  },
  {
    q: "Do you support companies outside Reykjavík?",
    a: "Yes. We support businesses across all of Iceland, plus remote teams internationally. Our NOC operates 24/7 regardless of your timezone.",
  },
  {
    q: "What if something breaks at 3 AM?",
    a: "We fix it at 3 AM. Our managed service plans include 24/7 monitoring and emergency response. You sleep, we don't.",
  },
  {
    q: "How is your pricing structured?",
    a: "Per-user, per-month, all-inclusive. No hidden fees, no surprise invoices, no 'oh that's a separate contract.' You get one bill.",
  },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-[#fafbfc] text-gray-900">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/60">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              G
            </div>
            <span className="text-xl font-bold tracking-tight">Gagnavél</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-500 font-medium">
            <a href="#services" className="hover:text-gray-900 transition-colors">Þjónusta</a>
            <a href="#why-us" className="hover:text-gray-900 transition-colors">Af hverju við</a>
            <a href="#testimonials" className="hover:text-gray-900 transition-colors">Viðbrögð</a>
            <a href="#faq" className="hover:text-gray-900 transition-colors">Spurningar</a>
          </div>
          <div className="flex items-center gap-3">
            <a href="#contact" className="hidden sm:inline-block text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Hafa samband
            </a>
            <a
              href="#contact"
              className="bg-blue-600 text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Fá tilboð
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 sm:pt-40 pb-20 sm:pb-32 px-4 sm:px-6 overflow-hidden">
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-blue-100 rounded-full blur-[120px] opacity-50" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-100 rounded-full blur-[100px] opacity-40" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              Now serving 200+ Icelandic businesses
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.05] mb-6">
              IT þjónusta sem{" "}
              <span className="text-blue-600">virkar í alvöru.</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mb-8 leading-relaxed">
              Managed IT, cloud, cybersecurity, and consulting for Icelandic businesses that are done with slow tickets and surprise invoices. We&apos;re the upgrade you&apos;ve been waiting for.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#contact"
                className="bg-blue-600 text-white font-semibold px-8 py-4 rounded-xl text-lg hover:bg-blue-700 transition-colors text-center"
              >
                Fá ókeypis úttekt
              </a>
              <a
                href="#services"
                className="border border-gray-300 text-gray-700 font-semibold px-8 py-4 rounded-xl text-lg hover:bg-gray-50 transition-colors text-center"
              >
                Sjá þjónustu
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-gray-200 bg-white py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-blue-600 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 sm:py-32 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-blue-600 text-sm font-semibold tracking-wider uppercase mb-3">Þjónusta</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Everything IT, under one roof
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              No more juggling five vendors. One partner, one contract, one team that knows your entire stack.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 hover:shadow-lg hover:border-blue-200 transition-all duration-300 group"
              >
                <span className="text-3xl mb-4 block">{service.icon}</span>
                <h3 className="text-xl font-bold mb-1">{service.title}</h3>
                <p className="text-blue-600 text-sm font-medium mb-3">{service.subtitle}</p>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">{service.desc}</p>
                <ul className="space-y-2">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="text-blue-500 text-xs">&#9679;</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us / vs Gagnverk */}
      <section id="why-us" className="py-20 sm:py-32 px-4 sm:px-6 bg-gray-950 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-blue-400 text-sm font-semibold tracking-wider uppercase mb-3">Af hverju Gagnavél?</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
              The honest comparison
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              We know you&apos;re comparing. So here&apos;s the cheat sheet.
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-3 text-sm font-bold border-b border-white/10">
              <div className="p-4 sm:p-6" />
              <div className="p-4 sm:p-6 text-center text-gray-400">The Other Guys</div>
              <div className="p-4 sm:p-6 text-center text-blue-400">Gagnavél</div>
            </div>
            {[
              { feature: "Response time", old: "4-8 hours", new: "< 15 min" },
              { feature: "24/7 support", old: "Extra cost", new: "Included" },
              { feature: "Pricing model", old: "Per-incident", new: "Flat per-user" },
              { feature: "Cloud expertise", old: "Basic", new: "Azure & AWS certified" },
              { feature: "Security", old: "Antivirus", new: "Full SOC + pen testing" },
              { feature: "Contract length", old: "36 months", new: "Month-to-month" },
              { feature: "Onboarding time", old: "2-3 months", new: "2-4 weeks" },
              { feature: "Hidden fees", old: "Yes", new: "Never" },
            ].map((row, i) => (
              <div
                key={row.feature}
                className={`grid grid-cols-3 text-sm ${
                  i % 2 === 0 ? "bg-white/[0.02]" : ""
                } border-b border-white/5 last:border-0`}
              >
                <div className="p-3 sm:p-5 font-medium text-white/80">{row.feature}</div>
                <div className="p-3 sm:p-5 text-center text-gray-500">{row.old}</div>
                <div className="p-3 sm:p-5 text-center text-blue-400 font-semibold">{row.new}</div>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-500 text-sm mt-8">
            We won&apos;t name names. But you already know.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 sm:py-32 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-blue-600 text-sm font-semibold tracking-wider uppercase mb-3">Viðbrögð</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Companies that made the switch
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 hover:shadow-md transition-shadow"
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">&#9733;</span>
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="font-semibold text-sm">{t.name}</p>
                  <p className="text-gray-400 text-xs">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 sm:py-32 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-blue-600 text-sm font-semibold tracking-wider uppercase mb-3">Spurningar</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Algengar spurningar
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-sm sm:text-base pr-4">{faq.q}</span>
                  <span className={`text-gray-400 text-xl shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`}>
                    +
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                    <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-20 sm:py-32 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-blue-600 rounded-3xl p-8 sm:p-16 text-center text-white pulse-glow">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Tilbúin að skipta?
            </h2>
            <p className="text-blue-100 text-lg max-w-xl mx-auto mb-8">
              Get a free audit of your current IT setup. We&apos;ll show you exactly what you&apos;re paying for, what you&apos;re missing, and what we&apos;d do differently. No strings attached.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="mailto:hey@gagnavelehf.is"
                className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-xl text-lg hover:bg-blue-50 transition-colors"
              >
                hey@gagnavelehf.is
              </a>
              <a
                href="tel:+3545551234"
                className="border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-xl text-lg hover:bg-white/10 transition-colors"
              >
                555-1234
              </a>
            </div>
            <p className="text-blue-200 text-sm mt-6">
              Free audit &bull; No commitment &bull; Results in 48 hours
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-12 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  G
                </div>
                <span className="text-xl font-bold">Gagnavél</span>
              </div>
              <p className="text-gray-400 text-sm max-w-xs">
                Icelandic IT services for businesses that expect more. Based in Reykjavík, serving all of Iceland.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
              <div>
                <p className="font-semibold mb-3">Þjónusta</p>
                <div className="space-y-2 text-gray-500">
                  <p>Managed IT</p>
                  <p>Cloud Solutions</p>
                  <p>Cybersecurity</p>
                </div>
              </div>
              <div>
                <p className="font-semibold mb-3">Fyrirtæki</p>
                <div className="space-y-2 text-gray-500">
                  <p>Um okkur</p>
                  <p>Störf</p>
                  <p>Blogg</p>
                </div>
              </div>
              <div>
                <p className="font-semibold mb-3">Samband</p>
                <div className="space-y-2 text-gray-500">
                  <p>hey@gagnavelehf.is</p>
                  <p>555-1234</p>
                  <p>Borgartún 26, 105 Rvk</p>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-400">
            <p>&copy; 2026 Gagnavél ehf. Allur réttur áskilinn.</p>
            <p>Built to replace what wasn&apos;t working.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
