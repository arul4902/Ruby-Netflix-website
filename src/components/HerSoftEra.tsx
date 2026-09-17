import React, { useState, useEffect } from 'react';
import { CUSTOMER_DATA } from '../data/customer';
import { Feather, Moon } from 'lucide-react';

export const HerSoftEra: React.FC = () => {
  const { softEra, photos } = CUSTOMER_DATA;
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Subtle Parallax offset calculation
  const parallaxOffset = (scrollY * 0.04) % 30;

  return (
    <section className="relative my-12 sm:my-20 px-4 sm:px-8 md:px-12 lg:px-16 select-none overflow-hidden">
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#17121b] via-[#141414] to-[#121319] border border-purple-900/30 shadow-2xl p-6 sm:p-10 lg:p-16">
        {/* Ambient Lilac / Purple Glow Orbs */}
        <div className="absolute top-0 right-1/4 w-[450px] h-[450px] bg-purple-900/15 rounded-full filter blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-[#E50914]/10 rounded-full filter blur-[100px] pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Poetic Narrative & Quote */}
          <div className="lg:col-span-7 flex flex-col items-start order-2 lg:order-1">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold tracking-[0.25em] text-purple-300 uppercase mb-2">
              <Feather size={16} />
              <span>Chapter 02 • Introspective Sequence</span>
            </div>

            <h2 className="font-cinematic text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight uppercase leading-none mb-4">
              {softEra.title}
            </h2>

            {/* Core Quote Box */}
            <div className="relative my-4 p-5 sm:p-6 rounded-xl bg-white/[0.04] backdrop-blur-md border border-purple-400/20 shadow-xl max-w-xl">
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-purple-500/20 border border-purple-300/40 flex items-center justify-center text-purple-200">
                <Moon size={14} />
              </div>
              <blockquote className="text-lg sm:text-xl md:text-2xl font-serif italic text-white/95 leading-relaxed">
                &ldquo;{softEra.quote}&rdquo;
              </blockquote>
              <p className="text-xs sm:text-sm text-purple-200/80 mt-3 font-medium">
                {softEra.subtext}
              </p>
            </div>

            {/* Aesthetic tags */}
            <div className="flex flex-wrap items-center gap-2.5 mt-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-950/50 border border-purple-700/40 text-purple-200">
                Lilac Silks
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-950/50 border border-purple-700/40 text-purple-200">
                Quiet Ambition
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-950/50 border border-purple-700/40 text-purple-200">
                Elegance & Grace
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-950/50 border border-purple-700/40 text-purple-200">
                Becoming Her
              </span>
            </div>
          </div>

          {/* Right Column: High-Res Soft Portrait with subtle Parallax */}
          <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
            <div
              className="relative w-full max-w-sm aspect-[4/5] rounded-2xl overflow-hidden border border-purple-400/30 shadow-[0_15px_50px_rgba(0,0,0,0.9)] group"
              style={{
                transform: `translateY(${parallaxOffset}px)`,
                transition: 'transform 0.2s ease-out',
              }}
            >
              <img
                src={photos.softEra}
                alt="Rubi - Her Soft Era"
                className="w-full h-full object-cover object-[center_35%] filter contrast-[1.03] transition-transform duration-1000 group-hover:scale-106"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-purple-950/30" />

              {/* Shimmer overlay */}
              <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/50" />

              <div className="absolute bottom-4 left-4 right-4 text-center">
                <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase bg-black/60 backdrop-blur-md text-white border border-white/20">
                  Portrait 01 • Lilac Reverie
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
