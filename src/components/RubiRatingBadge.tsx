import React, { useState } from 'react';
import { CUSTOMER_DATA } from '../data/customer';
import { Sparkles, Info } from 'lucide-react';

interface RubiRatingBadgeProps {
  size?: 'sm' | 'md' | 'lg';
  showDescriptors?: boolean;
  interactive?: boolean;
  onUnlockEasterEgg?: () => void;
  className?: string;
}

export const RubiRatingBadge: React.FC<RubiRatingBadgeProps> = ({
  size = 'md',
  showDescriptors = true,
  interactive = true,
  onUnlockEasterEgg,
  className = '',
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const { rubiRating } = CUSTOMER_DATA;

  const sizeClasses = {
    sm: 'text-[10px] px-1.5 py-0.5 gap-1',
    md: 'text-xs px-2 py-0.5 gap-1.5',
    lg: 'text-sm px-3 py-1 gap-2',
  };

  const badgeBoxSize = {
    sm: 'text-[9px] px-1 py-0.2',
    md: 'text-[10px] px-1.5 py-0.5',
    lg: 'text-xs px-2 py-0.5',
  };

  const handleClick = (e: React.MouseEvent) => {
    if (onUnlockEasterEgg) {
      e.stopPropagation();
      onUnlockEasterEgg();
    }
  };

  return (
    <div
      className={`relative inline-flex items-center group select-none ${className}`}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div
        onClick={handleClick}
        className={`flex items-center bg-black/60 backdrop-blur-md border border-white/25 rounded-md font-bold uppercase tracking-wider text-white shadow-lg transition-all duration-200 ${
          sizeClasses[size]
        } ${interactive ? 'cursor-pointer hover:border-[#E50914] hover:bg-black/80 hover:scale-105 active:scale-95' : ''}`}
        title="Rubishna Content Certification"
      >
        {/* Certification Box */}
        <span
          className={`font-black bg-[#E50914] text-white rounded font-cinematic tracking-tight ${badgeBoxSize[size]}`}
        >
          {rubiRating.badge}
        </span>

        {/* Inline Descriptors if enabled */}
        {showDescriptors && (
          <span className="text-[#B3B3B3] font-medium hidden sm:inline-block tracking-normal text-[11px]">
            {rubiRating.descriptors.join(' • ')}
          </span>
        )}

        <Info size={size === 'sm' ? 10 : 12} className="text-white/40 group-hover:text-white/80 transition-colors" />
      </div>

      {/* Floating Tooltip Explaining Fictional Badge */}
      {showTooltip && (
        <div className="absolute bottom-full left-0 mb-2 w-64 p-3 rounded-lg bg-[#181818] border border-white/20 shadow-2xl z-50 text-left pointer-events-none animate-fadeIn">
          <div className="flex items-center gap-1.5 text-[#E50914] text-[11px] font-black uppercase tracking-wider mb-1">
            <Sparkles size={12} />
            <span>Fictional Content Rating</span>
          </div>
          <p className="text-xs text-white font-semibold leading-snug">
            {rubiRating.description}
          </p>
          <div className="mt-2 pt-2 border-t border-white/10 flex flex-wrap gap-1">
            {rubiRating.descriptors.map((desc) => (
              <span
                key={desc}
                className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-white/90 font-medium"
              >
                #{desc}
              </span>
            ))}
          </div>
          <p className="text-[9px] text-[#B3B3B3] mt-1.5 italic">
            Certified 100% Main Character Energy
          </p>
        </div>
      )}
    </div>
  );
};
