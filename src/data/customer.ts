import photo1Soft from '../assets/images/photo-1-soft.png';
import photo2Profile from '../assets/images/photo-2-profile.png';
import photo3Hero from '../assets/images/photo-3-hero.png';

export interface Episode {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  duration: string;
  progress?: number; // 0 - 100
  image: string;
  tag?: string;
  matchScore?: string;
  ageRating?: string;
  year?: string;
  season?: string;
  episodeNumber?: number;
  badge?: string;
  category?: string;
  aspectRatio?: '16:9' | '9:16' | '1:1';
  videoUrl?: string; // e.g. '/videos/my-video.mp4'
}

export interface CustomerProfile {
  name: string;
  nickname: string;
  alternateName: string;
  age: number;
  yearOfStudy: string;
  hobby: string;
  goal: string;
  instagramBio1: string;
  instagramBio2: string;
  photos: {
    hero: string;       // Favourite Photo #3
    profile: string;    // Favourite Photo #2
    softEra: string;    // Favourite Photo #1
  };
  favouriteSong: {
    title: string;
    artist: string;
    genre: string;
    album: string;
    year: string;
    vibe: string;
    audioSrc?: string;
    lyrics?: { time: number; text: string }[];
  };
  originalSoundtrack: {
    title: string;
    badge: string;
    subtitle: string;
    artist: string;
    presenter: string;
    audioSrc: string;
    lyrics: { time: number; text: string }[];
    fallbackMessage: string;
  };
  meetRubi: {
    title: string;
    headline: string;
    bodyQuote: string;
    tags: string[];
    stats: { label: string; value: string }[];
  };
  softEra: {
    title: string;
    quote: string;
    subtext: string;
  };
  creatorMode: {
    title: string;
    subtitle: string;
    goalQuote: string;
    stats: { metric: string; label: string }[];
  };
  cameraRoll: {
    title: string;
    subtitle: string;
    quote: string;
  };
  dreams: {
    title: string;
    quote: string;
    nextEpisodeTitle: string;
    status: string;
  };
  finale: {
    season: string;
    status: string;
    mainQuote: string;
    teaser: string;
    branding: string;
    credit: string;
  };
  rubiRating: {
    badge: string;
    age: number;
    descriptors: string[];
    description: string;
  };
  assetFocalPoints: {
    hero: string;
    profile: string;
    softEra: string;
  };
  featureFlags: {
    intro: boolean;
    profileSelector: boolean;
    profileTransition: boolean;
    storyTrailer: boolean;
    collegeEra: boolean;
    softEra: boolean;
    creatorMode: boolean;
    cameraRoll: boolean;
    favourites: boolean;
    soundtrack: boolean;
    dreams: boolean;
    surpriseMe: boolean;
    easterEgg: boolean;
    postCredits: boolean;
  };
}

