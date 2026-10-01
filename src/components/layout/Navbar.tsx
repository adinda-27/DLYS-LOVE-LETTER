import { useState, useEffect } from 'react';
import { Heart, Sparkles, Music2, Menu, X, ArrowRight, BookOpen } from 'lucide-react';

interface NavbarProps {
  onOpenCreateModal: () => void;
  onExploreTemplates: () => void;
  onOpenNovelPrototype?: () => void;
}

export const Navbar = ({ onOpenCreateModal, onExploreTemplates, onOpenNovelPrototype }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FAF7F5]/90 backdrop-blur-md border-b border-rose-100/70 shadow-xs py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-full bg-linear-to-br from-rose-500 to-rose-700 flex items-center justify-center text-white shadow-md shadow-rose-500/20 group-hover:scale-105 transition-transform duration-200">
            <Heart className="w-4 h-4 fill-white text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-2xl font-bold tracking-tight text-[#2B1B21] leading-none">
              DLYS
            </span>
            <span className="text-[10px] tracking-widest uppercase font-medium text-rose-500/90 font-sans">
              Dear Love, Yours
            </span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#4A3A40]">
          <a
            href="#preview"
            className="hover:text-rose-600 transition-colors duration-200"
          >
            Live Preview
          </a>
          <a
            href="#moments"
            className="hover:text-rose-600 transition-colors duration-200"
          >
            What You Can Create
          </a>
          <a
            href="#templates"
            className="hover:text-rose-600 transition-colors duration-200"
          >
            Templates
          </a>
          <a
            href="#how-it-works"
            className="hover:text-rose-600 transition-colors duration-200"
          >
            How It Works
          </a>
          <a
            href="#why-dlys"
            className="hover:text-rose-600 transition-colors duration-200"
          >
            Our Philosophy
          </a>
        </nav>

        {/* Ambient Mood & Actions */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Direct Novel Prototype Button */}
          {onOpenNovelPrototype && (
            <button
              onClick={onOpenNovelPrototype}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[#0E1726] bg-[#C5A880]/20 hover:bg-[#C5A880]/30 border border-[#C5A880]/50 transition-all cursor-pointer shadow-2xs"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#A38257]" />
              <span className="font-serif">OUR STORY Prototype</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#A38257] animate-pulse" />
            </button>
          )}

          {/* Subtle Ambient Sound Toggle */}
          <button
            onClick={() => setIsMusicPlaying(!isMusicPlaying)}
            title={isMusicPlaying ? 'Mute romantic ambient' : 'Play romantic ambient snippet'}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#6B5A62] bg-rose-50/80 hover:bg-rose-100/70 border border-rose-200/50 transition-all cursor-pointer"
          >
            <Music2 className={`w-3.5 h-3.5 ${isMusicPlaying ? 'text-rose-600 animate-pulse' : 'text-rose-400'}`} />
            <span className="hidden lg:inline">{isMusicPlaying ? 'Romantic Melody' : 'Soft Mood'}</span>
            {isMusicPlaying && (
              <span className="flex gap-0.5 items-end h-2.5">
                <span className="w-0.5 h-2 bg-rose-500 rounded-full animate-bounce"></span>
                <span className="w-0.5 h-3 bg-rose-500 rounded-full animate-bounce [animation-delay:0.15s]"></span>
                <span className="w-0.5 h-1.5 bg-rose-500 rounded-full animate-bounce [animation-delay:0.3s]"></span>
              </span>
            )}
          </button>

          {/* Primary CTA button */}
          <button
            onClick={onOpenCreateModal}
            className="group flex items-center gap-2 px-5 py-2.5 rounded-full bg-linear-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white text-sm font-semibold shadow-md shadow-rose-600/25 hover:shadow-lg hover:shadow-rose-600/35 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-rose-200 group-hover:rotate-12 transition-transform duration-300" />
            <span>Create Something Special</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onOpenCreateModal}
            className="px-3 py-1.5 rounded-full bg-rose-600 text-white text-xs font-semibold shadow-xs"
          >
            Create
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-[#4A3A40] hover:bg-rose-100/50 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#FAF7F5] border-b border-rose-100 px-6 py-4 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-3 font-medium text-sm text-[#4A3A40]">
            <a
              href="#preview"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-rose-600"
            >
              Live Romantic Preview
            </a>
            <a
              href="#moments"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-rose-600"
            >
              What You Can Create
            </a>
            <a
              href="#templates"
              onClick={() => {
                setMobileMenuOpen(false);
                onExploreTemplates();
              }}
              className="py-1.5 hover:text-rose-600"
            >
              Explore Templates
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-rose-600"
            >
              How It Works
            </a>
            <a
              href="#why-dlys"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-rose-600"
            >
              Our Philosophy
            </a>
            {onOpenNovelPrototype && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenNovelPrototype();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#0E1726] text-[#FAF8F5] font-medium text-xs border border-[#C5A880]/40 shadow-xs"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#C5A880]" />
                <span className="font-serif">OUR STORY Romance Novel Prototype</span>
              </button>
            )}
            <div className="pt-2 border-t border-rose-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCreateModal();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-rose-600 text-white font-medium text-sm shadow-md shadow-rose-600/20"
              >
                <span>Create Something Special</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
