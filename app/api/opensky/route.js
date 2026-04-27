import { NextResponse } from 'next/server';

let cache = { data: null, timestamp: 0 };
const CACHE_TTL = 15000;

export async function GET() {
  const now = Date.now();
  if (cache.data && now - cache.timestamp < CACHE_TTL) {
    return NextResponse.json(cache.data);
  }

  try {
    const res = await fetch(
      'https://opensky-network.org/api/states/all?lamin=35.0&lomin=139.0&lamax=36.2&lomax=140.5',
      {
        headers: {
          'User-Agent': 'lofiact-tokyo/1.0',
        },
      }
    );

    if (!res.ok) throw new Error(`OpenSky API error: ${res.status}`);

    const data = await res.json();
    cache = { data, timestamp: now };
    return NextResponse.json(data);
  } catch (error) {
    if (cache.data) {
      return NextResponse.json(cache.data);
    }
    return NextResponse.json({ error: error.message, states: [] }, { status: 500 });
  }
}
