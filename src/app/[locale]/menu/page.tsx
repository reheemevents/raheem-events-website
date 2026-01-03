import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import { PageHeading } from "@/components/ui/SectionHeading";
import { CategoryFilter, MenuGrid } from "@/components/menu";
import { Sparkles, ArrowRight } from "lucide-react";
import categoriesData from "@/data/menu/categories.json";
import allItemsData from "@/data/menu/all-items.json";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "menu" });

  return {
    title: `${t("title")} | Raheem Event Management & Catering`,
    description:
      locale === "ur"
        ? "ہمارے 100+ مزیدار کھانوں کی فہرست دیکھیں - بریانی، قورمہ، بی بی کیو، میٹھے اور بہت کچھ"
        : "Explore our menu of 100+ delicious dishes - Biryani, Qorma, BBQ, Desserts and more",
  };
}

export default async function MenuPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "menu" });

  // Sort items - popular first
  const sortedItems = [...allItemsData.items].sort((a, b) => {
    if (a.isPopular && !b.isPopular) return -1;
    if (!a.isPopular && b.isPopular) return 1;
    return 0;
  });

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

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <PageHeading
              title={t("title")}
              subtitle={t("subtitle")}
              className="[&_h1]:text-white [&_p]:text-white/70"
            />
          </div>

          {/* Gold line at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
        </section>

        {/* Menu Builder CTA Banner */}
        <section className="relative bg-gradient-to-r from-[#DA291C] to-[#B82318] py-6 overflow-hidden">
          {/* Decorative pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2l4 3.25-4 3.25zM0 20h20v2H0v-2z'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          {/* Floating sparkle decorations */}
          <div className="absolute top-2 left-[10%] text-white/20">
            <Sparkles size={24} />
          </div>
          <div className="absolute bottom-2 right-[15%] text-white/20">
            <Sparkles size={20} />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                  <Sparkles className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-white font-heading text-lg md:text-xl font-semibold">
                    Build Your Perfect Menu
                  </h3>
                  <p className="text-white/80 text-sm">
                    Select your favorite dishes & get an instant quote via WhatsApp
                  </p>
                </div>
              </div>

              <Link
                href="/menu-builder"
                className="group inline-flex items-center gap-2 bg-white text-[#DA291C] px-6 py-3 rounded-sm font-semibold text-sm hover:bg-[#D4AF37] hover:text-[#1A1A1A] transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Try Menu Builder
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </section>

        {/* Menu content */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Category filter */}
            <div className="mb-10">
              <CategoryFilter
                categories={categoriesData.categories}
                locale={locale}
              />
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between mb-8">
              <p className="text-[#6B7280]">
                {`Showing ${sortedItems.length} items`}
              </p>
            </div>

            {/* Menu grid */}
            <MenuGrid items={sortedItems} />
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
