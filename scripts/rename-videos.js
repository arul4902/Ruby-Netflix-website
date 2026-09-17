import fs from 'fs';
import path from 'path';

const videosDir = path.resolve('public/videos');
const files = fs.readdirSync(videosDir).filter(f => f.endsWith('.mp4'));

console.log(`Found ${files.length} video files in public/videos:`, files);

// Map files to clean, meaningful filenames
const nameMapping = [
  'rubi-pilot-story.mp4',
  'college-chronicles.mp4',
  'chaos-in-heels.mp4',
  'creator-mode-reel.mp4',
  'brigade-squad.mp4',
  'yugam-fest-2026.mp4',
  'campus-diaries.mp4',
];

const renamedFiles = [];

files.forEach((file, idx) => {
  const newName = nameMapping[idx] || `video-reel-${idx + 1}.mp4`;
  const oldPath = path.join(videosDir, file);
  const newPath = path.join(videosDir, newName);

  if (file !== newName) {
    fs.renameSync(oldPath, newPath);
    console.log(`Renamed: "${file}" -> "${newName}"`);
  }
  renamedFiles.push(newName);
});

console.log('Finished renaming videos:', renamedFiles);
