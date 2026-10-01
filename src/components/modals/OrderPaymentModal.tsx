import { useState } from 'react';
import type { CustomizationData, PricingPackage, Template } from '../../types';
import { PRICING_PACKAGES, generateWhatsAppOrderUrl, DEFAULT_WHATSAPP_NUMBER } from '../../data/pricingData';
import { encodeLoveLetter } from '../../utils/urlEncoder';
import { saveLetterToSupabase } from '../../lib/supabase';
import {
  X,
  Heart,
  Check,
  Sparkles,
  Palette,
  MessageCircle,
  ShieldCheck,
  Clock,
  ArrowRight,
  BookOpen,
} from 'lucide-react';

interface OrderPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: CustomizationData;
  template: Template;
  onSimulatePaymentSuccess: () => void;
}

export const OrderPaymentModal = ({
  isOpen,
  onClose,
  data,
  template,
  onSimulatePaymentSuccess,
}: OrderPaymentModalProps) => {
  const [selectedPackageId, setSelectedPackageId] = useState<'standard' | 'custom-theme' | 'romance-novel'>(
    template.id === 'our-story-novel' ? 'romance-novel' : 'standard'
  );
  const [adminPhone, setAdminPhone] = useState(DEFAULT_WHATSAPP_NUMBER);
  const [showPhoneEditor, setShowPhoneEditor] = useState(false);

  if (!isOpen) return null;

  const currentPackage: PricingPackage =
    PRICING_PACKAGES.find((p) => p.id === selectedPackageId) || PRICING_PACKAGES[0];

  const handleOpenWhatsApp = () => {
    // Save to Supabase in the background
    saveLetterToSupabase(data, currentPackage.id).catch(() => {});

    const draftCode = encodeLoveLetter(data);
    const url = generateWhatsAppOrderUrl(currentPackage, data, template.title, adminPhone, draftCode);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-rose-100 max-h-[94vh]">
        
        {/* Header */}
        <div className="px-6 py-4.5 border-b border-rose-100 flex items-center justify-between bg-[#FAF7F5]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-linear-to-br from-rose-500 to-rose-700 text-white flex items-center justify-center shadow-xs">
              <Heart className="w-4 h-4 fill-white" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#2A1921] leading-tight">
                Aktifkan Link Spesial Untuk {data.recipientName}
              </h3>
              <p className="text-xs text-[#75616B]">
                Pilih paket aktivasi agar link live aktif selamanya & watermark preview hilang
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-rose-100/60 hover:bg-rose-200 text-[#4E3942] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Tutup modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Paket Pricing Options */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PRICING_PACKAGES.map((pkg) => {
              const isSelected = selectedPackageId === pkg.id;
              const isNovelPkg = pkg.id === 'romance-novel';

              return (
                <div
                  key={pkg.id}
                  onClick={() => setSelectedPackageId(pkg.id)}
                  className={`relative p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? isNovelPkg
                        ? 'bg-[#0E1726] text-[#FAF8F5] border-[#C5A880] shadow-xl ring-2 ring-[#C5A880]/50'
                        : 'bg-rose-50/50 border-rose-600 shadow-md ring-2 ring-rose-200/60'
                      : isNovelPkg
                      ? 'bg-[#0E1726]/5 border-[#22304A]/30 hover:border-[#C5A880]/50'
                      : 'bg-white border-stone-200/90 hover:border-rose-200 hover:bg-rose-50/20'
                  }`}
                >
                  {/* Badge */}
                  {pkg.badge && (
                    <span
                      className={`absolute -top-2.5 right-4 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs ${
                        isNovelPkg
                          ? 'bg-[#C5A880] text-[#0E1726]'
                          : 'bg-rose-600 text-white'
                      }`}
                    >
                      {pkg.badge}
                    </span>
                  )}

                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      {pkg.id === 'standard' ? (
                        <Sparkles className="w-4 h-4 text-rose-600" />
                      ) : pkg.id === 'romance-novel' ? (
                        <BookOpen className={`w-4 h-4 ${isSelected ? 'text-[#C5A880]' : 'text-[#8A6D3B]'}`} />
                      ) : (
                        <Palette className="w-4 h-4 text-rose-600" />
                      )}
                      <h4
                        className={`font-serif text-base font-bold ${
                          isNovelPkg && isSelected ? 'text-[#FAF8F5]' : 'text-[#2A1921]'
                        }`}
                      >
                        {pkg.name}
                      </h4>
                    </div>

                    <p
                      className={`text-[11px] mb-3 leading-snug ${
                        isNovelPkg && isSelected ? 'text-[#C5A880]' : 'text-[#715D67]'
                      }`}
                    >
                      {pkg.tagline}
                    </p>

                    <div className="flex items-baseline gap-2 mb-3">
                      <span
                        className={`font-serif text-2xl font-bold ${
                          isNovelPkg && isSelected ? 'text-[#FAF8F5]' : 'text-[#23151B]'
                        }`}
                      >
                        {pkg.price}
                      </span>
                      <span className="text-xs text-stone-400 line-through">
                        {pkg.originalPrice}
                      </span>
                    </div>

                    <p
                      className={`text-xs mb-4 leading-relaxed font-light ${
                        isNovelPkg && isSelected ? 'text-[#CBD5E1]' : 'text-[#523E47]'
                      }`}
                    >
                      {pkg.description}
                    </p>
                  </div>

                  {/* Feature Checklist */}
                  <div
                    className={`space-y-1.5 pt-3 border-t text-[11px] ${
                      isNovelPkg && isSelected
                        ? 'border-[#22304A] text-[#E2E8F0]'
                        : 'border-rose-100/70 text-[#4A3640]'
                    }`}
                  >
                    {pkg.features.slice(0, 4).map((f, idx) => (
                      <div key={idx} className="flex items-start gap-1.5">
                        <Check
                          className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                            isNovelPkg && isSelected ? 'text-[#C5A880]' : 'text-rose-600'
                          }`}
                        />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>

                  {/* Radio Indicator */}
                  <div
                    className={`mt-4 pt-3 border-t flex items-center justify-between text-xs font-semibold ${
                      isNovelPkg && isSelected ? 'border-[#22304A]' : 'border-rose-100/60'
                    }`}
                  >
                    <span
                      className={
                        isSelected
                          ? isNovelPkg
                            ? 'text-[#C5A880]'
                            : 'text-rose-700'
                          : 'text-stone-500'
                      }
                    >
                      {isSelected ? '✓ Paket Terpilih' : 'Pilih Paket Ini'}
                    </span>
                    <div
                      className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isSelected
                          ? isNovelPkg
                            ? 'border-[#C5A880] bg-[#C5A880]'
                            : 'border-rose-600 bg-rose-600'
                          : 'border-stone-300'
                      }`}
                    >
                      {isSelected && (
                        <div
                          className={`w-1.5 h-1.5 rounded-full ${
                            isNovelPkg ? 'bg-[#0E1726]' : 'bg-white'
                          }`}
                        />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Order Summary Recap */}
          <div className="p-4 rounded-2xl bg-[#FAF5F2] border border-rose-200/70 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700 block">
              Ringkasan Pesanan Kamu
            </span>
            <div className="grid grid-cols-2 gap-2 text-xs text-[#54404A]">
              <div>
                <span className="text-stone-500 block text-[10px]">Template Dipakai:</span>
                <strong className="font-medium text-[#2A1822]">{template.title}</strong>
              </div>
              <div>
                <span className="text-stone-500 block text-[10px]">Target Pasangan:</span>
                <strong className="font-medium text-[#2A1822]">{data.recipientName} (dari {data.senderName})</strong>
              </div>
              <div>
                <span className="text-stone-500 block text-[10px]">Lagu Latar:</span>
                <span className="truncate block font-medium text-[#2A1822]">{data.song.title}</span>
              </div>
              <div>
                <span className="text-stone-500 block text-[10px]">Format Link Personal:</span>
                <span className="font-mono text-rose-700 font-semibold truncate block">
                  dlys.love/m/{data.recipientName.toLowerCase()}-{data.senderName.toLowerCase()}
                </span>
              </div>
            </div>
          </div>

          {/* Security & Reassurance */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#6F5B66] px-1">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Link privat selamanya, bisa diakses kapan saja</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-600" />
              <span>Proses aktivasi langsung via WhatsApp</span>
            </div>
          </div>

          {/* Admin phone configurator for DLYS Team */}
          <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
            <button
              onClick={() => setShowPhoneEditor(!showPhoneEditor)}
              className="text-[11px] text-rose-600 hover:underline cursor-pointer"
            >
              {showPhoneEditor ? 'Sembunyikan Pengaturan Nomor WA' : '⚙️ Atur Nomor WhatsApp Tujuan Order'}
            </button>
            {showPhoneEditor && (
              <div className="flex items-center gap-2">
                <span className="text-[11px]">Nomor WA:</span>
                <input
                  type="text"
                  value={adminPhone}
                  onChange={(e) => setAdminPhone(e.target.value)}
                  placeholder="62812xxxxxxx"
                  className="px-2 py-1 rounded-md border text-xs font-mono w-36"
                />
              </div>
            )}
          </div>

        </div>

        {/* Modal Footer: WhatsApp Action & Demo Unlock */}
        <div className="px-6 py-4 border-t border-rose-100 bg-[#FAF7F5] flex flex-col sm:flex-row items-center justify-between gap-3">
          
          {/* Demo Button to test Unlocked View */}
          <button
            onClick={() => {
              onClose();
              onSimulatePaymentSuccess();
            }}
            className="text-xs text-rose-600 hover:text-rose-800 font-medium underline flex items-center gap-1 cursor-pointer order-2 sm:order-1"
            title="Klik untuk mensimulasikan status link setelah dibayar"
          >
            <span>⚡ Simulasi Pembayaran Sukses (Testing Mode)</span>
          </button>

          {/* Primary WhatsApp Order Button */}
          <button
            onClick={handleOpenWhatsApp}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-lg shadow-emerald-600/25 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer order-1 sm:order-2"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>Lanjut Order via WhatsApp ({currentPackage.price})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

        </div>

      </div>
    </div>
  );
};
