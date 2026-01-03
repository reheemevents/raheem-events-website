"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles, ChefHat, ListChecks, MessageCircle, ArrowRight } from "lucide-react";

const features = [
  {
    icon: ChefHat,
    title: "100+ Dishes",
    description: "Choose from our extensive menu",
  },
  {
    icon: ListChecks,
    title: "Custom Selection",
    description: "Pick exactly what you want",
  },
  {
    icon: MessageCircle,
    title: "Instant Quote",
    description: "Get pricing via WhatsApp",
  },
];

export default function MenuBuilderCTA() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A] via-[#2D2D2D] to-[#1A1A1A]" />

      {/* Decorative pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Gold accent lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />

      {/* Corner decorations */}
      <div className="absolute top-8 left-8 w-24 h-24 border-t-2 border-l-2 border-[#D4AF37]/30" />
      <div className="absolute bottom-8 right-8 w-24 h-24 border-b-2 border-r-2 border-[#D4AF37]/30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#DA291C]/20 text-[#DA291C] px-4 py-2 rounded-full mb-6">
              <Sparkles size={16} />
              <span className="text-sm font-medium">New Feature</span>
            </div>

            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Build Your
              <span className="block text-[#D4AF37]">Perfect Menu</span>
            </h2>

            <p className="text-white/70 text-lg mb-8 max-w-lg">
              Planning an event? Use our interactive Menu Builder to select dishes from
              our 100+ item menu and get an instant quote delivered straight to WhatsApp.
            </p>

            {/* Features list */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className="flex items-center gap-3 bg-white/5 rounded-lg p-3 border border-white/10"
                >
                  <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0">
                    <feature.icon size={18} className="text-[#D4AF37]" />
                  </div>
                  <div>
                    <p className="text-white font-medium text-sm">{feature.title}</p>
                    <p className="text-white/50 text-xs">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <Link href="/menu-builder">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-[#DA291C] to-[#B82318] text-white px-8 py-4 rounded-sm font-semibold text-lg hover:from-[#B82318] hover:to-[#DA291C] transition-all duration-300 shadow-lg shadow-[#DA291C]/30"
              >
                <Sparkles size={20} />
                Start Building Your Menu
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </motion.div>

          {/* Right side - Visual element */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Decorative card stack */}
            <div className="relative mx-auto max-w-md">
              {/* Background cards */}
              <div className="absolute -top-4 -left-4 w-full h-full bg-[#D4AF37]/20 rounded-lg transform rotate-3" />
              <div className="absolute -top-2 -left-2 w-full h-full bg-[#DA291C]/20 rounded-lg transform rotate-1" />

              {/* Main card */}
              <div className="relative bg-white rounded-lg shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-[#DA291C] to-[#D4AF37] p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                      <ChefHat size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">Menu Builder</p>
                      <p className="text-white/80 text-xs">Your custom selection</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  {/* Mock menu items */}
                  {[
                    { name: "Chicken Biryani", category: "Rice" },
                    { name: "Mutton Karahi", category: "Qorma" },
                    { name: "Seekh Kabab", category: "BBQ" },
                    { name: "Gulab Jamun", category: "Dessert" },
                  ].map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                      className="flex items-center justify-between p-3 bg-[#FAFAFA] rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#DA291C]/10 flex items-center justify-center">
                          <span className="text-[#DA291C] text-xs font-bold">
                            {index + 1}
                          </span>
                        </div>
                        <div>
                          <p className="text-[#1A1A1A] font-medium text-sm">{item.name}</p>
                          <p className="text-[#6B7280] text-xs">{item.category}</p>
                        </div>
                      </div>
                      <div className="w-5 h-5 rounded-full bg-[#10B981] flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </motion.div>
                  ))}

                  {/* Summary bar */}
                  <div className="mt-4 pt-4 border-t border-[#E5E5E5]">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[#6B7280] text-xs">Selected Items</p>
                        <p className="text-[#1A1A1A] font-bold text-lg">4 Dishes</p>
                      </div>
                      <div className="flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-full text-sm font-medium">
                        <MessageCircle size={16} />
                        Get Quote
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
