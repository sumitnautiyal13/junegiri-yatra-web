'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Currency } from '@/types';
import { detectCurrencyFromLocale } from '@/lib/currency';

interface CurrencyContextValue {
  currency: Currency;
  setCurrency: (c: Currency) => void;
}

const CurrencyContext = createContext<CurrencyContextValue>({
  currency: 'INR',
  setCurrency: () => {},
});

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>('INR');

  useEffect(() => {
    // Check localStorage first (user preference)
    const saved = localStorage.getItem('jy_currency') as Currency | null;
    if (saved && ['INR','USD','GBP','EUR','AUD','CAD','AED','SGD'].includes(saved)) {
      setCurrencyState(saved);
      return;
    }
    // Detect from browser locale
    const detected = detectCurrencyFromLocale(navigator.language || 'en-IN');
    setCurrencyState(detected);
  }, []);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem('jy_currency', c);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
