"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  align?: "left" | "center";
  titleSize?: "default" | "large" | "xlarge";
  className?: string;
  decorationStyle?: "line" | "diamond" | "minimal" | "none";
  titleClassName?: string;
  dark?: boolean;
}

export function SectionHeading({
  title,
  subtitle,
  eyebrow,
  align = "center",
  titleSize = "default",
  decorationStyle = "line",
  className,
  titleClassName,
  dark = false,
}: SectionHeadingProps) {
  // Split title to style last word in italic gold
  const words = title.split(" ");
  const hasMultipleWords = words.length > 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "mb-16 md:mb-20",
        align === "center" && "text-center",
        className
      )}
    >
      {/* Eyebrow text */}
      {eyebrow && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={cn(
            "text-label mb-4 inline-block",
            dark ? "text-[#D4AF37]" : "text-[#D4AF37]"
          )}
        >
          {eyebrow}
        </motion.span>
      )}

      {/* Title */}
      <div
        className={cn(
          "relative",
          align === "center" && "mx-auto"
        )}
      >
        <h2
          className={cn(
            "font-heading tracking-tight",
            dark ? "text-white" : "text-[#1A1A1A]",
            titleSize === "default" && "text-3xl md:text-4xl lg:text-5xl",
            titleSize === "large" && "text-4xl md:text-5xl lg:text-6xl",
            titleSize === "xlarge" && "text-5xl md:text-6xl lg:text-7xl",
            titleClassName
          )}
        >
          {hasMultipleWords ? (
            <>
              {words.slice(0, -1).join(" ")}{" "}
              <span className="heading-italic text-[#D4AF37]">
                {words[words.length - 1]}
              </span>
            </>
          ) : (
            title
          )}
        </h2>

        {/* Decoration line */}
        {decorationStyle === "line" && (
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={cn(
              "mt-6 h-px bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent",
              "origin-center",
              align === "center" ? "w-32 mx-auto" : "w-24"
            )}
          />
        )}

        {/* Diamond decoration */}
        {decorationStyle === "diamond" && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={cn(
              "mt-6 flex items-center gap-4",
              align === "center" && "justify-center"
            )}
          >
            <span className="w-12 h-px bg-[#D4AF37]" />
            <span className="w-2 h-2 rotate-45 bg-[#D4AF37]" />
            <span className="w-12 h-px bg-[#D4AF37]" />
          </motion.div>
        )}

        {/* Minimal decoration */}
        {decorationStyle === "minimal" && (
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "3rem" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={cn(
              "mt-4 h-0.5 bg-[#D4AF37]",
              align === "center" && "mx-auto"
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
          transition={{ duration: 0.8, delay: 0.4 }}
          className={cn(
            "mt-6 text-lg md:text-xl max-w-2xl leading-relaxed",
            dark ? "text-white/70" : "text-[#6B7280]",
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
  dark = false,
}: {
  title: string;
  subtitle?: string;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div className={cn("mb-8", className)}>
      <h3 className={cn(
        "font-heading text-xl md:text-2xl lg:text-3xl tracking-tight",
        dark ? "text-white" : "text-[#1A1A1A]"
      )}>
        {title}
      </h3>
      {subtitle && (
        <p className={cn(
          "mt-2 text-base",
          dark ? "text-white/60" : "text-[#6B7280]"
        )}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

// Page hero heading with larger styling
export function PageHeading({
  title,
  subtitle,
  eyebrow,
  className,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  className?: string;
}) {
  const words = title.split(" ");
  const hasMultipleWords = words.length > 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className={cn("text-center py-20 md:py-28", className)}
    >
      {/* Eyebrow */}
      {eyebrow && (
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-label text-[#D4AF37] mb-6 inline-block"
        >
          {eyebrow}
        </motion.span>
      )}

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-[#1A1A1A] tracking-tight"
      >
        {hasMultipleWords ? (
          <>
            {words.slice(0, -1).join(" ")}{" "}
            <span className="heading-italic text-[#D4AF37]">
              {words[words.length - 1]}
            </span>
          </>
        ) : (
          title
        )}
      </motion.h1>

      {/* Decorative element */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-8 mx-auto flex items-center justify-center gap-4"
      >
        <span className="w-16 h-px bg-gradient-to-r from-transparent to-[#D4AF37]" />
        <span className="w-2.5 h-2.5 rotate-45 border border-[#D4AF37]" />
        <span className="w-16 h-px bg-gradient-to-l from-transparent to-[#D4AF37]" />
      </motion.div>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-8 text-[#6B7280] text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}

export default SectionHeading;
