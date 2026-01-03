"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, UtensilsCrossed } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

// Featured categories with images from actual menu
const categories = [
  {
    id: "rice",
    image: "/images/menu/raheem_food_images/Rice/025_Chicken Biryani.webp",
    items: 18,
  },
  {
    id: "bbq",
    image: "/images/menu/raheem_food_images/BBQ/047_Chicken Tikka.webp",
    items: 15,
  },
  {
    id: "qorma-curry",
    image: "/images/menu/raheem_food_images/Qorma - Curry/043_Chicken Qorma Daig.webp",
    items: 15,
  },
  {
    id: "dessert",
    image: "/images/menu/raheem_food_images/Dessert/065_Garam Gulab Jaman.webp",
    items: 19,
  },
  {
    id: "tandoor",
    image: "/images/menu/raheem_food_images/Tandoor/108_Plain Naan.webp",
    items: 11,
  },
  {
    id: "street-food",
    image: "/images/menu/raheem_food_images/Street Food/117_Samosa.webp",
    items: 8,
  },
];

// Featured food items from actual menu
const featuredItems = [
  {
    id: "chicken-biryani",
    name: { en: "Chicken Biryani", ur: "چکن بریانی" },
    category: "rice",
    image: "/images/menu/raheem_food_images/Rice/025_Chicken Biryani.webp",
    isPopular: true,
  },
  {
    id: "chicken-tikka",
    name: { en: "Chicken Tikka", ur: "چکن ٹکہ" },
    category: "bbq",
    image: "/images/menu/raheem_food_images/BBQ/047_Chicken Tikka.webp",
    isPopular: true,
  },
  {
    id: "mutton-qorma",
    name: { en: "Mutton Qorma", ur: "مٹن قورمہ" },
    category: "qorma-curry",
    image: "/images/menu/raheem_food_images/Qorma - Curry/098_Mutton Qorma Daig.webp",
    isPopular: true,
  },
  {
    id: "garam-gulab-jaman",
    name: { en: "Garam Gulab Jaman", ur: "گرم گلاب جامن" },
    category: "dessert",
    image: "/images/menu/raheem_food_images/Dessert/065_Garam Gulab Jaman.webp",
    isPopular: true,
  },
];

export default function FoodMenuShowcase() {
  const t = useTranslations("home.menu");

  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-b from-white to-[#FAFAFA] overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-[0.02]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4AF37' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title={t("title")}
          subtitle={t("subtitle")}
          align="center"
        />

        {/* Categories Grid */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Link href={`/menu/${category.id}`} className="block group">
                <div className="relative aspect-square rounded-sm overflow-hidden">
                  {/* Image */}
                  <Image
                    src={category.image}
                    alt={t(`categories.${category.id}`)}
                    fill
                    className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  {/* Gold border on hover */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#D4AF37] transition-colors duration-200 rounded-sm" />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-end p-4 text-center">
                    <h3 className="font-heading text-white font-semibold text-sm sm:text-base mb-1">
                      {t(`categories.${category.id}`)}
                    </h3>
                    <span className="text-[#D4AF37] text-xs">
                      {category.items} {t("items")}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Featured Items */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#DA291C]/10 flex items-center justify-center">
                <UtensilsCrossed size={20} className="text-[#DA291C]" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-[#1A1A1A]">
                {t("popular")}
              </h3>
            </div>
            <Link href="/menu" className="hidden sm:block">
              <Button
                variant="ghost"
                size="sm"
                rightIcon={<ArrowRight size={16} className="rtl:rotate-180" />}
              >
                {t("viewAll")}
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {featuredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group"
              >
                <Link href={`/menu/${item.category}/${item.id}`} className="block">
                  <div className="relative bg-white rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 ease-out">
                    {/* Image */}
                    <div className="relative aspect-square overflow-hidden rounded-t-2xl">
                      <Image
                        src={item.image}
                        alt={item.name.en}
                        fill
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        sizes="(max-width: 640px) 50vw, 25vw"
                      />

                      {/* Popular badge */}
                      {item.isPopular && (
                        <div className="absolute top-3 left-3 z-10">
                          <div className="flex items-center gap-1 px-2.5 py-1.5 bg-[#D4AF37] text-white text-[10px] font-semibold uppercase tracking-wide rounded-full shadow-md">
                            Popular
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Content - matching MenuItemCard design */}
                    <div className="p-3 md:p-4 bg-white h-[70px] sm:h-[80px] md:h-[90px] flex flex-col justify-center">
                      {/* Gold accent line */}
                      <div className="w-6 sm:w-8 h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#D4AF37]/40 mb-1.5 sm:mb-2 group-hover:w-10 sm:group-hover:w-12 transition-all duration-300" />

                      <span className="block text-[14px] sm:text-[16px] md:text-[18px] font-semibold text-[#1A1A1A] group-hover:text-[#DA291C] transition-colors duration-200 truncate leading-snug">
                        {item.name.en}
                      </span>
                      <p className="text-[11px] sm:text-[12px] text-[#8B7355] mt-0.5 font-urdu truncate">
                        {item.name.ur}
                      </p>
                    </div>

                    {/* Subtle border on hover */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#D4AF37]/30 transition-colors duration-300 pointer-events-none" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Mobile view all button */}
          <div className="mt-8 text-center sm:hidden">
            <Link href="/menu">
              <Button
                variant="outline"
                rightIcon={<ArrowRight size={16} className="rtl:rotate-180" />}
              >
                {t("viewAll")}
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 p-6 bg-[#1A1A1A] rounded-sm"
        >
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 text-center">
            <div>
              <div className="font-heading text-3xl font-bold text-[#D4AF37]">107+</div>
              <div className="text-white/70 text-sm mt-1">{t("stats.dishes")}</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-white/20" />
            <div>
              <div className="font-heading text-3xl font-bold text-[#D4AF37]">14</div>
              <div className="text-white/70 text-sm mt-1">{t("stats.categories")}</div>
            </div>
            <div className="hidden sm:block w-px h-12 bg-white/20" />
            <div>
              <div className="font-heading text-3xl font-bold text-[#D4AF37]">100%</div>
              <div className="text-white/70 text-sm mt-1">{t("stats.halal")}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
