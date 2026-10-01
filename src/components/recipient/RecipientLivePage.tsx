import { useState, useEffect } from 'react';
import type { CustomizationData, Template } from '../../types';
import { VintageParchmentTheme } from '../themes/VintageParchmentTheme';
import { CelestialStarlightTheme } from '../themes/CelestialStarlightTheme';
import { PolaroidBlushTheme } from '../themes/PolaroidBlushTheme';
import { VelvetEditorialTheme } from '../themes/VelvetEditorialTheme';
import { LoveCouponsTheme } from '../themes/LoveCouponsTheme';
import { ChapterBookTheme } from '../themes/ChapterBookTheme';
import { OurStoryRomanceNovelTheme } from '../themes/OurStoryRomanceNovelTheme';
import { QrCardModal } from '../modals/QrCardModal';
import { buildShareableUrl } from '../../utils/urlEncoder';
import {
  Copy,
  Check,
  ArrowLeft,
  Sparkles,
  Maximize,
  Minimize,
  Smartphone,
  Monitor,
  QrCode,
} from 'lucide-react';

interface RecipientLivePageProps {
  data: CustomizationData;
  template: Template;
  onBackToEditor: () => void;
  onReturnToHome: () => void;
  isDirectRecipientView?: boolean;
}

export const RecipientLivePage = ({
  data,
  template,
  onBackToEditor,
  onReturnToHome,
  isDirectRecipientView = false,
}: RecipientLivePageProps) => {
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'immersive' | 'mobile-frame'>('immersive');
  const [isBrowserFullscreen, setIsBrowserFullscreen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  const shareableUrl = buildShareableUrl(data);

  const handleCopyLink = () => {
    setCopied(true);
    navigator.clipboard?.writeText(shareableUrl);
    setTimeout(() => setCopied(false), 2200);
  };

  const toggleBrowserFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsBrowserFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsBrowserFullscreen(false)).catch(() => {});
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsBrowserFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const currentTemplateId = data.templateId || template.id;
  const isCelestial = currentTemplateId === 'celestial-starlight';
  const isPolaroid = currentTemplateId === 'polaroid-sunshine';
  const isVelvet = currentTemplateId === 'velvet-blossom';
  const isCoupons = currentTemplateId === 'love-coupons-vouchers';
  const isChapterBook = currentTemplateId === 'our-little-infinity';
  const isNovel = currentTemplateId === 'our-story-novel';

  const renderTheme = () => {
    if (isNovel) return <OurStoryRomanceNovelTheme data={data} isDraftPreview={false} />;
    if (isCelestial) return <CelestialStarlightTheme data={data} isDraftPreview={false} />;
    if (isPolaroid) return <PolaroidBlushTheme data={data} isDraftPreview={false} />;
    if (isVelvet) return <VelvetEditorialTheme data={data} isDraftPreview={false} />;
    if (isCoupons) return <LoveCouponsTheme data={data} isDraftPreview={false} />;
    if (isChapterBook) return <ChapterBookTheme data={data} isDraftPreview={false} />;
    return <VintageParchmentTheme data={data} isDraftPreview={false} />;
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#140E11] text-[#F3EDF0] flex flex-col overflow-y-auto">
      
      {/* Top Admin Navigation / Mode Switcher Bar */}
      <header className="bg-stone-950/85 backdrop-blur-md border-b border-white/10 px-3 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs sticky top-0 z-50">
        
        {/* Left: Back button or Romantic Banner */}
        <div className="flex items-center gap-2 sm:gap-3">
          {!isDirectRecipientView ? (
            <button
              onClick={onBackToEditor}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Kembali ke Editor</span>
              <span className="sm:hidden">Edit</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="font-serif font-bold text-rose-300 text-sm">DLYS</span>
              <span className="text-stone-400 text-[11px] hidden sm:inline">• Surat Cinta Untuk {data.recipientName}</span>
            </div>
          )}

          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-medium text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Link Aktif & Bersih
          </span>
        </div>

        {/* Center: Viewport Switcher (Layar Penuh vs Frame HP) */}
        <div className="flex items-center bg-white/10 p-1 rounded-xl">
          <button
            onClick={() => setViewMode('immersive')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              viewMode === 'immersive'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Layar Penuh</span>
          </button>

          <button
            onClick={() => setViewMode('mobile-frame')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              viewMode === 'mobile-frame'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-stone-300 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Frame HP</span>
          </button>
        </div>

        {/* Right: QR Code Modal, Fullscreen API Toggle & Share Link */}
        <div className="flex items-center gap-2">
          {/* QR Code Card Modal Trigger */}
          <button
            onClick={() => setIsQrModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-950/80 hover:bg-rose-900/90 border border-rose-500/40 text-rose-200 text-xs font-medium transition-all shadow-xs cursor-pointer"
            title="Buka QR Code estetik siap cetak & kirim"
          >
            <QrCode className="w-3.5 h-3.5 text-rose-400" />
            <span className="hidden sm:inline">QR Code Cetak</span>
            <span className="sm:hidden">QR</span>
          </button>

          <button
            onClick={toggleBrowserFullscreen}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-stone-200 text-xs font-medium transition-colors cursor-pointer"
            title={isBrowserFullscreen ? 'Keluar Fullscreen Browser' : 'Layar Penuh Browser'}
          >
            {isBrowserFullscreen ? <Minimize className="w-3.5 h-3.5" /> : <Maximize className="w-3.5 h-3.5" />}
            <span>{isBrowserFullscreen ? 'Normal' : 'Fullscreen'}</span>
          </button>

          <button
            onClick={handleCopyLink}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-linear-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-semibold text-xs transition-all shadow-md cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Tersalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Salin Link</span>
              </>
            )}
          </button>

          {isDirectRecipientView && (
            <button
              onClick={onReturnToHome}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-rose-300 text-xs font-semibold cursor-pointer"
            >
              <span>Buat Sendiri</span>
              <Sparkles className="w-3 h-3 text-rose-400" />
            </button>
          )}
        </div>
      </header>

      {/* Main Canvas */}
      <main className="flex-1 flex flex-col items-center justify-start overflow-y-auto w-full">
        
        {/* MODE 1: IMMERSIVE TRUE FULLSCREEN (Layar Penuh Megah) */}
        {viewMode === 'immersive' ? (
          <div className={`w-full min-h-screen flex flex-col justify-between ${
            isCelestial
              ? 'bg-[#060913] text-[#F1F5F9]'
              : isPolaroid
              ? 'bg-[#FFF5F7] text-stone-800'
              : isVelvet
              ? 'bg-[#FCF8F7] text-[#281A1F]'
              : isCoupons
              ? 'bg-[#FFFDF8] text-[#2F2119]'
              : isChapterBook
              ? 'bg-[#221019] text-[#FDFBF7]'
              : 'bg-[#F7EFE2] text-[#2E1E17]'
          }`}>
            
            {/* Top Delicate Keepsake Bar */}
            <div className={`w-full py-3 px-6 flex items-center justify-between border-b text-xs font-serif ${
              isCelestial
                ? 'border-[#F8D376]/20 bg-[#0B1220] text-[#F8D376]'
                : isPolaroid
                ? 'border-rose-100 bg-rose-50/70 text-rose-800'
                : isVelvet
                ? 'border-rose-200/60 bg-rose-50/80 text-rose-900'
                : isCoupons
                ? 'border-orange-200/80 bg-orange-50/80 text-orange-900'
                : isChapterBook
                ? 'border-[#C89B3C]/40 bg-[#2A1620] text-[#E5C158]'
                : 'border-[#E2D2BD]/60 bg-[#F2E8D7] text-[#665040]'
            }`}>
              <span className="tracking-widest uppercase font-mono text-[10px]">
                DLYS SPECIAL KEEPSAKE • FOR {data.recipientName.toUpperCase()}
              </span>
              <span className={`font-handwriting text-base ${
                isCelestial
                  ? 'text-[#F8D376]'
                  : isPolaroid
                  ? 'text-[#E11D48]'
                  : isVelvet
                  ? 'text-[#9D174D]'
                  : isCoupons
                  ? 'text-[#EA580C]'
                  : isChapterBook
                  ? 'text-[#E5C158]'
                  : 'text-[#8E283B]'
              }`}>
                "Turn feelings into something you can share"
              </span>
            </div>

            {/* Theme Engine */}
            <div className="flex-1 py-8 sm:py-12 px-4 sm:px-6 w-full">
              {renderTheme()}
            </div>

            {/* Bottom Subtle Viral Loop Badge */}
            <div className={`py-4 px-6 border-t text-center flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-sans ${
              isCelestial
                ? 'border-white/10 bg-[#0B1220] text-stone-400'
                : isPolaroid
                ? 'border-rose-100 bg-rose-50/70 text-rose-700/80'
                : isVelvet
                ? 'border-rose-200/60 bg-rose-50/80 text-rose-800'
                : isCoupons
                ? 'border-orange-200/80 bg-orange-50/80 text-orange-800'
                : isChapterBook
                ? 'border-[#C89B3C]/30 bg-[#2A1620] text-stone-300'
                : 'border-[#DFD0BE] bg-[#EFE3CF] text-[#715E67]'
            }`}>
              <span>Made with love via <strong>DLYS</strong> (Dear Love, Yours)</span>
              <button
                onClick={onReturnToHome}
                className="text-rose-400 font-semibold hover:underline flex items-center gap-1.5 cursor-pointer"
              >
                <span>Ingin buatkan halaman romantis seperti ini untuk pasanganmu?</span>
                <Sparkles className="w-3.5 h-3.5 text-rose-400" />
              </button>
            </div>

          </div>
        ) : (
          /* MODE 2: MOBILE FRAME (Simulasi Ukuran Layar Smartphone) */
          <div className="p-4 sm:p-8 flex flex-col items-center justify-center my-auto w-full">
            <div className="w-full max-w-[400px] bg-stone-900 rounded-[48px] p-2.5 sm:p-3.5 shadow-2xl shadow-rose-950/40 border-4 border-stone-800">
              
              {/* Inner Phone Screen */}
              <div className={`relative rounded-[38px] overflow-hidden min-h-[640px] flex flex-col ${
                isCelestial
                  ? 'bg-[#060913]'
                  : isPolaroid
                  ? 'bg-[#FFF5F7]'
                  : isVelvet
                  ? 'bg-[#FCF8F7]'
                  : isCoupons
                  ? 'bg-[#FFFDF8]'
                  : isChapterBook
                  ? 'bg-[#221019]'
                  : 'bg-[#F7EFE2]'
              }`}>
                
                {/* Phone Top Status Bar */}
                <div className={`pt-3 px-6 pb-2 flex justify-between items-center text-[10px] font-semibold border-b z-20 ${
                  isCelestial
                    ? 'border-[#F8D376]/20 bg-[#0B1220] text-stone-300'
                    : isPolaroid
                    ? 'border-rose-100 bg-rose-50/70 text-rose-800'
                    : isVelvet
                    ? 'border-rose-200/60 bg-rose-50/80 text-rose-900'
                    : isCoupons
                    ? 'border-orange-200/80 bg-orange-50/80 text-orange-900'
                    : isChapterBook
                    ? 'border-[#C89B3C]/40 bg-[#2A1620] text-[#E5C158]'
                    : 'border-[#E2D2BD]/60 bg-[#F2E8D7] text-[#665040]'
                }`}>
                  <span className="font-mono">11:11</span>
                  <span className="flex items-center gap-1 font-mono tracking-wider">
                    <span>DLYS</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  </span>
                </div>

                {/* Theme Content */}
                <div className="flex-1 overflow-y-auto">
                  {renderTheme()}
                </div>

                {/* Bottom Bar */}
                <div className={`py-2.5 px-4 border-t text-center flex items-center justify-between text-[10px] z-20 ${
                  isCelestial
                    ? 'border-white/10 bg-[#0B1220] text-stone-400'
                    : isPolaroid
                    ? 'border-rose-100 bg-rose-50/70 text-rose-700/80'
                    : isVelvet
                    ? 'border-rose-200/60 bg-rose-50/80 text-rose-800'
                    : isCoupons
                    ? 'border-orange-200/80 bg-orange-50/80 text-orange-800'
                    : isChapterBook
                    ? 'border-[#C89B3C]/30 bg-[#2A1620] text-stone-300'
                    : 'border-[#DFD0BE] bg-[#EFE3CF] text-[#715E67]'
                }`}>
                  <span>Made with DLYS</span>
                  <button
                    onClick={onReturnToHome}
                    className="text-rose-400 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Buat untuk Pasanganmu</span>
                    <Sparkles className="w-3 h-3 text-rose-400" />
                  </button>
                </div>

              </div>
            </div>
          </div>
        )}

      </main>

      {/* QR Code Gift Card Modal */}
      <QrCardModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        data={data}
        shareableUrl={shareableUrl}
      />
    </div>
  );
};
