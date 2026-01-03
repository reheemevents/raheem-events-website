import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import { PageHeading } from "@/components/ui/SectionHeading";
import { BookingForm } from "@/components/booking";
import { Phone, MessageCircle, Clock, Shield, Star } from "lucide-react";
import { CONTACT } from "@/lib/constants";
import { getWhatsAppLink, getPhoneLink } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "booking" });

  return {
    title: `${t("title")} | Raheem Event Management & Catering`,
    description:
      locale === "ur"
        ? "اپنا ایونٹ آج ہی بک کریں - شادی، مہندی، ولیمہ، کارپوریٹ ایونٹس"
        : "Book your event today - Weddings, Mehndi, Walima, Corporate Events",
  };
}

export default async function BookNowPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "booking" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  const benefits = [
    {
      icon: Clock,
      title: locale === "ur" ? "فوری جواب" : "Quick Response",
      description:
        locale === "ur"
          ? "24 گھنٹوں میں جواب کی ضمانت"
          : "Guaranteed response within 24 hours",
    },
    {
      icon: Shield,
      title: locale === "ur" ? "بہترین قیمت" : "Best Price",
      description:
        locale === "ur"
          ? "مسابقتی اور شفاف قیمتیں"
          : "Competitive and transparent pricing",
    },
    {
      icon: Star,
      title: locale === "ur" ? "تجربہ کار ٹیم" : "Expert Team",
      description:
        locale === "ur"
          ? "20+ سال کا تجربہ"
          : "20+ years of experience",
    },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAFAFA]">
        {/* Hero section */}
        <section className="relative bg-[#1A1A1A] pt-32 pb-16">
          {/* Pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          {/* Gold corner decorations */}
          <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-[#D4AF37]/40 hidden lg:block" />
          <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-[#D4AF37]/40 hidden lg:block" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <PageHeading
              title={t("title")}
              subtitle={t("subtitle")}
              className="[&_h1]:text-white [&_p]:text-white/70"
            />

            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-sm bg-white/5 backdrop-blur-sm border border-white/10"
                >
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center">
                    <benefit.icon size={20} className="text-[#D4AF37]" />
                  </span>
                  <div>
                    <h3 className="font-medium text-white mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-white/60">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
        </section>

        {/* Form section */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Form */}
              <div className="lg:col-span-2">
                <BookingForm locale={locale} />
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                {/* Quick contact */}
                <div className="bg-white rounded-sm border border-[#E5E5E5] p-6 shadow-sm">
                  <h3 className="font-heading text-lg font-semibold text-[#1A1A1A] mb-4">
                    {locale === "ur" ? "براہ راست رابطہ کریں" : "Contact Us Directly"}
                  </h3>
                  <p className="text-[#6B7280] text-sm mb-6">
                    {locale === "ur"
                      ? "فوری جواب کے لیے ہمیں کال یا واٹس ایپ کریں"
                      : "For immediate response, call or WhatsApp us"}
                  </p>

                  <div className="space-y-3">
                    <a
                      href={getWhatsAppLink(CONTACT.whatsapp)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-sm bg-[#25D366]/10 hover:bg-[#25D366]/20 transition-colors group"
                    >
                      <span className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center">
                        <MessageCircle size={18} className="text-white" />
                      </span>
                      <div>
                        <p className="font-medium text-[#1A1A1A]">
                          {tCommon("whatsapp")}
                        </p>
                        <p className="text-sm text-[#6B7280]">{CONTACT.phone}</p>
                      </div>
                    </a>

                    <a
                      href={getPhoneLink(CONTACT.phone)}
                      className="flex items-center gap-3 p-3 rounded-sm bg-[#DA291C]/10 hover:bg-[#DA291C]/20 transition-colors group"
                    >
                      <span className="w-10 h-10 rounded-full bg-[#DA291C] flex items-center justify-center">
                        <Phone size={18} className="text-white" />
                      </span>
                      <div>
                        <p className="font-medium text-[#1A1A1A]">
                          {tCommon("callNow")}
                        </p>
                        <p className="text-sm text-[#6B7280]">{CONTACT.phone}</p>
                      </div>
                    </a>
                  </div>
                </div>

                {/* FAQ */}
                <div className="bg-white rounded-sm border border-[#E5E5E5] p-6 shadow-sm">
                  <h3 className="font-heading text-lg font-semibold text-[#1A1A1A] mb-4">
                    {locale === "ur" ? "عمومی سوالات" : "Frequently Asked"}
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-[#1A1A1A] text-sm mb-1">
                        {locale === "ur"
                          ? "بکنگ کے لیے کتنے پیسے درکار ہیں؟"
                          : "How much deposit is required?"}
                      </h4>
                      <p className="text-sm text-[#6B7280]">
                        {locale === "ur"
                          ? "بکنگ کی تصدیق کے لیے 30% ایڈوانس درکار ہے۔"
                          : "30% advance is required to confirm your booking."}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium text-[#1A1A1A] text-sm mb-1">
                        {locale === "ur"
                          ? "کتنے پہلے بکنگ کروائیں؟"
                          : "How early should I book?"}
                      </h4>
                      <p className="text-sm text-[#6B7280]">
                        {locale === "ur"
                          ? "شادی کے سیزن میں 2-3 ماہ پہلے بکنگ کروائیں۔"
                          : "Book 2-3 months in advance during wedding season."}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-medium text-[#1A1A1A] text-sm mb-1">
                        {locale === "ur"
                          ? "کیا حسب ضرورت مینو مل سکتا ہے؟"
                          : "Can I customize the menu?"}
                      </h4>
                      <p className="text-sm text-[#6B7280]">
                        {locale === "ur"
                          ? "جی ہاں! ہم آپ کی پسند کے مطابق مینو تیار کر سکتے ہیں۔"
                          : "Yes! We can create a custom menu based on your preferences."}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Trust badges */}
                <div className="bg-[#1A1A1A] rounded-sm p-6 text-center">
                  <div className="flex items-center justify-center gap-8 text-white/60">
                    <div className="text-center">
                      <div className="font-heading text-2xl font-bold text-[#D4AF37]">
                        20+
                      </div>
                      <div className="text-xs">
                        {locale === "ur" ? "سال" : "Years"}
                      </div>
                    </div>
                    <div className="w-px h-10 bg-white/20" />
                    <div className="text-center">
                      <div className="font-heading text-2xl font-bold text-[#D4AF37]">
                        500+
                      </div>
                      <div className="text-xs">
                        {locale === "ur" ? "تقریبات" : "Events"}
                      </div>
                    </div>
                    <div className="w-px h-10 bg-white/20" />
                    <div className="text-center">
                      <div className="font-heading text-2xl font-bold text-[#D4AF37]">
                        1000+
                      </div>
                      <div className="text-xs">
                        {locale === "ur" ? "گاہک" : "Clients"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
