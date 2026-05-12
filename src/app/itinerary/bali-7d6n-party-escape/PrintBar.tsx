'use client';

export default function PrintBar() {
  return (
    <div className="print-btn-wrap">
      <button className="print-btn" onClick={() => window.print()}>
        🖨️ Save as PDF
      </button>
      <a
        href="https://wa.me/919873897652?text=Namaste!%20I%20want%20to%20book%20the%20Bali%207D6N%20package%20(23-29%20May)"
        className="wa-btn"
        target="_blank"
        rel="noopener noreferrer"
      >
        💬 Book on WhatsApp
      </a>
    </div>
  );
}
