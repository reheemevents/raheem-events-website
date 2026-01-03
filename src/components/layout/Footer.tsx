"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
  ArrowUp,
} from "lucide-react";
import { CONTACT, SOCIAL_LINKS } from "@/lib/constants";
import { getPhoneLink, getWhatsAppLink, getEmailLink } from "@/lib/utils";

export default function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerLinks = {
    services: [
      { href: "/catering", label: "Wedding Catering" },
      { href: "/catering", label: "Corporate Events" },
      { href: "/menu", label: "Food Menu" },
    ],
    venues: [
      { href: "/venues/israr-marriage-hall", label: "Israr Marriage Hall" },
      { href: "/venues/mumtaz-banquet-hall", label: "Mumtaz Banquet Hall" },
      { href: "/gallery", label: "Gallery" },
    ],
    company: [
      { href: "/about", label: "About Us" },
      { href: "/testimonials", label: "Testimonials" },
      { href: "/contact", label: "Contact" },
    ],
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <footer className="relative bg-[#1A1A1A] text-white overflow-hidden">
      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-[#DA291C] via-[#D4AF37] to-[#DA291C]" />

      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8"
        >
          {/* Brand Column */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/Logo/logo-dark.svg"
                alt="Raheem Events & Catering"
                width={180}
                height={60}
                className="h-14 w-auto"
              />
            </Link>

            <p className="text-[#9CA3AF] text-sm leading-relaxed max-w-xs mb-6">
              {t("description")}
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href={getPhoneLink(CONTACT.phone)}
                className="flex items-center gap-3 text-sm text-[#9CA3AF] hover:text-[#D4AF37] transition-colors group"
              >
                <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#D4AF37]/10 transition-colors">
                  <Phone size={14} className="text-[#D4AF37]" />
                </span>
                {CONTACT.phone}
              </a>

              <a
                href={getEmailLink(CONTACT.email)}
                className="flex items-center gap-3 text-sm text-[#9CA3AF] hover:text-[#D4AF37] transition-colors group"
              >
                <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#D4AF37]/10 transition-colors">
                  <Mail size={14} className="text-[#D4AF37]" />
                </span>
                {CONTACT.email}
              </a>

              <a
                href={CONTACT.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-sm text-[#9CA3AF] hover:text-[#D4AF37] transition-colors group"
              >
                <span className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#D4AF37]/10 transition-colors flex-shrink-0">
                  <MapPin size={14} className="text-[#D4AF37]" />
                </span>
                <span className="leading-relaxed">
                  {CONTACT.address}
                  <span className="block text-xs text-[#D4AF37] mt-1">Get Directions →</span>
                </span>
              </a>
            </div>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants}>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              {t("services")}
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#9CA3AF] hover:text-[#D4AF37] transition-colors inline-flex items-center gap-1 group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-[#D4AF37] transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Venues */}
          <motion.div variants={itemVariants}>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              {t("venues")}
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.venues.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#9CA3AF] hover:text-[#D4AF37] transition-colors inline-flex items-center gap-1 group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-[#D4AF37] transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div variants={itemVariants}>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
              {t("company")}
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#9CA3AF] hover:text-[#D4AF37] transition-colors inline-flex items-center gap-1 group"
                  >
                    <span className="w-0 group-hover:w-2 h-px bg-[#D4AF37] transition-all duration-200" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              {SOCIAL_LINKS.facebook && (
                <a
                  href={SOCIAL_LINKS.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#D4AF37] transition-colors group"
                >
                  <Facebook
                    size={16}
                    className="text-[#9CA3AF] group-hover:text-[#1A1A1A] transition-colors"
                  />
                </a>
              )}
              {SOCIAL_LINKS.instagram && (
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#D4AF37] transition-colors group"
                >
                  <Instagram
                    size={16}
                    className="text-[#9CA3AF] group-hover:text-[#1A1A1A] transition-colors"
                  />
                </a>
              )}
              {SOCIAL_LINKS.youtube && (
                <a
                  href={SOCIAL_LINKS.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#D4AF37] transition-colors group"
                >
                  <Youtube
                    size={16}
                    className="text-[#9CA3AF] group-hover:text-[#1A1A1A] transition-colors"
                  />
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-xs text-[#6B7280]">
            {t("copyright", { year: new Date().getFullYear() })}
          </p>

          {/* Scroll to top */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#DA291C] transition-colors group"
          >
            <ArrowUp
              size={18}
              className="text-[#9CA3AF] group-hover:text-white transition-colors"
            />
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
}
