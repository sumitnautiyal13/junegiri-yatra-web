import {
  BASE, contentUrls, destFromUrls, trekFromUrls,
  newestLastmod, renderSitemapIndex, XML_HEADERS,
} from '@/lib/sitemapUrls';

export const dynamic = 'force-static';

// The sitemap INDEX. robots.txt advertises this exact URL and Google already
// has it on file, so it must keep working — see the note in src/lib/sitemapUrls.ts
// about why Next's generateSitemaps() was not used.
export function GET() {
  const body = renderSitemapIndex([
    { loc: `${BASE}/sitemap-content.xml`,   lastmod: newestLastmod(contentUrls()) },
    { loc: `${BASE}/sitemap-dest-from.xml`, lastmod: newestLastmod(destFromUrls()) },
    { loc: `${BASE}/sitemap-trek-from.xml`, lastmod: newestLastmod(trekFromUrls()) },
  ]);
  return new Response(body, { headers: XML_HEADERS });
}
