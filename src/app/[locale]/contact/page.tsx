import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import { PageHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Building2,
} from "lucide-react";
import { CONTACT } from "@/lib/constants";
import { getPhoneLink, getWhatsAppLink, getEmailLink } from "@/lib/utils";
import israrData from "@/data/venues/israr.json";
import mumtazData from "@/data/venues/mumtaz.json";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact" });

  return {
    title: `${t("title")} | Raheem Event Management & Catering`,
    description: "Contact us - via phone, WhatsApp, or email",
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contact" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  const venues = [
    {
      data: israrData,
      name: israrData.name.en,
      address: israrData.location.address.en,
    },
    {
      data: mumtazData,
      name: mumtazData.name.en,
      address: mumtazData.location.address.en,
    },
  ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#FAFAFA]">
        {/* Hero section */}
        <section className="relative bg-[#1A1A1A] pt-32 pb-16">
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

          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
        </section>

        {/* Contact content */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact information */}
              <div>
                <h2 className="font-heading text-2xl font-semibold text-[#1A1A1A] mb-8">
                  {t("info.title")}
                </h2>

                {/* Quick contact cards */}
                <div className="space-y-4 mb-12">
                  {/* Phone */}
                  <a
                    href={getPhoneLink(CONTACT.phone)}
                    className="flex items-center gap-4 p-4 bg-white rounded-sm border border-[#E5E5E5] hover:border-[#D4AF37] transition-colors group"
                  >
                    <span className="w-12 h-12 rounded-full bg-[#DA291C]/10 flex items-center justify-center group-hover:bg-[#DA291C]/20 transition-colors">
                      <Phone size={20} className="text-[#DA291C]" />
                    </span>
                    <div>
                      <p className="text-sm text-[#6B7280]">
                        {tCommon("phone")}
                      </p>
                      <p className="font-medium text-[#1A1A1A]">
                        {CONTACT.phone}
                      </p>
                    </div>
                  </a>

                  {/* WhatsApp */}
                  <a
                    href={getWhatsAppLink(CONTACT.whatsapp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-white rounded-sm border border-[#E5E5E5] hover:border-[#25D366] transition-colors group"
                  >
                    <span className="w-12 h-12 rounded-full bg-[#25D366]/10 flex items-center justify-center group-hover:bg-[#25D366]/20 transition-colors">
                      <MessageCircle size={20} className="text-[#25D366]" />
                    </span>
                    <div>
                      <p className="text-sm text-[#6B7280]">
                        {tCommon("whatsapp")}
                      </p>
                      <p className="font-medium text-[#1A1A1A]">
                        {CONTACT.phone}
                      </p>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href={getEmailLink(CONTACT.email)}
                    className="flex items-center gap-4 p-4 bg-white rounded-sm border border-[#E5E5E5] hover:border-[#D4AF37] transition-colors group"
                  >
                    <span className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center group-hover:bg-[#D4AF37]/20 transition-colors">
                      <Mail size={20} className="text-[#D4AF37]" />
                    </span>
                    <div>
                      <p className="text-sm text-[#6B7280]">
                        {tCommon("email")}
                      </p>
                      <p className="font-medium text-[#1A1A1A]">
                        {CONTACT.email}
                      </p>
                    </div>
                  </a>
                </div>

                {/* Business hours */}
                <div className="bg-white p-6 rounded-sm border border-[#E5E5E5] mb-8">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock size={20} className="text-[#D4AF37]" />
                    <h3 className="font-medium text-[#1A1A1A]">
                      {t("info.hours")}
                    </h3>
                  </div>
                  <div className="space-y-2 text-[#6B7280]">
                    <div className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span>9:00 AM - 9:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday - Sunday</span>
                      <span>10:00 AM - 10:00 PM</span>
                    </div>
                  </div>
                </div>

                {/* CTA buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={getWhatsAppLink(CONTACT.whatsapp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
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
                  <a href={getPhoneLink(CONTACT.phone)} className="flex-1">
                    <Button
                      variant="secondary"
                      fullWidth
                      leftIcon={<Phone size={18} />}
                    >
                      {tCommon("callNow")}
                    </Button>
                  </a>
                </div>
              </div>

              {/* Main Address & Locations */}
              <div>
                {/* Main Business Address */}
                <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] p-6 rounded-sm mb-8">
                  <div className="flex items-start gap-4">
                    <span className="w-12 h-12 rounded-full bg-[#D4AF37]/20 flex items-center justify-center flex-shrink-0">
                      <MapPin size={24} className="text-[#D4AF37]" />
                    </span>
                    <div className="flex-1">
                      <h3 className="font-heading text-lg font-semibold text-white mb-2">
                        Main Office
                      </h3>
                      <p className="text-white/80 mb-4">
                        {CONTACT.address}
                      </p>
                      <a
                        href={CONTACT.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#D4AF37] text-[#1A1A1A] px-4 py-2 rounded-sm font-medium hover:bg-[#C9A432] transition-colors"
                      >
                        <MapPin size={16} />
                        Get Directions
                      </a>
                    </div>
                  </div>
                </div>

                <h2 className="font-heading text-2xl font-semibold text-[#1A1A1A] mb-8">
                  {t("locations.title")}
                </h2>

                <div className="space-y-6">
                  {venues.map((venue, index) => (
                    <div
                      key={index}
                      className="bg-white p-6 rounded-sm border border-[#E5E5E5] hover:border-[#D4AF37] transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        <span className="w-12 h-12 rounded-full bg-[#1A1A1A]/5 flex items-center justify-center flex-shrink-0">
                          <Building2 size={20} className="text-[#1A1A1A]" />
                        </span>
                        <div className="flex-1">
                          <h3 className="font-heading text-lg font-semibold text-[#1A1A1A] mb-2">
                            {venue.name}
                          </h3>
                          <p className="text-[#6B7280] flex items-start gap-2 mb-3">
                            <MapPin
                              size={16}
                              className="flex-shrink-0 mt-1 text-[#D4AF37]"
                            />
                            {venue.address}
                          </p>
                          <p className="text-[#6B7280] flex items-center gap-2 mb-4">
                            <Phone size={16} className="text-[#D4AF37]" />
                            {venue.data.contact.phone}
                          </p>
                          <a
                            href={venue.data.location.mapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-[#D4AF37] font-medium hover:underline"
                          >
                            Get Directions →
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Google Maps Embed */}
                <div className="mt-8 aspect-video rounded-sm overflow-hidden border border-[#E5E5E5]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3323.5!2d73.7530306!3d33.1446881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa367da044dce6227%3A0x5a0142a1b1dc2e42!2sRaheem%20Event%20Management%20%26%20Catering!5e0!3m2!1sen!2s!4v1704000000000!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Raheem Event Management & Catering Location"
                  />
                </div>
                <p className="mt-2 text-sm text-[#6B7280] text-center">
                  <a
                    href={CONTACT.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#D4AF37] transition-colors"
                  >
                    Open in Google Maps →
                  </a>
                </p>
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
