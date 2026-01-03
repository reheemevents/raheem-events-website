"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, UtensilsCrossed, Building2, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const services = [
  {
    id: "catering",
    icon: UtensilsCrossed,
    image: "/images/menu/raheem_food_images/Rice/025_Chicken Biryani.webp",
    href: "/catering",
    index: "01",
    accent: "#DA291C",
  },
  {
    id: "israr",
    icon: Building2,
    image: "/images/menu/raheem_food_images/BBQ/047_Chicken Tikka.webp",
    href: "/venues/israr-marriage-hall",
    index: "02",
    accent: "#D4AF37",
  },
  {
    id: "mumtaz",
    icon: Sparkles,
    image: "/images/menu/raheem_food_images/Qorma - Curry/098_Mutton Qorma Daig.webp",
    href: "/venues/mumtaz-banquet-hall",
    index: "03",
    accent: "#1A1A1A",
  },
];

export default function ServicesOverview() {
  const t = useTranslations("home.services");

  return (
    <section className="relative py-24 md:py-32 lg:py-40 bg-[#FAF9F7] overflow-hidden">
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23D4AF37' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t("eyebrow") || "What We Offer"}
          title={t("title")}
          subtitle={t("subtitle")}
          align="center"
          decorationStyle="diamond"
        />

        {/* Asymmetric Bento Grid */}
        <div className="mt-16 md:mt-20">
          {/* Desktop: Asymmetric Layout */}
          <div className="hidden lg:grid lg:grid-cols-12 lg:grid-rows-2 gap-6 lg:h-[700px]">
            {/* Large Main Card - Catering (spans 7 cols, 2 rows) */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7 lg:row-span-2"
            >
              <ServiceCard
                service={services[0]}
                t={t}
                variant="large"
              />
            </motion.div>

            {/* Top Right Card - Israr Hall */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 lg:row-span-1"
            >
              <ServiceCard
                service={services[1]}
                t={t}
                variant="medium"
              />
            </motion.div>

            {/* Bottom Right Card - Mumtaz Hall */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-5 lg:row-span-1"
            >
              <ServiceCard
                service={services[2]}
                t={t}
                variant="medium"
              />
            </motion.div>
          </div>

          {/* Tablet: 2-column layout */}
          <div className="hidden md:grid md:grid-cols-2 lg:hidden gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={index === 0 ? "md:col-span-2" : ""}
              >
                <ServiceCard
                  service={service}
                  t={t}
                  variant={index === 0 ? "large" : "medium"}
                />
              </motion.div>
            ))}
          </div>

          {/* Mobile: Stacked cards */}
          <div className="md:hidden space-y-6">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ServiceCard
                  service={service}
                  t={t}
                  variant="mobile"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface ServiceCardProps {
  service: typeof services[0];
  t: ReturnType<typeof useTranslations<"home.services">>;
  variant: "large" | "medium" | "mobile";
}

function ServiceCard({ service, t, variant }: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <Link href={service.href} className="block group h-full">
      <div className={`
        relative overflow-hidden bg-white h-full
        transition-all duration-700 ease-out
        ${variant === "large" ? "min-h-[500px] lg:min-h-full" : ""}
        ${variant === "medium" ? "min-h-[300px] lg:min-h-full" : ""}
        ${variant === "mobile" ? "min-h-[350px]" : ""}
      `}>
        {/* Image */}
        <div className="absolute inset-0">
          <Image
            src={service.image}
            alt={t(`${service.id}.title`)}
            fill
            className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
            sizes={variant === "large" ? "(max-width: 1024px) 100vw, 60vw" : "(max-width: 1024px) 100vw, 40vw"}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
        </div>

        {/* Gold border on hover */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#D4AF37] transition-colors duration-500 z-20 pointer-events-none" />

        {/* Index Number - Top Left */}
        <div className="absolute top-6 left-6 z-10">
          <span
            className="font-display text-5xl md:text-6xl lg:text-7xl font-light tracking-tight"
            style={{
              color: service.accent,
              opacity: 0.3,
              WebkitTextStroke: '1px rgba(255,255,255,0.2)'
            }}
          >
            {service.index}
          </span>
        </div>

        {/* Icon Badge - Top Right */}
        <motion.div
          className="absolute top-6 right-6 z-10"
          whileHover={{ rotate: 15, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:border-[#D4AF37] transition-all duration-500">
            <Icon className="w-6 h-6 text-white" />
          </div>
        </motion.div>

        {/* Content - Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10">
          {/* Title and Arrow */}
          <div className="flex items-end justify-between gap-4">
            <div className="flex-1">
              <h3 className={`
                font-heading text-white tracking-tight mb-2
                ${variant === "large" ? "text-3xl md:text-4xl lg:text-5xl" : ""}
                ${variant === "medium" ? "text-2xl md:text-3xl" : ""}
                ${variant === "mobile" ? "text-2xl" : ""}
              `}>
                {t(`${service.id}.title`)}
              </h3>

              <p className={`
                text-white/70 leading-relaxed
                ${variant === "large" ? "text-base md:text-lg max-w-md" : "text-sm md:text-base max-w-sm"}
              `}>
                {t(`${service.id}.description`)}
              </p>
            </div>

            {/* Arrow Button */}
            <div className="flex-shrink-0">
              <motion.div
                className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-white/30 flex items-center justify-center group-hover:border-[#D4AF37] group-hover:bg-[#D4AF37] transition-all duration-500"
                whileHover={{ scale: 1.1 }}
              >
                <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 text-white transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:rotate-90" />
              </motion.div>
            </div>
          </div>

          {/* Gold accent line at bottom */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#D4AF37] via-[#E5C453] to-[#D4AF37]"
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
        </div>

        {/* Hover reveal decorative elements */}
        <div className="absolute top-0 left-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute top-4 left-4 w-8 h-px bg-[#D4AF37]" />
          <div className="absolute top-4 left-4 w-px h-8 bg-[#D4AF37]" />
        </div>
        <div className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
          <div className="absolute top-4 right-4 w-8 h-px bg-[#D4AF37]" />
          <div className="absolute top-4 right-4 w-px h-8 bg-[#D4AF37]" />
        </div>
      </div>
    </Link>
  );
}
