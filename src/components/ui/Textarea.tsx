"use client";

import { forwardRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  hint?: string;
  showCount?: boolean;
  maxLength?: number;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      hint,
      showCount = false,
      maxLength,
      className,
      id,
      disabled,
      value,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [charCount, setCharCount] = useState(
      typeof value === "string" ? value.length : 0
    );
    const inputId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="w-full">
        {/* Label */}
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              "block text-sm font-medium mb-2 transition-colors duration-200",
              isFocused ? "text-[#D4AF37]" : "text-[#1A1A1A]",
              error && "text-[#DA291C]"
            )}
          >
            {label}
          </label>
        )}

        {/* Textarea container */}
        <div className="relative">
          <textarea
            ref={ref}
            id={inputId}
            disabled={disabled}
            maxLength={maxLength}
            value={value}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            onChange={(e) => {
              setCharCount(e.target.value.length);
              props.onChange?.(e);
            }}
            className={cn(
              // Base styles
              "w-full bg-white min-h-[120px]",
              "text-[#1A1A1A] placeholder:text-[#9CA3AF]",
              "rounded-sm",
              "transition-all duration-300 ease-out",
              "resize-y",
              // Border & focus
              "border-2",
              error
                ? "border-[#DA291C] focus:border-[#DA291C]"
                : "border-[#E5E5E5] focus:border-[#D4AF37]",
              // Focus ring
              "focus:outline-none",
              error
                ? "focus:ring-2 focus:ring-[#DA291C]/20"
                : "focus:ring-2 focus:ring-[#D4AF37]/20",
              // Padding
              "p-4",
              // Disabled
              "disabled:bg-[#F8F8F8] disabled:text-[#9CA3AF] disabled:cursor-not-allowed disabled:resize-none",
              className
            )}
            {...props}
          />

          {/* Error icon */}
          {error && (
            <span className="absolute top-4 ltr:right-4 rtl:left-4 text-[#DA291C]">
              <AlertCircle size={18} />
            </span>
          )}

          {/* Focus underline animation */}
          <motion.span
            className="absolute bottom-0 left-0 h-0.5 bg-[#D4AF37]"
            initial={{ width: "0%" }}
            animate={{ width: isFocused && !error ? "100%" : "0%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
        </div>

        {/* Bottom row: error/hint and character count */}
        <div className="flex items-start justify-between mt-2">
          <AnimatePresence mode="wait">
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="text-sm text-[#DA291C]"
              >
                {error}
              </motion.p>
            )}
            {hint && !error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-[#6B7280]"
              >
                {hint}
              </motion.p>
            )}
          </AnimatePresence>

          {showCount && maxLength && (
            <span
              className={cn(
                "text-xs ltr:ml-auto rtl:mr-auto",
                charCount >= maxLength ? "text-[#DA291C]" : "text-[#9CA3AF]"
              )}
            >
              {charCount}/{maxLength}
            </span>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
