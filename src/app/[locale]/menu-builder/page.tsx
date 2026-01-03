import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import MenuBuilder from "@/components/menu-builder/MenuBuilder";
import { ChefHat } from "lucide-react";
import menuData from "@/data/menu/all-items.json";
import categoriesData from "@/data/menu/categories.json";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "menuBuilder" });

  return {
    title: `${t("title")} | Raheem Event Management & Catering`,
    description: "Create a custom menu for your event by selecting from our 107+ dishes. Build your perfect catering menu and get a quote instantly.",
  };
}

export default async function MenuBuilderPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "menuBuilder" });

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAFAFA]">
        {/* Hero section */}
        <section className="relative bg-[#1A1A1A] pt-32 pb-16 overflow-hidden">
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
              <ChefHat size={16} className="text-[#D4AF37]" />
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

            {/* Stats */}
            <div className="mt-10 flex items-center justify-center gap-8 md:gap-16">
              <div className="text-center">
                <p className="font-heading text-3xl md:text-4xl font-bold text-[#D4AF37]">
                  107+
                </p>
                <p className="text-sm text-white/60 mt-1">Dishes</p>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div className="text-center">
                <p className="font-heading text-3xl md:text-4xl font-bold text-[#D4AF37]">
                  12
                </p>
                <p className="text-sm text-white/60 mt-1">Categories</p>
              </div>
              <div className="w-px h-12 bg-white/20" />
              <div className="text-center">
                <p className="font-heading text-3xl md:text-4xl font-bold text-[#D4AF37]">
                  100%
                </p>
                <p className="text-sm text-white/60 mt-1">Halal</p>
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
        </section>

        {/* Menu Builder Section */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <MenuBuilder
              items={menuData.items}
              categories={categoriesData.categories}
            />
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
