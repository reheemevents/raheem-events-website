import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import { PageHeading } from "@/components/ui/SectionHeading";
import { CategoryFilter, MenuGrid } from "@/components/menu";
import { ChevronRight } from "lucide-react";
import categoriesData from "@/data/menu/categories.json";
import allItemsData from "@/data/menu/all-items.json";

export function generateStaticParams() {
  return categoriesData.categories.map((category) => ({
    category: category.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale, category } = await params;

  const categoryData = categoriesData.categories.find(
    (c) => c.slug === category
  );

  if (!categoryData) {
    return {
      title: "Category Not Found",
    };
  }

  const categoryName =
    locale === "ur" ? categoryData.name.ur : categoryData.name.en;

  return {
    title: `${categoryName} | Raheem Event Management & Catering`,
    description:
      locale === "ur" ? categoryData.description.ur : categoryData.description.en,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>;
}) {
  const { locale, category } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "menu" });

  const categoryData = categoriesData.categories.find(
    (c) => c.slug === category
  );

  if (!categoryData) {
    notFound();
  }

  const categoryItems = allItemsData.items.filter(
    (item) => item.category === category
  );

  // Sort items - popular first
  const sortedItems = [...categoryItems].sort((a, b) => {
    if (a.isPopular && !b.isPopular) return -1;
    if (!a.isPopular && b.isPopular) return 1;
    return 0;
  });

  const categoryName =
    locale === "ur" ? categoryData.name.ur : categoryData.name.en;
  const categoryDescription =
    locale === "ur" ? categoryData.description.ur : categoryData.description.en;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAFAFA]">
        {/* Hero section */}
        <section className="relative pt-32 pb-16 bg-[#1A1A1A] overflow-hidden">
          {/* Background image with proper encoding */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(26, 26, 26, 0.85), rgba(26, 26, 26, 0.95)), url("${encodeURI(categoryData.image)}")`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          {/* Pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm mb-8">
              <Link
                href="/"
                className="text-white/60 hover:text-[#D4AF37] transition-colors"
              >
                {locale === "ur" ? "ہوم" : "Home"}
              </Link>
              <ChevronRight size={14} className="text-white/40 rtl:rotate-180" />
              <Link
                href="/menu"
                className="text-white/60 hover:text-[#D4AF37] transition-colors"
              >
                {t("title")}
              </Link>
              <ChevronRight size={14} className="text-white/40 rtl:rotate-180" />
              <span className="text-[#D4AF37]">{categoryName}</span>
            </nav>

            <PageHeading
              title={categoryName}
              subtitle={categoryDescription}
              className="[&_h1]:text-white [&_p]:text-white/70"
            />
          </div>

          {/* Gold line at bottom */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
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
