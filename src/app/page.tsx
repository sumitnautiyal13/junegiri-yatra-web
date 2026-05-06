import type { Metadata } from 'next';
import HomePageClient from './HomePageClient';

export const metadata: Metadata = {
  title: 'Junegiri Yatra — India Tour Packages | Char Dham Yatra, Himalayan Treks, Golden Triangle 2026',
  description:
    "India's trusted travel company since 2017 — Char Dham Yatra, Kedarnath, Valley of Flowers, Golden Triangle, Rishikesh adventures & Kerala tours. All-inclusive packages from Haridwar. Book on WhatsApp.",
  keywords:
    'char dham yatra 2026, kedarnath yatra, india tour packages, golden triangle tour, himalayan treks, rishikesh adventure, junegiri yatra haridwar, uttarakhand tour operator',
  alternates: { canonical: 'https://junegiriyatra.com/' },
  openGraph: {
    title: 'Junegiri Yatra — India Tour Packages | Char Dham, Treks & Heritage',
    description:
      "India's trusted travel company — Char Dham Yatra, Himalayan treks, Golden Triangle & Rishikesh adventures. All-inclusive from Haridwar since 2017.",
    url: 'https://junegiriyatra.com/',
    type: 'website',
    images: [
      {
        url: 'https://junegiriyatra.com/images/kedarnath_temple_cover.jpg',
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
        'India tour operator specialising in Char Dham Yatra, Kedarnath pilgrimage, Himalayan treks, Golden Triangle, Rishikesh adventures and Braj Bhoomi Yatra. Haridwar-based. Serving travelers since 2017.',
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(HOMEPAGE_SCHEMA) }}
      />
      <HomePageClient />
    </>
  );
}
