'use client';

import React, { useState, useEffect } from 'react';

export default function AirlineTracker() {
  const [tokyoTime, setTokyoTime] = useState('');
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to update Tokyo time
    const updateTokyoTime = () => {
      const now = new Date();
      // Tokyo is UTC+9
      const tokyoOptions = { 
        timeZone: 'Asia/Tokyo',
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false
      };
      setTokyoTime(now.toLocaleTimeString('en-US', tokyoOptions));
    };

    // Update time immediately
    updateTokyoTime();
    
    // Update time every second
    const interval = setInterval(updateTokyoTime, 1000);
    
    // Clear interval on unmount
    return () => clearInterval(interval);
  }, []);

  // Fetch flight data
  useEffect(() => {
    const fetchFlights = async () => {
      try {
        setLoading(true);
        setError(null);
        const timestamp = Math.floor(Date.now() / 1000); // Current timestamp in seconds
        const response = await fetch(`/api/flights?timestamp=${timestamp}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch flight data');
        }
        
        const data = await response.json();
        if (data?.result?.response?.airport?.pluginData?.schedule?.arrivals?.data) {
          setFlights(data.result.response.airport.pluginData.schedule.arrivals.data);
        } else {
          setError('No flight data available');
        }
      } catch (error) {
        console.error('Error fetching flight data:', error);
        setError(error.message || 'Failed to load flights');
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
    // Refresh flight data every 5 minutes
    const flightInterval = setInterval(() => fetchFlights(), 300000);
    
    return () => clearInterval(flightInterval);
  }, []);

  // Format time for display
  const formatTime = (timestamp) => {
    if (!timestamp) return "-";
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', {
      timeZone: 'Asia/Tokyo',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  return (
    <div className="p-5 w-auto max-h-[600px] bg-[#1a1a1a] border-2 border-[#333] border-solid rounded-xl overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
            <h1 className="!text-[2em] !text-red-500 clock-family">✈️ ARRIVALS / 到着</h1>
            <div className="clock rounded-md text-center" style={{ padding: '0.3125rem 0.625rem' }}>{tokyoTime}</div>
        </div>
        
        <div className="table-container text-white">
          {loading ? (
            <div className="text-center py-4">Loading flight data...</div>
          ) : error ? (
            <div className="text-center py-4 text-red-400">{error}</div>
          ) : flights.length > 0 ? (
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-2 px-3 text-left">Time</th>
                  <th className="py-2 px-3 text-left">From</th>
                  <th className="py-2 px-3 text-left">Flight No.</th>
                  <th className="py-2 px-3 text-left">Remarks</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {flights.slice(0, 10).map((flight, index) => {
                  const flightData = flight.flight;
                  return (
                    <tr key={index} className="border-b border-gray-800 hover:bg-gray-900">
                      <td className="py-2 px-3">
                        {formatTime(flightData.time.scheduled.arrival_time)}
                      </td>
                      <td className="py-2 px-3">
                        {flightData.airport.origin.name || flightData.airport.origin.code.iata}
                      </td>
                      <td className="py-2 px-3">
                        {flightData.identification.number.default}
                      </td>
                      <td className="py-2 px-3">
                        {flightData.status.text}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-4">No flight data available</div>
          )}
        </div>
    </div>
  );
}
