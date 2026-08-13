/**
 * Maps a destination slug to its indexable /best-time/ guide, where one exists.
 *
 * Replaces the old per-month links into /from/{dest}/{city}/{month}/. That layer
 * is `noindex`, absent from the sitemap, and was linked 7x from every destination
 * page — roughly 13,986 crawlable URLs that could never rank, on top of the
 * 13,018 already in the sitemap. Three destinations (dubai, thailand, singapore)
 * were also linking to /from/ URLs that plain 404.
 *
 * Pointing at /best-time/{slug}/ instead keeps the "when should I go" affordance,
 * sends the reader to a page that is genuinely indexable and well-built, and
 * consolidates internal link equity into the guides rather than scattering it
 * across thousands of thin seasonal variants.
 *
 * Destinations with no guide return null and simply render no seasonal section.
 */
const BEST_TIME_GUIDE: Record<string, string> = {
  'kedarnath': 'kedarnath',
  'kedarnath-helicopter': 'kedarnath',
  'badrinath': 'badrinath',
  'char-dham': 'char-dham',
  'char-dham-helicopter': 'char-dham',
  // Do Dham is the Kedarnath + Badrinath subset of the Char Dham circuit;
  // the Char Dham guide covers its season window.
  'do-dham': 'char-dham',
  'valley-of-flowers': 'valley-of-flowers',
  'rishikesh': 'rishikesh',
  'mussoorie': 'mussoorie',
  'nainital': 'nainital',
  'varanasi': 'varanasi',
  'mathura-vrindavan': 'braj-bhoomi',
};

export function bestTimeGuideFor(destinationSlug: string): string | null {
  return BEST_TIME_GUIDE[destinationSlug] ?? null;
}

export function bestTimeGuideHref(destinationSlug: string): string | null {
  const slug = bestTimeGuideFor(destinationSlug);
  return slug ? `/best-time/${slug}/` : null;
}
