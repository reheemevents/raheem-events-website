"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import Navigation from "./Navigation";
import MobileMenu from "./MobileMenu";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Header() {
  const t = useTranslations("nav");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Floating Header Container */}
      <div className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-4">
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "max-w-7xl mx-auto transition-all duration-500 rounded-full",
            isScrolled
              ? "bg-white/95 backdrop-blur-md shadow-[0_8px_32px_-8px_rgba(0,0,0,0.15),0_0_0_1px_rgba(212,175,55,0.2)]"
              : "bg-white/90 backdrop-blur-sm shadow-[0_4px_24px_-4px_rgba(0,0,0,0.1),0_0_0_1px_rgba(212,175,55,0.15)]"
          )}
        >
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Left - Logo */}
              <Link href="/" className="flex-shrink-0 group">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Image
                    src="/Logo/logo.png"
                    alt="Raheem Events & Catering"
                    width={160}
                    height={50}
                    className="h-10 sm:h-11 w-auto"
                    priority
                  />
                </motion.div>
              </Link>

              {/* Center - Navigation (Desktop) */}
              <div className="hidden lg:flex items-center justify-center flex-1">
                <Navigation />
              </div>

              {/* Right - Book Now Button (Desktop) */}
              <div className="hidden lg:block">
                <Link href="/book-now">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative overflow-hidden px-5 py-2 bg-[#DA291C] text-white text-sm font-medium tracking-wide rounded-full group shadow-lg shadow-[#DA291C]/25"
                  >
                    <span className="relative z-10">{t("bookNow")}</span>
                    <motion.div
                      className="absolute inset-0 bg-[#B82318]"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    />
                  </motion.button>
                </Link>
              </div>

              {/* Mobile Menu Toggle (Right on mobile) */}
              <div className="flex items-center lg:hidden">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="p-2 text-[#1A1A1A] hover:text-[#DA291C] transition-colors"
                  aria-label="Toggle menu"
                >
                  <AnimatePresence mode="wait">
                    {isMobileMenuOpen ? (
                      <motion.div
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <X size={24} />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Menu size={24} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.header>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
