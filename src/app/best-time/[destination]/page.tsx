import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import bestTimeData from '../../../../data/best-time.json';
import comparisonsData from '../../../../data/comparisons.json';
import BestTimePage from './BestTimePage';
import type { BestTimeDestination, RelatedGuide } from './BestTimePage';

type ComparisonRow = {
  slug: string;
  h1: string;
  tagline: string;
  item_a: { slug: string };
  item_b: { slug: string };
};

/**
 * Cross-link each best-time guide to the comparison guides that feature the
 * same package, so seasonal-intent traffic can reach the higher-converting
 * comparison format instead of dead-ending on the package CTA.
 */
function getRelatedComparisons(pkgSlug: string): RelatedGuide[] {
  return (comparisonsData as ComparisonRow[])
    .filter((c) => c.item_a.slug === pkgSlug || c.item_b.slug === pkgSlug)
    .slice(0, 3)
    .map((c) => ({
      href: `/compare/${c.slug}/`,
      title: c.h1.replace(/<[^>]+>/g, '').trim(),
      sub: c.tagline,
    }));
}

export function generateStaticParams() {
  return (bestTimeData as BestTimeDestination[]).map((d) => ({ destination: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ destination: string }> }): Promise<Metadata> {
  const { destination } = await params;
  const item = (bestTimeData as BestTimeDestination[]).find((d) => d.slug === destination);
  if (!item) return {};
  return {
    title: `${item.title} | Junegiri Yatra`,
    description: item.meta_description,
    alternates: { canonical: `https://junegiriyatra.com/best-time/${destination}/` },
    openGraph: {
      title: `${item.title} | Junegiri Yatra`,
      description: item.meta_description,
      url: `https://junegiriyatra.com/best-time/${destination}/`,
      images: [{ url: `https://junegiriyatra.com/images/mountains1.webp`, width: 1200, height: 630 }],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ destination: string }> }) {
  const { destination } = await params;
  const item = (bestTimeData as BestTimeDestination[]).find((d) => d.slug === destination);
  if (!item) notFound();
  return (
    <BestTimePage
      destination={item}
      relatedComparisons={getRelatedComparisons(item.package_slug)}
    />
  );
}
