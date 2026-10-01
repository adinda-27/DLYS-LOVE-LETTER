import { useState, useRef, useEffect } from 'react';
import type { CustomizationData } from '../../types';
import { sounds } from '../../utils/soundEffects';
import {
  Heart,
  Volume2,
  VolumeX,
  Sparkles,
  Ticket,
  CheckCircle2,
  Lock,
  Stamp,
  MessageCircle,
  HelpCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface LoveCouponsThemeProps {
  data: CustomizationData;
  isDraftPreview?: boolean;
  onActivateRequest?: () => void;
  className?: string;
}

interface VoucherItem {
  id: string;
  emoji: string;
  title: string;
  badge: string;
  terms: string;
  isRevealed: boolean;
  isRedeemed: boolean;
}

export const LoveCouponsTheme = ({
  data,
  isDraftPreview = false,
  onActivateRequest,
  className = '',
}: LoveCouponsThemeProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const [vouchers, setVouchers] = useState<VoucherItem[]>([
    {
      id: 'massage',
      emoji: '💆‍♀️',
      title: '1 Jam Pijat Punggung & Relaksasi',
      badge: 'Relaksasi Bebas Capek',
      terms: 'Berlaku saat kamu lelah pulang kerja/aktivitas. Lengkap dengan minyak wangi & pijatan lembut tanpa komplain.',
      isRevealed: false,
      isRedeemed: false,
    },
    {
      id: 'dinner',
      emoji: '🍽️',
      title: 'Dinner Bebas Pilih Restoran Apapun',
      badge: 'All-You-Can-Eat',
      terms: 'Kamu tentukan tempat makannya 100%, aku yang temani dan aku yang bayar bill-nya.',
      isRevealed: false,
      isRedeemed: false,
    },
    {
      id: 'cuddle',
      emoji: '🫂',
      title: 'Tiket Bebas Ngambek & Peluk 24 Jam',
      badge: 'Peace Maker',
      terms: 'Tunjukkan kupon ini saat kita berselisih atau saat hatimu sedih. Berlaku damai instan & peluk erat tanpa jeda.',
      isRevealed: false,
      isRedeemed: false,
    },
    {
      id: 'breakfast',
      emoji: '☕',
      title: 'Sarapan di Ranjang + Minuman Favorit',
      badge: 'Lazy Weekend',
      terms: 'Kamu tinggal rebahan santai, makanan & kopi/minuman kesukaanmu siap diantarkan langsung ke samping tempat tidur.',
      isRevealed: false,
      isRedeemed: false,
    },
  ]);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioSrc = data.song.url || '/audio/until-i-found-you.wav';

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
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#EA580C', '#F97316', '#FBBF24', '#FB923C'],
      });
    } catch {
      // Confetti fallback
    }
  };

  const handleReveal = (id: string) => {
    sounds.playRomanticChime();
    setVouchers((prev) =>
      prev.map((v) => (v.id === id ? { ...v, isRevealed: true } : v))
    );

    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.5 },
        colors: ['#F97316', '#FBBF24', '#34D399'],
      });
    } catch {
      // Confetti fallback
    }
  };

  const handleRedeem = (id: string, title: string) => {
    sounds.playWaxCrack();
    setVouchers((prev) =>
      prev.map((v) => (v.id === id ? { ...v, isRedeemed: true } : v))
    );

    const waMsg = encodeURIComponent(
      `Halo sayang! 🥰 Aku mau klaim kupon cinta DLYS kita nih: "${title}". Kapan bisa dicairkan? ❤️`
    );
    window.open(`https://wa.me/?text=${waMsg}`, '_blank');
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

  return (
    <div
      className={`relative w-full max-w-xl mx-auto rounded-3xl overflow-hidden transition-all duration-700 font-sans shadow-2xl bg-[#FFFDF8] text-[#2F2119] border border-[#FEDCBF]/80 ${className}`}
    >
      <audio ref={audioRef} src={audioSrc} loop preload="auto" />

      {/* Watermark Draft Banner */}
      {isDraftPreview && (
        <div className="sticky top-0 z-40 bg-linear-to-r from-amber-600 via-orange-600 to-amber-600 text-white px-4 py-2.5 shadow-md flex items-center justify-between text-xs backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5" />
            <span className="font-semibold tracking-wide uppercase text-[11px]">
              🔒 DLYS DRAFT PREVIEW • BELUM AKTIF
            </span>
          </div>
          {onActivateRequest && (
            <button
              onClick={onActivateRequest}
              className="bg-white text-orange-700 hover:bg-orange-50 px-3 py-1 rounded-full font-bold text-[11px] shadow transition-all cursor-pointer"
            >
              Aktifkan Link
            </button>
          )}
        </div>
      )}

      {/* PHASE 1: UNOPENED VOUCHER BOOK COVER */}
      {!isOpen ? (
        <div className="relative min-h-[580px] p-8 flex flex-col items-center justify-center text-center overflow-hidden">
          {/* Subtle Ambient Background */}
          <div className="absolute inset-0 bg-linear-to-b from-[#FFF5EB] via-[#FFFDF8] to-[#FEEAD9] pointer-events-none" />

          {/* Golden Badge */}
          <div className="relative z-10 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100/90 border border-amber-300 text-amber-900 text-xs font-semibold uppercase tracking-wider mb-6 shadow-xs">
            <Ticket className="w-3.5 h-3.5 text-orange-600" />
            <span>Digital Romantic Voucher Book</span>
          </div>

          {/* Interactive Ticket Cover graphic */}
          <div
            className="relative z-10 my-4 group cursor-pointer"
            onClick={handleOpenBook}
          >
            <div className="relative w-56 sm:w-64 rounded-2xl bg-linear-to-br from-amber-500 via-orange-500 to-rose-600 p-1 shadow-2xl shadow-orange-950/20 transform transition-transform duration-500 group-hover:scale-105">
              <div className="rounded-xl bg-[#FFF9F2] p-6 border-2 border-dashed border-orange-300 text-center relative overflow-hidden">
                {/* Left & Right Notch Cutouts */}
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-amber-500 shadow-inner" />
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-amber-500 shadow-inner" />

                <div className="w-12 h-12 mx-auto rounded-full bg-orange-100 flex items-center justify-center mb-3">
                  <Stamp className="w-6 h-6 text-orange-600" />
                </div>

                <h3 className="font-serif text-lg font-bold text-stone-900 tracking-wide">
                  COUPONS OF LOVE
                </h3>
                <p className="text-xs text-orange-700 font-medium mt-1">
                  Presented to {data.recipientName}
                </p>
                <div className="mt-3 py-1 px-2 bg-orange-50 rounded text-[10px] font-mono text-stone-500 tracking-widest uppercase">
                  UNLIMITED VALIDITY • 4 VOUCHERS
                </div>
              </div>
            </div>

            <div className="absolute -inset-2 rounded-3xl border-2 border-orange-300/40 animate-pulse pointer-events-none" />
          </div>

          {/* Call to action */}
          <div className="relative z-10 mt-6 max-w-sm">
            <h2 className="font-serif text-2xl text-stone-900 font-medium">
              Tiket Cinta Spesial Untukmu
            </h2>
            <p className="text-xs text-stone-600 mt-2 leading-relaxed">
              Dibuat khusus oleh <strong className="text-orange-700">{data.senderName}</strong>. 
              Gosok setiap kupon untuk membuka hadiah dan klaim kapan saja kamu mau!
            </p>

            <button
              onClick={handleOpenBook}
              className="mt-6 w-full py-3.5 px-6 rounded-2xl bg-linear-to-r from-orange-600 via-amber-600 to-rose-600 hover:from-orange-500 hover:to-rose-500 text-white font-semibold text-sm shadow-xl shadow-orange-600/25 transition-all cursor-pointer flex items-center justify-center gap-2 group"
            >
              <Ticket className="w-4 h-4 text-amber-200 group-hover:rotate-12 transition-transform" />
              <span>Buka Buku Kupon & Gosok Hadiah</span>
            </button>
          </div>
        </div>
      ) : (
        /* PHASE 2: INTERACTIVE VOUCHERS & LETTER */
        <div className="relative p-6 sm:p-8 space-y-6 animate-in fade-in zoom-in-95 duration-700">
          
          {/* Header */}
          <header className="text-center border-b border-orange-100 pb-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100/70 text-orange-800 text-xs font-semibold mb-2">
              <Ticket className="w-3.5 h-3.5 text-orange-600" />
              <span>DLYS VOUCHER BOOKLET</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl text-stone-900 font-bold">
              Kupon Rahasia untuk {data.recipientName}
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              "Klaim sesukamu, berlaku seumur hidup tanpa tanggal kedaluwarsa."
            </p>
          </header>

          {/* Audio Player Bar */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-orange-50/70 border border-orange-200/80 shadow-xs">
            <div className="flex items-center gap-3">
              <div
                className={`w-9 h-9 rounded-full bg-orange-600 text-white flex items-center justify-center shadow-sm ${
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
              className="p-2.5 rounded-xl bg-white border border-orange-200 hover:bg-orange-100/60 text-orange-700 shadow-xs transition-colors cursor-pointer"
              title={isPlaying ? 'Pause Audio' : 'Play Audio'}
            >
              {isPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
          </div>

          {/* Photo & Special Note from Giver */}
          <div className="p-5 rounded-2xl bg-white border border-orange-100 shadow-sm flex flex-col sm:flex-row items-center gap-4">
            <img
              src={data.photos?.[0] || 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800&auto=format&fit=crop'}
              alt="Couples"
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover shrink-0 border-2 border-orange-200 shadow-xs"
            />
            <div className="text-left space-y-1">
              <div className="text-[10px] font-mono uppercase tracking-wider text-orange-600 font-bold">
                A NOTE FROM {data.senderName.toUpperCase()}
              </div>
              <h3 className="font-serif font-bold text-base text-stone-900">
                {data.headline}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-sans line-clamp-3">
                {data.message}
              </p>
            </div>
          </div>

          {/* INSTRUCTIONS */}
          <div className="flex items-center gap-2 text-xs text-stone-500 bg-amber-50/60 p-3 rounded-xl border border-amber-200/60">
            <HelpCircle className="w-4 h-4 text-orange-600 shrink-0" />
            <span>
              Ketuk foil <strong>"GOSOK KUPON"</strong> untuk membuka syarat voucher, lalu tekan tombol klaim untuk menukarkannya!
            </span>
          </div>

          {/* VOUCHER CARDS GRID */}
          <div className="space-y-4">
            {vouchers.map((voucher) => (
              <div
                key={voucher.id}
                className="relative rounded-2xl bg-white border-2 border-orange-200/90 shadow-sm overflow-hidden transition-all"
              >
                {/* Perforated ticket circles */}
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#FFFDF8] border-r-2 border-orange-200/90 z-20" />
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#FFFDF8] border-l-2 border-orange-200/90 z-20" />

                {/* Perforated dashed divider */}
                <div className="p-5 pl-7 pr-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  {/* Left voucher info */}
                  <div className="flex items-start gap-3.5">
                    <span className="text-3xl shrink-0 p-2 bg-orange-50 rounded-xl border border-orange-100">
                      {voucher.emoji}
                    </span>
                    <div>
                      <div className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-orange-100 text-orange-800 uppercase tracking-wide mb-1">
                        {voucher.badge}
                      </div>
                      <h4 className="font-serif text-base font-bold text-stone-900">
                        {voucher.title}
                      </h4>
                      {voucher.isRevealed ? (
                        <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                          {voucher.terms}
                        </p>
                      ) : (
                        <p className="text-xs text-stone-400 mt-1 italic">
                          🔒 Hadiah masih tertutup foil pelindung...
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right Action / Scratch */}
                  <div className="w-full sm:w-auto shrink-0 flex flex-col items-center gap-2">
                    {!voucher.isRevealed ? (
                      <button
                        onClick={() => handleReveal(voucher.id)}
                        className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-linear-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-500 hover:to-yellow-500 text-stone-900 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-stone-900" />
                        <span>Gosok Kupon ✨</span>
                      </button>
                    ) : voucher.isRedeemed ? (
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>TELAH DIKLAIM</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleRedeem(voucher.id, voucher.title)}
                        className="w-full sm:w-auto py-2.5 px-4 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Klaim ke Pasangan</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* REDEEMED STAMP WATERMARK */}
                {voucher.isRedeemed && (
                  <div className="absolute right-4 top-2 pointer-events-none transform rotate-12 border-2 border-red-600 text-red-600 font-mono font-black text-xs px-2.5 py-0.5 rounded opacity-80 uppercase tracking-widest">
                    REDEEMED
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Full Love Letter Accordion */}
          <div className="p-5 rounded-2xl bg-orange-50/50 border border-orange-200/60 text-center">
            <Heart className="w-5 h-5 text-orange-600 mx-auto mb-2" />
            <p className="text-xs text-stone-600 font-serif leading-relaxed max-w-md mx-auto whitespace-pre-line">
              "{data.message}"
            </p>
            <p className="mt-3 font-handwriting text-xl text-orange-700">
              With all my heart, {data.senderName}
            </p>
          </div>

          <footer className="text-center pt-2 text-[11px] text-stone-400">
            DLYS Romantic Voucher Registry • Authentic Digital Keepsake
          </footer>

        </div>
      )}
    </div>
  );
};
