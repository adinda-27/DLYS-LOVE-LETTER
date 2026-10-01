import type { Template } from '../../types';
import { Eye, Sparkles, Clock, Music2, ArrowUpRight } from 'lucide-react';

interface TemplateCardProps {
  template: Template;
  onPreview: (template: Template) => void;
  onUseTemplate: (template: Template) => void;
}

export const TemplateCard = ({
  template,
  onPreview,
  onUseTemplate,
}: TemplateCardProps) => {
  return (
    <div className="group rounded-3xl bg-white border border-rose-100/90 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between">
      {/* Thumbnail and Visual Mockup Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-rose-50/50">
        <img
          src={template.thumbnailUrl}
          alt={template.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        
        {/* Soft Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
          <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-white/90 backdrop-blur-md text-[#2C1D24] shadow-xs">
            {template.categoryLabel}
          </span>
          {template.badge && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase bg-rose-600 text-white shadow-xs">
              {template.badge}
            </span>
          )}
        </div>

        {/* Bottom preview info inside image */}
        <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white text-xs">
          <span className="flex items-center gap-1.5 font-medium drop-shadow-md">
            <Music2 className="w-3.5 h-3.5 text-rose-300" />
            <span className="truncate max-w-[160px]">{template.sampleSong.title}</span>
          </span>
          <span className="flex items-center gap-1 text-[11px] bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-full drop-shadow-md">
            <Clock className="w-3 h-3 text-rose-300" />
            <span>~{template.estimatedMinutesToMake} min</span>
          </span>
        </div>

        {/* Hover Quick Action Overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3 p-4">
          <button
            onClick={() => onPreview(template)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-[#2C1D24] font-semibold text-xs shadow-lg hover:bg-rose-50 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-rose-600" />
            <span>Preview</span>
          </button>
          <button
            onClick={() => onUseTemplate(template)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-rose-600 text-white font-semibold text-xs shadow-lg hover:bg-rose-700 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Use Template</span>
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Mood indicator */}
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-600 mb-1.5">
            <span>✨ {template.mood}</span>
          </div>

          <h3 className="font-serif text-xl font-bold text-[#27181F] mb-2 leading-snug group-hover:text-rose-700 transition-colors">
            {template.title}
          </h3>

          <p className="text-xs sm:text-sm text-[#66545C] font-normal leading-relaxed line-clamp-2 mb-4">
            {template.description}
          </p>

          {/* Interactive features tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {template.interactiveFeatures.map((feat, idx) => (
              <span
                key={idx}
                className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-rose-50/70 text-[#684C58] border border-rose-100/60"
              >
                {feat}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-4 border-t border-rose-100/60 flex items-center gap-2">
          <button
            onClick={() => onPreview(template)}
            className="flex-1 py-2.5 px-3 rounded-xl border border-rose-200/80 text-rose-700 hover:bg-rose-50 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Live Recipient Preview</span>
          </button>
          
          <button
            onClick={() => onUseTemplate(template)}
            className="py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold flex items-center justify-center gap-1 transition-all shadow-xs cursor-pointer"
            title="Use this template"
          >
            <span>Use</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
