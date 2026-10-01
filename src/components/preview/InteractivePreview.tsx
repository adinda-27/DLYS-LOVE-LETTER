import { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Heart,
  Music2,
  Volume2,
  VolumeX,
  Sparkles,
  Check,
  Copy,
  RefreshCw,
  Eye,
  Gift
} from 'lucide-react';

export const InteractivePreview = () => {
  // Interactive state inside phone
  const [isOpen, setIsOpen] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(true);
  const [activeTab, setActiveTab] = useState<'letter' | 'timeline' | 'polaroid' | 'question'>('letter');
  const [copiedLink, setCopiedLink] = useState(false);
  const [hasAnsweredQuestion, setHasAnsweredQuestion] = useState(false);
  const [activeTheme, setActiveTheme] = useState<'vintage' | 'blush' | 'midnight'>('vintage');

  const triggerHeartConfetti = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#e11d48', '#fb7185', '#fda4af', '#f43f5e', '#ffd1dc'],
      shapes: ['circle'],
    });
  };

  const handleOpenEnvelope = () => {
    setIsOpen(true);
    triggerHeartConfetti();
  };

  const handleCopyLink = () => {
    setCopiedLink(true);
    navigator.clipboard?.writeText('https://dlys.love/m/maya-and-julian');
    setTimeout(() => setCopiedLink(false), 2200);
  };

  const handleAcceptQuestion = () => {
    setHasAnsweredQuestion(true);
    triggerHeartConfetti();
  };

  return (
    <section id="preview" className="py-20 md:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200/80 text-rose-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <Eye className="w-3.5 h-3.5" />
            <span>Interactive Recipient Experience</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#25161C] mb-4">
            Experience what your partner feels.
          </h2>
          <p className="text-base sm:text-lg text-[#614F57] leading-relaxed">
            This isn't a static image. Tap the wax seal below to open Julian’s actual anniversary letter to Maya. Every animation and sound cue unfolds just like this on their smartphone.
          </p>
        </div>

        {/* Interactive Device Showcase */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Context, Features & Theme Toggles */}
          <div className="lg:col-span-5 space-y-6 order-2 lg:order-1">
            {/* Live Link Card */}
            <div className="bg-white/80 backdrop-blur-xs rounded-2xl p-5 border border-rose-100 shadow-sm">
              <div className="text-xs font-semibold uppercase tracking-wider text-rose-500 mb-1 flex items-center justify-between">
                <span>Unique Shareable Link</span>
                <span className="flex items-center gap-1 text-[11px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Live & Private
                </span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex-1 bg-rose-50/60 px-3.5 py-2.5 rounded-xl border border-rose-100/80 text-xs sm:text-sm font-mono text-[#5A454E] truncate">
                  dlys.love/m/maya-and-julian
                </div>
                <button
                  onClick={handleCopyLink}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-medium transition-all shadow-xs shrink-0 cursor-pointer"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Interactive Experience Details */}
            <div className="space-y-4">
              <div className="flex gap-4 p-4 rounded-2xl bg-white/60 border border-rose-100/60 hover:bg-white transition-all">
                <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600 shrink-0">
                  <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
                </div>
                <div>
                  <h3 className="font-medium text-sm text-[#25161C]">The Wax Seal Moment</h3>
                  <p className="text-xs sm:text-sm text-[#6A575F] mt-0.5 leading-relaxed">
                    Recipients tap the vintage seal to break it open with an intimate unfolding animation and celebratory heart petals.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-2xl bg-white/60 border border-rose-100/60 hover:bg-white transition-all">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 shrink-0">
                  <Music2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium text-sm text-[#25161C]">Synchronized Music</h3>
                  <p className="text-xs sm:text-sm text-[#6A575F] mt-0.5 leading-relaxed">
                    Set the mood with the exact song that played during your first road trip or slow dance in the kitchen.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-2xl bg-white/60 border border-rose-100/60 hover:bg-white transition-all">
                <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center text-pink-600 shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-medium text-sm text-[#25161C]">Surprise Response Interaction</h3>
                  <p className="text-xs sm:text-sm text-[#6A575F] mt-0.5 leading-relaxed">
                    Let them respond right on the page: "Yes, forever!", scratch off a secret voucher, or leave a reply whisper.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Switch Theme for Preview */}
            <div className="pt-2">
              <span className="text-xs font-semibold text-[#66545C] block mb-2">
                Preview Aesthetic Palette:
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTheme('vintage')}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                    activeTheme === 'vintage'
                      ? 'bg-amber-900 text-white border-amber-900 shadow-xs'
                      : 'bg-white text-stone-600 border-stone-200 hover:border-amber-400'
                  }`}
                >
                  📜 Vintage Linen
                </button>
                <button
                  onClick={() => setActiveTheme('blush')}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                    activeTheme === 'blush'
                      ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                      : 'bg-white text-rose-700 border-rose-200 hover:border-rose-400'
                  }`}
                >
                  🌸 Soft Blush
                </button>
                <button
                  onClick={() => setActiveTheme('midnight')}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                    activeTheme === 'midnight'
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
                  }`}
                >
                  ✨ Midnight Sky
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: High Fidelity Interactive Mobile Device Frame */}
          <div className="lg:col-span-7 flex justify-center order-1 lg:order-2">
            <div className="relative w-full max-w-[340px] sm:max-w-[360px] aspect-[9/18.5] bg-stone-900 rounded-[48px] p-3 sm:p-3.5 shadow-2xl shadow-rose-950/20 border-4 border-stone-800">
              
              {/* Phone Speaker & Camera Notch */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-5 bg-stone-950 rounded-full z-30 flex items-center justify-center gap-2">
                <div className="w-10 h-1 bg-stone-800 rounded-full"></div>
                <div className="w-2.5 h-2.5 bg-stone-900 rounded-full border border-stone-700"></div>
              </div>

              {/* Screen Content Wrapper */}
              <div
                className={`relative w-full h-full rounded-[38px] overflow-hidden flex flex-col transition-colors duration-500 ${
                  activeTheme === 'vintage'
                    ? 'bg-[#FAF5EC] text-[#2F2119]'
                    : activeTheme === 'blush'
                    ? 'bg-[#FFF7F9] text-[#2D1B24]'
                    : 'bg-[#0E131F] text-[#F0F4FC]'
                }`}
              >
                {/* Phone Status Bar */}
                <div className="pt-3 px-6 flex justify-between items-center text-[11px] font-semibold tracking-tight opacity-75 z-20">
                  <span>11:11</span>
                  <div className="flex items-center gap-1.5">
                    <span>5G</span>
                    <span className="w-4 h-2 rounded-xs border border-current flex items-center p-0.5">
                      <span className="w-full h-full bg-current rounded-2xs"></span>
                    </span>
                  </div>
                </div>

                {/* Device Interactive Screen Body */}
                <div className="relative flex-1 overflow-y-auto px-4 py-3 flex flex-col">
                  
                  {/* STATE 1: CLOSED ENVELOPE (Awaiting Tap) */}
                  {!isOpen ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
                      {/* Ambient floating heart dots */}
                      <div className="w-12 h-12 rounded-full bg-rose-100/80 flex items-center justify-center mb-6 text-rose-500 animate-bounce">
                        <Heart className="w-6 h-6 fill-rose-500 text-rose-500" />
                      </div>

                      {/* Envelope Graphic */}
                      <div
                        className="relative w-full max-w-[240px] aspect-[4/3] bg-[#EFE4D3] border-2 border-[#D9C4A7] rounded-xl shadow-lg flex flex-col items-center justify-center p-4 cursor-pointer transform hover:scale-[1.02] transition-transform"
                        onClick={handleOpenEnvelope}
                      >
                        {/* Envelope flap lines */}
                        <div className="absolute inset-0 border-t-[80px] border-t-amber-100/60 border-l-[120px] border-l-transparent border-r-[120px] border-r-transparent pointer-events-none rounded-t-xl" />
                        
                        <span className="text-[10px] tracking-widest uppercase font-mono text-[#8C7359] mb-1">
                          Private Delivery
                        </span>
                        <h4 className="font-serif text-lg font-semibold text-[#3D2C20]">
                          For Maya
                        </h4>
                        <p className="font-handwriting text-sm text-[#7D5A46] mt-0.5">
                          with all my love
                        </p>

                        {/* Wax Seal Stamp (The core interaction trigger) */}
                        <div
                          className="relative mt-4 w-14 h-14 rounded-full bg-linear-to-br from-rose-600 via-rose-700 to-rose-900 border-2 border-rose-300 shadow-md flex items-center justify-center text-rose-100 group animate-pulse-subtle"
                          title="Tap to break seal"
                        >
                          <Heart className="w-6 h-6 fill-rose-100" />
                          <span className="absolute -bottom-6 text-[10px] whitespace-nowrap font-medium text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                            Tap to Open ✨
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-[#806B62] mt-10">
                        Someone created a digital moment for you.
                      </p>
                    </div>
                  ) : (
                    /* STATE 2: OPENED INTERACTIVE MOMENT PAGE */
                    <div className="flex-1 flex flex-col animate-in fade-in zoom-in-95 duration-500">
                      
                      {/* Audio Track Pill */}
                      <div className="mb-3 p-2 rounded-xl bg-white/70 backdrop-blur-xs border border-rose-200/50 flex items-center justify-between shadow-xs">
                        <div className="flex items-center gap-2 truncate">
                          <button
                            onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                            className="w-7 h-7 rounded-full bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-xs cursor-pointer"
                          >
                            {isPlayingAudio ? (
                              <Volume2 className="w-3.5 h-3.5" />
                            ) : (
                              <VolumeX className="w-3.5 h-3.5" />
                            )}
                          </button>
                          <div className="truncate">
                            <p className="text-[11px] font-semibold truncate leading-tight">
                              Golden Hour (Lofi Piano)
                            </p>
                            <p className="text-[9px] text-[#7A646E] leading-tight">
                              Our Special Song
                            </p>
                          </div>
                        </div>

                        {/* Animated Equalizer Wave */}
                        {isPlayingAudio && (
                          <div className="flex items-end gap-0.5 h-3 px-1">
                            <span className="w-0.5 h-2 bg-rose-500 rounded-full animate-bounce"></span>
                            <span className="w-0.5 h-3.5 bg-rose-500 rounded-full animate-bounce [animation-delay:0.15s]"></span>
                            <span className="w-0.5 h-1.5 bg-rose-500 rounded-full animate-bounce [animation-delay:0.3s]"></span>
                            <span className="w-0.5 h-3 bg-rose-500 rounded-full animate-bounce [animation-delay:0.45s]"></span>
                          </div>
                        )}
                      </div>

                      {/* Recipient Interactive Tabs */}
                      <div className="flex p-1 bg-black/5 rounded-lg text-[10px] font-medium mb-3">
                        <button
                          onClick={() => setActiveTab('letter')}
                          className={`flex-1 py-1 rounded-md transition-all cursor-pointer ${
                            activeTab === 'letter' ? 'bg-white shadow-xs font-semibold text-rose-700' : 'opacity-70'
                          }`}
                        >
                          Letter
                        </button>
                        <button
                          onClick={() => setActiveTab('timeline')}
                          className={`flex-1 py-1 rounded-md transition-all cursor-pointer ${
                            activeTab === 'timeline' ? 'bg-white shadow-xs font-semibold text-rose-700' : 'opacity-70'
                          }`}
                        >
                          Our 730 Days
                        </button>
                        <button
                          onClick={() => setActiveTab('polaroid')}
                          className={`flex-1 py-1 rounded-md transition-all cursor-pointer ${
                            activeTab === 'polaroid' ? 'bg-white shadow-xs font-semibold text-rose-700' : 'opacity-70'
                          }`}
                        >
                          Polaroids
                        </button>
                        <button
                          onClick={() => setActiveTab('question')}
                          className={`flex-1 py-1 rounded-md transition-all cursor-pointer ${
                            activeTab === 'question' ? 'bg-white shadow-xs font-semibold text-rose-700' : 'opacity-70'
                          }`}
                        >
                          Surprise 🎁
                        </button>
                      </div>

                      {/* TAB 1: THE LETTER */}
                      {activeTab === 'letter' && (
                        <div className="flex-1 space-y-3 text-left animate-in fade-in duration-300">
                          <span className="font-handwriting text-lg text-rose-700 block">
                            Dearest Maya,
                          </span>
                          <h3 className="font-serif text-sm font-semibold leading-snug">
                            Two years ago today, you walked into my world and made it softer.
                          </h3>
                          <p className="text-xs leading-relaxed opacity-85">
                            I still remember the rain pouring outside that tiny cafe. You were laughing at how terribly I was trying to fold an origami crane out of a coffee napkin.
                          </p>
                          <p className="text-xs leading-relaxed opacity-85">
                            You've taught me what home feels like. Thank you for every quiet morning, every late-night drive, and every time you held my hand without saying a word.
                          </p>

                          <div className="pt-2 border-t border-black/10">
                            <span className="font-handwriting text-base text-rose-700 block">
                              Forever yours,
                            </span>
                            <span className="font-serif text-xs font-semibold">
                              Julian
                            </span>
                          </div>

                          <div className="p-2.5 rounded-lg bg-rose-50/80 border border-rose-200/60 text-[10px] text-rose-800">
                            <strong>P.S.</strong> Look inside your favorite winter coat pocket before dinner tonight ✨
                          </div>
                        </div>
                      )}

                      {/* TAB 2: OUR TIMELINE */}
                      {activeTab === 'timeline' && (
                        <div className="flex-1 space-y-3 text-left animate-in fade-in duration-300">
                          {/* Counter */}
                          <div className="p-3 rounded-xl bg-linear-to-r from-rose-500 to-pink-500 text-white text-center shadow-xs">
                            <span className="text-[10px] uppercase tracking-wider font-semibold opacity-90">
                              Time Spent Loving You
                            </span>
                            <div className="text-2xl font-serif font-bold mt-0.5">
                              730 Days
                            </div>
                            <span className="text-[10px] opacity-80">
                              17,520 Hours • 1,051,200 Minutes
                            </span>
                          </div>

                          {/* Timeline entries */}
                          <div className="space-y-2 text-xs">
                            <div className="p-2 rounded-lg bg-white/70 border border-black/5">
                              <span className="text-[9px] font-semibold text-rose-600 block">Nov 14, 2024</span>
                              <strong className="text-[11px] block">First Coffee in the Rain</strong>
                              <p className="text-[10px] opacity-75 mt-0.5">
                                We talked until the barista flipped the closed sign.
                              </p>
                            </div>
                            <div className="p-2 rounded-lg bg-white/70 border border-black/5">
                              <span className="text-[9px] font-semibold text-rose-600 block">July 22, 2025</span>
                              <strong className="text-[11px] block">Our Stargazing Trip in Jogja</strong>
                              <p className="text-[10px] opacity-75 mt-0.5">
                                We got lost on the hilltop and watched sunrise together.
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* TAB 3: POLAROIDS */}
                      {activeTab === 'polaroid' && (
                        <div className="flex-1 flex flex-col items-center justify-center p-2 text-center animate-in fade-in duration-300">
                          <div className="bg-white p-2.5 pb-4 shadow-md rounded-xs border border-stone-200 rotate-1 max-w-[200px] text-[#2C2125]">
                            <img
                              src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=400&auto=format&fit=crop"
                              alt="Couple memory"
                              className="w-full aspect-[4/3] object-cover rounded-2xs"
                            />
                            <p className="font-handwriting text-sm text-[#4E343E] mt-2">
                              "The sunset we promised never to forget"
                            </p>
                            <span className="text-[9px] text-[#8C7680] block">
                              August 19, 2025
                            </span>
                          </div>
                          <p className="text-[10px] opacity-70 mt-3 font-medium">
                            📸 Tap to cycle through memories
                          </p>
                        </div>
                      )}

                      {/* TAB 4: SURPRISE / QUESTION */}
                      {activeTab === 'question' && (
                        <div className="flex-1 flex flex-col items-center justify-center text-center p-3 animate-in fade-in duration-300">
                          {!hasAnsweredQuestion ? (
                            <div className="space-y-3">
                              <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 mx-auto">
                                <Gift className="w-5 h-5" />
                              </div>
                              <h4 className="font-serif text-sm font-semibold">
                                One quick question for you:
                              </h4>
                              <p className="text-xs opacity-85">
                                Will you be my date for dinner this Saturday and every Saturday after?
                              </p>
                              <div className="flex flex-col gap-2 pt-2">
                                <button
                                  onClick={handleAcceptQuestion}
                                  className="w-full py-2 px-3 rounded-lg bg-rose-600 text-white font-semibold text-xs shadow-xs hover:bg-rose-700 transition-all cursor-pointer"
                                >
                                  Yes, absolutely! ❤️
                                </button>
                                <button
                                  onClick={handleAcceptQuestion}
                                  className="w-full py-2 px-3 rounded-lg bg-pink-100 text-rose-800 font-semibold text-xs hover:bg-pink-200 transition-all cursor-pointer"
                                >
                                  Always yes! ✨
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-2 animate-in zoom-in-95 duration-300">
                              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                                <Heart className="w-6 h-6 fill-emerald-500" />
                              </div>
                              <h4 className="font-serif text-sm font-semibold text-emerald-800">
                                She said YES! 🎉
                              </h4>
                              <p className="text-[11px] opacity-85">
                                Julian has been notified. Get ready for something magical tonight!
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Re-seal reset button */}
                      <div className="mt-auto pt-2 border-t border-black/5 flex justify-center">
                        <button
                          onClick={() => {
                            setIsOpen(false);
                            setHasAnsweredQuestion(false);
                          }}
                          className="flex items-center gap-1 text-[10px] text-rose-600 hover:text-rose-800 font-medium cursor-pointer"
                        >
                          <RefreshCw className="w-3 h-3" />
                          <span>Fold Letter & Seal Again</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* iPhone Home Indicator bar */}
                <div className="py-2 flex justify-center">
                  <div className="w-28 h-1 bg-stone-400/50 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
