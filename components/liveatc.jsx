"use client"

import React, { useState, useEffect, useRef } from 'react'

export default function LiveATC() {
  const [volume, setVolume] = useState(60);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  // When component mounts, setup the audio player and try to autoplay
  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = volume / 100;
    
    // Try to autoplay
    const attemptAutoplay = async () => {
      try {
        // This might fail due to browser autoplay policies
        await audio.play();
        setPlaying(true);
      } catch (error) {
        console.log("Autoplay prevented by browser. User interaction required.");
        // We'll leave the audio ready to play as soon as any interaction happens
      }
    };
    
    attemptAutoplay();

    // Add event listener for any user interaction to start audio
    const handleInteraction = async () => {
      if (!playing) {
        try {
          await audio.play();
          setPlaying(true);
        } catch (error) {
          console.error("Could not play audio:", error);
        }
      }
      // Remove this event listener once audio starts playing
      if (playing) {
        document.removeEventListener('click', handleInteraction);
      }
    };

    document.addEventListener('click', handleInteraction);
    
    return () => {
      document.removeEventListener('click', handleInteraction);
      audio.pause();
    };
  }, []);

  // Handle volume change
  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    setVolume(newVolume);
    
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  return (
    <>
      {/* Hidden audio element */}
      <audio 
        ref={audioRef}
        src="https://s1-bos.liveatc.net/rjtt_app_dep?nocache=2025040622131334553" 
        preload="auto"
        loop
      />
      
      {/* Fixed position volume control at bottom right */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center bg-black backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-gray-700">
        <div className="relative flex items-center">
          <div className="mr-3 text-white text-xs">
          </div>
          
          <div className="relative w-24">
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full h-2 bg-black rounded-lg appearance-none cursor-pointer accent-red-600"
              style={{
                '--tw-ring-color': 'rgb(220 38 38)',
                '--progress-percent': `${volume}%`,
                background: 'linear-gradient(to right, rgb(220 38 38) 0%, rgb(220 38 38) var(--progress-percent), rgb(0 0 0) var(--progress-percent), rgb(0 0 0) 100%)'
              }}
            />
          </div>
          
          <div className="ml-2 text-white text-xs font-bold min-w-[40px] text-center">
            {volume}%
          </div>
        </div>
      </div>

      <style jsx>{`
        input[type='range'] {
          -webkit-appearance: none;
          height: 8px;
          border-radius: 10px;
          outline: none;
          background-color: #000000;
        }

        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: rgb(220 38 38);
          cursor: pointer;
          border: 2px solid rgb(255 255 255 / 0.6);
          box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
        }

        input[type='range']::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: rgb(220 38 38);
          cursor: pointer;
          border: 2px solid rgb(255 255 255 / 0.6);
          box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
        }

        input[type='range']::-webkit-slider-runnable-track,
        input[type='range']::-moz-range-track {
          background-color: #000000;
          height: 8px;
          border-radius: 10px;
        }
      `}</style>
    </>
  );
}
