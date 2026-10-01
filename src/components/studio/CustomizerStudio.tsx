import { useState, useRef } from 'react';
import type { CustomizationData, Template } from '../../types';
import { TEMPLATES_DATA } from '../../data/mockData';
import { ROMANTIC_SONGS, SAMPLE_ROMANTIC_PROMPTS } from '../../data/pricingData';
import { VintageParchmentTheme } from '../themes/VintageParchmentTheme';
import { CelestialStarlightTheme } from '../themes/CelestialStarlightTheme';
import { PolaroidBlushTheme } from '../themes/PolaroidBlushTheme';
import { VelvetEditorialTheme } from '../themes/VelvetEditorialTheme';
import { LoveCouponsTheme } from '../themes/LoveCouponsTheme';
import { ChapterBookTheme } from '../themes/ChapterBookTheme';
import { OurStoryRomanceNovelTheme } from '../themes/OurStoryRomanceNovelTheme';
import {
  Heart,
  Upload,
  Sparkles,
  ArrowLeft,
  Calendar,
  Image as ImageIcon,
  MessageSquareHeart,
  HelpCircle,
  Eye,
  Lock,
  Unlock,
  Music,
  ShoppingBag,
  Maximize2,
  Play,
  Pause,
  Volume2,
} from 'lucide-react';

interface CustomizerStudioProps {
  initialTemplate: Template;
  onOpenOrderModal: (data: CustomizationData, template: Template) => void;
  onBackToHome: () => void;
  onViewAsRecipient: (data: CustomizationData, template: Template) => void;
}

