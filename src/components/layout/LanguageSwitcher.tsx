"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const newLocale = locale === "en" ? "ur" : "en";
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleLocale}
      className="relative flex items-center gap-1 px-3 py-1.5 rounded-sm border border-[#E5E5E5] hover:border-[#D4AF37] transition-colors group"
      aria-label="Switch language"
    >
      {/* Active indicator */}
      <motion.div
        className="absolute inset-0 bg-[#F8F8F8] rounded-sm opacity-0 group-hover:opacity-100 transition-opacity"
        layoutId="langBg"
      />

      <div className="relative flex items-center gap-1.5">
        {/* English */}
        <span
          className={cn(
            "text-xs font-medium transition-colors",
            locale === "en" ? "text-[#DA291C]" : "text-[#9CA3AF]"
          )}
        >
          EN
        </span>

        {/* Separator */}
        <span className="text-[#D4AF37] text-xs">/</span>

        {/* Urdu */}
        <span
          className={cn(
            "text-xs font-medium transition-colors font-urdu",
            locale === "ur" ? "text-[#DA291C]" : "text-[#9CA3AF]"
          )}
        >
          اردو
        </span>
      </div>

      {/* Underline indicator */}
      <motion.div
        className="absolute -bottom-px left-1/2 h-[2px] bg-[#D4AF37]"
        initial={false}
        animate={{
          x: locale === "en" ? "-75%" : "25%",
          width: locale === "en" ? "20px" : "24px",
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </motion.button>
  );
}
