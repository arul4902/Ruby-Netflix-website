import React, { useRef, useState, useEffect } from 'react';
import type { Episode } from '../data/customer';
import { MediaCard } from './MediaCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ContentRowProps {
  id?: string;
  title: string;
  subtitle?: string;
  badge?: string;
  items: Episode[];
  onPlay: (item: Episode) => void;
  onSelect: (item: Episode) => void;
  aspectRatio?: '16:9' | '9:16' | '1:1';
}

export const ContentRow: React.FC<ContentRowProps> = ({
  id,
  title,
  subtitle,
  badge,
  items,
  onPlay,
  onSelect,
  aspectRatio = '16:9',
}) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!rowRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [items]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (!rowRef.current) return;
    const scrollAmount = rowRef.current.clientWidth * 0.75;
    rowRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section id={id} className="relative my-6 sm:my-8 px-4 sm:px-8 md:px-12 lg:px-16 select-none group/row">
      {/* Shelf Header */}
      <div className="flex items-baseline justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-1 h-5 sm:h-6 bg-[#E50914] rounded-full" />
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white tracking-wide flex items-center gap-2">
            {title}
            {badge && (
              <span className="text-[10px] sm:text-xs font-black px-2 py-0.5 rounded bg-[#E50914]/20 border border-[#E50914] text-[#E50914] uppercase tracking-wider">
                {badge}
              </span>
            )}
          </h2>
        </div>

        {subtitle && (
          <span className="hidden sm:block text-xs font-medium text-[#B3B3B3]">
            {subtitle}
          </span>
        )}
      </div>

      {/* Shelf Container with Arrow Controls */}
      <div className="relative">
        {/* Left Scroll Button */}
        {canScrollLeft && (
          <button
            onClick={() => handleScroll('left')}
            className="hidden md:flex absolute -left-4 top-0 bottom-0 z-30 w-12 bg-black/70 hover:bg-black/90 text-white items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity backdrop-blur-sm rounded-r"
            aria-label="Scroll left"
          >
            <ChevronLeft size={28} />
          </button>
        )}

        {/* Scrollable Track */}
        <div
          ref={rowRef}
          onScroll={checkScroll}
          className="flex items-center gap-3 sm:gap-4 overflow-x-auto overflow-y-visible py-4 hide-scrollbar smooth-shelf"
          style={{ scrollPaddingLeft: '1rem', scrollPaddingRight: '1rem' }}
        >
          {items.map((item) => (
            <MediaCard
              key={item.id}
              item={item}
              onPlay={onPlay}
              onSelect={onSelect}
              aspectRatio={aspectRatio}
            />
          ))}
        </div>

        {/* Right Scroll Button */}
        {canScrollRight && (
          <button
            onClick={() => handleScroll('right')}
            className="hidden md:flex absolute -right-4 top-0 bottom-0 z-30 w-12 bg-black/70 hover:bg-black/90 text-white items-center justify-center opacity-0 group-hover/row:opacity-100 transition-opacity backdrop-blur-sm rounded-l"
            aria-label="Scroll right"
          >
            <ChevronRight size={28} />
          </button>
        )}
      </div>
    </section>
  );
};
