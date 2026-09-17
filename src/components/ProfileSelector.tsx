import React, { useState } from 'react';
import { CUSTOMER_DATA } from '../data/customer';
import { RubishnaLogo } from './RubishnaLogo';
import { Plus, Sparkles, Play, Check } from 'lucide-react';
import { uiSounds } from '../utils/soundEffects';

interface ProfileSelectorProps {
  onSelectProfile: () => void;
  onUnlockAudio?: () => void;
}

export const ProfileSelector: React.FC<ProfileSelectorProps> = ({
  onSelectProfile,
  onUnlockAudio,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isEntering, setIsEntering] = useState(false);
  const [isManaging, setIsManaging] = useState(false);

  const handleSelect = (profileName: string) => {
    if (profileName !== 'Rubi') return;
    uiSounds.selectProfile();
    setSelectedId('rubi');
    setIsEntering(true);

    if (onUnlockAudio) {
      onUnlockAudio();
    }

    sessionStorage.setItem('rubishna_profile_selected', 'true');

    // 2.2-second cinematic personalized entry transition
    setTimeout(() => {
      onSelectProfile();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-40 bg-[#141414] flex flex-col items-center justify-between p-6 md:p-12 select-none overflow-hidden">
      {/* Cinematic Profile Entry Transition Overlay */}
      {isEntering && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center animate-fadeIn duration-500 overflow-hidden">
          {/* Crimson Radial Ambient Bloom */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(229,9,20,0.35)_0%,rgba(0,0,0,0.98)_70%)] animate-pulse" />

          {/* Expanding Portrait with Glow */}
          <div className="relative z-10 w-44 h-44 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border-2 border-[#E50914] shadow-[0_0_80px_rgba(229,9,20,0.8)] transform scale-110 transition-transform duration-1000 ease-out">
            <img
              src={CUSTOMER_DATA.photos.profile}
              alt={CUSTOMER_DATA.name}
              className="w-full h-full object-cover object-top filter brightness-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          </div>

          {/* Entering Story Title Cards */}
          <div className="relative z-10 text-center mt-8 animate-slideUp">
            <p className="text-xs sm:text-sm font-black uppercase tracking-[0.4em] text-[#E50914] drop-shadow-[0_0_15px_rgba(229,9,20,0.8)]">
              Now Streaming
            </p>
            <h1 className="font-cinematic text-5xl sm:text-7xl md:text-8xl font-black text-white uppercase tracking-[0.2em] my-2">
              <span className="text-[#E50914]">RUBI</span>
            </h1>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.3em] text-[#B3B3B3]">
              Season 19 • The Main Character
            </p>
          </div>
        </div>
      )}

      {/* Top Header Logo */}
      <header className="w-full max-w-6xl flex items-center justify-between">
        <RubishnaLogo variant="full" size="md" />
        <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#B3B3B3] uppercase bg-black/40 px-3.5 py-1.5 rounded-full border border-white/10">
          <Sparkles size={14} className="text-[#E50914]" />
          <span>Songify Edition</span>
        </div>
      </header>

      {/* Main Profile Selection Block */}
      <main className="flex flex-col items-center justify-center my-auto py-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-white mb-8 sm:mb-12 text-center tracking-tight">
          Who's watching?
        </h2>

        {/* Profile Grid */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 max-w-4xl">
          {/* Rubi - The Main Character Profile */}
          <button
            onClick={() => handleSelect('Rubi')}
            onMouseEnter={() => uiSounds.hover()}
            className="group flex flex-col items-center focus:outline-none transition-transform duration-300"
          >
            <div
              className={`relative w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                selectedId === 'rubi'
                  ? 'border-[#E50914] scale-105 ring-4 ring-[#E50914]/40 shadow-[0_0_40px_rgba(229,9,20,0.7)]'
                  : 'border-transparent group-hover:border-white group-hover:scale-105 group-focus:border-white shadow-2xl'
              }`}
            >
              <img
                src={CUSTOMER_DATA.photos.profile}
                alt={CUSTOMER_DATA.name}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Main Character Crown / Badge */}
              <div className="absolute top-2 right-2 bg-[#E50914] text-white text-[10px] font-black tracking-widest px-1.5 py-0.5 rounded shadow-lg uppercase">
                VIP
              </div>

              {selectedId === 'rubi' && (
                <div className="absolute inset-0 bg-[#E50914]/25 flex items-center justify-center backdrop-blur-[2px]">
                  <div className="bg-[#E50914] text-white p-2 rounded-full shadow-lg animate-bounce">
                    <Check size={20} className="stroke-[3]" />
                  </div>
                </div>
              )}
            </div>

            <span className="mt-3 sm:mt-4 text-base sm:text-xl font-medium text-[#B3B3B3] group-hover:text-white transition-colors tracking-wide flex items-center gap-1.5">
              {CUSTOMER_DATA.nickname}
              <span className="text-[10px] bg-white/10 text-white/80 px-1.5 py-0.5 rounded font-bold">19</span>
            </span>
            <span className="text-xs text-[#E50914] font-semibold tracking-wider uppercase mt-0.5 opacity-80 group-hover:opacity-100">
              The Main Character
            </span>
          </button>

          {/* Add Profile (Disabled playful slot) */}
          <div className="group flex flex-col items-center opacity-40 cursor-not-allowed">
            <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-xl border-2 border-dashed border-white/30 flex items-center justify-center transition-all bg-white/5">
              <Plus size={42} className="text-white/40" />
            </div>
            <span className="mt-3 sm:mt-4 text-base sm:text-xl font-medium text-[#B3B3B3] tracking-wide">
              Squad Member
            </span>
            <span className="text-xs text-[#B3B3B3]/60 mt-0.5">
              Rubi Only Experience
            </span>
          </div>
        </div>

        {/* Enter Rubi's World Primary Action Button */}
        <div className="mt-10 sm:mt-14 flex flex-col items-center gap-4">
          <button
            onClick={() => handleSelect('Rubi')}
            className="flex items-center gap-2.5 px-8 py-3.5 bg-[#E50914] hover:bg-[#b80710] text-white font-black text-sm sm:text-base tracking-widest uppercase rounded-md shadow-[0_0_30px_rgba(229,9,20,0.5)] transition-all transform hover:scale-105 active:scale-95"
          >
            <Play size={18} className="fill-white" />
            <span>Enter Rubi's World ▶</span>
          </button>

          <button
            onClick={() => setIsManaging(!isManaging)}
            className="px-6 py-1.5 text-xs text-[#B3B3B3]/70 hover:text-white tracking-widest uppercase transition-colors"
          >
            {isManaging ? 'Done' : 'Manage Profiles'}
          </button>
        </div>

        {isManaging && (
          <p className="text-xs text-white/50 mt-4 tracking-wide text-center">
            Currently streaming in Ultra 4K • Profile: Rubishna (Age 19, 2nd Year)
          </p>
        )}
      </main>

      {/* Footer Branding */}
      <footer className="w-full text-center text-xs text-[#B3B3B3]/60 tracking-wider">
        A RUBISHNA ORIGINAL • Built with Songify Your Moments
      </footer>
    </div>
  );
};
