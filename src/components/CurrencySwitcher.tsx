'use client';

import { useCurrency } from '@/contexts/CurrencyContext';
import type { Currency } from '@/types';
import { CURRENCY_LABELS } from '@/lib/currency';

const CURRENCIES: Currency[] = ['INR', 'USD', 'GBP', 'EUR', 'AUD', 'CAD', 'AED', 'SGD'];

export default function CurrencySwitcher() {
  const { currency, setCurrency } = useCurrency();

  return (
    <div className="currency-switcher">
      💵{' '}
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value as Currency)}
        aria-label="Select currency"
      >
        {CURRENCIES.map((c) => (
          <option key={c} value={c}>
            {CURRENCY_LABELS[c]}
          </option>
        ))}
      </select>
    </div>
  );
}
