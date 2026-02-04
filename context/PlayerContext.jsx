"use client";
import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import { Howl } from "howler";

const PlayerContext = createContext();

export const usePlayer = () => useContext(PlayerContext);

export const PlayerProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5); // Default volume 50%
  
  const [queue, setQueue] = useState([]); 
  const [seek, setSeek] = useState(0);    
  const [duration, setDuration] = useState(0); 
  
  const soundRef = useRef(null);
  const rafRef = useRef(null);

  const playTrack = (track, trackList = []) => {
    if (trackList.length > 0) setQueue(trackList);
    else if (queue.length === 0) setQueue([track]);

    if (currentTrack?.id === track.id) {
      togglePlay();
      return;
    }

    if (soundRef.current) {
      soundRef.current.unload();
      cancelAnimationFrame(rafRef.current);
    }

    setCurrentTrack(track);
    setIsPlaying(true);

    const sound = new Howl({
      src: [track.audioUrl],
      html5: true,
      volume: volume, // Initialize with current volume state
      onplay: () => {
        setIsPlaying(true);
        setDuration(sound.duration());
        startSeekUpdater();
      },
      onpause: () => {
        setIsPlaying(false);
        cancelAnimationFrame(rafRef.current);
      },
      onend: () => {
        setIsPlaying(false);
        playNext();
      },
      onseek: () => {
        setSeek(sound.seek());
      },
      onload: () => {
         setDuration(sound.duration());
      }
    });

    soundRef.current = sound;
    sound.play();
  };

  const togglePlay = () => {
    if (!soundRef.current) return;
    if (isPlaying) {
      soundRef.current.pause();
    } else {
      soundRef.current.play();
    }
  };

  // --- NEW: Volume Control Function ---
  const changeVolume = (newVolume) => {
    setVolume(newVolume);
    // If audio is playing/loaded, update it immediately
    if (soundRef.current) {
      soundRef.current.volume(newVolume);
    }
  };

  const playNext = () => {
    if (!currentTrack || queue.length === 0) return;
    const currentIndex = queue.findIndex((t) => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % queue.length; 
    playTrack(queue[nextIndex]);
  };

  const playPrevious = () => {
     if (!currentTrack || queue.length === 0) return;
     const currentIndex = queue.findIndex((t) => t.id === currentTrack.id);
     if (soundRef.current && soundRef.current.seek() > 3) {
        soundRef.current.seek(0);
        return;
     }
     const prevIndex = currentIndex === 0 ? queue.length - 1 : currentIndex - 1;
     playTrack(queue[prevIndex]);
  };

  const seekTo = (amount) => {
    if (soundRef.current) {
      soundRef.current.seek(amount);
      setSeek(amount);
    }
  };

  const startSeekUpdater = () => {
    const update = () => {
      if (soundRef.current && soundRef.current.playing()) {
        setSeek(soundRef.current.seek());
        rafRef.current = requestAnimationFrame(update);
      }
    };
    rafRef.current = requestAnimationFrame(update);
  };

  useEffect(() => {
    return () => {
      if (soundRef.current) soundRef.current.unload();
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <PlayerContext.Provider value={{ 
        currentTrack, 
        isPlaying, 
        playTrack, 
        togglePlay, 
        playNext, 
        playPrevious,
        seek,
        duration,
        seekTo,
        // Export volume controls
        volume,
        changeVolume 
    }}>
      {children}
    </PlayerContext.Provider>
  );
};