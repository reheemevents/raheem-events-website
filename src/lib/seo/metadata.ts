/**
 * Metadata generation utilities for Next.js pages
 * Generates complete metadata including OpenGraph, Twitter Cards, and canonical URLs
 */

import type { Metadata } from "next";
import type { MetadataOptions, OpenGraphImage } from "./types";

import {
  SITE_URL,
  SITE_NAME,
  SITE_NAME_SHORT,
  CONTACT,
  DEFAULT_METADATA,
  DEFAULT_IMAGES,
} from "./constants";

// ==================== MAIN METADATA GENERATOR ====================

const DEFAULT_OG_IMAGE: OpenGraphImage = {
  url: `${SITE_URL}${DEFAULT_IMAGES.ogDefault}`,
  width: 1200,
  height: 630,
  alt: SITE_NAME,
};

/**
 * Generates complete page metadata with OpenGraph, Twitter Cards, and canonical URLs
 * Use this for all pages to ensure consistent metadata
 */
export function generatePageMetadata(options: MetadataOptions): Metadata {
  const {
    title,
    description,
    url,
    type = DEFAULT_METADATA.type,
    images = [DEFAULT_OG_IMAGE],
    locale = "en",
    keywords = [],
  } = options;

  // Brand once at the end; `absolute` stops the layout title template adding it again
  const fullTitle = title.includes("Raheem") ? title : `${title} | ${SITE_NAME_SHORT}`;

  // Ensure URLs are absolute
  const absoluteUrl = url.startsWith("http") ? url : `${SITE_URL}${url === "/" ? "" : url}`;
  const absoluteImages = images.map((img) => ({
    ...img,
    url: img.url.startsWith("http") ? img.url : `${SITE_URL}${img.url}`,
  }));

  return {
    title: { absolute: fullTitle },
    description,
    keywords: keywords.length > 0 ? keywords : undefined,
    alternates: {
      canonical: absoluteUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: absoluteUrl,
      siteName: SITE_NAME,
      images: absoluteImages,
      locale: locale === "en" ? DEFAULT_METADATA.locale.en : DEFAULT_METADATA.locale.ur,
      type,
    },
    twitter: {
      card: DEFAULT_METADATA.twitterCard,
      title: fullTitle,
      description,
      images: absoluteImages.map((img) => img.url),
    },
  };
}

const PHONE_DISPLAY = CONTACT.phone.replace(/-/g, " ");

// ==================== SPECIALIZED METADATA GENERATORS ====================

interface VenueMetaInput {
  name: { en: string };
  slug: string;
  capacity: { total: string | number };
  location: { address: { en: string } };
  poster?: string;
}

/**
 * Generates metadata for venue pages
 */
export function generateVenueMetadata(venue: VenueMetaInput, locale: string = "en"): Metadata {
  const name = venue.name.en;
  const capacity = venue.capacity.total;

  return generatePageMetadata({
    title: `${name} Mirpur AJK – Up to ${capacity} Guests`,
    description: `${name} in Mirpur, AJK for weddings, mehndi, barat, walima and corporate events – up to ${capacity} guests, with in-house catering by Raheem. ${venue.location.address.en}. Call ${PHONE_DISPLAY}.`,
    url: `/venues/${venue.slug}`,
    images: venue.poster
      ? [{ url: venue.poster, alt: `${name} – ${SITE_NAME}` }, DEFAULT_OG_IMAGE]
      : undefined,
    locale,
    keywords: [
      name,
      `${name} Mirpur`,
      "marriage hall Mirpur",
      "wedding hall Mirpur AJK",
      "banquet hall Mirpur",
      "wedding venue Mirpur",
      `${capacity} guests venue`,
    ],
  });
}

interface MenuItemMetaInput {
  id: string;
  category: string;
  image: string;
  name: { en: string };
}

/**
 * Generates metadata for menu item pages
 */
