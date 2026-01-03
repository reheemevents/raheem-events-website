"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const testimonials = [
  {
    id: 1,
    name: "Ahmed & Fatima",
    event: "Wedding",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&q=80",
    rating: 5,
    quote:
      "Raheem Catering made our wedding absolutely magical. The food was exceptional, and the venue decoration at Israr Hall exceeded our expectations. Our guests are still talking about it!",
  },
  {
    id: 2,
    name: "Hassan Ali",
    event: "Corporate Event",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&q=80",
    rating: 5,
    quote:
      "We've used Raheem for multiple corporate events. Their professionalism, attention to detail, and quality of food is consistently excellent. Highly recommended for any business function.",
  },
  {
    id: 3,
    name: "Sara & Bilal",
    event: "Walima",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&q=80",
    rating: 5,
    quote:
      "From the mehndi to the walima, Raheem handled everything perfectly. Mumtaz Banquet Hall was the perfect venue, and the catering was outstanding. Thank you for making our celebrations unforgettable!",
  },
  {
    id: 4,
    name: "Usman Malik",
    event: "Birthday Party",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&q=80",
    rating: 5,
    quote:
      "Organized my parents' 50th anniversary celebration with Raheem. The team was incredibly accommodating, the food was delicious, and the setup was beautiful. Will definitely use again!",
  },
];

export default function TestimonialsCarousel() {
  const t = useTranslations("home.testimonials");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(nextTestimonial, 8000);
    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <section className="relative py-24 md:py-32 bg-[#1A1A1A] overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0">
        {/* Pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Gradient accents */}
        <div className="absolute top-0 left-0 w-1/3 h-1/2 bg-gradient-to-br from-[#D4AF37]/10 to-transparent" />
        <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-gradient-to-tl from-[#DA291C]/10 to-transparent" />
      </div>

      {/* Gold lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={t("title")}
          subtitle={t("subtitle")}
          align="center"
          className="[&_h2]:text-white [&_p]:text-white/60"
        />

        {/* Testimonial card */}
        <div className="relative mt-16">
          {/* Large quote marks */}
          <div className="absolute -top-8 left-0 md:left-12 z-0">
            <Quote
              size={80}
              className="text-[#D4AF37]/20 fill-[#D4AF37]/10"
            />
          </div>

          <div className="relative z-10 max-w-4xl mx-auto">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="bg-white/5 backdrop-blur-sm rounded-sm p-8 md:p-12 border border-white/10"
              >
                {/* Stars */}
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * i }}
                    >
                      <Star
                        size={20}
                        className="text-[#D4AF37] fill-[#D4AF37]"
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-center mb-8">
                  <p className="text-white/90 text-lg md:text-xl leading-relaxed italic">
                    &ldquo;{testimonials[currentIndex].quote}&rdquo;
                  </p>
                </blockquote>

                {/* Author */}
                <div className="flex flex-col items-center">
                  {/* Avatar placeholder */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#E5C453] p-0.5 mb-4">
                    <div className="w-full h-full rounded-full bg-[#2D2D2D] flex items-center justify-center">
                      <span className="text-[#D4AF37] font-heading text-xl font-bold">
                        {testimonials[currentIndex].name.charAt(0)}
                      </span>
                    </div>
                  </div>

                  <h4 className="text-white font-heading text-lg font-semibold">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-[#D4AF37] text-sm">
                    {testimonials[currentIndex].event}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation arrows */}
            <div className="flex justify-center gap-4 mt-8">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#1A1A1A] transition-all duration-300"
              >
                <ChevronLeft size={24} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#1A1A1A] transition-all duration-300"
              >
                <ChevronRight size={24} />
              </motion.button>
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center gap-2 mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`transition-all duration-300 ${
                    index === currentIndex
                      ? "w-8 h-1.5 bg-[#D4AF37]"
                      : "w-1.5 h-1.5 bg-white/30 hover:bg-white/50 rounded-full"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
