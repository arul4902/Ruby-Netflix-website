import React, { useState } from 'react';
import { CUSTOMER_DATA } from '../data/customer';
import { useAudio } from '../context/AudioContext';
import { RubishnaLogo } from './RubishnaLogo';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  FileText,
  X,
  Disc,
  SkipBack,
  SkipForward,
} from 'lucide-react';
import { uiSounds } from '../utils/soundEffects';

export const MusicPlayer: React.FC = () => {
  const { originalSoundtrack, favouriteSong } = CUSTOMER_DATA;
  const {
    activeTrack,
    trackInfo,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    playTrack,
    togglePlay,
    seek,
    setVolume,
    toggleMute,
  } = useAudio();

  const [showLyrics, setShowLyrics] = useState(false);

  const handleSwitchTrack = (target?: 'soundtrack' | 'favourite') => {
    uiSounds.click();
    const next = target || (activeTrack === 'soundtrack' ? 'favourite' : 'soundtrack');
    playTrack(next);
  };

  const handleScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    seek(Number(e.target.value));
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Hangova lyrics alone
  const hangovaLyrics = originalSoundtrack.lyrics || [];

  // Active lyric teaser line for center player (Hangova only)
  const currentLyricTeaser =
    activeTrack === 'soundtrack'
      ? trackInfo.lyrics
          .slice()
          .reverse()
          .find((l) => currentTime >= l.time)?.text
      : null;

  return (
    <>
      {/* Floating Bottom Audio Player Bar */}
      <aside
        aria-label="Rubishna Audio Player"
        className="fixed bottom-0 inset-x-0 z-40 bg-[#161616]/98 backdrop-blur-xl border-t border-white/10 shadow-[0_-10px_30px_rgba(0,0,0,0.8)] px-4 sm:px-8 py-3 select-none"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
          {/* Left: Track Details */}
          <div className="flex items-center gap-3 sm:gap-4 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center gap-3">
              {/* Disc Artwork */}
              <div
                onClick={() => {
                  uiSounds.click();
                  togglePlay();
                }}
                onMouseEnter={() => uiSounds.hover()}
                className="relative w-12 h-12 rounded-lg bg-gradient-to-br from-red-950 to-black border border-white/20 flex items-center justify-center cursor-pointer group shrink-0 overflow-hidden shadow-md"
              >
                <img
                  src={CUSTOMER_DATA.photos.hero}
                  alt="Track Artwork"
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Disc
                    size={22}
                    className={`text-[#E50914] ${isPlaying ? 'animate-spin' : ''}`}
                    style={{ animationDuration: '4s' }}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-black uppercase text-[#E50914] bg-[#E50914]/20 px-1.5 py-0.2 rounded border border-[#E50914]/30">
                    {activeTrack === 'favourite' ? 'ON REPEAT' : 'SOUNDTRACK'}
                  </span>

                  <p className="text-xs sm:text-sm font-extrabold text-white truncate max-w-[190px] sm:max-w-xs">
                    {trackInfo.title}
                  </p>
                </div>

                <p className="text-[11px] text-[#B3B3B3] truncate max-w-[220px]">
                  {trackInfo.artist}
                </p>
              </div>
            </div>

            {/* Mobile quick actions */}
            <div className="flex items-center gap-1.5 md:hidden">
              <button
                type="button"
                onClick={() => handleSwitchTrack()}
                className="p-1.5 text-white/70 hover:text-white"
                title={`Switch to ${activeTrack === 'soundtrack' ? favouriteSong.title : 'Hangova'}`}
              >
                <SkipForward size={16} />
              </button>
              <button
                onClick={() => {
                  uiSounds.click();
                  togglePlay();
                }}
                className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center shadow-lg active:scale-95 transition-transform"
              >
                {isPlaying ? (
                  <Pause size={16} className="fill-black" />
                ) : (
                  <Play size={16} className="fill-black ml-0.5" />
                )}
              </button>
              <button
                onClick={() => {
                  uiSounds.click();
                  setShowLyrics(true);
                }}
                className="p-1.5 text-white/70 hover:text-white"
                title="Hangova Lyrics"
              >
                <FileText size={16} />
              </button>
            </div>
          </div>

          {/* Center: Controls & Scrubber */}
          <div className="flex flex-col items-center gap-1.5 w-full max-w-xl">
            {/* Control Buttons with Track Switchers */}
            <div className="hidden md:flex items-center gap-3">
              {/* Switch to Previous Track */}
              <button
                type="button"
                onClick={() => handleSwitchTrack()}
                onMouseEnter={() => uiSounds.hover()}
                className="p-2 text-white/60 hover:text-white transition-colors"
                title={`Switch track: ${activeTrack === 'soundtrack' ? favouriteSong.title : 'Hangova'}`}
              >
                <SkipBack size={18} />
              </button>

              {/* Play/Pause Button */}
              <button
                onClick={() => {
                  uiSounds.click();
                  togglePlay();
                }}
                onMouseEnter={() => uiSounds.hover()}
                className="w-10 h-10 rounded-full bg-white hover:bg-white/90 text-black flex items-center justify-center shadow-lg transform hover:scale-105 active:scale-95 transition-all"
                title={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? (
                  <Pause size={17} className="fill-black" />
                ) : (
                  <Play size={17} className="fill-black ml-0.5" />
                )}
              </button>

              {/* Switch to Next Track */}
              <button
                type="button"
                onClick={() => handleSwitchTrack()}
                onMouseEnter={() => uiSounds.hover()}
                className="p-2 text-white/60 hover:text-white transition-colors"
                title={`Switch track: ${activeTrack === 'soundtrack' ? favouriteSong.title : 'Hangova'}`}
              >
                <SkipForward size={18} />
              </button>
            </div>

            {/* Scrubber Bar & Timers */}
            <div className="flex items-center gap-3 w-full text-[11px] font-semibold text-[#B3B3B3]">
              <span className="w-9 text-right font-mono">{formatTime(currentTime)}</span>
              <div className="relative flex-1 flex items-center">
                <input
                  type="range"
                  min="0"
                  max={duration || 65}
                  value={currentTime}
                  onChange={handleScrub}
                  className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-[#E50914]"
                />
              </div>
              <span className="w-9 font-mono">{formatTime(duration || 65)}</span>
            </div>

            {/* Active Lyric Teaser Line */}
            {currentLyricTeaser && (
              <p className="text-[11px] text-[#E50914] font-medium tracking-wide truncate max-w-md animate-pulse hidden sm:block">
                {currentLyricTeaser}
              </p>
            )}
          </div>

          {/* Right: Volume & Lyrics Drawer Trigger */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => {
                uiSounds.click();
                setShowLyrics(!showLyrics);
              }}
              onMouseEnter={() => uiSounds.hover()}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all ${
                showLyrics
                  ? 'bg-[#E50914] text-white shadow-lg'
                  : 'text-[#B3B3B3] hover:text-white bg-white/5 hover:bg-white/10'
              }`}
              title="Hangova Synced Lyrics"
            >
              <FileText size={14} />
              <span>Lyrics</span>
            </button>

            {/* Volume Control */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleMute}
                className="text-[#B3B3B3] hover:text-white transition-colors"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-16 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white"
              />
            </div>
          </div>
        </div>
      </aside>

      {/* Interactive Lyrics Modal / Drawer */}
      {showLyrics && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lyrics-dialog-title"
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 select-none animate-in fade-in duration-200"
        >
          <div className="relative w-full max-w-lg bg-[#1a1a1a] rounded-2xl border border-white/15 p-6 sm:p-8 shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <RubishnaLogo variant="monogram" size="sm" />
                <div>
                  <h3
                    id="lyrics-dialog-title"
                    className="text-base sm:text-lg font-black text-white"
                  >
                    Hangova — Anirudh Ravichander
                  </h3>
                  <p className="text-xs text-[#B3B3B3]">
                    Lyrics by Heisenberg • DC (2026)
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  uiSounds.click();
                  setShowLyrics(false);
                }}
                className="p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Notice if Tamil song is currently active */}
            {activeTrack === 'favourite' && (
              <div className="mx-6 mt-4 p-2.5 rounded-lg bg-red-950/30 border border-red-900/30 text-xs text-[#B3B3B3] flex items-center justify-between">
                <span className="text-white font-medium truncate">
                  Now Playing: {favouriteSong.title} (Audio Only)
                </span>
                <span className="text-[10px] text-zinc-400 bg-white/10 px-2 py-0.5 rounded uppercase font-bold shrink-0 ml-2">
                  Without Lyrics
                </span>
              </div>
            )}

            {/* Lyrics Scrollable Body (Hangova alone) */}
            <div className="overflow-y-auto py-6 space-y-4 text-center">
              {hangovaLyrics.map((line, idx) => {
                const isActive =
                  activeTrack === 'soundtrack' &&
                  currentTime >= line.time &&
                  (idx === hangovaLyrics.length - 1 ||
                    currentTime < hangovaLyrics[idx + 1].time);

                return (
                  <p
                    key={idx}
                    className={`transition-all duration-300 ${
                      isActive
                        ? 'text-white text-lg sm:text-xl font-extrabold scale-105 text-[#E50914] drop-shadow-[0_0_12px_rgba(229,9,20,0.8)]'
                        : 'text-[#B3B3B3]/70 text-sm sm:text-base font-medium hover:text-white'
                    }`}
                  >
                    {line.text}
                  </p>
                );
              })}
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-white/10 text-center text-xs text-[#B3B3B3]">
              Anirudh Ravichander • On Heavy Rotation in Rubi’s Universe
            </div>
          </div>
        </div>
      )}
    </>
  );
};
