import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { CurrencyProvider } from '@/contexts/CurrencyContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata: Metadata = {
  metadataBase: new URL('https://junegiriyatra.com'),
  title: 'Junegiri Yatra — India Tour Packages | Char Dham, Treks, Golden Triangle',
  description: 'India\'s trusted travel company — Char Dham Yatra, Kedarnath, Himalayan treks, Golden Triangle, Kerala tours. All-inclusive packages from Haridwar. Book via WhatsApp.',
  keywords: 'char dham yatra, kedarnath yatra, india tour packages, golden triangle, himalayan treks, rishikesh adventure, junegiri yatra',
  authors: [{ name: 'Junegiri Yatra' }],
  openGraph: {
    siteName: 'Junegiri Yatra',
    type: 'website',
    locale: 'en_IN',
    images: [{ url: 'https://junegiriyatra.com/logo.png' }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        <CurrencyProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsAppFloat />
          <ScrollReveal />
        </CurrencyProvider>
        {/* Google Analytics (GA4) — afterInteractive avoids render-blocking */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-P2BY0PVTXW"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-P2BY0PVTXW');`}
        </Script>
        {/* Meta Pixel — lazyOnload for non-critical tracking */}
        <Script id="meta-pixel" strategy="lazyOnload">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','808349899505470');fbq('track','PageView');`}
        </Script>
      </body>
    </html>
  );
}
