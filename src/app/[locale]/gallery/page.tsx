"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import { PageHeading } from "@/components/ui/SectionHeading";
import { X, ChevronLeft, ChevronRight, Maximize2, Play } from "lucide-react";

// Gallery media (images and videos) - Real venue photos and videos
const galleryMedia = [
  // Israr Hall category - Images
  {
    id: 5,
    type: "image",
    src: "/images/gallery/israr-marriage-hall/images/israr-hall-1.jpeg",
    category: "israr",
    title: { en: "Israr Marriage Hall", ur: "اصرار میرج ہال" },
  },
  {
    id: 6,
    type: "image",
    src: "/images/gallery/israr-marriage-hall/images/israr-hall-2.jpeg",
    category: "israr",
    title: { en: "Israr Hall Interior", ur: "اصرار ہال کا اندرونی حصہ" },
  },
  {
    id: 7,
    type: "image",
    src: "/images/gallery/israr-marriage-hall/images/israr-hall-3.jpeg",
    category: "israr",
    title: { en: "Israr Hall Setup", ur: "اصرار ہال سیٹ اپ" },
  },
  {
    id: 8,
    type: "image",
    src: "/images/gallery/israr-marriage-hall/images/israr-hall-4.jpeg",
    category: "israr",
    title: { en: "Israr Hall Decor", ur: "اصرار ہال سجاوٹ" },
  },
  // Israr Hall category - Videos
  {
    id: 9,
    type: "video",
    src: "/images/gallery/israr-marriage-hall/videos/israr-hall-video-1.mp4",
    category: "israr",
    title: { en: "Israr Hall Video Tour", ur: "اصرار ہال ویڈیو ٹور" },
  },
  {
    id: 10,
    type: "video",
    src: "/images/gallery/israr-marriage-hall/videos/israr-hall-video-2.mp4",
    category: "israr",
    title: { en: "Israr Hall Event Setup", ur: "اصرار ہال ایونٹ سیٹ اپ" },
  },
  {
    id: 11,
    type: "video",
    src: "/images/gallery/israr-marriage-hall/videos/israr-hall-video-3.mp4",
    category: "israr",
    title: { en: "Israr Hall Facilities", ur: "اصرار ہال سہولیات" },
  },
  {
    id: 12,
    type: "video",
    src: "/images/gallery/israr-marriage-hall/videos/israr-hall-video-4.mp4",
    category: "israr",
    title: { en: "Israr Hall Walkthrough", ur: "اصرار ہال واک تھرو" },
  },
  {
    id: 13,
    type: "video",
    src: "/images/gallery/israr-marriage-hall/videos/israr-hall-video-5.mp4",
    category: "israr",
    title: { en: "Israr Hall Complete View", ur: "اصرار ہال مکمل منظر" },
  },
];

const categories = [
  { id: "all", label: { en: "All", ur: "سب" } },
  { id: "israr", label: { en: "Israr Hall", ur: "اصرار ہال" } },
];

export default function GalleryPage() {
  const t = useTranslations("gallery");
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filteredMedia =
    activeCategory === "all"
      ? galleryMedia
      : galleryMedia.filter((item) => item.category === activeCategory);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "unset";
  };

  const nextMedia = () => {
    setCurrentImageIndex((prev) => (prev + 1) % filteredMedia.length);
  };

  const prevMedia = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + filteredMedia.length) % filteredMedia.length
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
                {filteredMedia.map((item, index) => (
                  <motion.div
                    key={item.id}
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

                    {/* Media content - Image or Video */}
                    {item.type === "image" ? (
                      <Image
                        src={item.src}
                        alt={item.title.en}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    ) : (
                      <>
                        <video
                          src={item.src}
                          className="absolute inset-0 w-full h-full object-cover"
                          muted
                          playsInline
                        />
                        {/* Play button overlay for videos */}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-10">
                          <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center transition-transform group-hover:scale-110">
                            <Play size={24} className="text-[#1A1A1A] ml-1" fill="currentColor" />
                          </div>
                        </div>
                      </>
                    )}

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />

                    {/* Gold border on hover */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#D4AF37] transition-colors duration-300 rounded-sm z-30" />

                    {/* Corner accents */}
                    <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-40" />
                    <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-40" />

                    {/* Hover content - only for images */}
                    {item.type === "image" && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
                        <div className="w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center mb-3">
                          <Maximize2 size={20} className="text-[#1A1A1A]" />
                        </div>
                      </div>
                    )}
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
                onClick={prevMedia}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-50"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextMedia}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-50"
              >
                <ChevronRight size={24} />
              </button>

              {/* Media content - Image or Video */}
              <motion.div
                key={currentImageIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative w-full max-w-5xl aspect-video mx-4"
              >
                {filteredMedia[currentImageIndex]?.type === "image" ? (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-[#2D2D2D] to-[#1A1A1A] rounded-sm" />
                    <Image
                      src={filteredMedia[currentImageIndex]?.src || ""}
                      alt={filteredMedia[currentImageIndex]?.title.en || "Gallery image"}
                      fill
                      className="object-contain rounded-sm"
                      sizes="(max-width: 1280px) 100vw, 1280px"
                    />
                  </>
                ) : (
                  <video
                    src={filteredMedia[currentImageIndex]?.src || ""}
                    className="w-full h-full object-contain rounded-sm"
                    controls
                    autoPlay
                    playsInline
                  />
                )}
                {/* Media title */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-sm pointer-events-none">
                  <p className="text-white text-lg font-medium text-center">
                    {filteredMedia[currentImageIndex]?.title.en}
                  </p>
                </div>
              </motion.div>

              {/* Media counter */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm">
                {currentImageIndex + 1} / {filteredMedia.length}
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
