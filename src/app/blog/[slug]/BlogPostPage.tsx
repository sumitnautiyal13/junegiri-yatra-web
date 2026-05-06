'use client';

import { useState } from 'react';
import Link from 'next/link';
import blogData from '../../../../data/blog-posts.json';

export interface BlogPost {
  slug: string;
  title: string;
  meta_description: string;
  h1: string;
  excerpt: string;
  hero_image: string;
  category: string;
  read_time: string;
  published: string;
  author: string;
  keywords: string;
  content: string;
  related_package: string;
  tags: string[];
  faq: { q: string; a: string }[];
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function BlogPostPage({ post }: { post: BlogPost }) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Related posts — same category, excluding current post, up to 3
  const relatedPosts = (blogData as BlogPost[])
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  const whatsappMsg = encodeURIComponent(
    `Hi! I read your blog post "${post.title}" and I'm interested in the ${post.related_package} package. Can you share details?`
  );
  const whatsappUrl = `https://wa.me/919876543210?text=${whatsappMsg}`;

  // JSON-LD schemas
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.meta_description,
    image: `https://junegiriyatra.com${post.hero_image}`,
    datePublished: post.published,
    author: { '@type': 'Organization', name: post.author },
    publisher: {
      '@type': 'Organization',
      name: 'Junegiri Yatra',
      url: 'https://junegiriyatra.com',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://junegiriyatra.com/blog/${post.slug}/`,
    },
    keywords: post.keywords,
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://junegiriyatra.com/' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://junegiriyatra.com/blog/' },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `https://junegiriyatra.com/blog/${post.slug}/`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Breadcrumb */}
      <nav className="bp-breadcrumb" aria-label="Breadcrumb">
        <div className="bp-container">
          <Link href="/">Home</Link>
          <span> / </span>
          <Link href="/blog/">Blog</Link>
          <span> / </span>
          <span>{post.category}</span>
        </div>
      </nav>

      {/* Hero */}
      <section
        className="bp-hero"
        style={{ backgroundImage: `url(${post.hero_image})` }}
      >
        <div className="bp-hero-overlay">
          <div className="bp-container bp-hero-content">
            <span className="bp-category-badge">{post.category}</span>
            <h1
              className="bp-hero-h1"
              dangerouslySetInnerHTML={{ __html: post.h1 }}
            />
            <div className="bp-hero-meta">
              <span>{post.author}</span>
              <span className="bp-meta-dot">·</span>
              <span>{formatDate(post.published)}</span>
              <span className="bp-meta-dot">·</span>
              <span>{post.read_time}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <section className="bp-article-section">
        <div className="bp-container bp-article-layout">
          <article className="bp-article">
            <div
              className="content-section"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>

