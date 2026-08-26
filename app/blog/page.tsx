import type { Metadata } from "next";
import Script from "next/script";
import { getDictionary } from "@/locales/getDictionary";
import { absoluteUrl } from "@/lib/url";
import { BRAND_NAME, SITE_URL } from "@/lib/contact";
import { blogPosts } from "@/data/blog-posts";
import BlogGrid from "@/components/blog/BlogGrid";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    title: dict.pages.blog.title,
    description: dict.pages.blog.description,
    keywords: [
      "iptv xtreme hd", "xtreme hd iptv", "xtreme hd", "iptv guide",
      "iptv subscription", "iptv free trial", "premium streaming",
    ],
    alternates: {
      canonical: absoluteUrl('/blog'),
    },
    openGraph: {
      title: dict.pages.blog.title,
      description: dict.pages.blog.description,
      type: "website",
      url: absoluteUrl('/blog'),
      siteName: BRAND_NAME,
    },
    twitter: {
      card: "summary_large_image",
      title: dict.pages.blog.title,
      description: dict.pages.blog.description,
    },
  };
}

export default async function BlogPage() {
  const dict = await getDictionary();
  const p = dict.pages.blog;

  const blogListSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${BRAND_NAME} Blog`,
    description: "IPTV guides, device setup tutorials, buying advice, and troubleshooting from Xtreme HD IPTV.",
    url: absoluteUrl('/blog'),
    publisher: {
      "@type": "Organization",
      name: BRAND_NAME,
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo.png` },
    },
    blogPost: blogPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.metaDescription,
      url: absoluteUrl(`/blog/${post.slug}`),
      datePublished: post.publishedAt,
      image: absoluteUrl(post.coverImage),
      keywords: post.keywords?.join(", "),
    })),
  };

  return (
    <>
      <Script
        id="blog-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListSchema) }}
      />

      <div className="min-h-screen pt-28 pb-24">

        {/* Page header */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
          <p className="text-blue-600 text-xs font-bold uppercase tracking-[0.15em] mb-3">Blog</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 mb-3">{p.hero}</h1>
          <p className="text-slate-500 text-base sm:text-lg">
            Practical IPTV guides, device setup tutorials, buying advice, and troubleshooting — plus everything you need to know about getting started with Xtreme HD IPTV.
          </p>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {blogPosts.length === 0 ? (
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-slate-500 text-sm sm:text-base">{p.noPosts}</p>
              <p className="text-slate-400 text-sm mt-2">{p.comingSoon}</p>
            </div>
          ) : (
            <BlogGrid posts={blogPosts} />
          )}
        </div>

      </div>
    </>
  );
}
