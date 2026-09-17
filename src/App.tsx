import React, { useState, useEffect } from 'react';
import {
  CONTINUE_WATCHING,
  type Episode,
} from './data/customer';
import { AudioProvider, useAudio } from './context/AudioContext';
import { IntroAnimation } from './components/IntroAnimation';
import { ProfileSelector } from './components/ProfileSelector';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ContentRow } from './components/ContentRow';
import { MeetRubi } from './components/MeetRubi';
import { CollegeEra } from './components/CollegeEra';
import { HerSoftEra } from './components/HerSoftEra';
import { CreatorMode } from './components/CreatorMode';
import { CameraRollMontage } from './components/CameraRollMontage';
import { FavouritesSection } from './components/FavouritesSection';
import { OriginalSoundtrackSection } from './components/OriginalSoundtrackSection';
import { DreamsSection } from './components/DreamsSection';
import { MoreLikeRubi } from './components/MoreLikeRubi';
import { Finale } from './components/Finale';
import { EpisodeModal } from './components/EpisodeModal';
import { VideoPlayer } from './components/VideoPlayer';
import { SearchModal } from './components/SearchModal';
import { StoryTrailer } from './components/StoryTrailer';
import { SurpriseMeModal } from './components/SurpriseMeModal';
import { EasterEggModal } from './components/EasterEggModal';
import { MusicPlayer } from './components/MusicPlayer';

