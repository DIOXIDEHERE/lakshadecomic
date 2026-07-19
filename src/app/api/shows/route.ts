import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { Redis } from '@upstash/redis';

// Initialize Redis. It automatically picks up UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.
const redis = Redis.fromEnv();

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
