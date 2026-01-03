"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Check, ArrowRight, Crown } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

const packages = [
  {
    id: "silver",
    price: "1,200",
    features: [
      "Standard menu selection",
      "Basic stage decoration",
      "Standard seating",
      "6 service staff",
      "Basic lighting",
    ],
    color: "from-slate-300 to-slate-400",
    textColor: "text-slate-700",
    borderColor: "border-slate-300",
  },
  {
    id: "gold",
    price: "1,800",
    popular: true,
    features: [
      "Premium menu selection",
      "Enhanced stage decoration",
      "Premium seating",
      "10 service staff",
      "Ambient lighting",
      "Live cooking station",
    ],
    color: "from-[#D4AF37] to-[#E5C453]",
    textColor: "text-[#8B7500]",
    borderColor: "border-[#D4AF37]",
  },
  {
    id: "platinum",
    price: "2,500",
    features: [
      "Luxury menu selection",
      "Premium stage decoration",
      "VIP seating arrangements",
      "15 service staff",
      "Designer lighting",
      "Multiple live stations",
      "Dedicated event manager",
    ],
    color: "from-slate-600 to-slate-800",
    textColor: "text-white",
    borderColor: "border-slate-600",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

export default function FeaturedPackages() {
  const t = useTranslations("packages");
  const tHome = useTranslations("home.packages");

  return (
    <section className="relative py-24 md:py-32 bg-[#FAFAFA] overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#D4AF37]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={tHome("title")}
          subtitle={tHome("subtitle")}
          align="center"
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-16"
        >
          {packages.map((pkg) => (
            <motion.div
              key={pkg.id}
              variants={cardVariants}
              className={`relative ${pkg.popular ? "md:-mt-4 md:mb-4" : ""}`}
            >
              {/* Popular badge */}
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, type: "spring" }}
                    className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-[#D4AF37] to-[#E5C453] rounded-full shadow-lg"
                  >
                    <Crown size={14} className="text-[#1A1A1A]" />
                    <span className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider">
                      {t("popular")}
                    </span>
                  </motion.div>
                </div>
              )}

              <div
                className={`relative bg-white rounded-sm overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.15)] transition-all duration-500 h-full flex flex-col ${
                  pkg.popular ? "ring-2 ring-[#D4AF37]" : ""
                }`}
              >
                {/* Header */}
                <div className={`relative p-6 bg-gradient-to-br ${pkg.color}`}>
                  {/* Pattern overlay */}
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M0 0h10v10H0V0zm10 10h10v10H10V10z'/%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                  />

                  <div className="relative text-center">
                    <h3
                      className={`font-heading text-2xl font-bold ${
                        pkg.id === "platinum" ? "text-white" : "text-[#1A1A1A]"
                      } mb-2 uppercase tracking-wider`}
                    >
                      {t(pkg.id)}
                    </h3>
                    <div
                      className={`${
                        pkg.id === "platinum"
                          ? "text-white/80"
                          : "text-[#1A1A1A]/70"
                      } text-sm`}
                    >
                      {t("startingFrom")}
                    </div>
                    <div
                      className={`font-heading text-4xl font-bold ${
                        pkg.id === "platinum" ? "text-white" : "text-[#1A1A1A]"
                      } mt-2`}
                    >
                      PKR {pkg.price}
                      <span className="text-lg font-normal">
                        /{t("perHead")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="flex-1 p-6">
                  <p className="text-sm text-[#6B7280] mb-4 font-medium">
                    {t("includes")}:
                  </p>
                  <ul className="space-y-3">
                    {pkg.features.map((feature, index) => (
                      <motion.li
                        key={feature}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 * index }}
                        className="flex items-start gap-3"
                      >
                        <span
                          className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                            pkg.popular
                              ? "bg-[#D4AF37]/20"
                              : "bg-[#1A1A1A]/10"
                          }`}
                        >
                          <Check
                            size={12}
                            className={
                              pkg.popular ? "text-[#D4AF37]" : "text-[#1A1A1A]"
                            }
                          />
                        </span>
                        <span className="text-[#4A4A4A] text-sm">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <div className="p-6 pt-0">
                  <Link href="/book-now" className="block">
                    <Button
                      variant={pkg.popular ? "gold" : "secondary"}
                      fullWidth
                      className="justify-center"
                    >
                      {t("customQuote")}
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View all link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link
            href="/packages"
            className="inline-flex items-center gap-2 text-[#D4AF37] font-medium hover:text-[#B8962E] transition-colors group"
          >
            {tHome("viewAll")}
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform rtl:rotate-180"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
