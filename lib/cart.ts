interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  service: {
    id: string;
    slug: string;
    metadata: {
      service_name: string;
      description: string;
      starting_price: string;
      service_icon?: {
        imgix_url: string;
      };
    };
  };
}

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
  isOpen: boolean;
}

class CartManager {
  private state: CartState = {
    items: [],
    total: 0,
    itemCount: 0,
    isOpen: false
  };

  private listeners: Array<(state: CartState) => void> = [];

  subscribe(listener: (state: CartState) => void) {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  private notify() {
    this.listeners.forEach(listener => listener(this.state));
  }

  private updateTotals() {
    this.state.total = this.state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    this.state.itemCount = this.state.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  addItem(item: Omit<CartItem, 'quantity'>) {
    const existingItem = this.state.items.find(i => i.id === item.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.state.items.push({ ...item, quantity: 1 });
    }
    
    this.updateTotals();
    this.notify();
  }

  removeItem(id: string) {
    this.state.items = this.state.items.filter(item => item.id !== id);
    this.updateTotals();
    this.notify();
  }

  updateQuantity(id: string, quantity: number) {
    const item = this.state.items.find(i => i.id === id);
    if (item) {
      item.quantity = Math.max(0, quantity);
      if (item.quantity === 0) {
        this.removeItem(id);
      } else {
        this.updateTotals();
        this.notify();
      }
    }
  }

  toggleCart() {
    this.state.isOpen = !this.state.isOpen;
    this.notify();
  }

  setCartOpen(isOpen: boolean) {
    this.state.isOpen = isOpen;
    this.notify();
  }

  clearCart() {
    this.state.items = [];
    this.updateTotals();
    this.notify();
  }

  getState() {
    return { ...this.state };
  }
}

// Utility functions for cart calculations and formatting
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

export const getItemPrice = (item: CartItem): number => {
  if (item.price) {
    return item.price;
  }
  // Fallback to parsing from service metadata
  const priceString = item.service?.metadata?.starting_price || '0';
  return parseFloat(priceString.replace(/[^\d.]/g, '')) || 0;
};

export const getItemTotal = (item: CartItem): number => {
  return getItemPrice(item) * item.quantity;
};

export const calculateCartSubtotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + getItemTotal(item), 0);
};

export const calculateTax = (subtotal: number, taxRate: number = 0.08): number => {
  return subtotal * taxRate;
};

export const calculateCartTotalWithTax = (items: CartItem[], taxRate: number = 0.08): number => {
  const subtotal = calculateCartSubtotal(items);
  const tax = calculateTax(subtotal, taxRate);
  return subtotal + tax;
};

export const cartManager = new CartManager();
export type { CartItem, CartState };