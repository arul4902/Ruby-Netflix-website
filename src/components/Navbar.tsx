import React, { useState, useEffect } from 'react';
import { CUSTOMER_DATA } from '../data/customer';
import { RubishnaLogo } from './RubishnaLogo';
import {
  Search,
  Music,
  Menu,
  X,
  ChevronDown,
  RefreshCw,
  LogOut,
  Sparkles,
  Dices,
  Home,
  Film,
  GraduationCap,
  Clapperboard,
  Camera,
  Heart,
} from 'lucide-react';
import { uiSounds } from '../utils/soundEffects';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  onOpenSearch: () => void;
  onOpenSurpriseMe?: () => void;
  onReplayIntro: () => void;
  onSwitchProfile: () => void;
  isPlayingAudio: boolean;
  onToggleAudio: () => void;
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigate,
  onOpenSearch,
  onOpenSurpriseMe,
  onReplayIntro,
  onSwitchProfile,
  isPlayingAudio,
  onToggleAudio,
  activeSection = 'home',
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'my-story', label: 'My Story', icon: Film },
    { id: 'college-era', label: 'College Era', icon: GraduationCap },
    { id: 'creator-mode', label: 'Creator Mode', icon: Clapperboard },
    { id: 'camera-roll', label: 'Camera Roll', icon: Camera },
    { id: 'favourites', label: 'Favourites', icon: Heart },
    { id: 'soundtrack', label: 'Soundtrack', icon: Music },
    { id: 'dreams', label: 'Dreams', icon: Sparkles },
  ];

  const handleLinkClick = (id: string) => {
    uiSounds.click();
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-500 ease-in-out px-3 sm:px-8 md:px-12 py-2.5 sm:py-4 flex items-center justify-between ${
          isScrolled
            ? 'bg-[#141414]/95 backdrop-blur-md shadow-2xl border-b border-white/5'
            : 'bg-gradient-to-b from-black/95 via-black/60 to-transparent'
        }`}
      >
        {/* Left: Responsive Logo and Desktop Links */}
        <div className="flex items-center gap-6 lg:gap-8 shrink-0">
          <button
            onClick={() => handleLinkClick('home')}
            onMouseEnter={() => uiSounds.hover()}
            className="focus:outline-none transition-transform duration-200 active:scale-95 shrink-0"
            aria-label="Rubishna Home"
          >
            {/* Desktop: size md; Mobile: size sm */}
            <span className="hidden sm:inline-block">
              <RubishnaLogo variant="full" size="md" />
            </span>
            <span className="sm:hidden inline-block">
              <RubishnaLogo variant="full" size="sm" />
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex items-center gap-5 lg:gap-6 text-sm font-medium">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => handleLinkClick(link.id)}
                  onMouseEnter={() => uiSounds.hover()}
                  className={`transition-colors duration-200 tracking-wide text-xs lg:text-sm ${
                    activeSection === link.id
                      ? 'text-white font-bold border-b-2 border-[#E50914] pb-0.5'
                      : 'text-[#B3B3B3] hover:text-white'
                  }`}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: Actions and Mobile Menu Button */}
        <div className="flex items-center gap-1.5 sm:gap-4 shrink-0">
          {/* Search Button */}
          <button
            onClick={() => {
              uiSounds.modalOpen();
              onOpenSearch();
            }}
            onMouseEnter={() => uiSounds.hover()}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors focus:outline-none shrink-0"
            aria-label="Search Rubi's Streaming Universe"
            title="Search episodes & movies"
          >
            <Search size={18} />
          </button>

          {/* Surprise Me Quick Button (Tablet/Desktop) */}
          {onOpenSurpriseMe && (
            <button
              onClick={() => {
                uiSounds.easterEgg();
                onOpenSurpriseMe();
              }}
              onMouseEnter={() => uiSounds.hover()}
              className="hidden sm:flex p-2 text-white/80 hover:text-[#E50914] hover:bg-white/10 rounded-full transition-colors focus:outline-none shrink-0"
              aria-label="Pick Random Episode"
              title="Surprise Me (Random Episode)"
            >
              <Dices size={19} />
            </button>
          )}

          {/* Soundtrack Quick Controller */}
          <button
            onClick={() => {
              uiSounds.click();
              onToggleAudio();
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border text-xs font-semibold tracking-wider transition-all duration-300 focus:outline-none shrink-0 ${
              isPlayingAudio
                ? 'bg-[#E50914] text-white border-[#E50914] shadow-[0_0_12px_rgba(229,9,20,0.6)]'
                : 'bg-white/5 text-[#B3B3B3] border-white/15 hover:border-white/30 hover:text-white'
            }`}
            title="Toggle Soundtrack"
          >
            <Music size={13} className={isPlayingAudio ? 'animate-spin text-white' : ''} />
            <span className="hidden md:inline">
              {isPlayingAudio ? 'Soundtrack Playing' : 'Soundtrack'}
            </span>
          </button>

          {/* Profile Dropdown (Desktop/Tablet) */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center gap-1 group p-1 focus:outline-none shrink-0"
              aria-label="Open Profile Menu"
            >
              <div className="w-8 h-8 rounded-md overflow-hidden border border-white/20 group-hover:border-[#E50914] transition-colors shadow-md">
                <img
                  src={CUSTOMER_DATA.photos.profile}
                  alt={CUSTOMER_DATA.nickname}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <ChevronDown
                size={14}
                className={`text-[#B3B3B3] group-hover:text-white transition-transform duration-200 ${
                  isProfileMenuOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Profile Dropdown Menu */}
            {isProfileMenuOpen && (
              <div className="absolute right-0 mt-3 w-64 bg-[#181818] border border-white/15 rounded-lg shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-4 py-3 border-b border-white/10 flex items-center gap-3">
                  <img
                    src={CUSTOMER_DATA.photos.profile}
                    alt={CUSTOMER_DATA.name}
                    className="w-10 h-10 rounded-md object-cover"
                  />
                  <div>
                    <p className="text-sm font-bold text-white leading-tight">{CUSTOMER_DATA.name}</p>
                    <p className="text-[11px] text-[#E50914] font-semibold uppercase tracking-wider">
                      Main Character • 19
                    </p>
                  </div>
                </div>

                <div className="py-1 text-xs text-[#B3B3B3]">
                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      onReplayIntro();
                    }}
                    className="w-full text-left px-4 py-2.5 hover:bg-white/10 hover:text-white flex items-center gap-2.5 transition-colors"
                  >
                    <RefreshCw size={14} />
                    <span>Replay Cinematic Intro</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      onSwitchProfile();
                    }}
                    className="w-full text-left px-4 py-2.5 hover:bg-white/10 hover:text-white flex items-center gap-2.5 transition-colors"
                  >
                    <LogOut size={14} />
                    <span>Switch Profile</span>
                  </button>
                </div>

                <div className="px-4 py-2.5 border-t border-white/10 bg-black/40 text-[10px] text-white/50 flex items-center justify-between">
                  <span>Songify Your Moments</span>
                  <Sparkles size={12} className="text-[#E50914]" />
                </div>
              </div>
            )}
          </div>

          {/* Prominent Mobile Menu Toggle Button (Always visible on mobile) */}
          <button
            onClick={() => {
              uiSounds.click();
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            className={`md:hidden flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border transition-all duration-200 focus:outline-none shrink-0 ${
              isMobileMenuOpen
                ? 'bg-[#E50914] text-white border-[#E50914] shadow-[0_0_12px_rgba(229,9,20,0.6)]'
                : 'bg-white/10 hover:bg-white/20 text-white border-white/15'
            }`}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            <span className="text-[11px] font-bold uppercase tracking-wider">
              {isMobileMenuOpen ? 'Close' : 'Menu'}
            </span>
          </button>
        </div>
      </header>

      {/* Full-Screen Mobile Drawer Menu (z-50, sits above bottom player) */}
      {isMobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          className="fixed inset-0 z-50 bg-[#121212]/98 backdrop-blur-2xl md:hidden flex flex-col justify-between overflow-y-auto animate-in fade-in duration-200 p-5 select-none"
        >
          {/* Top Bar: Profile Showcase & Close Button */}
          <div className="flex items-center justify-between pb-5 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl overflow-hidden border-2 border-[#E50914] shadow-lg shrink-0">
                <img
                  src={CUSTOMER_DATA.photos.profile}
                  alt={CUSTOMER_DATA.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-white leading-tight">
                  {CUSTOMER_DATA.name}
                </h3>
                <p className="text-[11px] text-[#E50914] font-bold uppercase tracking-wider">
                  Season 19 • Lead Character
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                uiSounds.click();
                setIsMobileMenuOpen(false);
              }}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* Center: Full Navigation Grid / List */}
          <div className="py-4 space-y-1">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#B3B3B3] mb-2 px-3">
              Explore Rubishna Universe
            </p>
            <div className="grid grid-cols-1 gap-1">
              {navLinks.map((link) => {
                const IconComponent = link.icon;
                const isActive = activeSection === link.id;

                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-left font-bold text-sm transition-all flex items-center justify-between ${
                      isActive
                        ? 'bg-[#E50914] text-white shadow-lg'
                        : 'text-[#B3B3B3] hover:text-white hover:bg-white/5 active:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent size={18} className={isActive ? 'text-white' : 'text-[#E50914]'} />
                      <span>{link.label}</span>
                    </div>
                    {isActive && (
                      <span className="text-[10px] font-black uppercase bg-black/40 px-2 py-0.5 rounded">
                        Active
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bottom Actions: Surprise Me, Intro, Switch Profile, Footer */}
          <div className="border-t border-white/10 pt-4 space-y-2">
            {/* Quick Surprise Me Button */}
            {onOpenSurpriseMe && (
              <button
                onClick={() => {
                  uiSounds.easterEgg();
                  setIsMobileMenuOpen(false);
                  onOpenSurpriseMe();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-red-950 to-black border border-red-800/40 text-xs font-black uppercase text-white shadow-md active:scale-98 transition-transform"
              >
                <Dices size={16} className="text-[#E50914]" />
                <span>🎲 Surprise Me (Random Episode)</span>
              </button>
            )}

            <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
              <button
                onClick={() => {
                  uiSounds.click();
                  setIsMobileMenuOpen(false);
                  onReplayIntro();
                }}
                className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#B3B3B3] hover:text-white flex items-center justify-center gap-2 transition-colors font-medium"
              >
                <RefreshCw size={13} />
                <span>Replay Intro</span>
              </button>

              <button
                onClick={() => {
                  uiSounds.click();
                  setIsMobileMenuOpen(false);
                  onSwitchProfile();
                }}
                className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#B3B3B3] hover:text-white flex items-center justify-center gap-2 transition-colors font-medium"
              >
                <LogOut size={13} />
                <span>Switch Profile</span>
              </button>
            </div>

            <p className="text-[10px] text-center text-white/40 pt-2 font-mono">
              RUBISHNA • SEASON 19 • STREAMING LIVE
            </p>
          </div>
        </div>
      )}
    </>
  );
};
