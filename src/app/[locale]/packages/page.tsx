import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import { PageHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Check, Crown, MessageCircle, Phone } from "lucide-react";
import { CONTACT } from "@/lib/constants";
import { getWhatsAppLink, getPhoneLink } from "@/lib/utils";

const packages = [
  {
    id: "silver",
    price: "1,200",
    features: {
      en: [
        "Standard menu selection (5 items)",
        "Basic stage decoration",
        "Standard seating arrangements",
        "6 professional service staff",
        "Basic lighting setup",
        "Sound system",
        "Generator backup",
      ],
      ur: [
        "معیاری مینو (5 آئٹمز)",
        "بنیادی اسٹیج سجاوٹ",
        "معیاری بیٹھنے کا انتظام",
        "6 پیشہ ور سروس سٹاف",
        "بنیادی لائٹنگ سیٹ اپ",
        "ساؤنڈ سسٹم",
        "جنریٹر بیک اپ",
      ],
    },
    color: "from-slate-300 to-slate-400",
    bgColor: "bg-slate-50",
  },
  {
    id: "gold",
    price: "1,800",
    popular: true,
    features: {
      en: [
        "Premium menu selection (8 items)",
        "Enhanced stage decoration",
        "Premium seating arrangements",
        "10 professional service staff",
        "Ambient lighting setup",
        "Premium sound system",
        "Live cooking station",
        "Fresh flower arrangements",
        "Dedicated coordinator",
      ],
      ur: [
        "پریمیم مینو (8 آئٹمز)",
        "بہتر اسٹیج سجاوٹ",
        "پریمیم بیٹھنے کا انتظام",
        "10 پیشہ ور سروس سٹاف",
        "ماحولیاتی لائٹنگ",
        "پریمیم ساؤنڈ سسٹم",
        "لائیو کوکنگ سٹیشن",
        "تازہ پھول کی سجاوٹ",
        "مخصوص کوآرڈینیٹر",
      ],
    },
    color: "from-[#D4AF37] to-[#E5C453]",
    bgColor: "bg-[#D4AF37]/5",
  },
  {
    id: "platinum",
    price: "2,500",
    features: {
      en: [
        "Luxury menu selection (12+ items)",
        "Premium stage decoration",
        "VIP seating arrangements",
        "15 professional service staff",
        "Designer lighting setup",
        "Premium sound system with DJ",
        "Multiple live cooking stations",
        "Premium flower arrangements",
        "Dedicated event manager",
        "Photography arrangements",
        "Car parking valet service",
        "Bridal room with amenities",
      ],
      ur: [
        "لگژری مینو (12+ آئٹمز)",
        "پریمیم اسٹیج سجاوٹ",
        "وی آئی پی بیٹھنے کا انتظام",
        "15 پیشہ ور سروس سٹاف",
        "ڈیزائنر لائٹنگ",
        "پریمیم ساؤنڈ سسٹم مع ڈی جے",
        "متعدد لائیو کوکنگ سٹیشنز",
        "پریمیم پھول کی سجاوٹ",
        "مخصوص ایونٹ مینیجر",
        "فوٹوگرافی کا انتظام",
        "کار پارکنگ ویلٹ سروس",
        "دلہن کا کمرہ مع سہولیات",
      ],
    },
    color: "from-slate-600 to-slate-800",
    bgColor: "bg-slate-50",
  },
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "packages" });

  return {
    title: `${t("title")} | Raheem Event Management & Catering`,
    description:
      locale === "ur"
        ? "ہماری شادی پیکجز دیکھیں - سلور، گولڈ اور پلیٹینم"
        : "Explore our wedding packages - Silver, Gold and Platinum options",
  };
}