export const CUSTOMER_DATA: CustomerProfile = {
  name: "Rubishna",
  nickname: "Rubi",
  alternateName: "Ruby",
  age: 19,
  yearOfStudy: "2nd-Year College Student",
  hobby: "Influencer / Content Creation",
  goal: "Become a successful influencer or reach a good position in life that makes all of this worth it",
  instagramBio1: "19 · chaos in heels & college uniform",
  instagramBio2: "FASHION · LAUGHS · REAL MOMENTS",
  photos: {
    hero: photo3Hero,       // Favourite photo #3 (Night rim light)
    profile: photo2Profile, // Favourite photo #2 (Eye cover against green backdrop)
    softEra: photo1Soft,    // Favourite photo #1 (Lilac soft portrait)
  },
  favouriteSong: {
    title: "நானாக இருப்பதே (Naanaga Iruppadhey)",
    artist: "Special Release • Rubi's Story",
    genre: "Soulful Tamil Melody • Self-Love",
    album: "Season 19 Official",
    year: "2026",
    vibe: "Main Character Energy",
    audioSrc: "/assets/audio/rubi-original.mp3",
  },
  originalSoundtrack: {
    title: "Hangova",
    badge: "RUBI'S ANTHEM",
    subtitle: "Anirudh Ravichander • Heavy Rotation",
    artist: "Anirudh Ravichander",
    presenter: "Heavy Rotation • Rubi's Top Vibe",
    audioSrc: "/assets/audio/hangova.mp3",
    fallbackMessage: "Hangova audio active 🎶",
    lyrics: [
      { time: 0, text: "♪ (Intro - Anirudh Bass Drop) ♪" },
      { time: 8, text: "Yeah! You like that slow and moonlight, dangerous vibe" },
      { time: 15, text: "You making me stay for a little while" },
      { time: 22, text: "You're my hangova, you're my hangova" },
      { time: 29, text: "Just relaxed when you move that slow" },
      { time: 36, text: "Just one more look and I'll lose my soul" },
      { time: 43, text: "You're my hangova, you're my hangova" },
      { time: 51, text: "Mouna raagangal pesudhe" },
      { time: 58, text: "Unadhu swaasangal serudhe" },
      { time: 66, text: "Iravin saralgal, iravu neeludhe" },
      { time: 73, text: "Minnal paarvaigal theendudhe" },
      { time: 80, text: "Enadhu dhegangal meerudhe" },
      { time: 88, text: "Kaadhal vaasanai mayakkum koodudhe" },
      { time: 95, text: "La la la la, lost in your hangova" },
      { time: 102, text: "La la la la, you lost in your hangova" },
      { time: 110, text: "You got those slow hands, warm and backseat heat" },
      { time: 117, text: "Every little move got me locking offbeat" },
      { time: 125, text: "You're my hangova, you're my hangova" },
      { time: 133, text: "You got that red lip whisper with that midnight flame" },
      { time: 140, text: "Walk out that baby and I ain't the same" },
      { time: 148, text: "You're my hangova, you're my hangova" },
      { time: 155, text: "♪ (Anirudh Synth Beat Drop) ♪" },
    ],
  },
  meetRubi: {
    title: "MEET THE MAIN CHARACTER",
    headline: "Rubi",
    bodyQuote: "19. Second-year student. Creator in progress. Professional overthinker? Maybe. Main character? Definitely.",
    tags: ["STUDENT", "CREATOR", "FASHION", "LAUGHS", "REAL MOMENTS"],
    stats: [
      { label: "Season", value: "19" },
      { label: "Role", value: "Main Character" },
      { label: "Aesthetic", value: "Chaos & Elegance" },
      { label: "Status", value: "Streaming Live" },
    ],
  },
  softEra: {
    title: "HER SOFT ERA",
    quote: "Not every episode needs chaos. Some are simply about becoming.",
    subtext: "Pastel silks, gentle afternoons, quiet ambitions, and learning to glow from within.",
  },
  creatorMode: {
    title: "Creator Mode: ON",
    subtitle: "Started as a hobby. Maybe becoming something bigger.",
    goalQuote: "Become a good influencer — or simply reach a place in life that makes all of this worth it.",
    stats: [
      { metric: "100%", label: "Authentic Rubi" },
      { metric: "24/7", label: "Creative Grind" },
      { metric: "∞", label: "Laughs & Takes" },
    ],
  },
  dreams: {
    title: "DREAMS LOADING...",
    quote: "She's still figuring it out. Still creating. Still learning. Still becoming.",
    nextEpisodeTitle: "Something Big",
    status: "COMING SOON",
  },
  cameraRoll: {
    title: "RUBI'S CAMERA ROLL",
    subtitle: "Curated Memories • Unfiltered Laughs • Behind The Lens",
    quote: "A camera roll isn't just photos. It's the proof of every laugh, every runway walk in college corridors, and every quiet dream.",
  },
  finale: {
    season: "SEASON 19",
    status: "CURRENTLY STREAMING",
    mainQuote: "This season is only the beginning.",
    teaser: "NEXT SEASON COMING SOON...",
    branding: "A RUBISHNA ORIGINAL",
    credit: "Personalized experience by Songify Your Moments",
  },
  rubiRating: {
    badge: "RUBI 19",
    age: 19,
    descriptors: ["Chaos", "Fashion", "College", "Dreams"],
    description: "Official Main Character Certification • 100% Unfiltered Rubi",
  },
  assetFocalPoints: {
    hero: "78% 25%",
    profile: "center 20%",
    softEra: "center 35%",
  },
  featureFlags: {
    intro: true,
    profileSelector: true,
    profileTransition: true,
    storyTrailer: true,
    collegeEra: true,
    softEra: true,
    creatorMode: true,
    cameraRoll: true,
    favourites: true,
    soundtrack: true,
    dreams: true,
    surpriseMe: true,
    easterEgg: true,
    postCredits: true,
  },
};

