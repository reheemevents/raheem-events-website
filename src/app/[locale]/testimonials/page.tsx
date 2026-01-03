import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/common/WhatsAppButton";
import { PageHeading, SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import {
  Star,
  Quote,
  Play,
  Users,
  Calendar,
  Heart,
  MessageCircle,
  Phone,
  ExternalLink,
} from "lucide-react";
import { CONTACT } from "@/lib/constants";
import { getWhatsAppLink, getPhoneLink } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "testimonials" });

  return {
    title: `${t("title")} | Raheem Event Management & Catering`,
    description:
      locale === "ur"
        ? "ہمارے خوش گاہکوں کی تعریفیں اور ریویوز پڑھیں - 500+ کامیاب تقریبات"
        : "Read testimonials and reviews from our happy clients - 500+ successful events",
  };
}

export default async function TestimonialsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "testimonials" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  // Sample testimonials data
  const testimonials = [
    {
      id: 1,
      name: locale === "ur" ? "احمد علی" : "Ahmed Ali",
      eventType: locale === "ur" ? "شادی" : "Wedding",
      venue: locale === "ur" ? "اصرار میرج ہال" : "Israr Marriage Hall",
      rating: 5,
      quote:
        locale === "ur"
          ? "رحیم ایونٹس نے ہماری شادی کو واقعی یادگار بنا دیا۔ کھانا لاجواب تھا اور سروس بے مثال۔ بہت شکریہ!"
          : "Raheem Events made our wedding truly memorable. The food was excellent and the service was impeccable. Thank you so much!",
      date: locale === "ur" ? "دسمبر ۲۰۲۳" : "December 2023",
    },
    {
      id: 2,
      name: locale === "ur" ? "فاطمہ خان" : "Fatima Khan",
      eventType: locale === "ur" ? "ولیمہ" : "Walima",
      venue: locale === "ur" ? "ممتاز بینکوئٹ ہال" : "Mumtaz Banquet Hall",
      rating: 5,
      quote:
        locale === "ur"
          ? "ممتاز ہال کی سجاوٹ اور کھانے نے ہمارے مہمانوں کو حیران کر دیا۔ ہر چیز بالکل ویسی تھی جیسا ہم نے سوچا تھا۔"
          : "The decoration and food at Mumtaz Hall amazed our guests. Everything was exactly as we had envisioned.",
      date: locale === "ur" ? "نومبر ۲۰۲۳" : "November 2023",
    },
    {
      id: 3,
      name: locale === "ur" ? "عمران رضا" : "Imran Raza",
      eventType: locale === "ur" ? "کارپوریٹ ایونٹ" : "Corporate Event",
      venue: locale === "ur" ? "کیٹرنگ سروس" : "Catering Service",
      rating: 5,
      quote:
        locale === "ur"
          ? "ہماری کمپنی کی سالانہ تقریب کے لیے بہترین کیٹرنگ۔ پروفیشنل ٹیم اور شاندار کھانا۔"
          : "Excellent catering for our company's annual event. Professional team and amazing food.",
      date: locale === "ur" ? "اکتوبر ۲۰۲۳" : "October 2023",
    },
    {
      id: 4,
      name: locale === "ur" ? "عائشہ حسین" : "Ayesha Hussain",
      eventType: locale === "ur" ? "مہندی" : "Mehndi",
      venue: locale === "ur" ? "اصرار میرج ہال" : "Israr Marriage Hall",
      rating: 5,
      quote:
        locale === "ur"
          ? "مہندی کی رات بالکل پرفیکٹ تھی! اسٹاف بہت مددگار تھا اور کھانا سب کو پسند آیا۔"
          : "The Mehndi night was absolutely perfect! The staff was very helpful and everyone loved the food.",
      date: locale === "ur" ? "ستمبر ۲۰۲۳" : "September 2023",
    },
    {
      id: 5,
      name: locale === "ur" ? "بلال محمود" : "Bilal Mahmood",
      eventType: locale === "ur" ? "بارات" : "Barat",
      venue: locale === "ur" ? "ممتاز بینکوئٹ ہال" : "Mumtaz Banquet Hall",
      rating: 5,
      quote:
        locale === "ur"
          ? "بارات کے لیے بہترین انتظامات۔ مہمانوں نے بہت تعریف کی۔ رحیم ایونٹس کی سفارش کرتا ہوں۔"
          : "Excellent arrangements for Barat. Guests were very impressed. I highly recommend Raheem Events.",
      date: locale === "ur" ? "اگست ۲۰۲۳" : "August 2023",
    },
    {
      id: 6,
      name: locale === "ur" ? "سارہ اقبال" : "Sara Iqbal",
      eventType: locale === "ur" ? "شادی" : "Wedding",
      venue: locale === "ur" ? "اصرار میرج ہال" : "Israr Marriage Hall",
      rating: 5,
      quote:
        locale === "ur"
          ? "ہماری شادی کا سب سے یادگار حصہ کھانا تھا! بریانی اور BBQ سب کو بہت پسند آیا۔"
          : "The most memorable part of our wedding was the food! Everyone loved the biryani and BBQ.",
      date: locale === "ur" ? "جولائی ۲۰۲۳" : "July 2023",
    },
  ];

  const stats = [
    {
      value: "500+",
      label: locale === "ur" ? "کامیاب تقریبات" : "Successful Events",
      icon: Calendar,
    },
    {
      value: "1000+",
      label: locale === "ur" ? "خوش گاہک" : "Happy Clients",
      icon: Users,
    },
    {
      value: "4.9",
      label: locale === "ur" ? "اوسط ریٹنگ" : "Average Rating",
      icon: Star,
    },
    {
      value: "20+",
      label: locale === "ur" ? "سال کا تجربہ" : "Years Experience",
      icon: Heart,
    },
  ];

  const videoTestimonials = [
    {
      id: 1,
      name: locale === "ur" ? "علی اور سانیہ" : "Ali & Sania",
      event: locale === "ur" ? "شادی کی تقریب" : "Wedding Ceremony",
      thumbnail: "https://images.unsplash.com/photo-1519741347686-c1e0aadf4611?w=800&q=80",
    },
    {
      id: 2,
      name: locale === "ur" ? "عمر اور حوا" : "Umar & Hawa",
      event: locale === "ur" ? "ولیمہ کی تقریب" : "Walima Reception",
      thumbnail: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80",
    },
  ];

  return (
    <>
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

          {/* Decorative blurs */}
          <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-[#D4AF37]/10 blur-3xl" />
          <div className="absolute bottom-20 left-20 w-48 h-48 rounded-full bg-[#DA291C]/10 blur-3xl" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Rating badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/20 rounded-full mb-6">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="text-[#D4AF37] fill-[#D4AF37]" />
                ))}
              </div>
              <span className="text-[#D4AF37] text-sm font-medium">
                4.9/5 ({locale === "ur" ? "۵۰۰+ ریویوز" : "500+ Reviews"})
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

        {/* Stats section */}
        <section className="py-12 bg-white border-b border-[#E5E5E5]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#D4AF37]/10 mb-3">
                    <stat.icon size={24} className="text-[#D4AF37]" />
                  </div>
                  <div className="font-heading text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-1">
                    {stat.value}
                  </div>
                  <div className="text-[#6B7280]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title={locale === "ur" ? "گاہکوں کی آراء" : "Client Reviews"}
              subtitle={
                locale === "ur"
                  ? "ہمارے خوش گاہکوں کی حقیقی کہانیاں"
                  : "Real stories from our happy clients"
              }
              align="center"
              decorationStyle="line"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className="group bg-white rounded-sm border border-[#E5E5E5] p-6 hover:border-[#D4AF37] hover:shadow-xl transition-all duration-300"
                >
                  {/* Quote icon */}
                  <Quote
                    size={32}
                    className="text-[#D4AF37]/20 mb-4 group-hover:text-[#D4AF37]/40 transition-colors"
                  />

                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} className="text-[#D4AF37] fill-[#D4AF37]" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-[#6B7280] leading-relaxed mb-6">
                    "{testimonial.quote}"
                  </p>

                  {/* Author info */}
                  <div className="flex items-center gap-4 pt-4 border-t border-[#E5E5E5]">
                    {/* Avatar placeholder */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8962E] flex items-center justify-center text-white font-semibold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-medium text-[#1A1A1A]">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-[#6B7280]">
                        {testimonial.eventType} • {testimonial.date}
                      </p>
                    </div>
                  </div>

                  {/* Venue badge */}
                  <div className="mt-4">
                    <span className="inline-block px-3 py-1 bg-[#FAFAFA] text-[#6B7280] text-xs rounded-full">
                      {testimonial.venue}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Video Testimonials */}
        <section className="py-16 md:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeading
              title={locale === "ur" ? "ویڈیو تعریفیں" : "Video Testimonials"}
              subtitle={
                locale === "ur"
                  ? "ہمارے گاہکوں کو سنیں"
                  : "Hear directly from our clients"
              }
              align="center"
              decorationStyle="line"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              {videoTestimonials.map((video) => (
                <div
                  key={video.id}
                  className="group relative aspect-video bg-[#1A1A1A] rounded-sm overflow-hidden cursor-pointer"
                >
                  {/* Placeholder */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play size={48} className="text-white/30" />
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-[#D4AF37] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Play size={24} className="text-white ml-1" fill="white" />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-heading text-xl font-semibold text-white mb-1">
                      {video.name}
                    </h3>
                    <p className="text-white/70">{video.event}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Google Reviews Section */}
        <section className="py-16 md:py-24 bg-[#FAFAFA]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-lg mb-6">
              <svg
                viewBox="0 0 24 24"
                width="32"
                height="32"
                className="text-[#4285F4]"
              >
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            </div>

            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#1A1A1A] mb-4">
              {t("googleReviews")}
            </h2>
            <p className="text-[#6B7280] text-lg mb-8">
              {locale === "ur"
                ? "گوگل پر ہماری ریٹنگ دیکھیں"
                : "See our ratings on Google"}
            </p>

            {/* Google reviews placeholder */}
            <div className="bg-white rounded-sm border border-[#E5E5E5] p-8">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="font-heading text-5xl font-bold text-[#1A1A1A]">
                  4.9
                </div>
                <div className="text-left">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={20} className="text-[#FBBC05] fill-[#FBBC05]" />
                    ))}
                  </div>
                  <p className="text-sm text-[#6B7280]">
                    {locale === "ur" ? "۵۰۰+ گوگل ریویوز" : "500+ Google Reviews"}
                  </p>
                </div>
              </div>

              <a
                href="https://www.google.com/search?q=raheem+events"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[#4285F4] font-medium hover:underline"
              >
                {locale === "ur" ? "گوگل پر دیکھیں" : "View on Google"}
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-[#1A1A1A] to-[#2D2D2D] text-white relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-[#D4AF37]/30" />
          <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-[#D4AF37]/30" />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
              {locale === "ur"
                ? "اگلی کامیاب تقریب آپ کی ہو سکتی ہے!"
                : "Your Event Could Be Our Next Success Story!"}
            </h2>
            <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
              {locale === "ur"
                ? "آج ہی رابطہ کریں اور اپنی خاص تقریب کی منصوبہ بندی شروع کریں"
                : "Contact us today and start planning your special event"}
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
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  {tCommon("callNow")}
                </Button>
              </a>
              <Link href="/book-now">
                <Button variant="gold" size="lg">
                  {tCommon("bookNow")}
                </Button>
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
