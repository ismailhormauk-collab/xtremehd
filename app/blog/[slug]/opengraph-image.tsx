import { ImageResponse } from 'next/og';
import { blogPosts, getBlogPost } from '@/data/blog-posts';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return blogPosts.map(post => ({ slug: post.slug }));
}

const categoryColors: Record<string, string> = {
  "Xtreme HD IPTV": '#dbeafe',
  "Firestick": '#93c5fd',
  "Smart TV": '#60a5fa',
  "Android": '#93c5fd',
  "Apple TV": '#60a5fa',
  "IPTV Players": '#60a5fa',
  "Troubleshooting": '#bfdbfe',
  "IPTV Tips": '#93c5fd',
  "Reviews & Comparisons": '#93c5fd',
};

export default function BlogPostOGImage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getBlogPost(params.slug);
  const title = post?.title ?? 'Xtreme HD IPTV Blog';
  const category = post?.category ?? 'Xtreme HD IPTV';
  const readTime = post?.readTime ?? '5 min read';
  const catColor = categoryColors[category] ?? '#93c5fd';

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '70px 80px',
          background: '#0a1730',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {/* Blue glow bottom-left */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 75% 75% at 5% 90%, rgba(37,99,235,0.6), transparent)',
          }}
        />
        {/* Blue glow top-right */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse 55% 55% at 95% 5%, rgba(59,130,246,0.35), transparent)',
          }}
        />

        {/* Category badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(37,99,235,0.2)',
            border: '1px solid rgba(59,130,246,0.5)',
            borderRadius: 999,
            padding: '8px 26px',
            fontSize: 20,
            color: catColor,
            fontWeight: 700,
            marginBottom: 26,
            width: 'fit-content',
            position: 'relative',
          }}
        >
          {category}
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: title.length > 65 ? 42 : title.length > 45 ? 48 : 54,
            fontWeight: 900,
            color: 'white',
            lineHeight: 1.2,
            marginBottom: 36,
            maxWidth: 1040,
            position: 'relative',
          }}
        >
          {title}
        </div>

        {/* Footer row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 0,
            position: 'relative',
          }}
        >
          {/* Logo badge */}
          <div
            style={{
              width: 50,
              height: 50,
              background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
              borderRadius: 13,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 28,
              fontWeight: 900,
              color: 'white',
              marginRight: 18,
            }}
          >
            X
          </div>
          <span
            style={{ fontSize: 22, color: '#94a3b8', fontWeight: 700, marginRight: 14 }}
          >
            Xtreme HD IPTV
          </span>
          <span style={{ fontSize: 22, color: '#334155', marginRight: 14 }}>·</span>
          <span style={{ fontSize: 22, color: '#64748b', marginRight: 14 }}>{readTime}</span>
          <span style={{ fontSize: 22, color: '#334155', marginRight: 14 }}>·</span>
          <span style={{ fontSize: 22, color: '#64748b' }}>iptvxtremehd.net</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
