import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { Redis } from '@upstash/redis';

// Initialize Redis using the variables Vercel provides via the Upstash integration
const redis = new Redis({
  url: process.env.KV_REST_API_URL || '',
  token: process.env.KV_REST_API_TOKEN || '',
});

export async function GET() {
  try {
    const shows = await redis.get('shows');
    return NextResponse.json(shows || []);
  } catch (error) {
    console.error("Failed to read from Redis:", error);
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const session = cookieStore.get('admin_session');
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const shows = await request.json();
    
    // Save to Redis
    await redis.set('shows', shows);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to write to Redis:", error);
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}
