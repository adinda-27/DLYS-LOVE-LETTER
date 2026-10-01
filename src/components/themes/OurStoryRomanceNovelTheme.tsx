import { useState, useRef, useEffect } from 'react';
import type { CustomizationData } from '../../types';
import { sounds } from '../../utils/soundEffects';
import {
  BookOpen,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Maximize2,
  Layers,
  FileText,
  Compass,
  MessageSquare,
  Heart,
  Check,
  Share2,
  Lock,
  GraduationCap,
  Building,
  Coffee,
  Users,
  Award,
  CircleDot
} from 'lucide-react';

interface OurStoryRomanceNovelThemeProps {
  data: CustomizationData;
  isDraftPreview?: boolean;
  onActivateRequest?: () => void;
  className?: string;
  initialMode?: 'board' | 'reader' | 'gallery';
}

export const OurStoryRomanceNovelTheme = ({
  data,
  isDraftPreview = false,
  onActivateRequest,
  className = '',
  initialMode = 'board',
}: OurStoryRomanceNovelThemeProps) => {
  // View mode: 'board' (Cohesive Presentation Board), 'reader' (Interactive Spread Reader), 'gallery' (All Pages Grid)
  const [viewMode, setViewMode] = useState<'board' | 'reader' | 'gallery'>(initialMode);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeSpreadIndex, setActiveSpreadIndex] = useState(1); // Default to Chapter 1 & First Chat spread
  const [activeSinglePage, setActiveSinglePage] = useState<number | null>(null);
  const [copiedNotification, setCopiedNotification] = useState(false);

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

  const toggleAudio = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!audioRef.current) return;
    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlayingAudio(true);
    }
  };

  const handleNextSpread = () => {
    sounds.playPaperRustle();
    setActiveSpreadIndex((prev) => (prev < spreads.length - 1 ? prev + 1 : prev));
  };

  const handlePrevSpread = () => {
    sounds.playPaperRustle();
    setActiveSpreadIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleSharePrototype = () => {
    setCopiedNotification(true);
    navigator.clipboard?.writeText(window.location.href);
    setTimeout(() => setCopiedNotification(false), 2200);
  };

  // Customizable tokens with defaults from user prompt
  const title = "OUR STORY";
  const subtitle = data.headline && data.headline !== 'Untuk orang yang membuat hari-hari biasa terasa seperti puisi'
    ? data.headline
    : "the little things that became us";
  const names = data.recipientName && data.senderName
    ? `${data.recipientName.toUpperCase()} & ${data.senderName.toUpperCase()}`
    : "ADINDA & MAS L";
  const dateFormatted = data.specialDate ? "03 OCTOBER" : "03 OCTOBER";
  const photoUrl = data.photos?.[0] || "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop";

  // Timeline nodes from prompt
  const timelineMilestones = [
    { title: "CAMPUS", desc: "Tempat awal pertemuan", icon: Building },
    { title: "FIRST CHAT", desc: "Cerita tentang biner", icon: MessageSquare },
    { title: "PKM", desc: "Satu tim dan ide", icon: Award },
    { title: "GETTING CLOSER", desc: "Mulai berbagi cerita", icon: Users },
    { title: "FIRST DATE", desc: "Cuma kamu dan aku", icon: Coffee },
    { title: "US", desc: "Ketika kita menjadi kita", icon: Heart },
    { title: "GRADUATION", desc: "Merayakan toga bersama", icon: GraduationCap },
    { title: "SAME DEPARTMENT", desc: "Melangkah ke dunia kerja", icon: Compass },
    { title: "TODAY", desc: "Dan masih tetap kamu", icon: CircleDot },
  ];

  // 10 Table of Contents entries from prompt
  const tableOfContents = [
    { num: "01", title: "Sebelum Kita", page: "07" },
    { num: "02", title: "Anak Laki-Laki Paling Pintar di Kelas", page: "15" },
    { num: "03", title: "Biner", page: "29" },
    { num: "04", title: "Ketua Tim", page: "41" },
    { num: "05", title: "Fans", page: "55" },
    { num: "06", title: "First Date", page: "67" },
    { num: "07", title: "Ketika Kita Menjadi Kita", page: "81" },
    { num: "08", title: "Little Things I Remember", page: "93" },
    { num: "09", title: "Dari Kampus ke Dunia Kerja", page: "109" },
    { num: "10", title: "Masih Kamu", page: "123" },
  ];

  // Memory items from prompt
  const memoryItems = [
    { num: "01", text: "You were once just the smartest boy in my class." },
    { num: "02", text: "Everything started with a story about biner." },
    { num: "03", text: "You became the first person who made me brave enough to start a conversation." },
    { num: "04", text: "Somehow, campus eventually became the place where our story began." },
    { num: "05", text: "And somehow, after all these years, it is still you." },
  ];

  // Paired spreads for the open-book center
  const spreads = [
    {
      id: "spread-0",
      label: "Title Page & Table of Contents",
      left: "title-page",
      right: "contents",
    },
    {
      id: "spread-1",
      label: "Chapter One & The First Chat",
      left: "chapter-one",
      right: "first-chat",
    },
    {
      id: "spread-2",
      label: "The First Date & Little Things I Remember",
      left: "first-date",
      right: "memories",
    },
    {
      id: "spread-3",
      label: "Relationship Timeline & Masih Kamu",
      left: "timeline",
      right: "final-page",
    },
  ];

  // Individual Page Component Renders
  const renderFrontCover = (isLarge = false) => (
    <div
      className={`relative rounded-xl overflow-hidden shadow-2xl transition-all duration-500 bg-[#0E1726] text-[#FAF8F5] flex flex-col justify-between border border-[#22304A] select-none ${
        isLarge ? 'w-full max-w-[340px] sm:max-w-[380px] aspect-[1/1.5] p-8 sm:p-10' : 'w-full aspect-[1/1.5] p-5'
      }`}
      style={{
        boxShadow: '0 25px 50px -12px rgba(10, 16, 28, 0.7), 0 0 0 1px rgba(197, 168, 128, 0.15)',
        backgroundImage: 'linear-gradient(145deg, rgba(255,255,255,0.03) 0%, transparent 60%), radial-gradient(circle at 50% 0%, rgba(30, 48, 80, 0.4) 0%, transparent 70%)',
      }}
    >
      {/* Book Spine Simulation & Left Shadow Crease */}
      <div className="absolute top-0 bottom-0 left-0 w-3 bg-linear-to-r from-black/60 via-black/20 to-transparent pointer-events-none" />
      <div className="absolute top-0 bottom-0 left-3 w-px bg-[#C5A880]/20 pointer-events-none" />

      {/* Top Cover Foil Header */}
      <div className="text-center relative z-10 space-y-1.5 pt-2">
        <p className="text-[10px] tracking-[0.3em] font-sans font-medium text-[#C5A880] uppercase">
          A NOVEL
        </p>
        <div className="w-8 h-px bg-[#C5A880]/40 mx-auto" />
      </div>

      {/* Centerpiece: Sophisticated Title & Minimal Artistic Horizon */}
      <div className="text-center relative z-10 my-auto space-y-5">
        <div className="space-y-1.5">
          <h1 className="font-serif text-3xl sm:text-4xl tracking-[0.18em] text-[#FAF8F5] uppercase font-normal leading-tight">
            {title}
          </h1>
          <p className="font-serif italic text-xs sm:text-sm text-[#C5A880]/90 tracking-wide">
            {subtitle}
          </p>
        </div>

        {/* Minimal Artistic Representation of Two People (Not cheesy, cinematic silhouette looking at horizon) */}
        <div className="py-2 flex justify-center">
          <div className="relative w-40 h-28 sm:w-48 sm:h-32 rounded-lg border border-[#C5A880]/25 p-2 flex items-center justify-center bg-[#131D30]/60 backdrop-blur-xs">
            <svg
              className="w-full h-full text-[#C5A880]"
              viewBox="0 0 200 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Quiet Night Sky & Subtle Horizon Line */}
              <line x1="15" y1="92" x2="185" y2="92" stroke="#C5A880" strokeWidth="0.75" strokeOpacity="0.5" />
              <line x1="20" y1="95" x2="180" y2="95" stroke="#C5A880" strokeWidth="0.4" strokeOpacity="0.25" />

              {/* Distant stars */}
              <circle cx="50" cy="28" r="0.75" fill="#FAF8F5" fillOpacity="0.8" />
              <circle cx="100" cy="18" r="1" fill="#FAF8F5" fillOpacity="0.9" />
              <circle cx="150" cy="32" r="0.75" fill="#FAF8F5" fillOpacity="0.7" />
              <circle cx="130" cy="45" r="0.5" fill="#FAF8F5" fillOpacity="0.6" />
              <circle cx="75" cy="40" r="0.5" fill="#FAF8F5" fillOpacity="0.6" />

              {/* Minimalist Two Figures Seen from Behind on quiet hill/bench */}
              <path
                d="M85 92 C85 82, 87 76, 91 74 C93 72, 95 72, 97 74 C99 76, 100 80, 101 92 Z"
                fill="#C5A880"
                fillOpacity="0.9"
              />
              <circle cx="94" cy="69" r="4.5" fill="#C5A880" fillOpacity="0.95" />

              <path
                d="M102 92 C102 83, 105 77, 108 75 C110 73, 113 73, 115 75 C118 78, 118 82, 119 92 Z"
                fill="#C5A880"
                fillOpacity="0.75"
              />
              <circle cx="111.5" cy="70" r="4" fill="#C5A880" fillOpacity="0.8" />

              {/* Subtle gentle leaning */}
              <path d="M98 76 Q103 76 105 78" stroke="#0E1726" strokeWidth="1" strokeLinecap="round" />
            </svg>
            <span className="absolute bottom-1 right-2 text-[8px] font-sans tracking-widest text-[#C5A880]/50 uppercase">
              FIG. 01
            </span>
          </div>
        </div>

        <div className="w-12 h-px bg-[#C5A880]/30 mx-auto" />
      </div>

      {/* Bottom Cover Metadata */}
      <div className="text-center relative z-10 space-y-1 pb-1">
        <p className="font-sans text-xs tracking-[0.25em] text-[#FAF8F5] font-semibold uppercase">
          {names}
        </p>
        <p className="font-mono text-[10px] tracking-[0.2em] text-[#C5A880]/70 uppercase">
          {dateFormatted}
        </p>
      </div>
    </div>
  );

  const renderTitlePage = (isCompact = false) => (
    <div
      className={`h-full bg-[#FAF8F5] text-[#1A202C] flex flex-col justify-between p-6 sm:p-10 select-none relative border border-[#E2DDD5]/70 ${
        isCompact ? 'text-xs' : ''
      }`}
      style={{
        backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.8) 0%, rgba(247,244,238,0.6) 100%)',
      }}
    >
      {/* Top Folio */}
      <div className="text-center">
        <span className="text-[9px] font-mono tracking-[0.25em] text-[#718096] uppercase">
          CONTEMPORARY ROMANCE
        </span>
      </div>

      {/* Generous Whitespace Interior Title */}
      <div className="text-center my-auto space-y-6 max-w-xs mx-auto">
        <div className="space-y-3">
          <h2 className="font-serif text-3xl sm:text-4xl tracking-[0.15em] uppercase text-[#0E1726] font-normal leading-tight">
            OUR STORY
          </h2>
          <div className="w-8 h-px bg-[#C5A880] mx-auto" />
          <p className="font-serif italic text-sm text-[#4A5568]">
            The little things that became us.
          </p>
        </div>

        <div className="pt-8 space-y-1.5">
          <p className="font-sans text-xs tracking-[0.25em] font-medium text-[#1A202C] uppercase">
            {names}
          </p>
          <p className="font-mono text-[10px] tracking-widest text-[#718096] uppercase">
            {dateFormatted}
          </p>
        </div>
      </div>

      {/* Imprint Footer */}
      <div className="text-center border-t border-[#E2DDD5]/60 pt-4">
        <p className="text-[9px] font-mono tracking-widest text-[#A0AEC0] uppercase">
          DLYS ATELIER • FIRST EDITION • JAKARTA
        </p>
      </div>
    </div>
  );

  const renderTableOfContents = () => (
    <div className="h-full bg-[#FAF8F5] text-[#1A202C] flex flex-col justify-between p-6 sm:p-10 select-none border border-[#E2DDD5]/70">
      {/* Running Header */}
      <div className="flex justify-between items-center text-[9px] font-mono tracking-widest text-[#718096] uppercase border-b border-[#E2DDD5]/50 pb-2">
        <span>OUR STORY</span>
        <span>CONTENTS</span>
      </div>

      {/* Contents Body */}
      <div className="my-auto space-y-5">
        <div className="text-center pb-2">
          <h3 className="font-serif text-xl sm:text-2xl tracking-[0.2em] uppercase text-[#0E1726] font-normal">
            CONTENTS
          </h3>
          <div className="w-6 h-px bg-[#C5A880] mx-auto mt-2" />
        </div>

        <div className="space-y-2 max-w-sm mx-auto text-xs sm:text-sm">
          {tableOfContents.map((item) => (
            <div
              key={item.num}
              className="flex items-baseline justify-between group hover:text-[#0E1726] transition-colors"
            >
              <div className="flex items-baseline gap-2.5">
                <span className="font-mono text-[10px] text-[#C5A880] font-medium">
                  {item.num}
                </span>
                <span className="font-serif text-[#2D3748] tracking-wide">
                  {item.title}
                </span>
              </div>
              <div className="flex-1 border-b border-dotted border-[#CBD5E0] mx-2 shrink-1 opacity-60" />
              <span className="font-mono text-[10px] text-[#718096] shrink-0">
                {item.page}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Page Folio Footer */}
      <div className="text-center pt-2">
        <span className="text-[10px] font-mono text-[#718096]">05</span>
      </div>
    </div>
  );

  const renderChapterOpener = () => (
    <div className="h-full bg-[#FAF8F5] text-[#1A202C] flex flex-col justify-between p-6 sm:p-10 select-none border border-[#E2DDD5]/70">
      {/* Running Header */}
      <div className="flex justify-between items-center text-[9px] font-mono tracking-widest text-[#718096] uppercase border-b border-[#E2DDD5]/50 pb-2">
        <span>CHAPTER ONE</span>
        <span>ADINDA & MAS L</span>
      </div>

      {/* Chapter Opener Content */}
      <div className="my-auto space-y-6 max-w-md mx-auto">
        <div className="space-y-2">
          <p className="text-[10px] font-mono tracking-[0.3em] text-[#C5A880] uppercase font-semibold">
            CHAPTER ONE
          </p>
          <h3 className="font-serif text-2xl sm:text-3xl text-[#0E1726] font-normal uppercase tracking-wider leading-tight">
            ANAK LAKI-LAKI<br />
            PALING PINTAR<br />
            DI KELAS
          </h3>
          <div className="w-10 h-0.5 bg-[#0E1726] mt-3" />
        </div>

        {/* Short Indonesian Romance Novel Paragraph */}
        <div className="pt-2 text-justify">
          <p className="font-serif text-sm sm:text-base text-[#2D3748] leading-relaxed tracking-normal indent-6">
            <span className="float-left text-4xl sm:text-5xl font-serif text-[#0E1726] leading-none pr-2 pt-1 font-normal">
              A
            </span>
            ku masih ingat bagaimana dulu aku melihatmu. Saat itu, kamu hanyalah anak laki-laki paling pintar di kelas. Seseorang yang terasa cukup jauh untuk sekadar kusapa, apalagi kubayangkan akan menjadi bagian penting dari hidupku.
          </p>
          <p className="font-serif text-xs sm:text-sm text-[#4A5568] leading-relaxed mt-4 italic">
            Kamu duduk di barisan depan dengan catatan yang selalu rapi, sementara aku memperhatikamu dari kejauhan, tak pernah menduga bahwa semesta sedang merencanakan babak yang jauh lebih panjang dari sekadar ruang kuliah.
          </p>
        </div>
      </div>

      {/* Page Folio Footer */}
      <div className="text-center pt-2">
        <span className="text-[10px] font-mono text-[#718096]">15</span>
      </div>
    </div>
  );

  const renderFirstChat = () => (
    <div className="h-full bg-[#FAF8F5] text-[#1A202C] flex flex-col justify-between p-6 sm:p-10 select-none border border-[#E2DDD5]/70">
      {/* Running Header */}
      <div className="flex justify-between items-center text-[9px] font-mono tracking-widest text-[#718096] uppercase border-b border-[#E2DDD5]/50 pb-2">
        <span>INTERLUDE</span>
        <span>THE FIRST CHAT</span>
      </div>

      {/* First Chat Section */}
      <div className="my-auto space-y-5 max-w-sm mx-auto w-full">
        <div className="text-center space-y-1">
          <p className="text-[10px] font-mono tracking-[0.25em] text-[#C5A880] uppercase font-semibold">
            THE FIRST CHAT
          </p>
          <p className="font-serif italic text-xs sm:text-sm text-[#4A5568]">
            “The conversation that started everything.”
          </p>
          <div className="w-8 h-px bg-[#C5A880]/50 mx-auto mt-2" />
        </div>

        {/* Minimal Stylized Chat Recreation (Editorial, NOT a tacky phone screenshot) */}
        <div className="rounded-xl border border-[#E2DDD5] bg-[#F4EFEA]/80 p-4 space-y-3.5 shadow-2xs">
          <div className="flex items-center justify-between border-b border-[#E2DDD5]/60 pb-2 text-[10px] font-mono text-[#718096]">
            <span>STORY REPLY • 18:42</span>
            <span className="text-[#C5A880] font-medium">TOPIC: BINER</span>
          </div>

          {/* Story contextual card */}
          <div className="p-2 rounded bg-white/70 border border-[#E2DDD5]/70 text-[10px] font-mono text-[#4A5568]">
            <span className="text-[#718096] block text-[9px]">Replying to Mas L’s story:</span>
            <span className="text-[#0E1726] font-semibold">“01100010 01101001 01101110 01100101 01110010...”</span>
          </div>

          {/* Message Bubble 1 (Adinda) */}
          <div className="flex justify-end">
            <div className="bg-[#0E1726] text-[#FAF8F5] rounded-2xl rounded-tr-xs px-3.5 py-2 max-w-[85%] text-xs font-sans shadow-2xs leading-relaxed">
              <p>Seriusan ini kamu yang bikin soalnya? haha</p>
              <span className="block text-[9px] text-[#A0AEC0] text-right mt-0.5">18:43</span>
            </div>
          </div>

          {/* Message Bubble 2 (Mas L) */}
          <div className="flex justify-start">
            <div className="bg-white text-[#1A202C] border border-[#E2DDD5] rounded-2xl rounded-tl-xs px-3.5 py-2 max-w-[85%] text-xs font-sans shadow-2xs leading-relaxed">
              <p>Haha iya, cuma iseng aja kok. Tapi kamu ngerti artinya ya?</p>
              <span className="block text-[9px] text-[#718096] mt-0.5">18:45</span>
            </div>
          </div>

          {/* Message Bubble 3 (Adinda) */}
          <div className="flex justify-end">
            <div className="bg-[#0E1726] text-[#FAF8F5] rounded-2xl rounded-tr-xs px-3.5 py-2 max-w-[85%] text-xs font-sans shadow-2xs leading-relaxed">
              <p>Dikit-dikit nebak... tapi penasaran kenapa milih biner sih?</p>
              <span className="block text-[9px] text-[#A0AEC0] text-right mt-0.5">18:46</span>
            </div>
          </div>

          {/* Message Bubble 4 (Mas L) */}
          <div className="flex justify-start">
            <div className="bg-white text-[#1A202C] border border-[#E2DDD5] rounded-2xl rounded-tl-xs px-3.5 py-2 max-w-[85%] text-xs font-sans shadow-2xs leading-relaxed">
              <p className="italic">“Karena bahasa paling jujur itu cuma 0 dan 1. Nggak ada abu-abu. Kayak kalau ditanya siapa yang paling pengen kuajak ngobrol sore ini.”</p>
              <span className="block text-[9px] text-[#718096] mt-0.5">18:48</span>
            </div>
          </div>
        </div>

        {/* Subtle Editorial Narrative */}
        <p className="text-[11px] font-serif italic text-center text-[#4A5568]">
          Dan dari deretan angka biner itulah, dinding pemisah antara dua orang asing perlahan runtuh.
        </p>
      </div>

      {/* Page Folio Footer */}
      <div className="text-center pt-2">
        <span className="text-[10px] font-mono text-[#718096]">31</span>
      </div>
    </div>
  );

  const renderFirstDate = () => (
    <div className="h-full bg-[#FAF8F5] text-[#1A202C] flex flex-col justify-between p-6 sm:p-10 select-none border border-[#E2DDD5]/70">
      {/* Running Header */}
      <div className="flex justify-between items-center text-[9px] font-mono tracking-widest text-[#718096] uppercase border-b border-[#E2DDD5]/50 pb-2">
        <span>MEMOIR</span>
        <span>FIRST DATE</span>
      </div>

      {/* Full-Page Photo Area & Story Caption */}
      <div className="my-auto space-y-4 max-w-sm mx-auto w-full">
        {/* Archival Tasteful Photo Frame */}
        <div className="relative rounded-lg overflow-hidden bg-[#E2DDD5]/40 p-2.5 border border-[#D3CCC0] shadow-sm">
          <div className="relative aspect-[4/3] rounded overflow-hidden bg-[#1A202C]/5 flex items-center justify-center">
            <img
              src={photoUrl}
              alt="The First Date Plate"
              className="w-full h-full object-cover filter contrast-[1.03] saturate-[0.85]"
            />
            {/* Minimalist gallery corner marks */}
            <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-white/60 pointer-events-none" />
            <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-white/60 pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-white/60 pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-white/60 pointer-events-none" />
          </div>

          <div className="flex justify-between items-center px-1 pt-2 text-[9px] font-mono text-[#718096] uppercase">
            <span>PLATE 06 • ARCHIVE</span>
            <span>OCTOBER ARCHIVE</span>
          </div>
        </div>

        {/* Caption */}
        <div className="space-y-1.5 pt-1 text-center">
          <h4 className="font-serif text-lg tracking-[0.15em] text-[#0E1726] uppercase font-normal">
            THE FIRST DATE
          </h4>
          <p className="font-serif italic text-xs text-[#C5A880]">
            “The first time it was just you and me.”
          </p>
        </div>

        {/* Small story paragraph area */}
        <p className="font-serif text-xs sm:text-sm text-[#2D3748] leading-relaxed text-justify px-2">
          Secangkir kopi yang hampir mendingin, obrolan canggung yang perlahan berubah menjadi tawa tanpa henti, dan perasaan aneh bahwa sore itu tidak boleh cepat berakhir. Hari pertama di mana dunia hanya menyisakan kita berdua.
        </p>
      </div>

      {/* Page Folio Footer */}
      <div className="text-center pt-2">
        <span className="text-[10px] font-mono text-[#718096]">67</span>
      </div>
    </div>
  );

  const renderMemoryPage = () => (
    <div
      className="h-full bg-[#131D30] text-[#FAF8F5] flex flex-col justify-between p-6 sm:p-10 select-none border border-[#22304A] relative overflow-hidden"
      style={{
        backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(30, 48, 80, 0.4) 0%, transparent 60%)',
      }}
    >
      {/* Running Header */}
      <div className="flex justify-between items-center text-[9px] font-mono tracking-widest text-[#C5A880] uppercase border-b border-[#22304A] pb-2">
        <span>INTERLUDE</span>
        <span>MEMORABILIA</span>
      </div>

      {/* Memories Content */}
      <div className="my-auto space-y-5 max-w-sm mx-auto w-full">
        <div className="text-center space-y-1 pb-1">
          <p className="text-[9px] font-mono tracking-[0.3em] text-[#C5A880] uppercase">
            COLLECTED FRAGMENTS
          </p>
          <h3 className="font-serif text-xl sm:text-2xl text-[#FAF8F5] uppercase tracking-wider font-normal">
            LITTLE THINGS I REMEMBER
          </h3>
          <div className="w-8 h-px bg-[#C5A880] mx-auto mt-2" />
        </div>

        <div className="space-y-3.5">
          {memoryItems.map((mem) => (
            <div
              key={mem.num}
              className="flex items-start gap-3.5 p-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-[#C5A880]/40 transition-colors"
            >
              <span className="font-mono text-xs text-[#C5A880] font-semibold shrink-0 pt-0.5">
                {mem.num}
              </span>
              <p className="font-serif text-xs sm:text-sm text-[#E2E8F0] leading-relaxed">
                {mem.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Page Folio Footer */}
      <div className="text-center pt-2">
        <span className="text-[10px] font-mono text-[#C5A880]">93</span>
      </div>
    </div>
  );

  const renderTimeline = () => (
    <div className="h-full bg-[#FAF8F5] text-[#1A202C] flex flex-col justify-between p-6 sm:p-10 select-none border border-[#E2DDD5]/70">
      {/* Running Header */}
      <div className="flex justify-between items-center text-[9px] font-mono tracking-widest text-[#718096] uppercase border-b border-[#E2DDD5]/50 pb-2">
        <span>CHRONOLOGY</span>
        <span>OUR MILESTONES</span>
      </div>

      {/* Horizontal Relationship Timeline */}
      <div className="my-auto space-y-6 max-w-md mx-auto w-full">
        <div className="text-center space-y-1">
          <p className="text-[10px] font-mono tracking-[0.25em] text-[#C5A880] uppercase font-semibold">
            RELATIONSHIP JOURNEY
          </p>
          <h3 className="font-serif text-xl sm:text-2xl text-[#0E1726] tracking-wider uppercase font-normal">
            THE TIMELINE
          </h3>
          <p className="font-serif italic text-xs text-[#4A5568]">
            From a lecture room in campus to everywhere we are today.
          </p>
          <div className="w-8 h-px bg-[#C5A880] mx-auto mt-2" />
        </div>

        {/* Clean, sophisticated horizontal roadmap with small elegant icons */}
        <div className="relative py-2">
          {/* Subtle guide line */}
          <div className="hidden sm:block absolute top-7 left-4 right-4 h-px bg-[#C5A880]/30 z-0" />

          <div className="grid grid-cols-3 sm:grid-cols-3 gap-3 sm:gap-2 relative z-10">
            {timelineMilestones.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center p-2 rounded-lg bg-white/70 border border-[#E2DDD5] shadow-2xs hover:border-[#C5A880] transition-colors"
                >
                  <div className="w-7 h-7 rounded-full bg-[#0E1726] text-[#C5A880] flex items-center justify-center mb-1.5 shadow-2xs shrink-0">
                    <IconComp className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-mono text-[9px] font-bold text-[#0E1726] tracking-wider uppercase">
                    {item.title}
                  </span>
                  <span className="text-[9px] font-serif text-[#718096] leading-tight line-clamp-1 mt-0.5">
                    {item.desc}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <p className="text-[11px] font-serif italic text-center text-[#718096]">
          Setiap fase membawa kita selangkah lebih dekat ke rumah yang sejati.
        </p>
      </div>

      {/* Page Folio Footer */}
      <div className="text-center pt-2">
        <span className="text-[10px] font-mono text-[#718096]">109</span>
      </div>
    </div>
  );

  const renderFinalPage = () => (
    <div
      className="h-full bg-[#FAF8F5] text-[#1A202C] flex flex-col justify-between p-6 sm:p-12 select-none border border-[#E2DDD5]/70"
      style={{
        backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.9) 0%, rgba(247,244,238,0.7) 100%)',
      }}
    >
      {/* Running Header */}
      <div className="flex justify-between items-center text-[9px] font-mono tracking-widest text-[#718096] uppercase border-b border-[#E2DDD5]/50 pb-2">
        <span>EPILOGUE</span>
        <span>FINIS</span>
      </div>

      {/* Generous Whitespace Final Message */}
      <div className="my-auto space-y-8 text-center max-w-sm mx-auto">
        <div className="space-y-3">
          <h3 className="font-serif text-2xl sm:text-3xl text-[#0E1726] font-normal tracking-[0.2em] uppercase">
            MASIH KAMU
          </h3>
          <div className="w-10 h-px bg-[#C5A880] mx-auto" />
        </div>

        <div className="space-y-4">
          <p className="font-serif text-sm sm:text-base text-[#2D3748] leading-relaxed italic">
            “Some stories begin with a single conversation.<br />
            Ours began with a story about biner.
          </p>
          <p className="font-serif text-sm sm:text-base text-[#2D3748] leading-relaxed italic">
            And somehow, that little conversation became all of this.”
          </p>
        </div>

        <div className="w-6 h-px bg-[#C5A880]/40 mx-auto" />
      </div>

      {/* Bottom Dedication */}
      <div className="text-center space-y-1.5 border-t border-[#E2DDD5]/60 pt-4">
        <p className="font-sans text-xs tracking-[0.3em] font-semibold text-[#0E1726] uppercase">
          {names.replace('&', '×')}
        </p>
        <p className="font-mono text-[10px] tracking-[0.2em] text-[#718096] uppercase">
          {dateFormatted}
        </p>
      </div>
    </div>
  );

  const getPageRenderById = (id: string, isCompact = false) => {
    switch (id) {
      case 'front-cover':
        return renderFrontCover(isCompact);
      case 'title-page':
        return renderTitlePage(isCompact);
      case 'contents':
        return renderTableOfContents();
      case 'chapter-one':
        return renderChapterOpener();
      case 'first-chat':
        return renderFirstChat();
      case 'first-date':
        return renderFirstDate();
      case 'memories':
        return renderMemoryPage();
      case 'timeline':
        return renderTimeline();
      case 'final-page':
        return renderFinalPage();
      default:
        return renderTitlePage();
    }
  };

  const allPageCards = [
    { id: 'front-cover', label: 'Front Cover Mockup', tag: 'Hardcover Navy' },
    { id: 'title-page', label: 'Title Page', tag: 'Page 03' },
    { id: 'contents', label: 'Table of Contents', tag: 'Page 05' },
    { id: 'chapter-one', label: 'Chapter One Opener', tag: 'Page 15' },
    { id: 'first-chat', label: 'The First Chat (Biner)', tag: 'Page 31' },
    { id: 'first-date', label: 'The First Date Plate', tag: 'Page 67' },
    { id: 'memories', label: 'Little Things I Remember', tag: 'Page 93' },
    { id: 'timeline', label: 'Horizontal Timeline', tag: 'Page 109' },
    { id: 'final-page', label: 'Final Page (Masih Kamu)', tag: 'Page 123' },
  ];

  return (
    <div className={`relative w-full min-h-screen bg-[#0B111E] text-[#E2E8F0] selection:bg-[#C5A880]/30 selection:text-white font-sans ${className}`}>
      <audio ref={audioRef} src={audioSrc} loop preload="auto" />

      {/* Draft Preview Watermark if needed */}
      {isDraftPreview && (
        <div className="sticky top-0 z-50 bg-[#162238] border-b border-[#C5A880]/30 text-white px-4 py-2.5 flex items-center justify-between text-xs backdrop-blur-md">
          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-[#C5A880]" />
            <span className="font-mono uppercase text-[11px] tracking-wider text-[#C5A880]">
              DLYS EDITORIAL • COMMERCIAL NOVEL PROTOTYPE
            </span>
          </div>
          {onActivateRequest && (
            <button
              onClick={onActivateRequest}
              className="bg-[#C5A880] hover:bg-[#D4AF37] text-[#0E1726] px-3.5 py-1 rounded-full font-semibold text-xs transition-colors cursor-pointer"
            >
              Order Personalized Book
            </button>
          )}
        </div>
      )}

      {/* Top Editorial Navigation & Mode Bar */}
      <header className="sticky top-0 z-40 bg-[#0E1726]/90 backdrop-blur-md border-b border-[#22304A] px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Left: Branding & Subtitle */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#C5A880]/15 border border-[#C5A880]/40 flex items-center justify-center text-[#C5A880]">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-sm font-semibold tracking-wider text-[#FAF8F5]">
                OUR STORY
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#C5A880]/20 text-[#C5A880] font-semibold border border-[#C5A880]/30">
                PROTOTYPE BOARD
              </span>
            </div>
            <p className="text-[11px] text-[#94A3B8] font-sans">
              A Personalized Romance Novel by DLYS Atelier • {names}
            </p>
          </div>
        </div>

        {/* Center: View Switcher Tabs */}
        <div className="flex items-center bg-[#131D30] p-1 rounded-xl border border-[#22304A]">
          <button
            onClick={() => setViewMode('board')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              viewMode === 'board'
                ? 'bg-[#C5A880] text-[#0E1726] font-semibold shadow-xs'
                : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Presentation Board</span>
          </button>

          <button
            onClick={() => setViewMode('reader')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              viewMode === 'reader'
                ? 'bg-[#C5A880] text-[#0E1726] font-semibold shadow-xs'
                : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Open-Book Reader</span>
          </button>

          <button
            onClick={() => setViewMode('gallery')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
              viewMode === 'gallery'
                ? 'bg-[#C5A880] text-[#0E1726] font-semibold shadow-xs'
                : 'text-[#94A3B8] hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>All Pages ({allPageCards.length})</span>
          </button>
        </div>

        {/* Right: Audio Ambient Player & Share */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleAudio}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs transition-colors cursor-pointer ${
              isPlayingAudio
                ? 'bg-[#C5A880]/20 text-[#C5A880] border-[#C5A880]/50'
                : 'bg-[#131D30] text-[#94A3B8] border-[#22304A] hover:text-white'
            }`}
            title={isPlayingAudio ? 'Mute ambient piano' : 'Play ambient piano'}
          >
            {isPlayingAudio ? <Volume2 className="w-3.5 h-3.5 text-[#C5A880]" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">Piano Ambience</span>
          </button>

          <button
            onClick={handleSharePrototype}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#131D30] text-[#94A3B8] hover:text-white border border-[#22304A] text-xs transition-colors cursor-pointer"
          >
            {copiedNotification ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copiedNotification ? 'Copied' : 'Share'}</span>
          </button>
        </div>
      </header>

      {/* ============================================================== */}
      {/* VIEW 1: ONE COHESIVE PRESENTATION BOARD (PRIMARY SPECIFICATION) */}
      {/* ============================================================== */}
      {viewMode === 'board' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12">
          
          {/* Board Curator Statement */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#162238] border border-[#C5A880]/30 text-[#C5A880] text-xs font-mono tracking-widest uppercase">
              <Sparkles className="w-3 h-3" />
              <span>COMMERCIAL DIGITAL BOOK PROTOTYPE</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#FAF8F5] tracking-wide font-normal">
              OUR STORY
            </h2>
            <p className="font-serif italic text-base sm:text-lg text-[#C5A880]/90">
              “the little things that became us”
            </p>
            <p className="text-xs sm:text-sm text-[#94A3B8] max-w-xl mx-auto leading-relaxed">
              A contemporary romance novel prototype crafted with high-end publishing aesthetics, minimalist silhouettes, editorial typography, and generous whitespace.
            </p>
          </div>

          {/* MAIN PRESENTATION STAGE: FRONT COVER + OPEN-BOOK SPREAD */}
          <div className="grid lg:grid-cols-12 gap-8 items-center bg-[#0E1726]/60 p-6 sm:p-10 rounded-3xl border border-[#22304A] shadow-2xl relative overflow-hidden">
            
            {/* Subtle background luxury accents */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#C5A880]/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#162238]/60 rounded-full blur-3xl pointer-events-none" />

            {/* 1. THE FRONT COVER (Item 1 requested) */}
            <div className="lg:col-span-4 flex flex-col items-center justify-center space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[#C5A880] uppercase tracking-widest">
                <span>01 • THE FRONT COVER</span>
              </div>
              
              {/* Cover Card with 3D Depth */}
              <div className="w-full flex justify-center transform hover:scale-[1.02] transition-transform duration-300">
                {renderFrontCover(true)}
              </div>

              <div className="text-center pt-2">
                <p className="text-xs font-serif text-[#CBD5E1]">Hardcover Clothbound Navy Blue</p>
                <p className="text-[10px] font-mono text-[#64748B]">Matte Gold Foil Debossing • Octavo Trim</p>
              </div>
            </div>

            {/* 2. THE OPEN-BOOK INTERIOR SPREAD (Item 2 requested) */}
            <div className="lg:col-span-8 flex flex-col items-center justify-center space-y-4">
              <div className="w-full flex items-center justify-between text-xs font-mono text-[#C5A880]">
                <span className="uppercase tracking-widest">02 • OPEN-BOOK INTERIOR SPREAD</span>
                
                {/* Quick spread selector */}
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] text-[#94A3B8] hidden sm:inline">Active Spread:</span>
                  <select
                    value={activeSpreadIndex}
                    onChange={(e) => {
                      sounds.playPaperRustle();
                      setActiveSpreadIndex(Number(e.target.value));
                    }}
                    className="bg-[#131D30] text-[#FAF8F5] border border-[#22304A] rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-[#C5A880]"
                  >
                    {spreads.map((sp, idx) => (
                      <option key={sp.id} value={idx}>
                        Spread {idx + 1}: {sp.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Realistic Open Book Mockup Canvas */}
              <div className="w-full relative rounded-2xl p-2 sm:p-4 bg-[#080D17] border border-[#22304A] shadow-inner">
                {/* Realistic Book Gutter Spine & Dual Page Canvas */}
                <div
                  className="relative w-full rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[460px] sm:min-h-[520px] bg-[#FAF8F5]"
                  style={{
                    boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(226, 221, 213, 0.5)',
                  }}
                >
                  {/* Left Page */}
                  <div className="flex-1 relative border-r border-[#E2DDD5]/60">
                    {/* Page Curl / Inset Spine Shadow on the right */}
                    <div className="absolute top-0 bottom-0 right-0 w-8 bg-linear-to-l from-black/10 via-black/3 to-transparent pointer-events-none z-10" />
                    {getPageRenderById(spreads[activeSpreadIndex].left)}
                  </div>

                  {/* Central Spine Binding Crease */}
                  <div className="hidden md:block w-px bg-[#CBD5E1] relative z-20">
                    <div className="absolute top-0 bottom-0 -left-1 w-2 bg-linear-to-r from-black/15 via-black/5 to-black/15 pointer-events-none" />
                  </div>

                  {/* Right Page */}
                  <div className="flex-1 relative">
                    {/* Page Curl / Inset Spine Shadow on the left */}
                    <div className="absolute top-0 bottom-0 left-0 w-8 bg-linear-to-r from-black/10 via-black/3 to-transparent pointer-events-none z-10" />
                    {getPageRenderById(spreads[activeSpreadIndex].right)}
                  </div>

                  {/* Bookmark Ribbon Hanging Down in Center */}
                  <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-4 h-48 bg-[#C5A880] shadow-md z-30 pointer-events-none rounded-b-xs border-x border-[#A38257]" />
                </div>

                {/* Spread Navigation Controls */}
                <div className="flex items-center justify-between mt-3 px-2 text-xs">
                  <button
                    onClick={handlePrevSpread}
                    disabled={activeSpreadIndex === 0}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#131D30] hover:bg-[#1A2740] disabled:opacity-30 disabled:cursor-not-allowed text-[#CBD5E1] border border-[#22304A] transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span>Previous Spread</span>
                  </button>

                  <span className="font-mono text-[11px] text-[#94A3B8]">
                    Spread {activeSpreadIndex + 1} of {spreads.length} • {spreads[activeSpreadIndex].label}
                  </span>

                  <button
                    onClick={handleNextSpread}
                    disabled={activeSpreadIndex === spreads.length - 1}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#131D30] hover:bg-[#1A2740] disabled:opacity-30 disabled:cursor-not-allowed text-[#CBD5E1] border border-[#22304A] transition-colors cursor-pointer"
                  >
                    <span>Next Spread</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* ============================================================== */}
          {/* 3. SEVERAL INTERIOR PAGE DESIGNS VISIBLE AROUND THE SPREAD      */}
          {/* ============================================================== */}
          <div className="space-y-6 pt-4">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#22304A] pb-4">
              <div>
                <p className="text-xs font-mono text-[#C5A880] uppercase tracking-widest">
                  03 • INTERIOR PAGE ARCHITECTURE
                </p>
                <h3 className="font-serif text-2xl text-[#FAF8F5] tracking-wide font-normal">
                  Curated Interior Pages Gallery
                </h3>
              </div>
              <p className="text-xs text-[#94A3B8] font-sans">
                Click any page to preview in full resolution or load into the center spread.
              </p>
            </div>

            {/* Gallery Grid of Surrounding Interior Pages */}
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {allPageCards.map((card, idx) => (
                <div
                  key={card.id}
                  onClick={() => {
                    sounds.playPaperRustle();
                    setActiveSinglePage(idx);
                  }}
                  className="group relative flex flex-col rounded-2xl bg-[#0E1726] border border-[#22304A] hover:border-[#C5A880]/60 p-3 shadow-lg hover:shadow-2xl hover:shadow-[#C5A880]/10 transition-all duration-300 cursor-pointer"
                >
                  {/* Miniature Page View Container */}
                  <div className="relative w-full aspect-[1/1.4] rounded-lg overflow-hidden border border-[#22304A] bg-[#FAF8F5] shadow-xs flex items-center justify-center">
                    {/* Scale down the exact page component */}
                    <div className="absolute inset-0 pointer-events-none transform scale-[0.62] origin-top-left w-[161%] h-[161%]">
                      {getPageRenderById(card.id, true)}
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-[#0E1726]/40 opacity-0 group-hover:opacity-100 backdrop-blur-2xs transition-opacity flex items-center justify-center">
                      <span className="px-3 py-1.5 rounded-full bg-[#C5A880] text-[#0E1726] text-xs font-semibold shadow flex items-center gap-1.5">
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>Inspect Page</span>
                      </span>
                    </div>
                  </div>

                  {/* Card Label & Meta */}
                  <div className="pt-3 pb-1 px-1 flex items-center justify-between">
                    <div>
                      <h4 className="font-serif text-sm text-[#FAF8F5] group-hover:text-[#C5A880] transition-colors">
                        {card.label}
                      </h4>
                      <p className="text-[10px] font-mono text-[#64748B] uppercase">
                        {card.tag}
                      </p>
                    </div>
                    <span className="w-6 h-6 rounded-full bg-[#162238] border border-[#22304A] text-[#C5A880] flex items-center justify-center text-[10px] font-mono">
                      {idx + 1}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Publishing Atelier Commercial Specification Box */}
          <div className="rounded-2xl p-6 sm:p-8 bg-[#10192A] border border-[#22304A] space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#22304A] pb-5">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C5A880]">
                  COMMERCIAL SERVICE SPECIFICATION
                </span>
                <h4 className="font-serif text-xl sm:text-2xl text-[#FAF8F5] mt-1">
                  How Personal Romance Novel Publishing Works
                </h4>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#94A3B8]">DLYS Editorial Atelier</span>
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 text-xs text-[#94A3B8]">
              <div className="space-y-2 p-4 rounded-xl bg-[#0E1726] border border-[#22304A]">
                <div className="w-8 h-8 rounded-lg bg-[#C5A880]/15 text-[#C5A880] flex items-center justify-center font-serif font-bold text-sm">
                  1
                </div>
                <h5 className="font-serif text-sm font-semibold text-[#FAF8F5]">
                  Send Your Memories & Timeline
                </h5>
                <p className="leading-relaxed">
                  Provide your first chat screenshots, inside jokes, milestone dates, and key photographs. Our editorial layout engine curates them into literary chapters.
                </p>
              </div>

              <div className="space-y-2 p-4 rounded-xl bg-[#0E1726] border border-[#22304A]">
                <div className="w-8 h-8 rounded-lg bg-[#C5A880]/15 text-[#C5A880] flex items-center justify-center font-serif font-bold text-sm">
                  2
                </div>
                <h5 className="font-serif text-sm font-semibold text-[#FAF8F5]">
                  Literary Editorial Design
                </h5>
                <p className="leading-relaxed">
                  No cheesy greeting cards or scrapbooks. Written and styled like a real Penguin or Knopf romance novel with drop caps, subtle UI chats, and timeline roadmaps.
                </p>
              </div>

              <div className="space-y-2 p-4 rounded-xl bg-[#0E1726] border border-[#22304A]">
                <div className="w-8 h-8 rounded-lg bg-[#C5A880]/15 text-[#C5A880] flex items-center justify-center font-serif font-bold text-sm">
                  3
                </div>
                <h5 className="font-serif text-sm font-semibold text-[#FAF8F5]">
                  Digital E-Book & Hardcover Ready
                </h5>
                <p className="leading-relaxed">
                  Receive a private responsive link with ambient piano accompaniment for mobile reading, plus high-res print files for real clothbound hardcover printing.
                </p>
              </div>
            </div>
          </div>

        </main>
      )}

      {/* ============================================================== */}
      {/* VIEW 2: INTERACTIVE OPEN-BOOK READER SPREAD                    */}
      {/* ============================================================== */}
      {viewMode === 'reader' && (
        <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C5A880]">
              IMMERSIVE NOVEL READING MODE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF8F5] tracking-wide">
              OUR STORY — By Adinda & Mas L
            </h2>
            <p className="text-xs text-[#94A3B8]">
              Use the arrows or spread selector below to read page-by-page.
            </p>
          </div>

          {/* Book Canvas with Realistic Shadow and Lighting */}
          <div className="relative rounded-2xl p-3 sm:p-6 bg-[#080D17] border border-[#22304A] shadow-2xl">
            <div
              className="relative w-full rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[500px] sm:min-h-[580px] bg-[#FAF8F5]"
              style={{
                boxShadow: '0 35px 70px -15px rgba(0, 0, 0, 0.85), 0 0 0 1px rgba(226, 221, 213, 0.7)',
              }}
            >
              {/* Left Page */}
              <div className="flex-1 relative border-r border-[#E2DDD5]/60">
                <div className="absolute top-0 bottom-0 right-0 w-8 bg-linear-to-l from-black/10 via-black/3 to-transparent pointer-events-none z-10" />
                {getPageRenderById(spreads[activeSpreadIndex].left)}
              </div>

              {/* Center Gutter */}
              <div className="hidden md:block w-px bg-[#CBD5E1] relative z-20">
                <div className="absolute top-0 bottom-0 -left-1 w-2 bg-linear-to-r from-black/15 via-black/5 to-black/15 pointer-events-none" />
              </div>

              {/* Right Page */}
              <div className="flex-1 relative">
                <div className="absolute top-0 bottom-0 left-0 w-8 bg-linear-to-r from-black/10 via-black/3 to-transparent pointer-events-none z-10" />
                {getPageRenderById(spreads[activeSpreadIndex].right)}
              </div>

              {/* Bookmark Ribbon */}
              <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-4 h-52 bg-[#C5A880] shadow-md z-30 pointer-events-none rounded-b-xs border-x border-[#A38257]" />
            </div>

            {/* Bottom spread navigation */}
            <div className="flex items-center justify-between mt-5 px-2 text-xs">
              <button
                onClick={handlePrevSpread}
                disabled={activeSpreadIndex === 0}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#131D30] hover:bg-[#1A2740] disabled:opacity-30 disabled:cursor-not-allowed text-[#CBD5E1] border border-[#22304A] transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Spread</span>
              </button>

              <div className="text-center">
                <p className="font-serif text-sm text-[#FAF8F5]">
                  {spreads[activeSpreadIndex].label}
                </p>
                <span className="font-mono text-[10px] text-[#C5A880]">
                  Spread {activeSpreadIndex + 1} of {spreads.length}
                </span>
              </div>

              <button
                onClick={handleNextSpread}
                disabled={activeSpreadIndex === spreads.length - 1}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#131D30] hover:bg-[#1A2740] disabled:opacity-30 disabled:cursor-not-allowed text-[#CBD5E1] border border-[#22304A] transition-colors cursor-pointer"
              >
                <span>Next Spread</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </main>
      )}

      {/* ============================================================== */}
      {/* VIEW 3: FULL ARCHITECTURAL ALL-PAGES GALLERY                   */}
      {/* ============================================================== */}
      {viewMode === 'gallery' && (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C5A880]">
              INDIVIDUAL PAGE PROOFS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF8F5] tracking-wide">
              Complete Editorial Collection
            </h2>
            <p className="text-xs text-[#94A3B8]">
              All 9 signature layouts designed with strict typography, generous whitespace, and zero clichés.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allPageCards.map((card, idx) => (
              <div
                key={card.id}
                className="flex flex-col rounded-2xl bg-[#0E1726] border border-[#22304A] p-4 shadow-xl space-y-3"
              >
                <div className="flex items-center justify-between text-xs font-mono border-b border-[#22304A] pb-2">
                  <span className="text-[#C5A880]">{card.tag}</span>
                  <span className="text-[#64748B]">LAYOUT {idx + 1}</span>
                </div>

                <div className="relative aspect-[1/1.4] rounded-xl overflow-hidden border border-[#22304A] bg-[#FAF8F5] shadow-inner">
                  {getPageRenderById(card.id)}
                </div>

                <div className="pt-1">
                  <h4 className="font-serif text-base text-[#FAF8F5]">{card.label}</h4>
                </div>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* ============================================================== */}
      {/* SINGLE PAGE INSPECTION MODAL (When clicking any thumbnail)     */}
      {/* ============================================================== */}
      {activeSinglePage !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveSinglePage(null)}
        >
          <div
            className="relative w-full max-w-xl max-h-[90vh] bg-[#FAF8F5] rounded-2xl shadow-2xl overflow-y-auto border border-[#C5A880]/40 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top modal bar */}
            <div className="sticky top-0 bg-[#0E1726] text-white px-5 py-3 border-b border-[#22304A] flex items-center justify-between z-20">
              <div className="flex items-center gap-2 text-xs">
                <span className="w-2 h-2 rounded-full bg-[#C5A880]" />
                <span className="font-serif font-medium">{allPageCards[activeSinglePage].label}</span>
                <span className="text-[10px] font-mono text-[#94A3B8]">({allPageCards[activeSinglePage].tag})</span>
              </div>
              <button
                onClick={() => setActiveSinglePage(null)}
                className="text-xs text-[#94A3B8] hover:text-white px-2 py-1 rounded bg-white/10 transition-colors cursor-pointer"
              >
                Close ✕
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 flex-1">
              <div className="min-h-[500px]">
                {getPageRenderById(allPageCards[activeSinglePage].id)}
              </div>
            </div>

            {/* Bottom Modal Navigation */}
            <div className="p-3 bg-[#F4EFEA] border-t border-[#E2DDD5] flex items-center justify-between text-xs">
              <button
                onClick={() => {
                  sounds.playPaperRustle();
                  setActiveSinglePage((prev) => (prev !== null && prev > 0 ? prev - 1 : allPageCards.length - 1));
                }}
                className="px-3 py-1.5 rounded-lg bg-white border border-[#E2DDD5] text-[#2D3748] hover:bg-[#FAF8F5] cursor-pointer"
              >
                ← Previous Page
              </button>
              <span className="font-mono text-[10px] text-[#718096]">
                Page {activeSinglePage + 1} of {allPageCards.length}
              </span>
              <button
                onClick={() => {
                  sounds.playPaperRustle();
                  setActiveSinglePage((prev) => (prev !== null && prev < allPageCards.length - 1 ? prev + 1 : 0));
                }}
                className="px-3 py-1.5 rounded-lg bg-white border border-[#E2DDD5] text-[#2D3748] hover:bg-[#FAF8F5] cursor-pointer"
              >
                Next Page →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer Minimal Copyright */}
      <footer className="border-t border-[#22304A] py-8 text-center text-xs text-[#64748B] space-y-2">
        <p className="font-serif text-[#94A3B8]">
          OUR STORY • Contemporary Romance Novel Prototype
        </p>
        <p className="font-mono text-[10px]">
          DLYS ATELIER • ADINDA & MAS L • JAKARTA, INDONESIA
        </p>
      </footer>
    </div>
  );
};
