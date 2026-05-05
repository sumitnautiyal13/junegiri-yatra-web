import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">Junegiri Yatra</div>
            <p className="footer-tagline">Shraddha Ka Safar, Vishwas Ka Saathi</p>
            <p className="footer-desc">
              India&apos;s complete travel platform — from sacred Char Dham Yatra to Golden Triangle,
              Kerala backwaters, Rajasthan palaces, Himalayan treks and more.
              Trusted by 2,847+ travelers worldwide.
            </p>
          </div>
          <div>
            <h4>Top Tours</h4>
            <Link href="/packages/char-dham-yatra/">Char Dham Yatra</Link>
            <Link href="/packages/golden-triangle/">Golden Triangle</Link>
            <Link href="/packages/taj-mahal-tours/">Taj Mahal Tours</Link>
            <Link href="/packages/kerala-tours/">Kerala Tours</Link>
            <Link href="/packages/rajasthan-tours/">Rajasthan Tours</Link>
            <Link href="/packages/goa-packages/">Goa Packages</Link>
          </div>
          <div>
            <h4>Experiences</h4>
            <Link href="/packages/himalayan-treks/">Himalayan Treks</Link>
            <Link href="/packages/rishikesh-adventures/">Rishikesh Adventures</Link>
            <Link href="/packages/spiritual-tours/">Spiritual Tours</Link>
            <Link href="/packages/wildlife-safari/">Wildlife Safari</Link>
            <Link href="/packages/wellness-retreats/">Wellness Retreats</Link>
            <Link href="/blog/">Travel Blog</Link>
          </div>
          <div>
            <h4>Contact</h4>
            <a href="tel:+919873897652">+91 98738 97652</a>
            <a href="mailto:info@junegiriyatra.com">info@junegiriyatra.com</a>
            <a href="https://instagram.com/junegiriyatra" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://wa.me/919873897652" target="_blank" rel="noopener noreferrer">WhatsApp Us</a>
            <Link href="/about/">About Us</Link>
          </div>
        </div>
        <div className="footer-bottom">
          © 2026 Junegiri Yatra · India Tour Operator · Haridwar, Uttarakhand · ATOI Approved · GST Registered
        </div>
      </div>
    </footer>
  );
}
