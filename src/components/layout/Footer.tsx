import { Heart } from 'lucide-react';

interface FooterProps {
  onOpenCreateModal: () => void;
  onExploreTemplates: () => void;
  onOpenAdmin?: () => void;
}

export const Footer = ({
  onOpenCreateModal,
  onExploreTemplates,
  onOpenAdmin,
}: FooterProps) => {
  return (
    <footer className="border-t border-rose-100 bg-[#FAF7F5] pt-16 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-rose-100/70">
          
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-linear-to-br from-rose-500 to-rose-700 flex items-center justify-center text-white shadow-xs">
                <Heart className="w-4 h-4 fill-white text-white" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-[#2B1B21]">
                DLYS
              </span>
            </div>
            <p className="font-handwriting text-lg text-rose-700">
              "Turn feelings into something you can share."
            </p>
            <p className="text-xs sm:text-sm text-[#66545C] max-w-sm leading-relaxed">
              DLYS is a platform for creating beautiful, personalized, interactive web pages for meaningful moments — love letters, anniversaries, birthday surprises, proposals, and digital romantic gifts.
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#2E1D25]">
              Moments
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#614F57]">
              <li>
                <a href="#moments" className="hover:text-rose-600 transition-colors">
                  Love Letters with Wax Seal
                </a>
              </li>
              <li>
                <a href="#moments" className="hover:text-rose-600 transition-colors">
                  Anniversary Milestones
                </a>
              </li>
              <li>
                <a href="#moments" className="hover:text-rose-600 transition-colors">
                  Birthday Surprises
                </a>
              </li>
              <li>
                <a href="#moments" className="hover:text-rose-600 transition-colors">
                  Proposal & Forever Pages
                </a>
              </li>
              <li>
                <a href="#moments" className="hover:text-rose-600 transition-colors">
                  Digital Love Coupons
                </a>
              </li>
            </ul>
          </div>

          {/* Product & About */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#2E1D25]">
              Experience
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#614F57]">
              <li>
                <a href="#preview" className="hover:text-rose-600 transition-colors">
                  Interactive Live Preview
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-rose-600 transition-colors">
                  How DLYS Works
                </a>
              </li>
              <li>
                <a href="#why-dlys" className="hover:text-rose-600 transition-colors">
                  Our Philosophy
                </a>
              </li>
              <li>
                <button
                  onClick={onExploreTemplates}
                  className="hover:text-rose-600 transition-colors cursor-pointer text-left"
                >
                  Browse All Templates
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenCreateModal}
                  className="text-rose-600 font-semibold hover:text-rose-700 transition-colors cursor-pointer text-left"
                >
                  Create Something Special →
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Note */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7F6B75]">
          <div className="flex items-center gap-3">
            <p>© {new Date().getFullYear()} DLYS (Dear Love, Yours). All rights reserved.</p>
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="text-[11px] text-stone-400 hover:text-rose-700 transition-colors cursor-pointer"
                title="Portal Rahasia DLYS Team"
              >
                • Admin Portal ⚡
              </button>
            )}
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <span>Crafted with love for the moments that matter</span>
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 inline" />
          </div>
        </div>

      </div>
    </footer>
  );
};
