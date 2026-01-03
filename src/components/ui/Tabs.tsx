"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
  variant?: "underline" | "pills" | "bordered";
  size?: "sm" | "md" | "lg";
  className?: string;
}

interface TabPanelProps {
  children: React.ReactNode;
  className?: string;
}

const sizes = {
  sm: "text-sm px-3 py-2",
  md: "text-base px-4 py-2.5",
  lg: "text-lg px-5 py-3",
};

export function Tabs({
  tabs,
  defaultTab,
  onChange,
  variant = "underline",
  size = "md",
  className,
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const containerRef = useRef<HTMLDivElement>(null);

  // Update indicator position
  useEffect(() => {
    const activeElement = tabRefs.current.get(activeTab);
    if (activeElement && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const activeRect = activeElement.getBoundingClientRect();

      // Handle RTL
      const isRTL = document.dir === "rtl";
      const left = isRTL
        ? containerRect.right - activeRect.right
        : activeRect.left - containerRect.left;

      setIndicatorStyle({
        left,
        width: activeRect.width,
      });
    }
  }, [activeTab, tabs]);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  if (variant === "pills") {
    return (
      <div
        ref={containerRef}
        className={cn("inline-flex p-1 bg-[#F8F8F8] rounded-sm", className)}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            ref={(el) => {
              if (el) tabRefs.current.set(tab.id, el);
            }}
            onClick={() => !tab.disabled && handleTabClick(tab.id)}
            disabled={tab.disabled}
            className={cn(
              "relative z-10",
              "flex items-center gap-2",
              sizes[size],
              "font-medium",
              "rounded-sm",
              "transition-colors duration-200",
              activeTab === tab.id
                ? "text-[#1A1A1A]"
                : "text-[#6B7280] hover:text-[#1A1A1A]",
              tab.disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            {activeTab === tab.id && (
              <motion.span
                layoutId="pill-bg"
                className="absolute inset-0 bg-white rounded-sm shadow-sm"
                transition={{ duration: 0.2, ease: "easeOut" }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {tab.icon}
              {tab.label}
            </span>
          </button>
        ))}
      </div>
    );
  }

  if (variant === "bordered") {
    return (
      <div
        ref={containerRef}
        className={cn(
          "inline-flex border border-[#E5E5E5] rounded-sm overflow-hidden",
          className
        )}
      >
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            ref={(el) => {
              if (el) tabRefs.current.set(tab.id, el);
            }}
            onClick={() => !tab.disabled && handleTabClick(tab.id)}
            disabled={tab.disabled}
            className={cn(
              "flex items-center gap-2",
              sizes[size],
              "font-medium",
              "transition-all duration-200",
              index !== 0 && "border-l border-[#E5E5E5]",
              activeTab === tab.id
                ? "bg-[#1A1A1A] text-white"
                : "bg-white text-[#6B7280] hover:bg-[#F8F8F8] hover:text-[#1A1A1A]",
              tab.disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
    );
  }

  // Default: underline variant
  return (
    <div className={cn("relative", className)}>
      <div
        ref={containerRef}
        className="flex border-b border-[#E5E5E5]"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            ref={(el) => {
              if (el) tabRefs.current.set(tab.id, el);
            }}
            onClick={() => !tab.disabled && handleTabClick(tab.id)}
            disabled={tab.disabled}
            className={cn(
              "relative",
              "flex items-center gap-2",
              sizes[size],
              "font-medium",
              "transition-colors duration-200",
              "-mb-px", // Overlap border
              activeTab === tab.id
                ? "text-[#1A1A1A]"
                : "text-[#6B7280] hover:text-[#1A1A1A]",
              tab.disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}

        {/* Animated gold underline */}
        <motion.div
          className="absolute bottom-0 h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#E5C453]"
          initial={false}
          animate={{
            left: indicatorStyle.left,
            width: indicatorStyle.width,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

// Tab content wrapper
export function TabPanel({ children, className }: TabPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className={cn("pt-6", className)}
    >
      {children}
    </motion.div>
  );
}

// Controlled tabs with content
export function TabsWithContent({
  tabs,
  children,
  className,
}: {
  tabs: Tab[];
  children: React.ReactNode[];
  className?: string;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={className}>
      <Tabs
        tabs={tabs}
        defaultTab={tabs[0].id}
        onChange={(id) => {
          const index = tabs.findIndex((t) => t.id === id);
          setActiveIndex(index);
        }}
      />
      <TabPanel>{children[activeIndex]}</TabPanel>
    </div>
  );
}

export default Tabs;
