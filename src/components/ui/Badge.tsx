"use client";

import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "success" | "warning" | "gold" | "outline" | "red";
type BadgeSize = "sm" | "md";

interface BadgeProps {
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
  children: React.ReactNode;
}

const variants: Record<BadgeVariant, string> = {
  default: "bg-[#1A1A1A] text-white",
  success: "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20",
  warning: "bg-amber-500/10 text-amber-600 border border-amber-500/20",
  gold: "bg-[#D4AF37]/10 text-[#B8962E] border border-[#D4AF37]/30",
  outline: "bg-transparent text-[#1A1A1A] border border-[#E5E5E5]",
  red: "bg-[#DA291C]/10 text-[#DA291C] border border-[#DA291C]/20",
};

const sizes: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
};

export function Badge({
  variant = "default",
  size = "sm",
  className,
  children,
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center",
        "font-medium",
        "rounded-sm",
        "whitespace-nowrap",
        "tracking-wide",
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}

// Specialized badge for "Popular" / "Bestseller" tags
export function PopularBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1",
        "px-2.5 py-1 text-xs font-semibold",
        "bg-gradient-to-r from-[#D4AF37] to-[#E5C453]",
        "text-[#1A1A1A]",
        "rounded-sm",
        "shadow-[0_2px_8px_rgba(212,175,55,0.3)]",
        className
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A] animate-pulse" />
      Popular
    </span>
  );
}

// Package tier badges with distinct styling
export function TierBadge({
  tier,
  className,
}: {
  tier: "silver" | "gold" | "platinum";
  className?: string;
}) {
  const tierStyles = {
    silver: "bg-gradient-to-r from-slate-300 to-slate-400 text-slate-800",
    gold: "bg-gradient-to-r from-[#D4AF37] to-[#E5C453] text-[#1A1A1A]",
    platinum: "bg-gradient-to-r from-slate-600 to-slate-800 text-white",
  };

  const tierLabels = {
    silver: "Silver",
    gold: "Gold",
    platinum: "Platinum",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center",
        "px-3 py-1 text-sm font-semibold uppercase tracking-wider",
        "rounded-sm",
        tierStyles[tier],
        className
      )}
    >
      {tierLabels[tier]}
    </span>
  );
}

export default Badge;
