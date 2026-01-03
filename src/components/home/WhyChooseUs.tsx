"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Calendar,
  Users,
  Heart,
  UtensilsCrossed,
  Check,
  Star,
} from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface StatProps {
  value: number;
  suffix: string;
  label: string;
  icon: React.ReactNode;
  delay?: number;
}

function AnimatedStat({ value, suffix, label, icon, delay = 0 }: StatProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const stepValue = value / steps;
      let currentStep = 0;

      const timer = setTimeout(() => {
        const interval = setInterval(() => {
          currentStep++;
          setCount(Math.min(Math.round(stepValue * currentStep), value));
          if (currentStep >= steps) {
            clearInterval(interval);
          }
        }, duration / steps);

        return () => clearInterval(interval);
      }, delay);

      return () => clearTimeout(timer);
    }
  }, [isInView, value, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: delay / 1000 }}
      className="text-center group"
    >
      <div className="relative inline-block mb-4">
        {/* Decorative ring */}
        <div className="absolute inset-0 w-20 h-20 rounded-full border-2 border-[#D4AF37]/20 group-hover:border-[#D4AF37]/40 transition-colors duration-500 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 scale-150" />

        {/* Icon container */}
        <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-[#D4AF37]/10 to-[#D4AF37]/5 flex items-center justify-center mx-auto group-hover:from-[#D4AF37]/20 group-hover:to-[#D4AF37]/10 transition-all duration-500">
          <span className="text-[#D4AF37]">{icon}</span>
        </div>
      </div>

      <div className="font-heading text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-2">
        {count}
        <span className="text-[#D4AF37]">{suffix}</span>
      </div>
      <p className="text-[#6B7280] font-medium">{label}</p>
    </motion.div>
  );
}

const features = [
  "Experienced professional team",
  "Customizable packages",
  "Premium quality ingredients",
  "On-time delivery guaranteed",
  "Elegant venue decorations",
  "24/7 customer support",
];

export default function WhyChooseUs() {
  const t = useTranslations("home.whyUs");

  const stats = [
    {
      value: 20,
      suffix: "+",
      label: t("stats.years"),
      icon: <Calendar size={28} />,
    },
    {
      value: 500,
      suffix: "+",
      label: t("stats.events"),
      icon: <Star size={28} />,
    },
    {
      value: 1000,
      suffix: "+",
      label: t("stats.clients"),
      icon: <Users size={28} />,
    },
    {
      value: 100,
      suffix: "+",
      label: t("stats.dishes"),
      icon: <UtensilsCrossed size={28} />,
    },
  ];

  return (
    <section className="relative py-24 md:py-32 bg-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-1/3 h-full">
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAFAFA] to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4AF37' fill-opacity='1'%3E%3Cpath d='M20 20l-10-10v20l10-10zm0 0l10-10v20l-10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={t("title")}
          subtitle={t("subtitle")}
          align="center"
        />

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mt-16 mb-20">
          {stats.map((stat, index) => (
            <AnimatedStat
              key={stat.label}
              {...stat}
              delay={index * 200}
            />
          ))}
        </div>

        {/* Features section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Decorative frame */}
          <div className="absolute -inset-4 border border-[#E5E5E5] rounded-sm" />
          <div className="absolute -inset-8 border border-[#E5E5E5]/50 rounded-sm hidden md:block" />

          <div className="relative bg-gradient-to-br from-[#1A1A1A] to-[#2D2D2D] rounded-sm p-8 md:p-12 overflow-hidden">
            {/* Pattern overlay */}
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />

            {/* Gold accent line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

            <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-4 group"
                >
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center group-hover:bg-[#D4AF37]/30 transition-colors duration-300">
                    <Check size={16} className="text-[#D4AF37]" />
                  </span>
                  <span className="text-white/90 font-medium">{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* Heart decoration */}
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8, type: "spring" }}
              className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#DA291C]/10 rounded-full flex items-center justify-center"
            >
              <Heart size={32} className="text-[#DA291C]/60" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
