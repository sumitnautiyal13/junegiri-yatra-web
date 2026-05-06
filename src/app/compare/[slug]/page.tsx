import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import comparisonsData from '../../../../data/comparisons.json';
import ComparePage from './ComparePage';
import type { Comparison } from './ComparePage';

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

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = (comparisonsData as Comparison[]).find((c) => c.slug === slug);
  if (!item) notFound();
  return <ComparePage comparison={item} />;
}
