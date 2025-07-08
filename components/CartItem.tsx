'use client';

import { useCart } from '@/hooks/useCart';
import { CartItem as CartItemType } from '@/contexts/CartContext';
import { formatPrice, getItemPrice, getItemTotal } from '@/lib/cart';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { removeItem, updateQuantity } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(item.id);
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  const itemPrice = getItemPrice(item);
  const itemTotal = getItemTotal(item);

  return (
    <div className="flex items-center space-x-4 py-4 border-b border-gray-200 dark:border-gray-700">
      {/* Service Icon */}
      <div className="flex-shrink-0">
        {item.service.metadata.service_icon ? (
          <img
            src={`${item.service.metadata.service_icon.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
            alt={item.service.metadata.service_name}
            className="w-16 h-16 object-cover rounded-lg"
            width={80}
            height={80}
          />
        ) : (
          <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M8 6v10a2 2 0 002 2h4a2 2 0 002-2V6" />
            </svg>
          </div>
        )}
      </div>

      {/* Service Details */}
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          <a 
            href={`/services/${item.service.slug}`}
            className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            {item.service.metadata.service_name}
          </a>
        </h3>
        <div 
          className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2"
          dangerouslySetInnerHTML={{ __html: item.service.metadata.description }}
        />
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {formatPrice(itemPrice)} each
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
          aria-label="Decrease quantity"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
          </svg>
        </button>
        
        <span className="w-12 text-center font-medium text-gray-900 dark:text-white">
          {item.quantity}
        </span>
        
        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
          aria-label="Increase quantity"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      {/* Item Total */}
      <div className="text-right">
        <p className="text-lg font-medium text-gray-900 dark:text-white">
          {formatPrice(itemTotal)}
        </p>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => removeItem(item.id)}
        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-200 transition-colors p-1"
        aria-label="Remove item"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
}