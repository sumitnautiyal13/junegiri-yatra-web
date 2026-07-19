import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import blogData from '../../../../data/blog-posts.json';
import comparisonsData from '../../../../data/comparisons.json';
import bestTimeData from '../../../../data/best-time.json';
import BlogPostPage from './BlogPostPage';
import type { BlogPost, PlanningGuide } from './BlogPostPage';

type ComparisonRow = {
  slug: string; h1: string; tagline: string;
  item_a: { slug: string }; item_b: { slug: string };
};
type BestTimeRow = { slug: string; name: string; package_slug: string; tagline?: string };

/**
 * Blog posts already link to sibling articles and their booking page, but had
 * no route into the comparison or seasonal guides. Derive those from the
 * post's related_package so the link graph closes:
 * blog <-> compare <-> best-time <-> package.
 */
function getPlanningGuides(pkgSlug: string): PlanningGuide[] {
  const out: PlanningGuide[] = [];

  const season = (bestTimeData as BestTimeRow[]).find((d) => d.package_slug === pkgSlug);
  if (season) {
    out.push({
      href: `/best-time/${season.slug}/`,
      title: `Best time to visit ${season.name}`,
      sub: 'Month-by-month weather, crowds and pricing',
    });
  }

  (comparisonsData as ComparisonRow[])
    .filter((c) => c.item_a.slug === pkgSlug || c.item_b.slug === pkgSlug)
    .slice(0, 3)
    .forEach((c) =>
      out.push({
        href: `/compare/${c.slug}/`,
        title: c.h1.replace(/<[^>]+>/g, '').trim(),
        sub: c.tagline,
      }),
    );

  return out;
}

export function generateStaticParams() {
  return (blogData as BlogPost[]).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = (blogData as BlogPost[]).find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} | Junegiri Yatra`,
    description: post.meta_description,
    keywords: post.keywords,
    alternates: { canonical: `https://junegiriyatra.com/blog/${slug}/` },
    openGraph: {
      title: post.title,
      description: post.meta_description,
      images: [{ url: `https://junegiriyatra.com${post.hero_image}` }],
      type: 'article',
      publishedTime: post.published,
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = (blogData as BlogPost[]).find((p) => p.slug === slug);
  if (!post) notFound();
  return <BlogPostPage post={post} planningGuides={getPlanningGuides(post.related_package)} />;
}
