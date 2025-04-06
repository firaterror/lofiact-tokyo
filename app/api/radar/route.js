import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get('lat') || '35.54';
    const lon = searchParams.get('lon') || '139.78';
    const zoom = searchParams.get('z') || '13';
    
    // Construct the target URL
    const targetUrl = `https://www.flightradar24.com/simple?lat=${lat}&lon=${lon}&z=${zoom}`;
    
    // Make server-side request with proper headers
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Referer': 'https://www.flightradar24.com/',
        'Origin': 'https://www.flightradar24.com'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
    }

    // Get the HTML content
    let html = await response.text();
    
    // Fix relative URLs to absolute ones
    html = html.replace(/href="\//g, 'href="https://www.flightradar24.com/');
    html = html.replace(/src="\//g, 'src="https://www.flightradar24.com/');
    
    // Send the response
    return new NextResponse(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    console.error('Error fetching FlightRadar24:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
} 