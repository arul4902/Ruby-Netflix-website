import React, { useState, useEffect, useRef } from 'react';
import type { Episode } from '../data/customer';
import { RubishnaLogo } from './RubishnaLogo';
import { RubiRatingBadge } from './RubiRatingBadge';
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  X,
  Subtitles,
  ChevronLeft,
} from 'lucide-react';

interface VideoPlayerProps {
  episode: Episode | null;
  onClose: () => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ episode, onClose }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(240); // default 4-min duration for simulated reel
  const [volume, setVolume] = useState(0.9);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [subtitlesEnabled, setSubtitlesEnabled] = useState(true);
  const [hasRealVideo, setHasRealVideo] = useState(Boolean(episode?.videoUrl));
  const [showOpeningTitle, setShowOpeningTitle] = useState(true);

  // Auto-dismiss episode opening title after 2.5 seconds
  useEffect(() => {
    setShowOpeningTitle(true);
    const timer = setTimeout(() => {
      setShowOpeningTitle(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, [episode?.id]);

  // Playful cinematic dialogue captions tailored for Rubi's episode
  const captions = [
    { start: 0, end: 5, text: "Scene 1: Morning chaos. 8:15 AM alarm, 8:30 AM class." },
    { start: 5, end: 12, text: "Rubi: 'Wait... did we actually just choose heels over sneakers today?!'" },
    { start: 12, end: 20, text: "[Squad giggles in the corridor] 'Of course she did. It's Rubi.'" },
    { start: 20, end: 32, text: "Narrator: 'Campus uniform on, but the camera was already rolling in her head.'" },
    { start: 32, end: 45, text: "Rubi: 'Second year hits different. Syllabus is heavy, but the fits are heavier!'" },
    { start: 45, end: 60, text: "Narrator: 'Fashion. Laughs. Real moments. A star in the making.'" },
    { start: 60, end: 90, text: "Yugam 2026 lights begin to swell... The crowd chants for Rubi!" },
    { start: 90, end: 120, text: "Rubi: 'Goal? Reach a place in life where every single sacrifice was worth it.'" },
    { start: 120, end: 180, text: "♪ [Songify Soundtrack: Main Character Energy rises] ♪" },
  ];

  const currentCaption = captions.find(
    (c) => currentTime >= c.start && currentTime <= c.end
  )?.text;

  // Real HTML5 video events
  useEffect(() => {
    if (!episode?.videoUrl) {
      setHasRealVideo(false);
      return;
    }
    setHasRealVideo(true);
  }, [episode]);

  // Video element sync
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !hasRealVideo) return;

    const handleLoadedMetadata = () => {
      setDuration(video.duration || 240);
    };
    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };
    const handleError = () => {
      // Fallback gracefully to cinematic simulated player if file not found
      setHasRealVideo(false);
    };
    const handleEnded = () => {
      setIsPlaying(false);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('error', handleError);
    video.addEventListener('ended', handleEnded);

    if (isPlaying) {
      video.play().catch(() => {});
    }

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('error', handleError);
      video.removeEventListener('ended', handleEnded);
    };
  }, [hasRealVideo, episode]);

  // Handle Play/Pause toggle
  const togglePlay = () => {
    if (hasRealVideo && videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(() => {});
      }
    }
    setIsPlaying((p) => !p);
  };

  // Timer simulation when not using real video file
  useEffect(() => {
    if (hasRealVideo) return;
    let interval: number;
    if (isPlaying) {
      interval = window.setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            setIsPlaying(false);
            return duration;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration, hasRealVideo]);

  // Seek handler
  const handleSeek = (time: number) => {
    const target = Math.max(0, Math.min(duration, time));
    setCurrentTime(target);
    if (hasRealVideo && videoRef.current) {
      videoRef.current.currentTime = target;
    }
  };

  // Volume & Mute sync
  useEffect(() => {
    if (hasRealVideo && videoRef.current) {
      videoRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted, hasRealVideo]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (document.fullscreenElement) {
          document.exitFullscreen().catch(() => {});
        } else {
          onClose();
        }
      } else if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.key === 'ArrowRight') {
        handleSeek(currentTime + 10);
      } else if (e.key === 'ArrowLeft') {
        handleSeek(currentTime - 10);
      } else if (e.key === 'm' || e.key === 'M') {
        setIsMuted((m) => !m);
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [duration, currentTime, onClose, isPlaying, hasRealVideo]);

  // Hide controls after inactivity
  useEffect(() => {
    let timeout: number;
    const onMouseMove = () => {
      setShowControls(true);
      clearTimeout(timeout);
      timeout = window.setTimeout(() => {
        if (isPlaying) setShowControls(false);
      }, 3500);
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      clearTimeout(timeout);
    };
  }, [isPlaying]);

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (!episode) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 bg-black flex flex-col justify-between overflow-hidden select-none"
    >
      {/* Cinematic Viewport Canvas / Video Mockup */}
      <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
        {hasRealVideo && episode.videoUrl ? (
          /* Real HTML5 Video element */
          <video
            ref={videoRef}
            src={episode.videoUrl}
            poster={episode.image}
            preload="metadata"
            playsInline
            className="w-full h-full object-contain bg-black"
          />
        ) : (
          /* High-End Simulated Visualizer Frame */
          <img
            src={episode.image}
            alt={episode.title}
            className={`w-full h-full object-cover filter brightness-[0.85] contrast-[1.08] transition-transform duration-1000 ${
              isPlaying ? 'scale-105' : 'scale-100'
            }`}
          />
        )}

        {/* Film Vignette Overlay */}
        <div className="absolute inset-0 bg-radial from-transparent via-black/30 to-black/90 pointer-events-none" />

        {/* Big Center Play/Pause indicator when paused */}
        {!isPlaying && (
          <button
            onClick={togglePlay}
            className="z-10 w-20 h-20 rounded-full bg-black/60 border border-white/30 text-white flex items-center justify-center backdrop-blur-md shadow-2xl hover:scale-110 transition-transform"
          >
            <Play size={36} className="fill-white ml-1" />
          </button>
        )}
      </div>

      {/* Subtitles Overlay */}
      {subtitlesEnabled && currentCaption && (
        <div className="absolute bottom-28 inset-x-0 z-20 flex justify-center px-4 pointer-events-none">
          <span className="px-4 py-1.5 rounded bg-black/80 backdrop-blur-sm text-yellow-300 font-sans text-sm sm:text-base md:text-lg font-bold tracking-wide text-center drop-shadow-md border border-white/10 max-w-2xl">
            {currentCaption}
          </span>
        </div>
      )}

      {/* Innovation: Episode Opening Titles Overlay (2.5s Cinematic Sequence) */}
      {showOpeningTitle && (
        <div className="absolute inset-0 z-40 bg-black flex flex-col items-center justify-center p-6 text-center select-none animate-fadeIn">
          {/* Subtle Ambient Red Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(229,9,20,0.3)_0%,rgba(0,0,0,0.98)_70%)] animate-pulse" />

          <div className="relative z-10 flex flex-col items-center max-w-2xl">
            {/* Top Rubishna Monogram */}
            <div className="mb-4">
              <RubishnaLogo variant="monogram" size="md" animated />
            </div>

            {/* Episode Number */}
            <p className="text-xs sm:text-sm font-black tracking-[0.4em] uppercase text-[#E50914] mb-2 drop-shadow-[0_0_10px_rgba(229,9,20,0.7)]">
              EPISODE 0{episode.episodeNumber || 1}
            </p>

            {/* Main Episode Title with Light Sweep Effect */}
            <h1 className="font-cinematic text-3xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-wider my-1 drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
              {episode.title}
            </h1>

            {/* A Rubishna Original subtitle */}
            <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-[#B3B3B3] font-semibold mt-3">
              A RUBISHNA ORIGINAL
            </p>

            {/* Skip Title Button */}
            <button
              onClick={() => setShowOpeningTitle(false)}
              className="mt-8 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-bold uppercase tracking-widest text-white/90 hover:text-white transition-all backdrop-blur-md"
            >
              Skip Title ▶
            </button>
          </div>
        </div>
      )}

      {/* Top Header Controls Bar */}
      <div
        className={`relative z-20 p-6 flex items-center justify-between transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } bg-gradient-to-b from-black/80 to-transparent`}
      >
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/25 text-white transition-all backdrop-blur-md"
            aria-label="Back to main app"
          >
            <ChevronLeft size={24} />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <RubishnaLogo variant="monogram" size="sm" />
              <h2 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">
                {episode.title}
              </h2>
            </div>
            <p className="text-xs text-[#B3B3B3]">
              {episode.subtitle || 'Rubishna • Season 19 • Ultra HD 4K'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <RubiRatingBadge size="sm" showDescriptors={false} />
          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all"
          >
            <X size={22} />
          </button>
        </div>
      </div>

      {/* Bottom Floating Playback Controls Bar */}
      <div
        className={`relative z-20 px-6 pb-8 pt-12 flex flex-col gap-3 transition-opacity duration-300 ${
          showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } bg-gradient-to-t from-black/95 via-black/60 to-transparent`}
      >
        {/* Scrub Bar */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-medium text-white/90 w-10 text-right">
            {formatTime(currentTime)}
          </span>

          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={(e) => handleSeek(Number(e.target.value))}
            className="flex-1 h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#E50914]"
          />

          <span className="text-xs font-mono font-medium text-white/70 w-10">
            {formatTime(duration)}
          </span>
        </div>

        {/* Buttons Row */}
        <div className="flex items-center justify-between">
          {/* Left Buttons: Play, Skip 10s */}
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              className="p-2 text-white hover:text-[#E50914] transition-colors"
              aria-label={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause size={24} className="fill-current" /> : <Play size={24} className="fill-current" />}
            </button>

            <button
              onClick={() => handleSeek(currentTime - 10)}
              className="p-2 text-white/80 hover:text-white transition-colors"
              title="Rewind 10 seconds"
            >
              <RotateCcw size={20} />
            </button>

            <button
              onClick={() => handleSeek(currentTime + 10)}
              className="p-2 text-white/80 hover:text-white transition-colors"
              title="Forward 10 seconds"
            >
              <RotateCw size={20} />
            </button>

            {/* Volume */}
            <div className="flex items-center gap-2 ml-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="text-white/80 hover:text-white"
              >
                {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  setVolume(Number(e.target.value));
                  setIsMuted(false);
                }}
                className="w-20 h-1 bg-white/20 rounded cursor-pointer accent-white hidden sm:block"
              />
            </div>
          </div>

          {/* Right Buttons: Subtitles, Fullscreen */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSubtitlesEnabled(!subtitlesEnabled)}
              className={`p-2 transition-colors ${
                subtitlesEnabled ? 'text-[#E50914]' : 'text-white/60 hover:text-white'
              }`}
              title="Toggle Subtitles"
            >
              <Subtitles size={20} />
            </button>

            <button
              onClick={toggleFullscreen}
              className="p-2 text-white/80 hover:text-white transition-colors"
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
