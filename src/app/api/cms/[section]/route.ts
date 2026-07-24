import { NextResponse } from "next/server";
import { Redis } from '@upstash/redis';
import { cookies } from "next/headers";

const redis = new Redis({
  url: process.env.KV_REST_API_URL || '',
  token: process.env.KV_REST_API_TOKEN || '',
});

export async function GET(
  request: Request,
  { params }: { params: Promise<{ section: string }> }
) {
  try {
    const section = (await params).section;
    const data = await redis.get(`cms:${section}`);
    return NextResponse.json({ success: true, data: data || null });
  } catch (error) {
    console.error(`Error fetching CMS data for section:`, error);
    return NextResponse.json({ success: false, error: "Failed to fetch data" }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ section: string }> }
) {
  try {
    const cookieStore = await cookies();
    const session = cookieStore.get("admin_session");

    if (!session || session.value !== "authenticated") {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const section = (await params).section;
    const body = await request.json();
    
    // Save to Redis
    await redis.set(`cms:${section}`, body);

    return NextResponse.json({ success: true, message: "Saved successfully" });
  } catch (error) {
    console.error(`Error saving CMS data for section:`, error);
    return NextResponse.json({ success: false, error: "Failed to save data" }, { status: 500 });
  }
}
