import React, { useState, useEffect } from 'react';
import { CUSTOMER_DATA } from '../data/customer';
import { RubishnaLogo } from './RubishnaLogo';
import { Loader2, Hourglass, Sparkles } from 'lucide-react';

export const DreamsSection: React.FC = () => {
  const { dreams } = CUSTOMER_DATA;
  const [progress, setProgress] = useState(82);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev >= 96 ? 78 : prev + 1));
    }, 450);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="dreams"
      className="relative my-14 sm:my-24 px-4 sm:px-8 md:px-12 lg:px-16 select-none"
    >
      <div className="relative rounded-2xl overflow-hidden bg-black border border-red-900/40 p-8 sm:p-14 lg:p-20 shadow-2xl text-center flex flex-col items-center">
        {/* Glow ambient pulse */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-[#E50914]/15 rounded-full filter blur-[150px] pointer-events-none animate-pulse" />

        {/* Header Ribbon Monogram */}
        <div className="relative z-10 mb-5">
          <RubishnaLogo variant="monogram" size="lg" animated />
        </div>

        {/* Dynamic Title */}
        <div className="relative z-10 flex items-center gap-3 justify-center mb-3">
          <Loader2 size={26} className="text-[#E50914] animate-spin" />
          <h2 className="font-cinematic text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-widest uppercase">
            {dreams.title}
          </h2>
        </div>

        {/* Animated Loading Bar: "LOADING NEXT CHAPTER..." */}
        <div className="relative z-10 w-full max-w-xl my-6">
          <div className="flex items-center justify-between text-xs font-black uppercase text-[#B3B3B3] mb-2.5 tracking-widest">
            <span className="flex items-center gap-1.5 text-white">
              <Sparkles size={14} className="text-[#E50914]" />
              <span>LOADING NEXT CHAPTER...</span>
            </span>
            <span className="text-[#E50914] font-mono font-bold text-xs tracking-wider">
              Story loading…
            </span>
          </div>

          <div className="relative w-full h-3.5 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/20">
            <div
              className="h-full bg-gradient-to-r from-[#B30710] via-[#E50914] to-[#FF3B30] rounded-full transition-all duration-300 relative shadow-[0_0_20px_rgba(229,9,20,0.8)]"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute top-0 right-0 bottom-0 w-4 bg-white/70 rounded-full animate-pulse" />
            </div>
          </div>
        </div>

        {/* Prompt-mandated Copy Lines */}
        <div className="relative z-10 max-w-2xl my-6 space-y-1.5 text-lg sm:text-2xl md:text-3xl font-serif italic text-white/95 leading-relaxed">
          <p>She&apos;s still figuring it out.</p>
          <p>Still creating.</p>
          <p>Still learning.</p>
          <p className="text-[#E50914] font-semibold">Still becoming.</p>
        </div>

        {/* Next Episode Teaser Card */}
        <div className="relative z-10 mt-6 w-full max-w-md p-6 sm:p-8 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/20 shadow-2xl flex flex-col items-center">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.3em] text-[#E50914] mb-2">
            <Hourglass size={14} />
            <span>NEXT EPISODE</span>
          </div>

          <h3 className="font-cinematic text-3xl sm:text-5xl text-white font-extrabold tracking-wider uppercase">
            # {dreams.nextEpisodeTitle.toUpperCase()}
          </h3>

          <div className="mt-4 px-5 py-1.5 rounded-full bg-[#E50914] text-white text-xs font-black tracking-widest uppercase shadow-[0_0_20px_rgba(229,9,20,0.6)] animate-pulse">
            {dreams.status}
          </div>
        </div>
      </div>
    </section>
  );
};
