import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  type ReactNode,
} from 'react';
import { CUSTOMER_DATA } from '../data/customer';
import { uiSounds } from '../utils/soundEffects';

export type TrackType = 'soundtrack' | 'favourite';

export interface TrackInfo {
  type: TrackType;
  title: string;
  subtitle: string;
  artist: string;
  audioSrc: string;
  isCustomFile: boolean;
  fileName?: string;
  duration: number;
  lyrics: { time: number; text: string }[];
}

interface AudioContextType {
  activeTrack: TrackType;
  trackInfo: TrackInfo;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  hasAudioFile: boolean;
  isFolderGuideOpen: boolean;
  setIsFolderGuideOpen: (open: boolean) => void;
  playTrack: (track: TrackType) => void;
  togglePlay: (track?: TrackType) => void;
  pause: () => void;
  seek: (time: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  loadCustomAudioFile: (file: File, track?: TrackType) => void;
  soundtrackCustomFileName: string | null;
  favouriteCustomFileName: string | null;
}

const AudioContext = createContext<AudioContextType | null>(null);

export const AudioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeTrack, setActiveTrack] = useState<TrackType>('soundtrack');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(65);
  const [volume, setVolumeState] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [hasAudioFile, setHasAudioFile] = useState(true);
  const [isFolderGuideOpen, setIsFolderGuideOpen] = useState(false);

  // Custom File URLs & Names
  const [soundtrackCustomUrl, setSoundtrackCustomUrl] = useState<string | null>(null);
  const [soundtrackCustomName, setSoundtrackCustomName] = useState<string | null>(null);

  const [favouriteCustomUrl, setFavouriteCustomUrl] = useState<string | null>(null);
  const [favouriteCustomName, setFavouriteCustomName] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthNodesRef = useRef<{
    ctx: AudioContext;
    gain: GainNode;
    intervalId?: number;
  } | null>(null);

  // Determine current active track info
  const getTrackInfo = (): TrackInfo => {
    if (activeTrack === 'favourite') {
      return {
        type: 'favourite',
        title: favouriteCustomName || CUSTOMER_DATA.favouriteSong.title,
        subtitle: favouriteCustomName
          ? 'Custom Selected Audio File'
          : `${CUSTOMER_DATA.favouriteSong.genre} • Heavy Rotation`,
        artist: CUSTOMER_DATA.favouriteSong.artist,
        audioSrc:
          favouriteCustomUrl ||
          CUSTOMER_DATA.favouriteSong.audioSrc ||
          '/assets/audio/rubi-original.mp3',
        isCustomFile: !!favouriteCustomUrl,
        fileName: favouriteCustomName || undefined,
        duration: duration || 180,
        lyrics: [],
      };
    }

    return {
      type: 'soundtrack',
      title: soundtrackCustomName || CUSTOMER_DATA.originalSoundtrack.title,
      subtitle: soundtrackCustomName
        ? 'Custom Selected Audio File'
        : CUSTOMER_DATA.originalSoundtrack.subtitle,
      artist: CUSTOMER_DATA.originalSoundtrack.artist,
      audioSrc:
        soundtrackCustomUrl ||
        CUSTOMER_DATA.originalSoundtrack.audioSrc ||
        '/assets/audio/hangova.mp3',
      isCustomFile: !!soundtrackCustomUrl,
      fileName: soundtrackCustomName || undefined,
      duration: duration || 65,
      lyrics: CUSTOMER_DATA.originalSoundtrack.lyrics || [],
    };
  };

  const trackInfo = getTrackInfo();

  // Web Audio Synthesizer fallback
  const startSynthesizer = () => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(isMuted ? 0 : volume * 0.35, ctx.currentTime);
      masterGain.connect(ctx.destination);

      let step = 0;
      const chords = [
        [146.83, 220, 261.63], // Dm
        [130.81, 196, 246.94], // C
        [116.54, 174.61, 220], // Bb
        [130.81, 196, 246.94], // C
      ];

      const playBeatStep = () => {
        const now = ctx.currentTime;
        const chordIndex = Math.floor(step / 8) % chords.length;
        const currentChord = chords[chordIndex];

        // Kick on 0, 4, 8, 12
        if (step % 4 === 0) {
          const kickOsc = ctx.createOscillator();
          const kickGain = ctx.createGain();
          kickOsc.frequency.setValueAtTime(120, now);
          kickOsc.frequency.exponentialRampToValueAtTime(38, now + 0.12);
          kickGain.gain.setValueAtTime(0.6, now);
          kickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
          kickOsc.connect(kickGain);
          kickGain.connect(masterGain);
          kickOsc.start(now);
          kickOsc.stop(now + 0.2);
        }

        // Melodic Chords
        if (step % 8 === 0) {
          currentChord.forEach((freq) => {
            const padOsc = ctx.createOscillator();
            const padGain = ctx.createGain();
            padOsc.type = 'triangle';
            padOsc.frequency.setValueAtTime(freq * 1.5, now);
            padGain.gain.setValueAtTime(0.001, now);
            padGain.gain.exponentialRampToValueAtTime(0.08, now + 0.2);
            padGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
            padOsc.connect(padGain);
            padGain.connect(masterGain);
            padOsc.start(now);
            padOsc.stop(now + 1.3);
          });
        }

        step = (step + 1) % 64;
      };

      const intervalId = window.setInterval(playBeatStep, 150);
      synthNodesRef.current = { ctx, gain: masterGain, intervalId };
    } catch {
      // AudioContext policy
    }
  };

  const stopSynthesizer = () => {
    if (synthNodesRef.current) {
      if (synthNodesRef.current.intervalId) {
        clearInterval(synthNodesRef.current.intervalId);
      }
      synthNodesRef.current.ctx.close().catch(() => {});
      synthNodesRef.current = null;
    }
  };

  // Switch Audio source when track changes
  useEffect(() => {
    const audio = new Audio();
    audio.src = trackInfo.audioSrc;
    audio.preload = 'metadata';
    audio.volume = isMuted ? 0 : volume;

    const candidates =
      activeTrack === 'soundtrack'
        ? [
            trackInfo.audioSrc,
            '/assets/audio/hangova.mp3',
            '/audio/hangova.mp3',
            '/audio/Hangova.mp3',
          ]
        : [
            trackInfo.audioSrc,
            '/assets/audio/rubi-original.mp3',
            '/audio/rubi-original.mp3',
            '/audio/naanaga-iruppadhey.mp3',
            '/audio/நானாக இருப்பதே.mp3',
          ];

    let candidateIndex = 0;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => {
      setDuration(audio.duration || (activeTrack === 'favourite' ? 180 : 65));
      setHasAudioFile(true);
    };
    const onError = () => {
      candidateIndex++;
      if (candidateIndex < candidates.length && !trackInfo.isCustomFile) {
        audio.src = candidates[candidateIndex];
        audio.load();
      } else {
        setHasAudioFile(false);
      }
    };
    const onEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('error', onError);
    audio.addEventListener('ended', onEnded);

    audioRef.current = audio;

    if (isPlaying) {
      audio.play().catch(() => {
        setHasAudioFile(false);
        startSynthesizer();
      });
    }

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('error', onError);
      audio.removeEventListener('ended', onEnded);
      audio.pause();
    };
  }, [activeTrack, trackInfo.audioSrc]);

  // Handle Play/Pause
  useEffect(() => {
    if (isPlaying) {
      if (hasAudioFile && audioRef.current) {
        audioRef.current.play().catch(() => {
          setHasAudioFile(false);
          startSynthesizer();
        });
      } else {
        startSynthesizer();
      }
    } else {
      if (audioRef.current) audioRef.current.pause();
      stopSynthesizer();
    }

    return () => {
      stopSynthesizer();
    };
  }, [isPlaying, hasAudioFile]);

  // Volume & Mute Updates
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
    if (synthNodesRef.current) {
      synthNodesRef.current.gain.gain.setValueAtTime(
        isMuted ? 0 : volume * 0.35,
        synthNodesRef.current.ctx.currentTime
      );
    }
  }, [volume, isMuted]);

  // Synthetic Timer Progress when synthesizer is active
  useEffect(() => {
    if (!isPlaying || hasAudioFile) return;
    const timer = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev >= duration) {
          setIsPlaying(false);
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isPlaying, hasAudioFile, duration]);

  const playTrack = (track: TrackType) => {
    uiSounds.togglePlay(true);
    if (activeTrack !== track) {
      setActiveTrack(track);
      setCurrentTime(0);
    }
    setIsPlaying(true);
  };

  const togglePlay = (track?: TrackType) => {
    uiSounds.togglePlay(!isPlaying);
    if (track && track !== activeTrack) {
      setActiveTrack(track);
      setCurrentTime(0);
      setIsPlaying(true);
      return;
    }
    setIsPlaying((p) => !p);
  };

  const pause = () => {
    uiSounds.togglePlay(false);
    setIsPlaying(false);
  };

  const seek = (time: number) => {
    setCurrentTime(time);
    if (audioRef.current && hasAudioFile) {
      audioRef.current.currentTime = time;
    }
  };

  const setVolume = (val: number) => {
    setVolumeState(val);
    uiSounds.volume();
    if (isMuted) setIsMuted(false);
  };

  const toggleMute = () => {
    uiSounds.click();
    setIsMuted((m) => !m);
  };

  const loadCustomAudioFile = (file: File, targetTrack?: TrackType) => {
    uiSounds.easterEgg();
    const target = targetTrack || activeTrack;
    const objectUrl = URL.createObjectURL(file);

    if (target === 'soundtrack') {
      setSoundtrackCustomUrl(objectUrl);
      setSoundtrackCustomName(file.name);
    } else {
      setFavouriteCustomUrl(objectUrl);
      setFavouriteCustomName(file.name);
    }

    setActiveTrack(target);
    setHasAudioFile(true);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  return (
    <AudioContext.Provider
      value={{
        activeTrack,
        trackInfo,
        isPlaying,
        currentTime,
        duration,
        volume,
        isMuted,
        hasAudioFile,
        isFolderGuideOpen,
        setIsFolderGuideOpen,
        playTrack,
        togglePlay,
        pause,
        seek,
        setVolume,
        toggleMute,
        loadCustomAudioFile,
        soundtrackCustomFileName: soundtrackCustomName,
        favouriteCustomFileName: favouriteCustomName,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
