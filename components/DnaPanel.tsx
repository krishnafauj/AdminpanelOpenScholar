"use client";
import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { useUI } from '@/context/UiContext';

// --- 1. NEW COMPONENT: Animated Sliding Toggle ---
// This replaces the old static containers to give you the "sliding pill" animation
const AnimatedToggle = ({ 
  options, 
  active, 
  onChange 
}: { 
  options: string[], 
  active: string, 
  onChange: (val: string) => void 
}) => {
  return (
    <div className="bg-zinc-950/50 rounded-full p-1 flex relative mb-3 min-h-9 shrink-0 cursor-pointer ">
      {/* The Moving Background Pill */}
      <div 
        className={`absolute top-1 bottom-1 rounded-full bg-[#474d54] shadow-sm transition-all duration-300 ease-out`}
        style={{
          width: `calc(50% - 4px)`,
          // If the first option is active, move to left (4px). If second, move to 50% + padding.
          left: active === options[0] ? '4px' : 'calc(50%)' 
        }}
      />
      
      {/* The Text Labels */}
      {options.map((option) => (
        <div 
          key={option}
          onClick={() => onChange(option)}
          className={`
            flex-1 flex items-center justify-center text-[10px] font-medium z-10 transition-colors duration-200 select-none
            ${active === option ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}
          `}
        >
          {option}
        </div>
      ))}
    </div>
  );
};

// --- 2. Helper Components (Kept mostly the same) ---
const SectionLabel = ({ text }: { text: string }) => (
  <span className="text-white text-[8px] mb-2 uppercase tracking-widest text-center block opacity-60">
    {text}
  </span>
);

// Updated PillButton to be interactive
const PillButton = ({ text, active, onClick }: { text: string; active: boolean; onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`
      rounded-full px-3 py-1.5 text-[10px] transition-all min-w-[50px] border border-transparent
      ${active 
        ? 'bg-[#474d54] text-white shadow-sm border-zinc-600' 
        : 'bg-[#181a1c] text-zinc-400 hover:text-white hover:bg-zinc-800 hover:border-zinc-700'
      }
    `}
  >
    {text}
  </button>
);

// --- 3. MAIN COMPONENT ---
export default function DnaPanel() {
  const { isDnaOpen, closeDna } = useUI();

  // --- STATE MANAGEMENT FOR OPTIONS ---
  const [styleMode, setStyleMode] = useState("Core Style");
  const [inputType, setInputType] = useState("Lyrics");
  const [outputType, setOutputType] = useState("Song");

  return (
    <div 
      className={`
        font-inter bg-black text-white flex flex-col shadow-2xl z-40 overflow-hidden
        transition-all duration-500 ease-in-out border-zinc-800
        
        h-[100dvh]
        
        /* Layout Logic: Overlay on Tablet, Push on Desktop */
        absolute lg:relative 
        left-[84px] lg:left-0
        
        /* Width Animation */
        ${isDnaOpen 
            ? 'w-80 border-r opacity-100 translate-x-0' 
            : 'w-0 border-none opacity-0 -translate-x-10'
        }
      `}
    >

      {/* HEADER */}
      <div className="pb-2 pt-6 shrink-0 flex justify-between items-start pl-6 pr-6 min-w-[320px]">
        <h1 className='text-3xl font-grotesk font-black ' >
          DNA
        </h1>
        <button onClick={closeDna} className="text-white hover:text-zinc-400 transition-colors mt-1 active:scale-90 transform duration-200">
          <X size={17} strokeWidth={2.5} />
        </button>
      </div>

      {/* CONTENT SCROLL AREA */}
      <div className="flex-1 overflow-y-auto py-2 mt-4 min-h-0 no-scrollbar flex flex-col pl-6 pr-6 min-w-[320px]">

        {/* 1. STYLE TOGGLE (Animated) */}
        <AnimatedToggle 
          options={["Core Style", "Signature Sound"]}
          active={styleMode}
          onChange={setStyleMode}
        />

        {/* 2. ATTACH MODEL */}
        <div className="flex flex-col items-center mb-4 shrink-0 mt-2">
          <SectionLabel text="Attach Model" />
          <button className="w-24 h-24 bg-[#181a1c] rounded-[18px] flex items-center justify-center transition-all group shadow-inner border border-zinc-800/50 hover:border-zinc-700 active:scale-95 duration-200">
            <div className="bg-zinc-800/80 group-hover:bg-zinc-700 p-1.5 rounded-full transition-colors">
              <Plus className="text-white" size={16} strokeWidth={2} />
            </div>
          </button>
        </div>

        {/* 3. OUTPUT SELECTION (Interactive Pills) */}
        <div className="mb-8 mt-6 shrink-0">
          <SectionLabel text="Select the output" />
          <div className="flex gap-1.5 w-full justify-center">
            {["Song", "Instrumental", "Singing"].map((type) => (
              <PillButton 
                key={type} 
                text={type} 
                active={outputType === type} 
                onClick={() => setOutputType(type)}
              />
            ))}
          </div>
        </div>

        {/* 4. INPUT TYPE TOGGLE (Animated) */}
        <AnimatedToggle 
          options={["Describe Song", "Lyrics"]}
          active={inputType}
          onChange={setInputType}
        />

        {/* 5. TEXT AREA INPUT */}
        <div className="relative group flex-1 min-h-[60px] flex flex-col mb-2">
          <textarea
            className="w-full h-40 bg-[#1c1c1c] border border-zinc-800/50 rounded-[20px] p-4 text-white placeholder-zinc-600 resize-none focus:outline-none focus:ring-1 focus:ring-zinc-700 focus:bg-zinc-900 transition-all text-[12px] leading-relaxed"
            placeholder={inputType === "Lyrics" ? "Enter your own lyrics..." : "Describe the mood, genre, and instruments..."}
            spellCheck={false}
          ></textarea>
          
          {/* Helper Buttons */}
          <div className="flex justify-between items-center mb-2 mt-2 shrink-0">
            <div className="flex gap-1.5">
              <button className="bg-zinc-800 hover:bg-zinc-700 text-white rounded-full px-2.5 py-1 text-[9px] transition-colors border border-zinc-700/50">Help me write</button>
              <button className="bg-transparent hover:bg-zinc-900 text-white hover:text-white rounded-full px-2.5 py-1 text-[9px] transition-colors border border-zinc-800">Clear</button>
            </div>
            <span className="text-zinc-500 text-[9px] tracking-wider">0/3000</span>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="px-6 py-10 pb-24 xl:pb-10 shrink-0 bg-black z-20 min-w-[320px]">
        <button className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-full py-3 text-[13px] tracking-wide shadow-lg shadow-indigo-900/20 transition-all active:scale-[0.98]">
          Create
        </button>
      </div>

      {/* Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        .font-inter { font-family: 'Inter', sans-serif; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}