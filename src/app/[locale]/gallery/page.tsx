"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import { PageHeading } from "@/components/ui/SectionHeading";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

// Gallery images organized by category - Pakistani wedding venues, catering, and decor
const galleryImages = [
  // Wedding category
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=600&q=80",
    category: "wedding",
    title: { en: "Wedding Stage Setup", ur: "شادی کا اسٹیج سیٹ اپ" },
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=600&q=80",
    category: "wedding",
    title: { en: "Grand Reception Hall", ur: "عظیم الشان استقبالیہ ہال" },
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&q=80",
    category: "wedding",
    title: { en: "Wedding Celebration", ur: "شادی کی تقریب" },
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&q=80",
    category: "wedding",
    title: { en: "Bride & Groom Stage", ur: "دلہا دلہن کا اسٹیج" },
  },
  // Israr Hall category
  {
    id: 5,
    src: "/images/gallery/israr-marriage-hall/images/israr-hall-1.jpeg",
    category: "israr",
    title: { en: "Israr Marriage Hall", ur: "اصرار میرج ہال" },
  },
  {
    id: 6,
    src: "/images/gallery/israr-marriage-hall/images/israr-hall-2.jpeg",
    category: "israr",
    title: { en: "Israr Hall Interior", ur: "اصرار ہال کا اندرونی حصہ" },
  },
  {
    id: 7,
    src: "/images/gallery/israr-marriage-hall/images/israr-hall-3.jpeg",
    category: "israr",
    title: { en: "Israr Hall Setup", ur: "اصرار ہال سیٹ اپ" },
  },
  {
    id: 8,
    src: "/images/gallery/israr-marriage-hall/images/israr-hall-4.jpeg",
    category: "israr",
    title: { en: "Israr Hall Decor", ur: "اصرار ہال سجاوٹ" },
  },
  // Mumtaz Hall category
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=600&q=80",
    category: "mumtaz",
    title: { en: "Mumtaz Hall Setup", ur: "ممتاز ہال سیٹ اپ" },
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=600&q=80",
    category: "mumtaz",
    title: { en: "Mumtaz Hall Decoration", ur: "ممتاز ہال سجاوٹ" },
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1510076857177-7470076d4098?w=600&q=80",
    category: "mumtaz",
    title: { en: "Mumtaz Hall Lighting", ur: "ممتاز ہال لائٹنگ" },
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    category: "mumtaz",
    title: { en: "Mumtaz Hall Stage", ur: "ممتاز ہال اسٹیج" },
  },
  // Catering category - Pakistani food
  {
    id: 13,
    src: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&q=80",
    category: "catering",
    title: { en: "Biryani Presentation", ur: "بریانی پریزنٹیشن" },
  },
  {
    id: 14,
    src: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&q=80",
    category: "catering",
    title: { en: "BBQ Station", ur: "بی بی کیو سٹیشن" },
  },
  {
    id: 15,
    src: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=600&q=80",
    category: "catering",
    title: { en: "Dessert Display", ur: "میٹھے کی سجاوٹ" },
  },
  {
    id: 16,
    src: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80",
    category: "catering",
    title: { en: "Chicken Karahi", ur: "چکن کڑاہی" },
  },
  {
    id: 17,
    src: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=600&q=80",
    category: "catering",
    title: { en: "Seekh Kebab", ur: "سیخ کباب" },
  },
  {
    id: 18,
    src: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600&q=80",
    category: "catering",
    title: { en: "Mutton Qorma", ur: "مٹن قورمہ" },
  },
  {
    id: 19,
    src: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&q=80",
    category: "catering",
    title: { en: "Naan & Roti", ur: "نان اور روٹی" },
  },
  {
    id: 20,
    src: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=600&q=80",
    category: "catering",
    title: { en: "Gulab Jamun", ur: "گلاب جامن" },
  },
  // Decor category
  {
    id: 21,
    src: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600&q=80",
    category: "decor",
    title: { en: "Stage Decoration", ur: "اسٹیج سجاوٹ" },
  },
  {
    id: 22,
    src: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&q=80",
    category: "decor",
    title: { en: "Floral Arrangements", ur: "پھولوں کی سجاوٹ" },
  },
  {
    id: 23,
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80",
    category: "decor",
    title: { en: "Table Centerpiece", ur: "میز کی سجاوٹ" },
  },
  {
    id: 24,
    src: "https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?w=600&q=80",
    category: "decor",
    title: { en: "Wedding Lighting", ur: "شادی کی لائٹنگ" },
  },
];

