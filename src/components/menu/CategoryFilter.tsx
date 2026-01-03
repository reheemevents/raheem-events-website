"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  name: { en: string; ur: string };
  slug: string;
  itemCount: number;
}

interface CategoryFilterProps {
  categories: Category[];
  locale: string;
  showAll?: boolean;
}

export default function CategoryFilter({
  categories,
  locale,
  showAll = true,
}: CategoryFilterProps) {
  const pathname = usePathname();

  const isActive = (slug: string) => {
    if (slug === "all") {
      return pathname === `/${locale}/menu` || pathname === "/menu";
    }
    return pathname.includes(`/menu/${slug}`);
  };

  return (
    <div className="relative">
      {/* Scrollable container for mobile */}
      <div className="overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 scrollbar-hide">
        <div className="flex gap-2 md:flex-wrap md:justify-center min-w-max md:min-w-0">
          {/* All items button */}
          {showAll && (
            <Link href="/menu">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "px-4 py-2.5 rounded-sm font-medium text-sm whitespace-nowrap transition-all duration-300",
                  isActive("all")
                    ? "bg-[#1A1A1A] text-white shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
                    : "bg-white text-[#6B7280] border border-[#E5E5E5] hover:border-[#D4AF37] hover:text-[#D4AF37]"
                )}
              >
                {locale === "ur" ? "سب" : "All"}
              </motion.button>
            </Link>
          )}

          {/* Category buttons */}
          {categories.map((category) => (
            <Link key={category.id} href={`/menu/${category.slug}`}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "px-4 py-2.5 rounded-sm font-medium text-sm whitespace-nowrap transition-all duration-300",
                  isActive(category.slug)
                    ? "bg-[#1A1A1A] text-white shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
                    : "bg-white text-[#6B7280] border border-[#E5E5E5] hover:border-[#D4AF37] hover:text-[#D4AF37]"
                )}
              >
                {locale === "ur" ? category.name.ur : category.name.en}
                <span
                  className={cn(
                    "ml-1.5 text-xs",
                    isActive(category.slug)
                      ? "text-white/60"
                      : "text-[#9CA3AF]"
                  )}
                >
                  ({category.itemCount})
                </span>
              </motion.button>
            </Link>
          ))}
        </div>
      </div>

      {/* Fade edges on mobile */}
      <div className="absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-[#FAFAFA] to-transparent pointer-events-none md:hidden" />
      <div className="absolute top-0 right-0 w-8 h-full bg-gradient-to-l from-[#FAFAFA] to-transparent pointer-events-none md:hidden" />
    </div>
  );
}
