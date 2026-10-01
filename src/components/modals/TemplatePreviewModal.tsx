import { useState } from 'react';
import type { Template } from '../../types';
import {
  X,
  Heart,
  Clock,
  Sparkles,
  ArrowRight,
  Volume2,
  VolumeX,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface TemplatePreviewModalProps {
  template: Template | null;
  onClose: () => void;
  onUseTemplate: (template: Template) => void;
}

export const TemplatePreviewModal = ({
  template,
  onClose,
  onUseTemplate,
}: TemplatePreviewModalProps) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(true);
  const [isSealBroken, setIsSealBroken] = useState(false);

  if (!template) return null;

  const handleBreakSeal = () => {
    setIsSealBroken(true);
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#e11d48', '#fda4af', '#f43f5e', '#ffd1dc'],
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[92vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-rose-100">
        
        {/* Modal Top Header */}
        <div className="px-6 py-4 border-b border-rose-100 flex items-center justify-between bg-[#FAF7F5]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#635058]">
              Recipient Live Preview • {template.categoryLabel}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-rose-100/60 hover:bg-rose-200 text-[#4E3942] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Template Simulated Page Canvas */}
          <div className={`rounded-2xl p-6 sm:p-8 border shadow-xs ${template.themeStyle.cardClass} relative overflow-hidden transition-all duration-300`}>
            
            {/* Ambient Petal/Light cues */}
            <div className="absolute top-2 right-2 opacity-20 pointer-events-none">
              <Heart className="w-28 h-28 fill-current text-rose-500" />
            </div>

            {/* Embedded Audio Bar */}
            <div className="mb-6 p-2.5 rounded-xl bg-black/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                  className="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center cursor-pointer"
                >
                  {isPlayingAudio ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </button>
                <div>
                  <p className="text-xs font-semibold leading-tight">{template.sampleSong.title}</p>
                  <p className="text-[10px] opacity-75">{template.sampleSong.artist}</p>
                </div>
              </div>
              {isPlayingAudio && (
                <div className="flex items-end gap-1 h-3 pr-2">
                  <span className="w-0.5 h-3 bg-rose-500 rounded-full animate-bounce"></span>
                  <span className="w-0.5 h-4 bg-rose-500 rounded-full animate-bounce [animation-delay:0.15s]"></span>
                  <span className="w-0.5 h-2 bg-rose-500 rounded-full animate-bounce [animation-delay:0.3s]"></span>
                </div>
              )}
            </div>

            {/* Special preview for our-story-novel vs regular letters */}
            {template.id === 'our-story-novel' ? (
              <div className="space-y-6">
                <div className="bg-[#0E1726] text-[#FAF8F5] p-6 rounded-2xl border border-[#22304A] text-center space-y-4 shadow-xl">
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C5A880]">
                    CONTEMPORARY ROMANCE NOVEL PROTOTYPE
                  </span>
                  <div className="space-y-1">
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#FAF8F5] tracking-widest font-normal uppercase">
                      OUR STORY
                    </h3>
                    <p className="font-serif italic text-xs text-[#C5A880]">
                      “the little things that became us”
                    </p>
                  </div>
                  <div className="w-12 h-px bg-[#C5A880]/40 mx-auto" />
                  <p className="font-sans text-xs tracking-widest text-[#FAF8F5] uppercase">
                    ADINDA & MAS L • 03 OCTOBER
                  </p>
                  <p className="font-serif text-xs text-[#CBD5E1] max-w-md mx-auto leading-relaxed italic">
                    “Aku masih ingat bagaimana dulu aku melihatmu. Saat itu, kamu hanyalah anak laki-laki paling pintar di kelas. Seseorang yang terasa cukup jauh untuk sekadar kusapa...”
                  </p>
                  <div className="pt-2 flex flex-wrap justify-center gap-2 text-[10px] font-mono text-[#C5A880]">
                    <span className="px-2.5 py-1 rounded bg-[#131D30] border border-[#22304A]">Hardcover Navy Mockup</span>
                    <span className="px-2.5 py-1 rounded bg-[#131D30] border border-[#22304A]">Open-Book Spread</span>
                    <span className="px-2.5 py-1 rounded bg-[#131D30] border border-[#22304A]">Biner Story Chat</span>
                    <span className="px-2.5 py-1 rounded bg-[#131D30] border border-[#22304A]">Relationship Timeline</span>
                  </div>
                </div>
              </div>
            ) : !isSealBroken ? (
              <div className="py-8 text-center flex flex-col items-center justify-center">
                <p className="text-xs tracking-widest uppercase font-mono opacity-60 mb-2">
                  Handcrafted for {template.sampleRecipient}
                </p>
                <h3 className="font-serif text-2xl font-bold mb-6">
                  {template.sampleHeadline}
                </h3>
                
                {/* Wax seal button */}
                <button
                  onClick={handleBreakSeal}
                  className="relative group w-16 h-16 rounded-full bg-linear-to-br from-rose-600 to-rose-900 border-2 border-rose-300 text-rose-100 flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer animate-pulse-subtle"
                  title="Click to break wax seal"
                >
                  <Heart className="w-7 h-7 fill-rose-100" />
                  <span className="absolute -bottom-7 whitespace-nowrap text-xs font-semibold text-rose-600 bg-white px-2.5 py-0.5 rounded-full border border-rose-200 shadow-2xs">
                    Tap to open letter ✨
                  </span>
                </button>
              </div>
            ) : (
              <div className="space-y-4 animate-in fade-in duration-500">
                <div className="border-b border-black/10 pb-3">
                  <span className="font-handwriting text-xl text-rose-700 block">
                    Dearest {template.sampleRecipient},
                  </span>
                  <h3 className="font-serif text-lg sm:text-xl font-bold mt-1">
                    {template.sampleHeadline}
                  </h3>
                </div>

                <p className="text-sm leading-relaxed opacity-90">
                  {template.sampleMessage}
                </p>

                <div className="pt-4 border-t border-black/10 flex justify-between items-end">
                  <div>
                    <span className="font-handwriting text-lg text-rose-700 block">With all my heart,</span>
                    <span className="font-serif text-xs font-semibold">{template.sampleSender}</span>
                  </div>
                  <button
                    onClick={() => setIsSealBroken(false)}
                    className="text-xs text-rose-600 underline font-medium cursor-pointer"
                  >
                    Reset letter
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Template Details Breakdown */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#35252D]">
              Included in this template:
            </h4>
            <div className="grid sm:grid-cols-2 gap-2">
              {template.interactiveFeatures.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2.5 rounded-xl bg-rose-50/60 border border-rose-100/70 text-xs text-[#523C46]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer CTA */}
        <div className="px-6 py-4 border-t border-rose-100 bg-[#FAF7F5] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-[#6F5B65]">
            <Clock className="w-3.5 h-3.5 text-rose-500" />
            <span>Ready to personalize in ~{template.estimatedMinutesToMake} minutes</span>
          </div>

          <button
            onClick={() => {
              onClose();
              onUseTemplate(template);
            }}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs shadow-md shadow-rose-600/25 transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Personalize This Template</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
