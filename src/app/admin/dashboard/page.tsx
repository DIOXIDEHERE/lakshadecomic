import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import fs from "fs/promises";
import path from "path";
import DashboardClient from "./DashboardClient";

export const dynamic = 'force-dynamic';

async function getShows() {
  const dbPath = path.join(process.cwd(), 'data', 'db.json');
  try {
    const data = await fs.readFile(dbPath, 'utf-8');
    return JSON.parse(data).shows;
  } catch (e) {
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
