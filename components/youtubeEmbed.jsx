"use client"

import React from 'react'

export default function YoutubeEmbed({ videoUrl }) {
  return (
    <div className="relative pb-[56.25%] h-0 overflow-hidden max-w-full mb-8">
      <iframe
        className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
        width="853"
        height="480"
        src={videoUrl}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
}
