import React from 'react';

interface RubishnaLogoProps {
  variant?: 'monogram' | 'full' | 'stacked';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  className?: string;
}

export const RubishnaLogo: React.FC<RubishnaLogoProps> = ({
  variant = 'full',
  size = 'md',
  animated = false,
  className = '',
}) => {
  // Height and scale mappings
  const sizeMap = {
    sm: { icon: 28, text: 'text-lg', gap: 'gap-2' },
    md: { icon: 38, text: 'text-2xl', gap: 'gap-3' },
    lg: { icon: 56, text: 'text-4xl', gap: 'gap-4' },
    xl: { icon: 90, text: 'text-6xl', gap: 'gap-5' },
  };

  const currentSize = sizeMap[size];

  // Ribbon "R" Monogram SVG with multi-layered depth, folded ribbon planes, and crimson glow
  const RibbonR = (
    <svg
      width={currentSize.icon}
      height={currentSize.icon}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${animated ? 'animate-ribbon-glow' : 'drop-shadow-[0_0_12px_rgba(229,9,20,0.7)]'} transition-transform hover:scale-105 duration-300`}
    >
      <defs>
        {/* Main Ribbon Gradient */}
        <linearGradient id="ribbonRedMain" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF1E27" />
          <stop offset="50%" stopColor="#E50914" />
          <stop offset="100%" stopColor="#B30710" />
        </linearGradient>

        {/* Shaded Fold Gradient */}
        <linearGradient id="ribbonRedShadow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#800006" />
          <stop offset="100%" stopColor="#4A0003" />
        </linearGradient>

        {/* Diagonal Leg Gradient */}
        <linearGradient id="ribbonRedLeg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF333B" />
          <stop offset="100%" stopColor="#E50914" />
        </linearGradient>

        {/* Light Shimmer Clip */}
        <clipPath id="monogramClip">
          <path d="M22 10 H52 C74 10, 84 22, 84 38 C84 52, 74 62, 54 63 L82 92 H62 L38 64 H36 V92 H22 V10 Z M36 24 V50 H52 C64 50, 70 45, 70 38 C70 29, 64 24, 52 24 Z" />
        </clipPath>
      </defs>

      {/* Monogram Outer Glow Filter Backing */}
      <circle cx="50" cy="50" r="46" fill="rgba(229, 9, 20, 0.15)" filter="blur(16px)" />

      {/* Ribbon Spine (Left Stem) */}
      <path
        d="M22 10 H36 V92 H22 Z"
        fill="url(#ribbonRedMain)"
      />

      {/* Ribbon Loop (Curved Upper Right with fold illusion) */}
      <path
        d="M36 10 H56 C76 10, 84 22, 84 38 C84 52, 74 63, 52 63 H36 V50 H52 C64 50, 70 45, 70 38 C70 29, 63 23, 52 23 H36 V10 Z"
        fill="url(#ribbonRedMain)"
      />

      {/* Shadow Under the Ribbon Intersection */}
      <path
        d="M36 50 H52 L42 63 H36 Z"
        fill="url(#ribbonRedShadow)"
      />

      {/* Ribbon Dynamic Leg (Diagonal swoosh extending downward right) */}
      <path
        d="M45 54 L72 92 H56 L34 62 L45 54 Z"
        fill="url(#ribbonRedLeg)"
      />

      {/* Inner Accent Highlight Line */}
      <path
        d="M24 12 H34 V90 H24 Z"
        fill="white"
        opacity="0.18"
      />

      {/* Animated Light Sweep Overlay */}
      {animated && (
        <rect
          x="-100"
          y="0"
          width="60"
          height="100"
          fill="rgba(255, 255, 255, 0.4)"
          clipPath="url(#monogramClip)"
          className="animate-light-sweep"
        />
      )}
    </svg>
  );

  if (variant === 'monogram') {
    return <div className={`inline-flex items-center justify-center ${className}`}>{RibbonR}</div>;
  }

  return (
    <div className={`inline-flex items-center ${currentSize.gap} select-none ${className}`}>
      {RibbonR}
      <span
        className={`font-cinematic tracking-widest text-white font-extrabold uppercase ${currentSize.text} leading-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]`}
      >
        <span className="text-[#E50914]">RUBI</span>SHNA
      </span>
    </div>
  );
};
