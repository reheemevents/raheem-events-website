import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Inter, Playfair_Display, Noto_Nastaliq_Urdu } from "next/font/google";
import { getDirection } from "@/lib/utils";
import "../globals.css";

// Fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const notoNastaliq = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-nastaliq",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const titles = {
    en: "Raheem Event Management & Catering | Wedding Halls & Catering Services",
    ur: "رحیم ایونٹ مینجمنٹ اینڈ کیٹرنگ | شادی ہالز اور کیٹرنگ سروسز",
  };

  const descriptions = {
    en: "Premium catering services and elegant marriage halls - Israr Marriage Hall and Mumtaz Banquet Hall. Book your wedding, mehndi, barat, or walima today.",
    ur: "پریمیم کیٹرنگ سروسز اور خوبصورت شادی ہالز - اصرار میرج ہال اور ممتاز بینکوئٹ ہال۔ آج ہی اپنی شادی، مہندی، بارات، یا ولیمہ بک کریں۔",
  };

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description:
      descriptions[locale as keyof typeof descriptions] || descriptions.en,
    keywords: [
      "wedding hall",
      "marriage hall",
      "catering services",
      "Lahore",
      "Pakistan",
      "wedding catering",
      "mehndi",
      "barat",
      "walima",
      "Israr Marriage Hall",
      "Mumtaz Banquet Hall",
    ],
    openGraph: {
      title: titles[locale as keyof typeof titles] || titles.en,
      description:
        descriptions[locale as keyof typeof descriptions] || descriptions.en,
      locale: locale === "ur" ? "ur_PK" : "en_US",
      type: "website",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as "en" | "ur")) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client side is the easiest way to get started
  const messages = await getMessages();

  const dir = getDirection(locale);

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} ${notoNastaliq.variable} font-sans antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
