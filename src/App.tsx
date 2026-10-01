import { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Hero } from './components/hero/Hero';
import { InteractivePreview } from './components/preview/InteractivePreview';
import { MomentsGrid } from './components/moments/MomentsGrid';
import { TemplateShowcase } from './components/templates/TemplateShowcase';
import { HowItWorks } from './components/how-it-works/HowItWorks';
import { EmotionalValue } from './components/value/EmotionalValue';
import { FinalCta } from './components/cta/FinalCta';
import { Footer } from './components/layout/Footer';
import { TemplatePreviewModal } from './components/modals/TemplatePreviewModal';
import { CustomizerStudio } from './components/studio/CustomizerStudio';
import { OrderPaymentModal } from './components/modals/OrderPaymentModal';
import { RecipientLivePage } from './components/recipient/RecipientLivePage';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { TEMPLATES_DATA } from './data/mockData';
import { ROMANTIC_SONGS } from './data/pricingData';
import { decodeLoveLetter } from './utils/urlEncoder';
import { getLetterBySlug } from './lib/supabase';
import type { MomentCategory, Template, CustomizationData } from './types';
import { BookOpen, ArrowRight } from 'lucide-react';

type AppView = 'landing' | 'studio' | 'recipient' | 'admin';

const getInitialLoveLetterState = () => {
  if (typeof window !== 'undefined') {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('view') === 'admin' || window.location.pathname === '/admin' || window.location.hash === '#admin') {
        return { isAdmin: true };
      }

      if (params.get('prototype') === 'our-story' || params.get('theme') === 'our-story-novel') {
        const tpl = TEMPLATES_DATA.find((t) => t.id === 'our-story-novel') || TEMPLATES_DATA[0];
        return {
          data: {
            templateId: 'our-story-novel',
            recipientName: 'Adinda',
            senderName: 'Mas L',
            headline: 'the little things that became us',
            message: 'Some stories begin with a single conversation. Ours began with a story about biner. And somehow, that little conversation became all of this.',
            specialDate: '2024-10-03',
            song: {
              title: 'Golden Hour (Intimate Piano)',
              artist: 'JVKE ft. Chill Clouds',
              url: '/audio/golden-hour-piano.wav',
            },
            photos: ['https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop'],
            questionPrompt: {
              question: 'Maukah kamu terus menemaniku sampai kita tua nanti?',
              acceptButton: 'Iya, mau banget! ❤️',
              secondButton: 'Selalu mau! ✨',
            },
          },
          template: tpl,
          isRecipient: true,
        };
      }

      const letterCode = params.get('letter') || params.get('m');
      if (letterCode) {
        const decoded = decodeLoveLetter(letterCode);
        if (decoded) {
          const tpl = TEMPLATES_DATA.find((t) => t.id === decoded.templateId) || TEMPLATES_DATA[0];
          return { data: decoded, template: tpl, isRecipient: true };
        }
      }
    } catch {
      // ignore
    }
  }
  return null;
};

