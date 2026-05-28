'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Target, BookOpen, Video, FileText, ChevronRight, CheckCircle2, Bot, Flag } from 'lucide-react';
import { LearningPath } from '@/lib/learning-paths/learning-path-types';
import { cn } from '@/lib/utils';
import { PromptCard } from './PromptCard';

interface PathStepsListProps {
  path: LearningPath;
  locale: string;
}

function Sheet({
  children,
  isOpen,
  onClose,
  locale,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  locale: string;
}) {
  const [mounted, setMounted] = useState(false);
  const isFa = locale === 'fa';

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!mounted) return null;

  return createPortal(
    <div 
      dir={isFa ? 'rtl' : 'ltr'} 
      className={isFa ? "font-[family-name:var(--font-farsi)]" : ""}
    >
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              onClick={onClose}
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 right-0 z-50 flex flex-col max-w-full w-full sm:max-w-2xl bg-background/95 backdrop-blur-xl border-l border-border/50 shadow-2xl"
            >
              {children}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>,
    document.body
  );
}


function SheetHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between border-b border-border/50 p-6 bg-gradient-to-b from-background to-background/50">
      {children}
    </div>
  );
}

function SheetTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent pr-8">
      {children}
    </h2>
  );
}

function SheetContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-y-auto flex-1 p-6 custom-scrollbar">
      {children}
    </div>
  );
}

function SheetFooter({ children }: { children: React.ReactNode }) {
  return (
    <div className="border-t border-border/50 p-6 bg-gradient-to-t from-background to-background/50">
      {children}
    </div>
  );
}


function toFarsiNumber(num: number): string {
  const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return num.toString().replace(/\d/g, (digit) => farsiDigits[parseInt(digit)]);
}

function toFarsiTime(time: string, locale: string): string {
  if (locale !== 'fa') return time;
  
  const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  let result = time.replace(/\d/g, (digit) => farsiDigits[parseInt(digit)]);
  result = result.replace(/hours?/gi, 'ساعت');
  result = result.replace(/mins?/gi, 'دقیقه');
  result = result.replace(/weeks?/gi, 'هفته');
  result = result.replace(/days?/gi, 'روز');
  result = result.replace(/months?/gi, 'ماه');
  
  return result;
}


