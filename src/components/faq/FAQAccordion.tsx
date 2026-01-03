"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, Building2, UtensilsCrossed, Calendar, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
}

interface FAQCategory {
  id: string;
  label: string;
  icon: string;
}

interface FAQAccordionProps {
  questions: FAQItem[];
  categories: FAQCategory[];
  showCategories?: boolean;
  initialCategory?: string;
  className?: string;
}

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  HelpCircle,
  Building2,
  UtensilsCrossed,
  Calendar,
  CreditCard,
};

function FAQItemComponent({
  item,
  isOpen,
  onToggle,
  index,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className={cn(
        "group relative",
        "border-b border-[#E5E5E5] last:border-b-0"
      )}
    >
      {/* Question button */}
      <button
        onClick={onToggle}
        className={cn(
          "w-full py-6 flex items-start justify-between gap-4 text-left",
          "transition-colors duration-300",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/50 focus-visible:ring-offset-2 rounded-sm"
        )}
        aria-expanded={isOpen}
      >
        {/* Gold accent line on hover/open */}
        <motion.span
          className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#D4AF37] origin-top"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        <span
          className={cn(
            "font-medium text-lg transition-colors duration-300 pr-4",
            isOpen ? "text-[#DA291C]" : "text-[#1A1A1A] group-hover:text-[#DA291C]"
          )}
        >
          {item.question}
        </span>

        {/* Rotating chevron icon */}
        <motion.span
          className={cn(
            "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center",
            "transition-colors duration-300",
            isOpen
              ? "bg-[#DA291C] text-white"
              : "bg-[#F8F8F8] text-[#6B7280] group-hover:bg-[#DA291C]/10 group-hover:text-[#DA291C]"
          )}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <ChevronDown size={20} />
        </motion.span>
      </button>

      {/* Answer panel with smooth animation */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: 0.3, ease: "easeInOut" },
              opacity: { duration: 0.2, delay: isOpen ? 0.1 : 0 }
            }}
            className="overflow-hidden"
          >
            <div className="pb-6 pl-4 pr-14">
              {/* Decorative gold line */}
              <div className="w-8 h-0.5 bg-gradient-to-r from-[#D4AF37] to-transparent mb-4" />
              <p className="text-[#6B7280] leading-relaxed text-base">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQAccordion({
  questions,
  categories,
  showCategories = true,
  initialCategory = "all",
  className,
}: FAQAccordionProps) {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const filteredQuestions = activeCategory === "all"
    ? questions
    : questions.filter((q) => q.category === activeCategory);

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className={cn("", className)}>
      {/* Category tabs */}
      {showCategories && (
        <div className="mb-10">
          <div className="flex flex-wrap gap-3 justify-center">
            {/* All category */}
            <motion.button
              onClick={() => setActiveCategory("all")}
              className={cn(
                "px-5 py-2.5 rounded-full text-sm font-medium",
                "transition-all duration-300",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/50",
                activeCategory === "all"
                  ? "bg-[#DA291C] text-white shadow-lg shadow-[#DA291C]/20"
                  : "bg-white text-[#6B7280] border border-[#E5E5E5] hover:border-[#DA291C] hover:text-[#DA291C]"
              )}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              All Questions
            </motion.button>

            {/* Category buttons */}
            {categories.map((category) => {
              const Icon = iconMap[category.icon] || HelpCircle;
              const count = questions.filter((q) => q.category === category.id).length;

              return (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={cn(
                    "px-5 py-2.5 rounded-full text-sm font-medium",
                    "inline-flex items-center gap-2",
                    "transition-all duration-300",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/50",
                    activeCategory === category.id
                      ? "bg-[#DA291C] text-white shadow-lg shadow-[#DA291C]/20"
                      : "bg-white text-[#6B7280] border border-[#E5E5E5] hover:border-[#DA291C] hover:text-[#DA291C]"
                  )}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon size={16} />
                  <span>{category.label}</span>
                  <span
                    className={cn(
                      "text-xs px-1.5 py-0.5 rounded-full",
                      activeCategory === category.id
                        ? "bg-white/20 text-white"
                        : "bg-[#F8F8F8] text-[#6B7280]"
                    )}
                  >
                    {count}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      )}

      {/* FAQ items container */}
      <motion.div
        layout
        className="bg-white rounded-sm border border-[#E5E5E5] overflow-hidden shadow-sm"
      >
        {/* Gold accent top border */}
        <div className="h-1 bg-gradient-to-r from-[#D4AF37] via-[#DA291C] to-[#D4AF37]" />

        <div className="p-6 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {filteredQuestions.length > 0 ? (
                filteredQuestions.map((item, index) => (
                  <FAQItemComponent
                    key={item.id}
                    item={item}
                    isOpen={openItems.has(item.id)}
                    onToggle={() => toggleItem(item.id)}
                    index={index}
                  />
                ))
              ) : (
                <p className="text-center text-[#6B7280] py-12">
                  No questions found in this category.
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Results count */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mt-6 text-center text-sm text-[#9CA3AF]"
      >
        Showing {filteredQuestions.length} of {questions.length} questions
      </motion.p>
    </div>
  );
}

export default FAQAccordion;
