import { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog-posts";
import { absoluteUrl } from "@/lib/url";

const STATIC_PATHS = [
  { path: "/",            changeFrequency: "daily"   as const, priority: 1.0 },
  { path: "/pricing",     changeFrequency: "weekly"  as const, priority: 0.9 },
  { path: "/reseller",    changeFrequency: "weekly"  as const, priority: 0.7 },
  { path: "/blog",        changeFrequency: "daily"   as const, priority: 0.6 },
  { path: "/installation",changeFrequency: "weekly"  as const, priority: 0.8 },
  { path: "/faq",         changeFrequency: "weekly"  as const, priority: 0.7 },
  { path: "/about",       changeFrequency: "monthly" as const, priority: 0.6 },
  { path: "/contact",     changeFrequency: "monthly" as const, priority: 0.6 },
  { path: "/privacy",     changeFrequency: "yearly"  as const, priority: 0.3 },
  { path: "/terms",       changeFrequency: "yearly"  as const, priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  // Static pages
  for (const { path, changeFrequency, priority } of STATIC_PATHS) {
    entries.push({
      url: absoluteUrl(path),
      lastModified: now,
      changeFrequency,
      priority,
    });
  }

  // Blog posts
  for (const post of blogPosts) {
    entries.push({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: new Date(post.publishedAt),
      changeFrequency: "monthly" as const,
      priority: post.featured ? 0.9 : 0.7,
    });
  }

  return entries;
}
