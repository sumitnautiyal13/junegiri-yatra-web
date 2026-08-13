/**
 * Title / meta-description composition with a hard length budget.
 *
 * WHY THIS EXISTS: the programmatic templates interpolated variable-length
 * values — city names run up to 25 chars ("Chhatrapati Sambhajinagar") and
 * `city.total_time` up to 52 ("6–7 hrs by road · 7–8 hrs by train · 2 hrs by
 * flight"). Hand-written templates cannot be checked against that variance, so
 * 55% of sampled titles exceeded 60 chars and 33% of descriptions exceeded 160,
 * the worst at 218. Truncated SERP entries lose exactly the differentiating
 * detail — the price — on pages that already earn impressions.
 *
 * The fix is structural: state the part that must always appear, then offer
 * extras in priority order. Anything that would breach the budget is dropped
 * rather than truncated mid-word by Google.
 *
 * Budgets are character approximations of Google's pixel-based truncation
 * (~580px title, ~920px description). They are deliberately conservative.
 */

export const TITLE_LIMIT = 60;
export const DESCRIPTION_LIMIT = 160;

const tidy = (s: string) => s.replace(/\s+/g, ' ').trim();

/**
 * Returns `base`, plus as many of `extras` (in order) as fit within `limit`.
 * An extra that does not fit is skipped, and later, shorter extras are still
 * considered — so a long optional clause never blocks a short high-value one.
 *
 * `base` is never truncated: if it alone exceeds the budget that is a content
 * problem to fix at the source, not something to silently cut mid-word.
 */
export function fitMeta(limit: number, base: string, extras: string[] = []): string {
  let out = tidy(base);
  for (const raw of extras) {
    const extra = tidy(raw ?? '');
    if (!extra) continue;
    const candidate = `${out} ${extra}`;
    if (candidate.length <= limit) out = candidate;
  }
  return out;
}

/**
 * Programmatic pages deliberately omit the " | Junegiri Yatra" suffix: it cost
 * 17 characters on every page, and on a query like "kedarnath from mumbai" the
 * brand adds nothing a searcher is looking for. Google appends the site name to
 * the SERP entry on its own. Real content pages (blog, compare) keep it.
 */
export function fitTitle(base: string, extras: string[] = []): string {
  return fitMeta(TITLE_LIMIT, base, extras);
}

export function fitDescription(base: string, extras: string[] = []): string {
  return fitMeta(DESCRIPTION_LIMIT, base, extras);
}

/**
 * For descriptions that come from content data (blog posts, packages,
 * comparisons) rather than a template. Those are authored freely and some run
 * to 260+ characters, so Google truncates them at an arbitrary point — often
 * mid-word, and usually after the useful part.
 *
 * Cutting on a word boundary here keeps the snippet under our control. It is a
 * safety net, not a substitute for editing the source copy: anything reaching
 * this function is losing its tail in the SERP either way, and the real fix is
 * to write a tighter description in the data file.
 */
export function clampDescription(text: string, limit: number = DESCRIPTION_LIMIT): string {
  const t = tidy(text);
  if (t.length <= limit) return t;
  const cut = t.slice(0, limit);
  const lastSpace = cut.lastIndexOf(' ');
  const trimmed = lastSpace > limit * 0.6 ? cut.slice(0, lastSpace) : cut;
  return trimmed.replace(/[\s,;:.—–-]+$/, '');
}
