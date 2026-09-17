import React from 'react';
import { CUSTOMER_DATA } from '../data/customer';
import { RubishnaLogo } from './RubishnaLogo';
import { Sparkles, Flame, Play } from 'lucide-react';

interface MeetRubiProps {
  onPlayTrailer?: () => void;
}

export const MeetRubi: React.FC<MeetRubiProps> = ({ onPlayTrailer }) => {
  const { meetRubi, photos, instagramBio1, instagramBio2 } = CUSTOMER_DATA;

  return (
    <section id="my-story" className="relative my-12 sm:my-16 px-4 sm:px-8 md:px-12 lg:px-16 select-none">
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-[#1b1b1b] via-[#141414] to-black border border-white/10 shadow-2xl p-6 sm:p-10 lg:p-14">
        {/* Ambient Red Lighting Orb */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#E50914]/15 rounded-full filter blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-red-950/20 rounded-full filter blur-[80px] pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Spotlight Portrait */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm aspect-[4/5] rounded-xl overflow-hidden border-2 border-white/20 shadow-[0_10px_40px_rgba(0,0,0,0.8)] group">
              <img
                src={photos.profile}
                alt="Rubi - The Main Character"
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

              {/* Top Banner inside portrait */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/60 backdrop-blur-md border border-white/20 text-[11px] font-black uppercase text-white">
                <RubishnaLogo variant="monogram" size="sm" />
                <span>ORIGINAL CASTING</span>
              </div>

              {/* Bottom tag inside portrait */}
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-xs text-[#B3B3B3] uppercase tracking-wider font-semibold">
                  Instagram Dossier
                </p>
                <p className="text-sm font-bold text-white tracking-wide">
                  &ldquo;{instagramBio1}&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Bio & Main Character Breakdown */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Super-Header */}
            <div className="flex items-center gap-2 mb-2 text-[#E50914] font-black text-xs sm:text-sm tracking-[0.25em] uppercase">
              <Sparkles size={16} />
              <span>{meetRubi.title}</span>
            </div>

            {/* Main Headline */}
            <h2 className="font-cinematic text-4xl sm:text-6xl md:text-7xl font-extrabold text-white uppercase tracking-tight leading-none mb-4">
              {meetRubi.headline}
            </h2>

            {/* Direct Customer Body Quote */}
            <div className="bg-white/5 border-l-4 border-[#E50914] p-4 sm:p-5 rounded-r-lg my-2 max-w-xl backdrop-blur-sm">
              <p className="text-base sm:text-lg md:text-xl font-medium text-white/95 leading-relaxed italic">
                &ldquo;{meetRubi.bodyQuote}&rdquo;
              </p>
            </div>

            {/* Secondary Positioning line */}
            <div className="flex items-center gap-2 mt-3 text-xs sm:text-sm font-bold tracking-widest text-[#B3B3B3] uppercase">
              <Flame size={14} className="text-[#E50914]" />
              <span>{instagramBio2}</span>
            </div>

            {/* Tags Pills */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 my-6">
              {meetRubi.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3.5 py-1.5 rounded-full text-xs font-black tracking-wider uppercase bg-[#E50914]/15 border border-[#E50914]/40 text-white hover:bg-[#E50914] hover:text-white transition-colors duration-200"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Main Character Stats Grid & Trailer Button */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-xl pt-4 border-t border-white/10">
              {meetRubi.stats.map((stat, idx) => (
                <div key={idx} className="bg-black/40 border border-white/10 p-3 rounded-lg flex flex-col">
                  <span className="text-[10px] text-[#B3B3B3] uppercase tracking-wider font-semibold">
                    {stat.label}
                  </span>
                  <span className="text-base sm:text-lg font-bold text-white mt-0.5 truncate">
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>

            {onPlayTrailer && (
              <button
                onClick={onPlayTrailer}
                className="mt-6 flex items-center gap-2 px-5 py-2.5 bg-[#E50914] hover:bg-[#b80710] text-white font-bold text-xs uppercase tracking-wider rounded transition-all shadow-md transform hover:scale-105"
              >
                <Play size={14} className="fill-white" />
                <span>Watch Character Teaser</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
