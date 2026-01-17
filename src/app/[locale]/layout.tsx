import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Cormorant_Garamond, DM_Sans, Bodoni_Moda, Noto_Nastaliq_Urdu } from "next/font/google";
import "../globals.css";
import { generateOrganizationSchema, generateLocalBusinessSchema, SchemaScript } from "@/lib/seo";

// Fonts - Luxury Editorial Typography
const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-heading",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const notoNastaliq = Noto_Nastaliq_Urdu({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-urdu",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata() {
  return {
    title: {
      template: "%s | Raheem Event Management & Catering",
      default: "Raheem Event Management & Catering | Wedding Halls & Catering Services",
    },
    description: "Premium catering services and elegant marriage halls in Mirpur, AJK - Israr Marriage Hall and Mumtaz Banquet Hall. Book your wedding, mehndi, barat, or walima today.",
    keywords: [
      "wedding hall",
      "marriage hall",
      "catering services",
      "Mirpur AJK",
      "Pakistan",
      "wedding catering",
      "mehndi",
      "barat",
      "walima",
      "Israr Marriage Hall",
      "Mumtaz Banquet Hall",
      "halal catering",
      "event management",
    ],
    authors: [{ name: "Raheem Event Management & Catering" }],
    creator: "Raheem Event Management & Catering",
    publisher: "Raheem Event Management & Catering",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL("https://raheemevents.com"),
    openGraph: {
      title: "Raheem Event Management & Catering | Wedding Halls & Catering Services",
      description: "Premium catering services and elegant marriage halls in Mirpur, AJK - Israr Marriage Hall and Mumtaz Banquet Hall. Book your wedding, mehndi, barat, or walima today.",
      url: "https://raheemevents.com",
      siteName: "Raheem Event Management & Catering",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: "https://raheemevents.com/images/og-default.jpg",
          width: 1200,
          height: 630,
          alt: "Raheem Event Management & Catering",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Raheem Event Management & Catering | Wedding Halls & Catering Services",
      description: "Premium catering services and elegant marriage halls in Mirpur, AJK",
      images: ["https://raheemevents.com/images/og-default.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
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
  if (!routing.locales.includes(locale as "en")) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === "ur" ? "rtl" : "ltr"} suppressHydrationWarning>
      <head>
        <SchemaScript schema={generateOrganizationSchema()} />
        <SchemaScript schema={generateLocalBusinessSchema()} />
      </head>
      <body
        className={`${cormorantGaramond.variable} ${dmSans.variable} ${bodoniModa.variable} ${notoNastaliq.variable} font-body antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
