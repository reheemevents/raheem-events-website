/**
 * Enhanced alt text generators for images
 * Creates descriptive, AI-parseable image descriptions
 */

import type { MenuItem } from "./types";
import { SITE_NAME } from "./constants";

// ==================== CATEGORY NAME MAPPING ====================

const CATEGORY_NAMES: Record<string, { en: string; ur: string }> = {
  rice: { en: "Rice Dishes", ur: "چاول کے پکوان" },
  bbq: { en: "BBQ", ur: "بی بی کیو" },
  "qorma-curry": { en: "Qorma & Curry", ur: "قورمہ اور کری" },
  dessert: { en: "Desserts", ur: "میٹھے" },
  tandoor: { en: "Tandoor", ur: "تندور" },
  "street-food": { en: "Street Food", ur: "سٹریٹ فوڈ" },
  chinese: { en: "Chinese", ur: "چائنیز" },
  beverages: { en: "Beverages", ur: "مشروبات" },
  dall: { en: "Dall", ur: "دال" },
  fish: { en: "Fish", ur: "مچھلی" },
  "nihari-haleem": { en: "Nihari & Haleem", ur: "نہاری اور حلیم" },
  sadqa: { en: "Sadqa", ur: "صدقہ" },
  "sauce-salad": { en: "Sauce & Salad", ur: "چٹنی اور سلاد" },
};

// ==================== HELPER FUNCTIONS ====================

/**
 * Gets the category display name
 */
export function getCategoryName(categorySlug: string, locale: string = "en"): string {
  const category = CATEGORY_NAMES[categorySlug];
  if (!category) return categorySlug;

  return locale === "ur" ? category.ur : category.en;
}

// ==================== ALT TEXT GENERATORS ====================

/**
 * Generates enhanced alt text for menu items
 * Format: "Traditional [Item Name] - [Category] - Pakistani wedding catering by [Company]"
 */
export function generateMenuItemAlt(item: MenuItem, locale: string = "en"): string {
  const itemName = item.name[locale as keyof typeof item.name] || item.name.en;
  const categoryName = getCategoryName(item.category, locale);

  // For English
  if (locale === "en") {
    return `Traditional ${itemName} - ${categoryName} - Pakistani wedding catering by ${SITE_NAME}`;
  }

  // For Urdu
  return `${itemName} - ${categoryName} - ${SITE_NAME} کی جانب سے پاکستانی شادی کیٹرنگ`;
}

/**
 * Generates alt text for venue images
 */
export function generateVenueImageAlt(
  venueName: string,
  imageIndex: number = 0,
  locale: string = "en"
): string {
  const descriptors = ["interior", "seating area", "stage", "lighting", "decor"];
  const descriptor = descriptors[imageIndex % descriptors.length];

  if (locale === "en") {
    return `${venueName} ${descriptor} - Premium marriage hall in Mirpur, AJK - ${SITE_NAME}`;
  }

  return `${venueName} - میرپور، آزاد کشمیر میں پریمیم شادی ہال - ${SITE_NAME}`;
}

/**
 * Generates alt text for gallery images
 */
export function generateGalleryImageAlt(
  imageType: "event" | "food" | "venue" = "event",
  index: number = 0,
  locale: string = "en"
): string {
  const types = {
    event: locale === "en" ? "Wedding event" : "شادی کی تقریب",
    food: locale === "en" ? "Food spread" : "کھانے کی تیاری",
    venue: locale === "en" ? "Venue setup" : "وینیو کی تیاری",
  };

  const type = types[imageType];

  if (locale === "en") {
    return `${type} at ${SITE_NAME} - Professional event management and catering in Mirpur, AJK`;
  }

  return `${type} - ${SITE_NAME} میں - میرپور، آزاد کشمیر`;
}

/**
 * Generates alt text for hero/banner images
 */
export function generateHeroImageAlt(slideIndex: number = 0, locale: string = "en"): string {
  const descriptions = [
    {
      en: "Elegant wedding setup with premium decor",
      ur: "پریمیم سجاوٹ کے ساتھ خوبصورت شادی کی تیاری",
    },
    {
      en: "Delicious catering spread with authentic Pakistani cuisine",
      ur: "مستند پاکستانی کھانوں کی لذیذ کیٹرنگ",
    },
    {
      en: "Beautifully decorated event venue for weddings",
      ur: "شادیوں کے لیے خوبصورت سجایا گیا ایونٹ وینیو",
    },
  ];

  const desc = descriptions[slideIndex % descriptions.length];

  if (locale === "en") {
    return `${desc.en} - ${SITE_NAME}`;
  }

  return `${desc.ur} - ${SITE_NAME}`;
}

/**
 * Generates alt text for category card images
 */
export function generateCategoryImageAlt(categorySlug: string, locale: string = "en"): string {
  const categoryName = getCategoryName(categorySlug, locale);

  if (locale === "en") {
    return `${categoryName} menu - Authentic Pakistani cuisine for weddings and events - ${SITE_NAME}`;
  }

  return `${categoryName} مینو - شادیوں اور تقریبات کے لیے مستند پاکستانی کھانے - ${SITE_NAME}`;
}

/**
 * Generates alt text for logo
 */
export function generateLogoAlt(locale: string = "en"): string {
  if (locale === "en") {
    return `${SITE_NAME} - Premium wedding catering and event management in Mirpur, AJK`;
  }

  return `${SITE_NAME} - میرپور، آزاد کشمیر میں پریمیم شادی کیٹرنگ اور ایونٹ مینجمنٹ`;
}

/**
 * Generic fallback for images without specific generators
 */
export function generateGenericImageAlt(
  subject: string,
  context: string = "",
  locale: string = "en"
): string {
  if (locale === "en") {
    return context
      ? `${subject} - ${context} - ${SITE_NAME}`
      : `${subject} - ${SITE_NAME}`;
  }

  return context ? `${subject} - ${context} - ${SITE_NAME}` : `${subject} - ${SITE_NAME}`;
}
