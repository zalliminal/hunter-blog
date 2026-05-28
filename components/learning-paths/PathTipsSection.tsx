'use client';

import { motion } from 'framer-motion';
import { Lightbulb } from 'lucide-react';

interface PathTipsSectionProps {
  tips: { fa: string[]; en: string[] };
  locale: string;
}

export default function PathTipsSection({ tips, locale }: PathTipsSectionProps) {
  const isRTL = locale === 'fa';
  const tipsList = (locale === 'fa' ? tips.fa : tips.en) || tips.fa;

  return (
    <section className={`w-full mx-auto py-8 ${isRTL ? 'rtl' : 'ltr'}`} id="tips">
      <div className="flex items-center gap-3 mb-8">
        <Lightbulb className="w-6 h-6 text-amber-400" />
        <h2 className="text-3xl font-extrabold select-none">
          {locale === 'fa' ? 'نکات مفید' : 'Helpful Tips'}
        </h2>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative overflow-hidden rounded-3xl border border-amber-400/30 bg-background/40 backdrop-blur-xl shadow-xl"
      >
        {/* Animated Amber Orbs */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <style jsx>{`
            @keyframes float-amber-1 {
              0%, 100% { transform: translate(-6px, -6px) scale(1); }
              50% { transform: translate(6px, -10px) scale(1.05); }
            }
            @keyframes float-amber-2 {
              0%, 100% { transform: translate(10px, 6px) scale(0.95); }
              50% { transform: translate(-6px, 10px) scale(1); }
            }
            @keyframes pulse-glow {
              0%, 100% { opacity: 0.15; }
              50% { opacity: 0.3; }
            }
          `}</style>

          <div
            className="absolute -top-20 -right-20 h-56 w-56 rounded-full blur-3xl"
            style={{
              backgroundColor: 'rgba(251, 191, 36, 0.5)',
              animation: 'float-amber-1 8s ease-in-out infinite, pulse-glow 4s ease-in-out infinite',
            }}
          />
          <div
            className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full blur-3xl"
            style={{
              backgroundColor: 'rgba(250, 204, 21, 0.25)',
              animation: 'float-amber-2 12s ease-in-out infinite',
              opacity: 0.12,
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 p-8">
          <motion.ul
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.07,
                },
              },
            }}
            className="list-disc list-inside space-y-5 text-amber-50 text-base leading-relaxed"
            dir={isRTL ? 'rtl' : 'ltr'}
          >
            {tipsList.map((tip, index) => (
              <motion.li
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="marker:text-amber-400"
              >
                {tip}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </motion.div>
    </section>
  );
}
