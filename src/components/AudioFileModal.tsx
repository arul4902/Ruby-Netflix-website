import React, { useState, useRef } from 'react';
import { useAudio } from '../context/AudioContext';
import { RubishnaLogo } from './RubishnaLogo';
import {
  X,
  Folder,
  UploadCloud,
  CheckCircle2,
  Copy,
  Music,
  Disc,
  Headphones,
  FileAudio,
} from 'lucide-react';

export const AudioFileModal: React.FC = () => {
  const {
    isFolderGuideOpen,
    setIsFolderGuideOpen,
    loadCustomAudioFile,
    soundtrackCustomFileName,
    favouriteCustomFileName,
    activeTrack,
    playTrack,
  } = useAudio();

  const [selectedTarget, setSelectedTarget] = useState<'soundtrack' | 'favourite'>(
    activeTrack
  );
  const [copiedPath, setCopiedPath] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isFolderGuideOpen) return null;

  const folderPath = 'e:\\Ruby - The Main Character\\public\\assets\\audio\\';

  const handleCopyPath = () => {
    navigator.clipboard.writeText(folderPath).then(() => {
      setCopiedPath(true);
      setTimeout(() => setCopiedPath(false), 2500);
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      loadCustomAudioFile(file, selectedTarget);
      setIsFolderGuideOpen(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      loadCustomAudioFile(file, selectedTarget);
      setIsFolderGuideOpen(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="audio-modal-title"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 select-none animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-2xl bg-[#181818] border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Background Ambient Glow */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#E50914]/20 rounded-full filter blur-[80px] pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-red-950/20 rounded-full filter blur-[80px] pointer-events-none" />

        {/* Header */}
        <div className="relative z-10 flex items-start justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <RubishnaLogo variant="monogram" size="sm" />
            <div>
              <h3 id="audio-modal-title" className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                <span>Place Your Own Audio</span>
                <span className="text-[10px] font-black uppercase text-[#E50914] bg-[#E50914]/20 px-2 py-0.5 rounded border border-[#E50914]/30">
                  Folder & Local Audio
                </span>
              </h3>
              <p className="text-xs text-[#B3B3B3]">
                Play your own personal songs for the Soundtrack & Favourite Song
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsFolderGuideOpen(false)}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/70 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body Content */}
        <div className="relative z-10 overflow-y-auto py-5 space-y-6">
          {/* Target Track Selector Tabs */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-[#B3B3B3] mb-2 block">
              Which song are you replacing?
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setSelectedTarget('soundtrack')}
                className={`p-3.5 rounded-xl border flex items-center gap-3 transition-all text-left ${
                  selectedTarget === 'soundtrack'
                    ? 'bg-[#E50914]/15 border-[#E50914] text-white shadow-lg'
                    : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                }`}
              >
                <Disc
                  size={24}
                  className={selectedTarget === 'soundtrack' ? 'text-[#E50914] animate-spin' : 'text-white/50'}
                  style={{ animationDuration: '6s' }}
                />
                <div className="truncate">
                  <p className="text-xs sm:text-sm font-extrabold truncate">1. Original Soundtrack</p>
                  <p className="text-[11px] text-[#B3B3B3] truncate">
                    {soundtrackCustomFileName ? `Active: ${soundtrackCustomFileName}` : 'Anthem • Bottom Player'}
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedTarget('favourite')}
                className={`p-3.5 rounded-xl border flex items-center gap-3 transition-all text-left ${
                  selectedTarget === 'favourite'
                    ? 'bg-[#E50914]/15 border-[#E50914] text-white shadow-lg'
                    : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                }`}
              >
                <Headphones
                  size={24}
                  className={selectedTarget === 'favourite' ? 'text-[#E50914]' : 'text-white/50'}
                />
                <div className="truncate">
                  <p className="text-xs sm:text-sm font-extrabold truncate">2. Favourite Song</p>
                  <p className="text-[11px] text-[#B3B3B3] truncate">
                    {favouriteCustomFileName ? `Active: ${favouriteCustomFileName}` : 'Hangova • On Repeat'}
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Option 1: Instant In-Browser File Picker & Drop Zone */}
          <div className="bg-black/40 border border-white/10 rounded-xl p-5">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#E50914] mb-1">
              <UploadCloud size={16} />
              <span>Method 1: Instant File Selector (From Any Folder)</span>
            </div>
            <p className="text-xs text-[#B3B3B3] mb-4">
              Select any audio file from any folder on your computer right now to instantly play it:
            </p>

            {/* Dropzone */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                dragOver
                  ? 'border-[#E50914] bg-[#E50914]/15 scale-[1.01]'
                  : 'border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="audio/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <FileAudio size={36} className="mx-auto text-[#E50914] mb-2 animate-bounce" />
              <p className="text-sm font-bold text-white">
                Click to browse or Drag & Drop audio file here
              </p>
              <p className="text-xs text-[#B3B3B3] mt-1">
                Supports MP3, WAV, M4A, AAC, FLAC, OGG
              </p>
            </div>
          </div>

          {/* Option 2: Permanent Project Folder Placement */}
          <div className="bg-black/40 border border-white/10 rounded-xl p-5">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-400 mb-1">
              <Folder size={16} />
              <span>Method 2: Permanent Project Folder Placement</span>
            </div>
            <p className="text-xs text-[#B3B3B3] mb-3">
              If you want the song to automatically load whenever you open the website, copy your audio file directly into this folder:
            </p>

            {/* Copyable Path Box */}
            <div className="flex items-center justify-between gap-2 p-3 rounded-lg bg-black/60 border border-white/15 font-mono text-xs text-white">
              <span className="truncate select-all">{folderPath}</span>
              <button
                type="button"
                onClick={handleCopyPath}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-white font-sans text-xs font-bold shrink-0 transition-colors"
              >
                {copiedPath ? <CheckCircle2 size={14} className="text-green-400" /> : <Copy size={14} />}
                <span>{copiedPath ? 'Copied!' : 'Copy Path'}</span>
              </button>
            </div>

            {/* File Names Guide */}
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#B3B3B3]">
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                <span className="text-white font-bold block mb-0.5">Soundtrack file name:</span>
                <code className="text-[#E50914] font-mono font-bold">rubi-original.mp3</code>
              </div>
              <div className="p-2.5 rounded-lg bg-white/5 border border-white/10">
                <span className="text-white font-bold block mb-0.5">Favourite song name:</span>
                <code className="text-[#E50914] font-mono font-bold">hangova.mp3</code>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-[#B3B3B3]">
            <Music size={14} className="text-[#E50914]" />
            <span>Dual Engine: High-fidelity audio with synth fallback active</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                playTrack(selectedTarget);
                setIsFolderGuideOpen(false);
              }}
              className="px-4 py-2 rounded-full bg-[#E50914] hover:bg-[#b80710] text-white text-xs font-extrabold uppercase tracking-wider transition-all shadow-lg"
            >
              Stream Now
            </button>
            <button
              onClick={() => setIsFolderGuideOpen(false)}
              className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
