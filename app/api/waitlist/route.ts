import { NextResponse } from 'next/server';
import sqlite3 from 'sqlite3';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { sendWelcomeSMS } from '@/lib/sms';

export const runtime = 'nodejs';

// ---------- تنظیمات اولیه دیتابیس ----------
const DATA_DIR = path.join(process.cwd(), 'data');
const DB_PATH = path.join(DATA_DIR, 'waitlist.db');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// ---------- اتصال به SQLite ----------
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// فعال کردن WAL mode
db.run('PRAGMA journal_mode = WAL');

// ساخت جدول
db.run(`
  CREATE TABLE IF NOT EXISTS waitlist (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    phone_hash TEXT UNIQUE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// ---------- تابع هش کردن شماره ----------
function hashPhone(phone: string): string {
  const secret =
    process.env.HASH_SECRET ||
    'CHANGE_THIS_TO_A_LONG_RANDOM_STRING';

  return crypto
    .createHmac('sha256', secret)
    .update(phone)
    .digest('hex');
}

// ---------- Rate Limiter ساده ----------
const rateLimitMap = new Map<
  string,
  { count: number; resetTime: number }
>();

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 دقیقه
const MAX_REQUESTS_PER_WINDOW = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();

  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });

    return true;
  }

  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  entry.count++;

  return true;
}

function getClientIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');

  return forwarded
    ? forwarded.split(',')[0].trim()
    : '127.0.0.1';
}

// ---------- Helper برای Query ----------
function runQuery(
  query: string,
  params: any[] = []
): Promise<void> {
  return new Promise((resolve, reject) => {
    db.run(query, params, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

// ---------- Handler اصلی ----------
export async function POST(request: Request) {
  const ip = getClientIP(request);

  // Rate Limit
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      {
        error:
          'تعداد درخواست‌ها بیش از حد مجاز است. لطفاً کمی صبر کنید.',
      },
      { status: 429 }
    );
  }

  try {
    const body = await request.json();

    const { phone, honeypot } = body;

    // Honeypot check
    if (honeypot) {
      return NextResponse.json({ success: true });
    }

    // اعتبارسنجی شماره ایران
    const phoneRegex = /^09\d{9}$/;

    if (!phone || !phoneRegex.test(phone)) {
      return NextResponse.json(
        { error: 'شماره موبایل نامعتبر است' },
        { status: 400 }
      );
    }

    // هش شماره
    const hashed = hashPhone(phone);

    // ذخیره در دیتابیس
    await runQuery(
      'INSERT INTO waitlist (phone_hash) VALUES (?)',
      [hashed]
    );

    // ارسال پیامک بدون await
    sendWelcomeSMS(phone).catch((err) => {
      console.error(
        'SMS sending failed silently:',
        err
      );
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error: any) {
    // شماره تکراری
    if (
      error?.message?.includes(
        'SQLITE_CONSTRAINT'
      )
    ) {
      return NextResponse.json(
        {
          error: 'این شماره قبلاً ثبت شده است.',
        },
        { status: 409 }
      );
    }

    console.error('Waitlist Error:', error);

    return NextResponse.json(
      { error: 'خطای داخلی سرور' },
      { status: 500 }
    );
  }
}