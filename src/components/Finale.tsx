import React, { useState, useEffect } from 'react';
import { CUSTOMER_DATA } from '../data/customer';
import { RubishnaLogo } from './RubishnaLogo';
import { Sparkles, ArrowUp, Play, Star, X } from 'lucide-react';
import confetti from 'canvas-confetti';

interface FinaleProps {
  onReplayStory: () => void;
}

export const Finale: React.FC<FinaleProps> = ({ onReplayStory }) => {
  const { finale, photos } = CUSTOMER_DATA;
  const [showPostCreditPrompt, setShowPostCreditPrompt] = useState(false);
  const [showPostCreditModal, setShowPostCreditModal] = useState(false);

  // Trigger post-credit prompt after 3.5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPostCreditPrompt(true);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  const triggerCelebration = () => {
    confetti({
      particleCount: 90,
      spread: 80,
      origin: { y: 0.8 },
      colors: ['#E50914', '#ffffff', '#FF3B30', '#ffccd5', '#FFD700'],
    });
  };

  const handleOpenPostCredit = () => {
    setShowPostCreditModal(true);
    confetti({
      particleCount: 110,
      spread: 90,
      origin: { y: 0.5 },
      colors: ['#E50914', '#ffffff', '#FFD700', '#FF3B30'],
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative mt-20 pt-16 pb-28 bg-[#000000] border-t border-white/10 select-none overflow-hidden text-center">
      {/* Cinematic Transition Dark Backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#141414] via-[#080808] to-black" />

      {/* Ambient Red Rim Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[750px] h-[380px] bg-[#E50914]/15 rounded-full filter blur-[160px] pointer-events-none" />

      {/* 19 Subtle Background Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 19 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-[#E50914] opacity-30 animate-pulse"
            style={{
              width: `${(i % 3) + 2}px`,
              height: `${(i % 3) + 2}px`,
              top: `${(i * 17) % 95}%`,
              left: `${(i * 23) % 95}%`,
              animationDuration: `${2 + (i % 4)}s`,
              animationDelay: `${(i * 0.2)}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 flex flex-col items-center">
        {/* Large Centered Monogram */}
        <div className="mb-6">
          <RubishnaLogo variant="monogram" size="lg" animated />
        </div>

        {/* Season 19 Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-black uppercase tracking-[0.3em] text-white mb-4">
          <span className="w-2 h-2 rounded-full bg-[#E50914] animate-ping" />
          <span>
            {finale.season} • {finale.status}
          </span>
        </div>

        {/* Highlight Image Capsule using Favourite Photo #3 */}
        <div className="relative my-6 w-48 sm:w-56 aspect-[3/4] rounded-2xl overflow-hidden border-2 border-white/20 shadow-[0_0_50px_rgba(229,9,20,0.4)] group">
          <img
            src={photos.hero}
            alt="Rubi Season 19 Finale"
            className="w-full h-full object-cover object-[78%_20%] filter contrast-105 transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
          <div className="absolute bottom-3 inset-x-2 text-center">
            <span className="text-[11px] font-black uppercase text-white tracking-widest">
              Rubishna • 2026
            </span>
          </div>
        </div>

        {/* Core Ending Quote */}
        <h2 className="font-cinematic text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight uppercase leading-none my-3 max-w-2xl">
          &ldquo;{finale.mainQuote}&rdquo;
        </h2>

        {/* Teaser */}
        <p className="font-cinematic text-2xl sm:text-3xl tracking-[0.25em] text-[#E50914] font-black uppercase mb-8">
          {finale.teaser}
        </p>

        {/* Action Button Row */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          <button
            onClick={onReplayStory}
            className="flex items-center gap-2.5 px-6 py-3 bg-[#E50914] hover:bg-[#b80710] text-white font-black text-sm tracking-wider uppercase rounded-md shadow-[0_0_25px_rgba(229,9,20,0.6)] transition-all transform hover:scale-105 active:scale-95"
          >
            <Play size={16} className="fill-white" />
            <span>Replay From Beginning</span>
          </button>

          <button
            onClick={triggerCelebration}
            className="flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-sm tracking-wider uppercase rounded-md border border-white/20 transition-all backdrop-blur-md"
          >
            <Sparkles size={16} className="text-[#E50914]" />
            <span>Celebrate Rubi</span>
          </button>

          <button
            onClick={scrollToTop}
            className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-md border border-white/20 transition-all"
            title="Back to top"
          >
            <ArrowUp size={18} />
          </button>
        </div>

        {/* Innovation: Post-Credit Scene Prompt ("Still watching?") */}
        {showPostCreditPrompt && (
          <div className="my-6 animate-fadeIn">
            <button
              onClick={handleOpenPostCredit}
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 hover:bg-white/10 border border-white/15 text-xs font-semibold tracking-widest text-[#B3B3B3] hover:text-white transition-all shadow-lg"
            >
              <span className="w-2 h-2 rounded-full bg-[#E50914] animate-pulse" />
              <span>Still watching?</span>
              <span className="text-[#E50914] text-[10px] font-black group-hover:translate-x-0.5 transition-transform">
                ▶
              </span>
            </button>
          </div>
        )}

        {/* Branding Sign-off */}
        <div className="pt-8 border-t border-white/15 w-full flex flex-col sm:flex-row items-center justify-between text-xs text-[#B3B3B3] gap-4">
          <div className="flex items-center gap-2">
            <span className="font-cinematic text-lg tracking-widest text-white font-bold">
              <span className="text-[#E50914]">RUBI</span>SHNA
            </span>
            <span>•</span>
            <span className="font-semibold text-white/90">
              {finale.branding}
            </span>
          </div>

          <div className="text-white/60 font-medium">{finale.credit}</div>
        </div>
      </div>

      {/* Innovation: Post-Credit Scene Modal */}
      {showPostCreditModal && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 animate-fadeIn select-none">
          <div className="relative w-full max-w-lg bg-[#141414] border-2 border-[#E50914] rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(229,9,20,0.7)] flex flex-col items-center text-center p-6 sm:p-8">
            <button
              onClick={() => setShowPostCreditModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-[#E50914] text-white transition-all backdrop-blur-md"
            >
              <X size={18} />
            </button>

            <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.25em] text-[#E50914] mb-3">
              <Star size={14} className="fill-[#E50914]" />
              <span>Post-Credit Scene</span>
            </div>

            <h3 className="font-cinematic text-2xl sm:text-4xl font-extrabold text-white uppercase leading-tight mb-2">
              &ldquo;Good. The best episodes haven&apos;t happened yet.&rdquo;
            </h3>

            <p className="text-xs text-[#B3B3B3] mb-6">
              Season 19 is just the opening chapter of Rubishna&apos;s story.
            </p>

            {/* Polaroid Capsule */}
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden border border-white/20 shadow-2xl mb-6">
              <img
                src={photos.profile}
                alt="Post-Credit Rubi"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-3 inset-x-3 text-center">
                <span className="text-xs font-black uppercase text-white tracking-widest">
                  Rubi • Season 20 Loading Soon
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowPostCreditModal(false)}
              className="px-6 py-2.5 rounded-md bg-[#E50914] text-white font-black text-xs uppercase tracking-wider shadow-lg hover:bg-[#b80710] transition-all"
            >
              Back to Universe
            </button>
          </div>
        </div>
      )}
    </footer>
  );
};
