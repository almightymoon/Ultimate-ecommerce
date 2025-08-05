"use client";

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import toast from 'react-hot-toast';

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  category?: string;
  addedAt: Date;
  variant?: string;
  size?: string;
  color?: string;
}

interface WishlistState {
  items: WishlistItem[];
  isVisible: boolean;
  isLoading: boolean;
}

type WishlistAction =
  | { type: 'ADD_ITEM'; payload: WishlistItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'CLEAR_WISHLIST' }
  | { type: 'TOGGLE_VISIBILITY' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'LOAD_WISHLIST'; payload: WishlistItem[] };

const initialState: WishlistState = {
  items: [],
  isVisible: false,
  isLoading: false,
};

function wishlistReducer(state: WishlistState, action: WishlistAction): WishlistState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => 
        item.id === action.payload.id &&
        item.variant === action.payload.variant &&
        item.size === action.payload.size &&
        item.color === action.payload.color
      );

      if (existingItem) {
        return state;
      }

      const newItems = [...state.items, action.payload];
      
      return {
        ...state,
        items: newItems,
      };
    }

    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(item => item.id !== action.payload);
      
      return {
        ...state,
        items: updatedItems,
      };
    }

    case 'CLEAR_WISHLIST':
      return {
        ...state,
        items: [],
      };

    case 'TOGGLE_VISIBILITY':
      return {
        ...state,
        isVisible: !state.isVisible,
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };

    case 'LOAD_WISHLIST':
      return {
        ...state,
        items: action.payload,
      };

    default:
      return state;
  }
}

interface WishlistContextType {
  state: WishlistState;
  addItem: (item: Omit<WishlistItem, 'addedAt'>) => void;
  removeItem: (id: string) => void;
  clearWishlist: () => void;
  toggleVisibility: () => void;
  isInWishlist: (id: string, variant?: string, size?: string, color?: string) => boolean;
  getWishlistCount: () => number;
  shareWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem('ultimate-ecommerce-wishlist');
      if (savedWishlist) {
        const parsedWishlist = JSON.parse(savedWishlist);
        // Convert string dates back to Date objects
        const itemsWithDates = parsedWishlist.map((item: any) => ({
          ...item,
          addedAt: new Date(item.addedAt),
        }));
        dispatch({ type: 'LOAD_WISHLIST', payload: itemsWithDates });
      }
    } catch (error) {
      console.error('Error loading wishlist from localStorage:', error);
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('ultimate-ecommerce-wishlist', JSON.stringify(state.items));
    } catch (error) {
      console.error('Error saving wishlist to localStorage:', error);
    }
  }, [state.items]);

  const addItem = (item: Omit<WishlistItem, 'addedAt'>) => {
    const existingItem = state.items.find(existing => 
      existing.id === item.id &&
      existing.variant === item.variant &&
      existing.size === item.size &&
      existing.color === item.color
    );

    if (existingItem) {
      toast.error('Item is already in your wishlist');
      return;
    }

    dispatch({ type: 'ADD_ITEM', payload: { ...item, addedAt: new Date() } });
    toast.success(`Added ${item.name} to wishlist`);
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
    toast.success('Item removed from wishlist');
  };

  const clearWishlist = () => {
    dispatch({ type: 'CLEAR_WISHLIST' });
    toast.success('Wishlist cleared');
  };

  const toggleVisibility = () => {
    dispatch({ type: 'TOGGLE_VISIBILITY' });
  };

  const isInWishlist = (id: string, variant?: string, size?: string, color?: string) => {
    return state.items.some(item => 
      item.id === id &&
      item.variant === variant &&
      item.size === size &&
      item.color === color
    );
  };

  const getWishlistCount = () => {
    return state.items.length;
  };

  const shareWishlist = () => {
    if (state.items.length === 0) {
      toast.error('Your wishlist is empty');
      return;
    }

    const wishlistData = {
      items: state.items,
      totalItems: state.items.length,
      totalValue: state.items.reduce((sum, item) => sum + item.price, 0),
      sharedAt: new Date().toISOString(),
    };

    const shareText = `Check out my wishlist on UltimateEcommerce!\n\n${state.items.length} items worth $${wishlistData.totalValue.toFixed(2)}\n\n${state.items.map(item => `• ${item.name} - $${item.price}`).join('\n')}\n\nVisit: https://ultimate-ecommerce.com/wishlist`;

    if (navigator.share) {
      navigator.share({
        title: 'My UltimateEcommerce Wishlist',
        text: shareText,
        url: 'https://ultimate-ecommerce.com/wishlist',
      }).catch((error) => {
        console.error('Error sharing wishlist:', error);
        // Fallback to clipboard
        navigator.clipboard.writeText(shareText);
        toast.success('Wishlist copied to clipboard!');
      });
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(shareText);
      toast.success('Wishlist copied to clipboard!');
    }
  };

  const value: WishlistContextType = {
    state,
    addItem,
    removeItem,
    clearWishlist,
    toggleVisibility,
    isInWishlist,
    getWishlistCount,
    shareWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
} 