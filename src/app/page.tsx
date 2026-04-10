"use client";

import { useState } from "react";

const board = [
  { role: "Formaður", name: "Anna Björk Þórhallsdóttir", emoji: "👑" },
  { role: "Varaformaður", name: "Guðmundur Ólafsson", emoji: "⚡" },
  { role: "Gjaldkeri", name: "Katrín Helga Sigurðardóttir", emoji: "💰" },
  { role: "Ritari", name: "Ólafur Jón Magnússon", emoji: "📝" },
  { role: "Skemmtanastjóri", name: "Þórdís Elínborg Ásgrímsdóttir", emoji: "🎉" },
  { role: "Markaðsstjóri", name: "Birkir Freyr Gunnarsson", emoji: "📣" },
];

const events = [
  {
    date: "18. apríl",
    title: "Fyrirtækjakvöld með Marel",
    desc: "Networking kvöld með verkfræðingum frá Marel. Kynning á embedded systems verkefnum og drykkveitingar.",
    location: "VR-II, stofa 258",
    time: "17:00 - 20:00",
    tag: "NETWORKING",
    color: "bg-blue-100 text-blue-700",
  },
  {
    date: "25. apríl",
    title: "VIR Pub Quiz #4",
    desc: "Fjórði pub quizzinn okkar í vor! Þriggja manna lið. Spurningar um rásir, kóða og straum. Verðlaun og ódýr bjór.",
    location: "Gaukurinn",
    time: "20:00",
    tag: "FÉLAGSLÍF",
    color: "bg-purple-100 text-purple-700",
  },
  {
    date: "3. maí",
    title: "Soldering & PCB Workshop",
    desc: "Hands-on workshop þar sem þú lóðar þína eigin PCB rás. Allt efni meðfylgjandi. Byrjendur velkomnir!",
    location: "VR-II, tilraunastofa",
    time: "12:00 - 16:00",
    tag: "VERKSTÆÐI",
    color: "bg-green-100 text-green-700",
  },
  {
    date: "10. maí",
    title: "Vorball VIR 2026",
    desc: "Stærsti viðburður varsins! DJ, matseðill, open bar frá 22-23, og LED ljósasýning hönnuð af okkar eigin fólki.",
    location: "Gamla Bíó",
    time: "20:00 - 03:00",
    tag: "BALL",
    color: "bg-pink-100 text-pink-700",
  },
];

const sponsors = [
  "Marel", "Síminn", "Landsnet", "Ölgerðin",
  "Controlant", "Össur", "CCP Games", "Atea",
];

