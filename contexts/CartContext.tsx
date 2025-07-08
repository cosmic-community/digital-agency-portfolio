'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Service } from '@/types';

export interface CartItem {
  id: string;
  service: Service;
  quantity: number;
  addedAt: Date;
}

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
    const price = parsePrice(item.service.metadata.starting_price || '0');
    return total + (price * item.quantity);
  }, 0);
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
        id: action.payload.id,
        service: action.payload,
        quantity: 1,
        addedAt: new Date()
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
        const cartItems = parsedCart.map((item: any) => ({
          ...item,
          addedAt: new Date(item.addedAt)
        }));
        dispatch({ type: 'LOAD_CART', payload: cartItems });
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