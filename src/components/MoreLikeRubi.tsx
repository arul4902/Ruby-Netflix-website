import React from 'react';
import { MORE_LIKE_RUBI, type Episode } from '../data/customer';
import { Play } from 'lucide-react';

interface MoreLikeRubiProps {
  onPlayEpisode: (item: Episode) => void;
  onSelectEpisode: (item: Episode) => void;
}

export const MoreLikeRubi: React.FC<MoreLikeRubiProps> = ({
  onPlayEpisode,
  onSelectEpisode,
}) => {
  return (
    <section className="relative my-10 sm:my-14 px-4 sm:px-8 md:px-12 lg:px-16 select-none">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-1 h-6 bg-[#E50914] rounded-full" />
        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-wide flex items-center gap-2">
          <span>More Like Rubi</span>
          <span className="text-xs font-bold text-[#E50914] bg-[#E50914]/15 px-2 py-0.5 rounded border border-[#E50914]/30">
            Curated Arcs
          </span>
        </h2>
      </div>
      <p className="text-xs sm:text-sm text-[#B3B3B3] mb-6">
        Recommended storylines based on your favorite main character traits.
      </p>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
        {MORE_LIKE_RUBI.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectEpisode(item)}
            className="group relative rounded-xl overflow-hidden bg-zinc-900 border border-white/10 hover:border-white/40 shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer flex flex-col aspect-[3/4]"
          >
            {/* Image Thumbnail with alternate crop */}
            <img
              src={item.image}
              alt={item.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover object-[center_20%] group-hover:scale-110 transition-transform duration-500 filter brightness-[0.88] group-hover:brightness-100"
            />

            {/* Bottom Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

            {/* Hover Play Button */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPlayEpisode(item);
                }}
                className="w-10 h-10 rounded-full bg-[#E50914] text-white flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform"
                title="Play"
              >
                <Play size={18} className="fill-white ml-0.5" />
              </button>
            </div>

            {/* Top Badge */}
            <div className="relative z-10 p-2.5">
              {item.badge && (
                <span className="px-1.5 py-0.5 bg-[#E50914] text-white text-[9px] font-black uppercase rounded shadow">
                  {item.badge}
                </span>
              )}
            </div>

            {/* Bottom Details */}
            <div className="relative z-10 p-3 mt-auto">
              <span className="text-[10px] font-black text-[#E50914] uppercase tracking-wider block mb-0.5">
                {item.tag}
              </span>
              <h3 className="text-xs sm:text-sm font-bold text-white leading-snug line-clamp-1">
                {item.title}
              </h3>
              <p className="text-[10px] text-[#B3B3B3] line-clamp-1 mt-0.5">
                {item.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
