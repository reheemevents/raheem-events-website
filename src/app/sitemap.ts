/**
 * Dynamic sitemap generator
 * Automatically generates sitemap for all 133+ routes
 * Accessible at: https://raheemevents.com/sitemap.xml
 */

import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/constants";

// Import menu data
import categoriesData from "@/data/menu/categories.json";
import allItemsData from "@/data/menu/all-items.json";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_URL;
  const now = new Date();

  // ==================== STATIC ROUTES (11 pages) ====================

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/catering`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/venues`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/menu`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/testimonials`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/book-now`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/menu-builder`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // ==================== VENUE ROUTES (2 venues) ====================

  const venueRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/venues/israr-marriage-hall`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/venues/mumtaz-banquet-hall`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  // ==================== MENU CATEGORY ROUTES ====================

  const categoryRoutes: MetadataRoute.Sitemap = categoriesData.categories.map((category) => ({
    url: `${baseUrl}/menu/${category.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // ==================== MENU ITEM ROUTES ====================

  // Use all menu items from all-items.json
  const menuItemRoutes: MetadataRoute.Sitemap = allItemsData.items.map((item) => ({
    url: `${baseUrl}/menu/${item.category}/${item.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  // ==================== COMBINE ALL ROUTES ====================

  return [...staticRoutes, ...venueRoutes, ...categoryRoutes, ...menuItemRoutes];
}
