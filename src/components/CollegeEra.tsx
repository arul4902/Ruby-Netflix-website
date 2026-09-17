import React from 'react';
import { COLLEGE_ERA_EPISODES, type Episode } from '../data/customer';
import { Play, GraduationCap, Video } from 'lucide-react';

interface CollegeEraProps {
  onPlayEpisode: (episode: Episode) => void;
}

export const CollegeEra: React.FC<CollegeEraProps> = ({ onPlayEpisode }) => {
  return (
    <section id="college-era" className="relative my-10 sm:my-14 px-4 sm:px-8 md:px-12 lg:px-16 select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-2 border-b border-white/10 gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#E50914] uppercase tracking-widest mb-1">
            <GraduationCap size={16} />
            <span>Campus Chronicles</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
            <span>COLLEGE ERA</span>
            <span className="text-xs sm:text-sm font-bold bg-[#E50914] text-white px-2.5 py-0.5 rounded uppercase tracking-wider">
              2nd Year • 2026
            </span>
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#B3B3B3] max-w-md leading-relaxed">
          The lectures, the squad laughter, fest season at Yugam 2026, and all the chaos between classes.
        </p>
      </div>

      {/* Grid of College Era Episodes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {COLLEGE_ERA_EPISODES.map((ep, idx) => (
          <div
            key={ep.id}
            onClick={() => onPlayEpisode(ep)}
            className="group relative bg-[#1c1c1c] rounded-xl overflow-hidden border border-white/10 hover:border-white/40 shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer flex flex-col"
          >
            {/* Thumbnail Poster with 16:9 ratio */}
            <div className="relative aspect-video w-full overflow-hidden bg-black">
              <img
                src={ep.image}
                alt={ep.title}
                loading="lazy"
                className="w-full h-full object-cover object-[center_30%] transition-transform duration-700 ease-out group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

              {/* Play Badge Icon Overlay on Hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[1px]">
                <div className="w-12 h-12 rounded-full bg-[#E50914] text-white flex items-center justify-center shadow-2xl transform scale-75 group-hover:scale-100 transition-transform">
                  <Play size={20} className="fill-white ml-0.5" />
                </div>
              </div>

              {/* Top Badge */}
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="px-2 py-0.5 bg-black/70 backdrop-blur-md text-[10px] font-bold text-white uppercase rounded border border-white/15">
                  Ep. {idx + 1}
                </span>
                {ep.badge && (
                  <span className="px-2 py-0.5 bg-[#E50914] text-[10px] font-black text-white uppercase rounded shadow">
                    {ep.badge}
                  </span>
                )}
              </div>

              {/* Duration Tag */}
              <div className="absolute bottom-2.5 right-3 text-[11px] font-bold text-white bg-black/80 px-2 py-0.5 rounded border border-white/10">
                {ep.duration}
              </div>
            </div>

            {/* Episode Meta Block */}
            <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-gradient-to-b from-[#181818] to-[#121212]">
              <div>
                <div className="flex items-center justify-between text-xs text-[#E50914] font-semibold mb-1">
                  <span>{ep.tag}</span>
                  <span className="text-[#B3B3B3] text-[11px]">2026</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#E50914] transition-colors leading-snug">
                  {ep.title}
                </h3>
                {ep.subtitle && (
                  <p className="text-xs text-[#B3B3B3] font-medium mt-0.5 line-clamp-1">
                    {ep.subtitle}
                  </p>
                )}
                <p className="text-xs text-[#B3B3B3]/80 mt-2.5 line-clamp-2 leading-relaxed">
                  {ep.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-white/70 group-hover:text-white">
                <span className="flex items-center gap-1.5">
                  <Video size={13} className="text-[#E50914]" />
                  <span>Click to Stream Episode</span>
                </span>
                <span className="text-[11px] uppercase tracking-wider text-[#B3B3B3]">
                  Watch Now &rarr;
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
