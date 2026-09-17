import React, { useState, useEffect, useRef } from 'react';
import { CUSTOMER_DATA } from '../data/customer';
import { RubishnaLogo } from './RubishnaLogo';
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  Sparkles,
  Smile,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface StoryTrailerProps {
  isOpen: boolean;
  onClose: () => void;
  onExploreEpisodes?: () => void;
}

interface TrailerScene {
  id: number;
  startTime: number;
  endTime: number;
  mediaType: 'image' | 'video' | 'black';
  mediaSrc?: string;
  tagline?: string;
  subtext?: string;
  filter?: string;
}

export const StoryTrailer: React.FC<StoryTrailerProps> = ({
  isOpen,
  onClose,
  onExploreEpisodes,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoElementRef = useRef<HTMLVideoElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [hasTriggeredConfetti, setHasTriggeredConfetti] = useState(false);

  // Skip Intro Easter Egg State
  const [hasAttemptedSkip, setHasAttemptedSkip] = useState(false);
  const [showSkipJoke, setShowSkipJoke] = useState(false);

  const TOTAL_DURATION = 32; // 32 seconds cinematic trailer

  const scenes: TrailerScene[] = [
    // Scene 0: Pitch Black & Bass Swell
    {
      id: 0,
      startTime: 0,
      endTime: 3.5,
      mediaType: 'black',
      tagline: 'Every story has a main character.',
      subtext: 'A Rubishna Original',
    },
    // Scene 1: Portrait Reveal - "She's 19."
    {
      id: 1,
      startTime: 3.5,
      endTime: 7.5,
      mediaType: 'image',
      mediaSrc: CUSTOMER_DATA.photos.profile,
      tagline: "She's 19.",
      subtext: 'Second-year student • Creator in progress',
    },
    // Scene 2: Campus Chronicles Video - "Somewhere between college..."
    {
      id: 2,
      startTime: 7.5,
      endTime: 12.0,
      mediaType: 'video',
      mediaSrc: '/videos/college-chronicles.mp4',
      tagline: 'Somewhere between college...',
      subtext: 'Corridor giggles & morning lectures',
    },
    // Scene 3: Chaos in Heels Video & Lilac Portrait - "...chaos in heels..."
    {
      id: 3,
      startTime: 12.0,
      endTime: 16.5,
      mediaType: 'video',
      mediaSrc: '/videos/chaos-in-heels.mp4',
      tagline: '...chaos in heels...',
      subtext: 'Runway struts across campus grounds',
    },
    // Scene 4: Creator Reel Video - "...and a camera roll full of memories..."
    {
      id: 4,
      startTime: 16.5,
      endTime: 21.0,
      mediaType: 'video',
      mediaSrc: '/videos/creator-mode-reel.mp4',
      tagline: '...and a camera roll full of memories...',
      subtext: 'Ring lights, retakes & unfiltered laughs',
    },
    // Scene 5: Rapid Montage - "she started becoming..."
    {
      id: 5,
      startTime: 21.0,
      endTime: 24.5,
      mediaType: 'video',
      mediaSrc: '/videos/yugam-fest-2026.mp4',
      tagline: 'she started becoming...',
      subtext: 'Yugam fest fever & neon crowds',
    },
    // Scene 6: Dramatic Pause & Bloom - "RUBI."
    {
      id: 6,
      startTime: 24.5,
      endTime: 27.5,
      mediaType: 'black',
      tagline: 'RUBI.',
      subtext: 'Main Character Energy',
    },
    // Scene 7: Climax Hero Reveal - "THE MAIN CHARACTER"
    {
      id: 7,
      startTime: 27.5,
      endTime: 32.0,
      mediaType: 'image',
      mediaSrc: CUSTOMER_DATA.photos.hero,
      tagline: 'THE MAIN CHARACTER',
      subtext: 'SEASON 19 • NOW STREAMING',
    },
  ];

  // Determine current active scene
  const activeScene =
    scenes.find((s) => currentTime >= s.startTime && currentTime < s.endTime) ||
    scenes[scenes.length - 1];

  // Synthesize rich trailer audio chords (Zero copyright, Web Audio API)
  const playTrailerChords = (time: number) => {
    try {
      if (isMuted) return;
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioCtx) return;

      if (!audioContextRef.current) {
        audioContextRef.current = new AudioCtx();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }

      const now = ctx.currentTime;

      // Sub-bass hit on major scene changes (0s, 7.5s, 16.5s, 24.5s, 27.5s)
      if (
        (time >= 0 && time < 0.2) ||
        (time >= 7.5 && time < 7.7) ||
        (time >= 24.5 && time < 24.7) ||
        (time >= 27.5 && time < 27.7)
      ) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(time >= 27.5 ? 65 : 45, now);
        osc.frequency.exponentialRampToValueAtTime(32, now + 1.2);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 1.4);
      }
    } catch {
      // Audio context policy safe
    }
  };

  // Main Timer Loop
  useEffect(() => {
    if (!isOpen || !isPlaying) return;

    const timer = setInterval(() => {
      setCurrentTime((prev) => {
        const next = Math.min(TOTAL_DURATION, prev + 0.1);
        playTrailerChords(next);

        // Climax celebration trigger at 27.5s
        if (next >= 27.5 && !hasTriggeredConfetti) {
          setHasTriggeredConfetti(true);
          confetti({
            particleCount: 100,
            spread: 90,
            origin: { y: 0.6 },
            colors: ['#E50914', '#ffffff', '#FF3B30', '#ffccd5'],
          });
        }

        if (next >= TOTAL_DURATION) {
          setIsPlaying(false);
          return TOTAL_DURATION;
        }
        return next;
      });
    }, 100);

    return () => clearInterval(timer);
  }, [isOpen, isPlaying, isMuted, hasTriggeredConfetti]);

  // Sync Video Element when activeScene is video
  useEffect(() => {
    if (activeScene.mediaType === 'video' && videoElementRef.current) {
      videoElementRef.current.currentTime = 0;
      videoElementRef.current.muted = isMuted;
      if (isPlaying) {
        videoElementRef.current.play().catch(() => {});
      }
    }
  }, [activeScene.id, isPlaying, isMuted]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        setIsPlaying((p) => !p);
      } else if (e.key === 'm' || e.key === 'M') {
        setIsMuted((m) => !m);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Handle Skip Easter Egg
  const handleSkipClick = () => {
    if (!hasAttemptedSkip) {
      setHasAttemptedSkip(true);
      setShowSkipJoke(true);
      setTimeout(() => {
        setShowSkipJoke(false);
      }, 3000);
    } else {
      onClose();
    }
  };

  const handleReplay = () => {
    setCurrentTime(0);
    setIsPlaying(true);
    setHasTriggeredConfetti(false);
  };

  if (!isOpen) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black flex flex-col justify-between overflow-hidden select-none animate-fadeIn"
    >
      {/* Background Visual Layer */}
      <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden bg-black">
        {/* Black Scene */}
        {activeScene.mediaType === 'black' && (
          <div className="w-full h-full bg-black flex items-center justify-center">
            {/* Center crimson pulse ring */}
            <div className="w-96 h-96 rounded-full bg-[#E50914]/20 filter blur-[100px] animate-pulse" />
          </div>
        )}

        {/* Image Scene with Ken Burns Effect */}
        {activeScene.mediaType === 'image' && activeScene.mediaSrc && (
          <div className="relative w-full h-full overflow-hidden">
            <img
              src={activeScene.mediaSrc}
              alt="Rubi Story Scene"
              className="w-full h-full object-cover object-center animate-kenburns duration-1000 will-change-transform filter brightness-[0.88] contrast-[1.08]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/70" />
            <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/80" />
          </div>
        )}

        {/* Video Scene */}
        {activeScene.mediaType === 'video' && activeScene.mediaSrc && (
          <div className="relative w-full h-full overflow-hidden bg-black flex items-center justify-center">
            <video
              ref={videoElementRef}
              src={activeScene.mediaSrc}
              preload="metadata"
              playsInline
              muted={isMuted}
              autoPlay
              loop
              className="w-full h-full object-contain md:object-cover filter contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/60 pointer-events-none" />
          </div>
        )}

        {/* Cinematic Film Grain & Vignette */}
        <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/90 pointer-events-none" />
      </div>

      {/* Top Header Controls Bar */}
      <div className="relative z-30 flex items-center justify-between p-4 sm:p-8 bg-gradient-to-b from-black/90 via-black/40 to-transparent">
        {/* Rubishna Trailer Monogram */}
        <div className="flex items-center gap-3">
          <RubishnaLogo variant="monogram" size="md" />
          <div>
            <span className="text-[11px] font-black uppercase text-[#E50914] tracking-[0.25em] block">
              RUBISHNA ORIGINAL
            </span>
            <span className="text-xs font-bold text-white tracking-wider uppercase">
              Official Story Trailer
            </span>
          </div>
        </div>

        {/* Right Header Buttons */}
        <div className="flex items-center gap-3">
          {/* Skip Intro Button with Easter Egg */}
          <button
            onClick={handleSkipClick}
            className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md transition-all active:scale-95"
          >
            {hasAttemptedSkip ? 'Skip Trailer' : 'Skip Intro'}
          </button>

          {/* Mute Toggle */}
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all active:scale-95"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>

          {/* Close Fullscreen */}
          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-white/10 hover:bg-[#E50914] text-white backdrop-blur-md transition-all active:scale-95"
            title="Close Trailer (Esc)"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Playful "Skip Intro" Joke Toast Popover */}
      {showSkipJoke && (
        <div className="absolute top-20 right-6 sm:right-12 z-40 max-w-sm p-4 rounded-xl bg-black/90 border-2 border-[#E50914] shadow-[0_0_30px_rgba(229,9,20,0.6)] backdrop-blur-md animate-slideDown flex items-start gap-3">
          <div className="p-2 rounded-full bg-[#E50914] text-white shrink-0">
            <Smile size={20} />
          </div>
          <div>
            <p className="text-xs font-black uppercase text-[#E50914] tracking-wider">
              Easter Egg Unlocked
            </p>
            <p className="text-sm font-bold text-white mt-0.5 leading-snug">
              &ldquo;Nice try, main characters don't skip their own intro 😉&rdquo;
            </p>
            <p className="text-[10px] text-[#B3B3B3] mt-1">
              Click again if you really want to skip!
            </p>
          </div>
        </div>
      )}

      {/* Center Cinematic Typography Stage */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-6 my-auto">
        {activeScene.subtext && (
          <p className="text-xs sm:text-sm md:text-base font-black uppercase tracking-[0.3em] text-[#E50914] mb-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] animate-fadeIn">
            {activeScene.subtext}
          </p>
        )}

        <h2 className="font-cinematic text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tight leading-none drop-shadow-[0_4px_25px_rgba(0,0,0,0.9)] max-w-4xl animate-slideUp">
          {activeScene.tagline}
        </h2>

        {/* End Card Actions */}
        {currentTime >= TOTAL_DURATION - 2.5 && (
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8 animate-fadeIn">
            <button
              onClick={handleReplay}
              className="flex items-center gap-2 px-6 py-3 bg-white text-black font-extrabold text-sm uppercase tracking-wider rounded-md shadow-2xl hover:bg-white/90 transform hover:scale-105 transition-all"
            >
              <RotateCcw size={16} />
              <span>Replay Trailer</span>
            </button>

            {onExploreEpisodes && (
              <button
                onClick={() => {
                  onClose();
                  onExploreEpisodes();
                }}
                className="flex items-center gap-2 px-6 py-3 bg-[#E50914] text-white font-extrabold text-sm uppercase tracking-wider rounded-md shadow-[0_0_20px_rgba(229,9,20,0.7)] hover:bg-[#b80710] transform hover:scale-105 transition-all"
              >
                <Sparkles size={16} />
                <span>Explore Episodes</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Bottom Timeline Controls */}
      <div className="relative z-30 p-4 sm:p-6 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col gap-3">
        {/* Progress Scrubber */}
        <div className="relative w-full flex items-center">
          <input
            type="range"
            min={0}
            max={TOTAL_DURATION}
            step={0.1}
            value={currentTime}
            onChange={(e) => setCurrentTime(Number(e.target.value))}
            className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#E50914]"
          />
        </div>

        {/* Control Row */}
        <div className="flex items-center justify-between text-xs font-semibold text-white/80">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} className="fill-white ml-0.5" />}
            </button>
            <span className="font-mono text-sm">
              00:{Math.floor(currentTime) < 10 ? '0' : ''}
              {Math.floor(currentTime)} / 00:{TOTAL_DURATION}
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-[#B3B3B3]">
            <span>Season 19</span>
            <span>•</span>
            <span className="text-[#E50914] font-black">4K UHD</span>
          </div>
        </div>
      </div>
    </div>
  );
};
