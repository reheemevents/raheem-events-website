"use client";

import { forwardRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      leftIcon,
      rightIcon,
      className,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

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

        {/* Input container */}
        <div className="relative">
          {/* Left icon */}
          {leftIcon && (
            <span
              className={cn(
                "absolute top-1/2 -translate-y-1/2 transition-colors duration-200",
                "ltr:left-4 rtl:right-4",
                isFocused ? "text-[#D4AF37]" : "text-[#9CA3AF]",
                error && "text-[#DA291C]"
              )}
            >
              {leftIcon}
            </span>
          )}

          {/* Input field */}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            className={cn(
              // Base styles
              "w-full bg-white",
              "text-[#1A1A1A] placeholder:text-[#9CA3AF]",
              "rounded-sm",
              "transition-all duration-300 ease-out",
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
              "py-3",
              leftIcon ? "ltr:pl-12 rtl:pr-12" : "ltr:pl-4 rtl:pr-4",
              rightIcon || error ? "ltr:pr-12 rtl:pl-12" : "ltr:pr-4 rtl:pl-4",
              // Disabled
              "disabled:bg-[#F8F8F8] disabled:text-[#9CA3AF] disabled:cursor-not-allowed",
              className
            )}
            {...props}
          />

          {/* Right icon or error icon */}
          {(rightIcon || error) && (
            <span
              className={cn(
                "absolute top-1/2 -translate-y-1/2 transition-colors duration-200",
                "ltr:right-4 rtl:left-4",
                error ? "text-[#DA291C]" : isFocused ? "text-[#D4AF37]" : "text-[#9CA3AF]"
              )}
            >
              {error ? <AlertCircle size={18} /> : rightIcon}
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

        {/* Error or hint message */}
        <AnimatePresence mode="wait">
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="mt-2 text-sm text-[#DA291C] flex items-center gap-1.5"
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

Input.displayName = "Input";

export default Input;
