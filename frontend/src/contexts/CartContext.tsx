import { createContext, useContext, useState, ReactNode } from 'react';

export interface CartItem {
  projectId: string;
  projectName: string;
  credits: number;
  pricePerCredit: number;
  totalPrice: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (projectId: string) => void;
  updateQuantity: (projectId: string, credits: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setItems(prev => {
      const existing = prev.find(i => i.projectId === item.projectId);
      if (existing) {
        return prev.map(i =>
          i.projectId === item.projectId
            ? { ...i, credits: i.credits + item.credits, totalPrice: (i.credits + item.credits) * i.pricePerCredit }
            : i
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (projectId: string) => {
    setItems(prev => prev.filter(i => i.projectId !== projectId));
  };

  const updateQuantity = (projectId: string, credits: number) => {
    setItems(prev =>
      prev.map(i =>
        i.projectId === projectId
          ? { ...i, credits, totalPrice: credits * i.pricePerCredit }
          : i
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.credits, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