export function generateMenuItemMetadata(
  item: MenuItemMetaInput,
  categoryName: string,
  locale: string = "en"
): Metadata {
  const itemName = item.name.en;

  return generatePageMetadata({
    title: `${itemName} – Wedding Catering Mirpur`,
    description: `${itemName} from our ${categoryName} menu, freshly prepared for weddings, mehndi, walima and events in Mirpur, AJK. Order from Raheem Events catering – call ${PHONE_DISPLAY}.`,
    url: `/menu/${item.category}/${item.id}`,
    images: [{ url: item.image, alt: `${itemName} – ${SITE_NAME}` }],
    locale,
    keywords: [itemName, `${itemName} catering`, categoryName, "wedding catering Mirpur", "halal catering AJK"],
  });
}

interface CategoryMetaInput {
  slug: string;
  name: { en: string };
  description: { en: string };
}

/**
 * Generates metadata for menu category pages
 */
export function generateCategoryMetadata(category: CategoryMetaInput, locale: string = "en"): Metadata {
  const categoryName = category.name.en;

  return generatePageMetadata({
    title: `${categoryName} Catering Menu – Mirpur AJK`,
    description: `${category.description.en} Catering for weddings and events in Mirpur, AJK by Raheem Events.`,
    url: `/menu/${category.slug}`,
    locale,
    keywords: [`${categoryName} catering`, `${categoryName} menu`, "wedding catering Mirpur", "Pakistani food catering"],
  });
}

/**
 * Generates metadata for the home page
 */
export function generateHomeMetadata(locale: string = "en"): Metadata {
  return generatePageMetadata({
    title: "Marriage Halls & Wedding Catering in Mirpur AJK | Raheem Events",
    description: `Raheem Events – wedding venues and catering in Mirpur, AJK since 2005. Israr Marriage Hall, Mumtaz Banquet Hall and a marquee for 1500 guests. Call ${PHONE_DISPLAY}.`,
    url: "/",
    locale,
    keywords: [
      "marriage hall Mirpur",
      "wedding hall Mirpur AJK",
      "banquet hall Mirpur",
      "marquee Mirpur",
      "wedding catering Mirpur",
      "catering services Mirpur AJK",
      "event management Mirpur",
      SITE_NAME,
    ],
  });
}

/**
 * Generates metadata for the menu overview page
 */
export function generateMenuMetadata(locale: string = "en"): Metadata {
  return generatePageMetadata({
    title: "Wedding & Event Catering Menu – 107+ Dishes",
    description:
      "Browse 107+ dishes for your wedding or event in Mirpur, AJK – biryani, BBQ, qorma, karahi, Chinese, desserts and more. Halal catering by Raheem Events.",
    url: "/menu",
    locale,
    keywords: ["wedding catering menu", "catering menu Mirpur", "biryani catering", "BBQ catering", "Pakistani wedding food"],
  });
}

/**
 * Generates metadata for the catering page
 */
export function generateCateringMetadata(locale: string = "en"): Metadata {
  return generatePageMetadata({
    title: "Wedding Catering Services in Mirpur AJK",
    description: `Wedding and event catering in Mirpur, AJK – Pakistani, BBQ, Chinese and Continental menus for mehndi, barat, walima and corporate events. Get a quote: ${PHONE_DISPLAY}.`,
    url: "/catering",
    locale,
    keywords: [
      "wedding catering Mirpur",
      "catering services Mirpur AJK",
      "event catering Mirpur",
      "corporate catering AJK",
      "halal catering Mirpur",
    ],
  });
}

/**
 * Generates metadata for the venues overview page
 */
export function generateVenuesMetadata(locale: string = "en"): Metadata {
  return generatePageMetadata({
    title: "Marriage Halls & Banquet Halls in Mirpur AJK",
    description:
      "Three wedding venues in Mirpur, AJK: Israr Marriage Hall (700 guests), Mumtaz Banquet Hall (700 guests) and a marquee for up to 1500 guests – with in-house catering.",
    url: "/venues",
    locale,
    keywords: [
      "marriage halls Mirpur",
      "banquet halls Mirpur AJK",
      "wedding venues Mirpur",
      "marquee Mirpur",
      "wedding hall booking Mirpur",
    ],
  });
}

