import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getPackageBySlug } from '@/lib/data';
import trekSeasons from '../../../../../data/trek-seasons.json';
import MonthPage from './MonthPage';
import type { MonthData } from './MonthPage';

interface Props {
  params: Promise<{ slug: string; month: string }>;
}

export async function generateStaticParams() {
  const params: { slug: string; month: string }[] = [];
  for (const [slug, data] of Object.entries(trekSeasons as Record<string, { months: string[] }>)) {
    for (const month of data.months) {
      params.push({ slug, month });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, month } = await params;
  const seasons = trekSeasons as Record<
    string,
    { month_data: Record<string, { title: string; meta_description: string }> }
  >;
  const monthData = seasons[slug]?.month_data?.[month];
  if (!monthData) return {};
  const pkg = getPackageBySlug(slug);
  const heroImage = pkg?.hero_image
    ? `https://junegiriyatra.com${pkg.hero_image}`
    : 'https://junegiriyatra.com/images/trek_himalaya.webp';
  return {
    title: `${monthData.title} | Junegiri Yatra`,
    description: monthData.meta_description,
    alternates: { canonical: `https://junegiriyatra.com/packages/${slug}/${month}/` },
    openGraph: {
      title: `${monthData.title} | Junegiri Yatra`,
      description: monthData.meta_description,
      url: `https://junegiriyatra.com/packages/${slug}/${month}/`,
      images: [{ url: heroImage, width: 1200, height: 630 }],
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug, month } = await params;
  const pkg = getPackageBySlug(slug);
  const seasons = trekSeasons as Record<string, { month_data: Record<string, unknown> }>;
  const monthData = seasons[slug]?.month_data?.[month];
  if (!pkg || !monthData) notFound();
  return <MonthPage pkg={pkg} month={month} monthData={monthData as MonthData} />;
}
