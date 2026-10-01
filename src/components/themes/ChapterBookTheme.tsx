import { useState, useRef, useEffect } from 'react';
import type { CustomizationData } from '../../types';
import { sounds } from '../../utils/soundEffects';
import {
  Heart,
  Volume2,
  VolumeX,
  Sparkles,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Lock,
  Bookmark,
  CheckCircle2,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ChapterBookThemeProps {
  data: CustomizationData;
  isDraftPreview?: boolean;
  onActivateRequest?: () => void;
  className?: string;
}

export const ChapterBookTheme = ({
  data,
  isDraftPreview = false,
  onActivateRequest,
  className = '',
}: ChapterBookThemeProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(0);
  const [hasAnsweredFinal, setHasAnsweredFinal] = useState(false);

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

  const handleOpenBook = () => {
    sounds.playPaperRustle();
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
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#D97706', '#9F1239', '#FBBF24', '#F43F5E'],
      });
    } catch {
      // Confetti fallback
    }
  };

  const handleNextPage = () => {
    sounds.playPaperRustle();
    if (currentChapter < chapters.length - 1) {
      setCurrentChapter((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    sounds.playPaperRustle();
    if (currentChapter > 0) {
      setCurrentChapter((prev) => prev - 1);
    }
  };

  const handleFinalAnswer = () => {
    sounds.playRomanticChime();
    setHasAnsweredFinal(true);

    try {
      confetti({
        particleCount: 90,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#D97706', '#E11D48', '#F59E0B', '#F43F5E'],
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

  const chapters = [
    {
      number: 'Bab 1',
      title: 'The Spark (Awal Mula)',
      subtitle: 'Saat Semesta Mempertemukan Dua Jiwa',
      quote: 'Setiap kisah cinta memiliki awal, tapi awal kita adalah favoritku.',
      content: `Ingatkah hari ketika takdir mempertemukan kita? Di antara milyaran manusia di dunia, langkah kita berhenti di titik yang sama. Senyuman pertamamu hari itu masih menjadi gambar paling jelas yang tersimpan rapi di ingatanku.`,
      highlight: data.headline,
    },
    {
      number: 'Bab 2',
      title: 'The Journey (Langkah & Tawa)',
      subtitle: 'Merajut Hari-Hari Penuh Cerita',
      quote: 'Bukan tentang ke mana kita pergi, tapi tentang siapa yang berada di sampingku.',
      content: `Kita tertawa pada hal-hal konyol yang hanya kita berdua yang mengerti. Menikmati makanan sederhana di pinggir jalan, membagi lagu favorit di dalam mobil, dan belajar memahami setiap sudut kepribadian masing-masing dengan penuh sabar.`,
      highlight: 'Setiap detik yang kita lalui bersama selalu bernilai selamanya.',
    },
    {
      number: 'Bab 3',
      title: 'The Shelter (Tempat Berteduh)',
      subtitle: 'Saling Menguatkan di Tengah Badai',
      quote: 'Cinta bukan hanya tentang hari cerah, tapi tentang payung yang kita buka bersama saat hujan lebat.',
      content: `Ada hari-hari yang lelah dan tidak mudah, namun genggaman tanganmu selalu mengingatkanku bahwa rumah bukanlah tempat, melainkan kamu. Terima kasih telah selalu menjadi tempat ternyaman untuk pulang.`,
      highlight: 'Bersamamu, aku tidak pernah takut menghadapi apapun di dunia ini.',
    },
    {
      number: 'Bab 4',
      title: 'The Forever (Janji Esok Hari)',
      subtitle: 'Surat Terbuka & Masa Depan Kita',
      quote: 'Kisah kita belum selesai, ini hanyalah awal dari keabadian.',
      content: data.message,
      highlight: `Tertulis untuk ${data.recipientName} • Selalu milikmu, ${data.senderName}`,
    },
  ];

  const currentData = chapters[currentChapter];

  return (
    <div
      className={`relative w-full max-w-xl mx-auto rounded-3xl overflow-hidden transition-all duration-700 font-serif shadow-2xl bg-[#FBF8F3] text-[#2F2119] border-2 border-[#E8DEC8] ${className}`}
    >
      <audio ref={audioRef} src={audioSrc} loop preload="auto" />

      {/* Draft Preview Watermark */}
      {isDraftPreview && (
        <div className="sticky top-0 z-40 bg-linear-to-r from-amber-700 via-rose-700 to-amber-700 text-white px-4 py-2.5 shadow-md flex items-center justify-between text-xs backdrop-blur-sm font-sans">
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5" />
            <span className="font-semibold tracking-wide uppercase text-[11px]">
              🔒 DLYS DRAFT PREVIEW • BELUM AKTIF
            </span>
          </div>
          {onActivateRequest && (
            <button
              onClick={onActivateRequest}
              className="bg-white text-rose-800 hover:bg-rose-50 px-3 py-1 rounded-full font-bold text-[11px] shadow transition-all cursor-pointer"
            >
              Aktifkan Link
            </button>
          )}
        </div>
      )}

      {/* PHASE 1: HARDCOVER BOOK COVER */}
      {!isOpen ? (
        <div className="relative min-h-[580px] p-8 flex flex-col items-center justify-center text-center overflow-hidden">
          {/* Ambient Leather Texture Background */}
          <div className="absolute inset-0 bg-linear-to-b from-[#2A1620] via-[#3B1D2C] to-[#1F1017] pointer-events-none" />

          {/* Golden Ribbon Hanging */}
          <div className="absolute top-0 right-12 w-6 h-36 bg-linear-to-b from-amber-400 via-yellow-300 to-amber-500 shadow-xl rounded-b-md transform -translate-y-2 pointer-events-none border-b-4 border-amber-600" />

          {/* Book Front Gilded Frame */}
          <div
            className="relative z-10 w-full max-w-sm rounded-2xl bg-linear-to-br from-[#3D1E2D] to-[#221019] p-6 sm:p-8 border-4 border-[#C89B3C]/80 shadow-2xl shadow-rose-950/50 cursor-pointer group transform transition-transform duration-500 hover:scale-102"
            onClick={handleOpenBook}
          >
            {/* Corner Gilded Accents */}
            <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#E5C158]" />
            <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#E5C158]" />
            <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#E5C158]" />
            <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#E5C158]" />

            <div className="w-12 h-12 mx-auto rounded-full bg-[#C89B3C]/20 border border-[#E5C158] flex items-center justify-center text-[#E5C158] mb-4">
              <BookOpen className="w-6 h-6" />
            </div>

            <div className="text-[10px] font-mono tracking-widest text-[#E5C158] uppercase mb-1">
              VOL. 1 • AN ENDLESS NOVEL
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl text-amber-100 font-normal tracking-wide uppercase leading-tight">
              OUR LITTLE INFINITY
            </h1>

            <div className="w-16 h-0.5 bg-linear-to-r from-transparent via-[#E5C158] to-transparent mx-auto my-3" />

            <p className="font-serif italic text-amber-200/90 text-sm">
              Didedikasikan untuk {data.recipientName}
            </p>

            <p className="text-[11px] font-mono tracking-wider text-rose-300/70 uppercase mt-4">
              Written by {data.senderName}
            </p>
          </div>

          <div className="relative z-10 mt-8 max-w-xs">
            <button
              onClick={handleOpenBook}
              className="w-full py-3.5 px-6 rounded-2xl bg-linear-to-r from-amber-600 via-yellow-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold font-sans text-sm shadow-xl shadow-amber-950/40 transition-all cursor-pointer flex items-center justify-center gap-2 group"
            >
              <Bookmark className="w-4 h-4 text-stone-950 group-hover:-translate-y-0.5 transition-transform" />
              <span>Buka Bab Cerita Kita 📖</span>
            </button>
          </div>
        </div>
      ) : (
        /* PHASE 2: CHAPTER BOOK READER */
        <div className="relative p-6 sm:p-10 space-y-6 animate-in fade-in zoom-in-95 duration-700">
          
          {/* Top Chapter Selector Tabs */}
          <div className="flex items-center justify-between border-b border-[#D8C7A5] pb-3 text-xs">
            <div className="flex items-center gap-1 font-mono tracking-wider text-stone-500 uppercase">
              <BookOpen className="w-3.5 h-3.5 text-rose-800" />
              <span>THE BOOK OF US</span>
            </div>

            <div className="flex items-center gap-1.5 font-mono text-[11px] text-stone-600 font-semibold">
              <span>{currentData.number} DARI {chapters.length}</span>
            </div>
          </div>

          {/* Audio Player Bar */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-[#F4ECDD] border border-[#DFCFA8] shadow-xs font-sans">
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-full bg-rose-900 text-amber-200 flex items-center justify-center shadow-xs ${
                  isPlaying ? 'animate-spin' : ''
                }`}
                style={{ animationDuration: '4s' }}
              >
                <Sparkles className="w-4 h-4" />
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
              className="p-2 rounded-xl bg-white border border-[#D5C29B] hover:bg-stone-50 text-rose-900 shadow-xs transition-colors cursor-pointer"
              title={isPlaying ? 'Pause Audio' : 'Play Audio'}
            >
              {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>

          {/* Book Page Content */}
          <div className="relative rounded-2xl bg-white p-6 sm:p-8 border border-[#E5DAC4] shadow-md min-h-[380px] flex flex-col justify-between">
            {/* Top Chapter Header */}
            <div>
              <div className="text-center mb-6">
                <span className="text-[11px] font-mono tracking-widest text-rose-700 uppercase font-bold">
                  {currentData.number}
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl text-stone-900 font-normal mt-1">
                  {currentData.title}
                </h2>
                <p className="font-serif italic text-xs text-stone-500 mt-1">
                  "{currentData.subtitle}"
                </p>
                <div className="w-12 h-0.5 bg-rose-800/30 mx-auto mt-3" />
              </div>

              {/* Chapter 1 Photo Attachment if first chapter */}
              {currentChapter === 0 && (
                <div className="mb-6 rounded-xl overflow-hidden border-2 border-stone-100 shadow-sm max-h-56">
                  <img
                    src={data.photos?.[0] || 'https://images.unsplash.com/photo-1474552226712-ac0f0961a954?q=80&w=800&auto=format&fit=crop'}
                    alt="Our Story Memory"
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              )}

              {/* Narrative Content */}
              <div className="prose prose-stone text-stone-700 text-sm sm:text-base leading-relaxed whitespace-pre-line font-serif">
                <span className="float-left text-4xl font-serif text-rose-900 leading-none mr-2">
                  {currentData.content.charAt(0)}
                </span>
                {currentData.content.slice(1)}
              </div>

              {/* Chapter Highlight Banner */}
              <div className="mt-6 p-4 rounded-xl bg-[#FAF6EE] border-l-4 border-amber-600 text-stone-800 text-xs sm:text-sm font-serif italic">
                "{currentData.highlight}"
              </div>
            </div>

            {/* FINAL CHAPTER PROMPT */}
            {currentChapter === chapters.length - 1 && (
              <div className="mt-8 pt-6 border-t border-stone-200 text-center font-sans">
                <p className="font-serif italic text-stone-800 text-base mb-4">
                  "Maukah kamu terus menulis bab-bab kehidupan selanjutnya bersamaku?"
                </p>

                {!hasAnsweredFinal ? (
                  <button
                    onClick={handleFinalAnswer}
                    className="py-3 px-6 rounded-full bg-rose-800 hover:bg-rose-900 text-white font-medium text-xs shadow-md transition-all cursor-pointer inline-flex items-center gap-2 active:scale-95"
                  >
                    <Heart className="w-4 h-4 fill-white" />
                    <span>Iya, Selamanya Bersamamu ❤️</span>
                  </button>
                ) : (
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Bab Keabadian Dimulai Hari Ini ✨</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Book Navigation Buttons */}
          <div className="flex items-center justify-between pt-2 font-sans">
            <button
              onClick={handlePrevPage}
              disabled={currentChapter === 0}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
                currentChapter === 0
                  ? 'opacity-40 cursor-not-allowed bg-stone-100 border-stone-200 text-stone-400'
                  : 'bg-white hover:bg-stone-50 border-[#D8C7A5] text-stone-800'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Halaman Sebelumnya</span>
            </button>

            <button
              onClick={handleNextPage}
              disabled={currentChapter === chapters.length - 1}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                currentChapter === chapters.length - 1
                  ? 'opacity-40 cursor-not-allowed bg-stone-100 border-stone-200 text-stone-400'
                  : 'bg-rose-800 hover:bg-rose-900 border-rose-900 text-white shadow-xs'
              }`}
            >
              <span>Bab Berikutnya</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Keepsake Footer */}
          <footer className="text-center pt-2 text-[11px] text-stone-400 font-mono">
            DLYS MEMORY PRESERVATION • REGISTERED CHAPTER BOOK
          </footer>

        </div>
      )}
    </div>
  );
};
