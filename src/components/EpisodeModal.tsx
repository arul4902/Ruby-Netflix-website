import React, { useEffect } from 'react';
import { type Episode, CUSTOMER_DATA, CONTINUE_WATCHING, COLLEGE_ERA_EPISODES } from '../data/customer';
import { RubishnaLogo } from './RubishnaLogo';
import { RubiRatingBadge } from './RubiRatingBadge';
import { X, Play, Plus, ThumbsUp } from 'lucide-react';

interface EpisodeModalProps {
  item: Episode | null;
  onClose: () => void;
  onPlayEpisode: (episode: Episode) => void;
}

export const EpisodeModal: React.FC<EpisodeModalProps> = ({
  item,
  onClose,
  onPlayEpisode,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    // Lock body scroll while modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!item) return null;

  const allEpisodes = [...CONTINUE_WATCHING, ...COLLEGE_ERA_EPISODES];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto select-none animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl bg-[#181818] rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.95)] border border-white/20 my-auto animate-in zoom-in-95 duration-200"
      >
        {/* Top Video / Hero Banner Frame */}
        <div className="relative aspect-video sm:aspect-[21/9] w-full bg-black overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover object-[center_25%]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#181818] via-[#181818]/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white flex items-center justify-center transition-colors border border-white/20 z-20"
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>

          {/* Action Row Inside Banner */}
          <div className="absolute bottom-6 left-6 right-6 z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <RubishnaLogo variant="monogram" size="sm" />
                <span className="text-[11px] font-black uppercase tracking-widest text-[#E50914] bg-black/60 px-2 py-0.5 rounded border border-white/10">
                  RUBISHNA ORIGINAL
                </span>
              </div>
              <h2 id="modal-title" className="font-cinematic text-3xl sm:text-5xl font-black text-white uppercase drop-shadow-lg leading-tight">
                {item.title}
              </h2>
              {item.subtitle && (
                <p className="text-xs sm:text-sm text-white/90 font-medium drop-shadow">
                  {item.subtitle}
                </p>
              )}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => onPlayEpisode(item)}
                className="flex items-center gap-2 px-6 py-2.5 bg-white hover:bg-white/90 text-black font-extrabold text-sm rounded transition-all shadow-lg transform hover:scale-105"
              >
                <Play size={18} className="fill-black ml-0.5" />
                <span>Stream</span>
              </button>

              <button
                className="w-10 h-10 rounded-full border border-white/40 hover:border-white bg-black/50 text-white flex items-center justify-center transition-colors"
                title="Add to My List"
              >
                <Plus size={18} />
              </button>

              <button
                className="w-10 h-10 rounded-full border border-white/40 hover:border-white bg-black/50 text-white flex items-center justify-center transition-colors"
                title="Rate"
              >
                <ThumbsUp size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Modal Body Info & Episodes List */}
        <div className="p-6 sm:p-8 flex flex-col gap-6">
          {/* Metadata Specs & Cast Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-6 border-b border-white/10">
            {/* Left 8 Cols: Overview */}
            <div className="md:col-span-8 flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-semibold text-white/80">
                <span className="text-[#46d369] font-black">{item.matchScore || '99% Match'}</span>
                <span>{item.year || '2026'}</span>
                <RubiRatingBadge size="sm" showDescriptors={false} />
                <span>{item.duration}</span>
                <span className="px-1.5 py-0.5 bg-white/10 rounded text-[11px] uppercase font-bold text-white">
                  Ultra 4K
                </span>
              </div>

              <p className="text-sm sm:text-base text-white/90 leading-relaxed font-normal">
                {item.description}
              </p>
            </div>

            {/* Right 4 Cols: Cast & Genre Tags */}
            <div className="md:col-span-4 flex flex-col gap-2 text-xs text-[#B3B3B3]">
              <p>
                <span className="text-white/60">Starring: </span>
                <span className="text-white font-semibold">{CUSTOMER_DATA.name} (Rubi)</span>
              </p>
              <p>
                <span className="text-white/60">Supporting Cast: </span>
                <span className="text-white font-semibold">Campus Squad & Besties</span>
              </p>
              <p>
                <span className="text-white/60">Genres: </span>
                <span className="text-white font-semibold">College Drama, Lifestyle, Comedy</span>
              </p>
              <p>
                <span className="text-white/60">Vibe: </span>
                <span className="text-white font-semibold">Main Character Energy</span>
              </p>
            </div>
          </div>

          {/* Episode Catalogue Row */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-cinematic text-2xl font-bold text-white tracking-wide uppercase">
                Season 19 Episodes
              </h3>
              <span className="text-xs text-[#B3B3B3] font-semibold">
                6 Episodes • College Arc
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {allEpisodes.slice(0, 5).map((ep, i) => (
                <div
                  key={ep.id}
                  onClick={() => onPlayEpisode(ep)}
                  className="group/ep flex items-center gap-4 p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all cursor-pointer"
                >
                  <span className="font-cinematic text-xl sm:text-2xl text-white/40 group-hover/ep:text-[#E50914] font-black w-6 text-center">
                    {i + 1}
                  </span>

                  <div className="relative w-28 sm:w-36 aspect-video rounded overflow-hidden shrink-0 bg-black">
                    <img
                      src={ep.image}
                      alt={ep.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover/ep:opacity-100 transition-opacity">
                      <Play size={16} className="fill-white text-white ml-0.5" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-2">
                      <h4 className="text-sm sm:text-base font-bold text-white truncate group-hover/ep:text-[#E50914] transition-colors">
                        {ep.title}
                      </h4>
                      <span className="text-xs text-[#B3B3B3] shrink-0 font-medium">
                        {ep.duration}
                      </span>
                    </div>
                    <p className="text-xs text-[#B3B3B3] line-clamp-1 sm:line-clamp-2 mt-1">
                      {ep.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
