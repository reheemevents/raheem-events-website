"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Phone, MessageCircle, X, MapPin, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { CONTACT, WHATSAPP_MESSAGES } from "@/lib/constants";
import { getWhatsAppLink, getPhoneLink } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const menuItems = [
    { href: "/", label: t("home"), icon: "01" },
    {
      href: "/menu",
      label: t("menu"),
      icon: "02",
      children: [
        { href: "/menu", label: "Full Menu" },
        { href: "/menu-builder", label: t("menuBuilder") },
      ],
    },
    {
      href: "/venues",
      label: t("venues"),
      icon: "03",
      children: [
        { href: "/venues/israr-marriage-hall", label: "Israr Marriage Hall" },
        { href: "/venues/mumtaz-banquet-hall", label: "Mumtaz Banquet Hall" },
      ],
    },
    { href: "/catering", label: t("catering"), icon: "04" },
    { href: "/gallery", label: t("gallery"), icon: "05" },
    { href: "/faq", label: t("faq"), icon: "06" },
    { href: "/contact", label: t("contact"), icon: "07" },
  ];

  const menuVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 35,
      },
    },
    open: {
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 35,
        staggerChildren: 0.07,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    closed: { x: 40, opacity: 0 },
    open: { x: 0, opacity: 1 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#1A1A1A]/60 backdrop-blur-md z-40 lg:hidden"
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-0 right-0 bottom-0 w-full max-w-[340px] bg-[#FAFAF8] z-50 lg:hidden shadow-2xl overflow-hidden"
          >
            {/* Decorative gold border */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#D4AF37] via-[#C9A227] to-[#D4AF37]" />

            {/* Background pattern */}
            <div
              className="absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D4AF37' fill-opacity='1'%3E%3Cpath d='M20 20h20v20H20z'/%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />

            {/* Header with close button */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="relative flex items-center justify-between px-6 py-5 border-b border-[#E8E4DC]"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#D4AF37] to-[#C9A227] flex items-center justify-center">
                  <span className="text-white font-heading font-bold text-lg">R</span>
                </div>
                <div>
                  <p className="text-xs text-[#8B7355] uppercase tracking-[0.15em]">Menu</p>
                  <p className="text-sm font-heading font-semibold text-[#1A1A1A]">Raheem Events</p>
                </div>
              </div>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center bg-[#1A1A1A] text-white hover:bg-[#DA291C] transition-colors"
              >
                <X size={20} />
              </motion.button>
            </motion.div>

            <div className="flex flex-col h-[calc(100%-80px)] overflow-y-auto">
              {/* Navigation Items */}
              <nav className="flex-1 px-6 py-6">
                <ul className="space-y-1">
                  {menuItems.map((item, index) => (
                    <motion.li
                      key={item.href}
                      variants={itemVariants}
                      transition={{ delay: index * 0.05 }}
                    >
                      {item.children ? (
                        <div>
                          <button
                            onClick={() =>
                              setExpandedItem(
                                expandedItem === item.href ? null : item.href
                              )
                            }
                            className="flex items-center justify-between w-full py-3.5 group"
                          >
                            <div className="flex items-center gap-4">
                              <span className="text-[10px] font-medium text-[#D4AF37] tracking-wider">{item.icon}</span>
                              <span className="text-base font-medium text-[#1A1A1A] group-hover:text-[#DA291C] transition-colors">{item.label}</span>
                            </div>
                            <motion.div
                              animate={{
                                rotate: expandedItem === item.href ? 180 : 0,
                              }}
                              transition={{ duration: 0.25, ease: "easeInOut" }}
                              className={cn(
                                "w-6 h-6 flex items-center justify-center rounded-full transition-colors",
                                expandedItem === item.href ? "bg-[#D4AF37]" : "bg-[#E8E4DC]"
                              )}
                            >
                              <ChevronDown
                                size={14}
                                className={cn(
                                  "transition-colors",
                                  expandedItem === item.href ? "text-white" : "text-[#8B7355]"
                                )}
                              />
                            </motion.div>
                          </button>

                          <AnimatePresence>
                            {expandedItem === item.href && (
                              <motion.ul
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25, ease: "easeInOut" }}
                                className="overflow-hidden"
                              >
                                <div className="py-2 ml-8 pl-4 border-l border-[#D4AF37]/30 space-y-1">
                                  {item.children.map((child) => (
                                    <li key={child.href}>
                                      <Link
                                        href={child.href}
                                        onClick={onClose}
                                        className="flex items-center gap-2 py-2.5 text-sm text-[#6B7280] hover:text-[#DA291C] transition-colors group"
                                      >
                                        <MapPin size={12} className="text-[#D4AF37]" />
                                        <span>{child.label}</span>
                                        <ArrowRight size={12} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                                      </Link>
                                    </li>
                                  ))}
                                </div>
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className="flex items-center gap-4 py-3.5 group"
                        >
                          <span className="text-[10px] font-medium text-[#D4AF37] tracking-wider">{item.icon}</span>
                          <span className="text-base font-medium text-[#1A1A1A] group-hover:text-[#DA291C] transition-colors">{item.label}</span>
                          <ArrowRight size={14} className="ml-auto text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Bottom section */}
              <div className="px-6 pb-6 space-y-4">
                {/* Gold divider */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#D4AF37]/40" />
                  <div className="w-2 h-2 rotate-45 bg-[#D4AF37]" />
                  <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#D4AF37]/40" />
                </div>

                {/* CTA Buttons */}
                <motion.div
                  variants={itemVariants}
                  className="space-y-3"
                >
                  <Link href="/book-now" onClick={onClose} className="block">
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-4 bg-gradient-to-r from-[#DA291C] to-[#B82318] text-white font-medium text-sm uppercase tracking-wider hover:from-[#B82318] hover:to-[#DA291C] transition-all shadow-lg"
                    >
                      {t("bookNow")}
                    </motion.button>
                  </Link>

                  <div className="flex gap-2">
                    <a
                      href={getWhatsAppLink(CONTACT.whatsapp, WHATSAPP_MESSAGES.general)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <motion.button
                        whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#25D366] text-white font-medium text-sm hover:bg-[#1EBE5D] transition-colors"
                      >
                        <MessageCircle size={16} />
                        <span>{tCommon("whatsapp")}</span>
                      </motion.button>
                    </a>

                    <a href={getPhoneLink(CONTACT.phone)} className="flex-1">
                      <motion.button
                        whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#1A1A1A] text-white font-medium text-sm hover:bg-[#333] transition-colors"
                      >
                        <Phone size={16} />
                        <span>{tCommon("callNow")}</span>
                      </motion.button>
                    </a>
                  </div>
                </motion.div>

                {/* Footer */}
                <motion.div
                  variants={itemVariants}
                  className="pt-4 text-center"
                >
                  <p className="text-[10px] text-[#9CA3AF] uppercase tracking-[0.15em]">
                    © {new Date().getFullYear()} Raheem Events & Catering
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
