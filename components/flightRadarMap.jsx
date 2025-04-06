"use client"

import React from 'react'

export default function FlightRadarMap() {
  return (
    <div className="w-auto h-[500px] p-5">
        <iframe 
            title="FlightRadar24" 
            type="text/html" 
            width="100%" 
            height="100%" 
            src="https://www.flightradar24.com/simple?lat=35.54&lon=139.78&z=13" 
            frameBorder="0" 
            allowFullScreen=""
        ></iframe>
    </div>
  )
}
