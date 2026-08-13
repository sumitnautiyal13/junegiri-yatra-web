import { contentUrls, renderUrlset, XML_HEADERS } from '@/lib/sitemapUrls';

export const dynamic = 'force-static';

export function GET() {
  return new Response(renderUrlset(contentUrls()), { headers: XML_HEADERS });
}
