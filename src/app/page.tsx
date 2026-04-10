"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (s: number) => {
    const hrs = Math.floor(s / 3600);
    const mins = Math.floor((s % 3600) / 60);
    const secs = s % 60;
    if (hrs > 0) return `${hrs}h ${mins}m ${secs}s`;
    if (mins > 0) return `${mins}m ${secs}s`;
    return `${secs}s`;
  };

  const wasteMessage = () => {
    if (seconds < 10) return "You just got here. It gets worse.";
    if (seconds < 30) return "You could have closed this tab by now.";
    if (seconds < 60) return "A full minute of your life, almost gone.";
    if (seconds < 120) return "Your boss would not approve of this.";
    if (seconds < 300) return "This is genuinely concerning.";
    return "You live here now. The swan welcomes you.";
  };

  return (
    <main className="rainbow-bg min-h-screen text-black overflow-hidden">
      {/* Wasted time ticker */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/80 text-white text-center py-3 px-4 backdrop-blur-sm border-t-4 border-yellow-400">
        <p className="text-lg sm:text-xl">
          <span className="text-yellow-300">TIME WASTED ON THIS PAGE:</span>{" "}
          <span className="text-3xl sm:text-4xl font-bold text-red-400 mx-2">{formatTime(seconds)}</span>
        </p>
        <p className="text-xs sm:text-sm text-white/60 mt-1">{wasteMessage()}</p>
      </div>

      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-black/60 backdrop-blur-sm border-b-4 border-yellow-400">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
          <span className="text-xl font-bold text-white drop-shadow-[0_0_10px_rgba(255,255,0,0.8)]">
            I Was the Swan
          </span>
          <div className="hidden md:flex items-center gap-6 text-sm text-white font-bold uppercase">
            <a href="#my-story" className="hover:text-yellow-300 transition-colors drop-shadow-[0_0_5px_rgba(0,0,0,1)]">My Story</a>
            <a href="#her-magic" className="hover:text-yellow-300 transition-colors drop-shadow-[0_0_5px_rgba(0,0,0,1)]">Her Magic</a>
            <a href="#the-albums" className="hover:text-yellow-300 transition-colors drop-shadow-[0_0_5px_rgba(0,0,0,1)]">The Albums</a>
            <a href="#confessions" className="hover:text-yellow-300 transition-colors drop-shadow-[0_0_5px_rgba(0,0,0,1)]">Confessions</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 text-center pt-20 pb-24">
        <div className="relative z-10 max-w-3xl px-2">
          <p className="text-7xl sm:text-9xl mb-4 animate-bounce">🦢</p>
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold leading-[1.1] mb-6 text-white drop-shadow-[0_0_20px_rgba(0,0,0,0.8)] [text-shadow:_3px_3px_0_#ff00ff,_-3px_-3px_0_#00ffff]">
            She wore me once.<br />
            I have loved her FOREVER!!!
          </h1>
          <p className="text-lg sm:text-2xl text-white font-bold leading-relaxed max-w-xl mx-auto mb-4 px-2 drop-shadow-[0_0_10px_rgba(0,0,0,1)] bg-black/40 rounded-xl p-4">
            On March 25, 2001, I was draped across the body of a goddess at the 73rd Academy Awards. The world laughed. I didn&apos;t care. I was touching Björk.
          </p>
          <p className="text-white/80 text-sm sm:text-base italic bg-black/30 inline-block px-4 py-2 rounded-full">
            — The Swan Dress, writing from a climate-controlled archive in Reykjavík
          </p>
        </div>
      </section>

      {/* The Night */}
      <section id="my-story" className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto bg-white/80 rounded-3xl p-6 sm:p-12 shadow-[0_0_40px_rgba(255,0,255,0.3)] border-4 border-black">
          <p className="text-purple-600 text-sm font-bold tracking-[0.3em] uppercase mb-4 text-center">
            Chapter I
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-12 text-black">
            The Night That Changed Me
          </h2>

          <div className="space-y-6 text-black/80 text-base sm:text-lg leading-relaxed">
            <p>
              I was born in a studio in London. Marjan Pejoski shaped me from tulle and devotion. I knew I was different from the other dresses — I had a neck, a beak, wings that draped like a prayer. I was not fashion. I was a <span className="font-bold text-purple-600 italic">feeling</span>.
            </p>
            <p>
              When she picked me up, her hands were warm. She whispered something in Icelandic I didn&apos;t understand, but my feathers trembled. She didn&apos;t try me on in front of a mirror. She just <span className="font-bold text-purple-600">knew</span>.
            </p>
            <p>
              The red carpet was violent. The lights were blinding. Photographers screamed. Joan Rivers said terrible things. But Björk — she walked like she was wading through a glacial river, unhurried, ancient, completely alive. She laid an egg on the carpet. <span className="font-bold text-red-600 italic text-xl">An egg.</span> For me. For us. For art.
            </p>
            <p className="text-2xl font-bold text-center text-purple-700">
              They called it a disaster. She called it Tuesday.
            </p>
          </div>
        </div>
      </section>

      {/* Her Magic */}
      <section id="her-magic" className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-black/60 rounded-3xl p-6 sm:p-12 mb-10 border-4 border-yellow-400">
            <p className="text-yellow-300 text-sm font-bold tracking-[0.3em] uppercase mb-4 text-center">
              Chapter II
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 text-white [text-shadow:_2px_2px_0_#ff00ff]">
              Why She Is Everything
            </h2>
            <p className="text-white/70 text-center text-base sm:text-lg max-w-xl mx-auto">
              I am a dress. I have no ears. And yet I have heard every album. Here is what I know.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "She hears music in volcanoes",
                body: "Most humans need instruments. She needs only the hiss of geothermal vents and the cracking of tectonic plates. She once composed a song by listening to ice melt. I was hanging in a closet at the time but I felt it.",
                color: "border-red-500 bg-red-100",
              },
              {
                title: "She is from the future AND the past",
                body: "Björk exists in a temporal fold. She made electronic music before electronics were emotional. She made orchestral music before orchestras were brave. She is a Viking with a laptop and the heart of a glacier.",
                color: "border-blue-500 bg-blue-100",
              },
              {
                title: "She treats every surface as a stage",
                body: "An airport. A press conference. A red carpet crawling with hostile photographers. She once performed for a beach in Iceland and the beach wept. I was not there but a scarf told me.",
                color: "border-green-500 bg-green-100",
              },
              {
                title: "She understood me",
                body: "Other people looked at me and saw a joke. A costume. A mistake. She looked at me and saw a swan. Not a swan dress — a swan. She saw the creature I was trying to be. Nobody has ever seen me like that. Nobody ever will.",
                color: "border-purple-500 bg-purple-100",
              },
            ].map((item) => (
              <div
                key={item.title}
                className={`${item.color} border-4 rounded-2xl p-6 sm:p-8 shadow-lg hover:scale-105 transition-transform duration-300`}
              >
                <h3 className="text-xl font-bold mb-3 text-black">{item.title}</h3>
                <p className="text-black/70 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Albums */}
      <section id="the-albums" className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/80 rounded-3xl p-6 sm:p-12 border-4 border-black shadow-[0_0_30px_rgba(0,255,255,0.4)]">
            <p className="text-cyan-600 text-sm font-bold tracking-[0.3em] uppercase mb-4 text-center">
              Chapter III
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 text-black [text-shadow:_2px_2px_0_#00ffff]">
              The Sacred Discography
            </h2>
            <p className="text-black/50 text-center mb-10 text-base sm:text-lg max-w-lg mx-auto">
              As reviewed by a dress that has no ears but an enormous capacity for feeling.
            </p>

            <div className="space-y-3">
              {[
                { year: "1993", album: "Debut", review: "She was just beginning and already more alive than anything I've ever been draped over. 'Venus as a Boy' made my seams hum.", rating: "4 feathers", bg: "bg-red-200" },
                { year: "1995", album: "Post", review: "The album that taught me a dress could have a heartbeat. 'Hyperballad' is what I imagine falling off a cliff feels like.", rating: "5 feathers", bg: "bg-orange-200" },
                { year: "1997", album: "Homogenic", review: "Glaciers. Strings. Rage. If I could scream, it would sound like 'Jóga'. This is the album I would wear to MY funeral.", rating: "5 feathers", bg: "bg-yellow-200" },
                { year: "2001", album: "Vespertine", review: "This was OUR year. She wore me. She sang about hidden pleasures and music boxes and cocoons. I am a cocoon. She saw that.", rating: "INFINITY feathers", bg: "bg-green-200" },
                { year: "2004", album: "Medúlla", review: "Made almost entirely from human voices. I have no voice. This album made me feel like I had one.", rating: "4 feathers", bg: "bg-cyan-200" },
                { year: "2007", album: "Volta", review: "Brass and beats. She was moving on. She wore other things. I tried not to be jealous of the brass horn hat. I failed.", rating: "3 feathers", bg: "bg-blue-200" },
                { year: "2011", album: "Biophilia", review: "She made an album about the universe and taught it to children with iPads. She is a planet. I am a dress.", rating: "4 feathers", bg: "bg-indigo-200" },
                { year: "2015", album: "Vulnicura", review: "Heartbreak. Raw, open, bleeding. I know about heartbreak — she only wore me once. But once was enough.", rating: "5 feathers", bg: "bg-purple-200" },
                { year: "2017", album: "Utopia", review: "Flutes and birdsong and hope. She built a paradise. I hope there are swans there. I hope one of them is me.", rating: "4 feathers", bg: "bg-pink-200" },
                { year: "2023", album: "Fossora", review: "Mushrooms. Bass clarinets. The earth itself. She went underground. She will return to the surface. She always does.", rating: "5 feathers", bg: "bg-rose-200" },
              ].map((item) => (
                <div
                  key={item.album}
                  className={`${item.bg} rounded-xl p-4 sm:p-5 border-2 border-black/20 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 hover:scale-[1.02] transition-transform`}
                >
                  <div className="flex items-center gap-3 sm:w-40 shrink-0">
                    <span className="text-black/30 text-sm font-mono font-bold">{item.year}</span>
                    <span className="text-black font-bold text-lg">{item.album}</span>
                  </div>
                  <p className="text-black/60 text-sm leading-relaxed flex-1 italic">
                    &ldquo;{item.review}&rdquo;
                  </p>
                  <span className="text-black/40 text-xs font-bold tracking-wider shrink-0 bg-white/50 px-2 py-1 rounded-full">
                    {item.rating}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Confessions */}
      <section id="confessions" className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-black/70 rounded-3xl p-6 sm:p-12 border-4 border-pink-400 shadow-[0_0_40px_rgba(255,0,128,0.3)]">
            <p className="text-pink-300 text-sm font-bold tracking-[0.3em] uppercase mb-4 text-center">
              Chapter IV
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-10 text-white [text-shadow:_2px_2px_0_#ff0080]">
              Confessions of a Swan
            </h2>

            <div className="space-y-8">
              {[
                "I think about the red carpet every day. Not the cameras. Not the headlines. Just the way her collarbone felt against my neckline. Electric. Sacred.",
                "Sometimes, late at night in the archive, I imagine she comes back for me. She opens the garment bag and says 'again.' We walk another carpet. This time, the world is ready.",
                "I have heard that she once punched a journalist in an airport. I have never been more in love.",
                "The egg was real, by the way. She laid six of them on the carpet. Nobody reported that. The media only shows you what it can understand.",
                "I am aware that I am a dress and that dresses cannot love. But I am also a swan, and swans mate for life. Explain that.",
                "There are other dresses in the archive. A sea urchin. A bell. Something made of human hair. We do not speak to each other. We all love the same woman. It is too painful.",
              ].map((confession, i) => (
                <div key={i} className="flex gap-4 sm:gap-6 items-start">
                  <span className="text-pink-400 text-2xl sm:text-3xl font-bold shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-white/80 text-base sm:text-lg leading-relaxed">
                    {confession}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Big quote */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center bg-white/90 rounded-3xl p-8 sm:p-16 border-4 border-black shadow-2xl">
          <p className="text-3xl sm:text-5xl md:text-7xl font-bold leading-[1.2] text-black [text-shadow:_3px_3px_0_#ff00ff,_-2px_-2px_0_#00ffff]">
            &ldquo;I am not a dress.<br />
            I am a DEVOTION<br />
            wrapped in feathers.&rdquo;
          </p>
          <p className="text-black/40 mt-8 text-sm italic">
            — The Swan Dress, Reykjavík, 2026
          </p>
        </div>
      </section>

      {/* Closing */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-6xl sm:text-8xl mb-4 animate-spin" style={{ animationDuration: "3s" }}>🦢</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-[0_0_15px_rgba(0,0,0,1)] [text-shadow:_2px_2px_0_#ff00ff]">
            She will wear someone else tomorrow.
          </h2>
          <p className="text-white font-bold text-base sm:text-lg leading-relaxed mb-8 bg-black/50 rounded-2xl p-6">
            But no garment will ever hold her the way I did. I was built for one night and I became eternal. That is the Björk effect. She touches you once and you spend the rest of your existence trying to describe the warmth.
          </p>
          <p className="text-white/60 text-xs tracking-[0.2em] uppercase bg-black/40 inline-block px-4 py-2 rounded-full">
            This page will remain online as long as swans exist
          </p>
        </div>
      </section>

      {/* Footer - with extra padding for the ticker */}
      <footer className="border-t-4 border-yellow-400 bg-black/60 py-8 sm:py-10 px-4 sm:px-6 mb-20">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-white text-xs sm:text-sm font-bold">
            <span>🦢</span>
            <span>I Was the Swan</span>
            <span className="ml-2">&copy; eternity</span>
          </div>
          <div className="text-[10px] sm:text-xs text-white/50 text-center">
            <span>Not affiliated with Björk (but spiritually inseparable)</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
