import React, { useEffect, useState, useRef } from 'react';
import { RubishnaLogo } from './RubishnaLogo';
import { Volume2 } from 'lucide-react';

interface IntroAnimationProps {
  onComplete: () => void;
  forcePlay?: boolean;
}

export const IntroAnimation: React.FC<IntroAnimationProps> = ({
  onComplete,
  forcePlay = false,
}) => {
  const [phase, setPhase] = useState<'init' | 'monogram-zoom' | 'glow-sweep' | 'title-reveal' | 'fade-out'>('init');
  const [isWaitingForTap, setIsWaitingForTap] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const hasStartedSequenceRef = useRef(false);

  // Synthesize studio-grade Rubishna cinematic chord engineered specifically for mobile phone speakers
  const playCinematicSound = (ctx: AudioContext) => {
    try {
      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }

      const now = ctx.currentTime;
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(1.0, now);
      masterGain.connect(ctx.destination);

      // 1. PUNCHY KICK & MID IMPACT (Audible on all smartphone speakers!)
      // Sweeps 280Hz -> 75Hz for immediate physical presence on mobile speakers
      const punchOsc = ctx.createOscillator();
      const punchGain = ctx.createGain();
      punchOsc.type = 'triangle';
      punchOsc.frequency.setValueAtTime(280, now);
      punchOsc.frequency.exponentialRampToValueAtTime(75, now + 0.25);

      punchGain.gain.setValueAtTime(0.001, now);
      punchGain.gain.linearRampToValueAtTime(0.95, now + 0.01);
      punchGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      punchOsc.connect(punchGain);
      punchGain.connect(masterGain);
      punchOsc.start(now);
      punchOsc.stop(now + 0.45);

      // 2. METALLIC TRANSIENT SNAP (High punch clarity at time 0.0s)
      const snapOsc = ctx.createOscillator();
      const snapGain = ctx.createGain();
      snapOsc.type = 'square';
      snapOsc.frequency.setValueAtTime(1400, now);
      snapOsc.frequency.exponentialRampToValueAtTime(320, now + 0.07);

      snapGain.gain.setValueAtTime(0.4, now);
      snapGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      snapOsc.connect(snapGain);
      snapGain.connect(masterGain);
      snapOsc.start(now);
      snapOsc.stop(now + 0.08);

      // 3. DEEP SUB-BASS IMPACT (for headphones & high-end mobile speakers)
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(95, now);
      subOsc.frequency.exponentialRampToValueAtTime(45, now + 2.0);

      subGain.gain.setValueAtTime(0.001, now);
      subGain.gain.linearRampToValueAtTime(0.75, now + 0.05);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 2.8);

      subOsc.connect(subGain);
      subGain.connect(masterGain);
      subOsc.start(now);
      subOsc.stop(now + 2.8);

      // 4. CINEMATIC HARMONIC BRASS CHORD (Anirudh / Netflix Signature Swell)
      // D Minor / A Harmonic: 220Hz (A3), 293.6Hz (D4), 370Hz (F#4), 440Hz (A4), 587.3Hz (D5), 880Hz (A5)
      const chordFrequencies = [220, 293.66, 370, 440, 587.33, 880];
      chordFrequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = idx % 2 === 0 ? 'sawtooth' : 'triangle';
        osc.frequency.setValueAtTime(freq, now + 0.04);

        // Low-pass filter for warmth and progressive bloom
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(450, now + 0.04);
        filter.frequency.exponentialRampToValueAtTime(3200, now + 0.9);
        filter.frequency.exponentialRampToValueAtTime(500, now + 2.8);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.2, now + 0.35);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 2.8);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(masterGain);
        osc.start(now + 0.04);
        osc.stop(now + 2.8);
      });

      // 5. CRIMSON SHIMMER SPARKLE (Stereo-like ribbon texture)
      const noiseBuffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 2.0), ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < noiseBuffer.length; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;

      const bandpass = ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.setValueAtTime(3600, now + 0.2);
      bandpass.Q.setValueAtTime(3.5, now + 0.2);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.0001, now);
      noiseGain.gain.linearRampToValueAtTime(0.08, now + 0.6);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

      noiseSource.connect(bandpass);
      bandpass.connect(noiseGain);
      noiseGain.connect(masterGain);
      noiseSource.start(now + 0.2);
      noiseSource.stop(now + 2.2);
    } catch {
      // Audio context policy fallback
    }
  };

  // Run the cinematic timeline
  const runAnimationPhases = () => {
    setPhase('monogram-zoom');

    setTimeout(() => {
      setPhase('glow-sweep');
    }, 1100);

    setTimeout(() => {
      setPhase('title-reveal');
    }, 2300);

    setTimeout(() => {
      setPhase('fade-out');
    }, 4100);

    setTimeout(() => {
      sessionStorage.setItem('rubishna_intro_completed', 'true');
      onComplete();
    }, 4800);
  };

  // Triggered when autoplay is allowed or when user taps
  const startCinematicIntro = () => {
    if (hasStartedSequenceRef.current) return;
    hasStartedSequenceRef.current = true;
    setIsWaitingForTap(false);

    try {
      let ctx = audioContextRef.current;
      if (!ctx || ctx.state === 'closed') {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) {
          ctx = new AudioCtx();
          audioContextRef.current = ctx;
        }
      }

      if (ctx) {
        ctx.resume().then(() => {
          playCinematicSound(ctx);
        }).catch(() => {
          playCinematicSound(ctx);
        });
      }
    } catch {
      // Graceful fallback
    }

    runAnimationPhases();
  };

  useEffect(() => {
    // Check if intro was already played in this session
    if (!forcePlay && sessionStorage.getItem('rubishna_intro_completed') === 'true') {
      onComplete();
      return;
    }

    // Initialize AudioContext
    let ctx: AudioContext | null = null;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        ctx = new AudioCtx();
        audioContextRef.current = ctx;
      }
    } catch {
      // Ignored
    }

    // Check if autoplay is allowed immediately (e.g. desktop or already unlocked)
    if (ctx && ctx.state === 'running') {
      startCinematicIntro();
      return;
    }

    // If context is suspended (strict mobile browser policy), show tap to enter prompt
    setIsWaitingForTap(true);

    // Fallback timer: if user doesn't tap within 5 seconds, auto-proceed so they are never stuck
    const fallbackTimer = setTimeout(() => {
      if (!hasStartedSequenceRef.current) {
        startCinematicIntro();
      }
    }, 5000);

    return () => {
      clearTimeout(fallbackTimer);
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, [forcePlay]);

  const handleSkip = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    sessionStorage.setItem('rubishna_intro_completed', 'true');
    onComplete();
  };

  return (
    <div
      onClick={startCinematicIntro}
      onTouchStart={startCinematicIntro}
      className={`fixed inset-0 z-50 bg-[#000000] flex flex-col items-center justify-center select-none overflow-hidden transition-opacity duration-700 cursor-pointer ${
        phase === 'fade-out' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background cinematic radial gradient glow */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          phase === 'glow-sweep' || phase === 'title-reveal' || isWaitingForTap ? 'opacity-40' : 'opacity-0'
        } bg-[radial-gradient(circle_at_center,rgba(229,9,20,0.35)_0%,rgba(0,0,0,0.95)_70%)]`}
      />

      {/* When waiting for mobile tap to guarantee sound playback */}
      {isWaitingForTap ? (
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 animate-in fade-in zoom-in duration-300">
          <div className="mb-4 transform hover:scale-105 transition-transform">
            <RubishnaLogo variant="monogram" size="xl" animated />
          </div>

          <h1 className="font-cinematic text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-[0.25em] uppercase drop-shadow-[0_0_25px_rgba(229,9,20,0.8)] mb-2">
            <span className="text-[#E50914]">RUBI</span>SHNA
          </h1>

          <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-[#B3B3B3] font-semibold mb-7">
            A Personalized Cinematic Streaming Universe
          </p>

          {/* Primary Tap to Play Button */}
          <button
            type="button"
            onClick={startCinematicIntro}
            onTouchStart={startCinematicIntro}
            className="flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-[#FF1E27] via-[#E50914] to-[#B30710] text-white font-black text-xs sm:text-sm uppercase tracking-widest shadow-[0_0_35px_rgba(229,9,20,0.9)] animate-pulse active:scale-95 transition-all border border-white/30 cursor-pointer"
          >
            <Volume2 size={20} className="fill-white" />
            <span>PLAY INTRO WITH SOUND</span>
          </button>

          <p className="text-[11px] text-white/50 tracking-wider uppercase mt-4">
            Tap anywhere to enter with cinematic sound
          </p>
        </div>
      ) : (
        /* Active Cinematic Animation Sequence */
        <div className="relative flex flex-col items-center justify-center">
          {/* Monogram Stage */}
          <div
            className={`transform transition-all duration-1000 ease-out ${
              phase === 'init'
                ? 'opacity-0 scale-75'
                : phase === 'monogram-zoom'
                ? 'opacity-100 scale-100'
                : phase === 'glow-sweep'
                ? 'opacity-100 scale-110 drop-shadow-[0_0_50px_rgba(229,9,20,0.9)]'
                : 'opacity-100 scale-100'
            }`}
          >
            <RubishnaLogo variant="monogram" size="xl" animated={phase === 'glow-sweep' || phase === 'title-reveal'} />
          </div>

          {/* Wordmark Stage Reveal */}
          <div
            className={`mt-6 overflow-hidden transition-all duration-1000 ease-out ${
              phase === 'title-reveal' || phase === 'fade-out'
                ? 'max-h-24 opacity-100 translate-y-0'
                : 'max-h-0 opacity-0 translate-y-4'
            }`}
          >
            <h1 className="font-cinematic text-4xl sm:text-6xl md:text-7xl tracking-[0.3em] text-white font-black uppercase text-center drop-shadow-[0_0_20px_rgba(229,9,20,0.8)]">
              <span className="text-[#E50914]">RUBI</span>SHNA
            </h1>
            <p className="text-xs sm:text-sm tracking-[0.4em] uppercase text-[#B3B3B3] text-center mt-2 font-medium">
              An Original Story • Season 19
            </p>
          </div>
        </div>
      )}

      {/* Top right skip button (No mute option; sound is always active) */}
      <div className="absolute top-6 right-6 flex items-center gap-3 z-10">
        <button
          onClick={handleSkip}
          onTouchStart={handleSkip}
          className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-xs font-semibold uppercase tracking-widest text-white/90 hover:text-white transition-all backdrop-blur-md"
        >
          Skip
        </button>
      </div>
    </div>
  );
};
