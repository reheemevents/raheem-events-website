"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: number;
  label: string;
}

interface FormProgressProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

export function FormProgress({ steps, currentStep, className }: FormProgressProps) {
  return (
    <div className={cn("w-full", className)}>
      {/* Desktop Progress */}
      <div className="hidden md:flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;

          return (
            <div key={step.id} className="flex items-center flex-1">
              {/* Step circle */}
              <div className="relative flex flex-col items-center">
                <motion.div
                  initial={false}
                  animate={{
                    scale: isCurrent ? 1.1 : 1,
                    backgroundColor: isCompleted
                      ? "#D4AF37"
                      : isCurrent
                      ? "#1A1A1A"
                      : "#E5E5E5",
                  }}
                  className={cn(
                    "relative z-10 w-10 h-10 rounded-full flex items-center justify-center",
                    "border-2 transition-colors duration-300",
                    isCompleted
                      ? "border-[#D4AF37] bg-[#D4AF37]"
                      : isCurrent
                      ? "border-[#D4AF37] bg-[#1A1A1A]"
                      : "border-[#E5E5E5] bg-white"
                  )}
                >
                  {isCompleted ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Check size={18} className="text-white" />
                    </motion.div>
                  ) : (
                    <span
                      className={cn(
                        "text-sm font-semibold",
                        isCurrent ? "text-[#D4AF37]" : "text-[#9CA3AF]"
                      )}
                    >
                      {step.id}
                    </span>
                  )}
                </motion.div>

                {/* Step label */}
                <motion.span
                  initial={false}
                  animate={{
                    color: isCompleted || isCurrent ? "#1A1A1A" : "#9CA3AF",
                  }}
                  className={cn(
                    "absolute -bottom-7 whitespace-nowrap text-sm font-medium"
                  )}
                >
                  {step.label}
                </motion.span>
              </div>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="flex-1 h-[2px] mx-4 bg-[#E5E5E5] relative overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: isCompleted ? "100%" : "0%" }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-y-0 left-0 bg-[#D4AF37]"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile Progress */}
      <div className="md:hidden">
        {/* Progress bar */}
        <div className="h-2 bg-[#E5E5E5] rounded-full overflow-hidden mb-4">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.4 }}
            className="h-full bg-gradient-to-r from-[#D4AF37] to-[#E5C453] rounded-full"
          />
        </div>

        {/* Current step info */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#6B7280]">
            Step {currentStep} of {steps.length}
          </span>
          <span className="font-medium text-[#1A1A1A]">
            {steps.find((s) => s.id === currentStep)?.label}
          </span>
        </div>
      </div>
    </div>
  );
}

export default FormProgress;
