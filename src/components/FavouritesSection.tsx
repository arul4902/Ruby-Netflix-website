import React from 'react';
import { CUSTOMER_DATA, FAVOURITE_MOVIES } from '../data/customer';
import { useAudio } from '../context/AudioContext';
import { Film, Play, Pause, Star, Radio } from 'lucide-react';
import { uiSounds } from '../utils/soundEffects';

export const FavouritesSection: React.FC = () => {
  const { favouriteSong } = CUSTOMER_DATA;
  const {
    activeTrack,
    isPlaying,
    playTrack,
    togglePlay,
  } = useAudio();

  const isFavouritePlaying = isPlaying && activeTrack === 'favourite';

  const handleTogglePlaySong = () => {
    uiSounds.click();
    if (activeTrack !== 'favourite') {
      playTrack('favourite');
    } else {
      togglePlay();
    }
  };

  return (
    <section id="favourites" className="relative my-12 sm:my-16 px-4 sm:px-8 md:px-12 lg:px-16 select-none">
      {/* 1. Because Rubi Watched... Shelf */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-1 h-6 bg-[#E50914] rounded-full" />
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-wide flex items-center gap-2">
            <span>Because Rubi Watched...</span>
            <span className="text-xs font-bold text-[#E50914] bg-[#E50914]/15 px-2 py-0.5 rounded border border-[#E50914]/30">
              Personal Favourites
            </span>
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-[#B3B3B3] mb-6">
          The cinema, romance, emotion, and adrenaline that inspire Rubi's world.
        </p>

        {/* Custom Movie Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 sm:gap-5">
          {FAVOURITE_MOVIES.map((movie) => (
            <div
              key={movie.id}
              onClick={() => uiSounds.click()}
              onMouseEnter={() => uiSounds.hover()}
              className={`group relative rounded-xl p-4 sm:p-5 bg-gradient-to-br ${movie.accentGradient} border border-white/10 hover:border-white/40 shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer flex flex-col justify-between min-h-[170px] sm:min-h-[200px] overflow-hidden active:scale-95`}
            >
              {/* Film Grain Accent */}
              <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-white/5 filter blur-xl group-hover:scale-150 transition-transform" />
              <div className="absolute top-2 right-2 text-white/20 group-hover:text-white/40 transition-colors">
                <Film size={28} />
              </div>

              {/* Card Header & Badge */}
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] sm:text-xs font-black text-[#46d369] bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-sm border border-white/10">
                    {movie.matchScore}
                  </span>
                  <span className="text-[10px] text-white/70 font-semibold uppercase truncate">
                    {movie.mood}
                  </span>
                </div>

                <h3 className="font-cinematic text-2xl sm:text-3xl font-black text-white group-hover:text-[#E50914] transition-colors leading-tight drop-shadow-md">
                  {movie.title}
                </h3>
              </div>

              {/* Card Footer & Logline */}
              <div className="relative z-10 pt-3 border-t border-white/10 mt-2">
                <p className="text-[11px] sm:text-xs text-white/80 line-clamp-2 leading-relaxed font-normal">
                  {movie.logline}
                </p>
                <div className="flex items-center justify-between mt-2.5 text-[10px] sm:text-[11px] font-semibold text-white/60">
                  <span>{movie.genre}</span>
                  <span className="flex items-center gap-1 text-amber-400">
                    <Star size={11} className="fill-amber-400" />
                    {movie.rating}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. ON REPEAT Section: Hangova — Anirudh Ravichander */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#180a0b] via-[#141414] to-[#0e0e13] border border-red-900/40 p-6 sm:p-8 lg:p-10 shadow-2xl">
        {/* Ambient Glow */}
        <div className="absolute -top-20 right-10 w-80 h-80 bg-[#E50914]/20 rounded-full filter blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 lg:gap-10">
          {/* Left: Song details & Vinyl animation */}
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            {/* Spinning Vinyl Visual */}
            <div
              onClick={handleTogglePlaySong}
              onMouseEnter={() => uiSounds.hover()}
              className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-zinc-950 via-zinc-800 to-black border-4 border-zinc-900 shadow-2xl flex items-center justify-center group shrink-0 cursor-pointer transform hover:scale-105 active:scale-95 transition-all"
            >
              <div
                className={`w-full h-full rounded-full flex items-center justify-center ${
                  isFavouritePlaying ? 'animate-spin' : ''
                }`}
                style={{ animationDuration: '4s' }}
              >
                {/* Vinyl Grooves */}
                <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full border border-white/10 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center">
                    {/* Vinyl Center Label */}
                    <div className="w-9 h-9 rounded-full bg-[#E50914] flex items-center justify-center shadow-inner">
                      <div className="w-2.5 h-2.5 rounded-full bg-black" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Center Glow */}
              <div className="absolute inset-0 rounded-full bg-radial from-transparent to-black/60 pointer-events-none" />
            </div>

            {/* Song Meta */}
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1 text-xs font-bold text-[#E50914] uppercase tracking-widest">
                <Radio size={14} className="animate-pulse" />
                <span>SPECIAL RELEASE • SELF-LOVE ANTHEM</span>
              </div>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                {favouriteSong.title}
              </h3>

              <p className="text-sm sm:text-base font-semibold text-[#B3B3B3] mt-0.5">
                {favouriteSong.artist}
              </p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-2 text-xs text-white/70">
                <span className="px-2.5 py-0.5 rounded bg-white/10 font-medium">{favouriteSong.genre}</span>
                <span>•</span>
                <span className="px-2.5 py-0.5 rounded bg-white/10 font-medium">{favouriteSong.vibe}</span>
                <span>•</span>
                <span className="text-[#E50914] font-bold">Rubi's Anthem</span>
              </div>
            </div>
          </div>

          {/* Right: Controls & Equalizer */}
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Animated Equalizer Bars */}
            <div className="flex items-end gap-1.5 h-10 px-3 py-1 bg-black/40 rounded-lg border border-white/10">
              <div
                className={`w-1.5 bg-[#E50914] rounded-t transition-all ${
                  isFavouritePlaying ? 'eq-bar-1 animate-pulse' : 'h-2 opacity-30'
                }`}
              />
              <div
                className={`w-1.5 bg-[#E50914] rounded-t transition-all ${
                  isFavouritePlaying ? 'eq-bar-2 animate-pulse' : 'h-3 opacity-30'
                }`}
              />
              <div
                className={`w-1.5 bg-[#FF3B30] rounded-t transition-all ${
                  isFavouritePlaying ? 'eq-bar-3 animate-pulse' : 'h-2 opacity-30'
                }`}
              />
              <div
                className={`w-1.5 bg-[#E50914] rounded-t transition-all ${
                  isFavouritePlaying ? 'eq-bar-4 animate-pulse' : 'h-4 opacity-30'
                }`}
              />
              <div
                className={`w-1.5 bg-[#B80710] rounded-t transition-all ${
                  isFavouritePlaying ? 'eq-bar-5 animate-pulse' : 'h-2 opacity-30'
                }`}
              />
            </div>

            {/* Play/Pause Button */}
            <button
              onClick={handleTogglePlaySong}
              onMouseEnter={() => uiSounds.hover()}
              className="flex items-center gap-2.5 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-[#E50914] hover:bg-[#b80710] text-white font-bold text-xs sm:text-sm tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(229,9,20,0.5)] transform hover:scale-105 active:scale-95"
            >
              {isFavouritePlaying ? (
                <Pause size={17} className="fill-white" />
              ) : (
                <Play size={17} className="fill-white ml-0.5" />
              )}
              <span>{isFavouritePlaying ? 'Pause Song' : 'Play நானாக இருப்பதே'}</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
