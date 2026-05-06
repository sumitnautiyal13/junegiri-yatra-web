import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import blogData from '../../../../data/blog-posts.json';
import BlogPostPage from './BlogPostPage';
import type { BlogPost } from './BlogPostPage';

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
  return <BlogPostPage post={post} />;
}
