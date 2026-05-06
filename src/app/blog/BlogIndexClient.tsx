'use client';

import { useState } from 'react';
import Link from 'next/link';
import blogPosts from '../../../data/blog-posts.json';

const CATEGORIES = [
  'All',
  'Pilgrimage Guides',
  'Trek Guides',
  'Adventure',
  'Safety & Health',
  'Heritage Tours',
  'Wellness',
  'Winter Travel',
  'Spiritual',
];

const blogJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'Junegiri Yatra Travel Blog',
  description:
    'Expert travel guides for Char Dham Yatra, Himalayan treks, Rishikesh adventures, and Uttarakhand destinations.',
  url: 'https://junegiriyatra.com/blog/',
  publisher: {
    '@type': 'Organization',
    name: 'Junegiri Yatra',
    url: 'https://junegiriyatra.com',
  },
  blogPost: blogPosts.map((p) => ({
    '@type': 'BlogPosting',
    headline: p.title,
    url: `https://junegiriyatra.com/blog/${p.slug}/`,
    datePublished: p.published,
    author: { '@type': 'Organization', name: p.author },
    image: `https://junegiriyatra.com${p.hero_image}`,
  })),
};

export default function BlogIndexClient() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered =
    activeCategory === 'All'
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />

      {/* Hero */}
      <section className="blog-hero">
        <div className="blog-hero-inner">
          <h1
            className="blog-hero-title"
            dangerouslySetInnerHTML={{ __html: 'Travel <em>Blog</em>' }}
          />
          <p className="blog-hero-subtitle">
            Guides, tips, and itineraries for Uttarakhand &amp; beyond
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="blog-filter-bar">
        <div className="blog-filter-inner">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`filter-pill${activeCategory === cat ? ' filter-pill--active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Blog Grid */}
      <section className="blog-grid-section">
        <div className="blog-grid">
          {filtered.map((post) => (
            <article key={post.slug} className="blog-card">
              <Link href={`/blog/${post.slug}/`} className="blog-card-link">
                <div
                  className="blog-card-image"
                  style={{ backgroundImage: `url(${post.hero_image})` }}
                >
                  <span className="blog-card-category">{post.category}</span>
                </div>
                <div className="blog-card-body">
                  <h2 className="blog-card-title">{post.title}</h2>
                  <p className="blog-card-excerpt">{post.excerpt}</p>
                  <div className="blog-card-meta">
                    <span className="blog-card-read-time">{post.read_time}</span>
                    <span className="blog-card-cta">Read More →</span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="blog-no-results">No posts in this category yet.</p>
        )}
      </section>

      <style>{`
        .blog-hero {
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
          padding: 80px 24px 60px;
          text-align: center;
        }
        .blog-hero-inner {
          max-width: 720px;
          margin: 0 auto;
        }
        .blog-hero-title {
          font-size: clamp(2.2rem, 5vw, 3.5rem);
          font-weight: 800;
          color: #fff;
          margin: 0 0 16px;
          line-height: 1.2;
        }
        .blog-hero-title em {
          font-style: normal;
          color: #f59e0b;
        }
        .blog-hero-subtitle {
          font-size: 1.1rem;
          color: rgba(255,255,255,0.75);
          margin: 0;
        }

        .blog-filter-bar {
          background: #fff;
          border-bottom: 1px solid #e5e7eb;
          padding: 16px 24px;
          position: sticky;
          top: 0;
          z-index: 50;
        }
        .blog-filter-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          justify-content: center;
        }
        .filter-pill {
          padding: 6px 16px;
          border-radius: 999px;
          border: 1.5px solid #d1d5db;
          background: #fff;
          color: #374151;
          font-size: 0.85rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.18s;
          white-space: nowrap;
        }
        .filter-pill:hover {
          border-color: #f59e0b;
          color: #f59e0b;
        }
        .filter-pill--active {
          background: #f59e0b;
          border-color: #f59e0b;
          color: #fff;
        }

        .blog-grid-section {
          background: #f9fafb;
          padding: 48px 24px 80px;
        }
        .blog-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }
        @media (max-width: 900px) {
          .blog-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 580px) {
          .blog-grid { grid-template-columns: 1fr; }
        }

        .blog-card {
          background: #fff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 1px 3px rgba(0,0,0,0.08);
          transition: box-shadow 0.2s, transform 0.2s;
        }
        .blog-card:hover {
          box-shadow: 0 8px 24px rgba(0,0,0,0.12);
          transform: translateY(-4px);
        }
        .blog-card-link {
          text-decoration: none;
          color: inherit;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .blog-card-image {
          height: 200px;
          background-size: cover;
          background-position: center;
          background-color: #c8d6e5;
          position: relative;
          display: flex;
          align-items: flex-start;
          padding: 12px;
          flex-shrink: 0;
        }
        .blog-card-category {
          background: #f59e0b;
          color: #fff;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 999px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .blog-card-body {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          flex: 1;
        }
        .blog-card-title {
          font-size: 1rem;
          font-weight: 700;
          color: #111827;
          line-height: 1.4;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .blog-card-excerpt {
          font-size: 0.875rem;
          color: #6b7280;
          line-height: 1.6;
          margin: 0;
          flex: 1;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .blog-card-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 4px;
        }
        .blog-card-read-time {
          font-size: 0.78rem;
          color: #9ca3af;
        }
        .blog-card-cta {
          font-size: 0.82rem;
          font-weight: 600;
          color: #f59e0b;
        }

        .blog-no-results {
          text-align: center;
          color: #6b7280;
          padding: 48px 0;
          font-size: 1rem;
          grid-column: 1 / -1;
        }
      `}</style>
    </>
  );
}