export interface CameraRollMemory {
  id: string;
  title: string;
  date: string;
  location: string;
  caption: string;
  image: string;
  videoUrl?: string;
  tags: string[];
  aspectRatio: 'portrait' | 'landscape' | 'square';
}

export const CAMERA_ROLL_MEMORIES: CameraRollMemory[] = [
  {
    id: "cr-1",
    title: "Corridor Fashion Runway",
    date: "Semester 03",
    location: "Campus Block A",
    caption: "Who decided college corridors can't be high-fashion catwalks? Heels clicking, textbooks in hand.",
    image: photo2Profile,
    videoUrl: "/videos/chaos-in-heels.mp4",
    tags: ["Fashion", "Campus", "Heels"],
    aspectRatio: "portrait",
  },
  {
    id: "cr-2",
    title: "Night Rim Light Aesthetic",
    date: "Season 19",
    location: "Studio Arc",
    caption: "Electric confidence under the evening rim lights. The frame that screams 'Main Character'.",
    image: photo3Hero,
    videoUrl: "/videos/rubi-pilot-story.mp4",
    tags: ["Cinematic", "Studio", "Vibes"],
    aspectRatio: "portrait",
  },
  {
    id: "cr-3",
    title: "Lilac Reverie & Soft Mornings",
    date: "Golden Hour",
    location: "Garden Courtyard",
    caption: "Not every episode needs chaos. Gentle breezes, pastel tones, and peace in becoming.",
    image: photo1Soft,
    tags: ["Soft Era", "Elegance", "Lilac"],
    aspectRatio: "portrait",
  },
  {
    id: "cr-4",
    title: "Yugam 2026 Stage Rehearsals",
    date: "Fest Season",
    location: "Main Auditorium",
    caption: "Stage lights, neon shadows, shouting over the bass, and making memories to last forever.",
    image: photo3Hero,
    videoUrl: "/videos/yugam-fest-2026.mp4",
    tags: ["Fest", "Yugam", "Squad"],
    aspectRatio: "square",
  },
  {
    id: "cr-5",
    title: "Brigade Canteen Summits",
    date: "1:15 PM Daily",
    location: "Canteen Corner",
    caption: "The sacred lunch debates, iced coffees, sharing assignments, and uncontrolled laughter.",
    image: photo2Profile,
    videoUrl: "/videos/brigade-squad.mp4",
    tags: ["Squad", "Laughs", "Food"],
    aspectRatio: "square",
  },
  {
    id: "cr-6",
    title: "The Uncut Draft Reel",
    date: "3:40 AM Take 14",
    location: "Creator Desk",
    caption: "Ring light reflections, trying to keep a straight face, and turning 20 bloopers into one viral hit.",
    image: photo1Soft,
    videoUrl: "/videos/creator-mode-reel.mp4",
    tags: ["Creator", "Bloopers", "Grind"],
    aspectRatio: "portrait",
  },
];

