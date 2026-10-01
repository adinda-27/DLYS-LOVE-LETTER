import { useState, useRef, useEffect } from 'react';
import type { CustomizationData } from '../../types';
import { sounds } from '../../utils/soundEffects';
import {
  Heart,
  Volume2,
  VolumeX,
  Sparkles,
  RefreshCw,
  Gift,
  Smile,
  ChevronDown,
  ChevronUp,
  Camera,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PolaroidBlushThemeProps {
  data: CustomizationData;
  isDraftPreview?: boolean;
  onActivateRequest?: () => void;
  className?: string;
}

export const PolaroidBlushTheme = ({
  data,
  isDraftPreview = false,
  onActivateRequest,
  className = '',
}: PolaroidBlushThemeProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPhotoFlipped, setIsPhotoFlipped] = useState(false);
  const [isCouponUnfolded, setIsCouponUnfolded] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [playfulButtonText, setPlayfulButtonText] = useState(data.questionPrompt.secondButton);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioSrc = data.song.url || '/audio/golden-hour-piano.wav';

  // Cleanup on unmount
  useEffect(() => {
    const audioEl = audioRef.current;
    return () => {
      if (audioEl) {
        audioEl.pause();
      }
    };
  }, []);

  // Handle audio source changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.75;
      if (isOpen && isPlaying) {
        audioRef.current.load();
        audioRef.current.play().catch(() => {});
      }
    }
  }, [audioSrc, isOpen, isPlaying]);

  const calculateDays = () => {
    try {
      const start = new Date(data.specialDate);
      const now = new Date();
      const diff = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      return diff > 0 ? diff : 730;
    } catch {
      return 730;
    }
  };

  const daysCount = calculateDays();
  const hoursCount = (daysCount * 24).toLocaleString('id-ID');

  const handleOpenScrapbook = () => {
    sounds.playRomanticChime();
    setIsOpen(true);
    setIsPlaying(true);

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().then(() => setIsPlaying(true)).catch((e) => {
        console.log('Audio autoplay prevented:', e);
      });
    }

    // Heart explosion confetti
    confetti({
      particleCount: 85,
      spread: 75,
      origin: { y: 0.55 },
      colors: ['#F43F5E', '#FDA4AF', '#FB7185', '#FFF1F2', '#FECDD3'],
      shapes: ['circle'],
    });
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleAnswerYes = () => {
    sounds.playRomanticChime();
    setHasAnswered(true);
    confetti({
      particleCount: 110,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#E11D48', '#FDA4AF', '#F43F5E', '#10B981', '#FEE2E2'],
      shapes: ['circle'],
    });
  };

  return (
    <div
      className={`relative w-full overflow-hidden transition-all duration-500 font-sans select-none text-[#331B24] ${className}`}
      style={{
        backgroundColor: '#FFF4F6',
      }}
    >
      {/* Real Romantic HTML5 Audio Element */}
      <audio
        ref={audioRef}
        src={audioSrc}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Subtle Polka Dot Pastel Pattern Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          backgroundImage: `radial-gradient(#F43F5E 1.2px, transparent 1.2px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Soft Ambient Floating Blush Bubbles */}
      <div className="absolute top-10 left-5 w-48 h-48 bg-rose-300/25 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-20 right-5 w-56 h-56 bg-pink-300/25 rounded-full blur-2xl pointer-events-none" />

      {/* DRAFT WATERMARK OVERLAY (If in Preview Mode) */}
      {isDraftPreview && (
        <div className="absolute inset-0 pointer-events-none z-40 flex flex-col justify-around items-center opacity-15 rotate-[-28deg]">
          <span className="font-serif font-black text-xl sm:text-2xl tracking-widest text-[#E11D48] whitespace-nowrap">
            DLYS PREVIEW • BELUM AKTIF
          </span>
          <span className="font-serif font-black text-xl sm:text-2xl tracking-widest text-[#E11D48] whitespace-nowrap">
            DLYS PREVIEW • BELUM AKTIF
          </span>
          <span className="font-serif font-black text-xl sm:text-2xl tracking-widest text-[#E11D48] whitespace-nowrap">
            DLYS PREVIEW • BELUM AKTIF
          </span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. CLOSED SCRAPBOOK GIFT PHASE (The Soft Ribbon Unwrapping) */}
      {/* ========================================================================= */}
      {!isOpen ? (
        <div className="min-h-[580px] max-w-xl mx-auto p-6 sm:p-8 flex flex-col items-center justify-between text-center relative z-20">
          
          {/* Top Postmark & Cute Stamp */}
          <div className="w-full flex items-start justify-between pt-2">
            <div className="flex items-center gap-1.5 opacity-80 text-left">
              <div className="w-7 h-7 rounded-full border border-dashed border-rose-400 flex items-center justify-center text-rose-500">
                <Camera className="w-3.5 h-3.5" />
              </div>
              <div className="text-[9px] font-mono leading-tight tracking-wider text-rose-800">
                <p className="font-bold">DLYS POLAROID</p>
                <p>SWEET MEMORIES</p>
              </div>
            </div>

            {/* Cute Scalloped Stamp */}
            <div className="p-1.5 bg-white border-2 border-dashed border-rose-200 rounded-lg shadow-xs text-center w-16">
              <div className="w-full aspect-square bg-linear-to-tr from-rose-500 to-pink-400 rounded-md flex flex-col items-center justify-center text-white p-1">
                <Heart className="w-4 h-4 fill-white text-white" />
                <span className="text-[7px] font-mono tracking-tighter mt-0.5">DLYS • LOVE</span>
              </div>
              <span className="text-[8px] font-mono font-bold text-rose-800 block mt-0.5">
                NO. 0214
              </span>
            </div>
          </div>

          {/* Envelope Body Centerpiece */}
          <div className="my-auto py-6 w-full flex flex-col items-center">
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-[10px] font-bold tracking-wider uppercase mb-3 border border-rose-200 shadow-2xs">
              <Sparkles className="w-3 h-3 text-rose-500" />
              <span>KADO KENANGAN MANIS</span>
            </div>

            {/* Recipient Handwritten Address */}
            <h2 className="font-handwriting text-3xl sm:text-4xl text-[#3A1420] mb-1 font-bold">
              Untuk {data.recipientName}
            </h2>
            <p className="font-handwriting text-base text-rose-700">
              dari {data.senderName} dengan sejuta cinta
            </p>

            {/* Pastel Ribbon Divider */}
            <div className="flex items-center justify-center gap-3 my-5 opacity-70">
              <div className="w-12 h-px bg-rose-300"></div>
              <span className="text-xs text-rose-500">♥ ✿ ♥</span>
              <div className="w-12 h-px bg-rose-300"></div>
            </div>

            {/* 3D TACTILE PINK RIBBON SEAL */}
            <div className="relative mt-4">
              {/* Outer pulsing blush aura */}
              <div className="absolute inset-0 rounded-full bg-rose-400/25 blur-xl animate-pulse"></div>

              <button
                onClick={handleOpenScrapbook}
                className="relative group w-22 h-22 rounded-full bg-linear-to-tr from-rose-600 via-rose-500 to-pink-400 border-4 border-white shadow-xl shadow-rose-500/25 flex items-center justify-center text-white cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300"
                title="Sentuh untuk membuka scrapbook kenangan"
              >
                {/* Embedded Inner Heart Monogram */}
                <div className="w-16 h-16 rounded-full border-2 border-dashed border-rose-100/70 flex flex-col items-center justify-center">
                  <Gift className="w-7 h-7 text-white drop-shadow-sm group-hover:scale-110 transition-transform" />
                  <span className="text-[8px] font-sans font-black tracking-widest uppercase text-white mt-1">
                    BUKA
                  </span>
                </div>

                {/* Floating Tooltip */}
                <span className="absolute -bottom-9 whitespace-nowrap text-[11px] font-bold text-rose-700 bg-white px-3.5 py-1 rounded-full border border-rose-200 shadow-md animate-bounce">
                  Sentuh Untuk Buka Kado 🎀
                </span>
              </button>
            </div>

          </div>

          {/* Bottom Note */}
          <div className="pb-2 text-center">
            <p className="text-[11px] text-rose-900/70 opacity-80">
              Ada kumpulan kenangan manis menunggumu di dalam.
            </p>
          </div>

        </div>
      ) : (
        /* ========================================================================= */
        /* 2. OPENED SCRAPBOOK EXPERIENCE (Polaroid Stack & Warm Love Notes) */
        /* ========================================================================= */
        <div className="p-5 sm:p-8 space-y-7 animate-in fade-in duration-500 relative z-20 max-w-2xl mx-auto">
          
          {/* A. PASTEL CASSETTE MUSIC PLAYER */}
          <div className="p-3.5 rounded-2xl bg-white/90 border border-rose-200 shadow-sm backdrop-blur-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 truncate">
              {/* Rotating Cassette Disc */}
              <div
                onClick={toggleMusic}
                className={`relative w-11 h-11 rounded-xl bg-rose-50 border-2 border-rose-200 shadow-xs shrink-0 flex items-center justify-center cursor-pointer ${
                  isPlaying ? 'ring-2 ring-rose-300' : ''
                }`}
                title={isPlaying ? 'Jeda Musik' : 'Putar Musik'}
              >
                {/* Cassette Reels */}
                <div className="flex items-center gap-1">
                  <div className={`w-3.5 h-3.5 rounded-full border-2 border-rose-400 flex items-center justify-center ${isPlaying ? 'animate-spin' : ''}`}>
                    <div className="w-1 h-1 bg-rose-500 rounded-full" />
                  </div>
                  <div className={`w-3.5 h-3.5 rounded-full border-2 border-rose-400 flex items-center justify-center ${isPlaying ? 'animate-spin' : ''}`}>
                    <div className="w-1 h-1 bg-rose-500 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Song Information */}
              <div className="truncate text-left font-sans">
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-rose-600 bg-rose-100 px-1.5 py-0.5 rounded-xs">
                    LAGU KITA
                  </span>
                  <p className="text-xs font-bold text-[#2A131C] truncate">{data.song.title}</p>
                </div>
                <p className="text-[10px] text-stone-500 truncate">{data.song.artist}</p>
              </div>
            </div>

            {/* Play/Pause & Equalizer Bar */}
            <div className="flex items-center gap-2">
              {isPlaying && (
                <div className="flex items-end gap-0.5 h-3 pr-1">
                  <span className="w-0.5 h-2.5 bg-rose-500 rounded-full animate-bounce"></span>
                  <span className="w-0.5 h-3.5 bg-rose-500 rounded-full animate-bounce [animation-delay:0.15s]"></span>
                  <span className="w-0.5 h-1.5 bg-rose-500 rounded-full animate-bounce [animation-delay:0.3s]"></span>
                  <span className="w-0.5 h-3 bg-rose-500 rounded-full animate-bounce [animation-delay:0.45s]"></span>
                </div>
              )}
              <button
                onClick={toggleMusic}
                className="w-7 h-7 rounded-full bg-rose-500 text-white flex items-center justify-center cursor-pointer shadow-xs hover:bg-rose-600 transition-colors"
              >
                {isPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* B. PHYSICAL POLAROID FRAME WITH WASHI TAPE */}
          {data.photos && data.photos.length > 0 && (
            <div className="flex flex-col items-center pt-2">
              <div className="relative group">
                
                {/* Washi Tape Accent on Top */}
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-28 h-6 bg-rose-300/70 border-x-2 border-dashed border-rose-400 rotate-[-2deg] z-30 shadow-xs pointer-events-none" />

                {/* Polaroid Body Card */}
                <div
                  onClick={() => setIsPhotoFlipped(!isPhotoFlipped)}
                  className="relative w-64 sm:w-72 bg-white p-3.5 pb-5 rounded-2xl shadow-xl border border-rose-100 rotate-1 hover:rotate-0 transition-transform duration-300 cursor-pointer"
                  title="Klik untuk membalik foto"
                >
                  {!isPhotoFlipped ? (
                    <div>
                      {/* Photo Image with realistic polaroid cutout */}
                      <div className="w-full aspect-square overflow-hidden rounded-xl bg-stone-100 mb-3 border border-stone-200/60 shadow-inner">
                        <img
                          src={data.photos[0]}
                          alt="Foto Kenangan Manis"
                          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                        />
                      </div>

                      {/* Handwritten Caption under Polaroid */}
                      <div className="text-center font-handwriting text-xl text-[#3A1420] flex items-center justify-center gap-1.5">
                        <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                        <span>Momen favorit bersamamu</span>
                      </div>
                      <p className="text-[10px] text-stone-400 text-center font-sans mt-0.5">
                        (klik foto untuk membalik)
                      </p>
                    </div>
                  ) : (
                    /* Flipped Back of Polaroid (Lined Card) */
                    <div className="w-full aspect-square p-5 bg-rose-50/60 rounded-xl border border-rose-200/70 flex flex-col items-center justify-center text-center font-handwriting text-lg text-rose-900 leading-relaxed animate-in fade-in">
                      <p className="mb-2">"Setiap foto ini mengingatkanku betapa beruntungnya aku memilikimu."</p>
                      <p className="text-sm text-rose-600 font-bold mt-1">— {data.senderName} ❤️</p>
                      <span className="text-[10px] text-stone-400 font-sans mt-4">Klik untuk membalik ↺</span>
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}

          {/* C. THE SCRAPBOOK LOVE LETTER */}
          <article className="p-6 sm:p-8 rounded-3xl bg-white border border-rose-200/80 shadow-md relative text-left">
            
            {/* Top Washi Tape Corner */}
            <div className="absolute -top-3 right-6 w-20 h-5 bg-pink-200/80 border-x border-pink-300 rotate-2 z-10 pointer-events-none" />

            {/* Header Badge */}
            <div className="text-center mb-5">
              <span className="text-xs text-rose-500 font-bold tracking-widest uppercase">
                ✿ SURAT KHUSUS UNTUK {data.recipientName} ✿
              </span>
              <h1 className="font-serif text-xl sm:text-2xl font-bold text-[#3A1420] mt-1.5 leading-snug">
                "{data.headline}"
              </h1>
            </div>

            {/* Letter Body */}
            <div className="font-sans text-[#4E2D38] text-sm sm:text-base leading-relaxed space-y-4 mb-6">
              <p className="first-letter:text-4xl first-letter:font-bold first-letter:text-rose-600 first-letter:float-left first-letter:mr-2.5 first-letter:font-serif first-letter:leading-none">
                {data.message}
              </p>
            </div>

            {/* Days Together Milestone Badge */}
            <div className="p-4 rounded-2xl bg-rose-50/80 border border-rose-200 text-center space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 block">
                💖 HARI KITA BERSAMA 💖
              </span>
              <p className="text-2xl sm:text-3xl font-bold font-serif text-rose-600">
                {daysCount} Hari
              </p>
              <p className="text-xs text-rose-800/80 font-sans">
                Setara dengan <strong>{hoursCount} jam</strong> tawa, cerita, dan cinta tanpa henti!
              </p>
            </div>

            {/* Sign-off */}
            <div className="pt-6 text-right font-handwriting">
              <p className="text-base text-stone-500">Dengan sejuta cinta,</p>
              <p className="text-2xl text-rose-600 font-bold mt-0.5">{data.senderName}</p>
            </div>
          </article>

          {/* D. INTERACTIVE QUESTION / ANNIVERSARY SURPRISE */}
          {data.questionPrompt && data.questionPrompt.question && (
            <div className="p-6 rounded-3xl bg-white border border-rose-200 shadow-md text-center space-y-4">
              <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto shadow-2xs">
                <Smile className="w-5 h-5" />
              </div>

              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#3A1420] px-2">
                "{data.questionPrompt.question}"
              </h3>

              {!hasAnswered ? (
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 font-sans">
                  <button
                    onClick={handleAnswerYes}
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-linear-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-bold text-xs shadow-md shadow-rose-500/25 cursor-pointer hover:scale-105 active:scale-95 transition-all"
                  >
                    {data.questionPrompt.acceptButton}
                  </button>

                  <button
                    onMouseEnter={() => setPlayfulButtonText('Iya dong sayang! 🥰')}
                    onClick={handleAnswerYes}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 font-medium text-xs transition-colors cursor-pointer"
                  >
                    {playfulButtonText}
                  </button>
                </div>
              ) : (
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-bold animate-in zoom-in duration-300">
                  🥰 Yaaay! Jawaban tersimpan di hati selamanya! ❤️
                </div>
              )}
            </div>
          )}

          {/* E. COUPON / FOLDED P.S. NOTE */}
          {data.psNote && (
            <div className="rounded-2xl border-2 border-dashed border-rose-300 bg-white overflow-hidden text-left font-sans shadow-2xs">
              <button
                onClick={() => setIsCouponUnfolded(!isCouponUnfolded)}
                className="w-full p-4 flex items-center justify-between text-xs text-rose-700 font-bold hover:bg-rose-50/50 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-1.5">
                  <span>🎟️ Kupon Cinta Khusus Pasangan (P.S.)</span>
                </span>
                {isCouponUnfolded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {isCouponUnfolded && (
                <div className="p-4 pt-1 border-t border-dashed border-rose-200 font-handwriting text-base sm:text-lg text-rose-800 leading-relaxed bg-rose-50/40 animate-in fade-in duration-200">
                  {data.psNote}
                </div>
              )}
            </div>
          )}

          {/* F. FOOTER ACTIONS */}
          <div className="pt-4 flex flex-col items-center gap-3 border-t border-rose-200/60 font-sans">
            <button
              onClick={() => {
                if (audioRef.current) {
                  audioRef.current.pause();
                  audioRef.current.currentTime = 0;
                }
                setIsPlaying(false);
                setIsOpen(false);
                setHasAnswered(false);
                setIsPhotoFlipped(false);
              }}
              className="flex items-center gap-1.5 text-xs text-rose-600 hover:underline font-medium cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Tutup & Ikat Pita Kembali 🎀</span>
            </button>

            <p className="text-[10px] text-rose-900/60">
              Dibuat dengan segenap cinta lewat <strong>DLYS</strong>
            </p>
          </div>

        </div>
      )}

      {/* Floating CTA if in Draft Preview Mode */}
      {isDraftPreview && onActivateRequest && (
        <div className="sticky bottom-3 inset-x-3 z-50 p-2.5 rounded-2xl bg-[#2D161F]/95 backdrop-blur-md text-white border border-rose-400/40 shadow-xl flex items-center justify-between gap-2 font-sans">
          <div className="truncate">
            <p className="text-[11px] font-bold text-rose-200 truncate">Suka dengan tema polaroid ini?</p>
            <p className="text-[9px] text-stone-300">Aktifkan untuk hilangkan watermark</p>
          </div>
          <button
            onClick={onActivateRequest}
            className="px-4 py-2 rounded-xl bg-linear-to-r from-rose-500 to-pink-500 hover:from-rose-400 hover:to-pink-400 text-white font-bold text-xs shrink-0 shadow-md cursor-pointer"
          >
            Aktifkan (Rp 39rb) ✨
          </button>
        </div>
      )}
    </div>
  );
};
