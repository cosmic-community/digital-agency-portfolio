'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Service } from '@/types';
import { CartItem as LibCartItem } from '@/lib/cart';

// Use the CartItem interface from lib/cart to ensure compatibility
export interface CartItem extends LibCartItem {}

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Service }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

interface CartContextType {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  addItem: (service: Service) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  isInCart: (serviceId: string) => boolean;
  getItemQuantity: (serviceId: string) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function parsePrice(priceString: string): number {
  // Remove currency symbols and parse price
  const cleaned = priceString.replace(/[^\d,\.]/g, '');
  return parseFloat(cleaned.replace(',', '')) || 0;
}

function calculateTotal(items: CartItem[]): number {
  return items.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
}

function serviceToCartItem(service: Service): Omit<CartItem, 'quantity'> {
  return {
    id: service.id,
    name: service.metadata.service_name,
    price: parsePrice(service.metadata.starting_price || '0'),
    image: service.metadata.service_icon?.imgix_url,
    service: {
      id: service.id,
      slug: service.slug,
      metadata: {
        service_name: service.metadata.service_name,
        description: service.metadata.description,
        starting_price: service.metadata.starting_price || '0',
        service_icon: service.metadata.service_icon
      }
    }
  };
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return {
          items: updatedItems,
          total: calculateTotal(updatedItems),
          itemCount: updatedItems.reduce((count, item) => count + item.quantity, 0)
        };
      }
      
      const newItem: CartItem = {
        ...serviceToCartItem(action.payload),
        quantity: 1
      };
      
      const newItems = [...state.items, newItem];
      return {
        items: newItems,
        total: calculateTotal(newItems),
        itemCount: newItems.reduce((count, item) => count + item.quantity, 0)
      };
    }
    
    case 'REMOVE_ITEM': {
      const filteredItems = state.items.filter(item => item.id !== action.payload);
      return {
        items: filteredItems,
        total: calculateTotal(filteredItems),
        itemCount: filteredItems.reduce((count, item) => count + item.quantity, 0)
      };
    }
    
    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        const filteredItems = state.items.filter(item => item.id !== action.payload.id);
        return {
          items: filteredItems,
          total: calculateTotal(filteredItems),
          itemCount: filteredItems.reduce((count, item) => count + item.quantity, 0)
        };
      }
      
      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      
      return {
        items: updatedItems,
        total: calculateTotal(updatedItems),
        itemCount: updatedItems.reduce((count, item) => count + item.quantity, 0)
      };
    }
    
    case 'CLEAR_CART':
      return {
        items: [],
        total: 0,
        itemCount: 0
      };
    
    case 'LOAD_CART':
      return {
        items: action.payload,
        total: calculateTotal(action.payload),
        itemCount: action.payload.reduce((count, item) => count + item.quantity, 0)
      };
    
    default:
      return state;
  }
}

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: parsedCart });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (service: Service) => {
    dispatch({ type: 'ADD_ITEM', payload: service });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const isInCart = (serviceId: string): boolean => {
    return state.items.some(item => item.id === serviceId);
  };

  const getItemQuantity = (serviceId: string): number => {
    const item = state.items.find(item => item.id === serviceId);
    return item ? item.quantity : 0;
  };

  return (
    <CartContext.Provider
      value={{
        state,
        dispatch,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        isInCart,
        getItemQuantity
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}