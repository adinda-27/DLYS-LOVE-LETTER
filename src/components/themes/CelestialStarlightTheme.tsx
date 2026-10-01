import { useState, useRef, useEffect } from 'react';
import type { CustomizationData } from '../../types';
import { sounds } from '../../utils/soundEffects';
import {
  Sparkles,
  Volume2,
  VolumeX,
  RefreshCw,
  Moon,
  Compass,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CelestialStarlightThemeProps {
  data: CustomizationData;
  isDraftPreview?: boolean;
  onActivateRequest?: () => void;
  className?: string;
}

export const CelestialStarlightTheme = ({
  data,
  isDraftPreview = false,
  onActivateRequest,
  className = '',
}: CelestialStarlightThemeProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPhotoFlipped, setIsPhotoFlipped] = useState(false);
  const [isPsUnfolded, setIsPsUnfolded] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [playfulButtonText, setPlayfulButtonText] = useState(data.questionPrompt.secondButton);
  const [activeConstellationIndex, setActiveConstellationIndex] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  // Default to Until I Found You or Golden Hour
  const audioSrc = data.song.url || '/audio/until-i-found-you.wav';

  // Cleanup audio on unmount
  useEffect(() => {
    const audioEl = audioRef.current;
    return () => {
      if (audioEl) {
        audioEl.pause();
      }
    };
  }, []);

  // Handle audio source change when song changes
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
  const minutesCount = (daysCount * 24 * 60).toLocaleString('id-ID');

  const handleOpenCosmos = () => {
    sounds.playRomanticChime();
    setIsOpen(true);
    setIsPlaying(true);

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().then(() => setIsPlaying(true)).catch((e) => {
        console.log('Audio autoplay prevented:', e);
      });
    }

    // Supernova starlight starburst confetti
    confetti({
      particleCount: 85,
      spread: 80,
      origin: { y: 0.55 },
      colors: ['#F8D376', '#FFEDAD', '#60A5FA', '#E2E8F0', '#F472B6'],
      shapes: ['star', 'circle'],
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
      particleCount: 120,
      spread: 95,
      origin: { y: 0.6 },
      colors: ['#F8D376', '#FBBF24', '#60A5FA', '#F43F5E', '#FFFFFF'],
      shapes: ['star', 'circle'],
    });
  };

  const constellationMilestones = [
    { label: 'Bintang 1', title: 'Pertama Kali Bertemu', desc: 'Saat semesta merajut jalan kita berdua dalam satu takdir yang tak disengaja.' },
    { label: 'Bintang 2', title: 'Momen Favorit Kita', desc: 'Setiap tawa kecil dan obrolan larut malam yang selalu terasa seperti rumah.' },
    { label: 'Bintang 3', title: 'Hari Ini Bersamamu', desc: `Sudah ${daysCount} hari kita saling menggenggam tangan di bawah langit yang sama.` },
    { label: 'Bintang 4', title: 'Selamanya Nanti', desc: 'Janji untuk terus saling menemani sampai rambut kita memutih bersama.' },
  ];

  return (
    <div
      className={`relative w-full overflow-hidden transition-all duration-700 font-serif select-none text-[#F1F5F9] ${className}`}
      style={{
        backgroundColor: '#060913',
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

      {/* Atmospheric Cosmic Nebula Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-2/3 left-1/4 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Twinkling Stars Canvas Effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-60">
        {[...Array(32)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              top: `${(i * 19) % 100}%`,
              left: `${(i * 29) % 100}%`,
              width: i % 4 === 0 ? '3px' : i % 2 === 0 ? '2px' : '1px',
              height: i % 4 === 0 ? '3px' : i % 2 === 0 ? '2px' : '1px',
              boxShadow: i % 3 === 0 ? '0 0 6px 1px #F8D376' : '0 0 4px #FFFFFF',
              animationDuration: `${2 + (i % 5)}s`,
              animationDelay: `${(i % 7) * 0.4}s`,
            }}
          />
        ))}
      </div>

      {/* DRAFT WATERMARK OVERLAY (If in Preview Mode) */}
      {isDraftPreview && (
        <div className="absolute inset-0 pointer-events-none z-40 flex flex-col justify-around items-center opacity-15 rotate-[-28deg]">
          <span className="font-serif font-black text-xl sm:text-2xl tracking-widest text-[#F8D376] whitespace-nowrap">
            DLYS PREVIEW • BELUM AKTIF
          </span>
          <span className="font-serif font-black text-xl sm:text-2xl tracking-widest text-[#F8D376] whitespace-nowrap">
            DLYS PREVIEW • BELUM AKTIF
          </span>
          <span className="font-serif font-black text-xl sm:text-2xl tracking-widest text-[#F8D376] whitespace-nowrap">
            DLYS PREVIEW • BELUM AKTIF
          </span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. CLOSED COSMIC SPHERE PHASE (The Starlight Core Reveal) */}
      {/* ========================================================================= */}
      {!isOpen ? (
        <div className="min-h-[580px] max-w-xl mx-auto p-6 sm:p-8 flex flex-col items-center justify-between text-center relative z-20">
          
          {/* Top Astronomical Header Badge */}
          <div className="w-full flex items-start justify-between pt-2">
            <div className="flex items-center gap-1.5 opacity-80 text-left">
              <div className="w-7 h-7 rounded-full border border-dashed border-[#F8D376]/50 flex items-center justify-center text-[#F8D376]">
                <Compass className="w-3.5 h-3.5 animate-spin [animation-duration:12s]" />
              </div>
              <div className="text-[9px] font-mono leading-tight tracking-wider text-[#C5B393]">
                <p className="font-bold text-[#F8D376]">DLYS OBSERVATORY</p>
                <p>NIGHT SKY DELIVERY</p>
              </div>
            </div>

            {/* Vintage Celestial Postage Stamp */}
            <div className="p-1.5 bg-[#0C1220] border border-dashed border-[#F8D376]/40 rounded-xs shadow-xs text-center w-16">
              <div className="w-full aspect-square bg-linear-to-b from-[#1E293B] to-[#0F172A] rounded-2xs flex flex-col items-center justify-center text-[#F8D376] p-1">
                <Moon className="w-4 h-4 fill-current text-[#F8D376]" />
                <span className="text-[7px] font-mono tracking-tighter mt-0.5 text-stone-300">DLYS • SKY</span>
              </div>
              <span className="text-[8px] font-mono font-bold text-[#F8D376] block mt-0.5">
                ✦ 11:11 ✦
              </span>
            </div>
          </div>

          {/* Envelope Body Centerpiece */}
          <div className="my-auto py-6 w-full flex flex-col items-center">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F8D376]/10 border border-[#F8D376]/30 text-[#F8D376] text-[10px] font-mono tracking-widest uppercase mb-3">
              <Sparkles className="w-3 h-3" />
              <span>DI BAWAH LANGIT YANG SAMA</span>
            </div>

            {/* Recipient Handwritten Address */}
            <h2 className="font-handwriting text-3xl sm:text-4xl text-[#F8D376] mb-1 font-bold drop-shadow-md">
              Untuk {data.recipientName}
            </h2>
            <p className="font-handwriting text-base text-stone-300">
              dari {data.senderName} yang selalu memandang bintang yang sama
            </p>

            {/* Antique Celestial Divider */}
            <div className="flex items-center justify-center gap-3 my-5 opacity-60">
              <div className="w-12 h-px bg-linear-to-r from-transparent to-[#F8D376]"></div>
              <span className="text-xs text-[#F8D376]">✦ ✧ ✦</span>
              <div className="w-12 h-px bg-linear-to-l from-transparent to-[#F8D376]"></div>
            </div>

            {/* GLOWING INTERACTIVE STAR CORE ORB */}
            <div className="relative mt-4">
              {/* Outer pulsing starlight aura */}
              <div className="absolute inset-0 rounded-full bg-amber-400/25 blur-xl animate-pulse"></div>

              {/* Rotating Constellation Astrolabe Ring */}
              <div className="absolute -inset-3 rounded-full border border-dashed border-[#F8D376]/30 animate-spin [animation-duration:20s] pointer-events-none" />

              <button
                onClick={handleOpenCosmos}
                className="relative group w-22 h-22 rounded-full bg-linear-to-br from-[#1E293B] via-[#0F172A] to-[#020617] border-2 border-[#F8D376] shadow-2xl shadow-amber-500/30 flex items-center justify-center text-[#F8D376] cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300"
                title="Sentuh untuk membuka rahasia langit"
              >
                {/* Embedded Inner Golden Core */}
                <div className="w-16 h-16 rounded-full bg-linear-to-tr from-amber-600/30 to-[#F8D376]/30 border border-[#F8D376]/50 flex flex-col items-center justify-center group-hover:scale-105 transition-transform">
                  <Sparkles className="w-7 h-7 text-[#FFEDAD] drop-shadow-[0_0_8px_#F8D376] group-hover:rotate-45 transition-transform" />
                  <span className="text-[8px] font-mono tracking-widest uppercase text-[#F8D376] font-bold mt-1">
                    DLYS
                  </span>
                </div>

                {/* Floating Tooltip */}
                <span className="absolute -bottom-9 whitespace-nowrap text-[11px] font-sans font-bold text-[#060913] bg-linear-to-r from-[#F8D376] to-[#FFE7A3] px-3.5 py-1 rounded-full border border-[#F8D376] shadow-lg shadow-amber-900/40 animate-bounce">
                  Sentuh Bintang Utama ✨
                </span>
              </button>
            </div>

          </div>

          {/* Bottom Note */}
          <div className="pb-2 text-center">
            <p className="text-[11px] font-sans text-stone-400 opacity-80">
              Ada pesan pribadi yang dirajut di antara gugusan bintang.
            </p>
          </div>

        </div>
      ) : (
        /* ========================================================================= */
        /* 2. OPENED CELESTIAL STORYBOOK (The Unfolding Night Sky Experience) */
        /* ========================================================================= */
        <div className="p-5 sm:p-8 space-y-7 animate-in fade-in duration-700 relative z-20 max-w-2xl mx-auto">
          
          {/* A. MOON RECORD MUSIC PLAYER */}
          <div className="p-3.5 rounded-2xl bg-[#0D1526]/85 border border-[#F8D376]/30 backdrop-blur-md shadow-xl flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 truncate">
              {/* Rotating Moon Disc */}
              <div
                onClick={toggleMusic}
                className={`relative w-11 h-11 rounded-full bg-linear-to-tr from-[#1E293B] via-[#0F172A] to-[#334155] border-2 border-[#F8D376]/60 shadow-lg shadow-amber-500/20 shrink-0 flex items-center justify-center cursor-pointer ${
                  isPlaying ? 'animate-spin [animation-duration:8s]' : ''
                }`}
                title={isPlaying ? 'Jeda Musik' : 'Putar Musik'}
              >
                {/* Moon craters texture */}
                <div className="w-2.5 h-2.5 rounded-full bg-stone-500/30 absolute top-1.5 right-2" />
                <div className="w-1.5 h-1.5 rounded-full bg-stone-500/20 absolute bottom-2 left-2" />
                <Moon className="w-4 h-4 text-[#F8D376]" />
              </div>

              {/* Song Information */}
              <div className="truncate text-left font-sans">
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#F8D376] bg-amber-500/15 border border-amber-500/30 px-1.5 py-0.5 rounded-xs">
                    LAGU MALAM KITA
                  </span>
                  <p className="text-xs font-bold text-white truncate">{data.song.title}</p>
                </div>
                <p className="text-[10px] text-stone-400 truncate">{data.song.artist}</p>
              </div>
            </div>

            {/* Play/Pause & Equalizer Bar */}
            <div className="flex items-center gap-2">
              {isPlaying && (
                <div className="flex items-end gap-0.5 h-3 pr-1">
                  <span className="w-0.5 h-2.5 bg-[#F8D376] rounded-full animate-bounce"></span>
                  <span className="w-0.5 h-3.5 bg-[#F8D376] rounded-full animate-bounce [animation-delay:0.15s]"></span>
                  <span className="w-0.5 h-1.5 bg-[#F8D376] rounded-full animate-bounce [animation-delay:0.3s]"></span>
                  <span className="w-0.5 h-3 bg-[#F8D376] rounded-full animate-bounce [animation-delay:0.45s]"></span>
                </div>
              )}
              <button
                onClick={toggleMusic}
                className="w-7 h-7 rounded-full bg-[#F8D376] text-[#060913] flex items-center justify-center cursor-pointer shadow-md shadow-amber-500/20"
              >
                {isPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* B. INTERACTIVE 4-STAR CONSTELLATION NODES */}
          <div className="p-4 rounded-3xl bg-[#0B1120]/80 border border-[#F8D376]/20 backdrop-blur-md shadow-md space-y-3">
            <div className="flex items-center justify-between text-[11px] text-stone-400">
              <span className="font-mono text-[#F8D376] tracking-wider uppercase flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" />
                <span>Rasi Bintang Kisah Kita</span>
              </span>
              <span className="text-[10px]">Klik bintang untuk membaca:</span>
            </div>

            {/* Constellation Stars Row */}
            <div className="grid grid-cols-4 gap-2 pt-1">
              {constellationMilestones.map((m, idx) => {
                const isActive = activeConstellationIndex === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveConstellationIndex(idx)}
                    className={`py-2 px-1 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1 ${
                      isActive
                        ? 'bg-[#F8D376]/15 border-[#F8D376] text-[#F8D376] shadow-sm shadow-amber-500/20 ring-1 ring-[#F8D376]/50'
                        : 'bg-white/5 border-white/10 text-stone-400 hover:border-white/20'
                    }`}
                  >
                    <span className="text-xs">✦</span>
                    <span className="text-[10px] font-sans font-bold leading-tight truncate w-full">
                      {m.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Milestone Card */}
            <div className="p-3 rounded-2xl bg-black/40 border border-white/10 text-left animate-in fade-in duration-300">
              <p className="text-xs font-bold text-[#F8D376] mb-0.5">
                {constellationMilestones[activeConstellationIndex].title}
              </p>
              <p className="text-[11px] text-stone-300 leading-relaxed font-sans">
                {constellationMilestones[activeConstellationIndex].desc}
              </p>
            </div>
          </div>

          {/* C. THE CELESTIAL LETTER */}
          <article className="p-6 sm:p-8 rounded-3xl bg-[#0D1526]/85 border border-[#F8D376]/25 backdrop-blur-md shadow-2xl relative text-left">
            {/* Top Ornamental Flourish */}
            <div className="text-center mb-6">
              <span className="text-xs text-[#F8D376] opacity-80">✦ ✧ ☾ ✧ ✦</span>
              <p className="text-[10px] font-mono tracking-widest uppercase text-[#C5B393] mt-1">
                SURAT CINTA UNTUK {data.recipientName}
              </p>
            </div>

            {/* Headline */}
            <h1 className="font-serif text-xl sm:text-2xl font-bold text-[#F8D376] mb-4 text-center leading-snug">
              "{data.headline}"
            </h1>

            {/* Letter Body with Drop Cap */}
            <div className="font-serif text-stone-200 text-sm sm:text-base leading-relaxed space-y-4 mb-6">
              <p className="first-letter:text-4xl first-letter:font-bold first-letter:text-[#F8D376] first-letter:float-left first-letter:mr-2.5 first-letter:leading-none">
                {data.message}
              </p>
            </div>

            {/* Cosmic Days Milestone Counter */}
            <div className="p-4 rounded-2xl bg-black/40 border border-[#F8D376]/20 text-center space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#F8D376] block">
                ✦ PERJALANAN WAKTU KITA ✦
              </span>
              <div className="flex items-center justify-center gap-4 text-stone-200">
                <div>
                  <p className="text-2xl font-bold text-[#F8D376] font-mono">{daysCount}</p>
                  <p className="text-[10px] text-stone-400 uppercase font-sans">Hari Bersama</p>
                </div>
                <div className="w-px h-8 bg-white/10"></div>
                <div>
                  <p className="text-lg font-bold text-white font-mono">{hoursCount}</p>
                  <p className="text-[10px] text-stone-400 uppercase font-sans">Jam Berharga</p>
                </div>
                <div className="w-px h-8 bg-white/10"></div>
                <div>
                  <p className="text-sm font-bold text-stone-300 font-mono">{minutesCount}</p>
                  <p className="text-[10px] text-stone-400 uppercase font-sans">Menit Cinta</p>
                </div>
              </div>
            </div>

            {/* Sign-off */}
            <div className="pt-6 text-right font-handwriting">
              <p className="text-base text-stone-300">Selalu milikmu,</p>
              <p className="text-2xl text-[#F8D376] font-bold mt-0.5">{data.senderName}</p>
            </div>
          </article>

          {/* D. GILDED STARLIGHT FLIP PHOTO */}
          {data.photos && data.photos.length > 0 && (
            <div className="flex flex-col items-center">
              <div
                onClick={() => setIsPhotoFlipped(!isPhotoFlipped)}
                className="relative w-64 sm:w-72 aspect-4/5 rounded-2xl bg-[#0F172A] border-2 border-[#F8D376]/40 p-2.5 shadow-2xl cursor-pointer hover:scale-102 transition-all duration-300 group"
                title="Klik untuk membalik foto"
              >
                {!isPhotoFlipped ? (
                  <div className="w-full h-full flex flex-col items-center justify-between">
                    <img
                      src={data.photos[0]}
                      alt="Kenangan Bersama"
                      className="w-full h-56 object-cover rounded-xl border border-white/10"
                    />
                    <div className="pt-2 text-center flex items-center justify-center gap-1.5 text-xs text-[#F8D376]">
                      <Sparkles className="w-3 h-3" />
                      <span className="font-handwriting text-sm">Bintang paling terang di hidupku ✨</span>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full p-4 rounded-xl bg-black/60 border border-[#F8D376]/30 flex flex-col items-center justify-center text-center font-handwriting text-lg text-[#F8D376] leading-relaxed animate-in fade-in">
                    <p className="mb-2">"Di antara miliaran bintang di galaksi ini, aku selalu memilihmu."</p>
                    <span className="text-xs text-stone-400 font-sans mt-3">Klik untuk membalik foto ↺</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* E. INTERACTIVE QUESTION / PROPOSAL */}
          {data.questionPrompt && data.questionPrompt.question && (
            <div className="p-6 rounded-3xl bg-[#0F172A]/90 border border-[#F8D376]/40 backdrop-blur-md shadow-2xl text-center space-y-4">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#F8D376]/15 text-[#F8D376] border border-[#F8D376]/30 mx-auto">
                <Sparkles className="w-5 h-5" />
              </div>

              <h3 className="font-serif text-lg sm:text-xl font-bold text-white px-2">
                "{data.questionPrompt.question}"
              </h3>

              {!hasAnswered ? (
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 font-sans">
                  <button
                    onClick={handleAnswerYes}
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-linear-to-r from-[#F8D376] to-[#E6B748] hover:from-[#FFE7A3] hover:to-[#F8D376] text-[#060913] font-bold text-xs shadow-lg shadow-amber-500/25 cursor-pointer hover:scale-105 active:scale-95 transition-all"
                  >
                    {data.questionPrompt.acceptButton}
                  </button>

                  <button
                    onMouseEnter={() => setPlayfulButtonText('Iya dong sayang! 🥰')}
                    onClick={handleAnswerYes}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-stone-300 font-medium text-xs transition-colors cursor-pointer"
                  >
                    {playfulButtonText}
                  </button>
                </div>
              ) : (
                <div className="p-3.5 rounded-2xl bg-amber-500/20 border border-[#F8D376]/50 text-xs text-[#F8D376] font-semibold animate-in zoom-in duration-300">
                  ✨ Jawabanmu terpatri di rasi bintang selamanya! Aku mencintaimu! ❤️
                </div>
              )}
            </div>
          )}

          {/* F. FOLDED ASTRAL P.S. NOTE */}
          {data.psNote && (
            <div className="rounded-2xl border border-white/10 bg-[#0B1120]/70 overflow-hidden text-left font-sans">
              <button
                onClick={() => setIsPsUnfolded(!isPsUnfolded)}
                className="w-full p-4 flex items-center justify-between text-xs text-[#F8D376] font-semibold hover:bg-white/5 transition-colors cursor-pointer"
              >
                <span className="flex items-center gap-1.5">
                  <span>✦ Catatan Rahasia di Balik Bintang (P.S.)</span>
                </span>
                {isPsUnfolded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {isPsUnfolded && (
                <div className="p-4 pt-1 border-t border-white/10 font-handwriting text-base sm:text-lg text-stone-200 leading-relaxed bg-black/40 animate-in fade-in duration-200">
                  {data.psNote}
                </div>
              )}
            </div>
          )}

          {/* G. FOOTER ACTIONS */}
          <div className="pt-4 flex flex-col items-center gap-3 border-t border-white/10 font-sans">
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
              className="flex items-center gap-1.5 text-xs text-[#F8D376] hover:underline font-medium cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Tutup Langit & Kunci Bintang Kembali</span>
            </button>

            <p className="text-[10px] text-stone-400">
              Dibuat di bawah langit malam lewat <strong>DLYS</strong>
            </p>
          </div>

        </div>
      )}

      {/* Floating CTA if in Draft Preview Mode */}
      {isDraftPreview && onActivateRequest && (
        <div className="sticky bottom-3 inset-x-3 z-50 p-2.5 rounded-2xl bg-[#0D1526]/95 backdrop-blur-md text-white border border-[#F8D376]/40 shadow-2xl flex items-center justify-between gap-2 font-sans">
          <div className="truncate">
            <p className="text-[11px] font-bold text-[#F8D376] truncate">Suka dengan tema bintang ini?</p>
            <p className="text-[9px] text-stone-300">Aktifkan untuk hilangkan watermark</p>
          </div>
          <button
            onClick={onActivateRequest}
            className="px-4 py-2 rounded-xl bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs shrink-0 shadow-md cursor-pointer"
          >
            Aktifkan (Rp 39rb) ✨
          </button>
        </div>
      )}
    </div>
  );
};
