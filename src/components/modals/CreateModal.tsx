import { useState } from 'react';
import type { MomentCategory, Template } from '../../types';
import { TEMPLATES_DATA, MOMENT_TYPES } from '../../data/mockData';
import {
  X,
  Heart,
  Music,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  Copy,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: MomentCategory;
  initialTemplate?: Template | null;
}

export const CreateModal = ({
  isOpen,
  onClose,
  initialCategory = 'love-letter',
  initialTemplate,
}: CreateModalProps) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [recipient, setRecipient] = useState('Maya');
  const [sender, setSender] = useState('Julian');
  const [category, setCategory] = useState<MomentCategory>(initialCategory);
  const [selectedTemplate, setSelectedTemplate] = useState<Template>(
    initialTemplate || TEMPLATES_DATA[0]
  );
  const [headline, setHeadline] = useState(
    'To the one who makes everyday feel like a gentle poem'
  );
  const [message, setMessage] = useState(
    'Two years ago, you walked into my life and turned ordinary moments into my favorite memories. Thank you for being you.'
  );
  const [song, setSong] = useState('Golden Hour (Lofi Piano) — JVKE');
  const [generatedLink, setGeneratedLink] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleNextToFinalize = () => {
    const slug = recipient.toLowerCase().replace(/\s+/g, '-') + '-and-' + sender.toLowerCase().replace(/\s+/g, '-');
    setGeneratedLink(`https://dlys.love/m/${slug}`);
    setStep(3);
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#e11d48', '#fda4af', '#f43f5e', '#ffd1dc'],
    });
  };

  const handleCopy = () => {
    setCopied(true);
    navigator.clipboard?.writeText(generatedLink);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetAndClose = () => {
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-rose-100 max-h-[92vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-rose-100 flex items-center justify-between bg-[#FAF7F5]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center">
              <Heart className="w-3.5 h-3.5 fill-white" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#2A1921]">
              Personalize Your Moment
            </h3>
          </div>
          <button
            onClick={resetAndClose}
            className="w-8 h-8 rounded-full bg-rose-100/60 hover:bg-rose-200 text-[#4E3942] flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="flex border-b border-rose-100/70 text-xs font-semibold">
          <div
            className={`flex-1 py-2 text-center border-b-2 transition-all ${
              step >= 1 ? 'border-rose-600 text-rose-700 bg-rose-50/40' : 'border-transparent text-stone-400'
            }`}
          >
            1. The Story & Mood
          </div>
          <div
            className={`flex-1 py-2 text-center border-b-2 transition-all ${
              step >= 2 ? 'border-rose-600 text-rose-700 bg-rose-50/40' : 'border-transparent text-stone-400'
            }`}
          >
            2. Words & Soundtrack
          </div>
          <div
            className={`flex-1 py-2 text-center border-b-2 transition-all ${
              step >= 3 ? 'border-rose-600 text-rose-700 bg-rose-50/40' : 'border-transparent text-stone-400'
            }`}
          >
            3. Ready to Share ✨
          </div>
        </div>

        {/* Step Content */}
        <div className="flex-1 overflow-y-auto p-6">
          
          {/* STEP 1: CHOOSE CATEGORY & TEMPLATE */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4E3942] mb-2">
                  What kind of moment are you celebrating?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {MOMENT_TYPES.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setCategory(m.id)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                        category === m.id
                          ? 'bg-rose-50 border-rose-500 ring-2 ring-rose-200'
                          : 'bg-white border-stone-200 hover:border-rose-300'
                      }`}
                    >
                      <p className="text-xs font-bold text-[#2C1C24]">{m.title}</p>
                      <p className="text-[10px] text-rose-600 font-medium truncate mt-0.5">{m.badge}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Names input */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#4E3942] mb-1">
                    For (Recipient Name)
                  </label>
                  <input
                    type="text"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    placeholder="e.g. Maya"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-rose-500 focus:outline-none text-sm bg-stone-50/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#4E3942] mb-1">
                    From (Your Name)
                  </label>
                  <input
                    type="text"
                    value={sender}
                    onChange={(e) => setSender(e.target.value)}
                    placeholder="e.g. Julian"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-rose-500 focus:outline-none text-sm bg-stone-50/50"
                  />
                </div>
              </div>

              {/* Select Aesthetic Template */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#4E3942] mb-2">
                  Pick an Aesthetic
                </label>
                <div className="space-y-2">
                  {TEMPLATES_DATA.slice(0, 3).map((tpl) => (
                    <div
                      key={tpl.id}
                      onClick={() => setSelectedTemplate(tpl)}
                      className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                        selectedTemplate.id === tpl.id
                          ? 'bg-rose-50/60 border-rose-500 ring-1 ring-rose-300'
                          : 'bg-white border-stone-200 hover:border-rose-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={tpl.thumbnailUrl}
                          alt={tpl.title}
                          className="w-12 h-12 rounded-xl object-cover"
                        />
                        <div>
                          <p className="text-xs font-bold text-[#2A1921]">{tpl.title}</p>
                          <p className="text-[11px] text-[#715D67]">{tpl.mood}</p>
                        </div>
                      </div>
                      {selectedTemplate.id === tpl.id && (
                        <div className="w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: WORDS & SOUNDTRACK */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-[#4E3942] mb-1">
                  Headline on Opening Cover
                </label>
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  placeholder="e.g. To the one who makes everyday feel gentle"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-rose-500 focus:outline-none text-sm bg-stone-50/50 font-serif"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4E3942] mb-1">
                  Your Heartfelt Message
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write from your heart. It will unfold line-by-line as they read..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-rose-500 focus:outline-none text-sm bg-stone-50/50 leading-relaxed font-sans"
                />
                <span className="text-[11px] text-[#78636E]">
                  Tip: Keep it sincere and raw. Mention a small inside joke or quiet memory.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#4E3942] mb-1 flex items-center gap-1.5">
                  <Music className="w-3.5 h-3.5 text-rose-600" />
                  <span>Background Song for the Atmosphere</span>
                </label>
                <select
                  value={song}
                  onChange={(e) => setSong(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 focus:border-rose-500 focus:outline-none text-sm bg-stone-50/50"
                >
                  <option value="Golden Hour (Lofi Piano) — JVKE">Golden Hour (Lofi Piano) — JVKE</option>
                  <option value="Until I Found You — Stephen Sanchez">Until I Found You — Stephen Sanchez</option>
                  <option value="Saturn — Sleeping At Last">Saturn — Sleeping At Last</option>
                  <option value="La Vie En Rose — Acoustic Strings">La Vie En Rose — Acoustic Strings</option>
                  <option value="Bloom — The Paper Kites">Bloom — The Paper Kites</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 3: INSTANT RESULT / SHAREABLE LINK */}
          {step === 3 && (
            <div className="text-center py-4 space-y-6 animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto shadow-md">
                <Heart className="w-8 h-8 fill-rose-600" />
              </div>

              <div>
                <h4 className="font-serif text-2xl font-bold text-[#2A1921]">
                  Your special page is ready!
                </h4>
                <p className="text-xs sm:text-sm text-[#66545C] mt-1 max-w-sm mx-auto">
                  A private, interactive web sanctuary created with love for {recipient}.
                </p>
              </div>

              {/* Shareable Link Box */}
              <div className="bg-rose-50/80 p-4 rounded-2xl border border-rose-200 max-w-md mx-auto">
                <span className="text-[11px] font-bold text-rose-700 block mb-1 uppercase tracking-wider">
                  Private Link For {recipient}
                </span>
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="text"
                    readOnly
                    value={generatedLink}
                    className="flex-1 bg-white px-3 py-2 rounded-xl border border-rose-200 text-xs font-mono text-[#4A3740] select-all"
                  />
                  <button
                    onClick={handleCopy}
                    className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer shrink-0"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Suggestions */}
              <div className="bg-white p-4 rounded-2xl border border-stone-200 text-left text-xs text-[#5E4C55] space-y-2 max-w-md mx-auto">
                <div className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✨</span>
                  <span><strong>Idea:</strong> Send this link at midnight with a sweet text: "I made something just for you. Put on your headphones and open this."</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">💌</span>
                  <span>Looks stunning automatically on both iPhone & Android devices.</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Controls */}
        <div className="px-6 py-4 border-t border-rose-100 bg-[#FAF7F5] flex items-center justify-between">
          {step > 1 && step < 3 ? (
            <button
              onClick={() => setStep((step - 1) as 1 | 2)}
              className="flex items-center gap-1 text-xs font-semibold text-[#66545C] hover:text-[#2A1921] cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <div></div>
          )}

          {step === 1 && (
            <button
              onClick={() => setStep(2)}
              className="ml-auto flex items-center gap-2 px-6 py-2.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs shadow-md shadow-rose-600/25 transition-all cursor-pointer"
            >
              <span>Next: Write Message</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}

          {step === 2 && (
            <button
              onClick={handleNextToFinalize}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-linear-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-semibold text-xs shadow-md shadow-rose-600/25 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Generate My Page</span>
            </button>
          )}

          {step === 3 && (
            <button
              onClick={resetAndClose}
              className="ml-auto px-6 py-2.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs transition-all cursor-pointer"
            >
              Done & Return
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
