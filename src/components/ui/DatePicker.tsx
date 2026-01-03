"use client";

import { forwardRef, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  label?: string;
  value?: Date;
  onChange?: (date: Date) => void;
  placeholder?: string;
  error?: string;
  hint?: string;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  className?: string;
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const DatePicker = forwardRef<HTMLButtonElement, DatePickerProps>(
  (
    {
      label,
      value,
      onChange,
      placeholder = "Select a date",
      error,
      hint,
      minDate,
      maxDate,
      disabled,
      className,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [viewDate, setViewDate] = useState(value || new Date());
    const containerRef = useRef<HTMLDivElement>(null);

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
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const getDaysInMonth = (year: number, month: number) => {
      return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (year: number, month: number) => {
      return new Date(year, month, 1).getDay();
    };

    const isDateDisabled = (date: Date) => {
      if (minDate && date < minDate) return true;
      if (maxDate && date > maxDate) return true;
      return false;
    };

    const isSameDay = (date1: Date, date2: Date) => {
      return (
        date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate()
      );
    };

    const isToday = (date: Date) => {
      return isSameDay(date, new Date());
    };

    const handleDateSelect = (day: number) => {
      const selectedDate = new Date(
        viewDate.getFullYear(),
        viewDate.getMonth(),
        day
      );
      if (!isDateDisabled(selectedDate)) {
        onChange?.(selectedDate);
        setIsOpen(false);
      }
    };

    const navigateMonth = (direction: "prev" | "next") => {
      setViewDate((prev) => {
        const newDate = new Date(prev);
        if (direction === "prev") {
          newDate.setMonth(prev.getMonth() - 1);
        } else {
          newDate.setMonth(prev.getMonth() + 1);
        }
        return newDate;
      });
    };

    const formatDate = (date: Date) => {
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

    const renderCalendarDays = () => {
      const year = viewDate.getFullYear();
      const month = viewDate.getMonth();
      const daysInMonth = getDaysInMonth(year, month);
      const firstDay = getFirstDayOfMonth(year, month);
      const days = [];

      // Empty cells for days before first of month
      for (let i = 0; i < firstDay; i++) {
        days.push(<div key={`empty-${i}`} className="w-9 h-9" />);
      }

      // Days of the month
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const isDisabled = isDateDisabled(date);
        const isSelected = value && isSameDay(date, value);
        const isTodayDate = isToday(date);

        days.push(
          <motion.button
            key={day}
            type="button"
            whileHover={!isDisabled ? { scale: 1.1 } : undefined}
            whileTap={!isDisabled ? { scale: 0.95 } : undefined}
            onClick={() => handleDateSelect(day)}
            disabled={isDisabled}
            className={cn(
              "w-9 h-9 rounded-full",
              "text-sm font-medium",
              "transition-colors duration-150",
              "flex items-center justify-center",
              isSelected
                ? "bg-[#D4AF37] text-[#1A1A1A]"
                : isTodayDate
                ? "border-2 border-[#D4AF37] text-[#1A1A1A]"
                : "text-[#1A1A1A] hover:bg-[#F8F8F8]",
              isDisabled && "opacity-30 cursor-not-allowed hover:bg-transparent"
            )}
          >
            {day}
          </motion.button>
        );
      }

      return days;
    };

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

        {/* Trigger button */}
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
              "text-left",
              value ? "text-[#1A1A1A]" : "text-[#9CA3AF]"
            )}
          >
            {value ? formatDate(value) : placeholder}
          </span>

          <span className="flex items-center gap-2 ltr:ml-2 rtl:mr-2">
            {error && <AlertCircle size={18} className="text-[#DA291C]" />}
            <Calendar
              size={18}
              className={cn(
                "transition-colors duration-200",
                isOpen ? "text-[#D4AF37]" : "text-[#9CA3AF]"
              )}
            />
          </span>
        </button>

        {/* Calendar dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className={cn(
                "absolute z-50 mt-2",
                "bg-white",
                "border border-[#E5E5E5]",
                "rounded-sm",
                "shadow-[0_8px_24px_rgba(0,0,0,0.1)]",
                "p-4",
                "ltr:left-0 rtl:right-0"
              )}
            >
              {/* Calendar header */}
              <div className="flex items-center justify-between mb-4">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => navigateMonth("prev")}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#F8F8F8] text-[#6B7280]"
                >
                  <ChevronLeft size={18} />
                </motion.button>

                <span className="font-medium text-[#1A1A1A]">
                  {MONTHS[viewDate.getMonth()]} {viewDate.getFullYear()}
                </span>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => navigateMonth("next")}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#F8F8F8] text-[#6B7280]"
                >
                  <ChevronRight size={18} />
                </motion.button>
              </div>

              {/* Day headers */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {DAYS.map((day) => (
                  <div
                    key={day}
                    className="w-9 h-9 flex items-center justify-center text-xs font-medium text-[#9CA3AF]"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-1">
                {renderCalendarDays()}
              </div>

              {/* Today button */}
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  const today = new Date();
                  if (!isDateDisabled(today)) {
                    onChange?.(today);
                    setIsOpen(false);
                  }
                }}
                className="w-full mt-4 py-2 text-sm font-medium text-[#D4AF37] hover:bg-[#D4AF37]/10 rounded-sm transition-colors"
              >
                Today
              </motion.button>
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

DatePicker.displayName = "DatePicker";

export default DatePicker;
