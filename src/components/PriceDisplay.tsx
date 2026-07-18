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
  /** Quote this package in USD only, for every visitor including INR.
   *  For outbound international packages the supplier quotes in USD, so an
   *  INR figure would be a stale conversion rather than the real price.
   *  Requires usdIntlPrice; falls back to normal behaviour without it. */
  usdOnly?: boolean;
}

export default function PriceDisplay({
  inrPrice,
  usdIntlPrice,
  className = '',
  suffix = '/person',
  usdOnly = false,
}: PriceDisplayProps) {
  const { currency } = useCurrency();
  const priceStr =
    usdOnly && usdIntlPrice && usdIntlPrice > 0
      ? '$' + usdIntlPrice.toLocaleString('en-US')
      : formatPrice(inrPrice, currency, usdIntlPrice);

  return (
    <span className={className}>
      <span className="price-primary">{priceStr}</span>
      {suffix && <span className="price-suffix">{suffix}</span>}
    </span>
  );
}
