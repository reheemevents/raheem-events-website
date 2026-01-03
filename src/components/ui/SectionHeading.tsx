"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  titleSize?: "default" | "large";
  className?: string;
  decorationStyle?: "underline" | "sides" | "none";
}

export function SectionHeading({
  title,
  subtitle,
  align = "center",
  titleSize = "default",
  decorationStyle = "underline",
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "mb-12",
        align === "center" && "text-center",
        className
      )}
    >
      {/* Title with decoration */}
      <div
        className={cn(
          "relative inline-block",
          align === "center" && "mx-auto"
        )}
      >
        {/* Side decorations */}
        {decorationStyle === "sides" && (
          <>
            <span className="absolute top-1/2 -translate-y-1/2 ltr:-left-16 rtl:-right-16 w-12 h-px bg-gradient-to-r rtl:bg-gradient-to-l from-transparent to-[#D4AF37]" />
            <span className="absolute top-1/2 -translate-y-1/2 ltr:-right-16 rtl:-left-16 w-12 h-px bg-gradient-to-l rtl:bg-gradient-to-r from-transparent to-[#D4AF37]" />
          </>
        )}

        <h2
          className={cn(
            "font-heading font-semibold text-[#1A1A1A] tracking-tight",
            titleSize === "default" ? "text-3xl md:text-4xl" : "text-4xl md:text-5xl lg:text-6xl"
          )}
        >
          {title}
        </h2>

        {/* Underline decoration */}
        {decorationStyle === "underline" && (
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className={cn(
              "mt-4 h-1 bg-gradient-to-r from-[#D4AF37] via-[#E5C453] to-[#D4AF37]",
              "origin-left rtl:origin-right",
              align === "center" ? "w-24 mx-auto" : "w-20"
            )}
          />
        )}
      </div>

      {/* Subtitle */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={cn(
            "mt-4 text-[#6B7280] text-lg max-w-2xl leading-relaxed",
            align === "center" && "mx-auto"
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}

// Smaller variant for sub-sections
export function SubsectionHeading({
  title,
  subtitle,
  className,
}: {
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-6", className)}>
      <h3 className="font-heading text-xl md:text-2xl font-semibold text-[#1A1A1A] tracking-tight">
        {title}
      </h3>
      {subtitle && (
        <p className="mt-1 text-[#6B7280] text-sm">{subtitle}</p>
      )}
    </div>
  );
}

// Page hero heading with larger styling
export function PageHeading({
  title,
  subtitle,
  className,
}: {
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={cn("text-center py-16 md:py-24", className)}
    >
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1A1A] tracking-tight"
      >
        {title}
      </motion.h1>

      {/* Decorative line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-6 mx-auto flex items-center justify-center gap-3"
      >
        <span className="w-12 h-px bg-[#D4AF37]" />
        <span className="w-2 h-2 rotate-45 border border-[#D4AF37]" />
        <span className="w-12 h-px bg-[#D4AF37]" />
      </motion.div>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 text-[#6B7280] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}

export default SectionHeading;
