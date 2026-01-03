"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItemProps {
  href: string;
  label: string;
  hasDropdown?: boolean;
  dropdownItems?: { href: string; label: string; description?: string }[];
}

function NavItem({ href, label, hasDropdown, dropdownItems }: NavItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (hasDropdown && dropdownItems) {
    return (
      <div
        className="relative"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <button
          className={cn(
            "flex items-center gap-1 text-sm font-medium text-[#1A1A1A] transition-colors duration-200",
            "hover:text-[#DA291C] group"
          )}
        >
          <span className="relative">
            {label}
            <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
          </span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown size={14} className="opacity-60" />
          </motion.span>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute top-full left-1/2 -translate-x-1/2 pt-3"
            >
              <div className="bg-white rounded-sm shadow-xl border border-[#E5E5E5] overflow-hidden min-w-[280px]">
                {/* Gold accent top */}
                <div className="h-[2px] bg-gradient-to-r from-[#D4AF37] via-[#D4AF37] to-[#DA291C]" />

                <div className="p-2">
                  {dropdownItems.map((item, index) => (
                    <Link key={item.href} href={item.href}>
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="group/item px-4 py-3 rounded-sm hover:bg-[#F8F8F8] transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-[#1A1A1A] group-hover/item:text-[#DA291C] transition-colors">
                            {item.label}
                          </span>
                          <motion.span
                            initial={{ x: 0, opacity: 0 }}
                            whileHover={{ x: 4, opacity: 1 }}
                            className="text-[#D4AF37]"
                          >
                            →
                          </motion.span>
                        </div>
                        {item.description && (
                          <p className="text-xs text-[#6B7280] mt-0.5">
                            {item.description}
                          </p>
                        )}
                      </motion.div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <Link href={href} className="relative group">
      <span className="text-sm font-medium text-[#1A1A1A] transition-colors duration-200 hover:text-[#DA291C]">
        {label}
      </span>
      <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
    </Link>
  );
}

export default function Navigation() {
  const t = useTranslations("nav");

  const navItems: NavItemProps[] = [
    { href: "/", label: t("home") },
    {
      href: "/menu",
      label: t("menu"),
      hasDropdown: true,
      dropdownItems: [
        {
          href: "/menu",
          label: "Full Menu",
          description: "Browse all 107+ menu items",
        },
        {
          href: "/menu-builder",
          label: t("menuBuilder"),
          description: "Create a custom menu for your event",
        },
      ],
    },
    {
      href: "/venues",
      label: t("venues"),
      hasDropdown: true,
      dropdownItems: [
        {
          href: "/venues/israr-marriage-hall",
          label: "Israr Marriage Hall",
          description: "Two floors, capacity up to 700 guests",
        },
        {
          href: "/venues/mumtaz-banquet-hall",
          label: "Mumtaz Banquet Hall",
          description: "Ground floor, capacity 1000-1200 guests",
        },
      ],
    },
    { href: "/catering", label: t("catering") },
    { href: "/gallery", label: t("gallery") },
    { href: "/contact", label: t("contact") },
  ];

  return (
    <nav className="flex items-center gap-6">
      {navItems.map((item) => (
        <NavItem key={item.href} {...item} />
      ))}
    </nav>
  );
}
