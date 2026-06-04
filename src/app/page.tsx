import type { Metadata } from 'next';
import HomePageClient from './HomePageClient';

export const metadata: Metadata = {
  title: 'Junegiri Yatra | Himalayan Treks, India Tours & Sacred Yatras 2026',
  description:
    "Himalayan treks, Char Dham Yatra, Golden Triangle & yoga retreats — all-inclusive from Haridwar since 2017. 4.8★ 312 reviews. Book on WhatsApp.",
  keywords:
    'himalayan treks, india tour packages, char dham yatra 2026, kedarnath yatra, golden triangle tour, rishikesh adventure, uttarakhand tour operator, junegiri yatra haridwar',
  alternates: { canonical: 'https://junegiriyatra.com/' },
  openGraph: {
    title: 'Junegiri Yatra — Himalayan Treks, India Tours & Sacred Yatras',
    description:
      "Himalayan treks, Char Dham Yatra, Golden Triangle & yoga retreats. All-inclusive from Haridwar since 2017. 4.8★ rated.",
    url: 'https://junegiriyatra.com/',
    type: 'website',
    siteName: 'Junegiri Yatra',
    locale: 'en_IN',
    images: [
      {
        url: 'https://junegiriyatra.com/images/kedarnath_temple_cover.webp',
        width: 1200,
        height: 630,
        alt: 'Kedarnath Temple — Junegiri Yatra',
      },
    ],
  },
};

const HOMEPAGE_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['TravelAgency', 'Organization'],
      '@id': 'https://junegiriyatra.com/#organization',
      name: 'Junegiri Yatra',
      alternateName: 'Junegiri Yatra Pvt. Ltd.',
      url: 'https://junegiriyatra.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://junegiriyatra.com/logo.png',
        width: 180,
        height: 56,
      },
      telephone: '+919873897652',
      email: 'info@junegiriyatra.com',
      foundingDate: '2017',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Haridwar',
        addressLocality: 'Haridwar',
        addressRegion: 'Uttarakhand',
        postalCode: '249401',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 29.9457,
        longitude: 78.1642,
      },
      description:
        'India tour operator specialising in Himalayan treks, Char Dham Yatra, Kedarnath pilgrimage, Rishikesh adventures, Golden Triangle, yoga retreats and Braj Bhoomi Yatra. Haridwar-based. Serving travelers since 2017.',
      knowsAbout: [
        'Himalayan Trekking',
        'Char Dham Yatra',
        'Kedarnath Pilgrimage',
        'Rishikesh Adventure Tourism',
        'Golden Triangle Tours',
        'Yoga Teacher Training',
        'India Heritage Tours',
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: 4.8,
        reviewCount: 312,
        bestRating: 5,
        worstRating: 1,
      },
      sameAs: [
        'https://www.instagram.com/junegiriyatra',
        'https://www.facebook.com/junegiriyatra',
        'https://wa.me/919873897652',
        'https://www.google.com/maps/search/Junegiri+Yatra+Haridwar',
      ],
      hasMap: 'https://www.google.com/maps/search/Junegiri+Yatra+Haridwar',
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '08:00',
          closes: '20:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Sunday'],
          opens: '09:00',
          closes: '18:00',
        },
      ],
      priceRange: '₹₹',
      currenciesAccepted: 'INR, USD',
      paymentAccepted: 'Cash, Bank Transfer, UPI, Credit Card',
      areaServed: {
        '@type': 'Country',
        name: 'India',
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://junegiriyatra.com/#website',
      url: 'https://junegiriyatra.com',
      name: 'Junegiri Yatra',
      description: 'India tour packages — Char Dham Yatra, Himalayan treks, Golden Triangle and more',
      publisher: { '@id': 'https://junegiriyatra.com/#organization' },
      inLanguage: 'en-IN',
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How do I book a tour with Junegiri Yatra?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'WhatsApp us at +91 98738 97652 with your travel dates, group size, and preferred destinations. Our Haridwar team responds within 1 hour with a custom itinerary and transparent pricing. Confirm with just 30% advance.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the best time to do Char Dham Yatra?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The Char Dham Yatra season runs from May to June and September to October. The portals (doors) of Kedarnath, Badrinath, Gangotri, and Yamunotri open in late April/early May and close in October/November due to heavy snowfall. Avoid July–August (peak monsoon) for road travel.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does Junegiri Yatra arrange Kedarnath helicopter bookings?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, we arrange Kedarnath helicopter packages from Phata, Sitapur, Guptkashi, and Sersi helipads. Our Kedarnath Helicopter 2N/3D package starts from ₹24,000 per person and includes VVIP darshan slots.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I customise the tour package for my group?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, all packages are fully customisable. We adjust hotel category, transport type, number of days, add-on activities, and dietary requirements. Groups of 6 or more receive a 10% discount. WhatsApp us for a free custom itinerary.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is included in Junegiri Yatra packages?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'All packages include accommodation (hotel or guesthouse), meals as specified, private AC vehicle transfers, licensed guide, all applicable permits, and 24/7 WhatsApp support. What you see in the quote is what you pay — zero hidden costs.',
          },
        },
        {
          '@type': 'Question',
          name: 'Are Himalayan trek packages beginner-friendly?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Treks like Kedarkantha (Dec–Apr), Kuari Pass (Feb–Jun), and Har Ki Dun (Apr–Nov) are suitable for beginners with basic fitness. Our trek guides are NCRD-certified and carry first-aid kits. We recommend a 3-week fitness preparation for treks above 3,500m.',
          },
        },
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      {/* Preload hero image in SSR'd HTML — ensures browser fetches it immediately, before JS hydrates */}
      <link
        rel="preload"
        as="image"
        href="/images/kedarnath_temple_cover.webp"
        fetchPriority="high"
        type="image/webp"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(HOMEPAGE_SCHEMA) }}
      />
      <HomePageClient />
    </>
  );
}
