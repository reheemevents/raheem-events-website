"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import {
  Plus,
  Minus,
  X,
  Check,
  ChefHat,
  Users,
  MessageCircle,
  Trash2,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { CONTACT, WHATSAPP_MESSAGES } from "@/lib/constants";
import { getWhatsAppLink } from "@/lib/utils";

interface MenuItem {
  id: string;
  name: { en: string; ur: string };
  category: string;
  image: string;
  isPopular?: boolean;
}

interface Category {
  id: string;
  name: { en: string; ur: string };
  slug: string;
  description: { en: string; ur: string };
  image: string;
  itemCount: number;
}

interface MenuBuilderProps {
  items: MenuItem[];
  categories: Category[];
}

export function MenuBuilder({ items, categories }: MenuBuilderProps) {
  const t = useTranslations("menuBuilder");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [guestCount, setGuestCount] = useState<number>(200);

  const filteredItems = useMemo(() => {
    if (selectedCategory === "all") return items;
    return items.filter((item) => item.category === selectedCategory);
  }, [items, selectedCategory]);

  const selectedItemsDetails = useMemo(() => {
    return items.filter((item) => selectedItems.has(item.id));
  }, [items, selectedItems]);

  const categoriesWithSelection = useMemo(() => {
    const counts: Record<string, number> = {};
    selectedItemsDetails.forEach((item) => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, [selectedItemsDetails]);

  const toggleItem = (itemId: string) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const clearAll = () => {
    setSelectedItems(new Set());
  };

  const generateWhatsAppMessage = () => {
    const categoryGroups: Record<string, string[]> = {};
    selectedItemsDetails.forEach((item) => {
      if (!categoryGroups[item.category]) {
        categoryGroups[item.category] = [];
      }
      categoryGroups[item.category].push(item.name.en);
    });

    let message = `Hi, I'd like to inquire about a custom menu for my event.\n\n`;
    message += `*Guest Count:* ${guestCount}\n\n`;
    message += `*Selected Menu Items (${selectedItems.size} items):*\n`;

    Object.entries(categoryGroups).forEach(([category, itemNames]) => {
      const categoryName = categories.find((c) => c.id === category)?.name.en || category;
      message += `\n_${categoryName}:_\n`;
      itemNames.forEach((name) => {
        message += `• ${name}\n`;
      });
    });

    message += `\nPlease provide a quote for this menu. Thank you!`;
    return message;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Panel - Category & Items Selection */}
      <div className="lg:col-span-2 space-y-6">
        {/* Guest Count */}
        <div className="bg-white rounded-sm border border-[#E5E5E5] p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
              <Users size={20} className="text-[#D4AF37]" />
            </div>
            <div>
              <h3 className="font-medium text-[#1A1A1A]">{t("guestCount")}</h3>
              <p className="text-sm text-[#6B7280]">How many guests are you expecting?</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setGuestCount(Math.max(50, guestCount - 50))}
              className="w-10 h-10 rounded-full border border-[#E5E5E5] flex items-center justify-center hover:border-[#DA291C] hover:text-[#DA291C] transition-colors"
            >
              <Minus size={18} />
            </button>
            <div className="flex-1 relative">
              <input
                type="range"
                min="50"
                max="1000"
                step="50"
                value={guestCount}
                onChange={(e) => setGuestCount(parseInt(e.target.value))}
                className="w-full h-2 bg-[#E5E5E5] rounded-full appearance-none cursor-pointer accent-[#DA291C]"
              />
              <div className="mt-2 flex justify-between text-xs text-[#9CA3AF]">
                <span>50</span>
                <span>500</span>
                <span>1000</span>
              </div>
            </div>
            <button
              onClick={() => setGuestCount(Math.min(1000, guestCount + 50))}
              className="w-10 h-10 rounded-full border border-[#E5E5E5] flex items-center justify-center hover:border-[#DA291C] hover:text-[#DA291C] transition-colors"
            >
              <Plus size={18} />
            </button>
            <div className="w-24 text-center">
              <span className="font-heading text-2xl font-bold text-[#1A1A1A]">{guestCount}</span>
              <p className="text-xs text-[#6B7280]">guests</p>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="bg-white rounded-sm border border-[#E5E5E5] p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <ChefHat size={18} className="text-[#D4AF37]" />
            <span className="font-medium text-[#1A1A1A]">{t("categories")}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <motion.button
              onClick={() => setSelectedCategory("all")}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                selectedCategory === "all"
                  ? "bg-[#DA291C] text-white shadow-lg shadow-[#DA291C]/20"
                  : "bg-[#F8F8F8] text-[#6B7280] hover:bg-[#DA291C]/10 hover:text-[#DA291C]"
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {t("allCategories")} ({items.length})
            </motion.button>

            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 relative",
                  selectedCategory === category.id
                    ? "bg-[#DA291C] text-white shadow-lg shadow-[#DA291C]/20"
                    : "bg-[#F8F8F8] text-[#6B7280] hover:bg-[#DA291C]/10 hover:text-[#DA291C]"
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {category.name.en}
                {categoriesWithSelection[category.id] && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#D4AF37] text-white text-xs rounded-full flex items-center justify-center">
                    {categoriesWithSelection[category.id]}
                  </span>
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="bg-white rounded-sm border border-[#E5E5E5] p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-medium text-[#1A1A1A]">
              {t("selectItems")} ({filteredItems.length} items)
            </h3>
            {selectedItems.size > 0 && (
              <span className="text-sm text-[#D4AF37] font-medium">
                {selectedItems.size} selected
              </span>
            )}
          </div>

          <motion.div
            layout
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => {
                const isSelected = selectedItems.has(item.id);
                return (
                  <motion.button
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    onClick={() => toggleItem(item.id)}
                    className={cn(
                      "relative group rounded-sm overflow-hidden transition-all duration-300",
                      "border-2",
                      isSelected
                        ? "border-[#DA291C] shadow-lg shadow-[#DA291C]/10"
                        : "border-transparent hover:border-[#D4AF37]/50"
                    )}
                  >
                    {/* Image */}
                    <div className="relative aspect-square bg-[#F8F8F8]">
                      <Image
                        src={item.image}
                        alt={item.name.en}
                        fill
                        className={cn(
                          "object-cover transition-all duration-300",
                          isSelected && "brightness-90"
                        )}
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />

                      {/* Popular badge */}
                      {item.isPopular && (
                        <div className="absolute top-1 left-1 px-2 py-0.5 bg-[#D4AF37] text-white text-[10px] font-medium uppercase tracking-wider">
                          Popular
                        </div>
                      )}

                      {/* Selection indicator */}
                      <div
                        className={cn(
                          "absolute top-1 right-1 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300",
                          isSelected
                            ? "bg-[#DA291C] text-white scale-100"
                            : "bg-white/80 text-[#6B7280] scale-0 group-hover:scale-100"
                        )}
                      >
                        {isSelected ? <Check size={14} /> : <Plus size={14} />}
                      </div>

                      {/* Overlay on select */}
                      {isSelected && (
                        <div className="absolute inset-0 bg-[#DA291C]/10" />
                      )}
                    </div>

                    {/* Item name */}
                    <div
                      className={cn(
                        "p-2 text-left transition-colors duration-300",
                        isSelected ? "bg-[#DA291C]/5" : "bg-white"
                      )}
                    >
                      <p className="text-xs font-medium text-[#1A1A1A] line-clamp-2">
                        {item.name.en}
                      </p>
                      <p className="text-[10px] text-[#9CA3AF] mt-0.5 font-urdu">
                        {item.name.ur}
                      </p>
                    </div>
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Right Panel - Selected Items & Actions */}
      <div className="lg:col-span-1">
        <div className="sticky top-24 space-y-4">
          {/* Summary Card */}
          <div className="bg-white rounded-sm border border-[#E5E5E5] overflow-hidden shadow-sm">
            {/* Gold accent */}
            <div className="h-1 bg-gradient-to-r from-[#D4AF37] via-[#DA291C] to-[#D4AF37]" />

            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-heading text-xl font-semibold text-[#1A1A1A]">
                  {t("summary.title")}
                </h3>
                {selectedItems.size > 0 && (
                  <button
                    onClick={clearAll}
                    className="text-sm text-[#DA291C] hover:underline flex items-center gap-1"
                  >
                    <Trash2 size={14} />
                    {t("clearAll")}
                  </button>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-[#F8F8F8] rounded-sm p-4 text-center">
                  <p className="font-heading text-3xl font-bold text-[#DA291C]">
                    {selectedItems.size}
                  </p>
                  <p className="text-xs text-[#6B7280] mt-1">{t("summary.totalItems")}</p>
                </div>
                <div className="bg-[#F8F8F8] rounded-sm p-4 text-center">
                  <p className="font-heading text-3xl font-bold text-[#D4AF37]">
                    {Object.keys(categoriesWithSelection).length}
                  </p>
                  <p className="text-xs text-[#6B7280] mt-1">{t("summary.categories")}</p>
                </div>
              </div>

              {/* Selected Items List */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-[#1A1A1A] mb-3">
                  {t("selectedItems")}
                </h4>
                {selectedItems.size === 0 ? (
                  <div className="text-center py-8 text-[#9CA3AF]">
                    <ChefHat size={40} className="mx-auto mb-3 opacity-30" />
                    <p className="text-sm">{t("noItemsSelected")}</p>
                    <p className="text-xs mt-1">Click on items to add them</p>
                  </div>
                ) : (
                  <div className="max-h-64 overflow-y-auto space-y-2 pr-2">
                    {selectedItemsDetails.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex items-center gap-3 p-2 bg-[#F8F8F8] rounded-sm group"
                      >
                        <div className="w-10 h-10 relative rounded-sm overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name.en}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-[#1A1A1A] truncate">
                            {item.name.en}
                          </p>
                          <p className="text-xs text-[#9CA3AF]">
                            {categories.find((c) => c.id === item.category)?.name.en}
                          </p>
                        </div>
                        <button
                          onClick={() => toggleItem(item.id)}
                          className="p-1 text-[#9CA3AF] hover:text-[#DA291C] opacity-0 group-hover:opacity-100 transition-all"
                        >
                          <X size={14} />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <a
                  href={getWhatsAppLink(CONTACT.whatsapp, generateWhatsAppMessage())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button
                    variant="primary"
                    fullWidth
                    leftIcon={<MessageCircle size={18} />}
                    className="bg-[#25D366] hover:bg-[#128C7E]"
                    disabled={selectedItems.size === 0}
                  >
                    {t("actions.shareWhatsApp")}
                  </Button>
                </a>

                <Link href="/book-now" className="block">
                  <Button
                    variant="gold"
                    fullWidth
                    rightIcon={<ArrowRight size={18} />}
                  >
                    {t("actions.getQuote")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Tip Card */}
          <div className="bg-[#D4AF37]/5 rounded-sm p-4 border border-[#D4AF37]/20">
            <div className="flex gap-3">
              <Sparkles size={18} className="text-[#D4AF37] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-[#1A1A1A] mb-1">Pro Tip</p>
                <p className="text-xs text-[#6B7280]">
                  For weddings, we recommend selecting items from at least 5-6 categories to offer variety to your guests.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuBuilder;
