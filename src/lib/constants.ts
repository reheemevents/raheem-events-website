// Site-wide constants

export const SITE_NAME = "Raheem Event Management & Catering";
export const SITE_URL = "https://raheemevents.com"; // Update with actual URL

// Contact information
export const CONTACT = {
  phone: "+92 344 4477751",
  whatsapp: "923444477751",
  email: "info@raheemevents.com",
};

// WhatsApp pre-filled messages
export const WHATSAPP_MESSAGES = {
  general: "Assalam o Alaikum! I'm reaching out from your website raheemevents.com. I'd like to inquire about your catering and hall booking services.",
  booking: "Assalam o Alaikum! I'm reaching out from your website raheemevents.com. I'd like to book an event. Please share the available dates.",
  israrHall: "Assalam o Alaikum! I'm reaching out from your website raheemevents.com. I'm interested in booking Israr Marriage Hall. Please share details.",
  mumtazHall: "Assalam o Alaikum! I'm reaching out from your website raheemevents.com. I'm interested in booking Mumtaz Banquet Hall. Please share details.",
  catering: "Assalam o Alaikum! I'm reaching out from your website raheemevents.com. I'd like to inquire about your catering services.",
  customMenu: "Assalam o Alaikum! I'm reaching out from your website raheemevents.com. I'd like to discuss a custom menu for my event.",
};

// Social media links
export const SOCIAL_LINKS = {
  facebook: "https://facebook.com/raheemevents", // Update with actual
  instagram: "https://instagram.com/raheemevents", // Update with actual
  youtube: "", // Update if available
};

// Image placeholders
export const PLACEHOLDER_IMAGES = {
  hero: "/images/hero/placeholder.jpg",
  food: "/images/menu/placeholder.jpg",
  venue: "/images/venues/placeholder.jpg",
  gallery: "/images/gallery/placeholder.jpg",
  testimonial: "/images/testimonials/placeholder.jpg",
};

// Menu categories
export const MENU_CATEGORIES = [
  { id: "bbq", name: "BBQ", count: 15 },
  { id: "beverages", name: "Beverages", count: 8 },
  { id: "chinese", name: "Chinese Food", count: 6 },
  { id: "dall", name: "Dall", count: 5 },
  { id: "dessert", name: "Dessert", count: 19 },
  { id: "fish", name: "Fish", count: 3 },
  { id: "nihari-haleem", name: "Nihari / Haleem", count: 6 },
  { id: "qorma-curry", name: "Qorma / Curry", count: 15 },
  { id: "rice", name: "Rice", count: 19 },
  { id: "sadqa", name: "Sadqa", count: 14 },
  { id: "sauce-salad", name: "Sauce / Salad", count: 11 },
  { id: "street-food", name: "Street Food", count: 8 },
  { id: "tandoor", name: "Tandoor", count: 11 },
] as const;

// Event types
export const EVENT_TYPES = [
  { id: "wedding", name: "Wedding" },
  { id: "mehndi", name: "Mehndi" },
  { id: "barat", name: "Barat" },
  { id: "walima", name: "Walima" },
  { id: "corporate", name: "Corporate Event" },
  { id: "birthday", name: "Birthday / Private" },
  { id: "other", name: "Other" },
] as const;

// Package tiers
export const PACKAGE_TIERS = [
  { id: "silver", name: "Silver", color: "#C0C0C0" },
  { id: "gold", name: "Gold", color: "#D4AF37" },
  { id: "platinum", name: "Platinum", color: "#E5E4E2" },
] as const;

// Venue IDs
export const VENUES = {
  ISRAR: "israr-marriage-hall",
  MUMTAZ: "mumtaz-banquet-hall",
} as const;

// Amenity icons mapping
export const AMENITY_ICONS: Record<string, string> = {
  "ac": "Snowflake",
  "parking": "Car",
  "generator": "Zap",
  "stage": "Layout",
  "sound": "Speaker",
  "lighting": "Lightbulb",
  "catering": "UtensilsCrossed",
  "decor": "Flower2",
  "valet": "User",
  "wheelchair": "Accessibility",
};

// Animation variants for Framer Motion
export const FADE_IN_UP = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export const STAGGER_CONTAINER = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;
