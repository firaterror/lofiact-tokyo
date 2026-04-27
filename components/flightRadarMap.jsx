"use client"

import React, { useEffect, useRef, useState } from 'react'

export default function FlightRadarMap() {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const markersRef = useRef([])
  const [flightCount, setFlightCount] = useState(0)

  useEffect(() => {
    let interval
    let cancelled = false

    const initMap = async () => {
      const L = (await import('leaflet')).default

      if (cancelled || mapInstanceRef.current) return

      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
      document.head.appendChild(link)

      const map = L.map(mapRef.current, {
        zoomControl: false,
        attributionControl: false,
      }).setView([35.55, 139.78], 12)

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 16,
      }).addTo(map)

      L.marker([35.5533, 139.7811], {
        icon: L.divIcon({
          className: '',
          html: '<div style="color:#ef4444;font-size:10px;font-weight:bold;white-space:nowrap;">HND / RJTT</div>',
          iconSize: [80, 14],
          iconAnchor: [40, 7],
        }),
      }).addTo(map)

      mapInstanceRef.current = map

      const fetchFlights = async () => {
        try {
          const res = await fetch('/api/opensky')
          const data = await res.json()

          markersRef.current.forEach(m => m.remove())
          markersRef.current = []

          if (data.states) {
            setFlightCount(data.states.length)
            data.states.forEach(state => {
              const lat = state[6]
              const lon = state[5]
              const heading = state[10] || 0
              const callsign = (state[1] || '').trim()
              const altitude = state[7]
              const onGround = state[8]

              if (lat == null || lon == null) return

              const color = onGround ? '#666' : '#facc15'
              const icon = L.divIcon({
                className: '',
                html: `<div style="transform:rotate(${heading}deg);font-size:16px;color:${color};line-height:1;">✈</div>`,
                iconSize: [16, 16],
                iconAnchor: [8, 8],
              })

              const marker = L.marker([lat, lon], { icon }).addTo(map)
              const altText = altitude != null ? `${Math.round(altitude)}m` : '—'
              marker.bindTooltip(
                `<b>${callsign || 'Unknown'}</b><br/>Alt: ${altText}`,
                { className: 'flight-tooltip', direction: 'top', offset: [0, -10] }
              )
              markersRef.current.push(marker)
            })
          }
        } catch (err) {
          console.error('Failed to fetch flights:', err)
        }
      }

      fetchFlights()
      interval = setInterval(fetchFlights, 15000)
    }

    initMap()

    return () => {
      cancelled = true
      if (interval) clearInterval(interval)
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  return (
    <div className="w-full mt-8 mb-8">
      <style>{`
        .flight-tooltip {
          background: #1a1a1a !important;
          color: #fff !important;
          border: 1px solid #333 !important;
          border-radius: 6px !important;
          font-size: 11px !important;
          padding: 4px 8px !important;
          box-shadow: 0 2px 8px rgba(0,0,0,0.5) !important;
        }
        .flight-tooltip::before {
          border-top-color: #333 !important;
        }
      `}</style>
      <div className="w-full aspect-[16/9] relative rounded-2xl shadow-lg border-2 border-[#333] overflow-hidden"
           style={{ boxShadow: '0 0 20px 5px rgba(0, 0, 0, 0.5)' }}>
        <div ref={mapRef} className="absolute top-0 left-0 w-full h-full" style={{ background: '#0d1117' }} />
        {flightCount > 0 && (
          <div className="absolute top-3 right-3 z-[1000] bg-[#1a1a1a] border border-[#333] rounded-lg px-3 py-1.5 text-xs text-[#999]">
            {flightCount} aircraft tracked
          </div>
        )}
      </div>
    </div>
  )
}
