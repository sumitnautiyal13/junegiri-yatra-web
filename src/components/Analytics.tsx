'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

/* User-agent tokens that identify bots, crawlers, headless browsers,
   monitoring/preview services and scripted HTTP clients. These are the
   automated visitors (largely from cloud datacenters) that were inflating
   GA4 / Meta Pixel — GA4's built-in "known bots" filter does NOT catch
   headless Chrome from a datacenter, so we gate the trackers ourselves. */
const BOT_UA =
  /bot|crawl|spider|slurp|headless|phantom|puppeteer|playwright|selenium|lighthouse|chrome-lighthouse|pagespeed|gtmetrix|pingdom|uptime|statuscake|datadog|newrelic|prerender|scrapy|python-requests|python-urllib|aiohttp|httpx|axios|node-fetch|go-http-client|okhttp|java\/|curl\/|wget|libwww|apache-httpclient|facebookexternalhit|whatsapp|telegrambot|bingpreview|gptbot|chatgpt-user|ccbot|claudebot|anthropic-ai|perplexitybot|google-extended|applebot|yandexbot|ahrefsbot|semrushbot|mj12bot|dotbot|petalbot|bytespider/i;

function isAutomated(): boolean {
  if (typeof navigator === 'undefined') return true;

  // Selenium / Puppeteer / Playwright set this flag on the browser.
  if (navigator.webdriver) return true;

  const ua = navigator.userAgent || '';
  if (!ua) return true;
  if (BOT_UA.test(ua)) return true;

  // Headless Chrome signatures that automation tools often forget to mask.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any;
  if (w.__nightmare || w._phantom || w.callPhantom) return true;

  return false;
}

/**
 * Loads Google Analytics (GA4) and the Meta Pixel ONLY for real human
 * browsers. Bots / headless / monitoring traffic get no tags fired, so they
 * never appear in GA4 or Meta reporting.
 */
export default function Analytics() {
  const [allow, setAllow] = useState(false);

  useEffect(() => {
    if (!isAutomated()) setAllow(true);
  }, []);

  if (!allow) return null;

  return (
    <>
      {/* Google Analytics (GA4) */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-P2BY0PVTXW"
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-P2BY0PVTXW');`}
      </Script>

      {/* Meta Pixel */}
      <Script id="meta-pixel" strategy="lazyOnload">
        {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','808349899505470');fbq('track','PageView');`}
      </Script>
    </>
  );
}
