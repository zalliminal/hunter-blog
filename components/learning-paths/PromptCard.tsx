'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PromptCardProps {
  promptObj: any;
  locale: 'fa' | 'en';
  idx: number;
}

export function PromptCard({ promptObj, locale, idx }: PromptCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(promptObj.prompt[locale]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: idx * 0.05 }}
      className="p-4 rounded-lg bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h4 className="font-semibold">{promptObj.title[locale]}</h4>

        <button
          onClick={handleCopy}
          className={cn(
            "px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5",
            copied
              ? "bg-green-500 text-white"
              : "bg-purple-500/20 text-purple-600"
          )}
        >
          {copied ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5" />
              {locale === 'fa' ? 'کپی شد' : 'Copied'}
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              {locale === 'fa' ? 'کپی' : 'Copy'}
            </>
          )}
        </button>
      </div>

      <p className="font-mono text-sm">
        {promptObj.prompt[locale]}
      </p>
    </motion.div>
  );
}
