'use client';

import { useCart } from '@/hooks/useCart';
import { formatPrice, calculateCartSubtotal, calculateTax, calculateCartTotalWithTax } from '@/lib/cart';

interface CartSummaryProps {
  showCheckoutButton?: boolean;
  className?: string;
}

export default function CartSummary({ 
  showCheckoutButton = true,
  className = ''
}: CartSummaryProps) {
  const { state } = useCart();

  if (state.items.length === 0) {
    return null;
  }

  const subtotal = calculateCartSubtotal(state.items);
  const tax = calculateTax(subtotal);
  const total = calculateCartTotalWithTax(state.items);

  return (
    <div className={`bg-gray-50 dark:bg-gray-900 rounded-lg p-6 ${className}`}>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
        Order Summary
      </h3>

      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
          <span>Subtotal ({state.itemCount} items)</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
          <span>Tax (8%)</span>
          <span>{formatPrice(tax)}</span>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
          <div className="flex justify-between text-lg font-medium text-gray-900 dark:text-white">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
      </div>

      {showCheckoutButton && (
        <div className="mt-6 space-y-3">
          <a
            href="/checkout"
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors text-center block"
          >
            Proceed to Checkout
          </a>
          
          <a
            href="/services"
            className="w-full bg-gray-200 text-gray-900 py-3 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors text-center block dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          >
            Continue Shopping
          </a>
        </div>
      )}
    </div>
  );
}