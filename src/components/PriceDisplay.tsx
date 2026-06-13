'use client';

import { useCurrency } from '@/contexts/CurrencyContext';
import { formatPrice } from '@/lib/currency';

interface PriceDisplayProps {
  inrPrice: number;
  usdIntlPrice?: number;
  className?: string;
  /** @deprecated The INR conversion reference is no longer shown — prices
   *  display in the selected currency only. Kept for call-site compatibility. */
  showInrRef?: boolean;
  suffix?: string;
}

export default function PriceDisplay({
  inrPrice,
  usdIntlPrice,
  className = '',
  suffix = '/person',
}: PriceDisplayProps) {
  const { currency } = useCurrency();
  const priceStr = formatPrice(inrPrice, currency, usdIntlPrice);

  return (
    <span className={className}>
      <span className="price-primary">{priceStr}</span>
      {suffix && <span className="price-suffix">{suffix}</span>}
    </span>
  );
}
