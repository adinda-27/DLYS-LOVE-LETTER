import { useState, useRef } from 'react';
import type { CustomizationData } from '../../types';
import {
  X,
  Copy,
  Check,
  Share2,
  Download,
  Printer,
  ExternalLink,
  Heart,
  QrCode,
  Sparkles,
} from 'lucide-react';

interface QrCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: CustomizationData;
  shareableUrl: string;
}

export const QrCardModal = ({
  isOpen,
  onClose,
  data,
  shareableUrl,
}: QrCardModalProps) => {
  const [copied, setCopied] = useState(false);
  const [isGeneratingDownload, setIsGeneratingDownload] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  if (!isOpen) return null;

  // High-res QR code URL with burgundy tint to match theme
  const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&margin=8&color=731D2F&bgcolor=FAF4EB&data=${encodeURIComponent(
    shareableUrl
  )}`;

  const handleCopy = () => {
    setCopied(true);
    navigator.clipboard?.writeText(shareableUrl);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleShareWhatsApp = () => {
    const text = `Halo sayangku ${data.recipientName}... ❤️%0A%0A` +
      `Aku buatkan sesuatu yang spesial dari lubuk hatiku untukmu. Coba buka surat ini dan dengarkan lagunya ya:%0A%0A` +
      `${encodeURIComponent(shareableUrl)}%0A%0A` +
      `— Dengan segenap cinta, ${data.senderName} 💌✨`;
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  // Generate downloadable printable PNG card via HTML5 canvas
  const handleDownloadCard = async () => {
    setIsGeneratingDownload(true);
    try {
      const canvas = canvasRef.current || document.createElement('canvas');
      canvas.width = 800;
      canvas.height = 1100;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // 1. Background Parchment Paper
      ctx.fillStyle = '#FAF4EB';
      ctx.fillRect(0, 0, 800, 1100);

      // 2. Decorative Outer Border
      ctx.strokeStyle = '#8E283B';
      ctx.lineWidth = 6;
      ctx.strokeRect(30, 30, 740, 1040);

      // 3. Inner Delicate Border
      ctx.strokeStyle = '#D9BF9F';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(42, 42, 716, 1016);

      // 4. Corner Ornaments
      const cornerSize = 24;
      ctx.strokeStyle = '#8E283B';
      ctx.lineWidth = 2;
      // Top-left
      ctx.strokeRect(48, 48, cornerSize, cornerSize);
      // Top-right
      ctx.strokeRect(800 - 48 - cornerSize, 48, cornerSize, cornerSize);
      // Bottom-left
      ctx.strokeRect(48, 1100 - 48 - cornerSize, cornerSize, cornerSize);
      // Bottom-right
      ctx.strokeRect(800 - 48 - cornerSize, 1100 - 48 - cornerSize, cornerSize, cornerSize);

      // 5. Header Header Text
      ctx.fillStyle = '#8E283B';
      ctx.font = 'bold 20px "Courier New", monospace';
      ctx.textAlign = 'center';
      ctx.letterSpacing = '4px';
      ctx.fillText('DLYS SPECIAL DELIVERY • SURAT CINTA', 400, 95);

      // 6. Ornamental Fleur
      ctx.fillStyle = '#731D2F';
      ctx.font = '24px serif';
      ctx.fillText('❦  ❧  ❦', 400, 130);

      // 7. Title & Recipient
      ctx.fillStyle = '#2A1810';
      ctx.font = 'bold 36px serif';
      ctx.fillText(`Khusus Untuk ${data.recipientName}`, 400, 190);

      ctx.fillStyle = '#785D4A';
      ctx.font = 'italic 22px serif';
      ctx.fillText(`dengan segenap rasa terdalam dari ${data.senderName}`, 400, 230);

      // 8. Divider line
      ctx.strokeStyle = '#E0CEB8';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(150, 260);
      ctx.lineTo(650, 260);
      ctx.stroke();

      // 9. Load and Draw QR Code Image
      const qrImg = new Image();
      qrImg.crossOrigin = 'anonymous';
      await new Promise<void>((resolve, reject) => {
        qrImg.onload = () => resolve();
        qrImg.onerror = () => reject();
        qrImg.src = qrApiUrl;
      });

      // QR Code Background Plaque
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(190, 300, 420, 420);
      ctx.strokeStyle = '#8E283B';
      ctx.lineWidth = 3;
      ctx.strokeRect(190, 300, 420, 420);

      // Draw QR Code
      ctx.drawImage(qrImg, 205, 315, 390, 390);

      // 10. Scan Instructions
      ctx.fillStyle = '#8E283B';
      ctx.font = 'bold 22px sans-serif';
      ctx.fillText('✨ Arahkan Kamera HP ke Sini ✨', 400, 770);

      ctx.fillStyle = '#5A4638';
      ctx.font = '16px sans-serif';
      ctx.fillText('Buka kamera dan scan QR di atas untuk membuka surat cinta,', 400, 810);
      ctx.fillText('foto kenangan, dan mendengarkan alunan musik spesialmu.', 400, 840);

      // 11. Song Note Badge
      ctx.fillStyle = '#F0E4D0';
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(180, 880, 440, 50, 12);
      } else {
        ctx.fillRect(180, 880, 440, 50);
      }
      ctx.fill();

      ctx.fillStyle = '#731D2F';
      ctx.font = 'bold 15px sans-serif';
      ctx.fillText(`🎵 Lagu Latar: ${data.song.title}`, 400, 912);

      // 12. Footer Branding
      ctx.fillStyle = '#8C7464';
      ctx.font = '13px "Courier New", monospace';
      ctx.fillText('DLYS (Dear Love, Yours) • https://dlys.love', 400, 990);
      ctx.font = 'italic 14px serif';
      ctx.fillText('"Turn feelings into something you can share"', 400, 1020);

      // Convert Canvas to Blob and Trigger Download
      canvas.toBlob((blob) => {
        if (!blob) return;
        const link = document.createElement('a');
        link.download = `DLYS-Kartu-QR-${data.recipientName.toLowerCase().replace(/\s+/g, '-')}.png`;
        link.href = URL.createObjectURL(blob);
        link.click();
        setIsGeneratingDownload(false);
      }, 'image/png');
    } catch (err) {
      console.error('Failed to generate printable QR card:', err);
      // Fallback: open raw QR code
      window.open(qrApiUrl, '_blank');
      setIsGeneratingDownload(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#FAF7F5] rounded-3xl border border-rose-200 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-4 bg-white border-b border-rose-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center">
              <QrCode className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-[#2A1820]">
                Kartu QR Code & Link Surat
              </h3>
              <p className="text-[11px] text-stone-500">
                Siap dikirim online atau dicetak untuk kado fisik
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-500 hover:text-stone-800 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Printable Card Preview Mockup */}
          <div className="p-6 rounded-2xl bg-[#FAF4EB] border-2 border-[#8E283B] shadow-md relative text-center font-serif text-[#2C1C15]">
            
            {/* Top Postmark Badge */}
            <div className="flex items-center justify-between text-[9px] font-mono tracking-widest text-[#8E7462] border-b border-[#E2D2BD] pb-2 mb-4">
              <span>DLYS SPECIAL DELIVERY</span>
              <span className="flex items-center gap-1">
                <Heart className="w-2.5 h-2.5 fill-current text-rose-700" />
                <span>KEEPSAKE</span>
              </span>
            </div>

            <h4 className="text-xl font-bold text-[#8E283B] mb-0.5">
              Untuk {data.recipientName}
            </h4>
            <p className="text-xs italic text-[#7A6150] mb-4">
              dari {data.senderName} dengan segenap cinta
            </p>

            {/* QR Code Center Image */}
            <div className="w-48 h-48 mx-auto bg-white p-2.5 rounded-xl border border-[#8E283B]/40 shadow-inner flex items-center justify-center mb-3">
              <img
                src={qrApiUrl}
                alt="QR Code Surat Cinta"
                className="w-full h-full object-contain"
                loading="eager"
              />
            </div>

            <p className="text-xs font-sans font-bold text-[#8E283B]">
              Arahkan kamera HP ke sini ✨
            </p>
            <p className="text-[10px] font-sans text-stone-500 mt-0.5">
              Scan untuk membuka surat cinta interaktif & lagu romantis
            </p>
          </div>

          {/* Quick Copy Link Box */}
          <div className="space-y-1.5 font-sans">
            <label className="block text-xs font-bold text-stone-700">
              Link Personal Siap Dibagikan:
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={shareableUrl}
                className="flex-1 px-3 py-2 text-xs rounded-xl bg-white border border-stone-200 text-stone-600 focus:outline-none select-all truncate font-mono"
              />
              <button
                onClick={handleCopy}
                className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  copied
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200'
                }`}
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Tersalin!' : 'Salin'}</span>
              </button>
            </div>
          </div>

          {/* Action Buttons Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-sans">
            {/* Share WhatsApp */}
            <button
              onClick={handleShareWhatsApp}
              className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Kirim via WhatsApp</span>
            </button>

            {/* Test Open Link */}
            <a
              href={shareableUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer text-center"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Buka & Tes Link</span>
            </a>

            {/* Download Printable Card */}
            <button
              onClick={handleDownloadCard}
              disabled={isGeneratingDownload}
              className="w-full py-3 px-4 rounded-xl bg-[#8E283B] hover:bg-[#771F30] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isGeneratingDownload ? 'Menyiapkan...' : 'Download Kartu Kado (PNG)'}</span>
            </button>

            {/* Print Card */}
            <button
              onClick={handlePrint}
              className="w-full py-3 px-4 rounded-xl bg-stone-800 hover:bg-stone-900 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Cetak Kartu (Print)</span>
            </button>
          </div>

          {/* Helpful Tip for Selling */}
          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 text-[11px] text-amber-900 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong>Tips Buat Pembeli:</strong> Kartu QR ini sangat cocok di-print di kertas foto/linen ukuran mini (misal 8x12 cm) untuk diselipkan ke dalam buket bunga, kotak cincin, atau kado ulang tahun!
            </div>
          </div>

        </div>

      </div>

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};
