import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import bestTimeData from '../../../../data/best-time.json';
import BestTimePage from './BestTimePage';
import type { BestTimeDestination } from './BestTimePage';

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
  return <BestTimePage destination={item} />;
}
