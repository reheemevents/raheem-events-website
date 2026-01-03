"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { UtensilsCrossed, Building2, Sparkles, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const services = [
  {
    id: "catering",
    icon: UtensilsCrossed,
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=80",
    href: "/catering",
    gradient: "from-[#DA291C] to-[#8B0000]",
  },
  {
    id: "israr",
    icon: Building2,
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80",
    href: "/venues/israr-marriage-hall",
    gradient: "from-[#D4AF37] to-[#8B7500]",
  },
  {
    id: "mumtaz",
    icon: Sparkles,
    image: "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?w=800&q=80",
    href: "/venues/mumtaz-banquet-hall",
    gradient: "from-[#1A1A1A] to-[#4A4A4A]",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

export default function ServicesOverview() {
  const t = useTranslations("home.services");

  return (
    <section className="relative py-24 md:py-32 bg-[#FAFAFA] overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#DA291C]/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={t("title")}
          subtitle={t("subtitle")}
          align="center"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div key={service.id} variants={cardVariants}>
                <Link href={service.href} className="block group">
                  <div className="relative bg-white rounded-sm overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.12)] transition-all duration-500">
                    {/* Gold border on hover */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#D4AF37] transition-colors duration-500 rounded-sm z-10 pointer-events-none" />

                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

                    {/* Image container */}
                    <div className="relative h-64 overflow-hidden">
                      {/* Placeholder gradient */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${service.gradient}`}
                      />
                      {/* Actual image would layer on top */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      {/* Icon badge */}
                      <div className="absolute top-4 right-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                        <Icon className="w-5 h-5 text-[#1A1A1A]" />
                      </div>

                      {/* Title overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="font-heading text-2xl font-semibold text-white mb-1">
                          {t(`${service.id}.title`)}
                        </h3>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <p className="text-[#6B7280] leading-relaxed mb-4">
                        {t(`${service.id}.description`)}
                      </p>

                      <div className="flex items-center text-[#D4AF37] font-medium group-hover:text-[#B8962E] transition-colors">
                        <span>Learn More</span>
                        <motion.span
                          className="ltr:ml-2 rtl:mr-2"
                          initial={{ x: 0 }}
                          whileHover={{ x: 4 }}
                        >
                          <ArrowRight size={18} className="rtl:rotate-180" />
                        </motion.span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
