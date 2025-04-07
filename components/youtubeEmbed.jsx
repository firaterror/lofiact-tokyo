"use client"

import React from 'react'

export default function YoutubeEmbed() {
  return (
    <div className="w-full aspect-video overflow-hidden rounded-2xl mt-8 mb-8">
      <iframe 
        className="w-full h-full"
        src="https://www.youtube.com/embed/HQwLPhE2zys?si=OvjcEQBRYw1jcmvY&amp;controls=1&amp;autoplay=1&amp;start=15" 
        title="YouTube video player" 
        frameBorder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        referrerPolicy="strict-origin-when-cross-origin" 
        allowFullScreen
      ></iframe>
    </div>
  )
}
