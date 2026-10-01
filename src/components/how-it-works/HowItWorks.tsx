import { useState } from 'react';
import { HOW_IT_WORKS_STEPS } from '../../data/mockData';
import {
  Sparkles,
  ArrowRight,
  Music,
  CheckCircle,
  Heart
} from 'lucide-react';

interface HowItWorksProps {
  onOpenCreateModal: () => void;
}

export const HowItWorks = ({ onOpenCreateModal }: HowItWorksProps) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const stepPreviews = [
    {
      title: 'Step 1: Explore curated aesthetics',
      headline: 'Find the mood that feels like your relationship',
      visual: (
        <div className="bg-[#FAF4EB] p-5 rounded-2xl border border-amber-200 shadow-sm text-left">
          <div className="flex items-center justify-between mb-3 text-xs font-mono text-amber-800">
            <span>TEMPLATE SELECTOR</span>
            <span className="text-rose-600 font-semibold">Vintage Linen</span>
          </div>
          <div className="h-28 bg-[#F3ECE0] rounded-xl border border-amber-300/60 p-4 flex flex-col justify-center items-center text-center">
            <span className="font-serif text-lg text-[#3E2B20] font-semibold">Old Paper & Wax Seal</span>
            <span className="text-xs text-amber-800 mt-1">Warm, nostalgic, and intimate</span>
          </div>
        </div>
      ),
    },
    {
      title: 'Step 2: Add your heartfelt personal touch',
      headline: 'Your words, your song, your photos',
      visual: (
        <div className="bg-white p-5 rounded-2xl border border-rose-100 shadow-sm text-left space-y-3">
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-rose-700 uppercase">Who is this for?</label>
            <div className="px-3 py-2 bg-rose-50/50 rounded-lg border border-rose-100 text-xs text-[#2A1921] font-medium">
              Maya ❤️
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-[11px] font-semibold text-rose-700 uppercase">Your Background Song</label>
            <div className="flex items-center gap-2 px-3 py-2 bg-rose-50/50 rounded-lg border border-rose-100 text-xs text-[#2A1921]">
              <Music className="w-3.5 h-3.5 text-rose-500" />
              <span>Golden Hour (Lofi Piano)</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      title: 'Step 3: Test on mobile before sending',
      headline: 'Touch every button, hear the melody',
      visual: (
        <div className="bg-stone-900 p-4 rounded-2xl border border-stone-800 text-stone-200 text-left shadow-lg">
          <div className="flex items-center justify-between text-[11px] text-stone-400 mb-2">
            <span>MOBILE PREVIEW</span>
            <span className="text-emerald-400 font-medium">● Interactive Mode</span>
          </div>
          <div className="p-3 bg-stone-800 rounded-xl text-center space-y-2">
            <div className="w-8 h-8 rounded-full bg-rose-600 mx-auto flex items-center justify-center">
              <Heart className="w-4 h-4 fill-white text-white" />
            </div>
            <p className="text-xs font-serif text-rose-200">Tap wax seal to open letter</p>
          </div>
        </div>
      ),
    },
    {
      title: 'Step 4: Send the private link',
      headline: 'Watch their eyes light up',
      visual: (
        <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-sm text-left space-y-3">
          <div className="flex items-center gap-2 text-emerald-700 text-xs font-semibold">
            <CheckCircle className="w-4 h-4 text-emerald-500" />
            <span>Keepsake Page Ready to Share!</span>
          </div>
          <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-200/60 font-mono text-xs text-emerald-900 truncate">
            https://dlys.love/m/maya-julian
          </div>
          <p className="text-[11px] text-[#69545D]">
            Send via WhatsApp, iMessage, Instagram DM, or print a QR code card!
          </p>
        </div>
      ),
    },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-[#FAF5F2]/50 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-100/80 text-rose-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Effortless Creation</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#25161C] mb-4">
            How it works in 4 simple steps.
          </h2>
          <p className="text-base sm:text-lg text-[#614F57] leading-relaxed">
            No design expertise or technical skills needed. Just your genuine feelings and a few minutes of your time.
          </p>
        </div>

        {/* 4 Steps Interactive Layout */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left: Step list */}
          <div className="lg:col-span-7 space-y-4">
            {HOW_IT_WORKS_STEPS.map((step, idx) => {
              const isSelected = activeStepIndex === idx;

              return (
                <div
                  key={step.step}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`p-6 rounded-3xl border transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-white border-rose-300 shadow-md ring-2 ring-rose-100'
                      : 'bg-white/50 border-rose-100/60 hover:bg-white hover:border-rose-200'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={`font-serif text-2xl font-bold shrink-0 transition-colors ${
                        isSelected ? 'text-rose-600' : 'text-[#8E7983]'
                      }`}
                    >
                      {step.step}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2A1A22]">
                          {step.title}
                        </h3>
                        <span className="text-[11px] font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                          {step.badge}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm font-medium text-rose-500 mb-1.5">
                        {step.subtitle}
                      </p>
                      <p className="text-xs sm:text-sm text-[#66545C] leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Simulated step visual preview */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-7 border border-rose-100 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-rose-50">
                <span className="text-xs font-semibold text-rose-600 uppercase tracking-wider">
                  Live Preview Step {HOW_IT_WORKS_STEPS[activeStepIndex].step}
                </span>
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
              </div>

              <h4 className="font-serif text-xl font-bold text-[#2A1A22] mb-1">
                {stepPreviews[activeStepIndex].title}
              </h4>
              <p className="text-xs text-[#66545C] mb-6">
                {stepPreviews[activeStepIndex].headline}
              </p>

              {/* Dynamic visual representation */}
              <div className="mb-6">
                {stepPreviews[activeStepIndex].visual}
              </div>

              {/* Quick CTA inside step card */}
              <button
                onClick={onOpenCreateModal}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-linear-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-semibold text-xs shadow-md shadow-rose-600/20 cursor-pointer"
              >
                <span>Try Creating Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
