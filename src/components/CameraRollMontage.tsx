import React, { useState, useRef } from 'react';
import {
  CUSTOMER_DATA,
  CAMERA_ROLL_MEMORIES,
  type CameraRollMemory,
} from '../data/customer';
import { RubishnaLogo } from './RubishnaLogo';
import {
  Camera,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  X,
  MapPin,
  Calendar,
  Heart,
  Maximize2,
} from 'lucide-react';

interface CameraRollMontageProps {
  onPlayEpisode?: (videoUrl: string, title: string) => void;
}

export const CameraRollMontage: React.FC<CameraRollMontageProps> = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedMemory, setSelectedMemory] = useState<CameraRollMemory | null>(
    null
  );
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  const { cameraRoll, creatorMode } = CUSTOMER_DATA;

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -380 : 380;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section
      id="camera-roll"
      className="relative my-14 sm:my-24 px-4 sm:px-8 md:px-12 lg:px-16 select-none"
    >
      {/* 1. CREATOR DREAM INTERLUDE: Scrolling Cinematic Statement */}
      <div className="relative rounded-2xl overflow-hidden bg-black border border-white/10 shadow-2xl p-8 sm:p-14 lg:p-20 text-center mb-16 sm:mb-20">
        {/* Background photo with heavy cinematic blur/vignette */}
        <div className="absolute inset-0 z-0">
          <img
            src={CUSTOMER_DATA.photos.hero}
            alt="Rubishna Dream Horizon"
            className="w-full h-full object-cover object-[center_30%] filter brightness-25 contrast-125 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/90" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(229,9,20,0.18)_0%,rgba(0,0,0,0.95)_70%)]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-black text-[#E50914] uppercase tracking-[0.3em] mb-4">
            <Sparkles size={16} />
            <span>The Dream Manifest</span>
          </div>

          <h3 className="font-cinematic text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tight leading-tight">
            &ldquo;Become a good influencer —
          </h3>
          <h3 className="font-cinematic text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white/90 uppercase tracking-tight leading-tight mt-2">
            or simply reach a place in life
          </h3>
          <h3 className="font-cinematic text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#E50914] uppercase tracking-tight leading-tight mt-2 drop-shadow-[0_0_25px_rgba(229,9,20,0.8)]">
            that makes all of this worth it.&rdquo;
          </h3>

          <p className="text-xs sm:text-sm text-[#B3B3B3] uppercase tracking-[0.25em] font-semibold mt-6">
            Rubishna • {creatorMode.subtitle}
          </p>
        </div>
      </div>

      {/* 2. RUBI'S CAMERA ROLL MONTAGE */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-white/10 gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-black text-[#E50914] uppercase tracking-widest mb-1.5">
            <Camera size={16} />
            <span>Original Film Reel • Behind The Lens</span>
          </div>
          <h2 className="font-cinematic text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight uppercase leading-none">
            {cameraRoll.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#B3B3B3] mt-2 max-w-xl">
            {cameraRoll.quote}
          </p>
        </div>

        {/* Horizontal Navigation Buttons */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-md"
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-md"
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Overlapping Memory Reel Track */}
      <div
        ref={scrollRef}
        className="flex gap-4 sm:gap-6 overflow-x-auto pb-6 pt-2 scrollbar-none snap-x snap-mandatory scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {CAMERA_ROLL_MEMORIES.map((memory, idx) => (
          <div
            key={memory.id}
            onClick={() => setSelectedMemory(memory)}
            className="group relative flex-shrink-0 w-64 sm:w-80 rounded-2xl overflow-hidden bg-[#181818] border border-white/10 hover:border-[#E50914] shadow-2xl transition-all duration-500 cursor-pointer snap-start transform hover:-translate-y-2 hover:scale-[1.02]"
          >
            {/* Media Canvas */}
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-black">
              <img
                src={memory.image}
                alt={memory.title}
                loading="lazy"
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108 filter brightness-95 group-hover:brightness-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/40 pointer-events-none" />

              {/* Memory Frame Overlays */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-bold text-white uppercase tracking-wider">
                <Calendar size={11} className="text-[#E50914]" />
                <span>{memory.date}</span>
              </div>

              {/* Like Button */}
              <button
                onClick={(e) => toggleLike(memory.id, e)}
                className="absolute top-3 right-3 p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white hover:text-[#E50914] transition-colors"
                title="Save Memory"
              >
                <Heart
                  size={14}
                  className={
                    likedMap[memory.id]
                      ? 'fill-[#E50914] text-[#E50914]'
                      : 'text-white'
                  }
                />
              </button>

              {/* Expand Hint Icon */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30 backdrop-blur-[1px]">
                <div className="p-3 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/40 shadow-xl">
                  <Maximize2 size={20} />
                </div>
              </div>

              {/* Bottom Tag Badge */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-white/80 font-medium">
                <span className="flex items-center gap-1">
                  <MapPin size={11} className="text-[#E50914]" />
                  <span>{memory.location}</span>
                </span>
                <span className="font-mono text-[10px] text-white/60">
                  0{idx + 1}/0{CAMERA_ROLL_MEMORIES.length}
                </span>
              </div>
            </div>

            {/* Information Pill */}
            <div className="p-4 bg-gradient-to-b from-[#181818] to-[#121212]">
              <h4 className="font-cinematic text-lg sm:text-xl font-bold text-white group-hover:text-[#E50914] transition-colors truncate">
                {memory.title}
              </h4>
              <p className="text-xs text-[#B3B3B3] line-clamp-2 mt-1 leading-relaxed">
                {memory.caption}
              </p>

              <div className="flex flex-wrap gap-1.5 mt-3 pt-2 border-t border-white/10">
                {memory.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-semibold text-white/70 px-2 py-0.5 rounded bg-white/5"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3. LIGHTBOX MEMORY MODAL */}
      {selectedMemory && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fadeIn select-none">
          <div className="relative max-w-3xl w-full bg-[#161616] border border-white/20 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
            {/* Close Button */}
            <button
              onClick={() => setSelectedMemory(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-[#E50914] text-white transition-all backdrop-blur-md"
            >
              <X size={20} />
            </button>

            {/* Left Image Viewport */}
            <div className="relative w-full md:w-1/2 aspect-[4/5] bg-black overflow-hidden">
              <img
                src={selectedMemory.image}
                alt={selectedMemory.title}
                className="w-full h-full object-cover object-center filter contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <RubishnaLogo variant="monogram" size="sm" />
                <span className="text-[11px] font-black uppercase tracking-wider text-white">
                  Camera Roll Original
                </span>
              </div>
            </div>

            {/* Right Information & Film Notes */}
            <div className="p-6 sm:p-8 md:w-1/2 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-[#E50914] uppercase tracking-wider mb-2">
                  <Sparkles size={14} />
                  <span>Memory Dossier</span>
                </div>

                <h3 className="font-cinematic text-2xl sm:text-3xl font-extrabold text-white uppercase">
                  {selectedMemory.title}
                </h3>

                <div className="flex items-center gap-4 text-xs text-[#B3B3B3] my-3">
                  <span className="flex items-center gap-1">
                    <Calendar size={13} className="text-[#E50914]" />
                    <span>{selectedMemory.date}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={13} className="text-[#E50914]" />
                    <span>{selectedMemory.location}</span>
                  </span>
                </div>

                <blockquote className="text-sm sm:text-base text-white/90 italic border-l-2 border-[#E50914] pl-3 my-4 leading-relaxed">
                  &ldquo;{selectedMemory.caption}&rdquo;
                </blockquote>

                <div className="flex flex-wrap gap-1.5 mt-4">
                  {selectedMemory.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-bold uppercase text-white/80 px-2.5 py-1 rounded-full bg-white/10"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-white/10 mt-6 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-[#B3B3B3]">
                  Season 19 Archive
                </span>
                <button
                  onClick={() => setSelectedMemory(null)}
                  className="px-5 py-2 rounded bg-white text-black font-extrabold text-xs uppercase tracking-wider hover:bg-white/90 transition-all"
                >
                  Close Memory
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
