import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import { PageHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Users, MapPin, ArrowRight } from "lucide-react";
import israrData from "@/data/venues/israr.json";
import mumtazData from "@/data/venues/mumtaz.json";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "venues" });

  return {
    title: `${t("title")} | Raheem Event Management & Catering`,
    description: "Explore our beautiful marriage halls - Israr Marriage Hall and Mumtaz Banquet Hall",
  };
}

export default async function VenuesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "venues" });

  const venues = [israrData, mumtazData];

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

        {/* Venues grid */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {venues.map((venue) => {
                const name = venue.name.en;
                const tagline = venue.tagline.en;
                const description = venue.description.en;

                return (
                  <div
                    key={venue.id}
                    className="group bg-white rounded-sm overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] transition-all duration-500"
                  >
                    {/* Image */}
                    <div className="relative h-72 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A] to-[#2D2D2D]" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />

                      {/* Gold corner accents */}
                      <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-[#D4AF37] z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-[#D4AF37] z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      {/* Content overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                        <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-1">
                          {name}
                        </h2>
                        <p className="text-[#D4AF37] font-medium">{tagline}</p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <p className="text-[#6B7280] leading-relaxed mb-6 line-clamp-3">
                        {description}
                      </p>

                      {/* Stats */}
                      <div className="flex flex-wrap gap-4 mb-6">
                        <div className="flex items-center gap-2 text-[#1A1A1A]">
                          <Users size={18} className="text-[#D4AF37]" />
                          <span className="text-sm">
                            {t("capacity")}: {venue.capacity.total} {t("guests")}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-[#1A1A1A]">
                          <MapPin size={18} className="text-[#D4AF37]" />
                          <span className="text-sm">{venue.location.city}</span>
                        </div>
                      </div>

                      {/* CTA */}
                      <Link href={`/venues/${venue.slug}`}>
                        <Button
                          variant="secondary"
                          fullWidth
                          rightIcon={
                            <ArrowRight size={18} className="rtl:rotate-180" />
                          }
                        >
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