const faqs = [
  {
    q: "Hvernig skrái ég mig í VIR?",
    a: "Allir nemendur í rafmagns- og tölvuverkfræði við HÍ eru sjálfkrafa meðlimir! Þú þarft bara að mæta á viðburði og hafa gaman.",
  },
  {
    q: "Hvað kostar að vera í VIR?",
    a: "Ekkert! Félagsgjöld eru innifalin í skrásetningargjaldi HÍ. Sumir viðburðir eru með aðgangseyri.",
  },
  {
    q: "Er VIR bara fyrir ECE nemendur?",
    a: "VIR er aðallega fyrir rafmagns- og tölvuverkfræðinema en allir verkfræðinemar og aðrir áhugasamir eru velkomnir á opna viðburði okkar.",
  },
  {
    q: "Hvernig get ég komist í stjórnina?",
    a: "Kosningar eru á aðalfundi á haustönn. Fylgstu með á Instagram og í tölvupósti fyrir tilkynningar!",
  },
  {
    q: "Hvar finn ég ykkur?",
    a: "Við erum oftar en ekki í VR-II, á 2. hæð. Einnig á Instagram @vir_hi og í tölvupósti vir@hi.is.",
  },
];

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#1e3a5f] rounded-xl flex items-center justify-center text-white font-black text-lg">
              V
            </div>
            <div className="leading-tight">
              <span className="text-lg font-bold tracking-tight block">VIR</span>
              <span className="text-[10px] text-gray-400 tracking-wider uppercase hidden sm:block">Rafmagns- og tölvuverkfræði</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-500 font-medium">
            <a href="#events" className="hover:text-gray-900 transition-colors">Viðburðir</a>
            <a href="#about" className="hover:text-gray-900 transition-colors">Um VIR</a>
            <a href="#board" className="hover:text-gray-900 transition-colors">Stjórn</a>
            <a href="#faq" className="hover:text-gray-900 transition-colors">Spurningar</a>
          </div>
          <a
            href="https://instagram.com/vir_hi"
            target="_blank"
            className="bg-[#1e3a5f] text-white text-sm font-semibold px-5 py-2.5 rounded-lg hover:bg-[#162d4a] transition-colors"
          >
            @vir_hi
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero-gradient relative pt-28 sm:pt-36 pb-20 sm:pb-28 px-4 sm:px-6 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0di0xaC0ydjFoLTF2MmgxdjFoMnYtMWgxdi0yaC0xem0tMjAtOVYyNGgtMXYtMWgtMnYxaC0xdjJoMXYxaDJ2LTFoMXYtMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 text-sm font-medium px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
              <span className="text-lg">⚡</span>
              Háskóli Íslands — Rafmagns- og tölvuverkfræðideild
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05] mb-6">
              VIR
            </h1>
            <p className="text-xl sm:text-2xl text-white/70 font-light mb-2">
              Félag rafmagns- og tölvuverkfræðinema HÍ
            </p>
            <p className="text-base sm:text-lg text-white/50 max-w-xl mb-8 leading-relaxed">
              Networking. Viðburðir. Hackathons. Lóðun. Pub quiz. Og vorballið sem allir tala um til jóla. Við erum félagið þitt í ECE deildinni.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#events"
                className="bg-white text-[#1e3a5f] font-bold px-8 py-4 rounded-xl text-lg hover:bg-white/90 transition-colors text-center"
              >
                Sjá viðburði
              </a>
              <a
                href="https://instagram.com/vir_hi"
                target="_blank"
                className="border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-xl text-lg hover:bg-white/10 transition-colors text-center"
              >
                Fylgja á Instagram
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick stats */}
      <section className="border-b border-gray-100 bg-gray-50 py-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { val: "300+", label: "Meðlimir" },
            { val: "30+", label: "Viðburðir á ári" },
            { val: "15+", label: "Samstarfsfyrirtæki" },
            { val: "1", label: "Legendískt vorball" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-2xl sm:text-3xl font-black text-[#1e3a5f]">{s.val}</p>
              <p className="text-sm text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Events */}
      <section id="events" className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#1e3a5f] text-sm font-bold tracking-wider uppercase mb-2">Dagatal</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Næstu viðburðir</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {events.map((e) => (
              <div
                key={e.title}
                className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg hover:border-gray-300 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${e.color}`}>
                    {e.tag}
                  </span>
                  <span className="text-sm font-bold text-[#1e3a5f]">{e.date}</span>
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-[#1e3a5f] transition-colors">
                  {e.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{e.desc}</p>
                <div className="flex flex-wrap gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <span>📍</span> {e.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <span>🕐</span> {e.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-16 sm:py-24 px-4 sm:px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#1e3a5f] text-sm font-bold tracking-wider uppercase mb-2">Um okkur</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6">Hvað er VIR?</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                icon: "🤝",
                title: "Networking",
                desc: "Fyrirtækjakvöld með Marel, Símanum, Landsnet og fleirum. Þetta er hvar þú hittir framtíðarvinnuveitandann þinn í verkfræði og tækni.",
              },
              {
                icon: "🎊",
                title: "Félagslíf",
                desc: "Pub quiz, hlaðborð, LAN parties, og auðvitað vorballið. Við vitum að nemendur lifa ekki af diffurjöfnum einum saman.",
              },
              {
                icon: "🔧",
                title: "Verkstæði & Hackathons",
                desc: "Lóðunarnámskeið, Arduino workshops, hackathons, og PCB hönnun. Hands-on reynsla sem þú færð ekki í kennslustofunni.",
              },
              {
                icon: "⚡",
                title: "Samfélag",
                desc: "300+ nemendur sem deila sömu ástríðu fyrir rásarhönnun, forritun og rafmagnsverkfræði. Þetta er netið þitt alla ævi.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white rounded-2xl p-6 border border-gray-200">
                <span className="text-3xl mb-3 block">{item.icon}</span>
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Board */}
      <section id="board" className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#1e3a5f] text-sm font-bold tracking-wider uppercase mb-2">Stjórnin 2025-2026</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Fólkið á bakvið VIR</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {board.map((member) => (
              <div
                key={member.role}
                className="bg-gray-50 border border-gray-200 rounded-2xl p-5 text-center hover:bg-white hover:shadow-md transition-all duration-300"
              >
                <span className="text-3xl mb-2 block">{member.emoji}</span>
                <p className="font-bold text-sm">{member.name}</p>
                <p className="text-[#1e3a5f] text-xs font-medium mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsors */}
      <section className="py-12 px-4 sm:px-6 border-y border-gray-100 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-xs text-gray-400 font-semibold tracking-wider uppercase mb-6">Samstarfsaðilar okkar</p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
            {sponsors.map((s) => (
              <span key={s} className="text-sm sm:text-base font-semibold text-gray-300 hover:text-gray-500 transition-colors">
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#1e3a5f] text-sm font-bold tracking-wider uppercase mb-2">Spurningar</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Algengar spurningar</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-sm sm:text-base pr-4">{faq.q}</span>
                  <span className={`text-gray-400 text-xl shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-45" : ""}`}>
                    +
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <p className="text-gray-500 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="hero-gradient rounded-3xl p-8 sm:p-14 text-center text-white">
            <p className="text-5xl mb-4">⚡</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Vertu með!
            </h2>
            <p className="text-white/70 text-lg max-w-md mx-auto mb-8">
              Fylgdu okkur á Instagram, mættu á næsta viðburð, og vertu partur af besta verkfræðifélaginu í HÍ.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://instagram.com/vir_hi"
                target="_blank"
                className="bg-white text-[#1e3a5f] font-bold px-8 py-4 rounded-xl text-lg hover:bg-white/90 transition-colors"
              >
                @vir_hi á Instagram
              </a>
              <a
                href="mailto:vir@hi.is"
                className="border-2 border-white/30 text-white font-semibold px-8 py-4 rounded-xl text-lg hover:bg-white/10 transition-colors"
              >
                vir@hi.is
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#1e3a5f] rounded-lg flex items-center justify-center text-white font-bold text-xs">
              V
            </div>
            <span className="font-bold">VIR</span>
            <span className="text-gray-300 text-sm">&copy; 2026</span>
          </div>
          <div className="flex gap-6 text-sm text-gray-400">
            <span>vir@hi.is</span>
            <span>VR-II, 2. hæð</span>
            <span>@vir_hi</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
