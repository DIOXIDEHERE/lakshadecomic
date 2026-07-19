import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Redis } from '@upstash/redis';
import DashboardClient from "./DashboardClient";

export const dynamic = 'force-dynamic';

async function getShows() {
  try {
    const redis = Redis.fromEnv();
    const shows = await redis.get('shows');
    return Array.isArray(shows) ? shows : [];
  } catch (e) {
    console.error("Failed to fetch shows from Redis:", e);
    return [];
  }
}

export default async function Dashboard() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (!session) {
    redirect("/admin/login");
  }

  const initialShows = await getShows();

  return <DashboardClient initialShows={initialShows} />;
}
