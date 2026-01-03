"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { PopularBadge } from "@/components/ui/Badge";

interface MenuItemCardProps {
  id: string;
  name: { en: string; ur: string };
  category: string;
  image: string;
  isPopular?: boolean;
  locale: string;
}

export default function MenuItemCard({
  id,
  name,
  category,
  image,
  isPopular,
  locale,
}: MenuItemCardProps) {
  const displayName = locale === "ur" ? name.ur : name.en;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
      className="group"
    >
      <Link href={`/menu/${category}/${id}`} className="block">
        <div className="relative bg-white rounded-sm overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.15)] hover:-translate-y-2 transition-all duration-300 ease-out will-change-transform">
          {/* Gold border on hover */}
          <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#D4AF37] transition-colors duration-200 rounded-sm z-10 pointer-events-none" />

          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10" />

          {/* Image container */}
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={image}
              alt={displayName}
              fill
              className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

            {/* Popular badge */}
            {isPopular && (
              <div className="absolute top-3 right-3 z-10">
                <PopularBadge />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4">
            <h3 className="font-heading text-lg font-semibold text-[#1A1A1A] group-hover:text-[#DA291C] transition-colors duration-200 line-clamp-1">
              {displayName}
            </h3>
            {locale === "en" && name.ur && (
              <p className="text-sm text-[#6B7280] mt-1 font-urdu">{name.ur}</p>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
