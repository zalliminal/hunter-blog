// components/support/ThankYouCard.tsx
"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Terminal, Fingerprint } from "lucide-react";

type Props = {
  isFa: boolean;
};

export default function ThankYouCard({ isFa }: Props) {
  return (
    <section className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative overflow-hidden rounded-3xl border border-primary/20 bg-card/40 backdrop-blur-xl shadow-xl"
      >
        {/* Animated Background Orbs */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <style jsx>{`
            @keyframes float-orb-1 {
              0%, 100% { transform: translate(-8px, -8px) scale(1); }
              50% { transform: translate(8px, -12px) scale(1.05); }
            }
            @keyframes float-orb-2 {
              0%, 100% { transform: translate(12px, 8px) scale(0.95); }
              50% { transform: translate(-8px, 12px) scale(1); }
            }
            @keyframes pulse-glow {
              0%, 100% { opacity: 0.15; }
              50% { opacity: 0.25; }
            }
          `}</style>
          
          <div
            className="absolute -top-24 -right-24 h-64 w-64 rounded-full blur-3xl"
            style={{ 
              backgroundColor: 'var(--primary)',
              animation: 'float-orb-1 8s ease-in-out infinite, pulse-glow 4s ease-in-out infinite'
            }}
          />
          
          <div
            className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full blur-3xl"
            style={{ 
              backgroundColor: 'var(--accent)',
              opacity: 0.12,
              animation: 'float-orb-2 12s ease-in-out infinite'
            }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 p-4 md:p-8 lg:p-12">
          
          {/* Icon Grid Header */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="mb-8 flex items-center justify-center gap-3"
          > 
            {[Shield, Lock, Terminal, Fingerprint].map((Icon, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/5 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-primary/10 hover:scale-110"
              >
                <Icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
              </motion.div>
            ))}
          </motion.div>

          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mb-6 text-center"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-3">
              {isFa ? "از حمایت شما ممنونیم" : "Thank You for Your Support"}
            </h2>
            <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />
          </motion.div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mb-8 text-center"
          >
            <p className="mx-auto max-w-2xl text-base md:text-lg leading-relaxed text-muted-foreground">
              {isFa
                ? "کاولبز به لطف حامیانی مثل شما زنده و پویاست. هر حمایت شما، چه مالی و چه معنوی، به ما انگیزه می‌دهد تا محتوای آموزشی بهتر، ابزارهای کاربردی‌تر و جامعه‌ای قوی‌تر برای مردم ایران و جهان بسازیم."
                : "KavLabs is alive and thriving thanks to supporters like you. Every contribution, whether financial or moral, motivates us to create better educational content, more practical tools, and a stronger community for people."}
            </p>
          </motion.div>

          {/* Quote Card */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl border border-border/60 bg-background/60 backdrop-blur-sm p-6 md:p-8 shadow-lg"
          >
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
            
            <div className="relative z-10">
              {/* Badge */}
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary">
                <Shield className="h-3 w-3" strokeWidth={2} />
                <span>{isFa ? "پیام تیم" : "Team Message"}</span>
              </div>

              {/* Quote Text */}
              <blockquote className="text-sm md:text-base leading-relaxed text-foreground/90 mb-4">
                {isFa
                  ? "هر خط کدی که می‌نویسیم، هر مقاله‌ای که منتشر می‌کنیم، و هر ابزاری که می‌سازیم، هر قدم ما با الهام از حمایت و اعتماد و بخاطر شماست. ممنون که در کنار ما هستید."
                  : "Every line of code we write, every article we publish, and every tool we build is inspired by your support and trust. Thank you for being with us."}
              </blockquote>

              {/* Attribution */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                <div className="h-px w-8 bg-border" />
                <span>{isFa ? "KavLabs Team" : "KavLabs Team"}</span>
              </div>
            </div>

            {/* Shine effect on hover */}
            <style jsx>{`
              .quote-card::after {
                content: '';
                position: absolute;
                inset: 0;
                border-radius: 1rem;
                background: linear-gradient(110deg, transparent 30%, var(--primary) 50%, transparent 70%);
                opacity: 0;
                transform: translateX(-100%);
                transition: all 0.6s ease-out;
                pointer-events: none;
              }
              .quote-card:hover::after {
                opacity: 0.1;
                transform: translateX(100%);
              }
            `}</style>
            <div className="quote-card absolute inset-0 rounded-2xl pointer-events-none" />
          </motion.div>

          {/* Bottom Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="mt-8 flex justify-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-medium text-primary backdrop-blur-sm">
              <Terminal className="h-3.5 w-3.5" strokeWidth={2} />
              <span>
                {isFa
                  ? "شما بخشی از خانواده کاولبز هستید"
                  : "You are part of the KavLabs family"}
              </span>
            </div>
          </motion.div>

        </div>

        {/* Bottom decorative line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </motion.div>
    </section>
  );
}
