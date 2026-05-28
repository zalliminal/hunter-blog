// components/learning-paths/PathFAQSection.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown } from 'lucide-react';

interface FAQ {
  question: { fa: string; en: string };
  answer: { fa: string; en: string };
}

interface PathFAQSectionProps {
  faqs: FAQ[];
  locale: string;
}

export default function PathFAQSection({ faqs, locale }: PathFAQSectionProps) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const isRTL = locale === 'fa';

  return (
    <section className={`${isRTL ? 'rtl' : 'ltr'}`} id='faq'>
      <div className="flex items-center gap-3 mb-8">
        <HelpCircle className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold text-foreground">
          {locale === 'fa' ? 'سوالات متداول' : 'Frequently Asked Questions'}
        </h2>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-card border border-border rounded-xl overflow-hidden"
          >
            <button
              onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
              className="w-full text-right p-5 flex items-center justify-between gap-4 hover:bg-accent/5 transition-colors"
            >
              <span className="font-semibold text-foreground">
                {faq.question[locale as 'fa' | 'en']}
              </span>
              <motion.div
                animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              </motion.div>
            </button>

            <AnimatePresence>
              {expandedIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden border-t border-border"
                >
                  <div className="p-5 text-sm text-muted-foreground leading-relaxed">
                    {faq.answer[locale as 'fa' | 'en']}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
