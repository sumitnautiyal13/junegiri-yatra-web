'use client';

import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Chooses between the public site chrome (header / footer / floating widgets)
 * and a bare shell for the app surfaces (/admin, /p/) which bring their own.
 *
 * WHY THIS IS A CLIENT COMPONENT — do not "simplify" this back into the layout.
 *
 * The root layout previously decided this by reading `headers()` to sniff the
 * pathname. Calling `headers()` anywhere in the render tree opts that route into
 * dynamic rendering, and because that call lived in the ROOT layout it opted in
 * *every route on the site*. Next.js then emitted
 *
 *     Cache-Control: private, no-cache, no-store, max-age=0, must-revalidate
 *
 * on every response, which overrode the `s-maxage=86400, stale-while-revalidate`
 * header configured in next.config.ts and made `export const revalidate = 86400`
 * on the programmatic routes dead code. Every one of ~13k URLs rendered at the
 * origin on every request (measured cold TTFB 2.2-3.6s, x-vercel-cache: MISS
 * always). The try/catch that used to wrap it did not help: a route is marked
 * dynamic by the *call itself*, before the catch can run.
 *
 * `usePathname()` carries no such penalty, so pages stay static/ISR and cacheable
 * at the edge.
 */
export default function SiteChrome({
  header,
  footer,
  floats,
  children,
}: {
  header: ReactNode;
  footer: ReactNode;
  floats: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname() ?? '';
  const isAppRoute = pathname.startsWith('/admin') || pathname.startsWith('/p/');

  if (isAppRoute) {
    return <>{children}</>;
  }

  return (
    <>
      {header}
      <main>{children}</main>
      {footer}
      {floats}
    </>
  );
}