/**
 * Generates metadata for the FAQ page
 */
export function generateFAQMetadata(locale: string = "en"): Metadata {
  return generatePageMetadata({
    title: "FAQs – Wedding Halls & Catering in Mirpur",
    description:
      "Answers about hall capacity, booking, catering menus, pricing and event planning at Raheem Events, Mirpur, AJK.",
    url: "/faq",
    locale,
    keywords: ["marriage hall booking Mirpur", "wedding catering questions", "hall capacity Mirpur"],
  });
}

/**
 * Generates metadata for the gallery page
 */
export function generateGalleryMetadata(locale: string = "en"): Metadata {
  return generatePageMetadata({
    title: "Wedding Hall Photos & Videos – Mirpur AJK",
    description:
      "Photos and video tours of Israr Marriage Hall and our 1500-guest marquee in Mirpur, AJK – stage setups, decor and real wedding events by Raheem Events.",
    url: "/gallery",
    locale,
    keywords: ["wedding hall photos Mirpur", "marriage hall video Mirpur", "wedding decor Mirpur"],
  });
}

/**
 * Generates metadata for the contact page
 */
export function generateContactMetadata(locale: string = "en"): Metadata {
  return generatePageMetadata({
    title: `Contact Raheem Events Mirpur – ${PHONE_DISPLAY}`,
    description: `Book a marriage hall or catering in Mirpur, AJK. Call or WhatsApp ${PHONE_DISPLAY}, or visit us at Haul Rd, Sector F-1, New Mirpur City.`,
    url: "/contact",
    locale,
    keywords: ["Raheem Events contact", "marriage hall booking Mirpur", "catering Mirpur phone number"],
  });
}

/**
 * Generates metadata for the book now page
 */
export function generateBookNowMetadata(locale: string = "en"): Metadata {
  return generatePageMetadata({
    title: "Book a Wedding Hall or Catering in Mirpur",
    description: `Check dates and book your wedding, mehndi, walima or corporate event at Raheem Events, Mirpur, AJK. Quick reply on WhatsApp ${PHONE_DISPLAY}.`,
    url: "/book-now",
    locale,
    keywords: ["book marriage hall Mirpur", "wedding hall booking AJK", "book catering Mirpur"],
  });
}

/**
 * Generates metadata for the menu builder page
 */
export function generateMenuBuilderMetadata(locale: string = "en"): Metadata {
  return generatePageMetadata({
    title: "Build Your Wedding Menu & Get a Quote",
    description:
      "Pick dishes from our 107+ item menu to build a custom wedding or event catering menu and request a quote from Raheem Events, Mirpur, AJK.",
    url: "/menu-builder",
    locale,
    keywords: ["custom wedding menu", "catering quote Mirpur", "wedding menu builder"],
  });
}

/**
 * Generates metadata for the testimonials page
 */
export function generateTestimonialsMetadata(locale: string = "en"): Metadata {
  return generatePageMetadata({
    title: "Client Reviews & Testimonials – Mirpur Weddings",
    description:
      "Read what families say about their weddings, mehndi and walima events with Raheem Events' halls and catering in Mirpur, AJK.",
    url: "/testimonials",
    locale,
    keywords: ["Raheem Events reviews", "marriage hall reviews Mirpur", "catering reviews Mirpur"],
  });
}

/**
 * Generates metadata for the about page
 */
export function generateAboutMetadata(locale: string = "en"): Metadata {
  return generatePageMetadata({
    title: "About Raheem Events – Mirpur Since 2005",
    description:
      "Raheem Event Management & Catering has served Mirpur, AJK since 2005 with wedding halls, a 1500-guest marquee, catering and complete event management.",
    url: "/about",
    locale,
    keywords: ["Raheem Events", "event management Mirpur", "wedding planners Mirpur AJK"],
  });
}