export const CustomizerStudio = ({
  initialTemplate,
  onOpenOrderModal,
  onBackToHome,
  onViewAsRecipient,
}: CustomizerStudioProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState<Template>(initialTemplate);
  const [data, setData] = useState<CustomizationData>({
    templateId: initialTemplate.id,
    recipientName: 'Maya',
    senderName: 'Julian',
    headline: 'Untuk orang yang membuat hari-hari biasa terasa seperti puisi',
    message: 'Dua tahun lalu kamu hadir di hidupku dan mengubah segalanya menjadi lebih tenang. Terima kasih sudah selalu ada, menemaniku tertawa, dan memegang tanganku saat dunia terasa bising. Aku mencintaimu, kemarin, hari ini, dan seterusnya.',
    specialDate: '2024-11-14',
    song: ROMANTIC_SONGS[0],
    photos: ['https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=600&auto=format&fit=crop'],
    questionPrompt: {
      question: 'Maukah kamu terus menemaniku sampai kita tua nanti?',
      acceptButton: 'Iya, mau banget! ❤️',
      secondButton: 'Pikir-pikir dulu...',
    },
    psNote: 'Coba cek saku jaketmu sebelum kita makan malam nanti ya ✨',
  });

  // Mobile viewport tab in studio (Edit vs Preview)
  const [studioView, setStudioView] = useState<'edit' | 'preview'>('edit');
  const [previewUnlockedState, setPreviewUnlockedState] = useState(false);

  // Photo upload handler (converts to base64 data URL without backend)
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setData((prev) => ({
            ...prev,
            photos: [reader.result as string, ...prev.photos.slice(1)],
          }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const [isPlayingStudioSong, setIsPlayingStudioSong] = useState(false);
  const studioAudioRef = useRef<HTMLAudioElement | null>(null);

  // Audio file upload handler (MP3/WAV/etc)
  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const cleanName = file.name.replace(/\.[^/.]+$/, '');
      const newSong = {
        title: cleanName,
        artist: 'Audio Upload Kamu',
        url: url,
      };
      setData((prev) => ({
        ...prev,
        song: newSong,
      }));
      if (studioAudioRef.current) {
        studioAudioRef.current.src = url;
        studioAudioRef.current.play().then(() => setIsPlayingStudioSong(true)).catch(() => {});
      }
    }
  };

  const toggleStudioSongPreview = () => {
    if (!studioAudioRef.current) return;
    if (isPlayingStudioSong) {
      studioAudioRef.current.pause();
      setIsPlayingStudioSong(false);
    } else {
      studioAudioRef.current.src = data.song.url || '/audio/golden-hour-piano.wav';
      studioAudioRef.current.play().then(() => setIsPlayingStudioSong(true)).catch(() => {});
    }
  };

  const handleApplyPrompt = (prompt: typeof SAMPLE_ROMANTIC_PROMPTS[0]) => {
    setData((prev) => ({
      ...prev,
      headline: prompt.headline,
      message: prompt.message,
      psNote: prompt.ps,
    }));
  };

  // Calculate days together
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

  return (
    <div className="min-h-screen bg-[#FAF7F5] flex flex-col text-[#2B1B21]">
      
      {/* Studio Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-rose-100 px-4 sm:px-6 py-3.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToHome}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-[#5E4C54] hover:bg-rose-50 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Kembali</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="font-serif text-xl font-bold text-[#2A1921]">DLYS Studio</span>
            <span className="text-xs text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full font-medium border border-rose-200/60 hidden md:inline">
              Template: {selectedTemplate.title}
            </span>
          </div>
        </div>

        {/* Studio View Tabs for Mobile */}
        <div className="flex lg:hidden bg-stone-100 p-1 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setStudioView('edit')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              studioView === 'edit' ? 'bg-white shadow-xs text-rose-700' : 'text-stone-500'
            }`}
          >
            Edit Teks & Foto
          </button>
          <button
            onClick={() => setStudioView('preview')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
              studioView === 'preview' ? 'bg-white shadow-xs text-rose-700' : 'text-stone-500'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Lihat Preview</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onViewAsRecipient(data, selectedTemplate)}
            className="flex items-center gap-1.5 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full bg-stone-900 hover:bg-black text-white font-medium text-xs sm:text-sm shadow-xs transition-all cursor-pointer hover:-translate-y-0.5"
            title="Buka tampilan layar penuh (fullscreen)"
          >
            <Maximize2 className="w-3.5 h-3.5 text-rose-300" />
            <span className="hidden sm:inline">Preview Layar Penuh</span>
            <span className="sm:hidden">Full Layar</span>
          </button>

          <button
            onClick={() => onOpenOrderModal(data, selectedTemplate)}
            className="flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-linear-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-semibold text-xs sm:text-sm shadow-md shadow-rose-600/25 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Aktifkan (Rp 39rb)</span>
          </button>
        </div>
      </header>

      {/* Main Studio Body: Split View */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: FORM PENGISI TEKS & FOTO */}
        <div className={`lg:col-span-6 space-y-6 ${studioView === 'preview' ? 'hidden lg:block' : 'block'}`}>
          
          {/* Header Info */}
          <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
                1. Pilih Template DLYS Team
              </span>
              <span className="text-[11px] text-stone-500">Layout terjaga rapi</span>
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              {TEMPLATES_DATA.slice(0, 4).map((tpl) => (
                <button
                  key={tpl.id}
                  onClick={() => {
                    setSelectedTemplate(tpl);
                    setData((prev) => ({ ...prev, templateId: tpl.id }));
                  }}
                  className={`p-2 rounded-2xl border text-left shrink-0 w-36 transition-all cursor-pointer ${
                    selectedTemplate.id === tpl.id
                      ? 'border-rose-600 bg-rose-50/60 ring-2 ring-rose-200'
                      : 'border-stone-200 bg-stone-50/50 hover:border-rose-200'
                  }`}
                >
                  <img
                    src={tpl.thumbnailUrl}
                    alt={tpl.title}
                    className="w-full h-16 rounded-xl object-cover mb-1.5"
                  />
                  <p className="text-[11px] font-bold text-[#2A1921] truncate">{tpl.title}</p>
                  <p className="text-[10px] text-rose-600 truncate">{tpl.mood}</p>
                </button>
              ))}
            </div>
          </div>

          {/* SECTION 2: IDENTITAS PASANGAN */}
          <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-xs space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#2A1921] flex items-center gap-2">
              <Heart className="w-4 h-4 text-rose-600" />
              <span>2. Nama & Tanggal Spesial</span>
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#4B3740] mb-1">
                  Nama Pasangan (Penerima)
                </label>
                <input
                  type="text"
                  value={data.recipientName}
                  onChange={(e) => setData({ ...data, recipientName: e.target.value })}
                  placeholder="e.g. Maya"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-rose-500 focus:outline-none text-sm bg-stone-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4B3740] mb-1">
                  Nama Kamu (Pengirim)
                </label>
                <input
                  type="text"
                  value={data.senderName}
                  onChange={(e) => setData({ ...data, senderName: e.target.value })}
                  placeholder="e.g. Julian"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-rose-500 focus:outline-none text-sm bg-stone-50/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#4B3740] mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-rose-600" />
                <span>Tanggal Jadian / Ulang Tahun</span>
              </label>
              <input
                type="date"
                value={data.specialDate}
                onChange={(e) => setData({ ...data, specialDate: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-rose-500 focus:outline-none text-sm bg-stone-50/50 font-mono"
              />
              <span className="text-[11px] text-rose-700 mt-1 block">
                ✨ Otomatis menghitung: <strong>{calculateDays()} hari</strong> kalian bersama di halaman pasangan!
              </span>
            </div>
          </div>

          {/* SECTION 3: FOTO KENANGAN POLAROID */}
          <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-[#2A1921] flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-rose-600" />
                <span>3. Foto Kenangan Berdua</span>
              </h3>
              <span className="text-[11px] text-stone-500">Muncul di frame polaroid</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-rose-200 shrink-0 shadow-xs">
                <img
                  src={data.photos[0]}
                  alt="Preview Foto"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 space-y-2">
                <label className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold border border-rose-200 cursor-pointer transition-colors">
                  <Upload className="w-4 h-4" />
                  <span>Upload Foto dari HP / Komputer</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </label>
                <p className="text-[11px] text-stone-500 leading-tight">
                  Bisa upload foto selfie berdua, momen liburan, atau kencan pertama.
                </p>
              </div>
            </div>
          </div>

          {/* SECTION 4: ISI SURAT & INSPIRASI CEPAT */}
          <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-[#2A1921] flex items-center gap-2">
                <MessageSquareHeart className="w-4 h-4 text-rose-600" />
                <span>4. Isi Surat & Kata Manis</span>
              </h3>
            </div>

            {/* Quick Inspiration Pills */}
            <div>
              <span className="text-[11px] font-bold text-stone-500 uppercase block mb-1.5">
                Butuh inspirasi kata-kata? Klik contoh ini:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {SAMPLE_ROMANTIC_PROMPTS.map((prompt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleApplyPrompt(prompt)}
                    className="text-xs px-3 py-1 rounded-full bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-800 transition-colors cursor-pointer"
                  >
                    ✨ {prompt.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#4B3740] mb-1">
                Judul Surat (Muncul di cover/headline)
              </label>
              <input
                type="text"
                value={data.headline}
                onChange={(e) => setData({ ...data, headline: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-rose-500 focus:outline-none text-sm bg-stone-50/50 font-serif"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#4B3740] mb-1">
                Isi Surat Cinta
              </label>
              <textarea
                rows={5}
                value={data.message}
                onChange={(e) => setData({ ...data, message: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-rose-500 focus:outline-none text-sm bg-stone-50/50 leading-relaxed font-sans"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#4B3740] mb-1">
                Catatan Rahasia (P.S. Note)
              </label>
              <input
                type="text"
                value={data.psNote || ''}
                onChange={(e) => setData({ ...data, psNote: e.target.value })}
                placeholder="P.S. ..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-rose-500 focus:outline-none text-sm bg-stone-50/50"
              />
            </div>
          </div>

          {/* SECTION 5: MUSIK LATAR & PERTANYAAN */}
          <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-lg font-bold text-[#2A1921] flex items-center gap-2">
                <Music className="w-4 h-4 text-rose-600" />
                <span>5. Pilihan Musik Latar</span>
              </h3>
              <span className="text-[11px] text-rose-600 font-semibold bg-rose-50 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Volume2 className="w-3 h-3" />
                <span>Real Audio</span>
              </span>
            </div>

            {/* Hidden Studio Test Audio Player */}
            <audio
              ref={studioAudioRef}
              src={data.song.url || '/audio/golden-hour-piano.wav'}
              onEnded={() => setIsPlayingStudioSong(false)}
              onPause={() => setIsPlayingStudioSong(false)}
              onPlay={() => setIsPlayingStudioSong(true)}
            />

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#4B3740] mb-1">
                  Pilih Lagu Romantis Pilihan DLYS Team:
                </label>
                <select
                  value={data.song.title}
                  onChange={(e) => {
                    const s = ROMANTIC_SONGS.find((item) => item.title === e.target.value);
                    if (s) {
                      setData({ ...data, song: s });
                      if (studioAudioRef.current && isPlayingStudioSong) {
                        studioAudioRef.current.src = s.url || '';
                        studioAudioRef.current.play().catch(() => {});
                      }
                    }
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-rose-500 focus:outline-none text-sm bg-stone-50/50"
                >
                  {ROMANTIC_SONGS.map((song, idx) => (
                    <option key={idx} value={song.title}>
                      🎵 {song.title} — {song.artist}
                    </option>
                  ))}
                  {data.song.artist === 'Audio Upload Kamu' && (
                    <option value={data.song.title}>
                      ✨ {data.song.title} (Upload Kamu)
                    </option>
                  )}
                </select>
              </div>

              {/* Quick Play & Custom Upload Controls */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={toggleStudioSongPreview}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 text-xs font-semibold transition-colors cursor-pointer"
                  title="Dengarkan langsung contoh lagunya"
                >
                  {isPlayingStudioSong ? (
                    <>
                      <Pause className="w-3.5 h-3.5" />
                      <span>Jeda Musik ({data.song.title.slice(0, 15)}...)</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Tes Dengar Lagu Ini</span>
                    </>
                  )}
                </button>

                <label className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 border border-stone-200 text-stone-700 text-xs font-medium transition-colors cursor-pointer">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload MP3 Sendiri</span>
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={handleAudioUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {data.song.artist === 'Audio Upload Kamu' && (
                <div className="text-[11px] text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1.5">
                  <span>✓ Lagu kustom terpasang: <strong>{data.song.title}</strong></span>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-rose-50">
              <label className="block text-xs font-bold text-[#4B3740] mb-1 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-rose-600" />
                <span>Pertanyaan / Kejutan Interaktif di Akhir</span>
              </label>
              <input
                type="text"
                value={data.questionPrompt.question}
                onChange={(e) =>
                  setData({
                    ...data,
                    questionPrompt: { ...data.questionPrompt, question: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-rose-500 focus:outline-none text-sm bg-stone-50/50 mb-2"
              />

              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={data.questionPrompt.acceptButton}
                  onChange={(e) =>
                    setData({
                      ...data,
                      questionPrompt: { ...data.questionPrompt, acceptButton: e.target.value },
                    })
                  }
                  placeholder="Tombol 1 (Misal: Mau! ❤️)"
                  className="px-3 py-2 rounded-lg border border-stone-200 text-xs bg-stone-50/50"
                />
                <input
                  type="text"
                  value={data.questionPrompt.secondButton}
                  onChange={(e) =>
                    setData({
                      ...data,
                      questionPrompt: { ...data.questionPrompt, secondButton: e.target.value },
                    })
                  }
                  placeholder="Tombol 2 (Misal: Pikir-pikir dulu...)"
                  className="px-3 py-2 rounded-lg border border-stone-200 text-xs bg-stone-50/50"
                />
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: STICKY LIVE PHONE PREVIEW WITH WATERMARK */}
        <div className={`lg:col-span-6 lg:sticky lg:top-24 flex flex-col items-center ${studioView === 'edit' ? 'hidden lg:flex' : 'flex'}`}>
          
          {/* Status Box & Fullscreen Action */}
          <div className="w-full max-w-[360px] mb-3 space-y-2">
            <button
              onClick={() => onViewAsRecipient(data, selectedTemplate)}
              className="w-full py-2.5 px-4 rounded-2xl bg-stone-900 hover:bg-black text-white text-xs font-semibold shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer hover:-translate-y-0.5"
            >
              <Maximize2 className="w-3.5 h-3.5 text-rose-300" />
              <span>Buka Preview Layar Penuh (Fullscreen) ↗</span>
            </button>

            <div className="bg-white p-3 rounded-2xl border border-rose-100 shadow-xs flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5">
                {!previewUnlockedState ? (
                  <>
                    <Lock className="w-4 h-4 text-amber-600" />
                    <span className="font-semibold text-amber-800">Preview (Ada Watermark)</span>
                  </>
                ) : (
                  <>
                    <Unlock className="w-4 h-4 text-emerald-600" />
                    <span className="font-semibold text-emerald-800">Unlocked (Setelah Bayar)</span>
                  </>
                )}
              </div>

              {/* Toggle to inspect difference */}
              <button
                onClick={() => setPreviewUnlockedState(!previewUnlockedState)}
                className="text-[11px] text-rose-600 hover:underline font-medium cursor-pointer"
              >
                {previewUnlockedState ? 'Kembali ke Preview' : 'Tes Mode Unlocked'}
              </button>
            </div>
          </div>

          {/* Virtual Smartphone Frame */}
          <div className="relative w-full max-w-[340px] sm:max-w-[360px] aspect-[9/18.5] bg-stone-900 rounded-[48px] p-3 shadow-2xl shadow-rose-950/20 border-4 border-stone-800">
            
            {/* Phone Notch */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-5 bg-stone-950 rounded-full z-30 flex items-center justify-center gap-2">
              <div className="w-10 h-1 bg-stone-800 rounded-full"></div>
              <div className="w-2.5 h-2.5 bg-stone-900 rounded-full border border-stone-700"></div>
            </div>

            {/* Screen Wrapper */}
            <div className="relative w-full h-full rounded-[38px] overflow-hidden flex flex-col bg-[#F7EFE2]">
              
              {/* Phone Status Bar */}
              <div className="pt-3 px-6 pb-1.5 flex justify-between items-center text-[10px] font-semibold opacity-75 border-b border-[#E2D2BD]/60 bg-[#F2E8D7] z-20">
                <span className="font-mono">11:11</span>
                {!previewUnlockedState ? (
                  <span className="text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full font-bold">
                    🔒 PREVIEW DRAFT
                  </span>
                ) : (
                  <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-bold">
                    🟢 LINK AKTIF
                  </span>
                )}
              </div>

              {/* Flagship Theme Render Engine */}
              <div className="flex-1 overflow-y-auto">
                {selectedTemplate.id === 'our-story-novel' ? (
                  <OurStoryRomanceNovelTheme
                    data={data}
                    isDraftPreview={!previewUnlockedState}
                    onActivateRequest={() => onOpenOrderModal(data, selectedTemplate)}
                  />
                ) : selectedTemplate.id === 'celestial-starlight' ? (
                  <CelestialStarlightTheme
                    data={data}
                    isDraftPreview={!previewUnlockedState}
                    onActivateRequest={() => onOpenOrderModal(data, selectedTemplate)}
                  />
                ) : selectedTemplate.id === 'polaroid-sunshine' ? (
                  <PolaroidBlushTheme
                    data={data}
                    isDraftPreview={!previewUnlockedState}
                    onActivateRequest={() => onOpenOrderModal(data, selectedTemplate)}
                  />
                ) : selectedTemplate.id === 'velvet-blossom' ? (
                  <VelvetEditorialTheme
                    data={data}
                    isDraftPreview={!previewUnlockedState}
                    onActivateRequest={() => onOpenOrderModal(data, selectedTemplate)}
                  />
                ) : selectedTemplate.id === 'love-coupons-vouchers' ? (
                  <LoveCouponsTheme
                    data={data}
                    isDraftPreview={!previewUnlockedState}
                    onActivateRequest={() => onOpenOrderModal(data, selectedTemplate)}
                  />
                ) : selectedTemplate.id === 'our-little-infinity' ? (
                  <ChapterBookTheme
                    data={data}
                    isDraftPreview={!previewUnlockedState}
                    onActivateRequest={() => onOpenOrderModal(data, selectedTemplate)}
                  />
                ) : (
                  <VintageParchmentTheme
                    data={data}
                    isDraftPreview={!previewUnlockedState}
                    onActivateRequest={() => onOpenOrderModal(data, selectedTemplate)}
                  />
                )}
              </div>

              {/* iPhone Home Indicator bar */}
              <div className="py-2 flex justify-center bg-[#F7EFE2] border-t border-[#E8DCCB] z-20">
                <div className="w-24 h-1 bg-stone-400/50 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Under Phone: Direct Action */}
          <div className="w-full max-w-[360px] mt-4 space-y-2">
            <button
              onClick={() => onOpenOrderModal(data, selectedTemplate)}
              className="w-full py-3.5 px-6 rounded-2xl bg-linear-to-r from-rose-600 via-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-semibold text-sm shadow-xl shadow-rose-600/30 hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-rose-200" />
              <span>Aktifkan Link & Hilangkan Watermark</span>
            </button>

            <button
              onClick={() => onViewAsRecipient(data, selectedTemplate)}
              className="w-full py-2.5 text-xs text-[#6A5660] hover:text-rose-700 font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Lihat Simulasi Layar Penuh Penerima</span>
            </button>

            <div className="p-2.5 rounded-xl bg-rose-50/70 border border-rose-100 text-[11px] text-[#7A5B67] text-center flex items-center justify-center gap-1.5">
              <span>🎁 Termasuk: <strong>Link Bersih Selamanya</strong> & <strong>Kartu QR Cetak</strong></span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
