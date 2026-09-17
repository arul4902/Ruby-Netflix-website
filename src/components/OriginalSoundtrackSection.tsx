import React, { useState } from 'react';
import { CUSTOMER_DATA } from '../data/customer';
import { useAudio } from '../context/AudioContext';
import { RubishnaLogo } from './RubishnaLogo';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  FileText,
  Music2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { uiSounds } from '../utils/soundEffects';

export const OriginalSoundtrackSection: React.FC = () => {
  const { originalSoundtrack, favouriteSong, photos } = CUSTOMER_DATA;
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

  const [showLyrics, setShowLyrics] = useState(true);

  const isCurrentSectionPlaying = isPlaying && activeTrack === 'soundtrack';

  const handleTogglePlay = () => {
    uiSounds.click();
    if (activeTrack !== 'soundtrack') {
      playTrack('soundtrack');
    } else {
      togglePlay();
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const hangovaLyrics = originalSoundtrack.lyrics || [];

  return (
    <section
      id="soundtrack"
      className="relative my-14 sm:my-24 px-4 sm:px-8 md:px-12 lg:px-16 select-none"
    >
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#1b0d0e] via-[#141414] to-[#0f0e15] border border-red-900/40 p-6 sm:p-10 lg:p-14 shadow-2xl">
        {/* Ambient Red Glow Blobs */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#E50914]/15 rounded-full filter blur-[130px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-red-950/20 rounded-full filter blur-[100px] pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left Column: Vinyl Record & Album Artwork */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center text-center">
            {/* Vinyl & Artwork Sleeve Composition */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 group">
              {/* Spinning Vinyl Record behind sleeve */}
              <div
                className={`absolute top-0 right-0 w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-gradient-to-br from-zinc-950 via-zinc-800 to-black border-4 border-zinc-900 shadow-2xl flex items-center justify-center transition-all duration-700 ${
                  isCurrentSectionPlaying
                    ? 'translate-x-10 -translate-y-4 animate-spin'
                    : 'translate-x-4 -translate-y-2 group-hover:translate-x-8'
                }`}
                style={{ animationDuration: '6s' }}
              >
                {/* Vinyl Grooves */}
                <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-full border border-white/10 flex items-center justify-center">
                  <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full border border-white/10 flex items-center justify-center">
                    {/* Center Vinyl Label */}
                    <div className="w-20 h-20 rounded-full bg-[#E50914] flex items-center justify-center overflow-hidden border-2 border-white/30 shadow-inner">
                      <img
                        src={photos.hero}
                        alt="Vinyl Center Label"
                        className="w-full h-full object-cover opacity-80"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Album Cover Sleeve */}
              <div className="relative z-10 w-56 h-56 sm:w-64 sm:h-64 rounded-xl overflow-hidden bg-black border-2 border-white/20 shadow-2xl group-hover:scale-[1.02] transition-transform">
                <img
                  src={photos.hero}
                  alt={originalSoundtrack.title}
                  className="w-full h-full object-cover object-[78%_20%] filter contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                {/* Top Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/70 backdrop-blur-md border border-white/20 text-[10px] font-black uppercase text-[#E50914]">
                  <RubishnaLogo variant="monogram" size="sm" />
                  <span>{originalSoundtrack.badge}</span>
                </div>

                {/* Center Play Overlay */}
                <button
                  onClick={handleTogglePlay}
                  onMouseEnter={() => uiSounds.hover()}
                  className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors group/btn"
                >
                  <div className="w-14 h-14 rounded-full bg-[#E50914] text-white flex items-center justify-center shadow-2xl transform group-hover/btn:scale-110 active:scale-95 transition-transform">
                    {isCurrentSectionPlaying ? (
                      <Pause size={24} className="fill-white" />
                    ) : (
                      <Play size={24} className="fill-white ml-1" />
                    )}
                  </div>
                </button>

                {/* Bottom Title on Sleeve */}
                <div className="absolute bottom-3 left-3 right-3 text-left">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#E50914]">
                    Songify Original
                  </span>
                  <h4 className="font-cinematic text-lg font-black text-white uppercase truncate">
                    {activeTrack === 'soundtrack' ? trackInfo.title : originalSoundtrack.title}
                  </h4>
                </div>
              </div>
            </div>

            {/* Equalizer Bars (Animated when playing) */}
            <div className="flex items-center gap-1.5 mt-8 h-8">
              {[40, 75, 100, 60, 85, 45, 90, 70, 50, 80, 65, 95].map(
                (h, idx) => (
                  <span
                    key={idx}
                    className={`w-1 bg-[#E50914] rounded-full transition-all duration-300 ${
                      isCurrentSectionPlaying ? 'animate-pulse' : 'opacity-30'
                    }`}
                    style={{
                      height: isCurrentSectionPlaying ? `${h}%` : '20%',
                      animationDelay: `${idx * 80}ms`,
                    }}
                  />
                )
              )}
            </div>

            <p className="text-xs text-[#B3B3B3] mt-2 font-medium">
              {isCurrentSectionPlaying
                ? 'Now Playing: Hangova — Anirudh Ravichander'
                : 'Click to stream soundtrack'}
            </p>
          </div>

          {/* Right Column: Player Controls & Lyrics Showcase */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-black text-[#E50914] uppercase tracking-[0.25em] mb-2">
              <Music2 size={16} />
              <span>{originalSoundtrack.presenter}</span>
            </div>

            <h2 className="font-cinematic text-3xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight uppercase leading-none mb-2">
              {originalSoundtrack.title}
            </h2>

            <p className="text-xs sm:text-sm font-semibold text-[#B3B3B3] mb-5">
              {originalSoundtrack.subtitle} • {originalSoundtrack.artist}
            </p>

            {/* 2-Track Universe Album Showcase: Hangova (with lyrics) + Tamil Song (without lyrics) */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {/* Track 01: Hangova */}
              <button
                type="button"
                onClick={() => {
                  uiSounds.click();
                  if (activeTrack !== 'soundtrack') {
                    playTrack('soundtrack');
                  } else {
                    togglePlay();
                  }
                }}
                onMouseEnter={() => uiSounds.hover()}
                className={`p-3.5 rounded-xl border text-left transition-all flex items-center justify-between group cursor-pointer ${
                  activeTrack === 'soundtrack'
                    ? 'bg-red-950/40 border-[#E50914] shadow-[0_0_20px_rgba(229,9,20,0.3)]'
                    : 'bg-black/40 border-white/10 hover:border-white/20 hover:bg-black/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#E50914] text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                    {isPlaying && activeTrack === 'soundtrack' ? (
                      <Pause size={15} className="fill-white" />
                    ) : (
                      <Play size={15} className="fill-white ml-0.5" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-[9px] font-black uppercase text-[#E50914] tracking-wider">Track 01</span>
                      <span className="text-[9px] font-semibold text-white/70 bg-white/10 px-1.5 py-0.2 rounded">Lyrics Synced</span>
                    </div>
                    <h4 className="text-sm font-black text-white">Hangova</h4>
                    <p className="text-[11px] text-[#B3B3B3]">Anirudh Ravichander</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs font-mono text-[#B3B3B3]">3:00</span>
                  {isPlaying && activeTrack === 'soundtrack' && (
                    <span className="text-[9px] font-black text-[#E50914] uppercase tracking-wider animate-pulse">Playing</span>
                  )}
                </div>
              </button>

              {/* Track 02: Tamil Song (நானாக இருப்பதே) without lyrics */}
              <button
                type="button"
                onClick={() => {
                  uiSounds.click();
                  if (activeTrack !== 'favourite') {
                    playTrack('favourite');
                  } else {
                    togglePlay();
                  }
                }}
                onMouseEnter={() => uiSounds.hover()}
                className={`p-3.5 rounded-xl border text-left transition-all flex items-center justify-between group cursor-pointer ${
                  activeTrack === 'favourite'
                    ? 'bg-red-950/40 border-[#E50914] shadow-[0_0_20px_rgba(229,9,20,0.3)]'
                    : 'bg-black/40 border-white/10 hover:border-white/20 hover:bg-black/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#E50914] text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform">
                    {isPlaying && activeTrack === 'favourite' ? (
                      <Pause size={15} className="fill-white" />
                    ) : (
                      <Play size={15} className="fill-white ml-0.5" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-[9px] font-black uppercase text-[#E50914] tracking-wider">Track 02</span>
                      <span className="text-[9px] font-semibold text-white/50 bg-white/10 px-1.5 py-0.2 rounded">Audio Only</span>
                    </div>
                    <h4 className="text-sm font-black text-white">{favouriteSong.title}</h4>
                    <p className="text-[11px] text-[#B3B3B3]">Special Release • Rubi's Story</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs font-mono text-[#B3B3B3]">1:05</span>
                  {isPlaying && activeTrack === 'favourite' && (
                    <span className="text-[9px] font-black text-[#E50914] uppercase tracking-wider animate-pulse">Playing</span>
                  )}
                </div>
              </button>
            </div>

            {/* In-Page Interactive Scrubber & Controls */}
            <div className="w-full bg-black/40 border border-white/10 rounded-xl p-4 sm:p-5 mb-6">
              {/* Progress Slider */}
              <div className="flex items-center justify-between text-xs font-mono text-[#B3B3B3] mb-2">
                <span>{formatTime(currentTime)}</span>
                <span className="text-white font-bold">
                  {formatTime(duration || 180)}
                </span>
              </div>
              <div className="relative w-full h-2 bg-white/10 rounded-full overflow-hidden mb-4">
                <div
                  className="h-full bg-gradient-to-r from-red-700 to-[#E50914] rounded-full relative"
                  style={{ width: `${progressPercent}%` }}
                >
                  <div className="absolute right-0 top-0 bottom-0 w-2 bg-white rounded-full animate-pulse" />
                </div>
              </div>

              {/* Action Controls Row */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  {/* Play/Pause Button for Current Track */}
                  <button
                    onClick={handleTogglePlay}
                    onMouseEnter={() => uiSounds.hover()}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#E50914] hover:bg-[#b80710] text-white font-black text-xs uppercase tracking-wider shadow-lg transition-all transform hover:scale-105 active:scale-95"
                  >
                    {isPlaying ? (
                      <Pause size={16} className="fill-white" />
                    ) : (
                      <Play size={16} className="fill-white ml-0.5" />
                    )}
                    <span>
                      {isPlaying
                        ? `Pause ${activeTrack === 'favourite' ? 'நானாக இருப்பதே' : 'Hangova'}`
                        : `Play ${activeTrack === 'favourite' ? 'நானாக இருப்பதே' : 'Hangova'}`}
                    </span>
                  </button>

                  {/* Replay Button */}
                  <button
                    onClick={() => {
                      uiSounds.click();
                      seek(0);
                    }}
                    onMouseEnter={() => uiSounds.hover()}
                    className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                    title="Replay from start"
                  >
                    <RotateCcw size={16} />
                  </button>
                </div>

                {/* Volume Controls */}
                <div className="flex items-center gap-2 text-white/80">
                  <button
                    onClick={toggleMute}
                    onMouseEnter={() => uiSounds.hover()}
                    className="p-2 hover:text-white transition-colors"
                  >
                    {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={isMuted ? 0 : volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                    className="w-20 h-1.5 bg-white/20 rounded appearance-none accent-[#E50914] cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Expandable Synced Lyrics Panel with Tabs (Hangova & Naanaga Iruppadhey) */}
            <div className="w-full bg-black/40 border border-white/10 rounded-xl overflow-hidden transition-all">
              <div className="w-full p-4 flex items-center justify-between border-b border-white/10">
                <button
                  onClick={() => {
                    uiSounds.click();
                    setShowLyrics(!showLyrics);
                  }}
                  onMouseEnter={() => uiSounds.hover()}
                  className="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-white hover:text-[#E50914] transition-colors"
                >
                  <FileText size={16} className="text-[#E50914]" />
                  <span>Hangova Synced Lyrics</span>
                  <span className="text-xs text-[#B3B3B3] font-normal lowercase">
                    ({showLyrics ? 'collapse' : 'expand'})
                  </span>
                </button>

                {/* Hangova Track Badge & Collapse Button */}
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase text-[#E50914] bg-[#E50914]/15 px-2 py-0.5 rounded border border-[#E50914]/30">
                    Hangova • Anirudh Ravichander
                  </span>
                  <button
                    onClick={() => {
                      uiSounds.click();
                      setShowLyrics(!showLyrics);
                    }}
                    className="p-1 text-[#B3B3B3] hover:text-white transition-colors"
                  >
                    {showLyrics ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                </div>
              </div>

              {showLyrics && (
                <div className="p-5 max-h-56 overflow-y-auto space-y-2.5 scrollbar-thin text-xs sm:text-sm text-left">
                  {activeTrack === 'favourite' && (
                    <div className="mb-3.5 p-2.5 rounded-lg bg-red-950/30 border border-red-900/30 text-xs text-[#B3B3B3] flex items-center justify-between">
                      <span className="text-white font-semibold">
                        Streaming: {favouriteSong.title} (Audio Only)
                      </span>
                      <span className="text-[10px] text-zinc-400 bg-white/10 px-2 py-0.5 rounded uppercase font-bold">
                        Without Lyrics
                      </span>
                    </div>
                  )}
                  {hangovaLyrics.map((line, idx) => {
                    const isSyncedActive =
                      currentTime >= line.time &&
                      (idx === hangovaLyrics.length - 1 ||
                        currentTime < hangovaLyrics[idx + 1].time);

                    return (
                      <p
                        key={idx}
                        className={`leading-relaxed transition-colors ${
                          isSyncedActive && isCurrentSectionPlaying
                            ? 'text-[#E50914] font-black text-sm sm:text-base drop-shadow-md'
                            : 'text-[#B3B3B3] hover:text-white'
                        }`}
                      >
                        {line.text}
                      </p>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
