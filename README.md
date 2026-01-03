# Raheem Event Management & Catering

A modern, bilingual (English/Urdu) website for **Raheem Event Management & Catering** (Est. 2005) showcasing catering services and two marriage halls: **Israr Marriage Hall** and **Mumtaz Banquet Hall**.

## Repository

**GitHub:** [https://github.com/reheemevents/raheem-events-website](https://github.com/reheemevents/raheem-events-website)

```bash
git clone https://github.com/reheemevents/raheem-events-website.git
```

## Venues

| Venue | Address | City |
|-------|---------|------|
| **Israr Marriage Hall** | Shaban Plaza, Kotli Rd E, Sector F-1, Sector F | Mirpur, AJK |
| **Mumtaz Banquet Hall** | Sajid Plaza, New Mirpur City, 10250 | Mirpur, AJK |

**Contact:** +92 344 4477751

## Features

- **107 Food Menu Items** across 14 categories with individual pages
- **Two Venue Pages** - Israr Marriage Hall & Mumtaz Banquet Hall
- **Wedding Packages** - Silver, Gold, Platinum tiers
- **Bilingual Support** - English + Urdu with RTL layout
- **Multi-step Booking Form** (4 steps) with validation
- **WhatsApp Integration** - Floating button with pre-filled messages
- **Click-to-Call** - Mobile-optimized phone buttons
- **Photo Gallery** - Filterable by venue/category with lightbox
- **Testimonials Page** - Client reviews & video testimonials
- **About Page** - Company story, mission, values, timeline
- **Catering Page** - Event types, cuisines, hygiene section
- **SEO Optimized** - Schema markup, meta tags, sitemap
- **301 Static Pages** - Optimized for performance

## Tech Stack

| Technology | Purpose |
|------------|---------|
| [Next.js 14](https://nextjs.org/) | React framework with App Router |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Tailwind CSS](https://tailwindcss.com/) | Styling with RTL support |
| [next-intl](https://next-intl-docs.vercel.app/) | Internationalization (EN/UR) |
| [Framer Motion](https://www.framer.com/motion/) | Animations |
| [Lucide React](https://lucide.dev/) | Icons |
| [React Hook Form](https://react-hook-form.com/) | Form handling |
| [Zod](https://zod.dev/) | Schema validation |

## Typography

| Font | Usage |
|------|-------|
| **Playfair Display** | Headings (English) |
| **Inter** | Body text (English) |
| **Noto Nastaliq Urdu** | All Urdu text - authentic Nastaliq script |

The Urdu typography uses Noto Nastaliq Urdu from Google Fonts with optimized line heights and text sizes for proper Nastaliq readability.

## Development Tools & Skills

This project was built using:

- **Claude Code** - AI-powered development assistant
- **Frontend Design Skill** - For creating distinctive, production-grade UI components
- **Feature Development Skill** - For guided feature development with architecture focus

## Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Primary Red | `#DA291C` | Buttons, CTAs, highlights |
| Black | `#1A1A1A` | Headers, navigation, text |
| White | `#FFFFFF` | Backgrounds, cards |
| Gold | `#D4AF37` | Premium accents |

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/reheemevents/raheem-events-website.git

# Navigate to project directory
cd raheem-events-website

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   └── [locale]/          # Bilingual routing (en/ur)
│       ├── page.tsx       # Home page
│       ├── menu/          # Food menu catalog
│       ├── venues/        # Venue pages
│       ├── packages/      # Wedding packages
│       ├── gallery/       # Photo gallery
│       ├── contact/       # Contact page
│       └── book-now/      # Booking form
├── components/
│   ├── layout/            # Header, Footer, Navigation
│   ├── ui/                # Reusable UI components
│   ├── home/              # Home page sections
│   ├── menu/              # Menu components
│   ├── venue/             # Venue components
│   └── common/            # Shared components
├── data/                  # JSON content files
├── messages/              # Translation files (en.json, ur.json)
├── lib/                   # Utilities and helpers
└── types/                 # TypeScript definitions
```

## Content Management

Content is managed through JSON files in the `/data` directory:

- `site.json` - Site-wide configuration
- `menu/*.json` - Food items by category
- `venues/*.json` - Venue information
- `packages.json` - Wedding packages
- `testimonials.json` - Client reviews

## Deployment

Recommended deployment on [Vercel](https://vercel.com):

```bash
npm install -g vercel
vercel
```

## Environment Variables

Create a `.env.local` file:

```env
# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key

# WhatsApp Number
NEXT_PUBLIC_WHATSAPP_NUMBER=923001234567

# Google Maps API (optional)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key
```

## Recent Changes

### January 2026

- **Food Menu Showcase** - Added new home page section featuring 6 category cards and 4 popular dishes
- **Urdu Typography** - Integrated Noto Nastaliq Urdu font for authentic Urdu text rendering
- **Menu Card Animations** - Optimized hover animations with CSS transitions for smoother performance
- **Real Food Images** - Updated all placeholder images with actual Raheem Events food photography
- **Logo Integration** - Added custom logos to header and footer
- **GitHub Repository** - Connected project to GitHub for version control

### Design Improvements

- Replaced Framer Motion `whileHover` with CSS-based `hover:-translate-y-2` for better performance
- Added `will-change-transform` for GPU-accelerated animations
- Optimized line heights and text sizes for Nastaliq script readability
- Gold accent styling throughout with brand color consistency

## License

This project is proprietary software developed for Raheem Event Management & Catering.

---

Built with [Claude Code](https://claude.com/claude-code) using Frontend Design and Feature Development skills.
