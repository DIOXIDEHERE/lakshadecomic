import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request): Promise<NextResponse> {
  try {
    // 1. Authenticate (ensure user is logged in as admin)
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_session')?.value || cookieStore.get('temp_auth_session')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');

    if (!filename) {
      return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
    }

    if (!request.body) {
       return NextResponse.json({ error: 'Request body is required' }, { status: 400 });
    }

    // 2. Upload to Vercel Blob
    const blob = await put(filename, request.body, {
      access: 'public',
    });

    return NextResponse.json(blob);
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: 'Error uploading file' }, { status: 500 });
  }
}
