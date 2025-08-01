"use client";

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  action?: {
    label: string;
    url: string;
  };
  expiresAt?: Date;
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  settings: {
    email: boolean;
    push: boolean;
    inApp: boolean;
    marketing: boolean;
  };
}

type NotificationAction =
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'REMOVE_NOTIFICATION'; payload: string }
  | { type: 'MARK_AS_READ'; payload: string }
  | { type: 'MARK_ALL_AS_READ' }
  | { type: 'CLEAR_ALL' }
  | { type: 'UPDATE_SETTINGS'; payload: Partial<NotificationState['settings']> }
  | { type: 'LOAD_NOTIFICATIONS'; payload: Notification[] }
  | { type: 'LOAD_SETTINGS'; payload: NotificationState['settings'] };

const initialState: NotificationState = {
  notifications: [],
  unreadCount: 0,
  settings: {
    email: true,
    push: true,
    inApp: true,
    marketing: false,
  },
};

function notificationReducer(state: NotificationState, action: NotificationAction): NotificationState {
  switch (action.type) {
    case 'ADD_NOTIFICATION': {
      const newNotifications = [action.payload, ...state.notifications];
      const newUnreadCount = newNotifications.filter(n => !n.isRead).length;
      
      return {
        ...state,
        notifications: newNotifications,
        unreadCount: newUnreadCount,
      };
    }

    case 'REMOVE_NOTIFICATION': {
      const updatedNotifications = state.notifications.filter(n => n.id !== action.payload);
      const newUnreadCount = updatedNotifications.filter(n => !n.isRead).length;
      
      return {
        ...state,
        notifications: updatedNotifications,
        unreadCount: newUnreadCount,
      };
    }

    case 'MARK_AS_READ': {
      const updatedNotifications = state.notifications.map(n =>
        n.id === action.payload ? { ...n, isRead: true } : n
      );
      const newUnreadCount = updatedNotifications.filter(n => !n.isRead).length;
      
      return {
        ...state,
        notifications: updatedNotifications,
        unreadCount: newUnreadCount,
      };
    }

    case 'MARK_ALL_AS_READ': {
      const updatedNotifications = state.notifications.map(n => ({ ...n, isRead: true }));
      
      return {
        ...state,
        notifications: updatedNotifications,
        unreadCount: 0,
      };
    }

    case 'CLEAR_ALL': {
      return {
        ...state,
        notifications: [],
        unreadCount: 0,
      };
    }

    case 'UPDATE_SETTINGS': {
      return {
        ...state,
        settings: { ...state.settings, ...action.payload },
      };
    }

    case 'LOAD_NOTIFICATIONS': {
      const notificationsWithDates = action.payload.map(notification => ({
        ...notification,
        timestamp: new Date(notification.timestamp),
        expiresAt: notification.expiresAt ? new Date(notification.expiresAt) : undefined,
      }));
      const unreadCount = notificationsWithDates.filter(n => !n.isRead).length;
      
      return {
        ...state,
        notifications: notificationsWithDates,
        unreadCount,
      };
    }

    case 'LOAD_SETTINGS': {
      return {
        ...state,
        settings: action.payload,
      };
    }

    default:
      return state;
  }
}

interface NotificationContextType {
  state: NotificationState;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
  removeNotification: (id: string) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearAll: () => void;
  updateSettings: (settings: Partial<NotificationState['settings']>) => void;
  getUnreadCount: () => number;
  getNotificationsByType: (type: Notification['type']) => Notification[];
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(notificationReducer, initialState);

  // Load notifications from localStorage on mount
  useEffect(() => {
    try {
      const savedNotifications = localStorage.getItem('ultimate-ecommerce-notifications');
      const savedSettings = localStorage.getItem('ultimate-ecommerce-notification-settings');
      
      if (savedNotifications) {
        const parsedNotifications = JSON.parse(savedNotifications);
        dispatch({ type: 'LOAD_NOTIFICATIONS', payload: parsedNotifications });
      }
      
      if (savedSettings) {
        const parsedSettings = JSON.parse(savedSettings);
        dispatch({ type: 'LOAD_SETTINGS', payload: parsedSettings });
      }
    } catch (error) {
      console.error('Error loading notifications from localStorage:', error);
    }
  }, []);

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('ultimate-ecommerce-notifications', JSON.stringify(state.notifications));
    } catch (error) {
      console.error('Error saving notifications to localStorage:', error);
    }
  }, [state.notifications]);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem('ultimate-ecommerce-notification-settings', JSON.stringify(state.settings));
    } catch (error) {
      console.error('Error saving notification settings to localStorage:', error);
    }
  }, [state.settings]);

  // Clean up expired notifications
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const validNotifications = state.notifications.filter(n => 
        !n.expiresAt || n.expiresAt > now
      );
      
      if (validNotifications.length !== state.notifications.length) {
        dispatch({ type: 'LOAD_NOTIFICATIONS', payload: validNotifications });
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [state.notifications]);

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
    };
    
    dispatch({ type: 'ADD_NOTIFICATION', payload: newNotification });
  };

  const removeNotification = (id: string) => {
    dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
  };

  const markAsRead = (id: string) => {
    dispatch({ type: 'MARK_AS_READ', payload: id });
  };

  const markAllAsRead = () => {
    dispatch({ type: 'MARK_ALL_AS_READ' });
  };

  const clearAll = () => {
    dispatch({ type: 'CLEAR_ALL' });
  };

  const updateSettings = (settings: Partial<NotificationState['settings']>) => {
    dispatch({ type: 'UPDATE_SETTINGS', payload: settings });
  };

  const getUnreadCount = () => {
    return state.unreadCount;
  };

  const getNotificationsByType = (type: Notification['type']) => {
    return state.notifications.filter(n => n.type === type);
  };

  const value: NotificationContextType = {
    state,
    addNotification,
    removeNotification,
    markAsRead,
    markAllAsRead,
    clearAll,
    updateSettings,
    getUnreadCount,
    getNotificationsByType,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
} 