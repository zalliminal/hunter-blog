// components/support/LatestSupporters.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

type Props = {
  isFa: boolean;
};

type Supporter = {
  id: string;
  name: string;
  amount: number;
  message?: string;
  timestamp: string;
  isAnonymous?: boolean;
};

export default function LatestSupporters({ isFa }: Props) {
  const [supporters, setSupporters] = useState<Supporter[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSupporters = async () => {
      try {
        const response = await fetch("/api/support/latest");
        if (response.ok) {
          const data: Supporter[] = await response.json();
          setSupporters(data);
        }
      } catch (error) {
        console.error("Failed to fetch supporters:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSupporters();
    const interval = setInterval(fetchSupporters, 60000);
    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat(isFa ? "fa-IR" : "en-US", {
      style: "decimal",
      maximumFractionDigits: 0,
    }).format(num);
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return isFa ? "همین الان" : "just now";
    if (diffMins < 60)
      return isFa ? `${diffMins} دقیقه پیش` : `${diffMins}m ago`;
    if (diffHours < 24)
      return isFa ? `${diffHours} ساعت پیش` : `${diffHours}h ago`;
    return isFa ? `${diffDays} روز پیش` : `${diffDays}d ago`;
  };

  return (
    <section className="w-full relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative space-y-8"
      >
        {/* Header */}
        <div className="text-center space-y-3">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 backdrop-blur-sm"
          >
            <Heart className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-accent-foreground">
              {isFa ? "حامیان عزیز" : "Our Supporters"}
            </span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            {isFa ? "آخرین حمایت‌ها" : "Latest Support"}
          </h2>

          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            {isFa
              ? "از تمام کسانی که ما را حمایت می‌کنند، صمیمانه سپاسگزاریم"
              : "We sincerely thank everyone who supports us"}
          </p>
        </div>

        {/* Supporters Carousel */}
        <div className="relative px-4">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-[280px] bg-card/30 backdrop-blur-xl animate-pulse rounded-2xl border border-border/50"
                />
              ))}
            </div>
          ) : supporters.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative overflow-hidden rounded-2xl border border-dashed border-border/60 bg-card/30 backdrop-blur-xl p-12"
            >
              <div className="text-center space-y-4">
                <Heart className="h-16 w-16 text-muted-foreground/30 mx-auto" />
                <div className="space-y-2">
                  <p className="text-lg font-medium text-muted-foreground">
                    {isFa ? "هنوز حمایتی ثبت نشده است" : "No support yet"}
                  </p>
                  <p className="text-sm text-muted-foreground/70">
                    {isFa ? "اولین نفر باشید!" : "Be the first!"}
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <>
              <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                spaceBetween={24}
                slidesPerView={1}
                centeredSlides={false}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                }}
                navigation={{
                  prevEl: '.swiper-button-prev-custom',
                  nextEl: '.swiper-button-next-custom',
                }}
                loop={supporters.length > 3}
                breakpoints={{
                  640: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 24,
                  },
                  1024: {
                    slidesPerView: 3,
                    spaceBetween: 24,
                  },
                }}
                className="!pb-14"
                dir={isFa ? "rtl" : "ltr"}
              >
                {supporters.map((supporter) => (
                  <SwiperSlide key={supporter.id}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="group h-[280px]"
                    >
                      <div className="relative h-full overflow-hidden rounded-2xl border border-border/50 bg-card/40 backdrop-blur-xl p-6 transition-all duration-300 hover:border-primary/40 hover:bg-card/60 hover:shadow-lg">
                        {/* Glassmorphism gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Subtle glow effect */}
                        <div className="absolute -inset-[1px] bg-gradient-to-br from-primary/20 via-transparent to-accent/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 -z-10" />

                        <div className="relative z-10 h-full flex flex-col">
                          {/* Header - Fixed Height */}
                          <div className="flex items-center justify-between gap-3 mb-4">
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                              <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 backdrop-blur-sm flex items-center justify-center border border-primary/20 group-hover:border-primary/40 transition-colors">
                                <Heart className="h-5 w-5 text-primary" />
                              </div>
                              <div className="min-w-0">
                                <p className="font-semibold text-sm truncate text-foreground">
                                  {supporter.isAnonymous
                                    ? isFa
                                      ? "ناشناس"
                                      : "Anonymous"
                                    : supporter.name}
                                </p>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-0.5">
                                  <Clock className="h-3 w-3" />
                                  <span>{formatTime(supporter.timestamp)}</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex-shrink-0 px-3 py-1.5 rounded-lg bg-primary/10 backdrop-blur-sm border border-primary/20">
                              <span className="text-sm font-bold text-primary whitespace-nowrap">
                                {formatCurrency(supporter.amount/10)}
                              </span>
                            </div>
                          </div>

                          {/* Message - Flexible Height with Fixed Max */}
                          <div className="flex-1 min-h-0">
                            {supporter.message ? (
                              <div className="h-full flex items-start gap-2.5 p-4 rounded-xl bg-muted/30 backdrop-blur-sm border border-border/30">
                                <MessageCircle className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-6">
                                  {supporter.message}
                                </p>
                              </div>
                            ) : (
                              <div className="h-full flex items-center justify-center p-4 rounded-xl bg-muted/20 backdrop-blur-sm border border-dashed border-border/30">
                                <p className="text-xs text-muted-foreground/50 italic">
                                  {isFa ? "بدون پیام" : "No message"}
                                </p>
                              </div>
                            )}
                          </div>

                          {/* Bottom accent line */}
                          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </div>
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Custom Navigation Buttons */}
              <button className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-xl bg-card/60 backdrop-blur-xl border border-border/50 flex items-center justify-center transition-all duration-300 hover:border-primary/50 hover:bg-card/80 hover:shadow-md disabled:opacity-30 disabled:cursor-not-allowed group/btn">
                <ChevronLeft className="h-5 w-5 text-muted-foreground group-hover/btn:text-primary transition-colors" />
              </button>
              <button className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-xl bg-card/60 backdrop-blur-xl border border-border/50 flex items-center justify-center transition-all duration-300 hover:border-primary/50 hover:bg-card/80 hover:shadow-md disabled:opacity-30 disabled:cursor-not-allowed group/btn">
                <ChevronRight className="h-5 w-5 text-muted-foreground group-hover/btn:text-primary transition-colors" />
              </button>

              {/* Custom Swiper Styles */}
              <style jsx global>{`
                .swiper-pagination-bullet {
                  width: 8px;
                  height: 8px;
                  background: hsl(var(--muted-foreground) / 0.3);
                  opacity: 1;
                  transition: all 0.3s ease;
                }
                .swiper-pagination-bullet-active {
                  background: var(--primary);
                  width: 24px;
                  border-radius: 4px;
                }
              `}</style>

              {/* CTA Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-12 text-center"
              >
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="https://daramet.com/kavlabs"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium shadow-lg hover:shadow-xl transition-all"
                >
                  <Heart className="h-4 w-4" />
                  {isFa ? "شما هم حمایت کنید" : "Join Our Supporters"}
                </motion.a>
                <p className="text-xs text-muted-foreground mt-3">
                  {isFa
                    ? "هر کمکی، در هر اندازه، برای ما به قدر دنیا ارزشمند است"
                    : "Every contribution, no matter how small, is valuable to us"}
                </p>
              </motion.div>
            </>
          )}
        </div>
      </motion.div>
    </section>
  );
}