// Row 1: Continue Watching for Rubi (16:9)
export const CONTINUE_WATCHING: Episode[] = [
  {
    id: "cw-1",
    title: "Meet Rubi",
    subtitle: "S1:E1 • The Pilot Episode",
    description: "Introduction to Rubi at 19. Second-year college student balancing lectures, laughs, and content creation.",
    duration: "24m",
    progress: 88,
    image: photo2Profile,
    videoUrl: "/videos/rubi-pilot-story.mp4",
    tag: "99% Match",
    matchScore: "99%",
    ageRating: "U/A 16+",
    year: "2026",
    season: "Season 1",
    episodeNumber: 1,
    badge: "TOP 1 TODAY",
  },
  {
    id: "cw-2",
    title: "College Era",
    subtitle: "S1:E2 • Campus Chronicles",
    description: "From early morning morning lectures to corridor giggles and cafeteria summits with the squad.",
    duration: "32m",
    progress: 65,
    image: photo3Hero,
    videoUrl: "/videos/college-chronicles.mp4",
    tag: "Trending",
    matchScore: "98%",
    ageRating: "U/A 16+",
    year: "2026",
    season: "Season 1",
    episodeNumber: 2,
    badge: "NEW EPISODE",
  },
  {
    id: "cw-3",
    title: "Chaos in Heels",
    subtitle: "S1:E3 • Wardrobe & Wit",
    description: "Turning campus corridors into fashion runways. The art of looking chic while running late for attendance.",
    duration: "28m",
    progress: 42,
    image: photo1Soft,
    videoUrl: "/videos/chaos-in-heels.mp4",
    tag: "Fan Favourite",
    matchScore: "97%",
    ageRating: "U/A 16+",
    year: "2026",
    season: "Season 1",
    episodeNumber: 3,
  },
  {
    id: "cw-4",
    title: "Creator Mode",
    subtitle: "S1:E4 • The Frame Rate",
    description: "Behind the ring lights, draft folder chaos, retakes, and finding the authentic voice online.",
    duration: "35m",
    progress: 94,
    image: photo2Profile,
    videoUrl: "/videos/creator-mode-reel.mp4",
    tag: "Most Liked",
    matchScore: "99%",
    ageRating: "U/A 16+",
    year: "2026",
    season: "Season 1",
    episodeNumber: 4,
    badge: "MUST WATCH",
  },
  {
    id: "cw-5",
    title: "Little Moments",
    subtitle: "S1:E5 • Golden Hour",
    description: "Unplanned coffee runs, heartfelt late-night talks, spontaneous laughs, and real friendships.",
    duration: "21m",
    progress: 15,
    image: photo1Soft,
    videoUrl: "/videos/brigade-squad.mp4",
    tag: "Heartwarming",
    matchScore: "96%",
    ageRating: "U/A 16+",
    year: "2026",
    season: "Season 1",
    episodeNumber: 5,
  },
  {
    id: "cw-6",
    title: "Dreams Loading",
    subtitle: "S1:E6 • The Horizon",
    description: "When the assignments are done and the noise fades, envisioning the empire waiting to be built.",
    duration: "40m",
    progress: 5,
    image: photo3Hero,
    videoUrl: "/videos/yugam-fest-2026.mp4",
    tag: "Season Climax",
    matchScore: "100%",
    ageRating: "U/A 16+",
    year: "2026",
    season: "Season 1",
    episodeNumber: 6,
    badge: "FINALE PREVIEW",
  },
];

// College Era Episodes (Clicking triggers fullscreen video modal)
export const COLLEGE_ERA_EPISODES: Episode[] = [
  {
    id: "col-1",
    title: "Second Year",
    subtitle: "Episode 1 • Senior Enough, Chaotic As Ever",
    description: "Settling into the second year groove. Syllabus gets heavier, but the laughter gets louder.",
    duration: "29m",
    image: photo3Hero,
    videoUrl: "/videos/college-chronicles.mp4",
    tag: "Campus Life",
    year: "2026",
    badge: "FAN FAVOURITE",
  },
  {
    id: "col-2",
    title: "Campus Diaries",
    subtitle: "Episode 2 • Corridor Whispers & Library Bunking",
    description: "The official (and unofficial) tour of Rubi's favourite campus spots and canteen debates.",
    duration: "22m",
    image: photo2Profile,
    videoUrl: "/videos/campus-diaries.mp4",
    tag: "Comedy",
    year: "2026",
  },
  {
    id: "col-3",
    title: "Brigade Moments",
    subtitle: "Episode 3 • The High Energy Crew",
    description: "United by deadlines, coffee orders, and matching aesthetics. The squad in full force.",
    duration: "34m",
    image: photo1Soft,
    videoUrl: "/videos/brigade-squad.mp4",
    tag: "Squad Goals",
    year: "2026",
    badge: "TRENDING",
  },
  {
    id: "col-4",
    title: "Yugam 2026",
    subtitle: "Episode 4 • Fest Fever & Fest Lights",
    description: "College fest season at its peak: stage rehearsals, lights, neon crowds, and unforgettable nights.",
    duration: "45m",
    image: photo3Hero,
    videoUrl: "/videos/yugam-fest-2026.mp4",
    tag: "Special Event",
    year: "2026",
    badge: "SPECIAL",
  },
  {
    id: "col-5",
    title: "Friends & Chaos",
    subtitle: "Episode 5 • The Bloopers Reel",
    description: "When plans fail in the best way possible. 100% candid, zero filters, endless memories.",
    duration: "18m",
    image: photo2Profile,
    videoUrl: "/videos/chaos-in-heels.mp4",
    tag: "Unfiltered",
    year: "2026",
  },
  {
    id: "col-6",
    title: "Just Another College Day",
    subtitle: "Episode 6 • 8:30 AM Routine",
    description: "Rushing to class, looking iconic, surviving presentations, and thriving through it all.",
    duration: "26m",
    image: photo1Soft,
    videoUrl: "/videos/rubi-pilot-story.mp4",
    tag: "Day In The Life",
    year: "2026",
  },
];

