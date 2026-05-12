import Image from 'next/image';

interface HeroSectionProps {
  /** Absolute path to the hero image, e.g. /images/kedarnath_temple_cover.webp */
  image: string;
  /** Optional minimum height, default '70vh' */
  minHeight?: string;
  /** Content rendered on top of the hero image */
  children: React.ReactNode;
  /** Extra class names on the outer <section> */
  className?: string;
}

/**
 * HeroSection — replaces CSS background-image with next/image fill+priority.
 * This moves the hero image into the <head> preload chain, dramatically
 * improving Largest Contentful Paint (LCP) — the most impactful Core Web
 * Vitals change possible for image-heavy pages.
 */
export default function HeroSection({
  image,
  minHeight = '70vh',
  children,
  className = '',
}: HeroSectionProps) {
  return (
    <section
      className={`city-hero${className ? ` ${className}` : ''}`}
      style={{ minHeight }}
    >
      <Image
        src={image}
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        style={{ objectFit: 'cover', objectPosition: 'center top' }}
      />
      <div className="city-hero-overlay" />
      {children}
    </section>
  );
}
