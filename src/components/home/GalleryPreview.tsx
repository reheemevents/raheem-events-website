"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Maximize2 } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

// Gallery images - Pakistani wedding venues, catering, and decor
const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&q=80",
    alt: "Wedding stage setup",
    category: "wedding",
    span: "col-span-2 row-span-2",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600&q=80",
    alt: "Stage decoration",
    category: "decor",
    span: "col-span-1 row-span-1",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80",
    alt: "Biryani presentation",
    category: "catering",
    span: "col-span-1 row-span-1",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&q=80",
    alt: "Venue interior",
    category: "venue",
    span: "col-span-1 row-span-2",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80",
    alt: "Wedding reception hall",
    category: "wedding",
    span: "col-span-1 row-span-1",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=80",
    alt: "Floral arrangements",
    category: "decor",
    span: "col-span-1 row-span-1",
  },
];

export default function GalleryPreview() {
  const t = useTranslations("home.gallery");

  return (
    <section className="relative py-24 md:py-32 bg-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 border-t border-r border-[#E5E5E5]" />
      <div className="absolute bottom-0 left-0 w-64 h-64 border-b border-l border-[#E5E5E5]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={t("title")}
          subtitle={t("subtitle")}
          align="center"
        />

        {/* Gallery grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]"
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative group cursor-pointer overflow-hidden rounded-sm ${image.span}`}
            >
              {/* Background placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#2D2D2D] to-[#1A1A1A]" />

              {/* Actual image */}
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 25vw"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Gold border on hover */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#D4AF37] transition-colors duration-500 rounded-sm" />

              {/* Corner accents */}
              <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Content on hover */}
              <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <motion.div
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1.1 }}
                  className="w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center mb-3"
                >
                  <Maximize2 size={20} className="text-[#1A1A1A]" />
                </motion.div>
                <span className="text-white text-sm font-medium capitalize">
                  {image.category}
                </span>
              </div>

              {/* Scale effect */}
              <div className="absolute inset-0 transform group-hover:scale-110 transition-transform duration-700" />
            </motion.div>
          ))}
        </motion.div>

        {/* View all button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link href="/gallery">
            <Button
              variant="outline"
              rightIcon={<ArrowRight size={18} className="rtl:rotate-180" />}
            >
              {t("viewAll")}
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