export default async function PackagesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "packages" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  const whatsappMessage =
    locale === "ur"
      ? "السلام علیکم! میں شادی پیکجز کے بارے میں معلومات چاہتا/چاہتی ہوں۔"
      : "Hi! I would like to inquire about wedding packages.";

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAFAFA]">
        {/* Hero section */}
        <section className="relative bg-[#1A1A1A] pt-32 pb-16">
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <PageHeading
              title={t("title")}
              subtitle={t("subtitle")}
              className="[&_h1]:text-white [&_p]:text-white/70"
            />
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
        </section>

        {/* Packages grid */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {packages.map((pkg) => {
                const features =
                  locale === "ur" ? pkg.features.ur : pkg.features.en;

                return (
                  <div
                    key={pkg.id}
                    className={`relative ${pkg.popular ? "md:-mt-4 md:mb-4" : ""}`}
                  >
                    {/* Popular badge */}
                    {pkg.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                        <div className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-[#D4AF37] to-[#E5C453] rounded-full shadow-lg">
                          <Crown size={14} className="text-[#1A1A1A]" />
                          <span className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider">
                            {t("popular")}
                          </span>
                        </div>
                      </div>
                    )}

                    <div
                      className={`h-full bg-white rounded-sm overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] transition-all duration-500 flex flex-col ${
                        pkg.popular ? "ring-2 ring-[#D4AF37]" : ""
                      }`}
                    >
                      {/* Header */}
                      <div
                        className={`relative p-8 bg-gradient-to-br ${pkg.color}`}
                      >
                        <div
                          className="absolute inset-0 opacity-10"
                          style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M0 0h10v10H0V0zm10 10h10v10H10V10z'/%3E%3C/g%3E%3C/svg%3E")`,
                          }}
                        />

                        <div className="relative text-center">
                          <h3
                            className={`font-heading text-2xl font-bold mb-2 uppercase tracking-wider ${
                              pkg.id === "platinum"
                                ? "text-white"
                                : "text-[#1A1A1A]"
                            }`}
                          >
                            {t(pkg.id)}
                          </h3>
                          <div
                            className={`text-sm ${
                              pkg.id === "platinum"
                                ? "text-white/80"
                                : "text-[#1A1A1A]/70"
                            }`}
                          >
                            {t("startingFrom")}
                          </div>
                          <div
                            className={`font-heading text-4xl font-bold mt-2 ${
                              pkg.id === "platinum"
                                ? "text-white"
                                : "text-[#1A1A1A]"
                            }`}
                          >
                            PKR {pkg.price}
                            <span className="text-lg font-normal">
                              /{t("perHead")}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Features */}
                      <div className="flex-1 p-6">
                        <p className="text-sm text-[#6B7280] mb-4 font-medium">
                          {t("includes")}:
                        </p>
                        <ul className="space-y-3">
                          {features.map((feature, index) => (
                            <li
                              key={index}
                              className="flex items-start gap-3"
                            >
                              <span
                                className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                                  pkg.popular
                                    ? "bg-[#D4AF37]/20"
                                    : "bg-[#1A1A1A]/10"
                                }`}
                              >
                                <Check
                                  size={12}
                                  className={
                                    pkg.popular
                                      ? "text-[#D4AF37]"
                                      : "text-[#1A1A1A]"
                                  }
                                />
                              </span>
                              <span className="text-[#4A4A4A] text-sm">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* CTA */}
                      <div className="p-6 pt-0">
                        <Link href="/book-now" className="block">
                          <Button
                            variant={pkg.popular ? "gold" : "secondary"}
                            fullWidth
                          >
                            {t("customQuote")}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-16 bg-[#1A1A1A]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              {locale === "ur"
                ? "اپنی مرضی کے مطابق پیکج چاہتے ہیں؟"
                : "Need a Custom Package?"}
            </h2>
            <p className="text-white/70 mb-8 text-lg">
              {locale === "ur"
                ? "ہم آپ کی ضروریات کے مطابق خصوصی پیکج بنا سکتے ہیں"
                : "We can create a custom package tailored to your specific needs"}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={getWhatsAppLink(CONTACT.whatsapp, whatsappMessage)}
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
              <a href={getPhoneLink(CONTACT.phone)}>
                <Button variant="outline" leftIcon={<Phone size={18} />}>
                  {tCommon("callNow")}
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
