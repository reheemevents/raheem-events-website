import { setRequestLocale } from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import {
  HeroSlider,
  ServicesOverview,
  WhyChooseUs,
  FoodMenuShowcase,
  MenuBuilderCTA,
  GalleryPreview,
  TestimonialsCarousel,
  CTASection,
} from "@/components/home";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import { generateHomeMetadata, generateBreadcrumbSchema, SchemaScript } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return generateHomeMetadata(locale);
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main>
        <HeroSlider />
        <ServicesOverview />
        <WhyChooseUs />
        <FoodMenuShowcase />
        <MenuBuilderCTA />
        <GalleryPreview />
        <TestimonialsCarousel />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
