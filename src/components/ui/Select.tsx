"use client";

import { forwardRef, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, AlertCircle, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface SelectProps {
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  hint?: string;
  disabled?: boolean;
  className?: string;
}

export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      label,
      placeholder = "Select an option",
      options,
      value,
      onChange,
      error,
      hint,
      disabled,
      className,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find((opt) => opt.value === value);

    // Close on outside click
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Close on escape
    useEffect(() => {
      const handleEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") setIsOpen(false);
      };

      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }, []);

    return (
      <div ref={containerRef} className={cn("w-full relative", className)}>
        {/* Label */}
        {label && (
          <label
            className={cn(
              "block text-sm font-medium mb-2 transition-colors duration-200",
              isFocused ? "text-[#D4AF37]" : "text-[#1A1A1A]",
              error && "text-[#DA291C]"
            )}
          >
            {label}
          </label>
        )}

        {/* Select trigger */}
        <button
          ref={ref}
          type="button"
          disabled={disabled}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            "w-full flex items-center justify-between",
            "bg-white",
            "rounded-sm",
            "transition-all duration-300 ease-out",
            // Border
            "border-2",
            error
              ? "border-[#DA291C]"
              : isOpen
              ? "border-[#D4AF37]"
              : "border-[#E5E5E5]",
            // Focus ring
            "focus:outline-none",
            error
              ? "focus:ring-2 focus:ring-[#DA291C]/20"
              : "focus:ring-2 focus:ring-[#D4AF37]/20",
            // Padding
            "py-3 px-4",
            // Disabled
            "disabled:bg-[#F8F8F8] disabled:cursor-not-allowed"
          )}
        >
          <span
            className={cn(
              "text-left truncate",
              selectedOption ? "text-[#1A1A1A]" : "text-[#9CA3AF]"
            )}
          >
            {selectedOption?.label || placeholder}
          </span>

          <span className="flex items-center gap-2 ltr:ml-2 rtl:mr-2">
            {error && <AlertCircle size={18} className="text-[#DA291C]" />}
            <motion.span
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown
                size={18}
                className={cn(
                  "transition-colors duration-200",
                  isOpen ? "text-[#D4AF37]" : "text-[#9CA3AF]"
                )}
              />
            </motion.span>
          </span>
        </button>

        {/* Dropdown menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={cn(
                "absolute z-50 w-full mt-2",
                "bg-white",
                "border border-[#E5E5E5]",
                "rounded-sm",
                "shadow-[0_8px_24px_rgba(0,0,0,0.1)]",
                "overflow-hidden"
              )}
            >
              <div className="max-h-60 overflow-y-auto py-1">
                {options.map((option, index) => (
                  <motion.button
                    key={option.value}
                    type="button"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    disabled={option.disabled}
                    onClick={() => {
                      onChange?.(option.value);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "w-full px-4 py-3 text-left",
                      "flex items-center justify-between",
                      "transition-colors duration-150",
                      option.value === value
                        ? "bg-[#D4AF37]/10 text-[#1A1A1A]"
                        : "text-[#1A1A1A] hover:bg-[#F8F8F8]",
                      option.disabled && "opacity-50 cursor-not-allowed"
                    )}
                  >
                    <span>{option.label}</span>
                    {option.value === value && (
                      <Check size={16} className="text-[#D4AF37]" />
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error or hint */}
        <AnimatePresence mode="wait">
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="mt-2 text-sm text-[#DA291C]"
            >
              {error}
            </motion.p>
          )}
          {hint && !error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-2 text-sm text-[#6B7280]"
            >
              {hint}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