const AppContent: React.FC = () => {
  // App Experience States
  const [hasCompletedIntro, setHasCompletedIntro] = useState<boolean>(() => {
    return sessionStorage.getItem('rubishna_intro_completed') === 'true';
  });

  const [hasSelectedProfile, setHasSelectedProfile] = useState<boolean>(() => {
    return sessionStorage.getItem('rubishna_profile_selected') === 'true';
  });

  const [forceReplayIntro, setForceReplayIntro] = useState<boolean>(false);

  // Modals & Playback
  const [selectedModalEpisode, setSelectedModalEpisode] = useState<Episode | null>(null);
  const [activeVideoEpisode, setActiveVideoEpisode] = useState<Episode | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isStoryTrailerOpen, setIsStoryTrailerOpen] = useState(false);
  const [isSurpriseMeOpen, setIsSurpriseMeOpen] = useState(false);
  const [isEasterEggOpen, setIsEasterEggOpen] = useState(false);

  // Active Section Tracker
  const [activeSection, setActiveSection] = useState('home');

  // Shared Audio System
  const { isPlaying, togglePlay, playTrack } = useAudio();

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'home',
        'my-story',
        'college-era',
        'creator-mode',
        'camera-roll',
        'favourites',
        'soundtrack',
        'dreams',
      ];
      const scrollPos = window.scrollY + 250;

      for (const secId of sections) {
        const el = document.getElementById(secId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(secId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleReplayIntro = () => {
    sessionStorage.removeItem('rubishna_intro_completed');
    sessionStorage.removeItem('rubishna_profile_selected');
    setForceReplayIntro(true);
    setHasCompletedIntro(false);
    setHasSelectedProfile(false);
  };

  const handleSwitchProfile = () => {
    sessionStorage.removeItem('rubishna_profile_selected');
    setHasSelectedProfile(false);
  };

  // Launch Full Story Trailer
  const handlePlayHeroStory = () => {
    setIsStoryTrailerOpen(true);
  };

  const handleOpenHeroMoreInfo = () => {
    setSelectedModalEpisode(CONTINUE_WATCHING[0]);
  };

  // 1. Cinematic Intro Screen
  if (!hasCompletedIntro) {
    return (
      <IntroAnimation
        forcePlay={forceReplayIntro}
        onComplete={() => {
          setHasCompletedIntro(true);
          setForceReplayIntro(false);
        }}
      />
    );
  }

  // 2. Profile Selection Screen ("Who's Watching?") with Secret Entry Transition
  if (!hasSelectedProfile) {
    return (
      <ProfileSelector
        onSelectProfile={() => {
          setHasSelectedProfile(true);
        }}
        onUnlockAudio={() => {
          playTrack('soundtrack');
        }}
      />
    );
  }

  // 3. Main Streaming Platform Home Experience
  return (
    <div className="relative min-h-screen bg-[#141414] text-white selection:bg-[#E50914] selection:text-white overflow-x-clip">
      {/* Fixed Streaming Navbar */}
      <Navbar
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenSurpriseMe={() => setIsSurpriseMeOpen(true)}
        onReplayIntro={handleReplayIntro}
        onSwitchProfile={handleSwitchProfile}
        isPlayingAudio={isPlaying}
        onToggleAudio={() => togglePlay()}
        activeSection={activeSection}
      />

      {/* Hero Showcase using Favourite Photo #3 with Play My Story launching the Full Trailer */}
      <Hero
        onPlay={handlePlayHeroStory}
        onMoreInfo={handleOpenHeroMoreInfo}
        onSurpriseMe={() => setIsSurpriseMeOpen(true)}
        onUnlockEasterEgg={() => setIsEasterEggOpen(true)}
        isMuted={!isPlaying}
        onToggleMute={() => togglePlay()}
      />

      {/* Main Content Rows & Custom Sections */}
      <main className="relative z-10 -mt-8 sm:-mt-14 pb-24 space-y-4 sm:space-y-6">
        {/* Row 1: Continue Watching for Rubi */}
        <ContentRow
          title="Continue Watching for Rubi"
          subtitle="Pick up where you left off"
          badge="SEASON 19"
          items={CONTINUE_WATCHING}
          onPlay={(ep) => setActiveVideoEpisode(ep)}
          onSelect={(ep) => setSelectedModalEpisode(ep)}
          aspectRatio="16:9"
        />

        {/* Meet Rubi Spotlight Section using Favourite Photo #2 */}
        <MeetRubi onPlayTrailer={handlePlayHeroStory} />

        {/* College Era Interactive Chronicles */}
        <CollegeEra onPlayEpisode={(ep) => setActiveVideoEpisode(ep)} />

        {/* Her Soft Era Spotlight using Favourite Photo #1 */}
        <HerSoftEra />

        {/* Creator Mode 9:16 Vertical Video Reels */}
        <CreatorMode onPlayReel={(item) => setActiveVideoEpisode(item)} />

        {/* Innovation: Rubi's Camera Roll Montage & Creator Dream Interlude */}
        <CameraRollMontage />

        {/* Favourites ("Because Rubi Watched..." + Hangova / Custom Song Equalizer Card) */}
        <FavouritesSection />

        {/* Innovation: Dedicated On-Page Original Soundtrack Section with Custom Audio Chooser */}
        <OriginalSoundtrackSection />

        {/* Dreams Section (Dreams Loading... Next Chapter Teaser) */}
        <DreamsSection />

        {/* More Like Rubi Shelf */}
        <MoreLikeRubi
          onPlayEpisode={(item) => setActiveVideoEpisode(item)}
          onSelectEpisode={(item) => setSelectedModalEpisode(item)}
        />

        {/* Grand Finale Section with 19 Particles and Post-Credit Surprise */}
        <Finale onReplayStory={handlePlayHeroStory} />
      </main>

      {/* Custom Original Soundtrack Docked Bottom Bar Player with Choose Song and Folder Guide */}
      <MusicPlayer />

      {/* Detail Episode Modal */}
      <EpisodeModal
        item={selectedModalEpisode}
        onClose={() => setSelectedModalEpisode(null)}
        onPlayEpisode={(ep) => {
          setSelectedModalEpisode(null);
          setActiveVideoEpisode(ep);
        }}
      />

      {/* Fullscreen Interactive Video Player with Episode Opening Titles */}
      <VideoPlayer
        episode={activeVideoEpisode}
        onClose={() => setActiveVideoEpisode(null)}
      />

      {/* Search Drawer / Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onPlayEpisode={(ep) => setActiveVideoEpisode(ep)}
        onSelectEpisode={(ep) => setSelectedModalEpisode(ep)}
      />

      {/* Fullscreen "My Story" Cinematic Story Trailer */}
      <StoryTrailer
        isOpen={isStoryTrailerOpen}
        onClose={() => setIsStoryTrailerOpen(false)}
        onExploreEpisodes={() => handleNavigate('college-era')}
      />

      {/* "🎲 Surprise Me" Random Episode Roulette Modal */}
      <SurpriseMeModal
        isOpen={isSurpriseMeOpen}
        onClose={() => setIsSurpriseMeOpen(false)}
        onPlayEpisode={(ep) => setActiveVideoEpisode(ep)}
      />

      {/* Hidden "19" Achievement Unlocked Easter Egg Modal */}
      <EasterEggModal
        isOpen={isEasterEggOpen}
        onClose={() => setIsEasterEggOpen(false)}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AudioProvider>
      <AppContent />
    </AudioProvider>
  );
};

export default App;
