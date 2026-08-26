export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishedAt: string;
  featured: boolean;
  coverImage: string;
  keywords: string[];
  content: string;
}

export const CATEGORIES = [
  "Xtreme HD IPTV",
  "Firestick",
  "Smart TV",
  "Android",
  "IPTV Players",
  "Troubleshooting",
  "Reviews & Comparisons",
] as const;

export const CATEGORY_STYLE: Record<string, string> = {
  "Xtreme HD IPTV":        "text-white bg-blue-600 border-blue-700",
  "Firestick":             "text-blue-700 bg-blue-50 border-blue-200",
  "Smart TV":              "text-blue-800 bg-blue-100 border-blue-200",
  "Android":               "text-blue-700 bg-blue-50 border-blue-300",
  "IPTV Players":          "text-blue-800 bg-blue-100 border-blue-300",
  "Troubleshooting":       "text-blue-900 bg-blue-100 border-blue-300",
  "Reviews & Comparisons": "text-blue-700 bg-blue-50 border-blue-200",
};
export const DEFAULT_CATEGORY_STYLE = "text-slate-600 bg-slate-100 border-slate-200";
