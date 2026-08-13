import { trekFromUrls, renderUrlset, XML_HEADERS } from '@/lib/sitemapUrls';

export const dynamic = 'force-static';

export function GET() {
  return new Response(renderUrlset(trekFromUrls()), { headers: XML_HEADERS });
}
