import { EMOTIONAL_TESTIMONIALS } from '../../data/mockData';
import { Heart, Sparkles, MessageCircle, Quote } from 'lucide-react';

export const EmotionalValue = () => {
  return (
    <section id="why-dlys" className="py-20 md:py-28 relative overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-rose-200/25 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Core Philosophy Banner */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200/80 text-rose-700 text-xs font-semibold uppercase tracking-wider mb-4">
            <Heart className="w-3.5 h-3.5 fill-rose-600 text-rose-600" />
            <span>Why DLYS Exists</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#25161C] mb-6 leading-tight">
            Some feelings are too meaningful for a blue chat bubble.
          </h2>

          <p className="text-base sm:text-lg text-[#614F57] leading-relaxed mb-8">
            In an era of fleeting notifications, disappearing stories, and fast texts, sincere emotion often gets lost in the noise.
            DLYS was born from a simple belief: <strong className="text-rose-900 font-semibold">your love story deserves its own sacred corner on the internet.</strong>
          </p>

          <div className="p-6 rounded-3xl bg-linear-to-r from-rose-500/10 via-pink-500/10 to-amber-500/10 border border-rose-200/80 text-[#3C2832]">
            <p className="font-serif italic text-lg sm:text-xl font-medium">
              “Turn feelings into something you can share — something they can revisit whenever they miss you, right on their phone.”
            </p>
          </div>
        </div>

        {/* The Contrast: Ordinary Text vs DLYS Keepsake */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          
          {/* Card 1: What happens now */}
          <div className="bg-white/70 backdrop-blur-xs p-8 rounded-3xl border border-stone-200/80 shadow-xs relative">
            <div className="w-10 h-10 rounded-xl bg-stone-100 flex items-center justify-center text-stone-600 mb-4">
              <MessageCircle className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#3B2C33] mb-2">
              A standard chat message
            </h3>
            <p className="text-sm text-[#735F68] leading-relaxed mb-4">
              Lost under work notifications, grocery lists, and group chats within 24 hours. No music, no atmosphere, no anticipation.
            </p>
            <ul className="space-y-2 text-xs text-[#6B5A62]">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-stone-400"></span>
                <span>Feels transactional and casual</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-stone-400"></span>
                <span>Scrolled past and easily forgotten</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-stone-400"></span>
                <span>Cannot play your song or unveil secrets</span>
              </li>
            </ul>
          </div>

          {/* Card 2: The DLYS Experience */}
          <div className="bg-linear-to-br from-white via-rose-50/50 to-pink-50/70 p-8 rounded-3xl border border-rose-300 shadow-md relative ring-2 ring-rose-100">
            <div className="w-10 h-10 rounded-xl bg-rose-600 flex items-center justify-center text-white mb-4 shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-xl font-bold text-rose-950 mb-2">
              A DLYS Digital Keepsake
            </h3>
            <p className="text-sm text-[#5B424D] leading-relaxed mb-4">
              An intimate web page dedicated solely to your person. A digital wax seal, your private song, interactive photo memories, and words from the bottom of your heart.
            </p>
            <ul className="space-y-2 text-xs text-[#523C46]">
              <li className="flex items-center gap-2">
                <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 shrink-0" />
                <span className="font-medium">Feels like receiving a handwritten love letter at midnight</span>
              </li>
              <li className="flex items-center gap-2">
                <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 shrink-0" />
                <span className="font-medium">A permanent sanctuary they can bookmark and replay anytime</span>
              </li>
              <li className="flex items-center gap-2">
                <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 shrink-0" />
                <span className="font-medium">Interactive touchpoints that make them smile, cry, and remember</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Stories from real couples */}
        <div className="text-center max-w-xl mx-auto mb-10">
          <h3 className="font-serif text-2xl font-bold text-[#2A1921]">
            Real moments, real tears of joy.
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {EMOTIONAL_TESTIMONIALS.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-7 rounded-3xl border border-rose-100 shadow-xs flex flex-col justify-between"
            >
              <div>
                <Quote className="w-6 h-6 text-rose-300 mb-3" />
                <p className="text-xs sm:text-sm text-[#4E3942] italic leading-relaxed mb-6 font-normal">
                  "{item.quote}"
                </p>
              </div>
              <div className="pt-4 border-t border-rose-50 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-xs text-[#281820]">{item.author}</h4>
                  <p className="text-[11px] text-[#7A6670]">{item.moment}</p>
                </div>
                <span className="text-[10px] font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                  {item.tag}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
