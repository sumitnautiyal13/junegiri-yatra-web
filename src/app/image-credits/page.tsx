import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Image Credits | Junegiri Yatra',
  description: 'Attribution and licensing for photographs used on junegiriyatra.com.',
  alternates: { canonical: 'https://junegiriyatra.com/image-credits/' },
};

export default function ImageCreditsPage() {
  return (
    <main className="container" style={{ maxWidth: 860, padding: '56px 24px 80px' }}>
      <h1 style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '2.2rem', fontWeight: 800, color: 'var(--heading)', marginBottom: 12 }}>
        Image Credits
      </h1>
      <p style={{ color: 'var(--muted)', lineHeight: 1.7, marginBottom: 28 }}>
        Several photographs on this site are sourced from{' '}
        <a href="https://commons.wikimedia.org/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold2)', fontWeight: 600 }}>Wikimedia Commons</a>{' '}
        and used under their respective Creative Commons licences, with attribution below. All other images are
        owned or licensed by Junegiri Yatra.
      </p>
      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <li className="ic-row">
            <span className="ic-pkg">Bali, Nusa Penida &amp; Gili 7D/6N</span>
            <span className="ic-meta">“Sunset, Kuta, Bali, Indonesia, 20220825 1755 0879.jpg” by Jakub Hałun · <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a> · <a href="https://commons.wikimedia.org/wiki/File:Sunset,_Kuta,_Bali,_Indonesia,_20220825_1755_0879.jpg" target="_blank" rel="noopener noreferrer">source</a></span>
          </li>
          <li className="ic-row">
            <span className="ic-pkg">Triund Trek 1N/2D</span>
            <span className="ic-meta">“Triund (22356802630).jpg” by Ashish Gupta from Noida, India · <a href="https://creativecommons.org/licenses/by/2.0/" target="_blank" rel="noopener noreferrer">CC BY 2.0</a> · <a href="https://commons.wikimedia.org/wiki/File:Triund_(22356802630).jpg" target="_blank" rel="noopener noreferrer">source</a></span>
          </li>
          <li className="ic-row">
            <span className="ic-pkg">Bhrigu Lake Trek 3N/4D</span>
            <span className="ic-meta">“Bhrigu Lake by Ahmad Faiz Mustafa (2).jpg” by In Transit · <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">CC BY 4.0</a> · <a href="https://commons.wikimedia.org/wiki/File:Bhrigu_Lake_by_Ahmad_Faiz_Mustafa_(2).jpg" target="_blank" rel="noopener noreferrer">source</a></span>
          </li>
          <li className="ic-row">
            <span className="ic-pkg">Kareri Lake Trek 3N/4D</span>
            <span className="ic-meta">“Shiva Temple at Kareri Lake.jpg” by Tanvi.sharmaaa · <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">CC BY 4.0</a> · <a href="https://commons.wikimedia.org/wiki/File:Shiva_Temple_at_Kareri_Lake.jpg" target="_blank" rel="noopener noreferrer">source</a></span>
          </li>
          <li className="ic-row">
            <span className="ic-pkg">Beas Kund Trek 2N/3D</span>
            <span className="ic-meta">“Beas River at Nehru Kund, Manali (2).jpg” by In Transit · <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">CC BY 4.0</a> · <a href="https://commons.wikimedia.org/wiki/File:Beas_River_at_Nehru_Kund,_Manali_(2).jpg" target="_blank" rel="noopener noreferrer">source</a></span>
          </li>
          <li className="ic-row">
            <span className="ic-pkg">Indrahar Pass Trek 3N/4D</span>
            <span className="ic-meta">“Dhauladhar Range (indrahar pass) view from snow line point.jpg” by Vivek machra · <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a> · <a href="https://commons.wikimedia.org/wiki/File:Dhauladhar_Range_(indrahar_pass)_view_from_snow_line_point.jpg" target="_blank" rel="noopener noreferrer">source</a></span>
          </li>
          <li className="ic-row">
            <span className="ic-pkg">Chandrakhani Pass Trek 3N/4D</span>
            <span className="ic-meta">“Chandrakhani pass 1, himachal pradesh.jpg” by Premdasan · <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a> · <a href="https://commons.wikimedia.org/wiki/File:Chandrakhani_pass_1,_himachal_pradesh.jpg" target="_blank" rel="noopener noreferrer">source</a></span>
          </li>
          <li className="ic-row">
            <span className="ic-pkg">Rupin Pass Trek 8N/9D</span>
            <span className="ic-meta">“Ratipheri campsite - Rupin Pass.jpg” by Nikitaparwani · <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a> · <a href="https://commons.wikimedia.org/wiki/File:Ratipheri_campsite_-_Rupin_Pass.jpg" target="_blank" rel="noopener noreferrer">source</a></span>
          </li>
          <li className="ic-row">
            <span className="ic-pkg">Kanamo Peak Trek 5N/6D</span>
            <span className="ic-meta">“Kanamo Peak South Kibber Spiti Jun18 D72 7534.jpg” by This Photo was taken by Timothy A. Gonsalves.  Feel free to  · <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a> · <a href="https://commons.wikimedia.org/wiki/File:Kanamo_Peak_South_Kibber_Spiti_Jun18_D72_7534.jpg" target="_blank" rel="noopener noreferrer">source</a></span>
          </li>
          <li className="ic-row">
            <span className="ic-pkg">Pin Parvati Pass Trek 10N/11D</span>
            <span className="ic-meta">“Mudh Towering Range Pin Spiti Himachal Jun18 D72 7095.jpg” by This Photo was taken by Timothy A. Gonsalves.  Feel free to  · <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a> · <a href="https://commons.wikimedia.org/wiki/File:Mudh_Towering_Range_Pin_Spiti_Himachal_Jun18_D72_7095.jpg" target="_blank" rel="noopener noreferrer">source</a></span>
          </li>
          <li className="ic-row">
            <span className="ic-pkg">Dayara Bugyal Trek 4N/5D</span>
            <span className="ic-meta">“En route to Dayara Bugyal at Gui camp 03.jpg” by Satdeep Gill · <a href="https://creativecommons.org/licenses/by-sa/4.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 4.0</a> · <a href="https://commons.wikimedia.org/wiki/File:En_route_to_Dayara_Bugyal_at_Gui_camp_03.jpg" target="_blank" rel="noopener noreferrer">source</a></span>
          </li>
      </ul>
      <style>{`
        .ic-row { display: flex; flex-direction: column; gap: 3px; padding-bottom: 12px; border-bottom: 1px solid var(--border); }
        .ic-pkg { font-weight: 700; color: var(--heading); font-size: 0.98rem; }
        .ic-meta { font-size: 0.86rem; color: var(--muted); line-height: 1.5; }
        .ic-meta a { color: var(--gold2); }
      `}</style>
    </main>
  );
}
