"use client";

import Image from "next/image";
import AirlineTracker from "@/components/airlineTracker";
import FlightRadarMap from "@/components/flightRadarMap";
import YoutubeEmbed from "@/components/youtubeEmbed";
import LiveATC from "@/components/liveatc";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [showOverlay, setShowOverlay] = useState(true);
  const [videoUrl, setVideoUrl] = useState("");

  const handleInteraction = () => {
    setShowOverlay(false);
    setVideoUrl("https://www.youtube.com/embed/PLLRRXURicM?si=9ZxxCWDYs-caGfgM&controls=1&autoplay=1&start=15&enablejsapi=1");
  };

  return (
    <div onClick={handleInteraction} onKeyDown={handleInteraction} tabIndex={0}>
      {showOverlay && (
        <div className="fixed inset-0 flex bg-[rgba(0,0,0,0.8)] text-white items-center justify-center z-50 cursor-pointer">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4 flex-col">
              <span className="text-6xl mb-8">🇯🇵</span>
              <span className="text-2xl font-semibold">Tap to start listening</span>
            </div>
          </div>
        </div>
      )}
      <div className="max-w-[800px] mx-auto text-left justify-left color-heading">
        <h1 className="mb-6">
          lofi air traffic control 🇯🇵 Japan edition
        </h1>
        <p className="c">
        Listen to live air traffic control radio from Tokyo International Airport (RJTT) mixed with 90's Retro Tokyo Lo-fi from Japan.
        </p>
        <AirlineTracker />
        <FlightRadarMap />
        <YoutubeEmbed videoUrl={videoUrl} />
        <LiveATC/>
        <hr className="border-0 mb-8 mt-8 border-t-2 border-t-[#ddd] border-solid"/>
        <p className="!text-sm !text-[#666]">Made by <Link className="text-[#004499] underline cursor-pointer hover:text-[#0066cc] font-medium" href="https://firat.run">firat</Link> in 2025</p> 
      </div>
    </div>
  );
}
