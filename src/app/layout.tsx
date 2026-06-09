import type { Metadata } from 'next';
import { Poppins, Playfair_Display, Inter } from 'next/font/google';
import { headers } from 'next/headers';
import './globals.css';
import { CurrencyProvider } from '@/contexts/CurrencyContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import ScrollReveal from '@/components/ScrollReveal';
import PWASetup from '@/components/PWASetup';
import PWAInstallBanner from '@/components/PWAInstallBanner';
import NavigationProgress from '@/components/NavigationProgress';
import Analytics from '@/components/Analytics';

/* ── Self-hosted fonts (no external CSS, no render-blocking) ─ */
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700', '800', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://junegiriyatra.com'),
  title: 'Junegiri Yatra — India Tour Packages | Char Dham, Treks, Golden Triangle',
  description: 'India\'s trusted travel company — Char Dham Yatra, Kedarnath, Himalayan treks, Golden Triangle, Kerala tours. All-inclusive packages from Haridwar. Book via WhatsApp.',
  keywords: 'char dham yatra, kedarnath yatra, india tour packages, golden triangle, himalayan treks, rishikesh adventure, junegiri yatra',
  authors: [{ name: 'Junegiri Yatra' }],
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Junegiri Yatra',
  },
  openGraph: {
    siteName: 'Junegiri Yatra',
    type: 'website',
    locale: 'en_IN',
    images: [{ url: 'https://junegiriyatra.com/logo.png' }],
  },
  twitter: { card: 'summary_large_image', site: '@junegiriyatra', creator: '@junegiriyatra' },
  robots: { index: true, follow: true },
  other: {
    'theme-color': '#c9a84c',
    'mobile-web-app-capable': 'yes',
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // headers() throws DYNAMIC_SERVER_USAGE in static/ISR rendering contexts (Next.js 15+).
  // Wrap in try/catch so public ISR pages (e.g. /from/, /trek/) render without 500 errors.
  // isAppRoute is only ever true for /admin and /p routes, which are always dynamic anyway.
  let isAppRoute = false;
  try {
    const headersList = await headers();
    const pathname = headersList.get('x-pathname') ?? headersList.get('x-invoke-path') ?? '';
    isAppRoute = pathname.startsWith('/admin') || pathname.startsWith('/p/');
  } catch {
    // Static or ISR rendering context — headers not available, default to public layout
    isAppRoute = false;
  }

  return (
    <html
      lang="en"
      className={`${poppins.variable} ${playfair.variable} ${inter.variable}`}
    >
      <head>
        {/* PWA icons */}
        <link rel="apple-touch-icon" href="/icons/icon-180.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icons/icon-192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icons/icon-512.png" />
      </head>
      <body>
        <CurrencyProvider>
          {isAppRoute ? (
            <>{children}</>
          ) : (
            <>
              <Header />
              <main>{children}</main>
              <Footer />
              <WhatsAppFloat />
              <ScrollReveal />
              <PWASetup />
              <PWAInstallBanner />
              <NavigationProgress />
            </>
          )}
        </CurrencyProvider>
        {/* Analytics (GA4 + Meta Pixel) — gated so bots/headless/monitoring
            traffic never fire the tags and never pollute reporting. */}
        <Analytics />
      </body>
    </html>
  );
}
