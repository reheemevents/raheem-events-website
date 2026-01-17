import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import FAQAccordion from "@/components/faq/FAQAccordion";
import { Button } from "@/components/ui/Button";
import { HelpCircle, Phone, MessageCircle, MapPin } from "lucide-react";
import { CONTACT } from "@/lib/constants";
import { getWhatsAppLink, getPhoneLink } from "@/lib/utils";
import faqData from "@/data/faq.json";
import { generateFAQMetadata, generateFAQPageSchema, SchemaScript } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return generateFAQMetadata(locale);
}

export default async function FAQPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "faq" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  return (
    <>
      <SchemaScript schema={generateFAQPageSchema(faqData.questions, locale)} />
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
              <HelpCircle size={16} className="text-[#D4AF37]" />
              <span className="text-[#D4AF37] text-sm font-medium">
                {t("badge")}
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

        {/* FAQ Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <FAQAccordion
              questions={faqData.questions}
              categories={faqData.categories}
              showCategories={true}
            />
          </div>
        </section>

        {/* Still have questions CTA */}
        <section className="py-16 md:py-24 bg-white border-t border-[#E5E5E5]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#D4AF37]/10 mb-6">
              <HelpCircle size={32} className="text-[#D4AF37]" />
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
              {t("stillHaveQuestions.title")}
            </h2>
            <p className="text-lg text-[#6B7280] max-w-xl mx-auto mb-10">
              {t("stillHaveQuestions.subtitle")}
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
              <Link href="/contact">
                <Button
                  variant="secondary"
                  size="lg"
                  leftIcon={<MapPin size={20} />}
                >
                  {tCommon("contactUs")}
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="py-12 bg-[#FAFAFA]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link
                href="/venues"
                className="group p-6 bg-white rounded-sm border border-[#E5E5E5] hover:border-[#D4AF37] hover:shadow-lg transition-all duration-300"
              >
                <h3 className="font-heading text-lg font-semibold text-[#1A1A1A] mb-2 group-hover:text-[#DA291C] transition-colors">
                  {t("quickLinks.venues.title")}
                </h3>
                <p className="text-sm text-[#6B7280]">
                  {t("quickLinks.venues.description")}
                </p>
              </Link>

              <Link
                href="/book-now"
                className="group p-6 bg-white rounded-sm border border-[#E5E5E5] hover:border-[#D4AF37] hover:shadow-lg transition-all duration-300"
              >
                <h3 className="font-heading text-lg font-semibold text-[#1A1A1A] mb-2 group-hover:text-[#DA291C] transition-colors">
                  {t("quickLinks.booking.title")}
                </h3>
                <p className="text-sm text-[#6B7280]">
                  {t("quickLinks.booking.description")}
                </p>
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
