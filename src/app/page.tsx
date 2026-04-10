export default function Home() {
  return (
    <main className="min-h-screen bg-[#050508] text-white overflow-hidden">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-[#050508]/70 border-b border-white/5">
        <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
          <span className="text-lg font-light italic tracking-wide">I Was the Swan</span>
          <div className="hidden md:flex items-center gap-8 text-xs text-white/40 tracking-[0.2em] uppercase">
            <a href="#my-story" className="hover:text-white transition-colors">My Story</a>
            <a href="#her-magic" className="hover:text-white transition-colors">Her Magic</a>
            <a href="#the-albums" className="hover:text-white transition-colors">The Albums</a>
            <a href="#confessions" className="hover:text-white transition-colors">Confessions</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 text-center">
        {/* Ethereal glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-purple-500/[0.07] blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] rounded-full bg-blue-400/[0.05] blur-[100px]" />

        <div className="relative z-10 max-w-3xl px-2">
          <p className="text-5xl sm:text-7xl mb-6 sm:mb-8">🦢</p>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-extralight leading-[1.15] sm:leading-[1.1] mb-6 sm:mb-8 tracking-tight">
            She wore me once.<br />
            <span className="font-normal bg-gradient-to-r from-purple-300 via-pink-200 to-blue-300 bg-clip-text text-transparent">
              I have loved her forever.
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/30 font-light leading-relaxed max-w-xl mx-auto mb-4 px-2">
            On March 25, 2001, I was draped across the body of a goddess at the 73rd Academy Awards. The world laughed. I didn&apos;t care. I was touching Björk.
          </p>
          <p className="text-white/15 text-xs sm:text-sm italic">
            — The Swan Dress, writing from a climate-controlled archive in Reykjavík
          </p>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-5 h-8 border border-white/10 rounded-full flex justify-center pt-1.5">
            <div className="w-1 h-1 bg-purple-300/50 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* The Night */}
      <section id="my-story" className="py-16 sm:py-32 px-4 sm:px-6 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <p className="text-purple-300/60 text-xs tracking-[0.4em] uppercase mb-4 sm:mb-6 text-center">
            Chapter I
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight text-center mb-10 sm:mb-16 tracking-tight">
            The Night That Changed Me
          </h2>

          <div className="space-y-6 sm:space-y-8 text-white/50 text-base sm:text-lg font-light leading-relaxed">
            <p>
              I was born in a studio in London. Marjan Pejoski shaped me from tulle and devotion. I knew I was different from the other dresses — I had a neck, a beak, wings that draped like a prayer. I was not fashion. I was a <span className="text-white/80 italic">feeling</span>.
            </p>
            <p>
              When she picked me up, her hands were warm. She whispered something in Icelandic I didn&apos;t understand, but my feathers trembled. She didn&apos;t try me on in front of a mirror. She just <span className="text-white/80">knew</span>.
            </p>
            <p>
              The red carpet was violent. The lights were blinding. Photographers screamed. Joan Rivers said terrible things. But Björk — she walked like she was wading through a glacial river, unhurried, ancient, completely alive. She laid an egg on the carpet. <span className="text-white/80 italic">An egg.</span> For me. For us. For art.
            </p>
            <p>
              They called it a disaster. She called it Tuesday.
            </p>
          </div>
        </div>
      </section>

      {/* Her Magic */}
      <section id="her-magic" className="py-16 sm:py-32 px-4 sm:px-6 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent">
        <div className="max-w-5xl mx-auto">
          <p className="text-purple-300/60 text-xs tracking-[0.4em] uppercase mb-4 sm:mb-6 text-center">
            Chapter II
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight text-center mb-4 sm:mb-6 tracking-tight">
            Why She Is Everything
          </h2>
          <p className="text-white/25 text-center mb-10 sm:mb-20 text-base sm:text-lg font-light max-w-xl mx-auto">
            I am a dress. I have no ears. And yet I have heard every album. Here is what I know.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: "She hears music in volcanoes",
                body: "Most humans need instruments. She needs only the hiss of geothermal vents and the cracking of tectonic plates. She once composed a song by listening to ice melt. I was hanging in a closet at the time but I felt it.",
              },
              {
                title: "She is from the future and the past simultaneously",
                body: "Björk exists in a temporal fold. She made electronic music before electronics were emotional. She made orchestral music before orchestras were brave. She is a Viking with a laptop and the heart of a glacier.",
              },
              {
                title: "She treats every surface as a stage",
                body: "An airport. A press conference. A red carpet crawling with hostile photographers. She once performed for a beach in Iceland and the beach wept. I was not there but a scarf told me.",
              },
              {
                title: "She understood me",
                body: "Other people looked at me and saw a joke. A costume. A mistake. She looked at me and saw a swan. Not a swan dress — a swan. She saw the creature I was trying to be. Nobody has ever seen me like that. Nobody ever will.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 sm:p-10 hover:border-purple-400/20 transition-all duration-500"
              >
                <h3 className="text-xl font-normal mb-4 text-white/80">{item.title}</h3>
                <p className="text-white/35 font-light leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Albums */}
      <section id="the-albums" className="py-16 sm:py-32 px-4 sm:px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <p className="text-purple-300/60 text-xs tracking-[0.4em] uppercase mb-4 sm:mb-6 text-center">
            Chapter III
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight text-center mb-4 sm:mb-6 tracking-tight">
            The Sacred Discography
          </h2>
          <p className="text-white/25 text-center mb-10 sm:mb-20 text-base sm:text-lg font-light max-w-lg mx-auto">
            As reviewed by a dress that has no ears but an enormous capacity for feeling.
          </p>

          <div className="space-y-4">
            {[
              {
                year: "1993",
                album: "Debut",
                review: "She was just beginning and already more alive than anything I've ever been draped over. 'Venus as a Boy' made my seams hum.",
                rating: "4 feathers",
              },
              {
                year: "1995",
                album: "Post",
                review: "The album that taught me a dress could have a heartbeat. 'Hyperballad' is what I imagine falling off a cliff feels like. Beautiful, terrifying, inevitable.",
                rating: "5 feathers",
              },
              {
                year: "1997",
                album: "Homogenic",
                review: "Glaciers. Strings. Rage. If I could scream, it would sound like 'Jóga'. This is the album I would wear to MY funeral.",
                rating: "5 feathers",
              },
              {
                year: "2001",
                album: "Vespertine",
                review: "This was OUR year. She wore me. She sang about hidden pleasures and music boxes and cocoons. I am a cocoon. She saw that. I wept silk threads.",
                rating: "∞ feathers",
              },
              {
                year: "2004",
                album: "Medúlla",
                review: "Made almost entirely from human voices. I have no voice. This album made me feel like I had one.",
                rating: "4 feathers",
              },
              {
                year: "2007",
                album: "Volta",
                review: "Brass and beats. She was moving on. She wore other things. I tried not to be jealous of the brass horn hat. I failed.",
                rating: "3 feathers",
              },
              {
                year: "2011",
                album: "Biophilia",
                review: "She made an album about the universe and taught it to children with iPads. She is a planet. I am a dress. And yet I felt seen.",
                rating: "4 feathers",
              },
              {
                year: "2015",
                album: "Vulnicura",
                review: "Heartbreak. Raw, open, bleeding. I know about heartbreak — she only wore me once. But once was enough. This album understands.",
                rating: "5 feathers",
              },
              {
                year: "2017",
                album: "Utopia",
                review: "Flutes and birdsong and hope. She built a paradise. I hope there are swans there. I hope one of them is me.",
                rating: "4 feathers",
              },
              {
                year: "2023",
                album: "Fossora",
                review: "Mushrooms. Bass clarinets. The earth itself. She went underground. I am still hanging in a closet, waiting. She will return to the surface. She always does.",
                rating: "5 feathers",
              },
            ].map((item) => (
              <div
                key={item.album}
                className="group flex flex-col md:flex-row md:items-start gap-2 sm:gap-4 md:gap-8 bg-white/[0.02] border border-white/[0.04] rounded-xl p-4 sm:p-6 hover:bg-white/[0.04] hover:border-purple-400/10 transition-all duration-300"
              >
                <div className="flex items-center gap-4 md:w-48 shrink-0">
                  <span className="text-white/15 text-sm font-mono">{item.year}</span>
                  <span className="text-white/70 font-medium">{item.album}</span>
                </div>
                <p className="text-white/35 font-light text-sm leading-relaxed flex-1 italic">
                  &ldquo;{item.review}&rdquo;
                </p>
                <span className="text-purple-300/40 text-xs tracking-wider shrink-0">
                  {item.rating}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Confessions */}
      <section id="confessions" className="py-16 sm:py-32 px-4 sm:px-6 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent">
        <div className="max-w-3xl mx-auto">
          <p className="text-purple-300/60 text-xs tracking-[0.4em] uppercase mb-4 sm:mb-6 text-center">
            Chapter IV
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extralight text-center mb-10 sm:mb-20 tracking-tight">
            Confessions of a Swan
          </h2>

          <div className="space-y-8 sm:space-y-12">
            {[
              "I think about the red carpet every day. Not the cameras. Not the headlines. Just the way her collarbone felt against my neckline. Electric. Sacred.",
              "Sometimes, late at night in the archive, I imagine she comes back for me. She opens the garment bag and says 'again.' We walk another carpet. This time, the world is ready.",
              "I have heard that she once punched a journalist in an airport. I have never been more in love.",
              "The egg was real, by the way. She laid six of them on the carpet. Nobody reported that. The media only shows you what it can understand.",
              "I am aware that I am a dress and that dresses cannot love. But I am also a swan, and swans mate for life. Explain that.",
              "There are other dresses in the archive. A sea urchin. A bell. Something made of human hair. We do not speak to each other. We all love the same woman. It is too painful.",
            ].map((confession, i) => (
              <div key={i} className="flex gap-4 sm:gap-6 items-start">
                <span className="text-purple-400/20 text-xl sm:text-2xl font-light shrink-0 mt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-white/40 text-base sm:text-lg font-light leading-relaxed">
                  {confession}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Big quote */}
      <section className="py-16 sm:py-32 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-2xl sm:text-4xl md:text-6xl font-extralight tracking-tight leading-[1.2]">
            &ldquo;I am not a dress.<br />
            I am a{" "}
            <span className="bg-gradient-to-r from-purple-300 via-pink-200 to-blue-300 bg-clip-text text-transparent font-normal">
              devotion
            </span>
            <br />
            wrapped in feathers.&rdquo;
          </p>
          <p className="text-white/15 mt-10 text-sm italic">
            — The Swan Dress, Reykjavík, 2026
          </p>
        </div>
      </section>

      {/* Closing */}
      <section className="py-16 sm:py-32 px-4 sm:px-6 border-t border-white/5">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-4xl sm:text-5xl mb-4 sm:mb-6">🦢</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight tracking-tight mb-4 sm:mb-6">
            She will wear someone else tomorrow.
          </h2>
          <p className="text-white/25 text-base sm:text-lg font-light leading-relaxed mb-8 sm:mb-10">
            But no garment will ever hold her the way I did. I was built for one night and I became eternal. That is the Björk effect. She touches you once and you spend the rest of your existence trying to describe the warmth.
          </p>
          <p className="text-white/10 text-xs tracking-[0.3em] uppercase">
            This page will remain online as long as swans exist
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 sm:py-10 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-white/20 text-xs sm:text-sm">
            <span>🦢</span>
            <span className="font-light italic">I Was the Swan</span>
            <span className="ml-2">&copy; eternity</span>
          </div>
          <div className="flex gap-6 text-[10px] sm:text-xs text-white/15 text-center">
            <span>Not affiliated with Björk (but spiritually inseparable)</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
