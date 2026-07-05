import Link from 'next/link';
import InstallAppButton from '@/components/InstallAppButton';

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
              Himalayan treks, Rishikesh adventures, and spiritual circuits.
              Trusted by 2,847+ travellers worldwide. Haridwar-based since 2017.
            </p>
          </div>

          <div>
            <h4>Pilgrimages</h4>
            <Link href="/packages/char-dham-yatra-9n-10d/">Char Dham Yatra</Link>
            <Link href="/packages/kedarnath-yatra-3n-4d/">Kedarnath Yatra</Link>
            <Link href="/packages/kedarnath-helicopter-2n-3d/">Kedarnath Helicopter</Link>
            <Link href="/packages/braj-bhoomi-yatra-5n-6d/">Braj Bhoomi Yatra</Link>
            <Link href="/char-dham-from/">Char Dham from Your City</Link>
            <Link href="/kedarnath-from/">Kedarnath from Your City</Link>
            <Link href="/kedarnath-helicopter-from/">Kedarnath Helicopter Tour</Link>
            <Link href="/do-dham-from/">Do Dham from Your City</Link>
            <Link href="/mathura-vrindavan-from/">Mathura Vrindavan Tour</Link>
            <Link href="/ayodhya-from/">Ayodhya Tour</Link>
            <Link href="/varanasi-from/">Varanasi from Your City</Link>
          </div>

          <div>
            <h4>India Tours</h4>
            <Link href="/india-tour-from/">India Tour Packages</Link>
            <Link href="/golden-triangle-from/">Golden Triangle Tour</Link>
            <Link href="/himalayan-treks/">Himalayan Treks</Link>
            <Link href="/spiti-valley/">Spiti Valley Guide</Link>
            <Link href="/ladakh/">Ladakh Travel Guide</Link>
            <Link href="/packages/rishikesh-adventure-pack-2n-3d/">Rishikesh Adventures</Link>
            <Link href="/packages/kedarkantha-trek-5n-6d/">Kedarkantha Trek</Link>
            <Link href="/packages/valley-of-flowers-trek-4n-5d/">Valley of Flowers</Link>
            <Link href="/packages/hamta-pass-trek-4n-5d/">Hamta Pass Trek</Link>
            <Link href="/packages/triund-trek-1n-2d/">Triund Trek</Link>
            <Link href="/packages/bhrigu-lake-trek-3n-4d/">Bhrigu Lake Trek</Link>
            <Link href="/packages/kareri-lake-trek-3n-4d/">Kareri Lake Trek</Link>
            <Link href="/packages/beas-kund-trek-2n-3d/">Beas Kund Trek</Link>
            <Link href="/packages/indrahar-pass-trek-3n-4d/">Indrahar Pass Trek</Link>
            <Link href="/packages/chandrakhani-pass-trek-3n-4d/">Chandrakhani Pass Trek</Link>
            <Link href="/packages/rupin-pass-trek-8n-9d/">Rupin Pass Trek</Link>
            <Link href="/packages/kanamo-peak-5n-6d/">Kanamo Peak</Link>
            <Link href="/packages/pin-parvati-pass-10n-11d/">Pin Parvati Pass</Link>
            <Link href="/yoga/">Yoga Teacher Training</Link>
            <Link href="/bali-from/">Bali Tour Packages</Link>
            <Link href="/thailand-from/">Thailand Tour Packages</Link>
            <Link href="/dubai-from/">Dubai Tour Packages</Link>
            <Link href="/singapore-from/">Singapore Tour Packages</Link>
            <Link href="/rishikesh-from/">Rishikesh from Your City</Link>
            <Link href="/valley-of-flowers-from/">Valley of Flowers from Your City</Link>
            <Link href="/badrinath-from/">Badrinath from Your City</Link>
          </div>

          <div>
            <h4>Resources</h4>
            <Link href="/blog/">Travel Blog</Link>
            <Link href="/best-time/kedarnath/">Best Time for Kedarnath</Link>
            <Link href="/best-time/valley-of-flowers/">Best Time for Valley of Flowers</Link>
            <Link href="/best-time/hamta-pass-trek/">Best Time for Hamta Pass</Link>
            <Link href="/best-time/triund-trek/">Best Time for Triund Trek</Link>
            <Link href="/blog/kedarkantha-trek-beginners-guide/">Kedarkantha Trek Guide</Link>
            <Link href="/blog/char-dham-yatra-packing-list/">Char Dham Packing List</Link>
            <Link href="/blog/altitude-sickness-prevention-himalaya/">Altitude Sickness Guide</Link>
            <Link href="/compare/do-dham-vs-char-dham/">Do Dham vs Char Dham</Link>
            <Link href="/compare/kedarnath-trek-vs-helicopter/">Trek vs Helicopter</Link>
            <Link href="/compare/mussoorie-vs-nainital/">Mussoorie vs Nainital</Link>
            <Link href="/compare/hamta-pass-vs-kedarkantha/">Hamta Pass vs Kedarkantha</Link>
            <Link href="/reviews/">Guest Reviews</Link>
          </div>

          <div>
            <h4>Company</h4>
            <Link href="/about/">About Junegiri Yatra</Link>
            <Link href="/contact/">Contact Us</Link>
            <Link href="/payment/">Payment & Bank Details</Link>
            <Link href="/reviews/">Reviews & Testimonials</Link>
            <a href="tel:+919873897652">+91 98738 97652</a>
            <a href="mailto:info@junegiriyatra.com">info@junegiriyatra.com</a>
            <a href="https://wa.me/919873897652" target="_blank" rel="noopener noreferrer">WhatsApp Us</a>
            <a href="https://www.instagram.com/junegiriyatra" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://www.facebook.com/junegiriyatra" target="_blank" rel="noopener noreferrer">Facebook</a>
            <InstallAppButton />
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Junegiri Yatra · Haridwar, Uttarakhand, India</span>
          <span>·</span>
          <span>ATOI Approved · GST Registered</span>
          <span>·</span>
          <Link href="/about/" style={{ color: 'inherit', textDecoration: 'none' }}>About</Link>
          <span>·</span>
          <Link href="/contact/" style={{ color: 'inherit', textDecoration: 'none' }}>Contact</Link>
          <span>·</span>
          <Link href="/payment/" style={{ color: 'inherit', textDecoration: 'none' }}>Payment</Link>
          <span>·</span>
          <Link href="/privacy/" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</Link>
          <span>·</span>
          <Link href="/image-credits/" style={{ color: 'inherit', textDecoration: 'none' }}>Image Credits</Link>
        </div>
      </div>
    </footer>
  );
}
