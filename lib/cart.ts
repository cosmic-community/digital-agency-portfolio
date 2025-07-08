import { CartItem } from '@/contexts/CartContext';

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

export function parsePrice(priceString: string): number {
  // Remove currency symbols and parse price
  const cleaned = priceString.replace(/[^\d,\.]/g, '');
  return parseFloat(cleaned.replace(',', '')) || 0;
}

export function calculateCartTotal(items: CartItem[]): number {
  return items.reduce((total, item) => {
    const price = parsePrice(item.service.metadata.starting_price || '0');
    return total + (price * item.quantity);
  }, 0);
}

export function calculateCartSubtotal(items: CartItem[]): number {
  return calculateCartTotal(items);
}

export function calculateTax(subtotal: number, taxRate: number = 0.08): number {
  return subtotal * taxRate;
}

export function calculateCartTotalWithTax(items: CartItem[], taxRate: number = 0.08): number {
  const subtotal = calculateCartSubtotal(items);
  const tax = calculateTax(subtotal, taxRate);
  return subtotal + tax;
}

export function getItemPrice(item: CartItem): number {
  return parsePrice(item.service.metadata.starting_price || '0');
}

export function getItemTotal(item: CartItem): number {
  return getItemPrice(item) * item.quantity;
}

export function validateCartItem(item: CartItem): boolean {
  return (
    item.id &&
    item.service &&
    item.service.metadata &&
    item.quantity > 0 &&
    item.addedAt instanceof Date
  );
}

export function sanitizeCartItems(items: CartItem[]): CartItem[] {
  return items.filter(validateCartItem);
}