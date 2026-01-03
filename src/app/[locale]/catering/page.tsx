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
  UtensilsCrossed,
  ChefHat,
  Users,
  Star,
  Heart,
  Sparkles,
  MessageCircle,
  Phone,
  CheckCircle2,
  Award,
  Shield,
  Flame,
  Cookie,
  Coffee,
  ArrowRight,
} from "lucide-react";
import { CONTACT } from "@/lib/constants";
import { getWhatsAppLink, getPhoneLink } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "catering" });

  return {
    title: `${t("title")} | Raheem Event Management & Catering`,
    description:
      locale === "ur"
        ? "شادی، مہندی، ولیمہ اور کارپوریٹ ایونٹس کے لیے بہترین کیٹرنگ سروسز - پاکستانی، بی بی کیو، چائنیز، کانٹی نینٹل"
        : "Premium catering services for weddings, mehndi, walima and corporate events - Pakistani, BBQ, Chinese, Continental",
  };
}

export default async function CateringPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "catering" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  const eventTypes = [
    {
      id: "wedding",
      icon: Heart,
      title: t("eventTypes.wedding"),
      description:
        locale === "ur"
          ? "شادی کے لیے مکمل کیٹرنگ - روایتی پاکستانی ذائقے"
          : "Complete wedding catering - traditional Pakistani flavors",
      image: "/images/events/wedding.jpg",
    },
    {
      id: "mehndi",
      icon: Sparkles,
      title: t("eventTypes.mehndi"),
      description:
        locale === "ur"
          ? "مہندی کی رات کے لیے خصوصی مینو"
          : "Special menu for mehndi nights",
      image: "/images/events/mehndi.jpg",
    },
    {
      id: "barat",
      icon: Star,
      title: t("eventTypes.barat"),
      description:
        locale === "ur"
          ? "بارات کے لیے شاندار کھانے"
          : "Grand feast for barat ceremonies",
      image: "/images/events/barat.jpg",
    },
    {
      id: "walima",
      icon: UtensilsCrossed,
      title: t("eventTypes.walima"),
      description:
        locale === "ur"
          ? "ولیمہ کے لیے مزیدار پکوان"
          : "Delicious dishes for walima reception",
      image: "/images/events/walima.jpg",
    },
    {
      id: "corporate",
      icon: Users,
      title: t("eventTypes.corporate"),
      description:
        locale === "ur"
          ? "کارپوریٹ ایونٹس کے لیے پروفیشنل کیٹرنگ"
          : "Professional catering for corporate events",
      image: "/images/events/corporate.jpg",
    },
    {
      id: "birthday",
      icon: Cookie,
      title: t("eventTypes.birthday"),
      description:
        locale === "ur"
          ? "سالگرہ اور نجی تقریبات کے لیے"
          : "For birthdays and private celebrations",
      image: "/images/events/birthday.jpg",
    },
  ];

  const cuisines = [
    {
      id: "pakistani",
      title: t("cuisines.pakistani"),
      icon: UtensilsCrossed,
      color: "#DA291C",
      items: locale === "ur"
        ? ["بریانی", "قورمہ", "کراہی", "نہاری", "حلیم"]
        : ["Biryani", "Qorma", "Karahi", "Nihari", "Haleem"],
    },
    {
      id: "bbq",
      title: t("cuisines.bbq"),
      icon: Flame,
      color: "#D4AF37",
      items: locale === "ur"
        ? ["چکن تکہ", "سیخ کباب", "ملائی بوٹی", "چپ سٹیک"]
        : ["Chicken Tikka", "Seekh Kebab", "Malai Boti", "Chapli Kebab"],
    },
    {
      id: "continental",
      title: t("cuisines.continental"),
      icon: ChefHat,
      color: "#1A1A1A",
      items: locale === "ur"
        ? ["پاستا", "سٹیک", "سوپ", "سلاد"]
        : ["Pasta", "Steak", "Soup", "Salad"],
    },
    {
      id: "chinese",
      title: t("cuisines.chinese"),
      icon: Coffee,
      color: "#10B981",
      items: locale === "ur"
        ? ["فرائڈ رائس", "مانچورین", "چاو میں", "سپرنگ رول"]
        : ["Fried Rice", "Manchurian", "Chow Mein", "Spring Roll"],
    },
  ];

  const hygienePoints = [
    {
      icon: Shield,
      title: locale === "ur" ? "تازہ اجزاء" : "Fresh Ingredients",
      description:
        locale === "ur"
          ? "روزانہ تازہ اجزاء اور سبزیاں"
          : "Daily fresh ingredients and vegetables",
    },
    {
      icon: Users,
      title: locale === "ur" ? "پیشہ ور سٹاف" : "Professional Staff",
      description:
        locale === "ur"
          ? "تربیت یافتہ شیفز اور کچن سٹاف"
          : "Trained chefs and kitchen staff",
    },
    {
      icon: CheckCircle2,
      title: locale === "ur" ? "صفائی پروٹوکول" : "Hygiene Protocols",
      description:
        locale === "ur"
          ? "سخت صفائی اور حفظان صحت کے معیار"
          : "Strict cleanliness and sanitation standards",
    },
    {
      icon: Award,
      title: locale === "ur" ? "کوالٹی اشورینس" : "Quality Assurance",
      description:
        locale === "ur"
          ? "ہر قدم پر کوالٹی کی جانچ"
          : "Quality checks at every step",
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

          {/* Decorative blurs */}
          <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-[#DA291C]/10 blur-3xl" />
          <div className="absolute bottom-20 left-20 w-48 h-48 rounded-full bg-[#D4AF37]/10 blur-3xl" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/20 rounded-full mb-6">
                <ChefHat size={16} className="text-[#D4AF37]" />
                <span className="text-[#D4AF37] text-sm font-medium">
                  {locale === "ur" ? "۱۰۰+ مینو آئٹمز" : "100+ Menu Items"}
                </span>
              </div>

              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                {t("title")}
              </h1>
              <p className="text-xl text-white/70 max-w-2xl mx-auto mb-10">
                {t("subtitle")}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/menu">
                  <Button variant="gold" size="lg" leftIcon={<UtensilsCrossed size={18} />}>
                    {locale === "ur" ? "مینو دیکھیں" : "View Full Menu"}
                  </Button>
                </Link>
                <a
                  href={getWhatsAppLink(CONTACT.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    size="lg"
                    leftIcon={<MessageCircle size={18} />}
                    className="border-white/30 text-white hover:bg-white/10"
                  >
                    {locale === "ur" ? "ابھی رابطہ کریں" : "Inquire Now"}
                  </Button>
                </a>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
        </section>

        {/* Event Types section */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title={t("eventTypes.title")}
              subtitle={
                locale === "ur"
                  ? "ہر قسم کی تقریب کے لیے خصوصی مینو"
                  : "Specialized menus for every type of celebration"
              }
              align="center"
              decorationStyle="line"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {eventTypes.map((event, index) => (
                <div
                  key={event.id}
                  className="group bg-white rounded-sm border border-[#E5E5E5] overflow-hidden hover:border-[#D4AF37] hover:shadow-xl transition-all duration-300"
                >
                  {/* Image placeholder */}
                  <div className="relative h-48 bg-gradient-to-br from-[#1A1A1A] to-[#2D2D2D] overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <event.icon size={48} className="text-[#D4AF37]/30" />
                    </div>
                    {/* Overlay on hover */}
                    <div className="absolute inset-0 bg-[#D4AF37]/0 group-hover:bg-[#D4AF37]/10 transition-colors duration-300" />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                        <event.icon size={20} className="text-[#D4AF37]" />
                      </span>
                      <h3 className="font-heading text-xl font-semibold text-[#1A1A1A]">
                        {event.title}
                      </h3>
                    </div>
                    <p className="text-[#6B7280]">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cuisines section */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title={t("cuisines.title")}
              subtitle={
                locale === "ur"
                  ? "مختلف ذائقوں کی دنیا - آپ کی پسند کے مطابق"
                  : "A world of flavors - tailored to your taste"
              }
              align="center"
              decorationStyle="line"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {cuisines.map((cuisine, index) => (
                <div
                  key={cuisine.id}
                  className="group relative bg-[#FAFAFA] rounded-sm p-6 border border-[#E5E5E5] hover:border-[#D4AF37] transition-all duration-300"
                >
                  {/* Top color bar */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1 rounded-t-sm"
                    style={{ backgroundColor: cuisine.color }}
                  />

                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${cuisine.color}20` }}
                  >
                    <cuisine.icon size={24} style={{ color: cuisine.color }} />
                  </div>

                  <h3 className="font-heading text-xl font-semibold text-[#1A1A1A] mb-4">
                    {cuisine.title}
                  </h3>

                  <ul className="space-y-2">
                    {cuisine.items.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-[#6B7280]">
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: cuisine.color }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/menu"
                    className="inline-flex items-center gap-1 mt-4 text-sm font-medium hover:gap-2 transition-all"
                    style={{ color: cuisine.color }}
                  >
                    {locale === "ur" ? "مزید دیکھیں" : "View More"}
                    <ArrowRight size={14} className="rtl:rotate-180" />
                  </Link>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/menu">
                <Button variant="gold" size="lg">
                  {locale === "ur" ? "مکمل مینو دیکھیں" : "View Complete Menu"}
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Hygiene section */}
        <section className="py-16 md:py-24 bg-[#1A1A1A] text-white relative overflow-hidden">
          {/* Background pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#D4AF37]/20 mb-6">
                <Shield size={32} className="text-[#D4AF37]" />
              </div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                {t("hygiene.title")}
              </h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                {t("hygiene.subtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {hygienePoints.map((point, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-sm p-6 border border-white/10 hover:border-[#D4AF37]/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mb-4">
                    <point.icon size={24} className="text-[#D4AF37]" />
                  </div>
                  <h3 className="font-heading text-lg font-semibold mb-2">
                    {point.title}
                  </h3>
                  <p className="text-white/60 text-sm">{point.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Custom Menu CTA section */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative bg-gradient-to-br from-[#D4AF37] to-[#B8962E] rounded-sm overflow-hidden">
              {/* Pattern overlay */}
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFFFFF' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              />

              <div className="relative px-8 py-12 md:px-16 md:py-16 text-center">
                <ChefHat size={48} className="mx-auto mb-6 text-white/80" />
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
                  {t("customMenu.title")}
                </h2>
                <p className="text-xl text-white/80 max-w-2xl mx-auto mb-8">
                  {t("customMenu.description")}
                </p>
                <a
                  href={getWhatsAppLink(
                    CONTACT.whatsapp,
                    locale === "ur"
                      ? "السلام علیکم! میں حسب ضرورت مینو کے بارے میں بات کرنا چاہتا/چاہتی ہوں۔"
                      : "Hi! I would like to discuss a custom menu for my event."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="primary"
                    size="lg"
                    leftIcon={<MessageCircle size={18} />}
                    className="bg-white text-[#D4AF37] hover:bg-white/90"
                  >
                    {t("customMenu.button")}
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-6">
              {locale === "ur"
                ? "اپنی تقریب کے لیے کیٹرنگ بک کریں"
                : "Book Catering for Your Event"}
            </h2>
            <p className="text-xl text-[#6B7280] mb-10">
              {locale === "ur"
                ? "ابھی رابطہ کریں اور اپنی ضروریات کے بارے میں بات کریں"
                : "Contact us now and discuss your requirements"}
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
