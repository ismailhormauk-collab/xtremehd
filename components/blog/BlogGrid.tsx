"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Clock, Calendar, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import BlogThumbnail from "@/components/blog/BlogThumbnail";
import { CATEGORIES, CATEGORY_STYLE, DEFAULT_CATEGORY_STYLE, type BlogPost } from "@/data/blog-posts";

const PAGE_SIZE = 12;

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", { month: "short", day: "numeric", year: "numeric" });
}

export default function BlogGrid({ posts }: { posts: BlogPost[] }) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [page, setPage] = useState(1);

  const availableCategories = CATEGORIES.filter((c) => posts.some((p) => p.category === c));
  const filtered = activeCategory === "All" ? posts : posts.filter((p) => p.category === activeCategory);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  useEffect(() => {
    setPage(1);
  }, [activeCategory]);

  return (
    <div>
      {/* Category filter pills */}
      <div className="flex justify-center px-2 mb-10">
        <div className="inline-flex flex-wrap justify-center gap-1 sm:gap-1.5 p-1.5 rounded-full bg-white border border-blue-100 shadow-sm max-w-full">
          {["All", ...availableCategories].map((cat) => {
            const active = cat === activeCategory;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 ${
                  active
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/30"
                    : "bg-transparent text-slate-600 hover:text-blue-600 hover:bg-blue-50"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Article grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paged.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col rounded-2xl overflow-hidden border border-blue-100 bg-white hover:border-blue-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <div className="relative w-full aspect-video overflow-hidden">
              <BlogThumbnail slug={post.slug} category={post.category} />
              <div className="absolute top-3 left-3 z-10">
                <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border backdrop-blur-md ${CATEGORY_STYLE[post.category] ?? DEFAULT_CATEGORY_STYLE}`}>
                  {post.category}
                </span>
              </div>
            </div>

            <div className="flex flex-col flex-1 p-5">
              <div className="flex items-center gap-3 text-slate-400 text-xs mb-3">
                <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" />{post.readTime}</span>
                <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" />{formatDate(post.publishedAt)}</span>
              </div>
              <h3 className="text-slate-900 font-bold text-[15px] leading-snug mb-2.5 group-hover:text-blue-700 transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-slate-500 text-[13px] leading-relaxed line-clamp-2 flex-1 mb-4">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-1.5 text-blue-600 text-xs font-semibold group-hover:gap-2.5 transition-all mt-auto">
                Read Article <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-slate-500 text-sm py-16">No articles in this category yet.</p>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-12">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="flex items-center justify-center w-9 h-9 rounded-full border border-blue-100 bg-white text-slate-500 hover:text-blue-600 hover:border-blue-300 disabled:opacity-40 disabled:hover:text-slate-500 disabled:hover:border-blue-100 transition-colors"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setPage(n)}
              className={`w-9 h-9 rounded-full text-sm font-bold transition-colors ${
                n === currentPage
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/30"
                  : "bg-white border border-blue-100 text-slate-600 hover:text-blue-600 hover:border-blue-300"
              }`}
            >
              {n}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center justify-center w-9 h-9 rounded-full border border-blue-100 bg-white text-slate-500 hover:text-blue-600 hover:border-blue-300 disabled:opacity-40 disabled:hover:text-slate-500 disabled:hover:border-blue-100 transition-colors"
            aria-label="Next page"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
