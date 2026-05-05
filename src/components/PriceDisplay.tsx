'use client';

import { useCurrency } from '@/contexts/CurrencyContext';
import { formatPrice, formatINR } from '@/lib/currency';

interface PriceDisplayProps {
  inrPrice: number;
  usdIntlPrice?: number;
  className?: string;
  showInrRef?: boolean; // show "≈ ₹X,XX,XXX" when in foreign currency
  suffix?: string;
}

export default function PriceDisplay({
  inrPrice,
  usdIntlPrice,
  className = '',
  showInrRef = true,
  suffix = '/person',
}: PriceDisplayProps) {
  const { currency } = useCurrency();
  const priceStr = formatPrice(inrPrice, currency, usdIntlPrice);
  const isForein = currency !== 'INR';

  return (
    <span className={className}>
      <span className="price-primary">{priceStr}</span>
      {suffix && <span className="price-suffix">{suffix}</span>}
      {showInrRef && isForein && (
        <span className="price-inr-ref">≈ ₹{formatINR(inrPrice)}</span>
      )}
    </span>
  );
}
