/**
 * Centralized SEO constants for the Raheem Events website
 * Update these values to change SEO information across the entire site
 */

// ==================== SITE CONFIGURATION ====================

export const SITE_URL = "https://raheemevents.com";
export const SITE_NAME = "Raheem Event Management & Catering";
export const SITE_NAME_SHORT = "Raheem Events";

// ==================== BUSINESS INFORMATION ====================

export const BUSINESS = {
  name: "Raheem Event Management & Catering",
  legalName: "Raheem Event Management & Catering Services",
  foundingDate: "2005",
  description: {
    en: "Premium wedding catering and marriage halls in Mirpur, AJK. Specializing in traditional Pakistani cuisine, BBQ, Chinese, and Continental dishes for weddings, corporate events, and private parties.",
    ur: "میرپور، آزاد کشمیر میں پریمیم شادی کی کیٹرنگ اور شادی ہال۔ شادیوں، کارپوریٹ تقریبات اور نجی پارٹیوں کے لیے روایتی پاکستانی کھانے، بی بی کیو، چینی اور کانٹی نینٹل پکوانوں میں مہارت۔",
  },
  tagline: {
    en: "Creating Memorable Events, One Dish at a Time",
    ur: "یادگار تقریبات بناتے ہیں، ایک ڈش بنا کر",
  },
} as const;

// ==================== CONTACT INFORMATION ====================

export const CONTACT = {
  phone: "+92-344-4477751",
  email: "info@raheemevents.com",
  whatsapp: "+923444477751",
} as const;

// ==================== ADDRESS ====================

export const ADDRESS = {
  streetAddress: "Main Allama Iqbal Road",
  addressLocality: "Mirpur",
  addressRegion: "AJK",
  postalCode: "10250",
  addressCountry: "PK",
  formatted: {
    en: "Main Allama Iqbal Road, Mirpur, AJK 10250, Pakistan",
    ur: "مین علامہ اقبال روڈ، میرپور، آزاد کشمیر 10250، پاکستان",
  },
} as const;

// ==================== GEO COORDINATES ====================

export const GEO_COORDINATES = {
  latitude: 33.1446881,
  longitude: 73.7530306,
} as const;

// ==================== SOCIAL MEDIA ====================

export const SOCIAL_MEDIA = {
  facebook: "https://www.facebook.com/raheemevents",
  instagram: "https://www.instagram.com/raheemevents",
  // Add more social profiles as needed
} as const;

// ==================== BUSINESS DETAILS ====================

export const BUSINESS_DETAILS = {
  priceRange: "$$",
  currenciesAccepted: "PKR",
  paymentAccepted: "Cash, Bank Transfer, Online Payment",
  cuisines: [
    "Pakistani",
    "BBQ",
    "Chinese",
    "Continental",
    "Desi",
    "Street Food",
  ],
  servicesOffered: [
    "Wedding Catering",
    "Event Management",
    "Marriage Halls",
    "Corporate Events",
    "Private Parties",
    "Food Catering",
    "Venue Booking",
  ],
} as const;

// ==================== OPENING HOURS ====================

export const OPENING_HOURS = [
  {
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "09:00",
    closes: "22:00",
  },
] as const;

// ==================== RATING ====================

export const RATING = {
  ratingValue: 4.9,
  bestRating: 5,
  ratingCount: 500,
  reviewCount: 500,
} as const;

// ==================== DEFAULT IMAGES ====================

export const DEFAULT_IMAGES = {
  logo: "/Logo/logo.png",
  ogDefault: "/images/og-default.jpg",
  hero: [
    "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1920&q=85",
    "https://images.unsplash.com/photo-1555244162-803834f70033?w=1920&q=85",
    "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1920&q=85",
  ],
} as const;

// ==================== VENUE INFORMATION ====================

export const VENUES = {
  israr: {
    name: "Israr Marriage Hall",
    slug: "israr-marriage-hall",
    capacity: 700,
    url: `${SITE_URL}/venues/israr-marriage-hall`,
  },
  mumtaz: {
    name: "Mumtaz Banquet Hall",
    slug: "mumtaz-banquet-hall",
    capacity: 500,
    url: `${SITE_URL}/venues/mumtaz-banquet-hall`,
  },
} as const;

// ==================== MENU CATEGORIES ====================

export const MENU_CATEGORIES = [
  "rice",
  "bbq",
  "qorma-curry",
  "dessert",
  "tandoor",
  "street-food",
  "chinese",
  "beverages",
  "dall",
  "fish",
  "nihari-haleem",
  "sadqa",
  "sauce-salad",
] as const;

// ==================== SEO METADATA DEFAULTS ====================

export const DEFAULT_METADATA = {
  locale: {
    en: "en_US",
    ur: "ur_PK",
  },
  type: "website" as const,
  twitterCard: "summary_large_image" as const,
} as const;

// ==================== STRUCTURED DATA IDs ====================

export const SCHEMA_IDS = {
  organization: `${SITE_URL}/#organization`,
  business: `${SITE_URL}/#business`,
  website: `${SITE_URL}/#website`,
} as const;
