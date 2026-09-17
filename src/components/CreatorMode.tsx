import React from 'react';
import { CUSTOMER_DATA, CREATOR_MODE_ITEMS, type Episode } from '../data/customer';
import { Flame, Play, Target } from 'lucide-react';

interface CreatorModeProps {
  onPlayReel: (item: Episode) => void;
}

export const CreatorMode: React.FC<CreatorModeProps> = ({ onPlayReel }) => {
  const { creatorMode } = CUSTOMER_DATA;

  return (
    <section id="creator-mode" className="relative my-12 sm:my-16 px-4 sm:px-8 md:px-12 lg:px-16 select-none">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-white/10 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-black text-[#E50914] uppercase tracking-widest mb-1.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#E50914]">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
            </svg>
            <span>Content Creator Feed • 9:16 Cinematic</span>
          </div>
          <h2 className="font-cinematic text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight uppercase leading-none">
            {creatorMode.title}
          </h2>
          <p className="text-sm sm:text-base font-medium text-white/90 mt-2 italic">
            &ldquo;{creatorMode.subtitle}&rdquo;
          </p>
        </div>

        {/* Creator Stats */}
        <div className="flex items-center gap-3">
          {creatorMode.stats.map((st, i) => (
            <div key={i} className="px-3.5 py-2 rounded-lg bg-white/5 border border-white/10 text-center">
              <span className="block text-sm sm:text-base font-black text-white">{st.metric}</span>
              <span className="block text-[10px] text-[#B3B3B3] uppercase tracking-wider">{st.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Goal Callout Box */}
      <div className="relative mb-8 p-5 sm:p-6 rounded-xl bg-gradient-to-r from-red-950/40 via-black to-zinc-950 border border-[#E50914]/40 shadow-xl overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#E50914]/15 rounded-full filter blur-[70px] pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#E50914] flex items-center justify-center text-white shrink-0 shadow-lg">
            <Target size={24} />
          </div>
          <div>
            <span className="text-[11px] font-black tracking-widest text-[#E50914] uppercase">
              The North Star Vision
            </span>
            <p className="text-base sm:text-lg md:text-xl font-bold text-white leading-snug mt-0.5">
              &ldquo;{creatorMode.goalQuote}&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* Vertical 9:16 Cards Carousel / Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-5">
        {CREATOR_MODE_ITEMS.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => onPlayReel(item)}
            className="group relative aspect-[9/16] rounded-xl overflow-hidden bg-black border border-white/10 hover:border-white/40 shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer flex flex-col justify-between p-3.5"
          >
            {/* Background 9:16 Media */}
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110 filter brightness-[0.92] group-hover:brightness-100"
            />

            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/60 pointer-events-none" />

            {/* Top Badges */}
            <div className="relative z-10 flex items-center justify-between w-full">
              <span className="px-2 py-0.5 bg-black/60 backdrop-blur-md text-[10px] font-bold text-white rounded border border-white/20">
                0{idx + 1}
              </span>
              {item.badge && (
                <span className="px-2 py-0.5 bg-[#E50914] text-[10px] font-black uppercase text-white rounded shadow-md">
                  {item.badge}
                </span>
              )}
            </div>

            {/* Hover Center Play Button */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 backdrop-blur-[1px]">
              <div className="w-12 h-12 rounded-full bg-[#E50914] text-white flex items-center justify-center shadow-2xl transform scale-75 group-hover:scale-100 transition-transform">
                <Play size={22} className="fill-white ml-0.5" />
              </div>
            </div>

            {/* Bottom Meta & Views */}
            <div className="relative z-10 pt-2">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase text-[#E50914] mb-1">
                <Flame size={12} />
                <span>{item.tag}</span>
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-white line-clamp-2 leading-snug">
                {item.title}
              </h3>
              <p className="text-[10px] text-[#B3B3B3] font-medium mt-1">
                {item.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
