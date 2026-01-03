import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import { PageHeading, SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import {
  Award,
  Users,
  Heart,
  Sparkles,
  Target,
  Shield,
  Star,
  Calendar,
  ChefHat,
  Building2,
  Phone,
  MessageCircle,
} from "lucide-react";
import { CONTACT } from "@/lib/constants";
import { getWhatsAppLink, getPhoneLink } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });

  return {
    title: `${t("title")} | Raheem Event Management & Catering`,
    description:
      locale === "ur"
        ? "رحیم ایونٹ مینجمنٹ اینڈ کیٹرنگ - 20 سال سے زیادہ عرصے سے یادگار تقریبات بنا رہے ہیں"
        : "Raheem Event Management & Catering - Creating memorable celebrations for over 20 years",
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "about" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  const stats = [
    {
      value: "20+",
      label: locale === "ur" ? "سال کا تجربہ" : "Years Experience",
      icon: Calendar,
    },
    {
      value: "500+",
      label: locale === "ur" ? "تقریبات مکمل" : "Events Completed",
      icon: Star,
    },
    {
      value: "1000+",
      label: locale === "ur" ? "خوش گاہک" : "Happy Clients",
      icon: Users,
    },
    {
      value: "100+",
      label: locale === "ur" ? "مینو آئٹمز" : "Menu Items",
      icon: ChefHat,
    },
  ];

  const values = [
    {
      icon: Star,
      title: t("values.quality"),
      description:
        locale === "ur"
          ? "ہم ہر چیز میں بہترین کوالٹی فراہم کرتے ہیں - کھانے سے لے کر سجاوٹ تک"
          : "We deliver excellence in everything - from food to décor",
    },
    {
      icon: Heart,
      title: t("values.service"),
      description:
        locale === "ur"
          ? "آپ کی خوشی ہماری ترجیح ہے - ہر تقریب کو یادگار بنانا ہمارا مشن ہے"
          : "Your happiness is our priority - making every event memorable is our mission",
    },
    {
      icon: Shield,
      title: t("values.tradition"),
      description:
        locale === "ur"
          ? "پاکستانی روایات اور ثقافت کو ہم اپنے کھانوں اور خدمات میں زندہ رکھتے ہیں"
          : "We keep Pakistani traditions and culture alive in our food and services",
    },
    {
      icon: Sparkles,
      title: t("values.innovation"),
      description:
        locale === "ur"
          ? "جدید انداز اور نئے آئیڈیاز کو اپنانا - ہمیشہ بہتر سے بہتر"
          : "Embracing modern styles and new ideas - always improving",
    },
  ];

  const milestones = [
    {
      year: locale === "ur" ? "۲۰۰۵" : "2005",
      title: locale === "ur" ? "آغاز" : "The Beginning",
      description:
        locale === "ur"
          ? "چھوٹے کیٹرنگ کاروبار کے طور پر شروعات"
          : "Started as a small catering business",
    },
    {
      year: locale === "ur" ? "۲۰۱۰" : "2010",
      title: locale === "ur" ? "اصرار میرج ہال" : "Israr Marriage Hall",
      description:
        locale === "ur"
          ? "پہلا ویونیو کھولا - اصرار میرج ہال"
          : "Opened our first venue - Israr Marriage Hall",
    },
    {
      year: locale === "ur" ? "۲۰۱۵" : "2015",
      title: locale === "ur" ? "۵۰۰+ ایونٹس" : "500+ Events",
      description:
        locale === "ur"
          ? "۵۰۰ سے زیادہ کامیاب تقریبات مکمل کیں"
          : "Completed more than 500 successful events",
    },
    {
      year: locale === "ur" ? "۲۰۱۸" : "2018",
      title: locale === "ur" ? "ممتاز بینکوئٹ ہال" : "Mumtaz Banquet Hall",
      description:
        locale === "ur"
          ? "دوسرا ویونیو کھولا - ممتاز بینکوئٹ ہال"
          : "Opened our second venue - Mumtaz Banquet Hall",
    },
    {
      year: locale === "ur" ? "۲۰۲۵" : "2025",
      title: locale === "ur" ? "۲۰ سال مکمل" : "20 Years Complete",
      description:
        locale === "ur"
          ? "خدمات کے ۲۰ سال مکمل - ہزاروں خوش گاہک"
          : "20 years of excellence - thousands of happy clients",
    },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAFAFA]">
        {/* Hero section */}
        <section className="relative bg-[#1A1A1A] pt-32 pb-20 overflow-hidden">
          {/* Background pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          {/* Decorative circles */}
          <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-[#D4AF37]/5 blur-3xl" />
          <div className="absolute bottom-20 left-20 w-48 h-48 rounded-full bg-[#DA291C]/5 blur-3xl" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/20 rounded-full mb-6">
              <Award size={16} className="text-[#D4AF37]" />
              <span className="text-[#D4AF37] text-sm font-medium">
                {locale === "ur" ? "۲۰+ سال کا تجربہ" : "20+ Years of Excellence"}
              </span>
            </div>

            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              {t("title")}
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              {t("subtitle")}
            </p>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
        </section>

        {/* Stats section */}
        <section className="py-12 bg-white border-b border-[#E5E5E5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#D4AF37]/10 mb-3">
                    <stat.icon size={24} className="text-[#D4AF37]" />
                  </div>
                  <div className="font-heading text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-1">
                    {stat.value}
                  </div>
                  <div className="text-[#6B7280]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story section */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Image */}
              <div className="relative">
                <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A] to-[#2D2D2D]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Building2 size={80} className="text-[#D4AF37]/30" />
                  </div>
                </div>
                {/* Corner decorations */}
                <div className="absolute -top-4 -left-4 w-16 h-16 border-t-2 border-l-2 border-[#D4AF37]" />
                <div className="absolute -bottom-4 -right-4 w-16 h-16 border-b-2 border-r-2 border-[#D4AF37]" />

                {/* Floating badge */}
                <div className="absolute -bottom-6 ltr:-right-6 rtl:-left-6 bg-[#DA291C] text-white px-6 py-4 rounded-sm shadow-lg">
                  <div className="font-heading text-2xl font-bold">20+</div>
                  <div className="text-sm text-white/80">
                    {locale === "ur" ? "سال" : "Years"}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div>
                <span className="inline-block px-4 py-1 bg-[#D4AF37]/10 text-[#B8962E] text-sm font-medium rounded-full mb-4">
                  {t("story.title")}
                </span>
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">
                  {locale === "ur"
                    ? "یادگار تقریبات بنانا ہمارا جذبہ ہے"
                    : "Creating Memorable Celebrations is Our Passion"}
                </h2>
                <p className="text-[#6B7280] leading-relaxed text-lg mb-6">
                  {t("story.content")}
                </p>
                <p className="text-[#6B7280] leading-relaxed mb-8">
                  {locale === "ur"
                    ? "آج ہم فخر سے کہہ سکتے ہیں کہ ہم نے ہزاروں خاندانوں کو ان کی خاص تقریبات میں خدمات فراہم کی ہیں۔ ہماری کوشش ہے کہ ہر ایونٹ کو یادگار بنائیں اور آپ کی توقعات سے بڑھ کر خدمات فراہم کریں۔"
                    : "Today we can proudly say that we have served thousands of families on their special occasions. Our goal is to make every event memorable and exceed your expectations."}
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link href="/venues">
                    <Button variant="gold" leftIcon={<Building2 size={18} />}>
                      {locale === "ur" ? "ہمارے ویونیوز دیکھیں" : "View Our Venues"}
                    </Button>
                  </Link>
                  <Link href="/menu">
                    <Button variant="outline" leftIcon={<ChefHat size={18} />}>
                      {locale === "ur" ? "مینو دیکھیں" : "Explore Menu"}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission section */}
        <section className="py-16 md:py-24 bg-[#1A1A1A] text-white relative overflow-hidden">
          {/* Background pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#D4AF37]/20 mb-6">
                <Target size={32} className="text-[#D4AF37]" />
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                {t("mission.title")}
              </h2>
              <p className="text-xl text-white/80 leading-relaxed mb-8">
                {t("mission.content")}
              </p>

              {/* Quote decoration */}
              <div className="relative inline-block">
                <div className="absolute -top-4 -left-6 text-6xl text-[#D4AF37]/30 font-serif">
                  "
                </div>
                <p className="text-[#D4AF37] text-lg italic">
                  {locale === "ur"
                    ? "ہر تقریب ایک کہانی ہے، اور ہم اسے یادگار بنانے کے لیے یہاں ہیں"
                    : "Every event is a story, and we're here to make it memorable"}
                </p>
                <div className="absolute -bottom-4 -right-6 text-6xl text-[#D4AF37]/30 font-serif">
                  "
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values section */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title={t("values.title")}
              subtitle={
                locale === "ur"
                  ? "یہ اصول ہمیں ہر روز بہتر بناتے ہیں"
                  : "These principles guide us every day"
              }
              align="center"
              decorationStyle="underline"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="group bg-white p-6 rounded-sm border border-[#E5E5E5] hover:border-[#D4AF37] hover:shadow-lg transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mb-4 group-hover:bg-[#D4AF37] transition-colors duration-300">
                    <value.icon
                      size={24}
                      className="text-[#D4AF37] group-hover:text-white transition-colors duration-300"
                    />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-[#1A1A1A] mb-3">
                    {value.title}
                  </h3>
                  <p className="text-[#6B7280] leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title={locale === "ur" ? "ہمارا سفر" : "Our Journey"}
              subtitle={
                locale === "ur"
                  ? "سالوں کا تجربہ، لاکھوں یادیں"
                  : "Years of experience, millions of memories"
              }
              align="center"
              decorationStyle="underline"
            />

            <div className="relative mt-12">
              {/* Timeline line */}
              <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-[#E5E5E5] -translate-x-1/2 hidden md:block" />

              <div className="space-y-8 md:space-y-0">
                {milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className={`relative flex flex-col md:flex-row items-center ${
                      index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                  >
                    {/* Content */}
                    <div
                      className={`w-full md:w-1/2 ${
                        index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                      }`}
                    >
                      <div className="bg-[#FAFAFA] p-6 rounded-sm border border-[#E5E5E5] md:inline-block">
                        <span className="inline-block px-3 py-1 bg-[#D4AF37] text-white text-sm font-bold rounded-sm mb-3">
                          {milestone.year}
                        </span>
                        <h3 className="font-heading text-xl font-semibold text-[#1A1A1A] mb-2">
                          {milestone.title}
                        </h3>
                        <p className="text-[#6B7280]">{milestone.description}</p>
                      </div>
                    </div>

                    {/* Center dot */}
                    <div className="absolute left-1/2 w-4 h-4 bg-[#D4AF37] rounded-full -translate-x-1/2 border-4 border-white shadow hidden md:block" />

                    {/* Spacer */}
                    <div className="w-full md:w-1/2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-[#1A1A1A] to-[#2D2D2D] text-white relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-[#D4AF37]/30" />
          <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-[#D4AF37]/30" />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              {locale === "ur"
                ? "آئیے مل کر آپ کی تقریب کو یادگار بنائیں"
                : "Let's Make Your Event Unforgettable"}
            </h2>
            <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
              {locale === "ur"
                ? "ابھی رابطہ کریں اور اپنی خاص تقریب کے لیے ہماری خدمات کے بارے میں جانیں"
                : "Contact us today and learn about our services for your special occasion"}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={getWhatsAppLink(CONTACT.whatsapp)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="primary"
                  size="lg"
                  leftIcon={<MessageCircle size={20} />}
                  className="bg-[#25D366] hover:bg-[#128C7E] shadow-lg shadow-[#25D366]/30"
                >
                  {tCommon("whatsapp")}
                </Button>
              </a>
              <a href={getPhoneLink(CONTACT.phone)}>
                <Button
                  variant="outline"
                  size="lg"
                  leftIcon={<Phone size={20} />}
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  {tCommon("callNow")}
                </Button>
              </a>
              <Link href="/book-now">
                <Button variant="gold" size="lg">
                  {tCommon("bookNow")}
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
