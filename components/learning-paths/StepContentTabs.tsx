// components/learning-paths/StepContentTabs.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Video, Sparkles, Target, Book, Copy, Check } from 'lucide-react';
import { PathStep } from '@/lib/learning-paths/learning-path-types';

interface StepContentTabsProps {
  step: PathStep;
  locale: string;
  pathColor: any;
  isRTL: boolean;
}

type TabType = 'outcomes' | 'prompts' | 'articles' | 'videos' | 'books';

const tabs = {
  outcomes: { icon: Target, label: { fa: 'نتایج یادگیری', en: 'Learning Outcomes' } },
  prompts: { icon: Sparkles, label: { fa: 'پرامپت‌های AI', en: 'AI Prompts' } },
  articles: { icon: BookOpen, label: { fa: 'مقالات', en: 'Articles' } },
  videos: { icon: Video, label: { fa: 'ویدئوها', en: 'Videos' } },
  books: { icon: Book, label: { fa: 'کتاب‌ها', en: 'Books' } },
};

export default function StepContentTabs({ step, locale, pathColor, isRTL }: StepContentTabsProps) {
  const [activeTab, setActiveTab] = useState<TabType>('outcomes');
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);

  const hasContent = (tab: TabType) => {
    if (tab === 'outcomes') return step.learningOutcomes[locale as 'fa' | 'en'].length > 0;
    if (tab === 'prompts') return step.prompts.length > 0;
    if (tab === 'articles') return step.articles.length > 0;
    if (tab === 'videos') return step.videos.length > 0;
    if (tab === 'books') return step.books.length > 0;
    return false;
  };

  const availableTabs = (Object.keys(tabs) as TabType[]).filter(hasContent);

  const copyPrompt = async (promptText: string, promptId: string) => {
    try {
      await navigator.clipboard.writeText(promptText);
      setCopiedPromptId(promptId);
      setTimeout(() => setCopiedPromptId(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex flex-wrap gap-1.5 sm:gap-2 border-b border-border pb-2">
        {availableTabs.map((tab) => {
          const TabIcon = tabs[tab].icon;
          const isActive = activeTab === tab;

          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-3 py-1.5 sm:px-4 sm:py-2 rounded-md sm:rounded-lg text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5 sm:gap-2 ${
                isActive
                  ? `${pathColor.light} bg-accent/20`
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent/10'
              }`}
            >
              <TabIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="truncate max-w-[100px] sm:max-w-none">{tabs[tab].label[locale as 'fa' | 'en']}</span>
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className={`absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r ${pathColor.gradient}`}
                />
              )}
            </button>
          );
        })}
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="min-h-[150px]"
      >
        {activeTab === 'outcomes' && (
          <ul className="space-y-1.5 sm:space-y-2">
            {step.learningOutcomes[locale as 'fa' | 'en'].map((outcome, i) => (
              <li key={i} className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-muted-foreground">
                <span className={`mt-1.5 w-1 h-1 rounded-full ${pathColor.gradient} bg-gradient-to-br flex-shrink-0`} />
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        )}

        {activeTab === 'prompts' && (
          <div className="space-y-3 sm:space-y-4">
            {step.prompts.map((prompt) => (
              <div key={prompt.id} className="bg-accent/5 rounded-xl p-3 sm:p-4 border border-border/50 space-y-2.5 sm:space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h5 className="font-semibold text-foreground text-sm sm:text-base">{prompt.title[locale as 'fa' | 'en']}</h5>
                    <p className="text-xs sm:text-sm text-muted-foreground italic mt-1">{prompt.purpose[locale as 'fa' | 'en']}</p>
                  </div>
                  <button
                    onClick={() => copyPrompt(prompt.prompt[locale as 'fa' | 'en'], prompt.id)}
                    className={`flex-shrink-0 p-2 rounded-lg transition-colors ${
                      copiedPromptId === prompt.id
                        ? 'bg-green-500/10 text-green-600'
                        : 'bg-accent/50 hover:bg-accent text-muted-foreground hover:text-foreground'
                    }`}
                    title={locale === 'fa' ? 'کپی پرامپت' : 'Copy prompt'}
                  >
                    {copiedPromptId === prompt.id ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <div className="flex items-center gap-2">
                        <Copy className="w-4 h-4" />
                        <p className='text-sm'>{locale === 'fa' ? 'کپی' : 'Copy'}</p>
                      </div>
                    )}
                  </button>
                </div>
                <pre className="text-[10px] sm:text-xs bg-background/50 p-2.5 sm:p-3 rounded-lg overflow-x-auto whitespace-pre-wrap font-mono text-foreground">
                  {prompt.prompt[locale as 'fa' | 'en']}
                </pre>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'articles' && (
          <ul className="space-y-2.5 sm:space-y-3">
            {step.articles.map((article, i) => (
              <li key={i}>
                <a
                  href={article.url}
                  target={article.isInternal ? '_self' : '_blank'}
                  rel={article.isInternal ? '' : 'noopener noreferrer'}
                  className="block p-2.5 sm:p-3 rounded-lg border border-border hover:bg-accent/10 transition-colors group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                    <div className="flex-1">
                      <h5 className={`font-medium transition-colors text-sm sm:text-base ${
                        article.isInternal ? 'text-primary' : 'text-foreground group-hover:text-primary'
                      }`}>
                        {article.title[locale as 'fa' | 'en']}
                      </h5>
                      {article.description && (
                        <p className="text-[10px] sm:text-xs text-muted-foreground mt-1">
                          {article.description[locale as 'fa' | 'en']}
                        </p>
                      )}
                    </div>
                    <span className={`text-[10px] sm:text-xs whitespace-nowrap font-medium ${
                      article.isInternal ? 'text-primary' : 'text-muted-foreground'
                    }`}>
                      {article.isInternal ? (locale === 'fa' ? 'کاولبز' : 'Cowlabz') : '↗'}
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        )}

        {activeTab === 'videos' && (
          <ul className="space-y-2.5 sm:space-y-3">
            {step.videos.map((video, i) => (
              <li key={i}>
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-2.5 sm:p-3 rounded-lg border border-border hover:bg-accent/10 transition-colors group"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                      <Video className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h5 className="font-medium text-foreground group-hover:text-primary transition-colors text-sm sm:text-base">
                          {video.title[locale as 'fa' | 'en']}
                        </h5>
                        <span className="text-[10px] sm:text-xs text-muted-foreground whitespace-nowrap">↗</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 mt-1 text-[10px] sm:text-xs text-muted-foreground">
                        <span className="px-2 py-0.5 rounded-md bg-accent/30 capitalize font-medium">{video.platform}</span>
                        {video.duration && <span>• {video.duration}</span>}
                      </div>
                      {video.description && (
                        <p className="text-[10px] sm:text-xs text-muted-foreground mt-1.5 line-clamp-2">
                          {video.description[locale as 'fa' | 'en']}
                        </p>
                      )}
                    </div>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        )}

        {activeTab === 'books' && (
          <ul className="space-y-3 sm:space-y-4">
            {step.books.map((book, i) => (
              <li key={i} className="p-3 sm:p-4 rounded-lg border border-border bg-accent/5">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-accent/30 flex items-center justify-center">
                    <Book className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-semibold text-foreground text-sm sm:text-base">{book.title[locale as 'fa' | 'en']}</h5>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">{locale === 'fa' ? 'نویسنده:' : 'Author:'} {book.author}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-2 leading-relaxed">{book.description[locale as 'fa' | 'en']}</p>
                    {book.link && (
                      <a
                        href={book.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1.5 mt-2.5 text-xs sm:text-sm font-medium ${pathColor.light} hover:underline`}
                      >
                        {locale === 'fa' ? 'مشاهده کتاب' : 'View Book'}
                        <span>↗</span>
                      </a>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </motion.div>
    </div>
  );
}
