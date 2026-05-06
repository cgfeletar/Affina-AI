import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Standard crawlers — allow everything except the internal token preview
      {
        userAgent: "*",
        allow: "/",
        disallow: "/dev/",
      },
      // AI search and training crawlers — explicitly allowed per CLAUDE.md AI Crawler Policy
      // OpenAI
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      // Anthropic
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "Claude-Web", allow: "/" },
      // Perplexity
      { userAgent: "PerplexityBot", allow: "/" },
      // Google AI
      { userAgent: "Google-Extended", allow: "/" },
      // Meta
      { userAgent: "Meta-ExternalAgent", allow: "/" },
      // ByteDance
      { userAgent: "Bytespider", allow: "/" },
      // Amazon
      { userAgent: "Amazonbot", allow: "/" },
      // Apple
      { userAgent: "Applebot-Extended", allow: "/" },
      // Common Crawl
      { userAgent: "CCBot", allow: "/" },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
