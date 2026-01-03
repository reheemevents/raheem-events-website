"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Phone, MessageCircle } from "lucide-react";
import { CONTACT } from "@/lib/constants";
import { getPhoneLink, getWhatsAppLink } from "@/lib/utils";

export default function CTASection() {
  const t = useTranslations("home.cta");
  const tCommon = useTranslations("common");

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#DA291C] via-[#B82318] to-[#8B0000]" />

      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative gold elements */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

      {/* Gold corner accents */}
      <div className="absolute top-8 left-8 w-20 h-20 border-t-2 border-l-2 border-[#D4AF37]/40 hidden md:block" />
      <div className="absolute top-8 right-8 w-20 h-20 border-t-2 border-r-2 border-[#D4AF37]/40 hidden md:block" />
      <div className="absolute bottom-8 left-8 w-20 h-20 border-b-2 border-l-2 border-[#D4AF37]/40 hidden md:block" />
      <div className="absolute bottom-8 right-8 w-20 h-20 border-b-2 border-r-2 border-[#D4AF37]/40 hidden md:block" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-20 h-0.5 bg-[#D4AF37] mx-auto mb-8"
        />

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
        >
          {t("title")}
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-white/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto"
        >
          {t("subtitle")}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* WhatsApp Button */}
          <motion.a
            href={getWhatsAppLink(CONTACT.whatsapp)}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#25D366] text-white font-semibold text-lg rounded-sm shadow-[0_8px_30px_rgba(37,211,102,0.4)] hover:bg-[#128C7E] transition-all duration-300 group"
          >
            <MessageCircle size={22} className="group-hover:animate-pulse" />
            <span>{tCommon("whatsapp")}</span>
          </motion.a>

          {/* Phone Button */}
          <motion.a
            href={getPhoneLink(CONTACT.phone)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-[#1A1A1A] font-semibold text-lg rounded-sm shadow-[0_8px_30px_rgba(255,255,255,0.2)] hover:bg-[#D4AF37] hover:text-[#1A1A1A] transition-all duration-300 group"
          >
            <Phone size={22} className="group-hover:animate-pulse" />
            <span>{tCommon("callNow")}</span>
          </motion.a>
        </motion.div>

        {/* Phone number display */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 text-white/60"
        >
          Or call us directly at{" "}
          <a
            href={getPhoneLink(CONTACT.phone)}
            className="text-[#D4AF37] font-semibold hover:underline"
          >
            {CONTACT.phone}
          </a>
        </motion.p>

        {/* Book Now Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8"
        >
          <Link
            href="/book-now"
            className="inline-block px-8 py-3 bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] font-semibold rounded-sm hover:bg-[#D4AF37] hover:text-[#1A1A1A] transition-all duration-300"
          >
            {t("button")}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
