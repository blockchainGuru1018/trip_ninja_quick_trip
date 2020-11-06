import CurrencyList from '../assets/data/currencies.json';

export function currencySymbol(currency: string) {
  const currencyObject = CurrencyList.find(o => Object.entries(o).some(([k, value]) => k === 'code' && value === currency));
  return currencyObject?.symbol;
}

export function formatPrice(price: number, currency: string){
  return `${currencySymbol(currency)}${price.toFixed()} ${currency}`;
}
