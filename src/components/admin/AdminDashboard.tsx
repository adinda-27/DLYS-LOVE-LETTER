import { useState, useEffect } from 'react';
import {
  getAllLettersForAdmin,
  updateLetterPaidStatus,
  type LoveLetterDbRow,
} from '../../lib/supabase';
import {
  RefreshCw,
  ArrowLeft,
  Copy,
  Check,
  ExternalLink,
  MessageCircle,
  Eye,
  CheckCircle,
  XCircle,
  Database,
  Terminal,
} from 'lucide-react';

interface AdminDashboardProps {
  onBackToHome: () => void;
}

export const AdminDashboard = ({ onBackToHome }: AdminDashboardProps) => {
  const [letters, setLetters] = useState<LoveLetterDbRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showSqlModal, setShowSqlModal] = useState(false);
  const [sqlCopied, setSqlCopied] = useState(false);

  const fetchOrders = () => {
    setIsLoading(true);
    getAllLettersForAdmin().then((data) => {
      setLetters(data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    let active = true;
    getAllLettersForAdmin().then((data) => {
      if (active) {
        setLetters(data);
        setIsLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const handleTogglePaid = async (letter: LoveLetterDbRow) => {
    const nextStatus = !letter.is_paid;
    // Optimistic UI update
    setLetters((prev) =>
      prev.map((l) => (l.id === letter.id ? { ...l, is_paid: nextStatus } : l))
    );
    const success = await updateLetterPaidStatus(letter.id, nextStatus);
    if (!success) {
      // Revert if failed
      setLetters((prev) =>
        prev.map((l) => (l.id === letter.id ? { ...l, is_paid: letter.is_paid } : l))
      );
    }
  };

  const getFullUrl = (slug: string) => {
    const base = window.location.origin;
    return `${base}/?slug=${slug}`;
  };

  const handleCopyLink = (slug: string, id: string) => {
    navigator.clipboard?.writeText(getFullUrl(slug));
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSendLinkWhatsApp = (letter: LoveLetterDbRow) => {
    const link = getFullUrl(letter.slug);
    const message =
      `Halo Kak! Pembayaran untuk pesanan halaman romantis DLYS sudah kami terima & aktifkan ya ✨%0A%0A` +
      `━━━━━━━━━━━━━━━━━━%0A` +
      `💌 *Halaman Spesial Untuk ${letter.recipient_name}:*%0A` +
      `${encodeURIComponent(link)}%0A` +
      `━━━━━━━━━━━━━━━━━━%0A%0A` +
      `Link ini sudah aktif & bersih tanpa watermark selamanya. Kakak bisa langsung share link di atas ke pasangan atau scan QR Code-nya ya! 🥰%0A%0A` +
      `Terima kasih sudah mempercayakan momen spesialmu pada *DLYS Team*! 🙏❤️`;
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  const sqlSchemaCode = `-- KODE SQL TABEL DLYS LOVE
create table if not exists public.love_letters (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  recipient_name text not null,
  sender_name text not null,
  headline text,
  message text,
  special_date text,
  song_title text,
  song_url text,
  photo_url text,
  question text,
  accept_button text,
  second_button text,
  ps_note text,
  template_id text default 'vintage-parchment',
  package_type text default 'standard',
  is_paid boolean default false,
  view_count integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Buka izin akses baca & tulis untuk publik
alter table public.love_letters enable row level security;

create policy "Allow all read" on public.love_letters for select using (true);
create policy "Allow all insert" on public.love_letters for insert with check (true);
create policy "Allow all update" on public.love_letters for update using (true);`;

  const totalOrders = letters.length;
  const paidOrders = letters.filter((l) => l.is_paid).length;
  const pendingOrders = totalOrders - paidOrders;
  const totalViews = letters.reduce((sum, l) => sum + (l.view_count || 0), 0);

  return (
    <div className="min-h-screen bg-[#140E12] text-[#F3EDF1] font-sans flex flex-col">
      {/* Admin Top Header */}
      <header className="bg-stone-950/80 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToHome}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-medium text-stone-200 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Web</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="font-serif font-black text-rose-500 text-lg">DLYS</span>
            <span className="text-xs font-mono uppercase tracking-widest text-stone-400">
              Admin Master
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSqlModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-950/60 hover:bg-rose-900/60 border border-rose-500/40 text-rose-300 text-xs font-medium transition-colors cursor-pointer"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Skema Database SQL</span>
            <span className="sm:hidden">SQL</span>
          </button>

          <button
            onClick={fetchOrders}
            disabled={isLoading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-8 space-y-6">
        
        {/* Supabase Connection Banner */}
        <div className="p-4 rounded-2xl bg-linear-to-r from-emerald-950/60 via-stone-900 to-rose-950/40 border border-emerald-500/30 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
            <div>
              <p className="font-bold text-emerald-300">
                Database Supabase Terhubung: <span className="font-mono">gmcnahanakoiiwhwztwy</span>
              </p>
              <p className="text-stone-400 text-[11px]">
                Link pendek tersimpan otomatis, siap diaktifkan saat pembeli konfirmasi via WhatsApp.
              </p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold">
            POSTGRESQL LIVE
          </span>
        </div>

        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 rounded-2xl bg-stone-900/90 border border-white/10">
            <span className="text-[11px] font-medium text-stone-400 block mb-1">Total Pesanan</span>
            <p className="text-2xl font-bold font-serif text-white">{totalOrders}</p>
            <span className="text-[10px] text-stone-500">Seluruh surat di DB</span>
          </div>

          <div className="p-4 rounded-2xl bg-stone-900/90 border border-emerald-500/20">
            <span className="text-[11px] font-medium text-emerald-400 block mb-1">Sudah Aktif / Lunas 🟢</span>
            <p className="text-2xl font-bold font-serif text-emerald-300">{paidOrders}</p>
            <span className="text-[10px] text-stone-500">Watermark preview hilang</span>
          </div>

          <div className="p-4 rounded-2xl bg-stone-900/90 border border-amber-500/20">
            <span className="text-[11px] font-medium text-amber-400 block mb-1">Menunggu Bayar 🔒</span>
            <p className="text-2xl font-bold font-serif text-amber-300">{pendingOrders}</p>
            <span className="text-[10px] text-stone-500">Draft sebelum transfer</span>
          </div>

          <div className="p-4 rounded-2xl bg-stone-900/90 border border-rose-500/20">
            <span className="text-[11px] font-medium text-rose-400 block mb-1">Total Views Pasangan 👀</span>
            <p className="text-2xl font-bold font-serif text-rose-300">{totalViews}</p>
            <span className="text-[10px] text-stone-500">Kali surat telah dibuka</span>
          </div>
        </div>

        {/* Orders Table Card */}
        <div className="bg-stone-900/90 border border-white/10 rounded-3xl overflow-hidden shadow-xl">
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-lg text-white">
                Daftar Pesanan & Status Surat Cinta
              </h3>
              <p className="text-xs text-stone-400">
                Kelola status pembayaran, aktifkan watermark, dan kirim link ke WhatsApp pembeli.
              </p>
            </div>
            <span className="text-xs font-mono text-stone-400">
              {letters.length} data
            </span>
          </div>

          {letters.length === 0 ? (
            <div className="py-16 px-4 text-center space-y-3">
              <Database className="w-10 h-10 text-stone-600 mx-auto" />
              <p className="text-sm font-medium text-stone-300">
                Belum ada pesanan yang tersimpan di Supabase
              </p>
              <p className="text-xs text-stone-500 max-w-md mx-auto">
                Pesanan akan otomatis muncul di sini setiap kali ada user yang membuat surat dan mengklik tombol aktivasi link.
              </p>
              <button
                onClick={() => setShowSqlModal(true)}
                className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs transition-colors cursor-pointer"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Pastikan Tabel SQL Sudah Dijalankan di Supabase</span>
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/10 bg-black/30 text-stone-400 font-mono text-[10px] uppercase tracking-wider">
                    <th className="py-3 px-4">Penerima & Pengirim</th>
                    <th className="py-3 px-4">Paket & Template</th>
                    <th className="py-3 px-4">Lagu & Tanggal</th>
                    <th className="py-3 px-4">Link Short URL</th>
                    <th className="py-3 px-4 text-center">Views</th>
                    <th className="py-3 px-4 text-center">Status Link</th>
                    <th className="py-3 px-4 text-right">Aksi WhatsApp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {letters.map((letter) => {
                    const isPaid = letter.is_paid;
                    const shortUrl = getFullUrl(letter.slug);

                    return (
                      <tr key={letter.id} className="hover:bg-white/5 transition-colors">
                        {/* Recipient & Sender */}
                        <td className="py-3.5 px-4">
                          <p className="font-bold text-white text-sm">
                            {letter.recipient_name}
                          </p>
                          <p className="text-[11px] text-stone-400">
                            dari: {letter.sender_name}
                          </p>
                        </td>

                        {/* Package & Template */}
                        <td className="py-3.5 px-4">
                          <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider mb-1 ${
                            letter.package_type === 'custom-theme'
                              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                              : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          }`}>
                            {letter.package_type === 'custom-theme' ? 'Custom Rp 99rb' : 'Instant Rp 39rb'}
                          </span>
                          <p className="text-stone-400 text-[11px] font-mono truncate max-w-[140px]">
                            {letter.template_id || 'vintage-parchment'}
                          </p>
                        </td>

                        {/* Song & Date */}
                        <td className="py-3.5 px-4">
                          <p className="text-stone-300 font-medium truncate max-w-[140px]">
                            🎵 {letter.song_title || 'Golden Hour'}
                          </p>
                          <p className="text-[10px] font-mono text-stone-500">
                            {new Date(letter.created_at).toLocaleDateString('id-ID', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                            })}
                          </p>
                        </td>

                        {/* Short URL Box */}
                        <td className="py-3.5 px-4 font-mono">
                          <div className="flex items-center gap-1.5">
                            <span className="text-rose-400 font-semibold truncate max-w-[160px]">
                              /?slug={letter.slug}
                            </span>
                            <button
                              onClick={() => handleCopyLink(letter.slug, letter.id)}
                              className="p-1 rounded-md bg-white/10 hover:bg-white/20 text-stone-300 transition-colors cursor-pointer"
                              title="Salin Link"
                            >
                              {copiedId === letter.id ? (
                                <Check className="w-3 h-3 text-emerald-400" />
                              ) : (
                                <Copy className="w-3 h-3" />
                              )}
                            </button>
                            <a
                              href={shortUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1 rounded-md bg-white/10 hover:bg-white/20 text-stone-300 transition-colors"
                              title="Buka Halaman"
                            >
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        </td>

                        {/* Views Count */}
                        <td className="py-3.5 px-4 text-center">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/10 font-mono text-[11px] text-stone-300">
                            <Eye className="w-3 h-3 text-stone-400" />
                            <span>{letter.view_count || 0}</span>
                          </span>
                        </td>

                        {/* Status Toggle Button */}
                        <td className="py-3.5 px-4 text-center">
                          <button
                            onClick={() => handleTogglePaid(letter)}
                            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1.5 shadow-xs ${
                              isPaid
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
                                : 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 animate-pulse'
                            }`}
                            title={isPaid ? 'Klik untuk kunci kembali' : 'Klik setelah pembeli transfer'}
                          >
                            {isPaid ? (
                              <>
                                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                                <span>Aktif (Lunas)</span>
                              </>
                            ) : (
                              <>
                                <XCircle className="w-3.5 h-3.5 text-amber-400" />
                                <span>Klik: Aktifkan ⚡</span>
                              </>
                            )}
                          </button>
                        </td>

                        {/* Action WhatsApp */}
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => handleSendLinkWhatsApp(letter)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/40 text-[#25D366] font-semibold text-xs transition-colors cursor-pointer"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>Kirim Link</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </main>

      {/* SQL Script Modal */}
      {showSqlModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-stone-900 border border-white/20 rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <h4 className="font-serif font-bold text-white text-base flex items-center gap-2">
                <Terminal className="w-4 h-4 text-rose-500" />
                <span>Skema SQL Database Supabase</span>
              </h4>
              <button
                onClick={() => setShowSqlModal(false)}
                className="text-stone-400 hover:text-white text-xs px-2 py-1 rounded-md"
              >
                Tutup
              </button>
            </div>

            <p className="text-xs text-stone-300">
              Buka menu <strong>SQL Editor</strong> di dashboard Supabase kamu, klik <strong>New Query</strong>, lalu paste kode di bawah ini dan klik <strong>RUN</strong>:
            </p>

            <pre className="p-3.5 rounded-xl bg-black/60 border border-white/10 font-mono text-[11px] text-emerald-300 overflow-x-auto max-h-64 selection:bg-rose-900">
              {sqlSchemaCode}
            </pre>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(sqlSchemaCode);
                  setSqlCopied(true);
                  setTimeout(() => setSqlCopied(false), 2000);
                }}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {sqlCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{sqlCopied ? 'Tersalin!' : 'Salin Kode SQL'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