export function App() {
  const initialPayload = getInitialLoveLetterState();
  const [currentView, setCurrentView] = useState<AppView>(
    initialPayload?.isAdmin ? 'admin' : initialPayload?.isRecipient ? 'recipient' : 'landing'
  );
  const [isDirectRecipient] = useState(!!initialPayload?.isRecipient);
  const [selectedCategory, setSelectedCategory] = useState<MomentCategory>('all');
  const [previewingTemplate, setPreviewingTemplate] = useState<Template | null>(null);
  const [activeTemplate, setActiveTemplate] = useState<Template>(initialPayload?.template || TEMPLATES_DATA[0]);
  
  // Customization data for the active project
  const [customData, setCustomData] = useState<CustomizationData>(
    initialPayload?.data || {
      templateId: TEMPLATES_DATA[0].id,
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
        secondButton: 'Selalu mau! ✨',
      },
      psNote: 'Coba cek saku jaketmu sebelum kita makan malam nanti ya ✨',
    }
  );

  // Order modal state
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);

  // Navigation handlers
  const handleOpenStudio = (template?: Template) => {
    if (template) {
      setActiveTemplate(template);
      setCustomData((prev) => ({ ...prev, templateId: template.id }));
    }
    setCurrentView('studio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenStudioWithCategory = (category: MomentCategory) => {
    const tpl = TEMPLATES_DATA.find((t) => t.category === category) || TEMPLATES_DATA[0];
    handleOpenStudio(tpl);
  };

  const handleOpenNovelPrototype = () => {
    const novelTemplate = TEMPLATES_DATA.find((t) => t.id === 'our-story-novel') || TEMPLATES_DATA[0];
    setActiveTemplate(novelTemplate);
    setCustomData((prev) => ({
      ...prev,
      templateId: 'our-story-novel',
      recipientName: 'Adinda',
      senderName: 'Mas L',
      headline: 'the little things that became us',
      message: 'Some stories begin with a single conversation. Ours began with a story about biner. And somehow, that little conversation became all of this.',
      specialDate: '2024-10-03',
      photos: [
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop',
      ],
    }));
    setCurrentView('recipient');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreTemplates = () => {
    if (currentView !== 'landing') {
      setCurrentView('landing');
      setTimeout(() => {
        const el = document.getElementById('templates');
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('templates');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToPreview = () => {
    if (currentView !== 'landing') {
      setCurrentView('landing');
      setTimeout(() => {
        const el = document.getElementById('preview');
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('preview');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectMomentFromGrid = (category: MomentCategory) => {
    setSelectedCategory(category);
    const el = document.getElementById('templates');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSimulatePaymentSuccess = () => {
    setIsOrderModalOpen(false);
    setCurrentView('recipient');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Fetch letter by short slug from Supabase if ?slug= is provided
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const slug = params.get('slug');
      if (slug) {
        getLetterBySlug(slug).then((res) => {
          if (res.success && res.data) {
            setCustomData(res.data);
            const tpl = TEMPLATES_DATA.find((t) => t.id === res.data?.templateId) || TEMPLATES_DATA[0];
            setActiveTemplate(tpl);
            setCurrentView('recipient');
          }
        });
      }
    } catch (e) {
      console.error('Error fetching slug:', e);
    }
  }, []);

  // VIEW 0: DLYS TEAM ADMIN MASTER DASHBOARD
  if (currentView === 'admin') {
    return <AdminDashboard onBackToHome={() => setCurrentView('landing')} />;
  }

  // VIEW 1: STANDALONE RECIPIENT PAGE (UNLOCKED / CLEAN)
  if (currentView === 'recipient') {
    return (
      <RecipientLivePage
        data={customData}
        template={activeTemplate}
        onBackToEditor={() => setCurrentView('studio')}
        onReturnToHome={() => setCurrentView('landing')}
        isDirectRecipientView={isDirectRecipient}
      />
    );
  }

  // VIEW 2: DLYS STUDIO / CUSTOMIZER (FILL-IN-THE-BLANK + WATERMARKED PREVIEW)
  if (currentView === 'studio') {
    return (
      <>
        <CustomizerStudio
          initialTemplate={activeTemplate}
          onOpenOrderModal={(dataToOrder, tplToOrder) => {
            setCustomData(dataToOrder);
            setActiveTemplate(tplToOrder);
            setIsOrderModalOpen(true);
          }}
          onBackToHome={() => setCurrentView('landing')}
          onViewAsRecipient={(dataToView, tplToView) => {
            setCustomData(dataToView);
            setActiveTemplate(tplToView);
            setCurrentView('recipient');
          }}
        />

        {/* Order / Pricing Modal with WhatsApp checkout */}
        <OrderPaymentModal
          isOpen={isOrderModalOpen}
          onClose={() => setIsOrderModalOpen(false)}
          data={customData}
          template={activeTemplate}
          onSimulatePaymentSuccess={handleSimulatePaymentSuccess}
        />
      </>
    );
  }

  // VIEW 3: MAIN LANDING PAGE
  return (
    <div className="min-h-screen bg-[#FCF9F7] text-[#2C2125] font-sans antialiased overflow-x-hidden selection:bg-rose-200 selection:text-rose-900">
      {/* Sticky Navigation Bar */}
      <Navbar
        onOpenCreateModal={() => handleOpenStudio()}
        onExploreTemplates={handleExploreTemplates}
        onOpenNovelPrototype={handleOpenNovelPrototype}
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Section */}
        <Hero
          onOpenCreateModal={() => handleOpenStudio()}
          onExploreTemplates={handleExploreTemplates}
          onScrollToPreview={handleScrollToPreview}
        />

        {/* Featured Prototype Banner: OUR STORY Editorial Romance Novel */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-6 mb-16 relative z-10">
          <div
            onClick={handleOpenNovelPrototype}
            className="group relative overflow-hidden rounded-3xl bg-[#0E1726] border border-[#C5A880]/30 p-6 sm:p-8 shadow-2xl hover:shadow-[#C5A880]/15 hover:border-[#C5A880]/60 transition-all duration-300 cursor-pointer flex flex-col md:flex-row items-center justify-between gap-6"
            style={{
              backgroundImage: 'radial-gradient(circle at 90% 10%, rgba(197, 168, 128, 0.12) 0%, transparent 60%)',
            }}
          >
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="w-14 h-14 rounded-2xl bg-[#C5A880]/15 border border-[#C5A880]/40 flex items-center justify-center text-[#C5A880] shrink-0 group-hover:scale-105 transition-transform shadow-lg">
                <BookOpen className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C5A880] font-bold">
                    NEW THEME PROTOTYPE
                  </span>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#C5A880]/20 text-[#FAF8F5] border border-[#C5A880]/30 font-medium">
                    Cohesive Presentation Board
                  </span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl text-[#FAF8F5] font-normal tracking-wide">
                  “OUR STORY” — Contemporary Romance Novel
                </h3>
                <p className="text-xs sm:text-sm text-[#94A3B8] max-w-xl leading-relaxed">
                  Dedicated story for <strong className="text-[#C5A880]">Adinda & Mas L</strong> • Navy hardcover mockup, open-book interior spread, stylized biner chat, first date memoir, and timeline.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto justify-end">
              <button className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#C5A880] hover:bg-[#D4AF37] text-[#0E1726] font-semibold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-black/30 group-hover:translate-x-0.5 cursor-pointer">
                <span>View Presentation Board</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 2. Interactive Recipient Phone Experience */}
        <InteractivePreview />

        {/* 3. What Can You Create? (6 Moments Grid) */}
        <MomentsGrid
          onSelectMoment={handleSelectMomentFromGrid}
          onOpenCreateWithCategory={handleOpenStudioWithCategory}
        />

        {/* 4. Curated Template Showcase */}
        <TemplateShowcase
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onPreviewTemplate={(template) => setPreviewingTemplate(template)}
          onUseTemplate={(template) => handleOpenStudio(template)}
        />

        {/* 5. How It Works (4 Simple Steps) */}
        <HowItWorks onOpenCreateModal={() => handleOpenStudio()} />

        {/* 6. Emotional & Value Section ("Why DLYS Exists") */}
        <EmotionalValue />

        {/* 7. Final Call to Action */}
        <FinalCta
          onOpenCreateModal={() => handleOpenStudio()}
          onExploreTemplates={handleExploreTemplates}
        />
      </main>

      {/* 8. Footer */}
      <Footer
        onOpenCreateModal={() => handleOpenStudio()}
        onExploreTemplates={handleExploreTemplates}
        onOpenAdmin={() => setCurrentView('admin')}
      />

      {/* Interactive Modal: Live Template Recipient View */}
      <TemplatePreviewModal
        template={previewingTemplate}
        onClose={() => setPreviewingTemplate(null)}
        onUseTemplate={(template) => {
          setPreviewingTemplate(null);
          handleOpenStudio(template);
        }}
      />

      {/* Order / Pricing Modal */}
      <OrderPaymentModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        data={customData}
        template={activeTemplate}
        onSimulatePaymentSuccess={handleSimulatePaymentSuccess}
      />
    </div>
  );
}

export default App;
