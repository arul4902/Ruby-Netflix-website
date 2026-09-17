import React, { useState } from 'react';
import type { Episode } from '../data/customer';
import { Play, Plus, Check, ThumbsUp, ChevronDown } from 'lucide-react';
import { uiSounds } from '../utils/soundEffects';

interface MediaCardProps {
  item: Episode;
  onPlay: (item: Episode) => void;
  onSelect: (item: Episode) => void;
  aspectRatio?: '16:9' | '9:16' | '1:1';
}

export const MediaCard: React.FC<MediaCardProps> = ({
  item,
  onPlay,
  onSelect,
  aspectRatio = '16:9',
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const isVertical = aspectRatio === '9:16';

  return (
    <div
      className={`relative group shrink-0 select-none rounded-md transition-all duration-300 ${
        isVertical
          ? 'w-44 sm:w-52 md:w-60 aspect-[9/16]'
          : 'w-60 sm:w-72 md:w-80 lg:w-96 aspect-video'
      }`}
      onMouseEnter={() => {
        setIsHovered(true);
        uiSounds.hover();
      }}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Base Card Frame */}
      <div
        onClick={() => {
          uiSounds.click();
          onSelect(item);
        }}
        className="w-full h-full rounded-md overflow-hidden cursor-pointer relative bg-zinc-900 border border-white/10 shadow-lg group-hover:border-white/40 transition-colors"
      >
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className={`w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 ${
            isVertical ? 'object-center' : 'object-[center_25%]'
          }`}
        />

        {/* Ambient Dark Bottom Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10">
          {item.badge && (
            <span className="px-2 py-0.5 bg-[#E50914] text-white text-[10px] font-black tracking-wider uppercase rounded shadow-md">
              {item.badge}
            </span>
          )}
          {item.tag && !item.badge && (
            <span className="px-2 py-0.5 bg-black/60 backdrop-blur-md text-white/90 text-[10px] font-bold tracking-wide uppercase rounded border border-white/15">
              {item.tag}
            </span>
          )}
        </div>

        {/* Top Right Duration Tag */}
        <div className="absolute top-2.5 right-2.5 z-10">
          <span className="px-1.5 py-0.5 bg-black/70 backdrop-blur-md text-[10px] font-semibold text-white/80 rounded border border-white/10">
            {item.duration}
          </span>
        </div>

        {/* Bottom Basic Meta Preview (visible before hover) */}
        <div className="absolute bottom-3 inset-x-3.5 z-10">
          <h3 className="font-bold text-sm sm:text-base text-white truncate drop-shadow-md">
            {item.title}
          </h3>
          {item.subtitle && (
            <p className="text-[11px] text-[#B3B3B3] truncate mt-0.5">
              {item.subtitle}
            </p>
          )}

          {/* Progress Bar (if watched / in progress) */}
          {item.progress !== undefined && (
            <div className="mt-2 w-full h-1 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#E50914] transition-all duration-300 rounded-full"
                style={{ width: `${item.progress}%` }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Interactive Expanded Card Overlay on Desktop Hover */}
      {isHovered && (
        <div
          className={`hidden md:flex flex-col justify-between absolute -top-8 -left-4 -right-4 z-40 bg-[#181818] rounded-lg shadow-[0_15px_40px_rgba(0,0,0,0.9)] border border-white/20 overflow-hidden transform scale-105 transition-all duration-200 p-3.5 animate-in fade-in zoom-in-95 ${
            isVertical ? '-bottom-8' : '-bottom-12'
          }`}
        >
          {/* Top Preview Image */}
          <div
            onClick={() => onPlay(item)}
            className={`relative w-full rounded overflow-hidden cursor-pointer ${
              isVertical ? 'h-48' : 'h-36'
            }`}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/25 flex items-center justify-center hover:bg-black/10 transition-colors">
              <div className="w-11 h-11 rounded-full bg-white/90 text-black flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
                <Play size={20} className="fill-black ml-0.5" />
              </div>
            </div>
            {item.progress !== undefined && (
              <div className="absolute bottom-0 inset-x-0 h-1 bg-white/20">
                <div
                  className="h-full bg-[#E50914]"
                  style={{ width: `${item.progress}%` }}
                />
              </div>
            )}
          </div>

          {/* Action Row & Metadata */}
          <div className="pt-3 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              {/* Left Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onPlay(item)}
                  className="w-8 h-8 rounded-full bg-white hover:bg-white/90 text-black flex items-center justify-center shadow-md transition-transform active:scale-90"
                  title="Play Episode"
                >
                  <Play size={15} className="fill-black ml-0.5" />
                </button>

                <button
                  onClick={() => setIsAdded(!isAdded)}
                  className="w-8 h-8 rounded-full border border-white/40 hover:border-white text-white/80 hover:text-white flex items-center justify-center transition-colors"
                  title={isAdded ? 'Remove from My List' : 'Add to My List'}
                >
                  {isAdded ? <Check size={14} className="text-[#E50914]" /> : <Plus size={14} />}
                </button>

                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className="w-8 h-8 rounded-full border border-white/40 hover:border-white text-white/80 hover:text-white flex items-center justify-center transition-colors"
                  title={isLiked ? 'Liked' : 'Rate High'}
                >
                  <ThumbsUp size={14} className={isLiked ? 'text-[#E50914] fill-[#E50914]' : ''} />
                </button>
              </div>

              {/* Right Details Chevron */}
              <button
                onClick={() => onSelect(item)}
                className="w-8 h-8 rounded-full border border-white/40 hover:border-white text-white/80 hover:text-white flex items-center justify-center transition-colors"
                title="Episode Information"
              >
                <ChevronDown size={16} />
              </button>
            </div>

            {/* Match & Specs */}
            <div className="flex items-center gap-2 text-[11px] font-semibold text-white/80">
              <span className="text-[#46d369] font-black">{item.matchScore || '99% Match'}</span>
              <span className="px-1 py-0.5 border border-white/30 text-[9px] rounded text-white/90">
                {item.ageRating || '16+'}
              </span>
              <span>{item.duration}</span>
              <span className="border border-white/20 px-1 py-0.2 rounded text-[9px] text-white/70">
                HD
              </span>
            </div>

            {/* Description Snippet */}
            <p className="text-[11px] text-[#B3B3B3] line-clamp-2 leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
