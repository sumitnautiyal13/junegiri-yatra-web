import type { Metadata } from 'next';
import Script from 'next/script';
import BlogIndexClient from './BlogIndexClient';

export const metadata: Metadata = {
  title: 'Uttarakhand Travel Blog — Guides, Tips & Itineraries',
  description:
    'Expert travel guides for Char Dham Yatra, Himalayan treks, Rishikesh adventures, and Uttarakhand destinations. Tips, packing lists, best-time guides.',
  alternates: { canonical: 'https://junegiriyatra.com/blog/' },
  openGraph: {
    title: 'Uttarakhand Travel Blog — Guides, Tips & Itineraries',
    description:
      'Expert travel guides for Char Dham Yatra, Himalayan treks, Rishikesh adventures, and Uttarakhand destinations.',
    url: 'https://junegiriyatra.com/blog/',
    type: 'website',
  },
};

const blogJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [{
  '@type': 'Blog',
  name: 'Junegiri Yatra Travel Blog',
  description: 'Expert travel guides for Char Dham Yatra, Himalayan treks, Rishikesh adventures, and Uttarakhand destinations.',
  url: 'https://junegiriyatra.com/blog/',
  publisher: {
    '@type': 'Organization',
    name: 'Junegiri Yatra',
    url: 'https://junegiriyatra.com',
    logo: { '@type': 'ImageObject', url: 'https://junegiriyatra.com/logo.png' },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+919873897652',
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi'],
    },
  },
  about: [
    { '@type': 'Thing', name: 'Char Dham Yatra' },
    { '@type': 'Thing', name: 'Himalayan Treks' },
    { '@type': 'Thing', name: 'Rishikesh Adventures' },
    { '@type': 'Thing', name: 'Uttarakhand Tourism' },
  ],
  }, {
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://junegiriyatra.com/' },
    { '@type': 'ListItem', position: 2, name: 'Travel Blog', item: 'https://junegiriyatra.com/blog/' },
  ],
  }],
};

export default function BlogPage() {
  return (
    <>
      <Script id="blog-jsonld" type="application/ld+json" strategy="beforeInteractive">
        {JSON.stringify(blogJsonLd)}
      </Script>
      <BlogIndexClient />
    </>
  );
}
