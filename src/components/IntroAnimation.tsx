import React, { useEffect, useState, useRef } from 'react';
import { RubishnaLogo } from './RubishnaLogo';
import { Volume2, VolumeX } from 'lucide-react';

interface IntroAnimationProps {
  onComplete: () => void;
  forcePlay?: boolean;
}

export const IntroAnimation: React.FC<IntroAnimationProps> = ({
  onComplete,
  forcePlay = false,
}) => {
  const [phase, setPhase] = useState<'init' | 'monogram-zoom' | 'glow-sweep' | 'title-reveal' | 'fade-out'>('init');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const audioContextRef = useRef<AudioContext | null>(null);

  // Synthesize original Rubishna cinematic chord using Web Audio API (Zero copyrighted audio)
  const playCinematicSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      const now = ctx.currentTime;

      // 1. Deep Sub-Bass Rumble (Cinema Impact)
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(55, now); // A1 note
      subOsc.frequency.exponentialRampToValueAtTime(36, now + 2.2);

      subGain.gain.setValueAtTime(0.001, now);
      subGain.gain.exponentialRampToValueAtTime(0.4, now + 0.3);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 2.8);

      subOsc.connect(subGain);
      subGain.connect(ctx.destination);
      subOsc.start(now);
      subOsc.stop(now + 2.8);

      // 2. Cinematic Brass/Synth Swell (Rich Harmonic Chord)
      [110, 164.8, 220, 277.2].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = idx % 2 === 0 ? 'sawtooth' : 'triangle';
        osc.frequency.setValueAtTime(freq, now + 0.1);

        // Low-pass filter for warmth
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(300, now);
        filter.frequency.exponentialRampToValueAtTime(2400, now + 1.2);
        filter.frequency.exponentialRampToValueAtTime(400, now + 2.5);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.08, now + 0.5);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 2.5);
      });

      // 3. Shimmering Ribbon Sparkle
      const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 1.5, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < noiseBuffer.length; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const bandpass = ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.setValueAtTime(3200, now + 0.5);
      bandpass.Q.setValueAtTime(3, now + 0.5);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.0001, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.04, now + 0.8);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.0);

      whiteNoise.connect(bandpass);
      bandpass.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      whiteNoise.start(now + 0.5);
      whiteNoise.stop(now + 2.2);
    } catch {
      // Audio context might be restricted before user gesture; gracefully proceed
    }
  };

  useEffect(() => {
    // Check if intro was already played in this session
    if (!forcePlay && sessionStorage.getItem('rubishna_intro_completed') === 'true') {
      onComplete();
      return;
    }

    // Sequence the cinematic phases
    const t0 = setTimeout(() => {
      setPhase('monogram-zoom');
      if (soundEnabled) playCinematicSound();
    }, 100);

    const t1 = setTimeout(() => {
      setPhase('glow-sweep');
    }, 1200);

    const t2 = setTimeout(() => {
      setPhase('title-reveal');
    }, 2400);

    const t3 = setTimeout(() => {
      setPhase('fade-out');
    }, 4200);

    const t4 = setTimeout(() => {
      sessionStorage.setItem('rubishna_intro_completed', 'true');
      onComplete();
    }, 4900);

    return () => {
      clearTimeout(t0);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, [forcePlay, soundEnabled]);

  const handleSkip = () => {
    sessionStorage.setItem('rubishna_intro_completed', 'true');
    onComplete();
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#000000] flex flex-col items-center justify-center select-none overflow-hidden transition-opacity duration-700 ${
        phase === 'fade-out' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background cinematic radial gradient glow */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          phase === 'glow-sweep' || phase === 'title-reveal' ? 'opacity-40' : 'opacity-0'
        } bg-[radial-gradient(circle_at_center,rgba(229,9,20,0.3)_0%,rgba(0,0,0,0.95)_70%)]`}
      />

      {/* Center Cinematic Monogram Animation */}
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

      {/* Top right quick controls */}
      <div className="absolute top-6 right-6 flex items-center gap-3 z-10">
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all backdrop-blur-md"
          title={soundEnabled ? 'Mute Intro Sound' : 'Unmute Intro Sound'}
        >
          {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>

        <button
          onClick={handleSkip}
          className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 text-xs font-semibold uppercase tracking-widest text-white/90 hover:text-white transition-all backdrop-blur-md"
        >
          Skip
        </button>
      </div>
    </div>
  );
};