// Creator Mode 9:16 Vertical Cards
export const CREATOR_MODE_ITEMS: Episode[] = [
  {
    id: "creator-1",
    title: "OOTD: Campus Edition",
    subtitle: "148K Views • 24.5K Likes",
    description: "Combining college uniform vibes with high-fashion streetwear accents.",
    duration: "0:45",
    image: photo2Profile,
    videoUrl: "/videos/creator-mode-reel.mp4",
    tag: "Viral",
    aspectRatio: "9:16",
    badge: "TOP REEL",
  },
  {
    id: "creator-2",
    title: "POV: Overthinking My Assignment",
    subtitle: "92K Views • 18.2K Likes",
    description: "Opening 45 tabs, staring at the ceiling, and producing a masterpiece at 3 AM.",
    duration: "0:30",
    image: photo3Hero,
    videoUrl: "/videos/chaos-in-heels.mp4",
    tag: "Humor",
    aspectRatio: "9:16",
    badge: "TRENDING SOUND",
  },
  {
    id: "creator-3",
    title: "Golden Hour Glow Up",
    subtitle: "210K Views • 38.9K Likes",
    description: "When the evening sunlight hits just right in traditional attire.",
    duration: "0:58",
    image: photo1Soft,
    videoUrl: "/videos/brigade-squad.mp4",
    tag: "Aesthetic",
    aspectRatio: "9:16",
    badge: "EXPLORE PAGE",
  },
  {
    id: "creator-4",
    title: "Night Out / Rim Light Vibes",
    subtitle: "180K Views • 31.0K Likes",
    description: "Cinematic portrait lighting, confidence in motion, and main character stance.",
    duration: "0:42",
    image: photo3Hero,
    videoUrl: "/videos/rubi-pilot-story.mp4",
    tag: "Cinematic",
    aspectRatio: "9:16",
    badge: "STAFF PICK",
  },
  {
    id: "creator-5",
    title: "Day in the Life of a 19yo Student",
    subtitle: "165K Views • 29.4K Likes",
    description: "Morning coffee $\\rightarrow$ Lectures $\\rightarrow$ Creating content $\\rightarrow$ Repeat.",
    duration: "1:15",
    image: photo2Profile,
    videoUrl: "/videos/college-chronicles.mp4",
    tag: "Vlog",
    aspectRatio: "9:16",
  },
];


// Favourites Supplied Movies/Shows (Preserved exact supplied names)
export interface MovieItem {
  id: string;
  title: string;
  genre: string;
  mood: string;
  logline: string;
  rating: string;
  accentGradient: string;
  matchScore: string;
}

