"use client"

import React from 'react'

export default function FlightRadarMap() {
  return (
    <div className="w-full mt-8 mb-8">
      <div className="w-full aspect-[16/9] relative bg-red-600 rounded-2xl shadow-lg shadow-red-900/50 border-2 border-red-900 overflow-hidden p-2">
        <iframe 
          title="FlightRadar24" 
          className="absolute top-0 left-0 w-full h-full"
          src="https://www.flightradar24.com/simple?lat=35.54&lon=139.78&z=13" 
          frameBorder="0" 
          allowFullScreen=""
        ></iframe>
      </div>
    </div>
  )
}
