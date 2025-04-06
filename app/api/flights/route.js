export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const timestamp = searchParams.get('timestamp') || Math.floor(Date.now() / 1000);
  
  try {
    const response = await fetch(
      `https://api.flightradar24.com/common/v1/airport.json?code=hnd&plugin[]=&plugin-setting[schedule][mode]=arrivals&plugin-setting[schedule]&page=1&limit=100&fleet=&token=`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Referer': 'https://www.flightradar24.com/',
          'Origin': 'https://www.flightradar24.com'
        }
      }
    );

    if (!response.ok) {
      return new Response(JSON.stringify({ error: 'Failed to fetch data' }), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
} 