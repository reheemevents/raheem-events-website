/**
 * Dynamic sitemap generator
 * Automatically generates sitemap for all 133+ routes
 * Accessible at: https://raheemevents.com/sitemap.xml
 */

import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/constants";

// Import menu data
import categoriesData from "@/data/menu/categories.json";
import bbqItems from "@/data/menu/bbq.json";
import beveragesItems from "@/data/menu/beverages.json";
import chineseItems from "@/data/menu/chinese.json";
import dallItems from "@/data/menu/dall.json";
import dessertItems from "@/data/menu/dessert.json";
import fishItems from "@/data/menu/fish";
import nihariHaleemItems from "@/data/menu/nihari-haleem.json";
import qormaCurryItems from "@/data/menu/qorma-curry.json";
import riceItems from "@/data/menu/rice.json";
import sadqaItems from "@/data/menu/sadqa.json";
import sauceSaladItems from "@/data/menu/sauce-salad.json";
import streetFoodItems from "@/data/menu/street-food.json";
import tandoorItems from "@/data/menu/tandoor.json";

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

  // Combine all menu items from all categories
  const allMenuItems = [
    ...bbqItems.items,
    ...beveragesItems.items,
    ...chineseItems.items,
    ...dallItems.items,
    ...dessertItems.items,
    ...fishItems.items,
    ...nihariHaleemItems.items,
    ...qormaCurryItems.items,
    ...riceItems.items,
    ...sadqaItems.items,
    ...sauceSaladItems.items,
    ...streetFoodItems.items,
    ...tandoorItems.items,
  ];

  const menuItemRoutes: MetadataRoute.Sitemap = allMenuItems.map((item) => ({
    url: `${baseUrl}/menu/${item.category}/${item.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  // ==================== COMBINE ALL ROUTES ====================

  return [...staticRoutes, ...venueRoutes, ...categoryRoutes, ...menuItemRoutes];
}
