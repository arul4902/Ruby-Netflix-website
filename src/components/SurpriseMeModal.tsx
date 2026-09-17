import React, { useState, useEffect } from 'react';
import {
  CONTINUE_WATCHING,
  COLLEGE_ERA_EPISODES,
  CREATOR_MODE_ITEMS,
  type Episode,
} from '../data/customer';
import { RubishnaLogo } from './RubishnaLogo';
import { Dices, Play, RotateCcw, X, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SurpriseMeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlayEpisode: (episode: Episode) => void;
}

export const SurpriseMeModal: React.FC<SurpriseMeModalProps> = ({
  isOpen,
  onClose,
  onPlayEpisode,
}) => {
  const allEpisodes: Episode[] = [
    ...CONTINUE_WATCHING,
    ...COLLEGE_ERA_EPISODES,
    ...CREATOR_MODE_ITEMS,
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isShuffling, setIsShuffling] = useState(true);
  const [selectedWinner, setSelectedWinner] = useState<Episode | null>(null);

  const startShuffle = () => {
    setIsShuffling(true);
    setSelectedWinner(null);

    let speed = 60;
    let stepCount = 0;
    const totalSteps = 24;

    const interval = () => {
      setCurrentIndex((prev) => (prev + 1) % allEpisodes.length);
      stepCount++;

      if (stepCount < totalSteps) {
        speed += 12; // Slow down toward the end
        setTimeout(interval, speed);
      } else {
        // Pick random winner
        const winnerIndex = Math.floor(Math.random() * allEpisodes.length);
        setCurrentIndex(winnerIndex);
        setSelectedWinner(allEpisodes[winnerIndex]);
        setIsShuffling(false);

        // Confetti Celebration
        confetti({
          particleCount: 70,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#E50914', '#ffffff', '#FFD700', '#FF3B30'],
        });
      }
    };

    setTimeout(interval, speed);
  };

  useEffect(() => {
    if (isOpen) {
      startShuffle();
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentEp = allEpisodes[currentIndex];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn select-none"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-[#181818] border-2 border-white/20 rounded-2xl overflow-hidden shadow-2xl flex flex-col items-center text-center p-6 sm:p-8"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-[#E50914] text-white transition-all backdrop-blur-md"
        >
          <X size={18} />
        </button>

        {/* Header Ribbon */}
        <div className="flex items-center gap-2 mb-3">
          <RubishnaLogo variant="monogram" size="sm" />
          <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.25em] text-[#E50914]">
            <Dices size={16} className={isShuffling ? 'animate-spin' : ''} />
            <span>Random Episode Roulette</span>
          </div>
        </div>

        <h3 className="font-cinematic text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
          {isShuffling ? 'Selecting A Rubi Memory...' : 'Memory Selected!'}
        </h3>
        <p className="text-xs text-[#B3B3B3] mt-1 mb-6">
          {isShuffling
            ? 'Scanning through seasons, campus halls, and reels...'
            : 'Your random episode is ready to stream.'}
        </p>

        {/* Slot Display Frame */}
        <div
          className={`relative w-full aspect-video rounded-xl overflow-hidden border-2 transition-all duration-300 shadow-2xl ${
            isShuffling
              ? 'border-white/20 scale-98'
              : 'border-[#E50914] scale-100 ring-4 ring-[#E50914]/30'
          }`}
        >
          <img
            src={currentEp.image}
            alt={currentEp.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

          {/* Winner Crown Tag */}
          {!isShuffling && (
            <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E50914] text-white text-[11px] font-black uppercase tracking-wider shadow-lg animate-bounce">
              <Trophy size={13} />
              <span>Streaming Pick</span>
            </div>
          )}

          <div className="absolute bottom-3 left-3 right-3 text-left">
            <span className="text-[10px] font-black uppercase tracking-wider text-[#E50914] bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm border border-white/10">
              {currentEp.tag || 'Episode Special'}
            </span>
            <h4 className="font-cinematic text-2xl font-black text-white uppercase mt-1 leading-tight drop-shadow-md">
              {currentEp.title}
            </h4>
            <p className="text-xs text-white/80 line-clamp-1 mt-0.5">
              {currentEp.subtitle || currentEp.description}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-3 w-full mt-8">
          <button
            onClick={startShuffle}
            disabled={isShuffling}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-md bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/20 transition-all disabled:opacity-50"
          >
            <RotateCcw size={15} />
            <span>Spin Again</span>
          </button>

          {selectedWinner && (
            <button
              onClick={() => {
                onClose();
                onPlayEpisode(selectedWinner);
              }}
              className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-md bg-[#E50914] hover:bg-[#b80710] text-white font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(229,9,20,0.6)] transition-all transform hover:scale-105 active:scale-95"
            >
              <Play size={16} className="fill-white" />
              <span>Watch Now</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
