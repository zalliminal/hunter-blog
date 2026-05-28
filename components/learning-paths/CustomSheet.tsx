// components/learning-paths/CustomSheet.tsx
'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { PathStep } from '@/lib/learning-paths/learning-path-types';
import StepContentTabs from './StepContentTabs';

interface CustomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  step: PathStep | null;
  locale: string;
  pathColor: {
    primary: string;
    gradient: string;
    bgGradient: string;
    light: string;
  };
  isRTL: boolean;
}

export default function CustomSheet({
  isOpen,
  onClose,
  step,
  locale,
  pathColor,
  isRTL,
}: CustomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);

  // Close sheet when pressing Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Close sheet when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sheetRef.current && !sheetRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!step) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/70 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sheet */}
          <motion.div
            ref={sheetRef}
            className="fixed inset-y-0 start-0 z-50 w-full max-w-md bg-background border-e border-border overflow-y-auto"
            initial={{ x: isRTL ? '100%' : '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: isRTL ? '100%' : '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border p-4 flex items-center justify-between">
              <h2 className="text-xl font-bold truncate pe-4">
                {step.title[locale as 'fa' | 'en']}
              </h2>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-accent transition-colors"
                aria-label={locale === 'fa' ? 'بستن' : 'Close'}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 md:p-6 space-y-6">
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  {step.description[locale as 'fa' | 'en']}
                </p>
                
                <div className="flex items-center gap-2 text-sm">
                  <span className="px-2.5 py-1 rounded-lg bg-accent/20 text-accent-foreground">
                    {locale === 'fa' ? 'زمان تخمینی:' : 'Estimated time:'}
                  </span>
                  <span>{locale === 'fa' ? toFarsiTime(step.estimatedTime) : step.estimatedTime}</span>
                </div>
              </div>

              <div className="rounded-xl bg-accent/10 p-4 border border-accent/20">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${pathColor.gradient}`}></span>
                  {locale === 'fa' ? 'چرا مهم است؟' : 'Why is it important?'}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {step.whyImportant[locale as 'fa' | 'en']}
                </p>
              </div>

              <StepContentTabs 
                step={step} 
                locale={locale} 
                pathColor={pathColor} 
                isRTL={isRTL} 
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function toFarsiTime(time: string): string {
  const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  const timeMap: Record<string, string> = {
    hour: 'ساعت',
    hours: 'ساعت',
    day: 'روز',
    days: 'روز',
    week: 'هفته',
    weeks: 'هفته',
    month: 'ماه',
    months: 'ماه',
    minute: 'دقیقه',
    minutes: 'دقیقه',
  };

  let result = time;
  result = result.replace(/\d/g, (digit) => farsiDigits[+digit]);
  Object.entries(timeMap).forEach(([en, fa]) => {
    result = result.replace(new RegExp(en, 'gi'), fa);
  });

  return result;
}
