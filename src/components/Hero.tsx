import React from 'react';
import { CUSTOMER_DATA } from '../data/customer';
import { RubishnaLogo } from './RubishnaLogo';
import { RubiRatingBadge } from './RubiRatingBadge';
import { Play, Info, Dices, Volume2, VolumeX } from 'lucide-react';

interface HeroProps {
  onPlay: () => void;
  onMoreInfo: () => void;
  onSurpriseMe?: () => void;
  onUnlockEasterEgg?: () => void;
  isMuted?: boolean;
  onToggleMute?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onPlay,
  onMoreInfo,
  onSurpriseMe,
  onUnlockEasterEgg,
  isMuted = false,
  onToggleMute,
}) => {
  return (
    <section
      id="home"
      className="relative w-full min-h-[90vh] md:min-h-screen flex items-end pb-16 sm:pb-24 lg:pb-32 px-6 sm:px-12 md:px-16 lg:px-20 overflow-hidden select-none"
    >
      {/* Background Image Container with Ken Burns Slow Zoom */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-black">
        <img
          src={CUSTOMER_DATA.photos.hero}
          alt={`${CUSTOMER_DATA.name} - The Main Character`}
          fetchPriority="high"
          className="w-full h-full object-cover object-[center_20%] md:object-[78%_25%] lg:object-[82%_20%] animate-kenburns transition-transform duration-1000 will-change-transform"
        />

        {/* Multi-Layer Cinematic Gradients */}
        {/* Layer 1: Left Dark Gradient for Crystal-Clear Text Readability on Desktop */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/85 via-45% to-transparent hidden md:block" />

        {/* Layer 2: Mobile Vignette to keep face visible while texts are legible */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/60 via-40% to-transparent md:hidden" />

        {/* Layer 3: Top Vignette for Navbar readability */}
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-black/80 via-black/30 to-transparent" />

        {/* Layer 4: Deep Bottom Gradient blending into streaming shelves */}
        <div className="absolute bottom-0 inset-x-0 h-48 sm:h-64 bg-gradient-to-t from-[#141414] via-[#141414]/90 to-transparent" />

        {/* Subtle Crimson Ambient Lighting glow on the edge */}
        <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-[#E50914]/15 rounded-full filter blur-[120px] pointer-events-none" />
      </div>

      {/* Hero Content Information Left Block */}
      <div className="relative z-10 max-w-2xl lg:max-w-3xl flex flex-col items-start pt-24 sm:pt-32">
        {/* Rubishna Original Tag & Fictional Certification Badge */}
        <div className="flex flex-wrap items-center gap-2.5 mb-3 sm:mb-4">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-black/60 backdrop-blur-md border border-white/10 text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase text-white shadow-lg">
            <RubishnaLogo variant="monogram" size="sm" />
            <span className="text-[#E50914] font-black">RUBISHNA</span>
            <span className="text-white/80">ORIGINAL</span>
          </div>

          <RubiRatingBadge
            size="sm"
            onUnlockEasterEgg={onUnlockEasterEgg}
          />
        </div>

        {/* Cinematic Grand Titles */}
        <h1 className="font-cinematic text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white font-extrabold tracking-tight uppercase leading-[0.88] drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/90">
            {CUSTOMER_DATA.nickname}
          </span>
          <span className="block text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white/95 tracking-wide font-normal mt-1 text-[#E50914]">
            THE MAIN CHARACTER
          </span>
        </h1>

        {/* Metadata Pill Line with Clickable Hidden 19 Easter Egg */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm font-semibold text-[#B3B3B3] my-3 sm:my-4">
          <span className="text-[#46d369] font-black tracking-wider">99% Match</span>
          <span className="text-white/40">•</span>

          {/* Hidden Clickable "19" Easter Egg Trigger */}
          <button
            onClick={onUnlockEasterEgg}
            className="group/egg relative px-2 py-0.5 border border-white/30 hover:border-[#E50914] hover:bg-[#E50914]/20 text-[11px] text-white/90 rounded uppercase tracking-wider transition-all cursor-pointer"
            title="Easter Egg? Click to reveal"
          >
            <span>{CUSTOMER_DATA.age}</span>
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#E50914] animate-ping group-hover/egg:opacity-100 opacity-60" />
          </button>

          <span className="text-white/40">•</span>
          <span>2026</span>
          <span className="text-white/40">•</span>
          <span>1 Season</span>
          <span className="text-white/40">•</span>
          <span className="px-1.5 py-0.5 bg-white/10 text-white rounded text-[11px] uppercase tracking-wider">
            College Life
          </span>
          <span className="hidden sm:inline-block px-1.5 py-0.5 border border-white/20 text-[10px] text-white/70 rounded">
            Ultra HD 4K
          </span>
        </div>

        {/* Hero Logline / Customer Supplied Quote */}
        <blockquote className="text-sm sm:text-base md:text-lg text-white/90 font-medium leading-relaxed max-w-xl italic drop-shadow-md mb-6 sm:mb-8 border-l-2 border-[#E50914] pl-3">
          &ldquo;Fashion. Laughs. Real moments. And a story that&apos;s only getting started.&rdquo;
        </blockquote>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
          {/* Play My Story Button */}
          <button
            onClick={onPlay}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3 sm:py-3.5 bg-white hover:bg-white/90 text-black font-extrabold text-sm sm:text-base rounded-md transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-[0_4px_20px_rgba(255,255,255,0.3)]"
          >
            <Play size={20} className="fill-black text-black" />
            <span className="tracking-wide">Play My Story</span>
          </button>

          {/* More Info Button */}
          <button
            onClick={onMoreInfo}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-2.5 px-6 sm:px-8 py-3 sm:py-3.5 bg-[#6d6d6e]/60 hover:bg-[#6d6d6e]/80 text-white font-bold text-sm sm:text-base rounded-md transition-all duration-200 backdrop-blur-md transform hover:scale-105 active:scale-95 border border-white/20"
          >
            <Info size={20} />
            <span className="tracking-wide">More Info</span>
          </button>

          {/* Innovation: Surprise Me Button */}
          {onSurpriseMe && (
            <button
              onClick={onSurpriseMe}
              className="flex items-center justify-center gap-2 px-4 py-3 sm:py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold text-sm sm:text-base rounded-md transition-all duration-200 backdrop-blur-md transform hover:scale-105 active:scale-95 border border-white/20"
              title="Pick a random episode"
            >
              <Dices size={20} className="text-[#E50914]" />
              <span className="hidden sm:inline">Surprise Me</span>
            </button>
          )}
        </div>
      </div>

      {/* Floating Audio / Sound Ambient Indicator on bottom right (Desktop) */}
      {onToggleMute && (
        <div className="hidden sm:flex absolute right-8 sm:right-12 bottom-24 sm:bottom-28 z-20 items-center gap-3">
          <button
            onClick={onToggleMute}
            className="p-3 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 text-white backdrop-blur-md shadow-xl transition-all transform hover:scale-110 active:scale-95"
            title={isMuted ? 'Unmute Experience' : 'Mute Experience'}
            aria-label={isMuted ? 'Unmute experience audio' : 'Mute experience audio'}
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
        </div>
      )}
    </section>
  );
};
