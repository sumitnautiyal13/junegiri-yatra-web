'use client';

import { useEffect } from 'react';

/**
 * Sets up a global IntersectionObserver that adds class 'v' (visible)
 * to every element with class 'fade-in', 'fade-in-left', or 'fade-in-right'
 * when it enters the viewport.
 *
 * Also fires once on mount to reveal anything already in view.
 */
export default function ScrollReveal() {
  useEffect(() => {
    const selectors = '.fade-in, .fade-in-left, .fade-in-right';

    const reveal = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('v');
          observer.unobserve(entry.target); // only trigger once
        }
      });
    };

    const observer = new IntersectionObserver(reveal, {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px',
    });

    // Observe all existing fade elements
    const attach = () => {
      document.querySelectorAll<HTMLElement>(selectors).forEach((el) => {
        // If already in view on load, add immediately
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('v');
        } else {
          observer.observe(el);
        }
      });
    };

    attach();

    // Re-attach after soft navigations (Next.js route changes swap DOM)
    const mutationObserver = new MutationObserver(() => {
      document.querySelectorAll<HTMLElement>(`${selectors}:not(.v)`).forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add('v');
        } else {
          observer.observe(el);
        }
      });
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