export default function PathStepsList({ path, locale }: PathStepsListProps) {
  const [selectedStepId, setSelectedStepId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('outcomes');
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const isRTL = locale === 'fa';

  const handleStepClick = (stepId: string) => {
    setSelectedStepId(stepId);
    setActiveTab('outcomes');
  };

  const handleClose = () => {
    setSelectedStepId(null);
  };

  const toggleComplete = (stepId: string) => {
    setCompletedSteps(prev => {
      const newSet = new Set(prev);
      if (newSet.has(stepId)) {
        newSet.delete(stepId);
      } else {
        newSet.add(stepId);
      }
      return newSet;
    });
  };

  const selectedStep = path.steps.find(step => step.id === selectedStepId);

  const getAvailableTabs = () => {
    if (!selectedStep) return [];
    
    const tabs = [];
    if (selectedStep.learningOutcomes[locale as 'fa' | 'en'].length > 0) {
      tabs.push('outcomes');
    }
    if (selectedStep.prompts.length > 0) {
      tabs.push('prompts');
    }
    if (selectedStep.articles.length > 0) {
      tabs.push('articles');
    }
    if (selectedStep.videos.length > 0) {
      tabs.push('videos');
    }
    if (selectedStep.books.length > 0) {
      tabs.push('books');
    }
    return tabs;
  };

  useEffect(() => {
    if (selectedStep) {
      const availableTabs = getAvailableTabs();
      if (availableTabs.length > 0) {
        setActiveTab(availableTabs[0]);
      }
    }
  }, [selectedStepId]);

  return (
    <section className="relative overflow-hidden rounded-2xl backdrop-blur-xl shadow-xl border border-border/60 p-4  py-16" id="learning-steps">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className={`absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none`} />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
            {locale === 'fa' ? 'نقشه راه یادگیری' : 'Learning Roadmap'}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {locale === 'fa' 
              ? 'مسیر گام به گام برای تسلط بر این مهارت' 
              : 'Step-by-step path to master this skill'}
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-1 overflow-hidden">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-b from-primary/20 via-primary/40 to-primary/20"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{ transformOrigin: 'top' }}
            />
          </div>

          <div className="space-y-12 relative">
            {path.steps.map((step, index) => {
              const isCompleted = completedSteps.has(step.id);
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={step.id}
                  className={cn(
                    "relative flex items-center gap-8",
                    isEven ? "flex-row" : "flex-row-reverse"
                  )}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                >
                  <div className={cn("flex-1", isEven ? "text-right" : "text-left")}>
                    <motion.div
                      whileHover={{ scale: 1.02, y: -4 }}
                      whileTap={{ scale: 0.98 }}
                      className={cn(
                        "group relative p-6 rounded-2xl border cursor-pointer transition-all duration-300",
                        "bg-gradient-to-br from-card to-card/50 backdrop-blur-sm",
                        isCompleted 
                          ? "border-primary/50 shadow-lg shadow-primary/10" 
                          : "border-border/50 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5"
                      )}
                      onClick={() => handleStepClick(step.id)}
                    >
                      {isCompleted && (
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-lg"
                        >
                          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </motion.div>
                      )}

                      <div className="flex items-start gap-4">
                        <div className={cn("flex-1", isEven ? "order-2" : "order-1")}>
                          <h3 className="font-bold text-xl text-foreground mb-2 group-hover:text-primary transition-colors">
                            {step.title[locale as 'fa' | 'en']}
                          </h3>
                          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                            {step.description[locale as 'fa' | 'en']}
                          </p>
                          <div className="flex items-center gap-2 mt-4 text-xs text-muted-foreground">
                            <Clock className="w-3.5 h-3.5" />
                            <span>
                              {toFarsiTime(step.estimatedTime, locale)}
                            </span>

                          </div>
                        </div>
                        <ChevronRight className={cn(
                          "w-5 h-5 text-muted-foreground group-hover:text-primary transition-all group-hover:translate-x-1",
                          isEven ? "order-1" : "order-2"
                        )} />
                      </div>
                    </motion.div>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className="relative z-10 flex-shrink-0 cursor-pointer"
                    onClick={() => toggleComplete(step.id)}
                  >
                    <div className={cn(
                      "w-14 h-14 rounded-full border-4 border-background flex items-center justify-center font-bold text-lg transition-all duration-300 shadow-lg",
                      isCompleted 
                        ? "bg-primary text-white shadow-primary/30" 
                        : "bg-gradient-to-br from-card to-muted text-foreground hover:shadow-xl"
                    )}>
                      {isCompleted ? (
                        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </div>
                    {!isCompleted && (
                      <motion.div
                        className="absolute inset-0 rounded-full bg-primary/20"
                        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </motion.div>

                  <div className="flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      <Sheet isOpen={!!selectedStepId} onClose={handleClose} locale={locale}>
        {selectedStep && (
          <>
            <SheetHeader>
              <div className="flex-1">
                <SheetTitle>
                  {selectedStep.title[locale as 'fa' | 'en']}
                </SheetTitle>
                <p className="text-sm text-muted-foreground mt-2">
                  {selectedStep.description[locale as 'fa' | 'en']}
                </p>
              </div>
              <button
                onClick={handleClose}
                className="rounded-full p-2 hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <X className="h-5 w-5" />
              </button>
            </SheetHeader>
            
            <SheetContent>
              <div className="space-y-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="text-xs font-medium text-muted-foreground">
                        {locale === 'fa' ? 'زمان تخمینی' : 'Estimated Time'}
                      </span>
                    </div>
                    <p className="font-semibold text-foreground">
  {toFarsiTime(selectedStep.estimatedTime, locale)}
</p>
                  </div>

                  <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Target className="w-4 h-4 text-purple-500" />
                      <span className="text-xs font-medium text-muted-foreground">
                        {locale === 'fa' ? 'نتایج یادگیری' : 'Outcomes'}
                      </span>
                    </div>
                    <p className="font-semibold text-foreground">
  {locale === 'fa' 
    ? toFarsiNumber(selectedStep.learningOutcomes[locale as 'fa' | 'en'].length)
    : selectedStep.learningOutcomes[locale as 'fa' | 'en'].length}
</p>
                  </div>
                </div>

                <div className="p-5 rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-500/5 border border-amber-500/20">
                  <div className="flex items-center gap-2 mb-3">
                    <Flag className="w-5 h-5 text-amber-500" />
                    <h3 className="text-lg font-semibold text-foreground">
                      {locale === 'fa' ? 'چرا مهم است؟' : 'Why is it important?'}
                    </h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedStep.whyImportant[locale as 'fa' | 'en']}
                  </p>
                </div>

                <div>
                  <div className="flex gap-2 overflow-x-auto pb-2 border-b border-border/50 custom-scrollbar">
                    {selectedStep.learningOutcomes[locale as 'fa' | 'en'].length > 0 && (
                      <button 
                        onClick={() => setActiveTab('outcomes')}
                        className={cn(
                          "px-4 py-2.5 rounded-lg font-medium text-sm whitespace-nowrap transition-all",
                          activeTab === 'outcomes'
                            ? "bg-primary text-white shadow-lg shadow-primary/30"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4" />
                          {locale === 'fa' ? 'نتایج یادگیری' : 'Learning Outcomes'}
                        </div>
                      </button>
                    )}
                    {selectedStep.prompts.length > 0 && (
                      <button 
                        onClick={() => setActiveTab('prompts')}
                        className={cn(
                          "px-4 py-2.5 rounded-lg font-medium text-sm whitespace-nowrap transition-all",
                          activeTab === 'prompts'
                            ? "bg-primary text-white shadow-lg shadow-primary/30"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <Bot className="w-4 h-4" />
                          {locale === 'fa' ? 'پرامپت‌های AI' : 'AI Prompts'}
                        </div>
                      </button>
                    )}
                    {selectedStep.articles.length > 0 && (
                      <button 
                        onClick={() => setActiveTab('articles')}
                        className={cn(
                          "px-4 py-2.5 rounded-lg font-medium text-sm whitespace-nowrap transition-all",
                          activeTab === 'articles'
                            ? "bg-primary text-white shadow-lg shadow-primary/30"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          {locale === 'fa' ? 'مقالات' : 'Articles'}
                        </div>
                      </button>
                    )}
                    {selectedStep.videos.length > 0 && (
                      <button 
                        onClick={() => setActiveTab('videos')}
                        className={cn(
                          "px-4 py-2.5 rounded-lg font-medium text-sm whitespace-nowrap transition-all",
                          activeTab === 'videos'
                            ? "bg-primary text-white shadow-lg shadow-primary/30"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <Video className="w-4 h-4" />
                          {locale === 'fa' ? 'ویدئوها' : 'Videos'}
                        </div>
                      </button>
                    )}
                    {selectedStep.books.length > 0 && (
                      <button 
                        onClick={() => setActiveTab('books')}
                        className={cn(
                          "px-4 py-2.5 rounded-lg font-medium text-sm whitespace-nowrap transition-all",
                          activeTab === 'books'
                            ? "bg-primary text-white shadow-lg shadow-primary/30"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4" />
                          {locale === 'fa' ? 'کتاب‌ها' : 'Books'}
                        </div>
                      </button>
                    )}
                  </div>

                  <div className="mt-6">
                    <AnimatePresence mode="wait">
                      {activeTab === 'outcomes' && (
                        <motion.div
                          key="outcomes"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-3"
                        >
                          {selectedStep.learningOutcomes[locale as 'fa' | 'en'].map((outcome, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              className="flex items-start gap-3 p-4 rounded-lg bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20"
                            >
                              <CheckCircle2 className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                              <p className="text-foreground leading-relaxed">{outcome}</p>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}

                      {activeTab === 'prompts' && (
                        <motion.div
                          key="prompts"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-3"
                        >
                          {selectedStep.prompts.map((promptObj, idx) => (
                            <PromptCard
                              key={promptObj.id}
                              promptObj={promptObj}
                              locale={locale as 'fa' | 'en'}
                              idx={idx}
                            />
                          ))}
                        </motion.div>
                      )}

                      {activeTab === 'articles' && (
                        <motion.div
                          key="articles"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-3"
                        >
                          {selectedStep.articles.map((article, idx) => (
                            <motion.a
                              key={idx}
                              href={article.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              className={cn(
                                "flex items-start gap-3 p-4 rounded-lg transition-all group relative overflow-hidden",
                                article.isInternal
                                  ? "bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 hover:border-green-500/40 hover:shadow-lg hover:shadow-green-500/10"
                                  : "bg-gradient-to-br from-muted/50 to-muted/30 border border-border/50 hover:border-border hover:shadow-md"
                              )}
                            >
                              <FileText className={cn(
                                "w-5 h-5 mt-0.5 flex-shrink-0",
                                article.isInternal ? "text-green-500" : "text-muted-foreground"
                              )} />
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-2 mb-1">
                                  <p className={cn(
                                    "font-medium transition-colors",
                                    article.isInternal 
                                      ? "text-foreground group-hover:text-green-600" 
                                      : "text-foreground group-hover:text-primary"
                                  )}>
                                    {article.title[locale as 'fa' | 'en']}
                                  </p>
                                  {article.isInternal && (
                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-500 text-white whitespace-nowrap">
                                      {locale === 'fa' ? 'کاولبز' : 'KavLabs'}
                                    </span>
                                  )}
                                </div>
                                {article.description && (
                                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                                    {article.description[locale as 'fa' | 'en']}
                                  </p>
                                )}
                              </div>
                              <svg 
                                className={cn(
                                                                    "w-4 h-4 flex-shrink-0 transition-transform group-hover:translate-x-0.5",
                                  article.isInternal ? "text-green-500" : "text-muted-foreground"
                                )} 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </motion.a>
                          ))}
                        </motion.div>
                      )}

                      {activeTab === 'videos' && (
                        <motion.div
                          key="videos"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-3"
                        >
                          {selectedStep.videos.map((video, idx) => (
                            <motion.a
                              key={idx}
                              href={video.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              className="flex items-start gap-3 p-4 rounded-lg bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/20 hover:border-red-500/40 hover:shadow-lg hover:shadow-red-500/10 transition-all group"
                            >
                              <Video className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-foreground group-hover:text-red-600 transition-colors">
                                  {video.title[locale as 'fa' | 'en']}
                                </p>
                                {video.description && (
                                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                                    {video.description[locale as 'fa' | 'en']}
                                  </p>
                                )}
                              </div>
                              <svg 
                                className="w-4 h-4 text-red-500 flex-shrink-0 transition-transform group-hover:translate-x-0.5" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </motion.a>
                          ))}
                        </motion.div>
                      )}

                      {activeTab === 'books' && (
                        <motion.div
                          key="books"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="space-y-3"
                        >
                          {selectedStep.books.map((book, idx) => (
                            <motion.a
                              key={idx}
                              href={book.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              className="flex items-start gap-3 p-4 rounded-lg bg-gradient-to-br from-orange-500/10 to-orange-500/5 border border-orange-500/20 hover:border-orange-500/40 hover:shadow-lg hover:shadow-orange-500/10 transition-all group"
                            >
                              <BookOpen className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-foreground group-hover:text-orange-600 transition-colors">
                                  {book.title[locale as 'fa' | 'en']}
                                </p>
                                {book.author && (
                                  <p className="text-xs text-muted-foreground mt-0.5">
                                    {locale === 'fa' ? 'نویسنده: ' : 'Author: '}{book.author}
                                  </p>
                                )}
                                {book.description && (
                                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                                    {book.description[locale as 'fa' | 'en']}
                                  </p>
                                )}
                              </div>
                              <svg 
                                className="w-4 h-4 text-orange-500 flex-shrink-0 transition-transform group-hover:translate-x-0.5" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </motion.a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </SheetContent>

            {/* <SheetFooter>
              <button
                onClick={() => toggleComplete(selectedStep.id)}
                className={cn(
                  "w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2",
                  completedSteps.has(selectedStep.id)
                    ? "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/30"
                    : "bg-muted text-foreground hover:bg-muted/80"
                )}
              >
                <CheckCircle2 className="w-5 h-5" />
                {completedSteps.has(selectedStep.id)
                  ? (locale === 'fa' ? 'تکمیل شده' : 'Completed')
                  : (locale === 'fa' ? 'علامت‌گذاری به عنوان تکمیل شده' : 'Mark as Complete')}
              </button>
            </SheetFooter> */}
          </>
        )}
      </Sheet>
    </section>
  );
}
