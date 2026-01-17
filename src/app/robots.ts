/**
 * Robots.txt configuration
 * Optimized for AI bots (ChatGPT, Claude, Perplexity, etc.)
 * Accessible at: https://raheemevents.com/robots.txt
 */

import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Allow all standard crawlers
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      {
        // Explicitly allow AI bots for enhanced AI search visibility
        userAgent: [
          "GPTBot", // ChatGPT crawler
          "ChatGPT-User", // ChatGPT browser
          "Google-Extended", // Google Bard/Gemini
          "ClaudeBot", // Claude AI
          "PerplexityBot", // Perplexity AI
          "Applebot-Extended", // Apple Intelligence
          "anthropic-ai", // Anthropic AI
          "Bytespider", // TikTok
          "Amazonbot", // Amazon Alexa
        ],
        allow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