const categories = [
  { id: "all", label: { en: "All", ur: "سب" } },
  { id: "wedding", label: { en: "Weddings", ur: "شادیاں" } },
  { id: "israr", label: { en: "Israr Hall", ur: "اصرار ہال" } },
  { id: "mumtaz", label: { en: "Mumtaz Hall", ur: "ممتاز ہال" } },
  { id: "catering", label: { en: "Catering", ur: "کیٹرنگ" } },
  { id: "decor", label: { en: "Decor", ur: "سجاوٹ" } },
];

export default function GalleryPage() {
  const t = useTranslations("gallery");
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filteredImages =
    activeCategory === "all"
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "unset";
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + filteredImages.length) % filteredImages.length
    );
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAFAFA]">
        {/* Hero section */}
        <section className="relative bg-[#1A1A1A] pt-32 pb-16">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <PageHeading
              title={t("title")}
              subtitle={t("subtitle")}
              className="[&_h1]:text-white [&_p]:text-white/70"
            />
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
        </section>

        {/* Gallery content */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Category filter */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-6 py-2.5 rounded-sm font-medium text-sm transition-all duration-300 ${
                    activeCategory === category.id
                      ? "bg-[#1A1A1A] text-white shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
                      : "bg-white text-[#6B7280] border border-[#E5E5E5] hover:border-[#D4AF37] hover:text-[#D4AF37]"
                  }`}
                >
                  {t(`filters.${category.id}`)}
                </motion.button>
              ))}
            </div>

            {/* Gallery grid */}
            <motion.div
              layout
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              <AnimatePresence mode="popLayout">
                {filteredImages.map((image, index) => (
                  <motion.div
                    key={image.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="relative aspect-square group cursor-pointer overflow-hidden rounded-sm"
                    onClick={() => openLightbox(index)}
                  >
                    {/* Background placeholder */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#2D2D2D] to-[#1A1A1A]" />

                    {/* Actual image */}
                    <Image
                      src={image.src}
                      alt={image.title.en}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                    {/* Gold border on hover */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#D4AF37] transition-colors duration-300 rounded-sm z-20" />

                    {/* Corner accents */}
                    <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />
                    <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />

                    {/* Hover content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
                      <div className="w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center mb-3">
                        <Maximize2 size={20} className="text-[#1A1A1A]" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            >
              {/* Close button */}
              <button
                onClick={closeLightbox}
                className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-50"
              >
                <X size={24} />
              </button>

              {/* Navigation arrows */}
              <button
                onClick={prevImage}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-50"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-50"
              >
                <ChevronRight size={24} />
              </button>

              {/* Image */}
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative w-full max-w-5xl aspect-video mx-4"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#2D2D2D] to-[#1A1A1A] rounded-sm" />
                <Image
                  src={filteredImages[currentImageIndex]?.src || ""}
                  alt={filteredImages[currentImageIndex]?.title.en || "Gallery image"}
                  fill
                  className="object-contain rounded-sm"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                />
                {/* Image title */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-sm">
                  <p className="text-white text-lg font-medium text-center">
                    {filteredImages[currentImageIndex]?.title.en}
                  </p>
                </div>
              </motion.div>

              {/* Image counter */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm">
                {currentImageIndex + 1} / {filteredImages.length}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
