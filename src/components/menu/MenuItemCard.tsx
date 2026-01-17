"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

interface MenuItemCardProps {
  id: string;
  name: { en: string; ur: string };
  category: string;
  image: string;
  isPopular?: boolean;
}

export default function MenuItemCard({
  id,
  name,
  category,
  image,
  isPopular,
}: MenuItemCardProps) {
  const displayName = name.en;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
      className="group"
    >
      <Link href={`/menu/${category}/${id}`} className="block">
        <div className="relative bg-white rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 ease-out">
          {/* Image container - clean, no overlay */}
          <div className="relative aspect-square overflow-hidden rounded-t-2xl">
            <Image
              src={image}
              alt={displayName}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />

            {/* Popular badge */}
            {isPopular && (
              <div className="absolute top-3 left-3 z-10">
                <div className="flex items-center gap-1 px-2.5 py-1.5 bg-[#D4AF37] text-white text-[10px] font-semibold uppercase tracking-wide rounded-full shadow-md">
                  <Star size={10} className="fill-current" />
                  <span>Popular</span>
                </div>
              </div>
            )}
          </div>

          {/* Content section - below image with fixed height for consistency */}
          <div className="p-3 md:p-4 bg-white h-[70px] sm:h-[80px] md:h-[90px] flex flex-col justify-center">
            {/* Gold accent line */}
            <div className="w-6 sm:w-8 h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#D4AF37]/40 mb-1.5 sm:mb-2 group-hover:w-10 sm:group-hover:w-12 transition-all duration-300" />

            <span className="block text-[14px] sm:text-[16px] md:text-[18px] font-semibold text-[#1A1A1A] group-hover:text-[#DA291C] transition-colors duration-200 truncate leading-snug">
              {displayName}
            </span>

            {name.ur && (
              <p className="text-[11px] sm:text-[12px] text-[#8B7355] mt-0.5 font-urdu leading-relaxed pb-1 overflow-hidden">{name.ur}</p>
            )}
          </div>

          {/* Subtle border on hover */}
          <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#D4AF37]/30 transition-colors duration-300 pointer-events-none" />
        </div>
      </Link>
    </motion.div>
  );
}
