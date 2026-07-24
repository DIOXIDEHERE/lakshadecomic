import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { Redis } from '@upstash/redis';
import bcrypt from 'bcryptjs';

const redis = new Redis({
  url: process.env.KV_REST_API_URL || '',
  token: process.env.KV_REST_API_TOKEN || '',
});

export async function POST(request: Request) {
  try {
    const { otp } = await request.json();
    const cookieStore = await cookies();
    const tempSession = cookieStore.get('temp_auth_session')?.value;

    if (!tempSession || !otp) {
      return NextResponse.json({ error: 'Session expired or invalid request' }, { status: 400 });
    }

    const attemptsKey = `otp_attempts:${tempSession}`;
    const attempts = await redis.incr(attemptsKey);

    if (attempts > 3) {
      // Clean up session and lock out if they failed too many times
      await redis.del(`otp:${tempSession}`);
      await redis.del(attemptsKey);
      cookieStore.delete('temp_auth_session');
      return NextResponse.json({ error: 'Maximum verification attempts exceeded. Please login again.' }, { status: 429 });
    }

    const hashedOtp = await redis.get(`otp:${tempSession}`) as string;

    if (!hashedOtp) {
      cookieStore.delete('temp_auth_session');
      return NextResponse.json({ error: 'OTP expired. Please request a new one.' }, { status: 400 });
    }

    const isValid = await bcrypt.compare(otp, hashedOtp);

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid verification code' }, { status: 401 });
    }

    // Success! Clear temporary OTP data
    await redis.del(`otp:${tempSession}`);
    await redis.del(attemptsKey);
    cookieStore.delete('temp_auth_session');

    // Grant full admin session
    cookieStore.set('admin_session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });

    return NextResponse.json({ success: true, message: 'Verified successfully' });

  } catch (error) {
    console.error("Verification Error:", error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
