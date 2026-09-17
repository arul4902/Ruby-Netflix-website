import React, { useState, useEffect } from 'react';
import {
  CONTINUE_WATCHING,
  COLLEGE_ERA_EPISODES,
  CREATOR_MODE_ITEMS,
  FAVOURITE_MOVIES,
  MORE_LIKE_RUBI,
  type Episode,
} from '../data/customer';
import { Search, X, Play } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlayEpisode: (ep: Episode) => void;
  onSelectEpisode: (ep: Episode) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onPlayEpisode,
  onSelectEpisode,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const allSearchableEpisodes: Episode[] = [
    ...CONTINUE_WATCHING,
    ...COLLEGE_ERA_EPISODES,
    ...CREATOR_MODE_ITEMS,
    ...MORE_LIKE_RUBI,
  ];

  // Filter episodes
  const filteredEpisodes = query.trim()
    ? allSearchableEpisodes.filter(
        (ep) =>
          ep.title.toLowerCase().includes(query.toLowerCase()) ||
          ep.description.toLowerCase().includes(query.toLowerCase()) ||
          (ep.tag && ep.tag.toLowerCase().includes(query.toLowerCase()))
      )
    : allSearchableEpisodes.slice(0, 6);

  // Filter movies
  const filteredMovies = query.trim()
    ? FAVOURITE_MOVIES.filter(
        (m) =>
          m.title.toLowerCase().includes(query.toLowerCase()) ||
          m.genre.toLowerCase().includes(query.toLowerCase()) ||
          m.logline.toLowerCase().includes(query.toLowerCase())
      )
    : FAVOURITE_MOVIES.slice(0, 4);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-modal-title"
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col p-4 sm:p-8 md:p-12 overflow-y-auto select-none animate-in fade-in duration-200"
    >
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-6">
        {/* Search Header Input */}
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/15">
          <div className="flex-1 flex items-center gap-3">
            <Search size={24} className="text-[#E50914] shrink-0" />
            <input
              type="text"
              autoFocus
              placeholder="Search episodes, college eras, outfits, favourites..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-xl sm:text-2xl md:text-3xl text-white placeholder:text-white/40 focus:outline-none font-medium"
            />
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors shrink-0"
            aria-label="Close search"
          >
            <X size={22} />
          </button>
        </div>

        {/* Results Sections */}
        <div className="flex flex-col gap-8 py-4">
          {/* Episode Results */}
          <div>
            <h3 id="search-modal-title" className="text-xs font-black uppercase tracking-[0.2em] text-[#E50914] mb-3">
              {query ? `Episodes & Highlights (${filteredEpisodes.length})` : 'Popular Searches For Rubi'}
            </h3>

            {filteredEpisodes.length === 0 ? (
              <p className="text-sm text-[#B3B3B3] py-4">No matching episodes found.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredEpisodes.map((ep) => (
                  <div
                    key={ep.id}
                    onClick={() => {
                      onSelectEpisode(ep);
                      onClose();
                    }}
                    className="group p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/30 transition-all cursor-pointer flex gap-3.5 items-center"
                  >
                    <div className="relative w-24 aspect-video rounded overflow-hidden bg-black shrink-0">
                      <img src={ep.image} alt={ep.title} className="w-full h-full object-cover" />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onPlayEpisode(ep);
                          onClose();
                        }}
                        className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Play"
                      >
                        <Play size={16} className="fill-white" />
                      </button>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-[#E50914] font-black uppercase">
                          {ep.tag || 'Rubi'}
                        </span>
                        <span className="text-[10px] text-[#B3B3B3]">
                          {ep.duration}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-white group-hover:text-[#E50914] transition-colors truncate">
                        {ep.title}
                      </h4>
                      <p className="text-xs text-[#B3B3B3] line-clamp-1 mt-0.5">
                        {ep.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Favourite Movies Matches */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white/70 mb-3">
              Matching Cinema & Shows
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {filteredMovies.map((mv) => (
                <div
                  key={mv.id}
                  className="p-3.5 rounded-lg bg-white/5 border border-white/10 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold text-[#46d369]">{mv.matchScore}</span>
                    <h4 className="font-cinematic text-lg text-white font-bold mt-1">{mv.title}</h4>
                  </div>
                  <p className="text-[10px] text-[#B3B3B3] mt-2 line-clamp-2">{mv.logline}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
