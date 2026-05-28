// hooks/useCountdown.ts
'use client';

import { useState, useEffect } from 'react';

interface CountdownValues {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalSeconds: number;
  isExpired: boolean;
}

const useCountdown = (targetDate: Date): CountdownValues => {
  const calculateTimeLeft = (): CountdownValues => {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;

    if (distance <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        totalSeconds: 0,
        isExpired: true,
      };
    }

    const totalSeconds = Math.floor(distance / 1000);

    return {
      days: Math.floor(totalSeconds / (60 * 60 * 24)),
      hours: Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60)),
      minutes: Math.floor((totalSeconds % (60 * 60)) / 60),
      seconds: Math.floor(totalSeconds % 60),
      totalSeconds,
      isExpired: false,
    };
  };

  const [timeLeft, setTimeLeft] = useState<CountdownValues>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
};

export default useCountdown;