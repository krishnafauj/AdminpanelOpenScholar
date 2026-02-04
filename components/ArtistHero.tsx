"use client";
import React from 'react';

interface ArtistHeroProps {
  image: string;
  name: string;
  description: string;
  tags: string[];
}

const ArtistHero = ({ image, name, description, tags }: ArtistHeroProps) => {
  return (
    <div className="bg-transparent  w-full relative">

      {/* THE PURPLE BACKGROUND GLOW (REDUCED)
        - bg-purple-600/10: Lower opacity (was /40) makes it much fainter.
        - blur-[60px]: Lower blur (was 90px) keeps it tighter.
      */}
      <div className="absolute top-0 right-0 md:left-40 bottom-0 bg-purple-600/5 blur-[60px] rounded-full pointer-events-none z-0 mix-blend-screen" />

      <div className="
         relative z-10 
         flex flex-col md:flex-row 
         items-start
          md:items-start 
         gap-4 md:gap-6 px-4 
         max-w-6xl mx-auto
      ">

        {/* IMAGE */}
        <div className="
          relative group shrink-0
          w-28 h-28 
          md:w-40 md:h-40 
          lg:w-48 lg:h-48 
          rounded-full overflow-hidden 
          border-2 border-zinc-800 
        ">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover grayscale-[20%] contrast-125 transition-transform duration-700 group-hover:scale-110"
          />
        </div>

        {/* TEXT CONTAINER */}
        <div className="  md:text-left flex flex-col  h-full  md:mt-4 flex-1 min-w-0">

          <h1 className="
    font-grotesk uppercase tracking-[0.05em] text-white
    font-black
    
    /* 1. Allow wrapping */
    whitespace-normal 
    
    /* 2. Tighten line height so stacked text looks good */
    leading-[0.9]
    
    /* 3. Reduce mobile size slightly if needed */
    text-5xl     
    md:text-5xl 
    lg:text-5xl 
    xl:text-7xl
    mb-2 md:mb-3
  ">
            {name}
          </h1>

          <p className="text-[#D9D9D9] font-medium text-xs md:text-sm leading-relaxed mb-3 max-w-lg">
            {description}
          </p>

          <div className="text-[#828282] text-[10px] md:text-xs font-bold uppercase tracking-widest flex flex-wrap gap-0.1 justify-center md:justify-start">
            {tags.map((tag, index) => (
              <span key={index}>
                {tag}
                {index < tags.length - 1 && <span className="text-zinc-800 mx-2">•</span>}
              </span>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ArtistHero;