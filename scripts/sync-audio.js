import fs from 'fs';
import path from 'path';

const audioDir = 'e:/Ruby - The Main Character/public/audio';
const assetsAudioDir = 'e:/Ruby - The Main Character/public/assets/audio';

if (!fs.existsSync(assetsAudioDir)) {
  fs.mkdirSync(assetsAudioDir, { recursive: true });
}

// Check files in audioDir
const files = fs.readdirSync(audioDir);
console.log('Files in public/audio:', files);

// Copy Hangova
const hangovaFile = files.find(f => f.toLowerCase().includes('hangova'));
if (hangovaFile) {
  const src = path.join(audioDir, hangovaFile);
  fs.copyFileSync(src, path.join(assetsAudioDir, 'hangova.mp3'));
  fs.copyFileSync(src, path.join(audioDir, 'hangova.mp3'));
  console.log('Copied Hangova to hangova.mp3');
}

// Copy Tamil track: நானாக இருப்பதே.mp3 ("Naanaga Iruppadhey" / Being Myself - Rubishna's original soundtrack song!)
const tamilTrack = files.find(f => f.includes('நானாக') || f.endsWith('.mp3') && f !== hangovaFile);
if (tamilTrack) {
  const src = path.join(audioDir, tamilTrack);
  fs.copyFileSync(src, path.join(assetsAudioDir, 'rubi-original.mp3'));
  fs.copyFileSync(src, path.join(audioDir, 'rubi-original.mp3'));
  fs.copyFileSync(src, path.join(audioDir, 'naanaga-iruppadhey.mp3'));
  fs.copyFileSync(src, path.join(assetsAudioDir, tamilTrack));
  console.log('Copied Tamil track to rubi-original.mp3 and naanaga-iruppadhey.mp3');
}