export const FAVOURITE_MOVIES: MovieItem[] = [
  {
    id: "fav-1",
    title: "Sitaraman",
    genre: "Romance • Drama • Epic",
    mood: "Soul-stirring Letters",
    logline: "Timeless poetic love transcending borders and battlefield devotion.",
    rating: "9.1/10",
    accentGradient: "from-rose-950 via-red-900 to-black",
    matchScore: "99%",
  },
  {
    id: "fav-2",
    title: "Sachein",
    genre: "Romantic Comedy • College",
    mood: "Breezy Campus Nostalgia",
    logline: "Playful college romance, unforgettable banter, and youthful rain dances.",
    rating: "8.6/10",
    accentGradient: "from-amber-950 via-red-950 to-black",
    matchScore: "98%",
  },
  {
    id: "fav-3",
    title: "Gajini",
    genre: "Action • Psychological Thriller",
    mood: "High Voltage Emotion",
    logline: "Fierce memory, tragic devotion, and unstoppable vengeance.",
    rating: "8.8/10",
    accentGradient: "from-zinc-900 via-neutral-900 to-black",
    matchScore: "96%",
  },
  {
    id: "fav-4",
    title: "Hi Nana",
    genre: "Family Drama • Romance",
    mood: "Tearjerker Warmth",
    logline: "An emotional journey of fatherly love, second chances, and deep solace.",
    rating: "9.0/10",
    accentGradient: "from-orange-950 via-red-950 to-black",
    matchScore: "99%",
  },
  {
    id: "fav-5",
    title: "Vishwanth and Son",
    genre: "Family • Comedy Drama",
    mood: "Generational Dynamics",
    logline: "Laughter, family misunderstandings, and heartwarming reconciliation.",
    rating: "8.5/10",
    accentGradient: "from-yellow-950 via-zinc-900 to-black",
    matchScore: "94%",
  },
  {
    id: "fav-6",
    title: "Heart Beats",
    genre: "Musical Romance",
    mood: "Rhythmic Youth",
    logline: "When life syncs to the rhythm of college dreams and passionate beats.",
    rating: "8.7/10",
    accentGradient: "from-purple-950 via-red-950 to-black",
    matchScore: "95%",
  },
  {
    id: "fav-7",
    title: "The Court",
    genre: "Legal Drama • Suspense",
    mood: "Gripping Intellect",
    logline: "High-stakes courtroom battles where truth fights against every odd.",
    rating: "8.9/10",
    accentGradient: "from-slate-900 via-zinc-900 to-black",
    matchScore: "97%",
  },
  {
    id: "fav-8",
    title: "Sham Singa Row",
    genre: "Period Drama • Reincarnation",
    mood: "Fierce Rebirth & Passion",
    logline: "A fearless writer's enduring courage echoing across two lifetimes.",
    rating: "8.9/10",
    accentGradient: "from-emerald-950 via-red-950 to-black",
    matchScore: "98%",
  },
];

// More Like Rubi Shelf
export const MORE_LIKE_RUBI: Episode[] = [
  {
    id: "mlr-1",
    title: "Fashion Era",
    subtitle: "Curated Fits & Haute Couture",
    description: "Every outfit tells a story. Mixing classic grace with contemporary bold silhouettes.",
    duration: "Collection",
    image: photo1Soft,
    tag: "Style",
    badge: "TRENDING LOOKS",
  },
  {
    id: "mlr-2",
    title: "Campus Chaos",
    subtitle: "Behind The Lectures",
    description: "Unscripted moments, spontaneous laughs, and memories that outshine textbooks.",
    duration: "Collection",
    image: photo2Profile,
    tag: "Life",
    badge: "POPULAR",
  },
  {
    id: "mlr-3",
    title: "Camera Roll",
    subtitle: "4,218 Unsorted Treasures",
    description: "The blurry candids, aesthetic golden hours, and snapshots that make Rubi smile.",
    duration: "Collection",
    image: photo3Hero,
    tag: "Memories",
  },
  {
    id: "mlr-4",
    title: "Unfiltered Rubi",
    subtitle: "Real Moments • Zero Filters",
    description: "The honest, charming, humorous girl behind the camera. 100% genuine.",
    duration: "Collection",
    image: photo2Profile,
    tag: "Real",
    badge: "MUST SEE",
  },
  {
    id: "mlr-5",
    title: "Soft Girl Episode",
    subtitle: "Serenity & Lilac Skies",
    description: "A gentler pace. Slowing down, breathing deep, and admiring the journey.",
    duration: "Collection",
    image: photo1Soft,
    tag: "Peace",
  },
  {
    id: "mlr-6",
    title: "Creator Diaries",
    subtitle: "Building The Vision",
    description: "From a casual hobby to dreaming big. The creative blueprint of Rubi.",
    duration: "Collection",
    image: photo3Hero,
    tag: "Vision",
    badge: "INSPIRING",
  },
];
