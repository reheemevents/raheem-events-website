/**
 * Metadata generation utilities for Next.js pages
 * Generates complete metadata including OpenGraph, Twitter Cards, and canonical URLs
 */

import type { Metadata } from "next";
import type {
  MetadataOptions,
  VenueData,
  MenuItem,
  Category,
  OpenGraphImage,
} from "./types";

import {
  SITE_URL,
  SITE_NAME,
  BUSINESS,
  DEFAULT_METADATA,
  DEFAULT_IMAGES,
} from "./constants";

// ==================== MAIN METADATA GENERATOR ====================

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
    images = [
      {
        url: `${SITE_URL}${DEFAULT_IMAGES.ogDefault}`,
        width: 1200,
        height: 630,
      },
    ],
    locale = "en",
    keywords = [],
  } = options;

  // Ensure full title format
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

  // Ensure URLs are absolute
  const absoluteUrl = url.startsWith("http") ? url : `${SITE_URL}${url}`;
  const absoluteImages = images.map((img) => ({
    ...img,
    url: img.url.startsWith("http") ? img.url : `${SITE_URL}${img.url}`,
  }));

  return {
    title: fullTitle,
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

// ==================== SPECIALIZED METADATA GENERATORS ====================

/**
 * Generates metadata for venue pages
 */
export function generateVenueMetadata(
  venue: VenueData,
  locale: string = "en"
): Metadata {
  const venueName = venue.name[locale as keyof typeof venue.name] || venue.name.en;
  const venueDescription =
    venue.description[locale as keyof typeof venue.description] ||
    venue.description.en;

  // Use first venue image as OpenGraph image
  const venueImage: OpenGraphImage = venue.images[0]
    ? {
        url: venue.images[0].startsWith("http")
          ? venue.images[0]
          : `${SITE_URL}${venue.images[0]}`,
        width: 1200,
        height: 630,
        alt: `${venueName} - ${SITE_NAME}`,
      }
    : {
        url: `${SITE_URL}${DEFAULT_IMAGES.ogDefault}`,
        width: 1200,
        height: 630,
      };

  return generatePageMetadata({
    title: `${venueName} - Premium Event Venue`,
    description: venueDescription,
    url: `/venues/${venue.slug}`,
    images: [venueImage],
    locale,
    keywords: [
      venueName,
      "marriage hall",
      "wedding venue",
      "event venue",
      "Mirpur AJK",
      SITE_NAME,
      `${venue.capacity.total} capacity`,
    ],
  });
}

/**
 * Generates metadata for menu item pages
 */
export function generateMenuItemMetadata(
  item: MenuItem,
  category: string,
  locale: string = "en"
): Metadata {
  const itemName = item.name[locale as keyof typeof item.name] || item.name.en;
  const itemDescription = item.description
    ? item.description[locale as keyof typeof item.description] || item.description.en
    : `Traditional ${itemName} from our ${category} menu. Available for weddings, events, and catering services.`;

  const itemImage: OpenGraphImage = {
    url: item.image.startsWith("http") ? item.image : `${SITE_URL}${item.image}`,
    width: 1200,
    height: 630,
    alt: `${itemName} - ${SITE_NAME}`,
  };

  return generatePageMetadata({
    title: `${itemName} - ${category}`,
    description: itemDescription,
    url: `/menu/${item.category}/${item.id}`,
    images: [itemImage],
    locale,
    keywords: [
      itemName,
      category,
      "Pakistani food",
      "wedding catering",
      "halal food",
      SITE_NAME,
      "Mirpur AJK",
    ],
  });
}

/**
 * Generates metadata for menu category pages
 */
export function generateCategoryMetadata(
  category: Category,
  locale: string = "en"
): Metadata {
  const categoryName =
    category.name[locale as keyof typeof category.name] || category.name.en;
  const categoryDescription = category.description
    ? category.description[locale as keyof typeof category.description] ||
      category.description.en
    : `Explore our ${categoryName} menu featuring authentic Pakistani dishes. Perfect for weddings, events, and catering services in Mirpur, AJK.`;

  const categoryImage: OpenGraphImage = category.image
    ? {
        url: category.image.startsWith("http")
          ? category.image
          : `${SITE_URL}${category.image}`,
        width: 1200,
        height: 630,
        alt: `${categoryName} - ${SITE_NAME}`,
      }
    : {
        url: `${SITE_URL}${DEFAULT_IMAGES.ogDefault}`,
        width: 1200,
        height: 630,
      };

  return generatePageMetadata({
    title: `${categoryName} Menu - Authentic Pakistani Cuisine`,
    description: categoryDescription,
    url: `/menu/${category.slug}`,
    images: [categoryImage],
    locale,
    keywords: [
      categoryName,
      "Pakistani food",
      "wedding catering",
      "halal food",
      SITE_NAME,
      "Mirpur AJK",
    ],
  });
}

/**
 * Generates metadata for the home page
 */
export function generateHomeMetadata(locale: string = "en"): Metadata {
  const description =
    locale === "en" ? BUSINESS.description.en : BUSINESS.description.ur;
  const tagline = locale === "en" ? BUSINESS.tagline.en : BUSINESS.tagline.ur;

  return generatePageMetadata({
    title: `${SITE_NAME} - ${tagline}`,
    description,
    url: "/",
    locale,
    keywords: [
      "wedding catering",
      "marriage halls",
      "event management",
      "Mirpur AJK",
      "Pakistani food",
      "BBQ",
      "halal catering",
      SITE_NAME,
    ],
  });
}

/**
 * Generates metadata for the menu overview page
 */
export function generateMenuMetadata(locale: string = "en"): Metadata {
  return generatePageMetadata({
    title: "Our Menu - Authentic Pakistani Cuisine",
    description:
      "Explore our extensive menu featuring 107+ authentic Pakistani dishes including Rice, BBQ, Qorma, Curry, Chinese, Desserts, and more. Perfect for weddings and events.",
    url: "/menu",
    locale,
    keywords: [
      "menu",
      "Pakistani food",
      "wedding catering",
      "BBQ",
      "biryani",
      "halal food",
      SITE_NAME,
    ],
  });
}

/**
 * Generates metadata for the catering page
 */
export function generateCateringMetadata(locale: string = "en"): Metadata {
  return generatePageMetadata({
    title: "Catering Services - Premium Wedding & Event Catering",
    description:
      "Professional catering services for weddings, corporate events, and private parties in Mirpur, AJK. Featuring authentic Pakistani, BBQ, Chinese, and Continental cuisine.",
    url: "/catering",
    locale,
    keywords: [
      "catering services",
      "wedding catering",
      "event catering",
      "corporate catering",
      "Mirpur AJK",
      SITE_NAME,
    ],
  });
}

/**
 * Generates metadata for the venues overview page
 */
export function generateVenuesMetadata(locale: string = "en"): Metadata {
  return generatePageMetadata({
    title: "Our Venues - Premium Marriage Halls & Banquet Halls",
    description:
      "Discover our premium marriage halls in Mirpur, AJK. Israr Marriage Hall (700 capacity) and Mumtaz Banquet Hall (500 capacity) - perfect for weddings and events.",
    url: "/venues",
    locale,
    keywords: [
      "marriage halls",
      "wedding venues",
      "banquet halls",
      "event venues",
      "Mirpur AJK",
      SITE_NAME,
    ],
  });
}

/**
 * Generates metadata for the FAQ page
 */
export function generateFAQMetadata(locale: string = "en"): Metadata {
  return generatePageMetadata({
    title: "Frequently Asked Questions - Your Event Queries Answered",
    description:
      "Find answers to common questions about our catering services, venue booking, menu options, pricing, and event planning in Mirpur, AJK.",
    url: "/faq",
    locale,
    keywords: [
      "FAQ",
      "questions",
      "catering FAQ",
      "venue booking",
      "event planning",
      SITE_NAME,
    ],
  });
}

/**
 * Generates metadata for the gallery page
 */
export function generateGalleryMetadata(locale: string = "en"): Metadata {
  return generatePageMetadata({
    title: "Gallery - Our Events & Catering Showcase",
    description:
      "Browse our gallery showcasing stunning weddings, events, and delicious food spreads. See why we're the premier choice for events in Mirpur, AJK.",
    url: "/gallery",
    locale,
    keywords: [
      "gallery",
      "wedding photos",
      "event photos",
      "food gallery",
      SITE_NAME,
    ],
  });
}

/**
 * Generates metadata for the contact page
 */
export function generateContactMetadata(locale: string = "en"): Metadata {
  return generatePageMetadata({
    title: "Contact Us - Get in Touch for Your Event",
    description:
      "Contact Raheem Event Management & Catering for bookings and inquiries. Call +92-344-4477751 or visit us in Mirpur, AJK.",
    url: "/contact",
    locale,
    keywords: [
      "contact",
      "booking",
      "inquiry",
      "Mirpur AJK",
      SITE_NAME,
    ],
  });
}

/**
 * Generates metadata for the book now page
 */
export function generateBookNowMetadata(locale: string = "en"): Metadata {
  return generatePageMetadata({
    title: "Book Now - Reserve Your Event Today",
    description:
      "Book your wedding, corporate event, or private party with Raheem Events. Premium catering and venue services in Mirpur, AJK.",
    url: "/book-now",
    locale,
    keywords: [
      "book now",
      "reservation",
      "booking",
      "event booking",
      SITE_NAME,
    ],
  });
}

/**
 * Generates metadata for the menu builder page
 */
export function generateMenuBuilderMetadata(locale: string = "en"): Metadata {
  return generatePageMetadata({
    title: "Menu Builder - Create Your Custom Event Menu",
    description:
      "Design your perfect event menu by selecting from our 107+ authentic dishes. Build custom menus for your wedding or event.",
    url: "/menu-builder",
    locale,
    keywords: [
      "menu builder",
      "custom menu",
      "event planning",
      "wedding menu",
      SITE_NAME,
    ],
  });
}

/**
 * Generates metadata for the testimonials page
 */
export function generateTestimonialsMetadata(locale: string = "en"): Metadata {
  return generatePageMetadata({
    title: "Testimonials - What Our Clients Say",
    description:
      "Read reviews and testimonials from our satisfied clients. Discover why we're rated 4.9/5 stars for our catering and venue services in Mirpur, AJK.",
    url: "/testimonials",
    locale,
    keywords: [
      "testimonials",
      "reviews",
      "client feedback",
      "ratings",
      SITE_NAME,
    ],
  });
}

/**
 * Generates metadata for the about page
 */
export function generateAboutMetadata(locale: string = "en"): Metadata {
  return generatePageMetadata({
    title: "About Us - Premium Event Management Since 2005",
    description:
      "Learn about Raheem Event Management & Catering - serving Mirpur, AJK since 2005 with premium catering services and elegant event venues.",
    url: "/about",
    locale,
    keywords: [
      "about us",
      "company history",
      "event management",
      "Mirpur AJK",
      SITE_NAME,
    ],
  });
}
