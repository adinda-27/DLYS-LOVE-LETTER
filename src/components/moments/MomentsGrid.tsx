import { useState } from 'react';
import { MOMENT_TYPES } from '../../data/mockData';
import type { MomentCategory } from '../../types';
import {
  Heart,
  CalendarHeart,
  Gift,
  Gem,
  BookHeart,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface MomentsGridProps {
  onSelectMoment: (category: MomentCategory) => void;
  onOpenCreateWithCategory: (category: MomentCategory) => void;
}

const iconMap: Record<string, LucideIcon> = {
  MailHeart: Heart,
  CalendarHeart: CalendarHeart,
  Gift: Gift,
  Gem: Gem,
  BookHeart: BookHeart,
  Sparkles: Sparkles,
};

export const MomentsGrid = ({
  onSelectMoment,
  onOpenCreateWithCategory,
}: MomentsGridProps) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="moments" className="py-20 md:py-28 bg-[#FBF6F3]/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-100/70 text-rose-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <Heart className="w-3.5 h-3.5 fill-rose-600 text-rose-600" />
            <span>Made For Every Romantic Milestone</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#25161C] mb-4">
            What will you create for them?
          </h2>
          <p className="text-base sm:text-lg text-[#614F57] leading-relaxed">
            From quiet confessions to life-changing questions, DLYS offers intimate formats designed to make hearts beat a little faster.
          </p>
        </div>

        {/* The 6 Moments Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {MOMENT_TYPES.map((moment) => {
            const Icon = iconMap[moment.iconName] || Heart;
            const isHovered = hoveredId === moment.id;

            return (
              <div
                key={moment.id}
                onMouseEnter={() => setHoveredId(moment.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`group relative rounded-3xl bg-white p-7 border transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-xl hover:-translate-y-1.5 ${
                  isHovered ? 'border-rose-300 ring-2 ring-rose-100' : 'border-rose-100/80'
                }`}
              >
                <div>
                  {/* Top Bar with Icon & Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-13 h-13 rounded-2xl ${moment.accentBg} ${moment.accentBorder} border flex items-center justify-center text-rose-600 group-hover:scale-110 transition-transform duration-300 shadow-xs`}>
                      <Icon className="w-6 h-6 stroke-[1.8]" />
                    </div>
                    <span className="text-[11px] font-semibold text-rose-700 bg-rose-50 border border-rose-200/60 px-2.5 py-1 rounded-full">
                      {moment.badge}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2A1921] mb-1.5 group-hover:text-rose-700 transition-colors">
                    {moment.title}
                  </h3>
                  <p className="text-xs font-medium text-rose-500 mb-3">
                    {moment.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-[#66545C] leading-relaxed mb-6 font-normal">
                    {moment.description}
                  </p>

                  {/* Feature Pills */}
                  <div className="space-y-2 mb-6 pt-3 border-t border-rose-50">
                    {moment.highlightFeatures.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-[#523F47]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Action CTAs */}
                <div className="pt-4 border-t border-rose-50 flex items-center justify-between gap-3">
                  <button
                    onClick={() => onSelectMoment(moment.id)}
                    className="text-xs font-semibold text-rose-600 hover:text-rose-800 transition-colors cursor-pointer"
                  >
                    View templates
                  </button>

                  <button
                    onClick={() => onOpenCreateWithCategory(moment.id)}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-rose-50 hover:bg-rose-600 text-rose-700 hover:white hover:text-white text-xs font-semibold transition-all duration-200 cursor-pointer shadow-2xs"
                  >
                    <span>Create This</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
