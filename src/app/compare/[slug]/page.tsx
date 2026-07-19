import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import comparisonsData from '../../../../data/comparisons.json';
import ComparePage from './ComparePage';
import type { Comparison, RelatedComparison } from './ComparePage';

export function generateStaticParams() {
  return (comparisonsData as Comparison[]).map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const item = (comparisonsData as Comparison[]).find((c) => c.slug === slug);
  if (!item) return {};
  return {
    title: `${item.title} | Junegiri Yatra`,
    description: item.meta_description,
    alternates: { canonical: `https://junegiriyatra.com/compare/${slug}/` },
    openGraph: {
      title: item.title,
      description: item.meta_description,
      images: [{ url: `https://junegiriyatra.com${item.hero_image}` }],
    },
  };
}

/**
 * Related comparisons, derived rather than hand-maintained: two comparisons are
 * related when they feature the same package. Falls back to filling up to
 * MAX_RELATED with other guides so no page is left without outbound links
 * (three comparisons share no package with any other).
 */
const MAX_RELATED = 4;

function getRelated(current: Comparison): RelatedComparison[] {
  const all = comparisonsData as Comparison[];
  const mine = new Set([current.item_a.slug, current.item_b.slug]);

  const shares = (c: Comparison) =>
    mine.has(c.item_a.slug) || mine.has(c.item_b.slug);

  const others = all.filter((c) => c.slug !== current.slug);
  const matched = others.filter(shares);
  const rest = others.filter((c) => !shares(c));

  return [...matched, ...rest]
    .slice(0, MAX_RELATED)
    .map((c) => ({
      slug: c.slug,
      heading: c.h1.replace(/<[^>]+>/g, '').trim(),
      tagline: c.tagline,
      hero_image: c.hero_image,
    }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = (comparisonsData as Comparison[]).find((c) => c.slug === slug);
  if (!item) notFound();
  return <ComparePage comparison={item} related={getRelated(item)} />;
}
