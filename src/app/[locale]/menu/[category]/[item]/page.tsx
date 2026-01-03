import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PopularBadge } from "@/components/ui/Badge";
import { MenuGrid } from "@/components/menu";
import { ChevronRight, Phone, MessageCircle, ArrowLeft } from "lucide-react";
import { CONTACT } from "@/lib/constants";
import { getWhatsAppLink, getPhoneLink } from "@/lib/utils";
import categoriesData from "@/data/menu/categories.json";
import allItemsData from "@/data/menu/all-items.json";

export function generateStaticParams() {
  return allItemsData.items.map((item) => ({
    category: item.category,
    item: item.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string; item: string }>;
}) {
  const { locale, item: itemSlug } = await params;

  const itemData = allItemsData.items.find((i) => i.id === itemSlug);

  if (!itemData) {
    return {
      title: "Item Not Found",
    };
  }

  const itemName = locale === "ur" ? itemData.name.ur : itemData.name.en;

  return {
    title: `${itemName} | Raheem Event Management & Catering`,
    description:
      locale === "ur"
        ? `${itemName} - ہماری مزیدار کیٹرنگ کے لیے آرڈر کریں`
        : `${itemName} - Order for your event catering`,
    openGraph: {
      images: [itemData.image],
    },
  };
}

export default async function ItemDetailPage({
  params,
}: {
  params: Promise<{ locale: string; category: string; item: string }>;
}) {
  const { locale, category, item: itemSlug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "menu" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  const itemData = allItemsData.items.find((i) => i.id === itemSlug);
  const categoryData = categoriesData.categories.find((c) => c.slug === category);

  if (!itemData || !categoryData) {
    notFound();
  }

  // Get related items from same category (excluding current item)
  const relatedItems = allItemsData.items
    .filter((i) => i.category === category && i.id !== itemSlug)
    .slice(0, 4);

  const itemName = locale === "ur" ? itemData.name.ur : itemData.name.en;
  const categoryName = locale === "ur" ? categoryData.name.ur : categoryData.name.en;

  // WhatsApp message
  const whatsappMessage =
    locale === "ur"
      ? `السلام علیکم! میں ${itemName} کے بارے میں معلومات چاہتا/چاہتی ہوں۔`
      : `Hi! I would like to inquire about ${itemName}.`;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAFAFA]">
        {/* Breadcrumb section */}
        <section className="bg-white border-b border-[#E5E5E5] pt-24 pb-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center gap-2 text-sm">
              <Link
                href="/"
                className="text-[#6B7280] hover:text-[#D4AF37] transition-colors"
              >
                {locale === "ur" ? "ہوم" : "Home"}
              </Link>
              <ChevronRight size={14} className="text-[#9CA3AF] rtl:rotate-180" />
              <Link
                href="/menu"
                className="text-[#6B7280] hover:text-[#D4AF37] transition-colors"
              >
                {t("title")}
              </Link>
              <ChevronRight size={14} className="text-[#9CA3AF] rtl:rotate-180" />
              <Link
                href={`/menu/${category}`}
                className="text-[#6B7280] hover:text-[#D4AF37] transition-colors"
              >
                {categoryName}
              </Link>
              <ChevronRight size={14} className="text-[#9CA3AF] rtl:rotate-180" />
              <span className="text-[#1A1A1A] font-medium">{itemName}</span>
            </nav>
          </div>
        </section>

        {/* Main content */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Image */}
              <div className="relative">
                <div className="relative aspect-square rounded-sm overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
                  <Image
                    src={itemData.image}
                    alt={itemName}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />

                  {/* Popular badge */}
                  {itemData.isPopular && (
                    <div className="absolute top-4 left-4">
                      <PopularBadge />
                    </div>
                  )}
                </div>

                {/* Corner decorations */}
                <div className="absolute -top-3 -left-3 w-12 h-12 border-t-2 border-l-2 border-[#D4AF37]" />
                <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b-2 border-r-2 border-[#D4AF37]" />
              </div>

              {/* Details */}
              <div className="flex flex-col">
                {/* Back link */}
                <Link
                  href={`/menu/${category}`}
                  className="inline-flex items-center gap-2 text-[#6B7280] hover:text-[#D4AF37] transition-colors mb-6"
                >
                  <ArrowLeft size={18} className="rtl:rotate-180" />
                  <span>
                    {locale === "ur" ? "واپس" : "Back to"} {categoryName}
                  </span>
                </Link>

                {/* Title */}
                <h1 className="font-heading text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-2">
                  {itemName}
                </h1>

                {/* Urdu name (if viewing in English) */}
                {locale === "en" && itemData.name.ur && (
                  <p className="text-xl text-[#6B7280] font-urdu mb-6">
                    {itemData.name.ur}
                  </p>
                )}

                {/* Category badge */}
                <div className="inline-flex mb-8">
                  <span className="px-4 py-1.5 bg-[#D4AF37]/10 text-[#B8962E] text-sm font-medium rounded-full">
                    {categoryName}
                  </span>
                </div>

                {/* Description placeholder */}
                <p className="text-[#6B7280] leading-relaxed mb-8">
                  {locale === "ur"
                    ? `${itemName} ہماری خصوصی ڈش ہے جو روایتی انداز میں تیار کی جاتی ہے۔ شادی، ولیمہ، یا کسی بھی تقریب کے لیے بہترین انتخاب۔`
                    : `${itemName} is one of our signature dishes prepared in the traditional style. Perfect for weddings, walima, or any special occasion.`}
                </p>

                {/* CTA buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <a
                    href={getWhatsAppLink(CONTACT.whatsapp, whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button
                      variant="primary"
                      fullWidth
                      leftIcon={<MessageCircle size={18} />}
                      className="bg-[#25D366] hover:bg-[#128C7E] shadow-[0_4px_14px_rgba(37,211,102,0.3)]"
                    >
                      {tCommon("whatsapp")}
                    </Button>
                  </a>
                  <a href={getPhoneLink(CONTACT.phone)} className="flex-1">
                    <Button
                      variant="outline"
                      fullWidth
                      leftIcon={<Phone size={18} />}
                    >
                      {tCommon("callNow")}
                    </Button>
                  </a>
                </div>

                {/* Info box */}
                <div className="bg-white p-6 rounded-sm border border-[#E5E5E5]">
                  <h3 className="font-heading text-lg font-semibold text-[#1A1A1A] mb-3">
                    {locale === "ur" ? "معلومات" : "Information"}
                  </h3>
                  <ul className="space-y-2 text-[#6B7280]">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                      {locale === "ur"
                        ? "قیمت فی شخص کے حساب سے"
                        : "Price calculated per head"}
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                      {locale === "ur"
                        ? "کم از کم آرڈر درکار"
                        : "Minimum order required"}
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                      {locale === "ur"
                        ? "پیشگی بکنگ ضروری"
                        : "Advance booking required"}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related items */}
        {relatedItems.length > 0 && (
          <section className="py-12 md:py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <SectionHeading
                title={t("relatedItems")}
                align="center"
                decorationStyle="line"
              />
              <div className="mt-10">
                <MenuGrid items={relatedItems} locale={locale} />
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
