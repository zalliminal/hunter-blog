// components/learning-paths/PathDetailHero.tsx
'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Clock, Users, TrendingUp, BookOpen, ArrowDown, HelpCircle, Lightbulb, Sparkles } from 'lucide-react';
import { LearningPath } from '@/lib/learning-paths/learning-path-types';
import * as LucideIcons from 'lucide-react';
import { useRef } from 'react';

interface PathDetailHeroProps {
  path: LearningPath;
  locale: string;
}

const difficultyLabels = {
  beginner: { fa: 'مبتدی', en: 'Beginner' },
  intermediate: { fa: 'متوسط', en: 'Intermediate' },
  advanced: { fa: 'پیشرفته', en: 'Advanced' },
};

const difficultyColors = {
  beginner: 'from-emerald-400 via-teal-400 to-cyan-500',
  intermediate: 'from-amber-400 via-orange-400 to-rose-400',
  advanced: 'from-rose-400 via-purple-500 to-indigo-500',
};

export default function PathDetailHero({ path, locale }: PathDetailHeroProps) {
  const isRTL = locale === 'fa';
  const IconComponent = (LucideIcons as any)[path.icon] || BookOpen;
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest'});
  };

  return (
    <motion.section 
      ref={containerRef}
      style={{ opacity, scale }}
      className={`relative overflow-hidden rounded-2xl backdrop-blur-xl shadow-xl border border-border/60 p-4 ${isRTL ? 'rtl' : 'ltr'}`}
    >
      {/* Premium Animated Background */}
      <div className="absolute inset-0">
        {/* Floating Orbs */}
        <motion.div
          className="absolute top-20 left-[10%] w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{
            background: `radial-gradient(circle, ${path.color.light}80 0%, transparent 70%)`
          }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-[15%] w-80 h-80 rounded-full blur-3xl opacity-15"
          style={{
            background: `radial-gradient(circle, ${path.color.dark}60 0%, transparent 70%)`
          }}
          animate={{
            x: [0, -40, 0],
            y: [0, -50, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        
        {/* Gradient Mesh */}
        <div className={`absolute inset-0 bg-gradient-to-br ${path.color.bgGradient} opacity-15`} />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
      </div>

      <div className="container relative mx-auto px-4 py-12 md:py-20 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          
          {/* Left Side: Title, Description & Actions */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6 md:space-y-8"
          >
            {/* Floating Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                delay: 0.2, 
                type: 'spring', 
                stiffness: 200, 
                damping: 15 
              }}
              className="relative inline-block"
            >
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${path.color.gradient} blur-2xl opacity-60 rounded-3xl`}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 0.8, 0.6],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div 
                className={`relative w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br ${path.color.gradient} flex items-center justify-center shadow-2xl`}
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <IconComponent className="w-8 h-8 md:w-10 md:h-10 text-white drop-shadow-lg" strokeWidth={1.5} />
              </motion.div>
            </motion.div>

            {/* Title with Gradient */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="space-y-3 md:space-y-4"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight">
                <motion.span
                  className={`bg-gradient-to-br ${path.color.gradient} bg-clip-text text-transparent`}
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  style={{ backgroundSize: '200% 200%' }}
                >
                  {path.title[locale as 'fa' | 'en']}
                </motion.span>
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-sm md:text-base text-muted-foreground leading-relaxed"
            >
              {path.description[locale as 'fa' | 'en']}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap items-center gap-2 md:gap-3 pt-2"
            >
              <ActionButton
                icon={ArrowDown}
                label={locale === 'fa' ? 'شروع یادگیری' : 'Start Learning'}
                onClick={() => scrollToSection('learning-steps')}
                variant="primary"
                gradient={path.color.gradient}
              />
              <ActionButton
                icon={HelpCircle}
                label={locale === 'fa' ? 'سوالات متداول' : 'FAQ'}
                onClick={() => scrollToSection('faq')}
                variant="secondary"
                color="bg-primary/60"
              />
              <ActionButton
                icon={Lightbulb}
                label={locale === 'fa' ? 'نکات کاربردی' : 'Pro Tips'}
                onClick={() => scrollToSection('tips')}
                variant="secondary"
                color='bg-amber-500/60'
              />
            </motion.div>
          </motion.div>

          {/* Right Side: Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Decorative Background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-background/50 to-background/20 backdrop-blur-3xl rounded-3xl border border-border"
            />

            <div className="relative p-5 md:p-6 lg:p-8 space-y-4 md:space-y-6">
              {/* Responsive Grid Layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                <StatsCard
                  icon={Clock}
                  label={locale === 'fa' ? 'مدت زمان' : 'Duration'}
                  value={path.estimatedTotalTime[locale as 'fa' | 'en']}
                  gradient={path.color.gradient}
                  delay={0.7}
                />
                <StatsCard
                  icon={TrendingUp}
                  label={locale === 'fa' ? 'سطح' : 'Level'}
                  value={difficultyLabels[path.difficulty][locale as 'fa' | 'en']}
                  gradient={difficultyColors[path.difficulty]}
                  delay={0.8}
                />
                
                {/* Full width steps card moved here for better mobile flow */}
                <StatsCard
                  icon={BookOpen}
                  label={locale === 'fa' ? 'تعداد قدم‌ها' : 'Total Steps'}
                  value={`${path.totalSteps} ${locale === 'fa' ? 'قدم' : 'Steps'}`}
                  gradient={path.color.gradient}
                  delay={0.9}
                  className="sm:col-span-2"
                />
              </div>

              {/* Target Audience - Featured */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="relative group"
              >
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-r ${path.color.gradient} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500 rounded-2xl`}
                />
                <div className="relative p-4 md:p-5 bg-gradient-to-br from-background/80 to-background/40 backdrop-blur-xl rounded-2xl border border-border/50 hover:border-border transition-all duration-300 border border-primary/20">
                  <div className="flex items-start gap-3 md:gap-4">
                    <motion.div
                      className={`p-2.5 md:p-3 rounded-xl bg-gradient-to-br ${path.color.gradient} shadow-lg`}
                      whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Users className="w-4 h-4 md:w-5 md:h-5 text-white" strokeWidth={2} />
                    </motion.div>
                    <div className="flex-1 space-y-1">
                      <p className="text-[10px] md:text-xs font-medium text-muted-foreground uppercase tracking-wider">
                        {locale === 'fa' ? 'مخاطبان هدف' : 'Target Audience'}
                      </p>
                      <p className="text-sm md:text-base font-semibold text-foreground leading-snug">
                        {path.targetAudience[locale as 'fa' | 'en']}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Separator */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      />
    </motion.section>
  );
}

function StatsCard({ 
  icon: Icon, 
  label, 
  value, 
  gradient, 
  delay, 
  highlight, 
  className = '',
  ...props 
}: any) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.6, type: 'spring', stiffness: 100 }}
      className={`group relative ${className}`}
      {...props}
    >
      <motion.div
        className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 rounded-2xl`}
        whileHover={{ scale: 1.05 }}
      />
      <motion.div
        className={`relative p-4 md:p-5 bg-gradient-to-br from-background/60 to-background/30 backdrop-blur-xl rounded-2xl border transition-all duration-300 ${
          highlight 
            ? 'border-border/80 shadow-lg' 
            : 'border-border/40 hover:border-border/60'
        }`}
        whileHover={{ y: -4, boxShadow: '0 20px 40px -10px rgba(0,0,0,0.2)' }}
      >
        <div className="flex items-center gap-3">
          <motion.div
            className={`p-2 rounded-lg md:rounded-xl bg-gradient-to-br ${gradient} shadow-md`}
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <Icon className="w-4 h-4 text-white" strokeWidth={2.5} />
          </motion.div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] md:text-xs font-medium text-muted-foreground uppercase tracking-wider mb-0.5">
              {label}
            </p>
            <p className="text-sm md:text-base font-bold text-foreground truncate">
              {value}
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ActionButton({ 
  icon: Icon, 
  label, 
  onClick, 
  variant = 'secondary', 
  gradient, 
  color = 'bg-primary' 
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  gradient?: string;
  color?: string;
}) {
  const isPrimary = variant === 'primary';

  return (
    <motion.button
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      className={`
        group relative flex items-center gap-2 px-4 py-2.5 md:px-5 md:py-3 rounded-lg md:rounded-xl font-semibold text-xs md:text-sm
        transition-all duration-300 overflow-hidden whitespace-nowrap
        ${isPrimary 
          ? 'text-back shadow-xl hover:shadow-2xl' 
          : 'bg-background/60 backdrop-blur-xl text-background border border-border/50 hover:border-border hover:bg-background/80'
        }
      `}
    >
      {isPrimary ? (
        <>
          <motion.div
            className={`absolute inset-0 bg-gradient-to-r ${gradient}`}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="absolute inset-0 bg-white/20"
            animate={{
              x: ['-200%', '200%'],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
          />
        </>
      ) : (
        <motion.div
          className={`absolute inset-0 ${color}`}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        />
      )}
      
      <Icon 
        className={`relative w-3.5 h-3.5 md:w-4 md:h-4 transition-colors ${
          isPrimary ? 'text-white' : 'text-background'
        }`} 
        strokeWidth={2.5} 
      />
      <span className="relative">{label}</span>
    </motion.button>
  );
}
