import { Redis } from '@upstash/redis';

// Create a safe redis instance that won't crash if env vars are missing during build
let redis: Redis | null = null;
try {
  redis = new Redis({
    url: process.env.KV_REST_API_URL || '',
    token: process.env.KV_REST_API_TOKEN || '',
  });
} catch (e) {
  console.warn("Redis is not configured properly. CMS features will not work.", e);
}

export async function getCMSData(section: string, fallback: any = {}) {
  if (!redis) return fallback;
  
  try {
    const data = await redis.get(`cms:${section}`);
    if (data && typeof data === 'object') {
      return { ...fallback, ...data };
    }
    return data || fallback;
  } catch (error) {
    console.error(`Error fetching CMS data for ${section}:`, error);
    return fallback;
  }
}
