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
import {
  ChevronRight,
  Users,
  MapPin,
  Phone,
  MessageCircle,
  Check,
  Wind,
  Car,
  Zap,
  Music,
  Lightbulb,
  Utensils,
  Palette,
  Star,
} from "lucide-react";
import { getWhatsAppLink, getPhoneLink } from "@/lib/utils";
import israrData from "@/data/venues/israr.json";
import mumtazData from "@/data/venues/mumtaz.json";

const venues = {
  "israr-marriage-hall": israrData,
  "mumtaz-banquet-hall": mumtazData,
};

const amenityIcons: Record<string, React.ReactNode> = {
  ac: <Wind size={20} />,
  parking: <Car size={20} />,
  generator: <Zap size={20} />,
  stage: <Star size={20} />,
  sound: <Music size={20} />,
  lighting: <Lightbulb size={20} />,
  catering: <Utensils size={20} />,
  decor: <Palette size={20} />,
  valet: <Car size={20} />,
};

const amenityLabels: Record<string, string> = {
  ac: "Air Conditioning",
  parking: "Parking Available",
  generator: "Generator Backup",
  stage: "Custom Stage",
  sound: "Sound System",
  lighting: "Designer Lighting",
  catering: "In-house Catering",
  decor: "Decor Services",
  valet: "Valet Parking",
};

export function generateStaticParams() {
  return Object.keys(venues).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  const venue = venues[slug as keyof typeof venues];

  if (!venue) {
    return { title: "Venue Not Found" };
  }

  const name = venue.name.en;

  return {
    title: `${name} | Raheem Event Management & Catering`,
    description: venue.description.en,
  };
}

