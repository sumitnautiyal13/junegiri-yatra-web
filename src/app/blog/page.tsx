import type { Metadata } from 'next';
import BlogIndexClient from './BlogIndexClient';

export const metadata: Metadata = {
  title: 'Uttarakhand Travel Blog — Guides, Tips & Itineraries | Junegiri Yatra',
  description:
    'Expert travel guides for Char Dham Yatra, Himalayan treks, Rishikesh adventures, and Uttarakhand destinations. Tips, packing lists, best-time guides.',
  alternates: { canonical: 'https://junegiriyatra.com/blog/' },
  openGraph: {
    title: 'Uttarakhand Travel Blog — Guides, Tips & Itineraries | Junegiri Yatra',
    description:
      'Expert travel guides for Char Dham Yatra, Himalayan treks, Rishikesh adventures, and Uttarakhand destinations.',
    url: 'https://junegiriyatra.com/blog/',
    type: 'website',
  },
};

export default function BlogPage() {
  return <BlogIndexClient />;
}
