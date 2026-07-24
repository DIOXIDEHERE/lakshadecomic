import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { Redis } from '@upstash/redis';
import { Resend } from 'resend';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

// Initialize external services
const redis = new Redis({
  url: process.env.KV_REST_API_URL || '',
  token: process.env.KV_REST_API_TOKEN || '',
});
const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key');

// Get credentials from env or fallback to original hardcoded ones
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'highlighter';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'pencilcase7878';
const ADMIN_EMAIL = 'dioxidehere@gmail.com';

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 'unknown';
    
    // Check Brute Force Lockout
    const lockoutKey = `lockout:${ip}`;
    const isLocked = await redis.get(lockoutKey);
    if (isLocked) {
      return NextResponse.json({ error: 'Too many failed attempts. Try again in 15 minutes.' }, { status: 429 });
    }

    const { username, password } = await request.json();

    // 1. Verify basic credentials first
    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      // Increment failed attempts
      const attemptsKey = `failed_attempts:${ip}`;
      const attempts = await redis.incr(attemptsKey);
      if (attempts === 1) {
        await redis.expire(attemptsKey, 60 * 15); // Expire after 15 mins
      }
      if (attempts >= 5) {
        await redis.set(lockoutKey, 'locked', { ex: 60 * 15 }); // Lock for 15 mins
      }
      
      console.warn(`[AUTH] Failed login attempt from ${ip}`);
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Reset failed attempts on correct password
    await redis.del(`failed_attempts:${ip}`);

    // 2. Check Hourly OTP limits
    const hourlyLimitKey = `otp_limit:${username}`;
    const otpRequests = await redis.incr(hourlyLimitKey);
    if (otpRequests === 1) {
      await redis.expire(hourlyLimitKey, 60 * 60); // 1 hour
    }
    if (otpRequests > 5) {
      return NextResponse.json({ error: 'Maximum OTP requests exceeded. Try again in an hour.' }, { status: 429 });
    }

    // 3. Generate random 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    
    // 4. Hash OTP
    const hashedOtp = await bcrypt.hash(otp, 10);
    
    // Create a temporary session ID
    const sessionId = crypto.randomBytes(16).toString('hex');
    
    // 5. Store in Redis
    await redis.set(`otp:${sessionId}`, hashedOtp, { ex: 5 * 60 }); // 5 minutes expiry
    await redis.set(`otp_attempts:${sessionId}`, 0, { ex: 5 * 60 }); 
    
    // 6. Send Email using Resend
    if (process.env.RESEND_API_KEY) {
      try {
        const { data, error } = await resend.emails.send({
          from: 'Lak Shade Console <onboarding@resend.dev>', // Use verified domain later
          to: ADMIN_EMAIL,
          subject: 'Lak Shade Console Verification',
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
              <h2 style="font-weight: 400; letter-spacing: 0.05em;">Console Access</h2>
              <p>Your verification code is:</p>
              <h1 style="font-size: 32px; letter-spacing: 0.2em; margin: 20px 0;">${otp}</h1>
              <p style="color: #666; font-size: 14px;">This code expires in 5 minutes.</p>
              <p style="color: #999; font-size: 12px; margin-top: 40px;">If you did not request this login, please ignore this email.</p>
            </div>
          `
        });

        if (error) {
          console.error("Resend API Error:", error);
          return NextResponse.json({ error: error.message || 'Failed to send verification email' }, { status: 500 });
        }
      } catch (emailError) {
        console.error("Failed to execute Resend request:", emailError);
        return NextResponse.json({ error: 'Failed to send verification email' }, { status: 500 });
      }
    } else {
      console.warn("RESEND_API_KEY is not set. In a real environment, the email would not send.");
      console.log(`[DEV MODE] Generated OTP for session ${sessionId}: ${otp}`);
    }

    // 7. Set pending cookie
    const cookieStore = await cookies();
    cookieStore.set('temp_auth_session', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 5 * 60, // 5 mins
      path: '/',
    });

    return NextResponse.json({ success: true, message: 'OTP sent successfully' });

  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
