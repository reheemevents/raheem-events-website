"use client";

import { forwardRef, ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

type CardBorder = "none" | "subtle" | "gold";
type CardPadding = "none" | "sm" | "md" | "lg";

interface CardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  border?: CardBorder;
  padding?: CardPadding;
  hover?: boolean;
  image?: {
    src: string;
    alt: string;
    aspectRatio?: "square" | "video" | "wide";
  };
  children?: ReactNode;
}

const borders: Record<CardBorder, string> = {
  none: "",
  subtle: "border border-[#E5E5E5]",
  gold: "border border-[#D4AF37]/30 hover:border-[#D4AF37]",
};

const paddings: Record<CardPadding, string> = {
  none: "",
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

const aspectRatios = {
  square: "aspect-square",
  video: "aspect-video",
  wide: "aspect-[21/9]",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      border = "subtle",
      padding = "md",
      hover = true,
      image,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        whileHover={
          hover
            ? {
                y: -8,
                transition: { duration: 0.3, ease: "easeOut" },
              }
            : undefined
        }
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "relative overflow-hidden",
          "bg-white",
          "rounded-sm",
          borders[border],
          // Shadow system - layered for depth
          "shadow-[0_2px_8px_rgba(0,0,0,0.04),0_4px_16px_rgba(0,0,0,0.04)]",
          hover &&
            "hover:shadow-[0_8px_24px_rgba(0,0,0,0.08),0_16px_48px_rgba(0,0,0,0.06)]",
          "transition-shadow duration-300 ease-out",
          className
        )}
        {...props}
      >
        {/* Gold corner accent on hover */}
        {border === "gold" && (
          <>
            <span className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </>
        )}

        {/* Image header */}
        {image && (
          <div
            className={cn(
              "relative overflow-hidden",
              aspectRatios[image.aspectRatio || "video"]
            )}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>
        )}

        {/* Content */}
        <div className={cn(paddings[padding])}>{children}</div>
      </motion.div>
    );
  }
);

Card.displayName = "Card";

// Sub-components for structured content
export const CardHeader = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <div className={cn("mb-4", className)}>
    {children}
  </div>
);

export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <h3
    className={cn(
      "font-heading text-xl font-semibold text-[#1A1A1A] tracking-tight",
      className
    )}
  >
    {children}
  </h3>
);

export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <p className={cn("text-[#6B7280] text-sm leading-relaxed mt-1", className)}>
    {children}
  </p>
);

export const CardContent = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => <div className={cn("", className)}>{children}</div>;

export const CardFooter = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <div className={cn("mt-4 pt-4 border-t border-[#E5E5E5]", className)}>
    {children}
  </div>
);

export default Card;
