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
