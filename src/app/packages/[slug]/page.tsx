import type { Metadata } from 'next';
import { clampDescription, fitTitle } from '@/lib/seoMeta';
import { notFound } from 'next/navigation';
import { getAllPackageSlugs, getPackageBySlug, getAllHubSlugs, getHubBySlug } from '@/lib/data';
import PackageDetailPage from './PackageDetailPage';
import HubPage from './HubPage';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const packageSlugs = getAllPackageSlugs().map((slug) => ({ slug }));
  const hubSlugs = getAllHubSlugs().map((slug) => ({ slug }));
  return [...packageSlugs, ...hubSlugs];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pkg = getPackageBySlug(slug);
  const hub = getHubBySlug(slug);
  const item = pkg || hub;
  if (!item) return {};

  return {
    // Hubs carry `name`, packages carry `title`. Before this fallback existed the
    // template interpolated `undefined`, and four indexable hub pages shipped with
    // the literal title "undefined | Junegiri Yatra" — including
    // /packages/char-dham-yatra/, which llms.txt links to.
    // Brand suffix is offered as an extra, so fitTitle appends it only when there is
    // room — short hub titles get it, long package titles do not.
    title: fitTitle(item.title ?? item.name ?? '', ['| Junegiri Yatra']),
    description: clampDescription(item.meta_description),
    keywords: item.keywords,
    alternates: {
      canonical: `https://junegiriyatra.com/packages/${slug}/`,
    },
    openGraph: {
      title: `${item.title ?? item.name ?? ''} | Junegiri Yatra`,
      description: item.meta_description,
      url: `https://junegiriyatra.com/packages/${slug}/`,
      images: [{ url: item.hero_image }],
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;

  const pkg = getPackageBySlug(slug);
  if (pkg) return <PackageDetailPage pkg={pkg} />;

  const hub = getHubBySlug(slug);
  if (hub) return <HubPage hub={hub} />;

  notFound();
}
