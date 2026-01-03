"use client";

import { motion } from "framer-motion";
import MenuItemCard from "./MenuItemCard";

interface MenuItem {
  id: string;
  name: { en: string; ur: string };
  category: string;
  image: string;
  isPopular?: boolean;
}

interface MenuGridProps {
  items: MenuItem[];
  locale: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

export default function MenuGrid({ items, locale }: MenuGridProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-[#6B7280] text-lg">
          {locale === "ur" ? "کوئی آئٹمز نہیں ملے" : "No items found"}
        </p>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
    >
      {items.map((item) => (
        <MenuItemCard
          key={item.id}
          id={item.id}
          name={item.name}
          category={item.category}
          image={item.image}
          isPopular={item.isPopular}
          locale={locale}
        />
      ))}
    </motion.div>
  );
}
