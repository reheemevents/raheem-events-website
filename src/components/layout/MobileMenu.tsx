"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { ChevronDown, Phone, MessageCircle } from "lucide-react";
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
    { href: "/", label: t("home") },
    { href: "/menu", label: t("menu") },
    {
      href: "/venues",
      label: t("venues"),
      children: [
        { href: "/venues/israr-marriage-hall", label: "Israr Marriage Hall" },
        { href: "/venues/mumtaz-banquet-hall", label: "Mumtaz Banquet Hall" },
      ],
    },
    { href: "/catering", label: t("catering") },
    { href: "/packages", label: t("packages") },
    { href: "/gallery", label: t("gallery") },
    { href: "/contact", label: t("contact") },
  ];

  const menuVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 400,
        damping: 40,
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    closed: { x: 50, opacity: 0 },
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
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-white z-50 lg:hidden shadow-2xl"
          >
            {/* Gold accent */}
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#D4AF37] via-[#DA291C] to-[#D4AF37]" />

            <div className="flex flex-col h-full pt-24 pb-8 px-6">
              {/* Navigation Items */}
              <nav className="flex-1 overflow-y-auto">
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
                            className="flex items-center justify-between w-full py-3 text-lg font-medium text-[#1A1A1A]"
                          >
                            <span>{item.label}</span>
                            <motion.span
                              animate={{
                                rotate: expandedItem === item.href ? 180 : 0,
                              }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronDown size={20} className="text-[#D4AF37]" />
                            </motion.span>
                          </button>

                          <AnimatePresence>
                            {expandedItem === item.href && (
                              <motion.ul
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden pl-4 border-l-2 border-[#D4AF37]/30 ml-2"
                              >
                                {item.children.map((child) => (
                                  <li key={child.href}>
                                    <Link
                                      href={child.href}
                                      onClick={onClose}
                                      className="block py-2.5 text-[#6B7280] hover:text-[#DA291C] transition-colors"
                                    >
                                      {child.label}
                                    </Link>
                                  </li>
                                ))}
                              </motion.ul>
                            )}
                          </AnimatePresence>
                        </div>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className="block py-3 text-lg font-medium text-[#1A1A1A] hover:text-[#DA291C] transition-colors"
                        >
                          {item.label}
                        </Link>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Divider */}
              <div className="my-6 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />

              {/* CTA Buttons */}
              <motion.div
                variants={itemVariants}
                className="space-y-3"
              >
                <Link href="/book-now" onClick={onClose}>
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3.5 bg-[#DA291C] text-white font-medium rounded-sm hover:bg-[#B82318] transition-colors"
                  >
                    {t("bookNow")}
                  </motion.button>
                </Link>

                <div className="flex gap-3">
                  <a
                    href={getWhatsAppLink(CONTACT.whatsapp, WHATSAPP_MESSAGES.general)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center gap-2 py-3 bg-[#25D366] text-white font-medium rounded-sm hover:bg-[#128C7E] transition-colors"
                    >
                      <MessageCircle size={18} />
                      {tCommon("whatsapp")}
                    </motion.button>
                  </a>

                  <a href={getPhoneLink(CONTACT.phone)} className="flex-1">
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center gap-2 py-3 bg-[#1A1A1A] text-white font-medium rounded-sm hover:bg-[#333] transition-colors"
                    >
                      <Phone size={18} />
                      {tCommon("callNow")}
                    </motion.button>
                  </a>
                </div>
              </motion.div>

              {/* Footer */}
              <motion.div
                variants={itemVariants}
                className="mt-6 text-center"
              >
                <p className="text-xs text-[#9CA3AF]">
                  © {new Date().getFullYear()} Raheem Events
                </p>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
