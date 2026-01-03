"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { CONTACT, WHATSAPP_MESSAGES } from "@/lib/constants";
import { getWhatsAppLink } from "@/lib/utils";

interface WhatsAppButtonProps {
  /** Custom message to pre-fill */
  message?: string;
  /** Show tooltip on hover */
  showTooltip?: boolean;
  /** Position */
  position?: "bottom-right" | "bottom-left";
}

export default function WhatsAppButton({
  message = WHATSAPP_MESSAGES.general,
  showTooltip = true,
  position = "bottom-right",
}: WhatsAppButtonProps) {
  const t = useTranslations("common");
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showPulse, setShowPulse] = useState(true);

  // Show button after a short delay
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  // Stop pulse animation after first interaction
  useEffect(() => {
    if (isHovered) {
      setShowPulse(false);
    }
  }, [isHovered]);

  const positionClasses = {
    "bottom-right": "right-4 sm:right-6",
    "bottom-left": "left-4 sm:left-6",
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 20,
            delay: 0.2,
          }}
          className={`fixed bottom-4 sm:bottom-6 z-40 ${positionClasses[position]}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Tooltip */}
          <AnimatePresence>
            {showTooltip && isHovered && (
              <motion.div
                initial={{ opacity: 0, x: position === "bottom-right" ? 10 : -10, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: position === "bottom-right" ? 10 : -10, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                className={`absolute bottom-full mb-3 ${
                  position === "bottom-right" ? "right-0" : "left-0"
                } whitespace-nowrap`}
              >
                <div className="relative bg-[#1A1A1A] text-white text-sm px-4 py-2 rounded-lg shadow-xl">
                  <span>Chat with us on WhatsApp</span>
                  {/* Arrow */}
                  <div
                    className={`absolute top-full ${
                      position === "bottom-right" ? "right-5" : "left-5"
                    } border-8 border-transparent border-t-[#1A1A1A]`}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Button */}
          <a
            href={getWhatsAppLink(CONTACT.whatsapp, message)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              {/* Pulse rings */}
              {showPulse && (
                <>
                  <motion.div
                    className="absolute inset-0 rounded-full bg-[#25D366]"
                    animate={{
                      scale: [1, 1.5, 1.5],
                      opacity: [0.4, 0, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut",
                    }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full bg-[#25D366]"
                    animate={{
                      scale: [1, 1.8, 1.8],
                      opacity: [0.3, 0, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut",
                      delay: 0.3,
                    }}
                  />
                </>
              )}

              {/* Button */}
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg shadow-[#25D366]/30 group">
                {/* Hover overlay */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-[#128C7E]"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />

                {/* Icon */}
                <motion.div
                  className="relative z-10"
                  animate={isHovered ? { rotate: [0, -10, 10, -10, 0] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <MessageCircle
                    size={28}
                    className="text-white fill-white sm:w-8 sm:h-8"
                  />
                </motion.div>

                {/* Notification dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 1, type: "spring" }}
                  className="absolute -top-1 -right-1 w-4 h-4 bg-[#DA291C] rounded-full border-2 border-white flex items-center justify-center"
                >
                  <span className="text-[8px] text-white font-bold">1</span>
                </motion.div>
              </div>
            </motion.div>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
