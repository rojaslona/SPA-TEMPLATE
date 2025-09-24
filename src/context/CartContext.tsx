import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { CartItem, Product, Service } from '../types';

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Product | Service, type: 'product' | 'service', quantity?: number, selectedDate?: Date, selectedTime?: string) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('spa-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('spa-cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (
    item: Product | Service, 
    type: 'product' | 'service', 
    quantity: number = 1,
    selectedDate?: Date,
    selectedTime?: string
  ) => {
    const existingItemIndex = items.findIndex(cartItem => cartItem.id === item.id);
    
    if (existingItemIndex > -1) {
      // Update quantity if item already exists
      const updatedItems = [...items];
      updatedItems[existingItemIndex].quantity += quantity;
      setItems(updatedItems);
    } else {
      // Add new item to cart
      const newCartItem: CartItem = {
        id: item.id,
        type,
        item,
        quantity,
        selectedDate,
        selectedTime
      };
      setItems([...items, newCartItem]);
    }
  };

  const removeFromCart = (itemId: string) => {
    setItems(items.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setItems(items.map(item => 
      item.id === itemId ? { ...item, quantity } : item
    ));
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + (item.item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalPrice,
      getTotalItems
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};