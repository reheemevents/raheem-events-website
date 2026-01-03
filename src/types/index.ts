// Bilingual text type
export interface BilingualText {
  en: string;
  ur: string;
}

// Navigation item
export interface NavItem {
  label: BilingualText;
  href: string;
  children?: NavItem[];
}

// Menu category
export interface MenuCategory {
  id: string;
  name: BilingualText;
  slug: string;
  description?: BilingualText;
  image?: string;
  itemCount: number;
}

// Food menu item
export interface MenuItem {
  id: string;
  name: BilingualText;
  category: string;
  description?: BilingualText;
  image: string;
  price?: string;
  pricePerHead?: number;
  servingSize?: string;
  isPopular?: boolean;
  isVegetarian?: boolean;
  dietaryInfo?: string[];
  tags?: string[];
}

// Venue
export interface Venue {
  id: string;
  name: BilingualText;
  slug: string;
  tagline?: BilingualText;
  description: BilingualText;
  heroImage: string;
  images: string[];
  capacity: {
    seated: number;
    buffet: number;
  };
  amenities: string[];
  eventTypes: string[];
  location: {
    address: BilingualText;
    city: string;
    mapUrl?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  contact: {
    phone: string;
    whatsapp?: string;
  };
  packages?: VenuePackage[];
}

// Venue package
export interface VenuePackage {
  id: string;
  name: BilingualText;
  tier: "silver" | "gold" | "platinum";
  price?: string;
  pricePerHead?: number;
  minGuests?: number;
  includes: BilingualText[];
  features?: string[];
  isPopular?: boolean;
}

// Wedding package
export interface WeddingPackage {
  id: string;
  name: BilingualText;
  tier: "silver" | "gold" | "platinum";
  description: BilingualText;
  price?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  includes: {
    category: BilingualText;
    items: BilingualText[];
  }[];
  features: BilingualText[];
  isPopular?: boolean;
  image?: string;
}

// Testimonial
export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  image?: string;
  content: BilingualText;
  rating: number;
  eventType?: string;
  venue?: string;
  date?: string;
  isVideo?: boolean;
  videoUrl?: string;
}

// Gallery item
export interface GalleryItem {
  id: string;
  image: string;
  title?: BilingualText;
  category: "israr" | "mumtaz" | "catering" | "decor" | "events";
  eventType?: string;
  isBeforeAfter?: boolean;
  beforeImage?: string;
  afterImage?: string;
}

// Contact info
export interface ContactInfo {
  businessName: BilingualText;
  email: string;
  phone: string;
  whatsapp: string;
  businessHours: {
    days: BilingualText;
    hours: string;
  }[];
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
  };
}

// Booking form data
export interface BookingFormData {
  // Step 1: Event Details
  eventType: string;
  eventDate: string;
  guestCount: number;

  // Step 2: Services
  venue: "israr" | "mumtaz" | "catering-only" | "both";
  packageTier: "silver" | "gold" | "platinum" | "custom";

  // Step 3: Contact
  name: string;
  phone: string;
  email: string;
  notes?: string;
}

// Site configuration
export interface SiteConfig {
  name: BilingualText;
  tagline: BilingualText;
  description: BilingualText;
  url: string;
  logo: string;
  logoDark?: string;
  favicon: string;
  contact: ContactInfo;
  defaultLocale: "en" | "ur";
  locales: ("en" | "ur")[];
}

// SEO metadata
export interface SEOMetadata {
  title: BilingualText;
  description: BilingualText;
  keywords?: string[];
  ogImage?: string;
}

// Stats for "Why Choose Us" section
export interface Stat {
  value: string;
  label: BilingualText;
  suffix?: string;
}

// Event type for catering
export interface EventType {
  id: string;
  name: BilingualText;
  description: BilingualText;
  icon: string;
  image?: string;
}

// Cuisine type
export interface CuisineType {
  id: string;
  name: BilingualText;
  description?: BilingualText;
  image?: string;
  menuPdf?: string;
}
