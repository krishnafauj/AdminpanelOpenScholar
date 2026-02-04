"use client";
import React, { useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { usePlayer } from '@/context/PlayerContext';

export default function GlobalPlayer() {
  const { 
    currentTrack, 
    isPlaying, 
    togglePlay, 
    playNext, 
    playPrevious, 
    seek, 
    duration, 
    seekTo,
    volume,       
    changeVolume  
  } = usePlayer();

  const lastSkipTimeRef = useRef<number>(0);

  // --- SMART FORWARD LOGIC ---
  const handleSmartForward = () => {
    const now = Date.now();
    const timeSinceLastPress = now - lastSkipTimeRef.current;

    if (timeSinceLastPress < 300) {
      playNext();
    } else {
      seekTo(Math.min(seek + 5, duration));
    }
    
    lastSkipTimeRef.current = now;
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).tagName === 'INPUT' || (e.target as HTMLElement).tagName === 'TEXTAREA') return;

      if (e.code === 'Space') {
        e.preventDefault(); 
        togglePlay();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        handleSmartForward();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        seekTo(Math.max(seek - 5, 0));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlay, seek, duration, seekTo, playNext]);

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    seekTo(Number(e.target.value));
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    changeVolume(Number(e.target.value));
  };

  if (!currentTrack) return null;

  return (
    <>
      <div className={`
          absolute bottom-0 left-0 w-full
          h-20 bg-black/90 backdrop-blur-md border-t border-zinc-800 z-50 min-w-[320px]
          slide-up-anim
      `}>
        
        {/* --- PROGRESS BAR --- */}
        <div className="w-full h-1 group cursor-pointer absolute top-0 z-10">
          <div className="w-full h-full bg-zinc-800">
            <div className="h-full bg-white group-hover:bg-green-500 transition-colors relative" style={{ width: `${(seek / duration) * 100}%` }}>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 shadow-md"></div>
            </div>
          </div>
          <input type="range" min="0" max={duration || 0} value={seek} onChange={handleSeekChange} className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer" />
        </div>

        <div className="relative w-full h-full flex items-center px-4 md:px-6 justify-between">

          {/* 1. LEFT: Track Info (Expanded to fill available space) */}
          <div className="flex items-center gap-3 flex-1 min-w-0 mr-4">
            <img src={currentTrack.image} alt={currentTrack.title} className="w-10 h-10 md:w-12 md:h-12 rounded-lg object-cover shadow-md shrink-0" />
            <div className="overflow-hidden">
              <h4 className="text-white text-xs md:text-sm font-bold truncate">{currentTrack.title}</h4>
              <p className="text-zinc-500 text-[10px] md:text-xs truncate">Soundverse AI</p>
            </div>
          </div>

          {/* 2. CONTROLS: 
             - Mobile: ml-auto (Pushed to Right), Static Position
             - Desktop: Absolute Center
          */}
          <div className="
              flex flex-col items-center gap-1 
              ml-auto                        /* Mobile: Push to right */
              md:ml-0                        /* Desktop: Reset margin */
              md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 /* Desktop: Center Absolute */
          ">
            <div className="flex items-center gap-4 md:gap-6">
              <button onClick={playPrevious} className="text-zinc-400 hover:text-white transition p-1"><SkipBack size={20} /></button>

              <button onClick={togglePlay} className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center hover:scale-105 transition active:scale-95 shadow-sm">
                {isPlaying ? <Pause size={18} fill="black" className="text-black" /> : <Play size={18} fill="black" className="text-black ml-0.5" />}
              </button>

              <button onClick={handleSmartForward} className="text-zinc-400 hover:text-white transition p-1"><SkipForward size={20} /></button>
            </div>
            {/* Time is hidden on very small screens if it gets too crowded, or make text smaller */}
            <div className="text-[9px] md:text-[10px] text-zinc-500 font-medium whitespace-nowrap">
              {(seek / 60).toFixed(0)}:{Math.floor(seek % 60).toString().padStart(2, '0')} / {(duration / 60).toFixed(0)}:{Math.floor(duration % 60).toString().padStart(2, '0')}
            </div>
          </div>

          {/* 3. RIGHT: Volume Control (Desktop Only) */}
          {/* This stays hidden on mobile, so Controls take the right spot */}
          <div className="hidden md:flex w-1/4 items-center justify-end gap-2 ml-auto group">
            <button onClick={() => changeVolume(volume === 0 ? 0.5 : 0)}>
                {volume === 0 ? <VolumeX size={18} className="text-zinc-400" /> : <Volume2 size={18} className="text-zinc-400" />}
            </button>
            
            <div className="w-24 h-1 bg-zinc-800 rounded-full relative flex items-center">
               <div className="h-full bg-zinc-400 rounded-full group-hover:bg-white transition-colors" style={{ width: `${volume * 100}%` }}></div>
               <input 
                 type="range" 
                 min="0" 
                 max="1" 
                 step="0.01" 
                 value={volume} 
                 onChange={handleVolumeChange} 
                 className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
               />
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .slide-up-anim {
          animation: slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </>
  );
}