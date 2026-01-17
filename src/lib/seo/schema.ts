/**
 * Schema.org JSON-LD generators for structured data
 * These functions create type-safe structured data for search engines and AI
 */

import type {
  OrganizationSchema,
  LocalBusinessSchema,
  EventVenueSchema,
  FoodEstablishmentSchema,
  MenuItemSchema,
  FAQPageSchema,
  BreadcrumbListSchema,
  AggregateRatingSchema,
  VenueData,
  MenuItem,
  FAQItem,
  RatingData,
  BreadcrumbItem,
} from "./types";

import {
  SITE_URL,
  SITE_NAME,
  BUSINESS,
  CONTACT,
  ADDRESS,
  GEO_COORDINATES,
  SOCIAL_MEDIA,
  BUSINESS_DETAILS,
  OPENING_HOURS,
  RATING,
  DEFAULT_IMAGES,
  SCHEMA_IDS,
} from "./constants";

// ==================== ORGANIZATION SCHEMA ====================

/**
 * Generates Organization schema for company identity
 * Should be included on all pages (typically in root layout)
 */
export function generateOrganizationSchema(): OrganizationSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": SCHEMA_IDS.organization,
    name: BUSINESS.name,
    url: SITE_URL,
    logo: `${SITE_URL}${DEFAULT_IMAGES.logo}`,
    image: [...DEFAULT_IMAGES.hero],
    description: BUSINESS.description.en,
    foundingDate: BUSINESS.foundingDate,
    telephone: CONTACT.phone,
    email: CONTACT.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: ADDRESS.streetAddress,
      addressLocality: ADDRESS.addressLocality,
      addressRegion: ADDRESS.addressRegion,
      postalCode: ADDRESS.postalCode,
      addressCountry: ADDRESS.addressCountry,
    },
    sameAs: [SOCIAL_MEDIA.facebook, SOCIAL_MEDIA.instagram].filter(Boolean),
  };
}

// ==================== LOCAL BUSINESS SCHEMA ====================

/**
 * Generates LocalBusiness schema with multiple types
 * Should be included on all pages (typically in root layout)
 */
export function generateLocalBusinessSchema(): LocalBusinessSchema {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "FoodEstablishment", "EventVenue"],
    "@id": SCHEMA_IDS.business,
    name: BUSINESS.name,
    image: [...DEFAULT_IMAGES.hero],
    telephone: CONTACT.phone,
    priceRange: BUSINESS_DETAILS.priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: ADDRESS.streetAddress,
      addressLocality: ADDRESS.addressLocality,
      addressRegion: ADDRESS.addressRegion,
      postalCode: ADDRESS.postalCode,
      addressCountry: ADDRESS.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: GEO_COORDINATES.latitude,
      longitude: GEO_COORDINATES.longitude,
    },
    url: SITE_URL,
    openingHoursSpecification: OPENING_HOURS.map((hours) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [...hours.dayOfWeek],
      opens: hours.opens,
      closes: hours.closes,
    })),
    servesCuisine: [...BUSINESS_DETAILS.cuisines],
    paymentAccepted: BUSINESS_DETAILS.paymentAccepted,
    currenciesAccepted: BUSINESS_DETAILS.currenciesAccepted,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: RATING.ratingValue,
      bestRating: RATING.bestRating,
      ratingCount: RATING.ratingCount,
      reviewCount: RATING.reviewCount,
    },
  };
}

// ==================== EVENT VENUE SCHEMA ====================

/**
 * Generates EventVenue schema for specific venue pages
 * Auto-populates from venue JSON data
 */
