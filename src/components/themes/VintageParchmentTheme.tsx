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
  Mail,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface VintageParchmentThemeProps {
  data: CustomizationData;
  isDraftPreview?: boolean;
  onActivateRequest?: () => void;
  className?: string;
}

export const VintageParchmentTheme = ({
  data,
  isDraftPreview = false,
  onActivateRequest,
  className = '',
}: VintageParchmentThemeProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPhotoFlipped, setIsPhotoFlipped] = useState(false);
  const [isPsUnfolded, setIsPsUnfolded] = useState(false);
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

  const handleOpenEnvelope = () => {
    sounds.playWaxCrack();
    sounds.playPaperRustle();
    setIsOpen(true);
    setIsPlaying(true);

    // Play real romantic music upon explicit user touch/click
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().then(() => setIsPlaying(true)).catch((e) => {
        console.log('Audio autoplay prevented:', e);
      });
    }

    confetti({
      particleCount: 75,
      spread: 75,
      origin: { y: 0.55 },
      colors: ['#8E283B', '#C93B57', '#FADCE4', '#E2A85C', '#FAF4EB'],
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
      particleCount: 90,
      spread: 85,
      origin: { y: 0.6 },
      colors: ['#E11D48', '#FDA4AF', '#F43F5E', '#10B981'],
    });
  };

  const handlePlayfulHover = () => {
    setPlayfulButtonText('Iya dong sayang! 🥰');
  };

  return (
    <div
      className={`relative w-full overflow-hidden transition-all duration-500 font-serif select-none ${className}`}
      style={{
        backgroundColor: '#F7EFE2',
        color: '#2E1E17',
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
      {/* Subtle Antique Paper Grain Texture Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply"
        style={{
          backgroundImage: `radial-gradient(#CBB79F 1px, transparent 1px), radial-gradient(#CBB79F 1px, #F7EFE2 1px)`,
          backgroundSize: '20px 20px',
          backgroundPosition: '0 0, 10px 10px',
        }}
      />

      {/* DRAFT WATERMARK OVERLAY (If in Preview Mode) */}
      {isDraftPreview && (
        <div className="absolute inset-0 pointer-events-none z-40 flex flex-col justify-around items-center opacity-12 rotate-[-28deg]">
          <span className="font-serif font-black text-xl sm:text-2xl tracking-widest text-[#731D2F] whitespace-nowrap">
            DLYS PREVIEW • BELUM AKTIF
          </span>
          <span className="font-serif font-black text-xl sm:text-2xl tracking-widest text-[#731D2F] whitespace-nowrap">
            DLYS PREVIEW • BELUM AKTIF
          </span>
          <span className="font-serif font-black text-xl sm:text-2xl tracking-widest text-[#731D2F] whitespace-nowrap">
            DLYS PREVIEW • BELUM AKTIF
          </span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. CLOSED ENVELOPE PHASE (The Tactile Wax Seal Opening) */}
      {/* ========================================================================= */}
      {!isOpen ? (
        <div className="min-h-[580px] max-w-xl mx-auto p-6 sm:p-8 flex flex-col items-center justify-between text-center relative z-20">
          
          {/* Top Postmark & Vintage Stamp */}
          <div className="w-full flex items-start justify-between pt-2">
            {/* Postal Seal Stamp */}
            <div className="flex items-center gap-1.5 opacity-65 text-left">
              <div className="w-7 h-7 rounded-full border border-dashed border-[#8E7462] flex items-center justify-center text-[#8E7462]">
                <Mail className="w-3.5 h-3.5" />
              </div>
              <div className="text-[9px] font-mono leading-tight tracking-wider text-[#7A6150]">
                <p className="font-bold">DLYS POSTAL</p>
                <p>SPECIAL DELIVERY</p>
              </div>
            </div>

            {/* Vintage Serrated Postage Stamp */}
            <div className="p-1.5 bg-[#F0E4D0] border-2 border-dashed border-[#B89F82] rounded-xs shadow-xs text-center w-16">
              <div className="w-full aspect-square bg-[#8E283B] rounded-2xs flex flex-col items-center justify-center text-[#FAF4EB] p-1">
                <Heart className="w-4 h-4 fill-current text-rose-200" />
                <span className="text-[7px] font-mono tracking-tighter mt-0.5">DLYS • LOVE</span>
              </div>
              <span className="text-[8px] font-mono font-bold text-[#6D5240] block mt-0.5">
                NO. 1411
              </span>
            </div>
          </div>

          {/* Envelope Body Centerpiece */}
          <div className="my-auto py-4 w-full flex flex-col items-center">
            
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#967C68] mb-2 block">
              SURAT KHUSUS DARI HATI
            </span>

            {/* Recipient Handwritten Address */}
            <h2 className="font-handwriting text-3xl sm:text-4xl text-[#3A2218] mb-1 font-bold">
              Kepada {data.recipientName}
            </h2>
            <p className="font-handwriting text-base text-[#7D5A46]">
              dengan segenap rasa terdalam dari {data.senderName}
            </p>

            {/* Antique Filigree Divider */}
            <div className="flex items-center justify-center gap-3 my-4 opacity-40">
              <div className="w-12 h-px bg-[#7A5B45]"></div>
              <span className="text-xs text-[#7A5B45]">❦</span>
              <div className="w-12 h-px bg-[#7A5B45]"></div>
            </div>

            {/* 3D TACTILE BURGUNDY WAX SEAL */}
            <div className="relative mt-3">
              {/* Pulsing ring aura */}
              <div className="absolute inset-0 rounded-full bg-rose-900/20 blur-md animate-pulse"></div>

              <button
                onClick={handleOpenEnvelope}
                className="relative group w-20 h-20 rounded-full bg-linear-to-br from-[#A82840] via-[#851C2F] to-[#590E1D] border-4 border-[#E8C59A]/80 shadow-2xl flex items-center justify-center text-[#FAF0E4] cursor-pointer hover:scale-105 active:scale-95 transition-all duration-300"
                title="Sentuh untuk membuka segel lilin"
              >
                {/* Embedded Seal Monogram */}
                <div className="w-14 h-14 rounded-full border border-dashed border-[#F3DAC1]/50 flex flex-col items-center justify-center">
                  <Heart className="w-6 h-6 fill-current text-[#FBEAE0] drop-shadow-md group-hover:scale-110 transition-transform" />
                  <span className="text-[8px] font-serif tracking-widest uppercase text-[#FDECE2] font-bold mt-0.5">
                    DLYS
                  </span>
                </div>

                {/* Floating Tooltip */}
                <span className="absolute -bottom-8 whitespace-nowrap text-[11px] font-sans font-semibold text-[#8E283B] bg-white px-3 py-1 rounded-full border border-[#E0CEB8] shadow-md animate-bounce">
                  Sentuh Untuk Buka Surat ✨
                </span>
              </button>
            </div>

          </div>

          {/* Bottom Note */}
          <div className="pb-2 text-center">
            <p className="text-[11px] font-sans text-[#786150] opacity-80">
              Ada pesan pribadi yang menunggumu di dalam.
            </p>
          </div>

        </div>
      ) : (
        /* ========================================================================= */
        /* 2. OPENED PARCHMENT STORY EXPERIENCE (The Unfolding Letter & Keepsakes) */
        /* ========================================================================= */
        <div className="p-5 sm:p-8 space-y-7 animate-in fade-in duration-500 relative z-20 max-w-2xl mx-auto">
          
          {/* A. VINYL RECORD MUSIC PLAYER */}
          <div className="p-3.5 rounded-2xl bg-[#EDE2CA]/80 border border-[#D5C2A5] shadow-xs flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 truncate">
              {/* Rotating Vinyl Disc */}
              <div
                onClick={toggleMusic}
                className={`relative w-11 h-11 rounded-full bg-stone-900 border-2 border-stone-800 shadow-md shrink-0 flex items-center justify-center cursor-pointer ${
                  isPlaying ? 'animate-spin [animation-duration:5s]' : ''
                }`}
                title={isPlaying ? 'Jeda Musik' : 'Putar Musik'}
              >
                {/* Vinyl Grooves */}
                <div className="w-8 h-8 rounded-full border border-stone-700/60 flex items-center justify-center">
                  <div className="w-5 h-5 rounded-full border border-stone-700/80 flex items-center justify-center">
                    {/* Vinyl Center Red Label */}
                    <div className="w-3.5 h-3.5 rounded-full bg-[#8E283B] flex items-center justify-center">
                      <div className="w-1 h-1 rounded-full bg-white"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Song Information */}
              <div className="truncate text-left font-sans">
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-[#8E283B] bg-rose-100/70 px-1.5 py-0.5 rounded-xs">
                    LAGU KITA
                  </span>
                  <p className="text-xs font-bold text-[#2A1B14] truncate">{data.song.title}</p>
                </div>
                <p className="text-[10px] text-[#786150] truncate">{data.song.artist}</p>
              </div>
            </div>

            {/* Play/Pause & Equalizer Bar */}
            <div className="flex items-center gap-2">
              {isPlaying && (
                <div className="flex items-end gap-0.5 h-3 pr-1">
                  <span className="w-0.5 h-2.5 bg-[#8E283B] rounded-full animate-bounce"></span>
                  <span className="w-0.5 h-3.5 bg-[#8E283B] rounded-full animate-bounce [animation-delay:0.15s]"></span>
                  <span className="w-0.5 h-1.5 bg-[#8E283B] rounded-full animate-bounce [animation-delay:0.3s]"></span>
                  <span className="w-0.5 h-3 bg-[#8E283B] rounded-full animate-bounce [animation-delay:0.45s]"></span>
                </div>
              )}
              <button
                onClick={toggleMusic}
                className="w-7 h-7 rounded-full bg-[#8E283B] text-white flex items-center justify-center cursor-pointer shadow-xs"
              >
                {isPlaying ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* B. THE LETTER (SURAT DARI HATI) */}
          <article className="p-6 sm:p-8 rounded-3xl bg-[#FAF4EB] border border-[#DFCBB2] shadow-sm relative text-left">
            
            {/* Top Ornamental Flourish */}
            <div className="text-center mb-6">
              <span className="text-xs text-[#8E283B] opacity-70">❦ ❧ ❦</span>
              <p className="text-[10px] font-mono tracking-widest uppercase text-[#967C68] mt-1">
                SURAT CINTA UNTUK {data.recipientName}
              </p>
            </div>

            {/* Salutation */}
            <div className="mb-4">
              <span className="font-handwriting text-2xl sm:text-3xl text-[#8E283B] block">
                Untuk {data.recipientName} tersayang,
              </span>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2A1B14] mt-2 leading-snug">
                "{data.headline}"
              </h3>
            </div>

            {/* Letter Body with Drop Cap Styling */}
            <div className="text-xs sm:text-sm text-[#3E2B20] leading-relaxed space-y-3 font-serif">
              <p className="whitespace-pre-line first-letter:text-3xl first-letter:font-bold first-letter:float-left first-letter:mr-2 first-letter:text-[#8E283B]">
                {data.message}
              </p>
            </div>

            {/* Signature */}
            <div className="mt-8 pt-4 border-t border-[#DFCBB2]/70 flex flex-col items-end">
              <span className="font-handwriting text-xl text-[#8E283B]">
                Selamanya mencintaimu,
              </span>
              <span className="font-serif text-sm font-bold text-[#2A1B14] tracking-wide mt-0.5">
                {data.senderName}
              </span>
            </div>

          </article>

          {/* C. MILESTONE TICKER (HARI BERSAMA) */}
          <div className="p-5 rounded-2xl bg-linear-to-r from-[#F0E4D0] to-[#E9D9BF] border border-[#D5C2A5] text-center shadow-xs">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#7D5A46] font-semibold block mb-1">
              WAKTU YANG KITA LEWATI BERSAMA
            </span>
            <div className="font-serif text-3xl sm:text-4xl font-black text-[#691828] my-1">
              {daysCount} Hari
            </div>
            <p className="text-[11px] font-sans text-[#5C4233]">
              {hoursCount} Jam • {minutesCount} Menit Penuh Tawa & Cerita
            </p>
          </div>

          {/* D. INTERACTIVE POLAROID PHOTO WITH FLIP INTERACTION */}
          <div className="flex flex-col items-center justify-center pt-2">
            <div
              onClick={() => setIsPhotoFlipped(!isPhotoFlipped)}
              className="relative bg-white p-3.5 pb-5 rounded-xs shadow-xl border border-[#DCD1C0] rotate-[-1.5deg] max-w-[260px] cursor-pointer hover:rotate-0 transition-transform duration-300"
              title="Sentuh untuk membalik foto"
            >
              {/* Washi Tape Effect on Top */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-[#E0D0B6]/80 backdrop-blur-2xs border border-[#C5B396]/60 rounded-xs shadow-2xs rotate-1 z-10" />

              {!isPhotoFlipped ? (
                /* FRONT: THE PHOTO */
                <div className="space-y-2.5">
                  <div className="w-full aspect-[4/3] overflow-hidden rounded-2xs bg-stone-100">
                    <img
                      src={data.photos[0]}
                      alt="Kenangan Bersama"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="font-handwriting text-base text-[#4E343E] text-center px-1">
                    "{data.headline}"
                  </p>
                  <span className="text-[9px] font-mono text-[#8C7680] block text-center">
                    📸 Sentuh foto untuk baca pesan di baliknya
                  </span>
                </div>
              ) : (
                /* BACK: HANDWRITTEN SECRET NOTE */
                <div className="w-full aspect-[4/3] p-4 bg-[#FFFDF7] flex flex-col justify-center items-center text-center space-y-2 border border-dashed border-stone-300 rounded-2xs">
                  <Sparkles className="w-5 h-5 text-[#8E283B]" />
                  <p className="font-handwriting text-sm text-[#4E343E] leading-relaxed">
                    "Semua foto bersamamu selalu jadi pemandangan favoritku di dunia."
                  </p>
                  <span className="text-[9px] font-mono text-[#8E283B] underline">
                    Sentuh lagi untuk balik foto
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* E. INTERACTIVE QUESTION / SURPRISE ENDING */}
          <div className="p-6 rounded-3xl bg-[#FAF4EB] border-2 border-[#8E283B]/30 shadow-md text-center space-y-4">
            {!hasAnswered ? (
              <>
                <div className="w-11 h-11 rounded-full bg-[#8E283B]/10 text-[#8E283B] flex items-center justify-center mx-auto">
                  <Gift className="w-5 h-5" />
                </div>
                <h4 className="font-serif text-base sm:text-lg font-bold text-[#2A1B14] leading-snug">
                  {data.questionPrompt.question}
                </h4>
                <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                  <button
                    onClick={handleAnswerYes}
                    className="flex-1 py-3 px-4 rounded-xl bg-linear-to-r from-[#A82840] to-[#8E283B] hover:from-[#8E283B] hover:to-[#6E1C2C] text-white font-sans font-semibold text-xs shadow-md shadow-rose-900/20 cursor-pointer transition-all active:scale-95"
                  >
                    {data.questionPrompt.acceptButton}
                  </button>
                  <button
                    onClick={handleAnswerYes}
                    onMouseEnter={handlePlayfulHover}
                    className="flex-1 py-3 px-4 rounded-xl bg-[#EDE2CA] hover:bg-[#E3D4B8] text-[#593F2E] font-sans font-semibold text-xs border border-[#D5C2A5] cursor-pointer transition-all"
                  >
                    {playfulButtonText}
                  </button>
                </div>
              </>
            ) : (
              <div className="space-y-2.5 py-2 animate-in zoom-in-95 duration-300">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <Heart className="w-6 h-6 fill-emerald-600" />
                </div>
                <h4 className="font-serif text-lg font-bold text-emerald-900">
                  Jawabanmu Tersimpan! ❤️
                </h4>
                <p className="text-xs font-sans text-[#523E48] leading-relaxed">
                  {data.senderName} pasti sangat bahagia melihat ini. Hari ini dan seterusnya, semoga kalian selalu bahagia berdua!
                </p>
              </div>
            )}
          </div>

          {/* F. SECRET FOLDED P.S. NOTE */}
          {data.psNote && (
            <div className="border border-[#DFCBB2] rounded-2xl bg-[#EDE2CA]/60 overflow-hidden text-left">
              <button
                onClick={() => setIsPsUnfolded(!isPsUnfolded)}
                className="w-full p-4 flex items-center justify-between text-xs font-sans font-semibold text-[#6E4E3A] hover:bg-[#E4D5BC] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#8E283B]"></span>
                  <span>Catatan Rahasia (P.S.) — Klik untuk buka lipatan</span>
                </div>
                {isPsUnfolded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {isPsUnfolded && (
                <div className="p-4 pt-1 border-t border-[#DFCBB2] font-handwriting text-base sm:text-lg text-[#8E283B] leading-relaxed bg-[#FAF4EB] animate-in fade-in duration-200">
                  {data.psNote}
                </div>
              )}
            </div>
          )}

          {/* G. FOOTER ACTIONS */}
          <div className="pt-4 flex flex-col items-center gap-3 border-t border-[#DFCBB2]/60 font-sans">
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
              className="flex items-center gap-1.5 text-xs text-[#8E283B] hover:underline font-medium cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Lipat & Segel Kembali Surat</span>
            </button>

            {/* Prompt for visitors */}
            <p className="text-[10px] text-[#806B5D]">
              Dibuat dengan segenap cinta lewat <strong>DLYS</strong>
            </p>
          </div>

        </div>
      )}

      {/* Floating CTA if in Draft Preview Mode */}
      {isDraftPreview && onActivateRequest && (
        <div className="sticky bottom-3 inset-x-3 z-50 p-2.5 rounded-2xl bg-[#2B1720]/95 backdrop-blur-md text-white border border-rose-500/40 shadow-xl flex items-center justify-between gap-2 font-sans">
          <div className="truncate">
            <p className="text-[11px] font-bold text-rose-200 truncate">Suka dengan preview ini?</p>
            <p className="text-[9px] text-stone-300">Aktifkan untuk hilangkan watermark</p>
          </div>
          <button
            onClick={onActivateRequest}
            className="px-4 py-2 rounded-xl bg-linear-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold text-xs shrink-0 shadow-md cursor-pointer"
          >
            Aktifkan (Rp 39rb) ✨
          </button>
        </div>
      )}
    </div>
  );
};
