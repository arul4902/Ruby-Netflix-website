import React, { useState, useEffect } from 'react';
import { CUSTOMER_DATA } from '../data/customer';
import { Trophy, X, Check, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';

interface EasterEggModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EasterEggModal: React.FC<EasterEggModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [photoIndex, setPhotoIndex] = useState(0);
  const photos = [
    {
      src: CUSTOMER_DATA.photos.hero,
      title: 'Night Rim Light Confidence',
      quote: 'Main Character Energy: 100%',
    },
    {
      src: CUSTOMER_DATA.photos.profile,
      title: 'Campus Corridor Sass',
      quote: '19 • Chaos in heels & college uniform',
    },
    {
      src: CUSTOMER_DATA.photos.softEra,
      title: 'Lilac Reverie & Grace',
      quote: 'Not every episode needs chaos. Some are simply about becoming.',
    },
  ];

  useEffect(() => {
    if (!isOpen) return;

    // Confetti fanfare
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.5 },
      colors: ['#E50914', '#ffffff', '#FFD700', '#FFA500', '#FF3B30'],
    });

    // Auto cycle through the 3 photos
    const interval = setInterval(() => {
      setPhotoIndex((prev) => (prev + 1) % photos.length);
    }, 1800);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentPhoto = photos[photoIndex];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 animate-fadeIn select-none"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl bg-[#141414] border-2 border-[#E50914] rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(229,9,20,0.6)] flex flex-col items-center text-center p-6 sm:p-10"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-[#E50914] text-white transition-all backdrop-blur-md"
        >
          <X size={18} />
        </button>

        {/* Ambient Gold/Crimson Pulse */}
        <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#E50914]/20 via-transparent to-transparent pointer-events-none" />

        {/* Trophy Badge */}
        <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-[#E50914] flex items-center justify-center text-white shadow-2xl mb-4 animate-bounce">
          <Trophy size={32} />
        </div>

        {/* Achievement Title */}
        <p className="relative z-10 text-xs sm:text-sm font-black uppercase tracking-[0.35em] text-amber-400 drop-shadow-md">
          Achievement Unlocked
        </p>
        <h2 className="relative z-10 font-cinematic text-3xl sm:text-5xl font-black text-white uppercase tracking-tight my-2">
          # MAIN CHARACTER ENERGY
        </h2>
        <p className="relative z-10 text-xs sm:text-sm text-[#B3B3B3] max-w-md mb-6 font-medium">
          You discovered Rubishna's hidden &ldquo;19&rdquo; secret! Here is the
          exclusive mini memory reel celebrating Season 19.
        </p>

        {/* Mini Montage Card */}
        <div className="relative z-10 w-full max-w-md aspect-[4/5] rounded-xl overflow-hidden border-2 border-white/20 shadow-2xl mb-6">
          <img
            src={currentPhoto.src}
            alt={currentPhoto.title}
            className="w-full h-full object-cover object-top transition-all duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

          {/* Top Stamp */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[10px] font-black uppercase text-amber-400">
            <Flame size={12} />
            <span>Archive 19 • Frame 0{photoIndex + 1}</span>
          </div>

          {/* Bottom Title & Quote */}
          <div className="absolute bottom-4 left-4 right-4 text-left">
            <h4 className="font-cinematic text-2xl font-black text-white uppercase drop-shadow-md">
              {currentPhoto.title}
            </h4>
            <p className="text-xs sm:text-sm text-white/90 italic mt-0.5 leading-snug">
              &ldquo;{currentPhoto.quote}&rdquo;
            </p>
          </div>
        </div>

        {/* Photo Navigation Indicators */}
        <div className="relative z-10 flex items-center gap-2 mb-6">
          {photos.map((_, i) => (
            <button
              key={i}
              onClick={() => setPhotoIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                photoIndex === i ? 'w-8 bg-[#E50914]' : 'w-2 bg-white/20'
              }`}
            />
          ))}
        </div>

        {/* Claim Glory Button */}
        <button
          onClick={onClose}
          className="relative z-10 flex items-center gap-2 px-8 py-3.5 rounded-md bg-[#E50914] hover:bg-[#b80710] text-white font-black text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(229,9,20,0.6)] transition-all transform hover:scale-105 active:scale-95"
        >
          <Check size={16} />
          <span>Claim Glory & Return</span>
        </button>
      </div>
    </div>
  );
};