          {/* Sidebar CTA */}
          <aside className="bp-sidebar">
            <div className="bp-sidebar-card">
              <p className="bp-sidebar-label">Ready to travel?</p>
              <h3 className="bp-sidebar-heading">Book This Experience</h3>
              <p className="bp-sidebar-text">
                Get a customised quote and expert advice from our yatra specialists.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bp-btn-whatsapp"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp Us Now
              </a>
              <Link
                href={`/packages/${post.related_package}/`}
                className="bp-btn-package"
              >
                View Package Details →
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* Tags */}
      <section className="bp-tags-section">
        <div className="bp-container">
          {post.tags.map((tag) => (
            <span key={tag} className="bp-tag">
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bp-faq-section">
        <div className="bp-container bp-faq-inner">
          <h2 className="bp-section-heading">Frequently Asked Questions</h2>
          <div className="bp-faq-list">
            {post.faq.map((item, i) => (
              <div key={i} className="bp-faq-item">
                <button
                  className={`bp-faq-question${openFaq === i ? ' bp-faq-question--open' : ''}`}
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                >
                  <span>{item.q}</span>
                  <span className="bp-faq-icon">{openFaq === i ? '−' : '+'}</span>
                </button>
                {openFaq === i && (
                  <div className="bp-faq-answer">
                    <p>{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bp-cta-banner">
        <div className="bp-container bp-cta-inner">
          <div className="bp-cta-text">
            <h2 className="bp-cta-heading">Ready to Plan Your Journey?</h2>
            <p className="bp-cta-sub">
              Our yatra specialists are available on WhatsApp — get a personalised
              itinerary and instant quote.
            </p>
          </div>
          <div className="bp-cta-buttons">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bp-btn-whatsapp bp-btn-whatsapp--large"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Book on WhatsApp
            </a>
            <Link
              href={`/packages/${post.related_package}/`}
              className="bp-btn-package bp-btn-package--large"
            >
              View {post.category} Package →
            </Link>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bp-related-section">
          <div className="bp-container">
            <h2 className="bp-section-heading">Related Articles</h2>
            <div className="bp-related-grid">
              {relatedPosts.map((rp) => (
                <article key={rp.slug} className="bp-related-card">
                  <Link href={`/blog/${rp.slug}/`} className="bp-related-link">
                    <div
                      className="bp-related-image"
                      style={{ backgroundImage: `url(${rp.hero_image})` }}
                    />
                    <div className="bp-related-body">
                      <span className="bp-related-category">{rp.category}</span>
                      <h3 className="bp-related-title">{rp.title}</h3>
                      <span className="bp-related-time">{rp.read_time}</span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <style>{`
        /* ---- Layout ---- */
        .bp-container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* ---- Breadcrumb ---- */
        .bp-breadcrumb {
          background: #f9fafb;
          border-bottom: 1px solid #e5e7eb;
          padding: 10px 0;
          font-size: 0.82rem;
          color: #6b7280;
        }
        .bp-breadcrumb a {
          color: #f59e0b;
          text-decoration: none;
        }
        .bp-breadcrumb a:hover { text-decoration: underline; }

        /* ---- Hero ---- */
        .bp-hero {
          min-height: 420px;
          background-size: cover;
          background-position: center;
          position: relative;
          display: flex;
          align-items: flex-end;
        }
        .bp-hero-overlay {
          width: 100%;
          background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 60%, transparent 100%);
          padding: 48px 0 36px;
        }
        .bp-hero-content {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .bp-category-badge {
          display: inline-block;
          background: #f59e0b;
          color: #fff;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: 999px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          width: fit-content;
        }
        .bp-hero-h1 {
          font-size: clamp(1.8rem, 4vw, 3rem);
          font-weight: 800;
          color: #fff;
          line-height: 1.2;
          margin: 0;
          max-width: 760px;
        }
        .bp-hero-h1 em {
          font-style: normal;
          color: #f59e0b;
        }
        .bp-hero-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(255,255,255,0.75);
          font-size: 0.88rem;
          flex-wrap: wrap;
        }
        .bp-meta-dot { opacity: 0.4; }

        /* ---- Article Layout ---- */
        .bp-article-section {
          padding: 48px 0 0;
          background: #fff;
        }
        .bp-article-layout {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 48px;
          align-items: start;
        }
        @media (max-width: 768px) {
          .bp-article-layout { grid-template-columns: 1fr; }
          .bp-sidebar { order: -1; }
        }

        /* ---- Article Content ---- */
        .content-section {
          max-width: 800px;
          font-size: 1rem;
          line-height: 1.8;
          color: #374151;
        }
        .content-section h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #111827;
          margin: 2rem 0 0.75rem;
          border-bottom: 2px solid #f59e0b;
          padding-bottom: 8px;
        }
        .content-section h3 {
          font-size: 1.15rem;
          font-weight: 700;
          color: #1f2937;
          margin: 1.5rem 0 0.5rem;
        }
        .content-section p {
          margin: 0 0 1rem;
        }
        .content-section ul, .content-section ol {
          margin: 0.5rem 0 1.25rem 1.5rem;
        }
        .content-section li {
          margin-bottom: 0.4rem;
        }
        .content-section a {
          color: #f59e0b;
          font-weight: 600;
          text-decoration: none;
          border-bottom: 1px solid transparent;
          transition: border-color 0.15s;
        }
        .content-section a:hover {
          border-bottom-color: #f59e0b;
        }
        .content-section strong {
          color: #111827;
        }
        .content-section table {
          font-size: 0.9rem;
          border-radius: 8px;
          overflow: hidden;
        }

        /* ---- Sidebar ---- */
        .bp-sidebar {
          position: sticky;
          top: 80px;
        }
        .bp-sidebar-card {
          background: #fff7ed;
          border: 1.5px solid #fed7aa;
          border-radius: 12px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .bp-sidebar-label {
          font-size: 0.78rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #f59e0b;
          margin: 0;
        }
        .bp-sidebar-heading {
          font-size: 1.1rem;
          font-weight: 700;
          color: #111827;
          margin: 0;
        }
        .bp-sidebar-text {
          font-size: 0.88rem;
          color: #6b7280;
          margin: 0;
          line-height: 1.6;
        }

        /* ---- Buttons ---- */
        .bp-btn-whatsapp {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #25D366;
          color: #fff;
          font-weight: 700;
          font-size: 0.9rem;
          padding: 11px 20px;
          border-radius: 8px;
          text-decoration: none;
          transition: background 0.18s;
          justify-content: center;
        }
        .bp-btn-whatsapp:hover { background: #1da852; }
        .bp-btn-whatsapp--large { font-size: 1rem; padding: 14px 28px; }

        .bp-btn-package {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          color: #f59e0b;
          font-weight: 700;
          font-size: 0.9rem;
          padding: 10px 20px;
          border-radius: 8px;
          border: 2px solid #f59e0b;
          text-decoration: none;
          transition: all 0.18s;
        }
        .bp-btn-package:hover { background: #f59e0b; color: #fff; }
        .bp-btn-package--large { font-size: 1rem; padding: 13px 28px; }

        /* ---- Tags ---- */
        .bp-tags-section {
          padding: 24px 0;
          background: #fff;
          border-top: 1px solid #f3f4f6;
        }
        .bp-tags-section .bp-container {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .bp-tag {
          background: #f3f4f6;
          color: #374151;
          font-size: 0.8rem;
          font-weight: 500;
          padding: 4px 12px;
          border-radius: 999px;
        }

        /* ---- FAQ ---- */
        .bp-faq-section {
          background: #f9fafb;
          padding: 56px 0;
        }
        .bp-faq-inner {
          max-width: 800px !important;
        }
        .bp-section-heading {
          font-size: 1.5rem;
          font-weight: 700;
          color: #111827;
          margin: 0 0 28px;
        }
        .bp-faq-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .bp-faq-item {
          background: #fff;
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid #e5e7eb;
        }
        .bp-faq-question {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          padding: 18px 20px;
          background: none;
          border: none;
          text-align: left;
          font-size: 1rem;
          font-weight: 600;
          color: #111827;
          cursor: pointer;
          transition: background 0.15s;
        }
        .bp-faq-question:hover { background: #fef9f0; }
        .bp-faq-question--open { color: #f59e0b; }
        .bp-faq-icon {
          font-size: 1.4rem;
          font-weight: 400;
          line-height: 1;
          flex-shrink: 0;
          color: #f59e0b;
        }
        .bp-faq-answer {
          padding: 0 20px 18px;
          border-top: 1px solid #f3f4f6;
        }
        .bp-faq-answer p {
          margin: 12px 0 0;
          color: #4b5563;
          line-height: 1.7;
          font-size: 0.95rem;
        }

        /* ---- CTA Banner ---- */
        .bp-cta-banner {
          background: linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%);
          padding: 56px 0;
        }
        .bp-cta-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          flex-wrap: wrap;
        }
        .bp-cta-text { flex: 1; min-width: 280px; }
        .bp-cta-heading {
          font-size: 1.6rem;
          font-weight: 800;
          color: #fff;
          margin: 0 0 8px;
        }
        .bp-cta-sub {
          color: rgba(255,255,255,0.72);
          margin: 0;
          font-size: 0.95rem;
          line-height: 1.6;
        }
        .bp-cta-buttons {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        /* ---- Related Posts ---- */
        .bp-related-section {
          padding: 56px 0 80px;
          background: #fff;
        }
        .bp-related-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-top: 24px;
        }
        @media (max-width: 768px) {
          .bp-related-grid { grid-template-columns: 1fr; }
        }
        .bp-related-card {
          border-radius: 10px;
          overflow: hidden;
          border: 1px solid #e5e7eb;
          transition: box-shadow 0.2s, transform 0.2s;
        }
        .bp-related-card:hover {
          box-shadow: 0 6px 20px rgba(0,0,0,0.1);
          transform: translateY(-3px);
        }
        .bp-related-link {
          text-decoration: none;
          color: inherit;
          display: block;
        }
        .bp-related-image {
          height: 160px;
          background-size: cover;
          background-position: center;
          background-color: #c8d6e5;
        }
        .bp-related-body {
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .bp-related-category {
          font-size: 0.7rem;
          font-weight: 700;
          color: #f59e0b;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .bp-related-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: #111827;
          line-height: 1.4;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .bp-related-time {
          font-size: 0.78rem;
          color: #9ca3af;
        }
      `}</style>
    </>
  );
}