export function generateEventVenueSchema(
  venueData: VenueData,
  locale: string = "en"
): EventVenueSchema {
  const venueName = venueData.name[locale as keyof typeof venueData.name] || venueData.name.en;
  const venueDescription =
    venueData.description[locale as keyof typeof venueData.description] || venueData.description.en;

  // Generate venue-specific images array
  const venueImages = venueData.images.map((img) => {
    // If image is already a full URL, use it; otherwise prepend SITE_URL
    return img.startsWith("http") ? img : `${SITE_URL}${img}`;
  });

  return {
    "@context": "https://schema.org",
    "@type": "EventVenue",
    name: venueName,
    description: venueDescription,
    image: venueImages,
    address: {
      "@type": "PostalAddress",
      streetAddress: ADDRESS.streetAddress,
      addressLocality: ADDRESS.addressLocality,
      addressRegion: ADDRESS.addressRegion,
      postalCode: ADDRESS.postalCode,
      addressCountry: ADDRESS.addressCountry,
    },
    telephone: CONTACT.phone,
    url: `${SITE_URL}/venues/${venueData.slug}`,
    maximumAttendeeCapacity: venueData.capacity.total,
    amenityFeature: (venueData.amenities || []).map((amenity) => ({
      "@type": "LocationFeatureSpecification",
      name: amenity,
    })),
    smokingAllowed: false,
    publicAccess: true,
    isAccessibleForFree: false,
    geo: venueData.location
      ? {
          "@type": "GeoCoordinates",
          latitude: venueData.location.lat,
          longitude: venueData.location.lng,
        }
      : {
          "@type": "GeoCoordinates",
          latitude: GEO_COORDINATES.latitude,
          longitude: GEO_COORDINATES.longitude,
        },
  };
}

// ==================== FOOD ESTABLISHMENT SCHEMA ====================

/**
 * Generates FoodEstablishment schema for catering page
 */
export function generateFoodEstablishmentSchema(): FoodEstablishmentSchema {
  return {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    name: BUSINESS.name,
    servesCuisine: [...BUSINESS_DETAILS.cuisines],
    hasMenu: `${SITE_URL}/menu`,
    priceRange: BUSINESS_DETAILS.priceRange,
    acceptsReservations: "True",
    address: {
      "@type": "PostalAddress",
      streetAddress: ADDRESS.streetAddress,
      addressLocality: ADDRESS.addressLocality,
      addressRegion: ADDRESS.addressRegion,
      postalCode: ADDRESS.postalCode,
      addressCountry: ADDRESS.addressCountry,
    },
    telephone: CONTACT.phone,
    image: [...DEFAULT_IMAGES.hero],
  };
}

// ==================== MENU ITEM SCHEMA ====================

/**
 * Generates MenuItem schema for individual menu item pages
 * Auto-populates from menu JSON data
 */
export function generateMenuItemSchema(
  item: MenuItem,
  categoryName: string,
  locale: string = "en"
): MenuItemSchema {
  const itemName = item.name[locale as keyof typeof item.name] || item.name.en;
  const itemDescription = item.description
    ? item.description[locale as keyof typeof item.description] || item.description.en
    : `Traditional ${itemName} - ${categoryName} - Pakistani wedding catering`;

  return {
    "@context": "https://schema.org",
    "@type": "MenuItem",
    name: itemName,
    description: itemDescription,
    image: item.image.startsWith("http") ? item.image : `${SITE_URL}${item.image}`,
    url: `${SITE_URL}/menu/${item.category}/${item.id}`,
    menuAddOn: {
      "@type": "MenuSection",
      name: categoryName,
    },
    suitableForDiet: "HalalDiet",
    nutrition: {
      "@type": "NutritionInformation",
      description: "Prepared fresh daily with authentic ingredients",
    },
  };
}

// ==================== FAQ PAGE SCHEMA ====================

/**
 * Generates FAQPage schema from FAQ data
 * Auto-populates from faq.json
 */
export function generateFAQPageSchema(
  faqItems: FAQItem[],
  locale: string = "en"
): FAQPageSchema {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

// ==================== BREADCRUMB LIST SCHEMA ====================

/**
 * Generates BreadcrumbList schema for navigation hierarchy
 * Used on detail pages (venue, menu item, etc.)
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]): BreadcrumbListSchema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

// ==================== AGGREGATE RATING SCHEMA ====================

/**
 * Generates AggregateRating schema for testimonials/reviews
 */
export function generateAggregateRatingSchema(
  ratingData: RatingData = RATING
): AggregateRatingSchema {
  return {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    itemReviewed: {
      "@type": "LocalBusiness",
      name: BUSINESS.name,
    },
    ratingValue: ratingData.ratingValue,
    bestRating: 5,
    ratingCount: ratingData.ratingCount,
    reviewCount: ratingData.reviewCount || ratingData.ratingCount,
  };
}

// ==================== SCHEMA INJECTION HELPER ====================

/**
 * Generates script tag props for JSON-LD schema injection
 * Returns the stringified schema for use in dangerouslySetInnerHTML
 */
export function getSchemaScriptProps(schema: any) {
  return {
    type: "application/ld+json" as const,
    dangerouslySetInnerHTML: { __html: JSON.stringify(schema) },
  };
}
