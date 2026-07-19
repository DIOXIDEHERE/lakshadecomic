import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import fs from 'fs/promises';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'db.json');

export async function GET() {
  try {
    const data = await fs.readFile(dbPath, 'utf-8');
    const db = JSON.parse(data);
    return NextResponse.json(db.shows);
  } catch (error) {
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
    
    // Read existing to keep structure safe, overwrite shows array
    let db = { shows: [] };
    try {
      const data = await fs.readFile(dbPath, 'utf-8');
      db = JSON.parse(data);
    } catch (e) {
      // ignore
    }

    db.shows = shows;

    await fs.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf-8');
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 });
  }
}
