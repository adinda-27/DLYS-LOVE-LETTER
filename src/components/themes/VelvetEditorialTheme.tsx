import { useState, useRef, useEffect } from 'react';
import type { CustomizationData } from '../../types';
import { sounds } from '../../utils/soundEffects';
import {
  Heart,
  Volume2,
  VolumeX,
  Sparkles,
  Gift,
  Cake,
  Flame,
  Wind,
  CheckCircle2,
  Lock,
  ChevronDown,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface VelvetEditorialThemeProps {
  data: CustomizationData;
  isDraftPreview?: boolean;
  onActivateRequest?: () => void;
  className?: string;
}

export const VelvetEditorialTheme = ({
  data,
  isDraftPreview = false,
  onActivateRequest,
  className = '',
}: VelvetEditorialThemeProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isCandleBlown, setIsCandleBlown] = useState(false);
  const [activeWishIndex, setActiveWishIndex] = useState<number | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioSrc = data.song.url || '/audio/golden-hour-piano.wav';

  useEffect(() => {
    const audioEl = audioRef.current;
    return () => {
      if (audioEl) {
        audioEl.pause();
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.75;
      if (isOpen && isPlaying) {
        audioRef.current.load();
        audioRef.current.play().catch(() => {});
      }
    }
  }, [audioSrc, isOpen, isPlaying]);

  const handleOpenGift = () => {
    sounds.playWaxCrack();
    sounds.playRomanticChime();
    setIsOpen(true);
    setIsPlaying(true);

    try {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
      }
    } catch {
      // Audio autoplay handled
    }

    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#BE185D', '#FB7185', '#FDE047', '#FDA4AF'],
      });
    } catch {
      // Confetti fallback
    }
  };

  const handleBlowCandle = () => {
    if (isCandleBlown) return;
    sounds.playRomanticChime();
    setIsCandleBlown(true);

    try {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#F59E0B', '#EF4444', '#EC4899', '#8B5CF6'],
      });
    } catch {
      // Confetti fallback
    }
  };

  const toggleAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const birthdayWishes = [
    {
      title: 'Kesehatan & Kedamaian Jiwa',
      icon: '🌿',
      content:
        'Semoga setiap helaan napasmu di tahun yang baru ini dipenuhi ketenangan, raga yang selalu bugar, dan hati yang senantiasa diliputi kedamaian.',
    },
    {
      title: 'Mimpi & Petualangan Baru',
      icon: '✈️',
      content:
        'Semua target, impian, dan cita-cita yang kamu simpan diam-diam, semoga satu per satu dibukakan jalannya dengan begitu indah.',
    },
    {
      title: 'Cinta Tanpa Batas dari Aku',
      icon: '💍',
      content:
        'Di setiap pertambahan usiamu, cintaku padamu tidak akan berkurang sedikit pun, malah akan semakin dalam setiap harinya.',
    },
  ];

  return (
    <div
      className={`relative w-full max-w-xl mx-auto rounded-3xl overflow-hidden transition-all duration-700 font-sans shadow-2xl bg-[#FCF8F7] text-[#281A1F] border border-[#F5D5DD]/80 ${className}`}
    >
      <audio ref={audioRef} src={audioSrc} loop preload="auto" />

      {/* Watermark Draft Overlay */}
      {isDraftPreview && (
        <div className="sticky top-0 z-40 bg-linear-to-r from-amber-600 via-rose-600 to-amber-600 text-white px-4 py-2.5 shadow-md flex items-center justify-between text-xs backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5" />
            <span className="font-semibold tracking-wide uppercase text-[11px]">
              🔒 DLYS DRAFT PREVIEW • BELUM AKTIF
            </span>
          </div>
          {onActivateRequest && (
            <button
              onClick={onActivateRequest}
              className="bg-white text-rose-700 hover:bg-rose-50 px-3 py-1 rounded-full font-bold text-[11px] shadow transition-all cursor-pointer"
            >
              Aktifkan Link
            </button>
          )}
        </div>
      )}

      {/* PHASE 1: UNOPENED LUXURY GIFT BOX */}
      {!isOpen ? (
        <div className="relative min-h-[580px] p-8 flex flex-col items-center justify-center text-center overflow-hidden">
          {/* Subtle Ambient Background Gradient */}
          <div className="absolute inset-0 bg-linear-to-b from-[#FDF2F4] via-[#FCF8F7] to-[#FCE7EC] pointer-events-none" />

          {/* Issue Badge */}
          <div className="relative z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100/80 border border-rose-200/60 text-rose-800 text-xs font-serif tracking-widest uppercase mb-6">
            <Sparkles className="w-3 h-3 text-rose-600" />
            <span>The Birthday Special Edition</span>
          </div>

          {/* 3D Styled Luxury Gift Box */}
          <div className="relative z-10 my-4 group cursor-pointer" onClick={handleOpenGift}>
            <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-3xl bg-linear-to-br from-[#9D174D] via-[#BE185D] to-[#881337] p-1 shadow-2xl shadow-rose-900/30 transform transition-transform duration-500 group-hover:scale-105">
              {/* Gold Ribbon Vertical */}
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-8 bg-linear-to-r from-amber-200 via-amber-100 to-amber-300 shadow-md" />
              {/* Gold Ribbon Horizontal */}
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-8 bg-linear-to-b from-amber-200 via-amber-100 to-amber-300 shadow-md" />

              {/* Central Golden Bow / Knot */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-linear-to-br from-amber-300 via-yellow-200 to-amber-400 shadow-xl flex items-center justify-center border-2 border-white/60">
                <Gift className="w-8 h-8 text-rose-900 animate-bounce" />
              </div>
            </div>

            {/* Subtle Pulse Ring */}
            <div className="absolute -inset-2 rounded-3xl border-2 border-rose-300/40 animate-pulse pointer-events-none" />
          </div>

          {/* Invitation Text */}
          <div className="relative z-10 mt-6 max-w-sm">
            <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 font-medium tracking-tight">
              A Special Dedication
            </h2>
            <p className="font-serif italic text-rose-700 text-lg mt-1">
              For {data.recipientName}
            </p>
            <p className="text-xs text-stone-500 mt-2 font-mono uppercase tracking-wider">
              Curated with pure love by {data.senderName}
            </p>

            <button
              onClick={handleOpenGift}
              className="mt-6 w-full py-3.5 px-6 rounded-2xl bg-linear-to-r from-rose-700 via-rose-600 to-pink-700 hover:from-rose-600 hover:to-pink-600 text-white font-medium text-sm shadow-xl shadow-rose-700/25 hover:shadow-2xl transition-all cursor-pointer flex items-center justify-center gap-2 group"
            >
              <Sparkles className="w-4 h-4 text-amber-200 group-hover:rotate-12 transition-transform" />
              <span>Buka Kado & Kejutan Ulang Tahun</span>
            </button>
          </div>
        </div>
      ) : (
        /* PHASE 2: EDITORIAL MAGAZINE KEEPSAKE */
        <div className="relative p-6 sm:p-10 space-y-8 animate-in fade-in zoom-in-95 duration-700">
          
          {/* Editorial Masthead */}
          <header className="border-b-2 border-rose-900/10 pb-4 text-center">
            <div className="flex items-center justify-between text-[10px] sm:text-xs font-mono tracking-widest text-stone-400 uppercase mb-2">
              <span>SPECIAL ISSUE NO. {new Date().getFullYear()}</span>
              <span>DLYS EDITORIAL</span>
              <span>FOREVER & ALWAYS</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-stone-900 uppercase">
              CELEBRATING {data.recipientName}
            </h1>

            <p className="font-serif italic text-rose-700 text-sm sm:text-base mt-1">
              "The sweetest chapter of another beautiful year"
            </p>
          </header>

          {/* Luxury Minimalist Audio Bar */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-rose-50/80 border border-rose-200/60 shadow-xs">
            <div className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-full bg-rose-700 text-white flex items-center justify-center shadow-sm ${
                  isPlaying ? 'animate-spin' : ''
                }`}
                style={{ animationDuration: '4s' }}
              >
                <Sparkles className="w-4 h-4 text-amber-200" />
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold text-stone-900">
                  {data.song.title}
                </p>
                <p className="text-[11px] text-stone-500">
                  {data.song.artist}
                </p>
              </div>
            </div>

            <button
              onClick={toggleAudio}
              className="p-2.5 rounded-xl bg-white border border-rose-200/80 hover:bg-rose-100/50 text-rose-700 shadow-xs transition-colors cursor-pointer"
              title={isPlaying ? 'Pause Audio' : 'Play Audio'}
            >
              {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>

          {/* Editorial Photo Spread */}
          <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-stone-900 group">
            <img
              src={data.photos?.[0] || 'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=800&auto=format&fit=crop'}
              alt="Birthday Muse"
              className="w-full max-h-[380px] object-cover object-center group-hover:scale-102 transition-transform duration-700"
            />
            {/* Magazine Lower Caption */}
            <div className="absolute bottom-0 inset-x-0 bg-linear-to-t from-stone-950/80 via-stone-950/40 to-transparent p-4 text-white">
              <span className="text-[10px] font-mono tracking-widest uppercase bg-rose-600/90 px-2 py-0.5 rounded text-white">
                MUSE OF THE YEAR
              </span>
              <p className="font-serif italic text-base sm:text-lg mt-1 text-rose-100">
                "{data.headline}"
              </p>
            </div>
          </div>

          {/* INTERACTIVE BIRTHDAY CANDLE BLOWOUT */}
          <div className="rounded-2xl p-6 bg-linear-to-br from-amber-50 via-rose-50/50 to-pink-50 border border-amber-200/80 text-center relative overflow-hidden shadow-sm">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-amber-200 text-amber-900 text-xs font-medium mb-3">
              <Cake className="w-3.5 h-3.5 text-amber-600" />
              <span>Virtual Birthday Wish</span>
            </div>

            <h3 className="font-serif text-lg sm:text-xl font-medium text-stone-900">
              Tiup Lilin & Ucapkan Permintaanmu
            </h3>
            <p className="text-xs text-stone-600 mt-1 max-w-sm mx-auto">
              Tutup matamu sejenak, ucapkan doa terindahmu di dalam hati, lalu ketuk lilin di bawah ini.
            </p>

            {/* Candle Graphic */}
            <div className="my-5 flex flex-col items-center justify-center">
              {!isCandleBlown ? (
                <button
                  onClick={handleBlowCandle}
                  className="group flex flex-col items-center cursor-pointer transition-transform active:scale-95"
                >
                  {/* Flickering Flame */}
                  <div className="relative animate-pulse">
                    <Flame className="w-9 h-9 text-amber-500 fill-amber-400 drop-shadow-[0_0_12px_rgba(245,158,11,0.8)]" />
                    <span className="absolute inset-0 flex items-center justify-center">
                      <Flame className="w-5 h-5 text-yellow-200 fill-yellow-200" />
                    </span>
                  </div>

                  {/* Candle Stick */}
                  <div className="w-5 h-16 rounded-t-sm bg-linear-to-b from-rose-300 via-rose-200 to-rose-400 shadow-md border border-rose-300" />
                  {/* Candle Base Plate */}
                  <div className="w-14 h-2 rounded-full bg-amber-300/80 shadow-xs -mt-1" />

                  <span className="mt-3 text-xs font-semibold text-rose-700 bg-white/90 border border-rose-200 px-3 py-1 rounded-full shadow-xs group-hover:bg-rose-100 transition-colors flex items-center gap-1.5">
                    <Wind className="w-3.5 h-3.5" />
                    <span>Ketuk untuk Tiup Lilin 🎂</span>
                  </span>
                </button>
              ) : (
                /* Extinguished Candle with Smoke and Blessing */
                <div className="flex flex-col items-center animate-in fade-in duration-500">
                  {/* Rising Smoke Icon */}
                  <div className="text-stone-400 animate-bounce mb-1">
                    <Wind className="w-8 h-8 opacity-70" />
                  </div>
                  {/* Candle Stick */}
                  <div className="w-5 h-16 rounded-t-sm bg-stone-300 shadow-inner border border-stone-400/50" />
                  <div className="w-14 h-2 rounded-full bg-stone-300 shadow-xs -mt-1" />

                  <div className="mt-3 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-medium max-w-xs flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>✨ Lilin telah ditiup! Semoga semua harapan dan doamu terkabul, sayang!</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* THE LOVE LETTER / EDITORIAL ESSAY */}
          <article className="bg-white rounded-2xl p-6 sm:p-8 border border-rose-100 shadow-sm relative">
            <div className="text-xs font-mono uppercase tracking-widest text-rose-600 mb-2">
              THE LOVE LETTER
            </div>
            <h2 className="font-serif text-xl sm:text-2xl text-stone-900 font-normal leading-tight mb-4">
              {data.headline}
            </h2>

            {/* Letter Body with Drop Cap */}
            <div className="prose prose-rose max-w-none text-stone-700 font-serif leading-relaxed text-sm sm:text-base whitespace-pre-line">
              <span className="float-left text-4xl sm:text-5xl font-serif text-rose-800 leading-none mr-2 font-normal">
                {data.message.charAt(0)}
              </span>
              {data.message.slice(1)}
            </div>

            {/* Sign-off */}
            <div className="mt-8 pt-4 border-t border-rose-100 flex flex-col items-end">
              <span className="text-xs font-mono uppercase tracking-wider text-stone-400">
                Forever Devoted,
              </span>
              <span className="font-handwriting text-2xl text-rose-800 mt-1">
                {data.senderName}
              </span>
            </div>
          </article>

          {/* INTERACTIVE BIRTHDAY WISHES ACCORDION */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-stone-400 px-1">
              <Heart className="w-3.5 h-3.5 text-rose-600" />
              <span>3 Permintaan & Harapanku Untukmu</span>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {birthdayWishes.map((wish, index) => {
                const isSelected = activeWishIndex === index;
                return (
                  <div
                    key={index}
                    onClick={() => setActiveWishIndex(isSelected ? null : index)}
                    className="p-4 rounded-xl bg-white border border-rose-100/90 hover:border-rose-300 transition-all cursor-pointer shadow-xs"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{wish.icon}</span>
                        <span className="font-serif font-medium text-sm text-stone-900">
                          {wish.title}
                        </span>
                      </div>
                      <ChevronDown
                        className={`w-4 h-4 text-stone-400 transition-transform ${
                          isSelected ? 'rotate-180 text-rose-600' : ''
                        }`}
                      />
                    </div>
                    {isSelected && (
                      <p className="mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed font-serif pl-8 border-l-2 border-rose-300">
                        {wish.content}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Keepsake Footer */}
          <footer className="text-center pt-4 border-t border-rose-200/50">
            <p className="font-serif italic text-xs text-stone-500">
              Printed with unending tenderness • DLYS Keepsake Edition
            </p>
          </footer>

        </div>
      )}
    </div>
  );
};
