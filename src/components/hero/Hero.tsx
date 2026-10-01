import { Heart, Sparkles, ArrowRight, Play, Compass } from 'lucide-react';

interface HeroProps {
  onOpenCreateModal: () => void;
  onExploreTemplates: () => void;
  onScrollToPreview: () => void;
}

export const Hero = ({
  onOpenCreateModal,
  onExploreTemplates,
  onScrollToPreview,
}: HeroProps) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background Soft Romantic Radial Gradients */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-rose-200/35 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-subtle" />
      <div className="absolute top-48 left-1/4 w-[400px] h-[350px] bg-amber-100/40 rounded-full blur-2xl pointer-events-none -z-10" />
      <div className="absolute top-36 right-1/4 w-[380px] h-[380px] bg-pink-200/30 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Emotional Micro Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200/80 shadow-xs mb-6 sm:mb-8 text-xs sm:text-sm font-medium text-rose-700 animate-float-slow">
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
          <span>The thoughtful way to celebrate someone you adore</span>
          <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
          <span className="font-handwriting text-base font-semibold text-rose-800">
            Dear Love, Yours
          </span>
        </div>

        {/* Short Emotional Headline */}
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-[#23151B] leading-[1.12] mb-6">
          Turn feelings into{' '}
          <span className="relative inline-block text-transparent bg-clip-text bg-linear-to-r from-rose-600 via-pink-600 to-rose-700 italic font-normal">
            something you can share.
            <svg
              className="absolute -bottom-2 left-0 w-full text-rose-300 -z-10 overflow-visible opacity-70"
              viewBox="0 0 250 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 14C60 6 180 4 247 11"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h1>

        {/* Supporting Description */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-[#5E4C54] font-normal leading-relaxed mb-10 sm:mb-12">
          Create breathtaking, interactive web pages for the one you love.
          Send a wax-sealed love letter, a timeline of your days together, or a playful surprise —
          complete with your song, photos, and quiet words from the heart.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mb-14">
          <button
            onClick={onOpenCreateModal}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-linear-to-r from-rose-600 via-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-semibold text-base shadow-xl shadow-rose-600/30 hover:shadow-2xl hover:shadow-rose-600/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-rose-200" />
            <span>Create Something Special</span>
            <ArrowRight className="w-4 h-4 text-rose-200 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onExploreTemplates}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-white/80 hover:bg-white text-[#3C2A31] hover:text-rose-700 font-semibold text-base border border-rose-200/80 shadow-xs hover:shadow-md hover:border-rose-300 transition-all duration-200 cursor-pointer"
          >
            <Compass className="w-4 h-4 text-rose-500" />
            <span>Explore Templates</span>
          </button>

          <button
            onClick={onScrollToPreview}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-rose-600 hover:text-rose-800 transition-colors"
          >
            <Play className="w-3.5 h-3.5 fill-rose-600" />
            <span>Try interactive preview</span>
          </button>
        </div>

        {/* Trust & Emotional Value Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-4 border-t border-rose-100/60 text-xs sm:text-sm text-[#735F67]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Takes ~3 minutes to create</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-400"></span>
            <span>No coding or design skills needed</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            <span>Secret shareable link just for you two</span>
          </div>
        </div>
      </div>
    </section>
  );
};
