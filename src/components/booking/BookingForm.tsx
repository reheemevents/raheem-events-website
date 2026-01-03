"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Calendar,
  Users,
  Building2,
  User,
  Phone,
  Mail,
  FileText,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  CheckCircle2,
  Sparkles,
  Heart,
} from "lucide-react";
import { FormProgress } from "./FormProgress";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import { DatePicker } from "@/components/ui/DatePicker";
import { CONTACT, EVENT_TYPES } from "@/lib/constants";
import { getWhatsAppLink, getPhoneLink, cn } from "@/lib/utils";

interface FormData {
  eventType: string;
  eventDate: Date | undefined;
  guestCount: string;
  venue: string;
  name: string;
  phone: string;
  email: string;
  notes: string;
}

const initialFormData: FormData = {
  eventType: "",
  eventDate: undefined,
  guestCount: "",
  venue: "",
  name: "",
  phone: "",
  email: "",
  notes: "",
};

interface BookingFormProps {
  locale: string;
}

export function BookingForm({ locale }: BookingFormProps) {
  const t = useTranslations("booking");
  const tCommon = useTranslations("common");
  const tCatering = useTranslations("catering");

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const steps = [
    { id: 1, label: t("steps.event") },
    { id: 2, label: t("steps.services") },
    { id: 3, label: t("steps.contact") },
    { id: 4, label: t("steps.confirm") },
  ];

  const eventTypeOptions = [
    { value: "wedding", label: locale === "ur" ? "شادی" : "Wedding" },
    { value: "mehndi", label: locale === "ur" ? "مہندی" : "Mehndi" },
    { value: "barat", label: locale === "ur" ? "بارات" : "Barat" },
    { value: "walima", label: locale === "ur" ? "ولیمہ" : "Walima" },
    { value: "corporate", label: locale === "ur" ? "کارپوریٹ ایونٹ" : "Corporate Event" },
    { value: "birthday", label: locale === "ur" ? "سالگرہ" : "Birthday / Private" },
    { value: "other", label: locale === "ur" ? "دیگر" : "Other" },
  ];

  const venueOptions = [
    { value: "israr", label: t("form.venueOptions.israr") },
    { value: "mumtaz", label: t("form.venueOptions.mumtaz") },
    { value: "catering-only", label: t("form.venueOptions.cateringOnly") },
    { value: "both", label: t("form.venueOptions.both") },
  ];

  const guestOptions = [
    { value: "100-200", label: "100 - 200" },
    { value: "200-300", label: "200 - 300" },
    { value: "300-400", label: "300 - 400" },
    { value: "400-500", label: "400 - 500" },
    { value: "500-600", label: "500 - 600" },
    { value: "600-700", label: "600 - 700" },
    { value: "700+", label: "700+" },
  ];

  const updateFormData = (field: keyof FormData, value: string | Date | undefined) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when field is updated
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (step === 1) {
      if (!formData.eventType) {
        newErrors.eventType = locale === "ur" ? "براہ کرم ایونٹ کی قسم منتخب کریں" : "Please select an event type";
      }
      if (!formData.eventDate) {
        newErrors.eventDate = locale === "ur" ? "براہ کرم تاریخ منتخب کریں" : "Please select a date";
      }
      if (!formData.guestCount) {
        newErrors.guestCount = locale === "ur" ? "براہ کرم مہمانوں کی تعداد منتخب کریں" : "Please select guest count";
      }
    }

    if (step === 2) {
      if (!formData.venue) {
        newErrors.venue = locale === "ur" ? "براہ کرم ویونیو منتخب کریں" : "Please select a venue";
      }
    }

    if (step === 3) {
      if (!formData.name.trim()) {
        newErrors.name = locale === "ur" ? "براہ کرم اپنا نام درج کریں" : "Please enter your name";
      }
      if (!formData.phone.trim()) {
        newErrors.phone = locale === "ur" ? "براہ کرم فون نمبر درج کریں" : "Please enter your phone number";
      }
      if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = locale === "ur" ? "براہ کرم درست ای میل درج کریں" : "Please enter a valid email";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Here you would typically send the data to your backend
    console.log("Form submitted:", formData);

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const getEventTypeName = (value: string) => {
    return eventTypeOptions.find((opt) => opt.value === value)?.label || value;
  };

  const getVenueName = (value: string) => {
    return venueOptions.find((opt) => opt.value === value)?.label || value;
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return "";
    return new Intl.DateTimeFormat(locale === "ur" ? "ur-PK" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  // Step content components
  const Step1EventDetails = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#D4AF37]/10 mb-4">
          <Calendar size={28} className="text-[#D4AF37]" />
        </div>
        <h2 className="font-heading text-2xl font-semibold text-[#1A1A1A] mb-2">
          {t("steps.event")}
        </h2>
        <p className="text-[#6B7280]">
          {locale === "ur"
            ? "آپ کے ایونٹ کے بارے میں بتائیں"
            : "Tell us about your event"}
        </p>
      </div>

      <Select
        label={t("form.eventType")}
        placeholder={t("form.selectEventType")}
        options={eventTypeOptions}
        value={formData.eventType}
        onChange={(value) => updateFormData("eventType", value)}
        error={errors.eventType}
      />

      <DatePicker
        label={t("form.eventDate")}
        value={formData.eventDate}
        onChange={(date) => updateFormData("eventDate", date)}
        minDate={new Date()}
        placeholder={locale === "ur" ? "تاریخ منتخب کریں" : "Select a date"}
        error={errors.eventDate as string}
      />

      <Select
        label={t("form.guestCount")}
        placeholder={locale === "ur" ? "مہمانوں کی تعداد منتخب کریں" : "Select guest count"}
        options={guestOptions}
        value={formData.guestCount}
        onChange={(value) => updateFormData("guestCount", value)}
        error={errors.guestCount}
      />
    </motion.div>
  );

  const Step2Services = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#D4AF37]/10 mb-4">
          <Building2 size={28} className="text-[#D4AF37]" />
        </div>
        <h2 className="font-heading text-2xl font-semibold text-[#1A1A1A] mb-2">
          {t("steps.services")}
        </h2>
        <p className="text-[#6B7280]">
          {locale === "ur"
            ? "اپنی خدمات منتخب کریں"
            : "Choose your services"}
        </p>
      </div>

      <Select
        label={t("form.venue")}
        placeholder={locale === "ur" ? "ویونیو منتخب کریں" : "Select a venue"}
        options={venueOptions}
        value={formData.venue}
        onChange={(value) => updateFormData("venue", value)}
        error={errors.venue}
      />
    </motion.div>
  );

  const Step3Contact = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#D4AF37]/10 mb-4">
          <User size={28} className="text-[#D4AF37]" />
        </div>
        <h2 className="font-heading text-2xl font-semibold text-[#1A1A1A] mb-2">
          {t("steps.contact")}
        </h2>
        <p className="text-[#6B7280]">
          {locale === "ur"
            ? "اپنی رابطے کی معلومات درج کریں"
            : "Enter your contact information"}
        </p>
      </div>

      <Input
        label={t("form.name")}
        placeholder={locale === "ur" ? "اپنا مکمل نام درج کریں" : "Enter your full name"}
        value={formData.name}
        onChange={(e) => updateFormData("name", e.target.value)}
        error={errors.name}
        leftIcon={<User size={18} />}
      />

      <Input
        label={t("form.phone")}
        placeholder={locale === "ur" ? "مثال: 0300 1234567" : "e.g., 0300 1234567"}
        value={formData.phone}
        onChange={(e) => updateFormData("phone", e.target.value)}
        error={errors.phone}
        leftIcon={<Phone size={18} />}
      />

      <Input
        label={`${t("form.email")} (${locale === "ur" ? "اختیاری" : "Optional"})`}
        placeholder={locale === "ur" ? "اپنا ای میل درج کریں" : "Enter your email"}
        value={formData.email}
        onChange={(e) => updateFormData("email", e.target.value)}
        error={errors.email}
        leftIcon={<Mail size={18} />}
      />

      <Textarea
        label={t("form.notes")}
        placeholder={t("form.notesPlaceholder")}
        value={formData.notes}
        onChange={(e) => updateFormData("notes", e.target.value)}
        rows={4}
      />
    </motion.div>
  );

  const Step4Summary = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#D4AF37]/10 mb-4">
          <FileText size={28} className="text-[#D4AF37]" />
        </div>
        <h2 className="font-heading text-2xl font-semibold text-[#1A1A1A] mb-2">
          {t("summary.title")}
        </h2>
        <p className="text-[#6B7280]">
          {locale === "ur"
            ? "اپنی تفصیلات کی تصدیق کریں"
            : "Review your booking details"}
        </p>
      </div>

      <div className="bg-[#FAFAFA] rounded-sm border border-[#E5E5E5] divide-y divide-[#E5E5E5]">
        {/* Event Details */}
        <div className="p-4">
          <h3 className="text-sm font-medium text-[#6B7280] mb-3">
            {t("steps.event")}
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-[#6B7280]">{t("summary.eventType")}</span>
              <span className="font-medium text-[#1A1A1A]">
                {getEventTypeName(formData.eventType)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6B7280]">{t("summary.date")}</span>
              <span className="font-medium text-[#1A1A1A]">
                {formatDate(formData.eventDate)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6B7280]">{t("summary.guests")}</span>
              <span className="font-medium text-[#1A1A1A]">
                {formData.guestCount}
              </span>
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="p-4">
          <h3 className="text-sm font-medium text-[#6B7280] mb-3">
            {t("steps.services")}
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-[#6B7280]">{t("summary.venue")}</span>
              <span className="font-medium text-[#1A1A1A]">
                {getVenueName(formData.venue)}
              </span>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="p-4">
          <h3 className="text-sm font-medium text-[#6B7280] mb-3">
            {t("summary.contact")}
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-[#6B7280]">{t("form.name")}</span>
              <span className="font-medium text-[#1A1A1A]">{formData.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#6B7280]">{t("form.phone")}</span>
              <span className="font-medium text-[#1A1A1A]">{formData.phone}</span>
            </div>
            {formData.email && (
              <div className="flex justify-between">
                <span className="text-[#6B7280]">{t("form.email")}</span>
                <span className="font-medium text-[#1A1A1A]">{formData.email}</span>
              </div>
            )}
          </div>
        </div>

        {/* Notes */}
        {formData.notes && (
          <div className="p-4">
            <h3 className="text-sm font-medium text-[#6B7280] mb-2">
              {t("form.notes")}
            </h3>
            <p className="text-[#1A1A1A] text-sm">{formData.notes}</p>
          </div>
        )}
      </div>
    </motion.div>
  );

  const SuccessState = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-12"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
        className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[#10B981]/10 mb-6"
      >
        <CheckCircle2 size={48} className="text-[#10B981]" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="font-heading text-3xl font-bold text-[#1A1A1A] mb-4">
          {t("success.title")}
        </h2>
        <p className="text-[#6B7280] text-lg mb-8 max-w-md mx-auto">
          {t("success.message")}
        </p>

        <div className="space-y-4">
          <p className="text-[#6B7280]">{t("success.whatsapp")}</p>
          <a
            href={getWhatsAppLink(
              CONTACT.whatsapp,
              locale === "ur"
                ? `السلام علیکم! میں نے ابھی بکنگ انکوائری جمع کی ہے۔ میرا نام ${formData.name} ہے۔`
                : `Hi! I just submitted a booking inquiry. My name is ${formData.name}.`
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="primary"
              leftIcon={<MessageCircle size={18} />}
              className="bg-[#25D366] hover:bg-[#128C7E]"
            >
              {tCommon("whatsapp")}
            </Button>
          </a>
        </div>
      </motion.div>

      {/* Decorative elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -20, opacity: 0 }}
            animate={{
              y: [0, 100],
              opacity: [1, 0],
              x: Math.sin(i) * 50,
            }}
            transition={{
              duration: 2,
              delay: 0.5 + i * 0.1,
              repeat: 0,
            }}
            className="absolute"
            style={{
              left: `${(i / 12) * 100}%`,
              top: 0,
            }}
          >
            {i % 3 === 0 ? (
              <Heart size={16} className="text-[#DA291C]/30" />
            ) : i % 3 === 1 ? (
              <Sparkles size={16} className="text-[#D4AF37]/30" />
            ) : (
              <div className="w-2 h-2 rounded-full bg-[#D4AF37]/30" />
            )}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );

  if (isSuccess) {
    return (
      <div className="relative bg-white rounded-sm border border-[#E5E5E5] shadow-lg overflow-hidden">
        <SuccessState />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-sm border border-[#E5E5E5] shadow-lg overflow-hidden">
      {/* Gold top border */}
      <div className="h-1 bg-gradient-to-r from-[#D4AF37] via-[#E5C453] to-[#D4AF37]" />

      <div className="p-6 md:p-8">
        {/* Progress indicator */}
        <FormProgress steps={steps} currentStep={currentStep} className="mb-12" />

        {/* Form content */}
        <div className="max-w-lg mx-auto">
          <AnimatePresence mode="wait">
            {currentStep === 1 && <Step1EventDetails key="step1" />}
            {currentStep === 2 && <Step2Services key="step2" />}
            {currentStep === 3 && <Step3Contact key="step3" />}
            {currentStep === 4 && <Step4Summary key="step4" />}
          </AnimatePresence>

          {/* Navigation buttons */}
          <div className="flex items-center justify-between mt-10 pt-6 border-t border-[#E5E5E5]">
            <Button
              variant="ghost"
              onClick={prevStep}
              disabled={currentStep === 1}
              leftIcon={<ChevronLeft size={18} className="rtl:rotate-180" />}
              className={cn(
                "transition-opacity",
                currentStep === 1 && "opacity-0 pointer-events-none"
              )}
            >
              {tCommon("previous")}
            </Button>

            {currentStep < 4 ? (
              <Button
                variant="gold"
                onClick={nextStep}
                rightIcon={<ChevronRight size={18} className="rtl:rotate-180" />}
              >
                {tCommon("next")}
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="min-w-[140px]"
              >
                {isSubmitting ? tCommon("sending") : t("submit")}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingForm;
