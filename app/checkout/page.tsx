'use client';

import CheckoutForm from '@/components/CheckoutForm';
import { useCart } from '@/hooks/useCart';

export default function CheckoutPage() {
  const { state } = useCart();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Checkout
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <CheckoutForm />
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Order Summary
                </h3>
                <div className="space-y-3">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <div className="flex-1">
                        <p className="text-gray-900 dark:text-white font-medium">
                          {item.service.metadata.service_name}
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {item.service.metadata.starting_price}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}