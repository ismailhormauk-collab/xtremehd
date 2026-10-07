import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, Calendar, ArrowLeft, ArrowRight, MessageCircle, ChevronRight } from "lucide-react";
import { blogPosts, getBlogPost, getRelatedPosts, CATEGORY_STYLE, DEFAULT_CATEGORY_STYLE } from "@/data/blog-posts";
import Script from "next/script";
import { absoluteUrl } from "@/lib/url";
import { BRAND_NAME, SITE_URL, whatsappUrl } from "@/lib/contact";
import { getDeviceTier, DURATIONS, usd } from "@/lib/pricing";
import BlogThumbnail from "@/components/blog/BlogThumbnail";

const baseTier = getDeviceTier(1);

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return blogPosts.map(post => ({ slug: post.slug }));
}

// Every valid slug is enumerated above — any slug not in that list should
// hard 404 instead of falling back to an on-demand render.
export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPost(params.slug);
  if (!post) return {};
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: {
      canonical: absoluteUrl(`/blog/${post.slug}`),
    },
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.publishedAt,
      authors: [BRAND_NAME],
      section: post.category,
      url: absoluteUrl(`/blog/${post.slug}`),
      siteName: BRAND_NAME,
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle,
      description: post.metaDescription,
    },
  };
}

function renderContent(md: string): string {
  return md
    .replace(/^## (.+)$/gm, '<h2 class="text-slate-900 font-black text-xl mt-10 mb-4">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 class="text-slate-900 font-bold text-base mt-6 mb-2">$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-slate-900 font-semibold">$1</strong>')
    .replace(/`(.+?)`/g, '<code class="text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>')
    .replace(/^\- \[ \] (.+)$/gm, '<li class="text-slate-600 text-sm leading-relaxed pl-1 list-none before:content-[\'☐_\'] before:text-blue-500">$1</li>')
    .replace(/^\- (.+)$/gm, '<li class="text-slate-600 text-sm leading-relaxed pl-1">$1</li>')
    .replace(/(<li[\s\S]+?<\/li>)/g, '<ul class="list-disc list-inside space-y-1.5 my-3 ml-2">$1</ul>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, text, url) => {
      const isInternal = url.startsWith('/');
      const attrs = isInternal ? '' : ' target="_blank" rel="nofollow noopener noreferrer"';
      return `<a href="${url}"${attrs} class="text-blue-600 hover:text-blue-700 underline underline-offset-2 transition-colors">${text}</a>`;
    })
    .replace(/\n\n/g, '</p><p class="text-slate-600 text-[15px] leading-relaxed my-4">')
    .replace(/\n/g, ' ');
}

