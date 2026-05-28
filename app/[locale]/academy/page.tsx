'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Metaballs } from '@paper-design/shaders-react';
import useCountdown from '@/hooks/useCountdown';

interface CountdownTimerProps {
  targetDate: Date;
  className?: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate, className = '' }) => {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(targetDate);
  const maxUnits = { days: 365, hours: 24, minutes: 60, seconds: 60 };

  const timeUnits = [
    { label: 'روز', value: days, max: maxUnits.days, color: '#4ADE80' },
    { label: 'ساعت', value: hours, max: maxUnits.hours, color: '#60A5FA' },
    { label: 'دقیقه', value: minutes, max: maxUnits.minutes, color: '#FBBF24' },
    { label: 'ثانیه', value: seconds, max: maxUnits.seconds, color: '#F87171' },
  ];

  const formatNumber = (num: number): string => num.toString().padStart(2, '0');
  const size = 70;
  const strokeWidth = 3;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  if (isExpired) return <div className="text-xl font-bold text-primary">آکادمی بازگشایی شد</div>;

  return (
    <div className={`flex flex-row-reverse flex-wrap items-center justify-center gap-4 sm:gap-8 ${className}`}>
      {timeUnits.map((unit) => {
        const progress = unit.value / unit.max;
        const offset = circumference - progress * circumference;
        return (
          <div key={unit.label} className="flex flex-col items-center gap-2">
            <div className="relative" style={{ width: size, height: size }}>
              <svg width={size} height={size} className="absolute inset-0 -rotate-90">
                <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="white" strokeWidth={strokeWidth} strokeOpacity="0.05" />
              </svg>
              <svg width={size} height={size} className="absolute inset-0 -rotate-90">
                <motion.circle
                  cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={unit.color} strokeWidth={strokeWidth} strokeLinecap="round" strokeDasharray={circumference}
                  initial={{ strokeDashoffset: circumference }}
                  animate={{ strokeDashoffset: offset }}
                  transition={{ duration: 1.5, ease: "circOut" }}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-base font-bold text-white tabular-nums font-mono">{formatNumber(unit.value)}</span>
              </div>
            </div>
            <span className="text-sm uppercase tracking-[0.1em] font-medium">{unit.label}</span>
          </div>
        );
      })}
    </div>
  );
};

