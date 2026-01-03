import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Cormorant_Garamond, DM_Sans, Bodoni_Moda, Noto_Nastaliq_Urdu } from "next/font/google";
import "../globals.css";

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
    title: "Raheem Event Management & Catering | Wedding Halls & Catering Services",
    description: "Premium catering services and elegant marriage halls - Israr Marriage Hall and Mumtaz Banquet Hall. Book your wedding, mehndi, barat, or walima today.",
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
      title: "Raheem Event Management & Catering | Wedding Halls & Catering Services",
      description: "Premium catering services and elegant marriage halls - Israr Marriage Hall and Mumtaz Banquet Hall. Book your wedding, mehndi, barat, or walima today.",
      locale: "en_US",
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
  if (!routing.locales.includes(locale as "en")) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
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
