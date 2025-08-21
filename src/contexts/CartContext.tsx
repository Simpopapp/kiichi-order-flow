import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem, RodizioSystem, RodizioItem } from '@/types/order';

interface CartContextType {
  items: CartItem[];
  rodizioSystems: RodizioSystem[];
  addItem: (item: Omit<CartItem, 'id' | 'quantity'>) => void;
  addRodizioSystem: (type: 'jantar' | 'almoco') => void;
  addRodizioItem: (rodizioId: string, item: RodizioItem) => void;
  removeRodizioItem: (rodizioId: string, itemName: string, categoryName: string) => void;
  removeItem: (id: string) => void;
  removeRodizioSystem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateRodizioQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [rodizioSystems, setRodizioSystems] = useState<RodizioSystem[]>([]);

  const addItem = (newItem: Omit<CartItem, 'id' | 'quantity'>) => {
    setItems(currentItems => {
      const existingItemIndex = currentItems.findIndex(
        item => item.name === newItem.name && item.categoryName === newItem.categoryName
      );
      
      if (existingItemIndex >= 0) {
        const updatedItems = [...currentItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        const id = `${newItem.name}-${newItem.categoryName}-${Date.now()}`;
        return [...currentItems, { ...newItem, id, quantity: 1 }];
      }
    });
  };

  const addRodizioSystem = (type: 'jantar' | 'almoco') => {
    const price = type === 'jantar' ? 189.00 : 119.99;
    const id = `rodizio-${type}-${Date.now()}`;
    
    setRodizioSystems(currentSystems => {
      const existingSystemIndex = currentSystems.findIndex(system => system.type === type);
      
      if (existingSystemIndex >= 0) {
        const updatedSystems = [...currentSystems];
        updatedSystems[existingSystemIndex].quantity += 1;
        return updatedSystems;
      } else {
        return [...currentSystems, { id, type, price, quantity: 1, selectedItems: [] }];
      }
    });
  };

  const addRodizioItem = (rodizioId: string, item: RodizioItem) => {
    setRodizioSystems(currentSystems =>
      currentSystems.map(system => {
        if (system.id === rodizioId) {
          const existingItemIndex = system.selectedItems.findIndex(
            existingItem => existingItem.name === item.name && existingItem.categoryName === item.categoryName
          );
          
          if (existingItemIndex === -1) {
            return {
              ...system,
              selectedItems: [...system.selectedItems, item]
            };
          }
        }
        return system;
      })
    );
  };

  const removeRodizioItem = (rodizioId: string, itemName: string, categoryName: string) => {
    setRodizioSystems(currentSystems =>
      currentSystems.map(system => {
        if (system.id === rodizioId) {
          return {
            ...system,
            selectedItems: system.selectedItems.filter(
              item => !(item.name === itemName && item.categoryName === categoryName)
            )
          };
        }
        return system;
      })
    );
  };

  const removeItem = (id: string) => {
    setItems(currentItems => currentItems.filter(item => item.id !== id));
  };

  const removeRodizioSystem = (id: string) => {
    setRodizioSystems(currentSystems => currentSystems.filter(system => system.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    
    setItems(currentItems =>
      currentItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const updateRodizioQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeRodizioSystem(id);
      return;
    }
    
    setRodizioSystems(currentSystems =>
      currentSystems.map(system =>
        system.id === id ? { ...system, quantity } : system
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setRodizioSystems([]);
  };

  const getTotalItems = () => {
    const regularItems = items.reduce((total, item) => total + item.quantity, 0);
    const rodizioItems = rodizioSystems.reduce((total, system) => total + system.quantity, 0);
    return regularItems + rodizioItems;
  };

  const getTotalPrice = () => {
    const regularPrice = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    const rodizioPrice = rodizioSystems.reduce((total, system) => total + (system.price * system.quantity), 0);
    return regularPrice + rodizioPrice;
  };

  const value: CartContextType = {
    items,
    rodizioSystems,
    addItem,
    addRodizioSystem,
    addRodizioItem,
    removeRodizioItem,
    removeItem,
    removeRodizioSystem,
    updateQuantity,
    updateRodizioQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};