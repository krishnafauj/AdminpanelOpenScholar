"use client";

import React from 'react';

import { ChevronLeft, X, Play, Pause } from 'lucide-react';

import { MUSIC_STYLES } from '@/data';

import { usePlayer } from '@/context/PlayerContext';

import { useUI } from '@/context/UiContext'; // Import UI Context

import { DashboardView } from '@/components/DashBoard/DashboardView';

// --- StyleCard Component ---

const StyleCard = ({ data }: { data: any }) => {

  const { playTrack, currentTrack, isPlaying } = usePlayer();

  const isCurrent = currentTrack?.id === data.id;

  const isNowPlaying = isCurrent && isPlaying;



  return (

    <div
      onClick={() => playTrack(data, MUSIC_STYLES)} // PASS MUSIC_STYLES for Queue
      className={`group relative w-full h-full flex flex-col p-2 rounded-[20px] cursor-pointer transition-all duration-300 border ${isCurrent ? 'bg-zinc-900 border-transparent ' : 'bg-transparent border-transparent hover:bg-zinc-900/10'}`}
    >
      <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-4 shadow-lg bg-zinc-800 shrink-0">
        <img src={data.image} alt={data.title} className={`w-full h-full object-cover transition-transform duration-500 ${isCurrent ? 'scale-105' : 'group-hover:scale-110'}`} />
        <div className={`absolute inset-0 bg-black/40 backdrop-blur-[1px] flex items-center justify-center transition-opacity duration-300 ${isCurrent || isNowPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
          <div className={`w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 hover:scale-105 transition-transform ${isNowPlaying ? 'border-white' : ''}`}>
            {isNowPlaying ? <Pause fill="white" size={20} /> : <Play fill="white" className="ml-1" size={20} />}
          </div>
        </div>

      </div>

      <div className="text-center px-1 flex-grow flex flex-col justify-start">

        <h3 className={`text-sm mb-1.5 tracking-wide ${isCurrent ? 'text-white font-bold' : 'text-white'}`}>{data.title}</h3>

        <p className="text-zinc-500 text-[10px] font-medium leading-relaxed line-clamp-2">{data.desc}</p>

      </div>

    </div>

  );

};


export default function Home() {
  const { isMainOpen, closeMain, openMain } = useUI();

  // EMPTY STATE (If main panel is closed)

  if (!isMainOpen) {

    return (

      <div className="h-full w-full bg-[#0e0e0f] flex flex-col items-center justify-center text-zinc-500 animate-in fade-in duration-500">

        <p className="text-sm uppercase tracking-widest mb-4 font-bold opacity-50">Content Hidden</p>

        <button onClick={openMain} className="text-xs border border-zinc-800 px-4 py-2 rounded-full hover:bg-zinc-900 hover:text-white transition-colors">

          Reopen Content

        </button>
      
      </div>

    );

  }



  // CONTENT STATE

  return (

<div className="bg-white h-full text-black font-sans selection:bg-purple-500/30 overflow-hidden flex flex-col animate-in slide-in-from-bottom-4 duration-500 fade-in">
      <DashboardView />
    </div>

  );

}