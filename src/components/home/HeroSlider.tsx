"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1920&q=85",
    alt: "Elegant wedding setup",
  },
  {
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=1920&q=85",
    alt: "Catering spread",
  },
  {
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1920&q=85",
    alt: "Decorated venue",
  },
];

export default function HeroSlider() {
  const t = useTranslations("home.hero");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          {/* Placeholder gradient when no images */}
          <div
            className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A] via-[#2D2D2D] to-[#1A1A1A]"
            style={{
              backgroundImage: `url(${heroSlides[currentSlide].image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Bottom fade with dark reddish tint */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#3D0A07] via-[#2A0805]/80 to-transparent" />

      {/* Decorative pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Gold corner decorations - vertically centered, below header */}
      <div className="absolute top-24 left-8 w-24 h-24 border-t-2 border-l-2 border-[#D4AF37]/60" />
      <div className="absolute top-24 right-8 w-24 h-24 border-t-2 border-r-2 border-[#D4AF37]/60" />
      <div className="absolute bottom-8 left-8 w-24 h-24 border-b-2 border-l-2 border-[#D4AF37]/60" />
      <div className="absolute bottom-8 right-8 w-24 h-24 border-b-2 border-r-2 border-[#D4AF37]/60" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 text-center">
        {/* Animated entrance */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          {/* Decorative line above title */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isLoaded ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-20 h-0.5 bg-[#D4AF37] mx-auto mb-8"
          />

          {/* Main heading */}
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            {t("title")}
          </h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isLoaded ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-lg sm:text-xl md:text-2xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            {t("subtitle")}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/book-now">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-[#DA291C] text-white font-semibold text-lg rounded-sm shadow-[0_8px_30px_rgba(218,41,28,0.4)] hover:bg-[#B82318] transition-colors duration-300"
              >
                {t("cta1")}
              </motion.button>
            </Link>

            <Link href="/venues">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 bg-transparent text-[#D4AF37] font-semibold text-lg rounded-sm border-2 border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#1A1A1A] transition-all duration-300"
              >
                {t("cta2")}
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Slide indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isLoaded ? { opacity: 1 } : {}}
          transition={{ delay: 1.2 }}
          className="absolute bottom-32 left-1/2 -translate-x-1/2 flex gap-3"
        >
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-300 ${
                index === currentSlide
                  ? "w-8 h-1.5 bg-[#D4AF37]"
                  : "w-1.5 h-1.5 bg-white/40 hover:bg-white/60 rounded-full"
              }`}
            />
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.4 }}
          onClick={scrollToContent}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 hover:text-[#D4AF37] transition-colors duration-300 group"
        >
          <span className="text-xs uppercase tracking-[0.2em]">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown size={24} />
          </motion.div>
        </motion.button>
      </div>

      {/* Gold line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
    </section>
  );
}