export default async function VenueDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "venues" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  const venue = venues[slug as keyof typeof venues];

  if (!venue) {
    notFound();
  }

  const name = venue.name.en;
  const tagline = venue.tagline.en;
  const description = venue.description.en;
  const address = venue.location.address.en;
  const features = venue.features.en;

  const whatsappMessage = `Hi! I would like to inquire about booking ${name}.`;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAFAFA]">
        {/* Hero section */}
        <section className="relative h-[60vh] min-h-[500px]">
          {/* Background image placeholder */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A] to-[#2D2D2D]" />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

          {/* Pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          {/* Gold corner decorations */}
          <div className="absolute top-8 left-8 w-24 h-24 border-t-2 border-l-2 border-[#D4AF37]/60 z-10" />
          <div className="absolute top-8 right-8 w-24 h-24 border-t-2 border-r-2 border-[#D4AF37]/60 z-10" />

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-sm mb-6">
                <Link
                  href="/"
                  className="text-white/60 hover:text-[#D4AF37] transition-colors"
                >
                  Home
                </Link>
                <ChevronRight
                  size={14}
                  className="text-white/40 rtl:rotate-180"
                />
                <Link
                  href="/venues"
                  className="text-white/60 hover:text-[#D4AF37] transition-colors"
                >
                  {t("title")}
                </Link>
                <ChevronRight
                  size={14}
                  className="text-white/40 rtl:rotate-180"
                />
                <span className="text-[#D4AF37]">{name}</span>
              </nav>

              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                {name}
              </h1>
              <p className="text-xl text-[#D4AF37] font-medium mb-6">
                {tagline}
              </p>

              {/* Quick stats */}
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2 text-white">
                  <Users size={20} className="text-[#D4AF37]" />
                  <span>
                    {venue.capacity.seated}-{venue.capacity.buffet}{" "}
                    {t("guests")}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <MapPin size={20} className="text-[#D4AF37]" />
                  <span>{venue.location.city}</span>
                </div>
              </div>
            </div>

            {/* Gold line */}
            <div className="h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
          </div>
        </section>

        {/* Main content */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Left column - Details */}
              <div className="lg:col-span-2 space-y-12">
                {/* Description */}
                <div>
                  <h2 className="font-heading text-2xl font-semibold text-[#1A1A1A] mb-4">
                    Overview
                  </h2>
                  <p className="text-[#6B7280] leading-relaxed text-lg">
                    {description}
                  </p>
                </div>

                {/* Capacity */}
                <div className="bg-white p-8 rounded-sm border border-[#E5E5E5]">
                  <h2 className="font-heading text-2xl font-semibold text-[#1A1A1A] mb-6">
                    {t("capacity")}
                  </h2>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="text-center p-6 bg-[#FAFAFA] rounded-sm">
                      <div className="font-heading text-4xl font-bold text-[#D4AF37] mb-2">
                        {venue.capacity.seated}
                      </div>
                      <p className="text-[#6B7280]">{t("seated")}</p>
                    </div>
                    <div className="text-center p-6 bg-[#FAFAFA] rounded-sm">
                      <div className="font-heading text-4xl font-bold text-[#D4AF37] mb-2">
                        {venue.capacity.buffet}
                      </div>
                      <p className="text-[#6B7280]">{t("buffet")}</p>
                    </div>
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <h2 className="font-heading text-2xl font-semibold text-[#1A1A1A] mb-6">
                    {t("amenities")}
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {venue.amenities.map((amenity) => (
                      <div
                        key={amenity}
                        className="flex items-center gap-3 p-4 bg-white rounded-sm border border-[#E5E5E5]"
                      >
                        <span className="text-[#D4AF37]">
                          {amenityIcons[amenity]}
                        </span>
                        <span className="text-[#1A1A1A]">
                          {amenityLabels[amenity]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h2 className="font-heading text-2xl font-semibold text-[#1A1A1A] mb-6">
                    {t("features")}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-4 bg-white rounded-sm border border-[#E5E5E5]"
                      >
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mt-0.5">
                          <Check size={14} className="text-[#D4AF37]" />
                        </span>
                        <span className="text-[#1A1A1A]">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right column - Booking card */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 bg-white rounded-sm border border-[#E5E5E5] overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
                  {/* Gold top border */}
                  <div className="h-1 bg-gradient-to-r from-[#D4AF37] via-[#E5C453] to-[#D4AF37]" />

                  <div className="p-6">
                    <h3 className="font-heading text-xl font-semibold text-[#1A1A1A] mb-4">
                      {t("bookThisVenue")}
                    </h3>

                    <p className="text-[#6B7280] mb-6">
                      Contact us today to book your event date
                    </p>

                    {/* CTA buttons */}
                    <div className="space-y-3">
                      <a
                        href={getWhatsAppLink(
                          venue.contact.whatsapp,
                          whatsappMessage
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <Button
                          variant="primary"
                          fullWidth
                          leftIcon={<MessageCircle size={18} />}
                          className="bg-[#25D366] hover:bg-[#128C7E]"
                        >
                          {tCommon("whatsapp")}
                        </Button>
                      </a>

                      <a
                        href={getPhoneLink(venue.contact.phone)}
                        className="block"
                      >
                        <Button
                          variant="outline"
                          fullWidth
                          leftIcon={<Phone size={18} />}
                        >
                          {tCommon("callNow")}
                        </Button>
                      </a>

                      <Link href="/book-now" className="block">
                        <Button variant="gold" fullWidth>
                          {t("requestPricing")}
                        </Button>
                      </Link>
                    </div>

                    {/* Location */}
                    <div className="mt-6 pt-6 border-t border-[#E5E5E5]">
                      <h4 className="font-medium text-[#1A1A1A] mb-2 flex items-center gap-2">
                        <MapPin size={16} className="text-[#D4AF37]" />
                        {t("location")}
                      </h4>
                      <p className="text-[#6B7280] text-sm mb-3">{address}</p>
                      <a
                        href={venue.location.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#D4AF37] text-sm font-medium hover:underline"
                      >
                        {t("viewOnMap")} →
                      </a>
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
