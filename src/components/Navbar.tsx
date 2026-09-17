import React, { useState, useEffect } from 'react';
import { CUSTOMER_DATA } from '../data/customer';
import { RubishnaLogo } from './RubishnaLogo';
import { Search, Music, Menu, X, ChevronDown, RefreshCw, LogOut, Sparkles, Dices } from 'lucide-react';
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

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'my-story', label: 'My Story' },
    { id: 'college-era', label: 'College Era' },
    { id: 'creator-mode', label: 'Creator Mode' },
    { id: 'camera-roll', label: 'Camera Roll' },
    { id: 'favourites', label: 'Favourites' },
    { id: 'soundtrack', label: 'Soundtrack' },
    { id: 'dreams', label: 'Dreams' },
  ];

  const handleLinkClick = (id: string) => {
    uiSounds.click();
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-30 transition-all duration-500 ease-in-out px-4 sm:px-8 md:px-12 py-3 sm:py-4 flex items-center justify-between ${
          isScrolled
            ? 'bg-[#141414]/95 backdrop-blur-md shadow-2xl border-b border-white/5'
            : 'bg-gradient-to-b from-black/90 via-black/50 to-transparent'
        }`}
      >
        {/* Left: Monogram Logo and Main Navigation */}
        <div className="flex items-center gap-8">
          <button
            onClick={() => handleLinkClick('home')}
            onMouseEnter={() => uiSounds.hover()}
            className="focus:outline-none transition-transform duration-200 active:scale-95"
            aria-label="Rubishna Home"
          >
            <RubishnaLogo variant="full" size="md" />
          </button>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex items-center gap-6 text-sm font-medium">
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

        {/* Right: Search, Audio Toggle, Profile Avatar, Mobile Menu Trigger */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Search Button */}
          <button
            onClick={() => {
              uiSounds.modalOpen();
              onOpenSearch();
            }}
            onMouseEnter={() => uiSounds.hover()}
            className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors focus:outline-none"
            aria-label="Search Rubi's Streaming Universe"
            title="Search episodes & movies"
          >
            <Search size={19} />
          </button>

          {/* Innovation: Surprise Me Quick Button */}
          {onOpenSurpriseMe && (
            <button
              onClick={() => {
                uiSounds.easterEgg();
                onOpenSurpriseMe();
              }}
              onMouseEnter={() => uiSounds.hover()}
              className="p-2 text-white/80 hover:text-[#E50914] hover:bg-white/10 rounded-full transition-colors focus:outline-none"
              aria-label="Pick Random Episode"
              title="Surprise Me (Random Episode)"
            >
              <Dices size={20} />
            </button>
          )}

          {/* Soundtrack Quick Controller */}
          <button
            onClick={onToggleAudio}
            className={`flex items-center gap-2 px-2.5 sm:px-3 py-1.5 rounded-full border text-xs font-semibold tracking-wider transition-all duration-300 focus:outline-none ${
              isPlayingAudio
                ? 'bg-[#E50914] text-white border-[#E50914] shadow-[0_0_15px_rgba(229,9,20,0.6)] animate-pulse'
                : 'bg-white/5 text-[#B3B3B3] border-white/15 hover:border-white/30 hover:text-white'
            }`}
            title="Toggle Rubi's Original Soundtrack"
          >
            <Music size={14} className={isPlayingAudio ? 'animate-spin' : ''} />
            <span className="hidden sm:inline">
              {isPlayingAudio ? 'Soundtrack Playing' : 'Soundtrack'}
            </span>
          </button>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center gap-1.5 group p-1 focus:outline-none"
              aria-label="Open Profile Menu"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-md overflow-hidden border border-white/20 group-hover:border-[#E50914] transition-colors shadow-md">
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

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white/80 hover:text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-20 bg-black/95 backdrop-blur-xl md:hidden pt-20 px-6 pb-10 flex flex-col justify-between animate-in fade-in duration-200">
          <ul className="flex flex-col gap-4 text-lg font-semibold text-[#B3B3B3]">
            {navLinks.map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => handleLinkClick(link.id)}
                  className={`w-full text-left py-2 transition-colors flex items-center justify-between ${
                    activeSection === link.id ? 'text-[#E50914] font-bold' : 'hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  {activeSection === link.id && <span className="w-2 h-2 rounded-full bg-[#E50914]" />}
                </button>
              </li>
            ))}
          </ul>

          <div className="border-t border-white/15 pt-6 flex flex-col gap-3">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onReplayIntro();
              }}
              className="flex items-center gap-3 py-2 text-sm text-[#B3B3B3] hover:text-white"
            >
              <RefreshCw size={16} />
              <span>Replay Cinematic Intro</span>
            </button>
            <p className="text-xs text-white/40 tracking-wider">
              RUBISHNA • Season 19 • Personalized Streaming Platform
            </p>
          </div>
        </div>
      )}
    </>
  );
};
