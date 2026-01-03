"use client";

import { forwardRef, ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "gold" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "size" | "children"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  children?: ReactNode;
}

const variants: Record<ButtonVariant, string> = {
  primary: `
    bg-[#DA291C] text-white
    hover:bg-[#B82318]
    shadow-[0_4px_14px_rgba(218,41,28,0.25)]
    hover:shadow-[0_6px_20px_rgba(218,41,28,0.35)]
  `,
  secondary: `
    bg-[#1A1A1A] text-white
    hover:bg-[#2D2D2D]
    shadow-[0_4px_14px_rgba(0,0,0,0.15)]
    hover:shadow-[0_6px_20px_rgba(0,0,0,0.25)]
  `,
  outline: `
    bg-transparent text-[#DA291C]
    border-2 border-[#DA291C]
    hover:bg-[#DA291C] hover:text-white
  `,
  gold: `
    bg-gradient-to-r from-[#D4AF37] via-[#E5C453] to-[#D4AF37]
    text-[#1A1A1A] font-semibold
    shadow-[0_4px_14px_rgba(212,175,55,0.3)]
    hover:shadow-[0_6px_20px_rgba(212,175,55,0.45)]
    hover:from-[#E5C453] hover:via-[#D4AF37] hover:to-[#E5C453]
  `,
  ghost: `
    bg-transparent text-[#1A1A1A]
    hover:bg-[#1A1A1A]/5
  `,
};

const sizes: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm gap-1.5",
  md: "px-6 py-3 text-base gap-2",
  lg: "px-8 py-4 text-lg gap-2.5",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      fullWidth = false,
      className,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
        transition={{ duration: 0.2 }}
        disabled={disabled || isLoading}
        className={cn(
          // Base styles
          "relative inline-flex items-center justify-center",
          "font-medium tracking-wide",
          "rounded-sm",
          "transition-all duration-300 ease-out",
          "focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 focus:ring-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",
          // Variant & size
          variants[variant],
          sizes[size],
          // Full width
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {/* Shimmer effect for gold variant */}
        {variant === "gold" && (
          <span className="absolute inset-0 overflow-hidden rounded-sm">
            <span className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </span>
        )}

        {/* Loading spinner */}
        {isLoading && (
          <Loader2 className="absolute animate-spin" size={size === "sm" ? 14 : size === "md" ? 18 : 22} />
        )}

        {/* Content */}
        <span
          className={cn(
            "inline-flex items-center justify-center",
            sizes[size].split(" ").find((s) => s.startsWith("gap")),
            isLoading && "invisible"
          )}
        >
          {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
        </span>
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export default Button;
