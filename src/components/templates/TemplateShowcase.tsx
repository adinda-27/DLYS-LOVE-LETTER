import { TEMPLATES_DATA } from '../../data/mockData';
import type { MomentCategory, Template } from '../../types';
import { TemplateCard } from './TemplateCard';
import { Sparkles } from 'lucide-react';

interface TemplateShowcaseProps {
  selectedCategory: MomentCategory;
  onSelectCategory: (category: MomentCategory) => void;
  onPreviewTemplate: (template: Template) => void;
  onUseTemplate: (template: Template) => void;
}

const CATEGORY_TABS: { id: MomentCategory; label: string }[] = [
  { id: 'all', label: 'All Templates' },
  { id: 'love-letter', label: 'Love Letters' },
  { id: 'anniversary', label: 'Anniversaries' },
  { id: 'birthday', label: 'Birthdays' },
  { id: 'proposal', label: 'Proposals' },
  { id: 'our-story', label: 'Our Story' },
  { id: 'digital-gift', label: 'Digital Gifts' },
];

export const TemplateShowcase = ({
  selectedCategory,
  onSelectCategory,
  onPreviewTemplate,
  onUseTemplate,
}: TemplateShowcaseProps) => {
  const filteredTemplates =
    selectedCategory === 'all'
      ? TEMPLATES_DATA
      : TEMPLATES_DATA.filter((t) => t.category === selectedCategory);

  return (
    <section id="templates" className="py-20 md:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-50 border border-rose-200/80 text-rose-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Romance & Aesthetics</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#25161C] mb-4">
            Pick a mood that speaks your heart.
          </h2>
          <p className="text-base sm:text-lg text-[#614F57] leading-relaxed">
            Every template is crafted like a boutique editorial story — responsive on all screens, equipped with music, and ready to personalize in minutes.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {CATEGORY_TABS.map((tab) => {
            const isActive = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onSelectCategory(tab.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-600/25'
                    : 'bg-white text-[#523E47] border border-rose-100 hover:border-rose-300 hover:bg-rose-50/50'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template) => (
            <TemplateCard
              key={template.id}
              template={template}
              onPreview={onPreviewTemplate}
              onUseTemplate={onUseTemplate}
            />
          ))}
        </div>

        {/* Empty state safeguard */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-rose-100 p-8">
            <p className="text-base text-[#614F57] mb-4">
              More templates for this category are being handcrafted right now!
            </p>
            <button
              onClick={() => onSelectCategory('all')}
              className="px-5 py-2 rounded-full bg-rose-600 text-white text-xs font-semibold"
            >
              View All Templates
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
