/**
 * TypeScript interfaces for Schema.org structured data types
 * Used throughout the SEO implementation for type safety
 */

// ==================== BASE TYPES ====================

export interface SchemaBase {
  "@context": "https://schema.org";
  "@type": string | string[];
  "@id"?: string;
}

// ==================== COMMON TYPES ====================

export interface PostalAddress {
  "@type": "PostalAddress";
  streetAddress?: string;
  addressLocality: string;
  addressRegion: string;
  postalCode?: string;
  addressCountry: string;
}

export interface GeoCoordinates {
  "@type": "GeoCoordinates";
  latitude: string | number;
  longitude: string | number;
}

export interface OpeningHoursSpecification {
  "@type": "OpeningHoursSpecification";
  dayOfWeek: string | string[];
  opens: string;
  closes: string;
}

export interface ImageObject {
  "@type": "ImageObject";
  url: string;
  width?: number;
  height?: number;
  caption?: string;
}

export interface LocationFeatureSpecification {
  "@type": "LocationFeatureSpecification";
  name: string;
  value?: string | boolean;
}

// ==================== ORGANIZATION SCHEMA ====================

export interface OrganizationSchema extends SchemaBase {
  "@type": "Organization";
  name: string;
  url: string;
  logo: string | ImageObject;
  image?: string | string[];
  description: string;
  foundingDate?: string;
  telephone?: string;
  email?: string;
  address?: PostalAddress;
  sameAs?: string[];
  contactPoint?: ContactPoint[];
}

export interface ContactPoint {
  "@type": "ContactPoint";
  telephone: string;
  contactType: string;
  areaServed?: string;
  availableLanguage?: string[];
}

// ==================== LOCAL BUSINESS SCHEMA ====================

export interface LocalBusinessSchema extends SchemaBase {
  "@type": "LocalBusiness" | "FoodEstablishment" | "EventVenue" | string[];
  name: string;
  image: string | string[];
  telephone: string;
  priceRange: string;
  address: PostalAddress;
  geo?: GeoCoordinates;
  url?: string;
  openingHoursSpecification?: OpeningHoursSpecification[];
  servesCuisine?: string[];
  paymentAccepted?: string;
  currenciesAccepted?: string;
  aggregateRating?: AggregateRating;
}

// ==================== EVENT VENUE SCHEMA ====================

export interface EventVenueSchema extends SchemaBase {
  "@type": "EventVenue";
  name: string;
  description: string;
  image: string | string[];
  address: PostalAddress;
  telephone: string;
  url?: string;
  maximumAttendeeCapacity?: number;
  amenityFeature?: LocationFeatureSpecification[];
  smokingAllowed?: boolean;
  publicAccess?: boolean;
  isAccessibleForFree?: boolean;
  geo?: GeoCoordinates;
}

// ==================== FOOD ESTABLISHMENT SCHEMA ====================

export interface FoodEstablishmentSchema extends SchemaBase {
  "@type": "FoodEstablishment";
  name: string;
  servesCuisine: string[];
  hasMenu?: string;
  priceRange: string;
  acceptsReservations?: string;
  address?: PostalAddress;
  telephone?: string;
  image?: string | string[];
}

// ==================== MENU ITEM SCHEMA ====================

export interface MenuItemSchema extends SchemaBase {
  "@type": "MenuItem";
  name: string;
  description?: string;
  image?: string;
  url?: string;
  menuAddOn?: MenuSection;
  suitableForDiet?: string | string[];
  nutrition?: NutritionInformation;
}

export interface MenuSection {
  "@type": "MenuSection";
  name: string;
  description?: string;
}

export interface NutritionInformation {
  "@type": "NutritionInformation";
  description: string;
  calories?: string;
}

// ==================== FAQ PAGE SCHEMA ====================

export interface FAQPageSchema extends SchemaBase {
  "@type": "FAQPage";
  mainEntity: Question[];
}

export interface Question {
  "@type": "Question";
  name: string;
  acceptedAnswer: Answer;
}

export interface Answer {
  "@type": "Answer";
  text: string;
}

// ==================== BREADCRUMB LIST SCHEMA ====================

export interface BreadcrumbListSchema extends SchemaBase {
  "@type": "BreadcrumbList";
  itemListElement: ListItem[];
}

export interface ListItem {
  "@type": "ListItem";
  position: number;
  name: string;
  item: string;
}

// ==================== REVIEW & RATING SCHEMA ====================

export interface AggregateRatingSchema extends SchemaBase {
  "@type": "AggregateRating";
  itemReviewed: Organization | LocalBusiness;
  ratingValue: string | number;
  bestRating: string | number;
  ratingCount: string | number;
  reviewCount?: string | number;
}

export interface AggregateRating {
  "@type": "AggregateRating";
  ratingValue: string | number;
  bestRating?: string | number;
  ratingCount?: string | number;
  reviewCount?: string | number;
}

export interface Organization {
  "@type": "Organization" | "LocalBusiness";
  name: string;
}

export interface LocalBusiness {
  "@type": "LocalBusiness";
  name: string;
}

// ==================== METADATA TYPES ====================

export interface MetadataOptions {
  title: string;
  description: string;
  url: string;
  type?: "website" | "article" | "profile";
  images?: OpenGraphImage[];
  locale?: string;
  keywords?: string[];
}

export interface OpenGraphImage {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
}

// ==================== DATA INPUT TYPES ====================

export interface VenueData {
  name: {
    en: string;
    ur: string;
  };
  slug: string;
  description: {
    en: string;
    ur: string;
  };
  capacity: {
    total: number;
    sitting?: number;
    standing?: number;
  };
  amenities?: string[];
  features?: string[];
  images: string[];
  address?: {
    en: string;
    ur: string;
  };
  location?: {
    lat: number;
    lng: number;
  };
}

export interface MenuItem {
  id: string;
  name: {
    en: string;
    ur: string;
  };
  category: string;
  image: string;
  description?: {
    en: string;
    ur: string;
  };
  isPopular?: boolean;
}

export interface Category {
  id: string;
  name: {
    en: string;
    ur: string;
  };
  slug: string;
  description?: {
    en: string;
    ur: string;
  };
  image?: string;
}

export interface FAQItem {
  question: {
    en: string;
    ur: string;
  };
  answer: {
    en: string;
    ur: string;
  };
  category?: string;
}

export interface RatingData {
  ratingValue: number;
  ratingCount: number;
  reviewCount?: number;
}

// ==================== BREADCRUMB INPUT ====================

export interface BreadcrumbItem {
  name: string;
  url: string;
}
