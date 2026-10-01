import React from 'react';
import { Heart, Sparkles, ArrowRight, ShieldCheck, Smartphone } from 'lucide-react';

interface FinalCtaProps {
  onOpenCreateModal: () => void;
  onExploreTemplates: () => void;
}

export const FinalCta: React.FC<FinalCtaProps> = ({
  onOpenCreateModal,
  onExploreTemplates,
}) => {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="relative rounded-[40px] bg-linear-to-br from-[#2B1722] via-[#3E1E2E] to-[#1E1119] text-white p-8 sm:p-12 md:p-16 overflow-hidden shadow-2xl text-center">
          
          {/* Background Ambient Glows & Sparkles */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Floating Heart Icon */}
          <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mx-auto mb-8 text-rose-300 shadow-md">
            <Heart className="w-7 h-7 fill-rose-400 text-rose-400 animate-pulse-subtle" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-6 tracking-tight leading-[1.15]">
            Their smile when they open this link is only{' '}
            <span className="italic text-rose-300 font-normal">3 minutes away.</span>
          </h2>

          <p className="max-w-xl mx-auto text-sm sm:text-base md:text-lg text-rose-100/80 mb-10 leading-relaxed font-light">
            You don't need an occasion to remind someone why they matter. Choose a template, write what's in your heart, and send them something they'll cherish forever.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mb-10">
            <button
              onClick={onOpenCreateModal}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-linear-to-r from-rose-500 via-rose-600 to-rose-700 hover:from-rose-400 hover:to-rose-600 text-white font-semibold text-base shadow-xl shadow-rose-900/40 hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-rose-200" />
              <span>Create Something Special</span>
              <ArrowRight className="w-4 h-4 text-rose-200" />
            </button>

            <button
              onClick={onExploreTemplates}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-base border border-white/20 backdrop-blur-xs transition-all duration-200 cursor-pointer"
            >
              <span>Explore All Templates</span>
            </button>
          </div>

          {/* Micro assurances */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-rose-200/70">
            <span className="flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-rose-300" />
              <span>No app download required</span>
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-rose-300" />
              <span>Private link only accessible to you two</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 fill-rose-300 text-rose-300" />
              <span>Free to craft and preview</span>
            </span>
          </div>

        </div>
      </div>
    </section>
  );
};