export default function BlogPostPage({ params }: Props) {
  const post = getBlogPost(params.slug);
  if (!post) notFound();

  const related = getRelatedPosts(post.slug, post.category, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    image: absoluteUrl(post.coverImage),
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    keywords: post.keywords?.join(", "),
    author: { "@type": "Organization", name: BRAND_NAME, url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: BRAND_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(`/blog/${post.slug}`) },
    articleSection: post.category,
    inLanguage: "en",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl('/') },
      { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl('/blog') },
      { "@type": "ListItem", position: 3, name: post.title, item: absoluteUrl(`/blog/${post.slug}`) },
    ],
  };

  return (
    <>
      <Script id="article-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="min-h-screen pt-20 pb-24">

        {/* ── Branded hero ──────────────────────────────────────────── */}
        <div className="relative w-full overflow-hidden" style={{ paddingTop: 'clamp(220px, 34vw, 420px)' }}>
          <BlogThumbnail slug={post.slug} category={post.category} variant="hero" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050a17] via-[#050a17]/50 to-[#050a17]/10 pointer-events-none" />

          <div className="absolute bottom-0 left-0 right-0 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-blue-100 mb-4">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white truncate max-w-[240px]">{post.title}</span>
            </nav>
            <span className={`inline-block text-[11px] font-semibold px-3 py-1 rounded-full border mb-4 ${CATEGORY_STYLE[post.category] ?? DEFAULT_CATEGORY_STYLE}`}>
              {post.category}
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
              {post.title}
            </h1>
          </div>
        </div>

        {/* ── Meta row ─────────────────────────────────────────────── */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-blue-100 py-4">
          <div className="flex flex-wrap items-center gap-5 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />{post.readTime}
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(post.publishedAt).toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })}
            </div>
            <span className="text-blue-600 font-semibold">By {BRAND_NAME}</span>
          </div>
        </div>

        {/* ── Content + sidebar ─────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_320px] gap-10 lg:items-start">

            {/* Article */}
            <article>
              <div
                className="text-slate-600 text-[15px] leading-relaxed"
                dangerouslySetInnerHTML={{ __html: `<p class="text-slate-600 text-[15px] leading-relaxed my-4">${renderContent(post.content.trim())}</p>` }}
              />

              {/* CTA box */}
              <div className="mt-12 rounded-2xl p-8 border border-blue-200 bg-blue-50 text-center">
                <h3 className="text-slate-900 font-bold text-xl mb-2">Ready to Start Streaming?</h3>
                <p className="text-slate-500 text-sm mb-6">
                  Get access to HD & 4K live channels, movies and series with Xtreme HD IPTV. Instant activation after payment.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link
                    href="/pricing"
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl hover:scale-[1.02] transition-all shadow-lg shadow-blue-500/20 text-sm"
                  >
                    View Pricing Plans
                  </Link>
                  <a
                    href={whatsappUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-[#25D366]/10 border border-[#25D366]/30 text-[#128C4A] font-semibold rounded-xl hover:bg-[#25D366]/20 transition-all text-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Order via WhatsApp
                  </a>
                </div>
              </div>

              {/* Back link */}
              <div className="mt-8">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors text-sm font-medium"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to all articles
                </Link>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-6 lg:sticky lg:top-24">
              {/* Quick order */}
              <div className="glass rounded-2xl p-6 border border-blue-200">
                <h3 className="text-slate-900 font-bold text-sm mb-4">Get Started Today</h3>
                <div className="space-y-2 mb-5">
                  {DURATIONS.map(d => (
                    <a
                      key={d.key}
                      href={whatsappUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all ${
                        d.key === "12months"
                          ? "bg-blue-600/10 border border-blue-300 text-slate-900"
                          : "glass border border-blue-100 text-slate-600 hover:border-blue-300"
                      }`}
                    >
                      <span className="font-medium">{d.label}{d.key === "12months" ? " ★" : ""}</span>
                      <span className="font-bold text-blue-600">{usd(baseTier.prices[d.key])}</span>
                    </a>
                  ))}
                </div>
                <a
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] text-white font-bold rounded-xl hover:opacity-90 transition-all text-sm"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  WhatsApp Us Now
                </a>
              </div>

              {/* Sidebar related articles */}
              {related.length > 0 && (
                <div>
                  <p className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-3">Related Articles</p>
                  <div className="space-y-2">
                    {related.map(rel => (
                      <Link
                        key={rel.slug}
                        href={`/blog/${rel.slug}`}
                        className="group flex gap-3 items-start rounded-xl p-3 border border-blue-100 hover:border-blue-300 bg-white transition-all"
                      >
                        <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0">
                          <BlogThumbnail slug={rel.slug} category={rel.category} variant="sidebar" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-slate-600 text-xs font-medium group-hover:text-blue-700 transition-colors line-clamp-2 leading-snug">
                            {rel.title}
                          </p>
                          <p className="text-slate-400 text-[10px] mt-1">{rel.readTime}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>

          </div>

          {/* ── Related Articles — full-width bottom section ── */}
          {related.length > 0 && (
            <section className="mt-16 pt-10 border-t border-blue-100">
              <h2 className="text-slate-900 font-bold text-xl mb-6">More Articles You May Like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {related.map(rel => (
                  <Link
                    key={rel.slug}
                    href={`/blog/${rel.slug}`}
                    className="group flex flex-col rounded-2xl overflow-hidden border border-blue-100 bg-white hover:border-blue-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="relative w-full aspect-video overflow-hidden">
                      <BlogThumbnail slug={rel.slug} category={rel.category} />
                      <div className="absolute top-3 left-3 z-10">
                        <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border backdrop-blur-md ${CATEGORY_STYLE[rel.category] ?? DEFAULT_CATEGORY_STYLE}`}>
                          {rel.category}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col flex-1 p-5">
                      <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-3">
                        <Clock className="w-3 h-3" />
                        {rel.readTime}
                      </div>
                      <h3 className="text-slate-900 font-bold text-sm leading-snug mb-2 group-hover:text-blue-700 transition-colors line-clamp-2">
                        {rel.title}
                      </h3>
                      <p className="text-slate-500 text-xs leading-relaxed line-clamp-2 flex-1 mb-4">
                        {rel.excerpt}
                      </p>
                      <div className="flex items-center gap-1.5 text-blue-600 text-xs font-semibold group-hover:gap-2.5 transition-all mt-auto">
                        Read Article <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

        </div>
      </div>
    </>
  );
}