// =========================
// صفحه اصلی لانچ آکادمی
// =========================
export default function LaunchPage() {
  const targetDate = new Date('2026-09-11T10:00:00');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [serverMessage, setServerMessage] = useState(''); // پیام دریافتی از سرور

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // اعتبارسنجی سمت کاربر
    const phoneRegex = /^09\d{9}$/;
    if (!phone.trim() || !phoneRegex.test(phone.trim().replace(/\s/g, ''))) {
      setError("شماره موبایلت مشکل داره، یه بررسی کن.");
      return;
    }

    setLoading(true);

    try {
      const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1';
      const res = await fetch(`${apiBase}/marketing/waitlist/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: phone.trim(),
          honeypot: '', // فیلد مخفی برای دفع بات‌ها
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        // خطاهای ۴۲۹ (rate limit) یا ۴۰۰ (شماره نامعتبر) را مدیریت کن
        const errorMsg = data?.detail
          ? (Array.isArray(data.detail)
              ? data.detail.map((e: any) => e.msg).join(' ')
              : data.detail)
          : data?.message || 'خطایی رخ داد.';
        throw new Error(errorMsg);
      }

      // ذخیره پیام سرور و نمایش نتیجه
      setServerMessage(data.message);
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'مشکلی در ارتباط با سرور پیش آمد.');
    } finally {
      setLoading(false);
    }
  };

  // بررسی تکراری بودن شماره بر اساس پیام سرور
  const isDuplicate = serverMessage.includes('قبلاً');

  return (
    <main className="relative min-h-screen w-full flex items-center justify-center  overflow-hidden">
      {/* باکس اصلی */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-3xl bg-black/20 border border-white/10 rounded-[3rem] shadow-2xl overflow-hidden"
      >
        {/* ۱. لایه شیدر */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Metaballs
            width="100%"
            height="100%"
            colors={["#01ff41", "#00FFC6", "#00bfff", "#2b00ff"]}
            colorBack="#000000"
            speed={1.0}
            style={{ width: '100%', height: '100%', display: 'block' }}
          />
        </div>

        {/* ۲. لایه بلور */}
        <div className="absolute inset-0 z-10 backdrop-blur-2xl bg-black/60 pointer-events-none" />

        {/* ۳. کانتینر محتوا */}
        <div className="relative z-20 p-8 sm:p-16 flex flex-col items-center">
          {/* افکت خط نوری لبه بالا */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {/* نشان تاریخ */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8 flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/5 bg-white/10"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] text-white/70 tracking-widest uppercase">
              شمارش معکوس تا <span className="text-white font-bold text-xs">۲۰ شهریور ۱۴۰۵</span>
            </span>
          </motion.div>

          {/* هدر */}
          <div className="text-center mb-10">
            <h1 className="text-5xl sm:text-7xl font-black text-white leading-tight tracking-tighter mb-4">
              کنجکاوی کافیست.
            </h1>
            <p className="text-white/60 text-sm sm:text-base max-w-md mx-auto font-light leading-relaxed">
              راستش ما هم مثل تو خسته شدیم از آموزش‌های طولانی. اینجا همه‌چیز ماژولار و دست‌گرمیه. شماره‌ت رو بده که موقع لانچ، اولین دعوت‌نامه رو برات بفرستیم.
            </p>
          </div>

          {/* کانت‌داون */}
          <CountdownTimer targetDate={targetDate} className="mb-12" />

          {/* فرم ثبت نام */}
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                exit={{ opacity: 0, scale: 0.95 }}
                onSubmit={handleSubmit}
                className="w-full max-w-md relative group"
              >
                {/* Honeypot field – invisible to users */}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  style={{
                    position: 'absolute',
                    left: '-9999px',
                    opacity: 0,
                    height: 0,
                    width: 0,
                  }}
                  aria-hidden="true"
                />

                <div className="flex flex-col sm:flex-row gap-3 items-center bg-white/[0.05] border border-white/10 rounded-3xl p-2 focus-within:border-emerald-500/50 transition-all duration-500 backdrop-blur-md">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="این رو داریم ردیف میکنیم"
                    className="w-full bg-transparent border-none outline-none px-4 py-3 text-sm text-white text-center sm:text-right placeholder:text-white/30"
                    required
                  />
                  <button
                    type="submit"
                    disabled={true}
                    className="w-full sm:w-auto whitespace-nowrap bg-white text-black h-12 px-8 rounded-2xl font-bold text-sm hover:bg-emerald-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    خبرم کن
                  </button>
                </div>

                {/* نمایش خطا */}
                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-red-400 text-xs text-center mt-2"
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`text-center p-6 rounded-3xl border backdrop-blur-md ${
                  isDuplicate
                    ? 'bg-amber-500/10 border-amber-500/20'   // برای شماره تکراری
                    : 'bg-emerald-500/10 border-emerald-500/20' // برای ثبت موفق
                }`}
              >
                <p className={`text-sm font-medium ${
                  isDuplicate ? 'text-amber-300' : 'text-emerald-400'
                }`}>
                  {isDuplicate
                    ? "شماره‌ات رو قبلا نوشتیم رفیق، منتظر خبرای خوب باش"
                    : 'ایول! اسمت تو لیست رفت. منتظر پیامک ما باش که قراره با هم کلی چیز یاد بگیریم.'}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* فوتر داخل باکس */}
          <div className="mt-12 pt-8 border-t border-white/10 w-full text-center">
            <p className="text-white text-sm mb-2">
              خیالت راحت؛ موقع لانچ یه کد باحال برات می‌فرستیم که بخش پرو رو هم امتحان کنی.
            </p>
            <p className="text-white/40 text-xs italic">
              چون برای شروعِ این مسیر، کنجکاویِ تو برای ما کافیه.
            </p>
          </div>
        </div>
      </motion.div>
    </main>
  );
}


// active mode
// <div className="flex flex-col sm:flex-row gap-3 items-center bg-white/[0.05] border border-white/10 rounded-3xl p-2 focus-within:border-emerald-500/50 transition-all duration-500 backdrop-blur-md">
//   <input
//     type="tel"
//     value={phone}
//     onChange={(e) => setPhone(e.target.value)}
//     placeholder="شماره موبایلت رو برامون بنویس"
//     className="w-full bg-transparent border-none outline-none px-4 py-3 text-sm text-white text-center sm:text-right placeholder:text-white/30"
//     required
//   />
//   <button
//     type="submit"
//     disabled={loading}
//     className="w-full sm:w-auto whitespace-nowrap bg-white text-black h-12 px-8 rounded-2xl font-bold text-sm hover:bg-emerald-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//   >
//     {loading ? 'در حال ارسال...' : 'خبرم کن'}
//   </button>
// </div>