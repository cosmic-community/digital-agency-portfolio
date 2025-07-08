'use client';

import { useCart as useCartContext } from '@/contexts/CartContext';

export const useCart = () => {
  return useCartContext();
};