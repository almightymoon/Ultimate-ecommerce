'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

interface PaymentState {
  isProcessing: boolean;
  isCreatingOrder: boolean;
  currentOrderId: string | null;
  paymentMethod: 'paypal' | 'card' | null;
  preventUnmount: boolean;
}

type PaymentAction =
  | { type: 'START_ORDER_CREATION' }
  | { type: 'ORDER_CREATED'; payload: string }
  | { type: 'START_PAYMENT_PROCESSING' }
  | { type: 'PAYMENT_COMPLETED' }
  | { type: 'PAYMENT_FAILED' }
  | { type: 'RESET_PAYMENT_STATE' }
  | { type: 'SET_PAYMENT_METHOD'; payload: 'paypal' | 'card' };

const initialState: PaymentState = {
  isProcessing: false,
  isCreatingOrder: false,
  currentOrderId: null,
  paymentMethod: null,
  preventUnmount: false,
};

function paymentReducer(state: PaymentState, action: PaymentAction): PaymentState {
  switch (action.type) {
    case 'START_ORDER_CREATION':
      return {
        ...state,
        isCreatingOrder: true,
        preventUnmount: true,
      };

    case 'ORDER_CREATED':
      return {
        ...state,
        isCreatingOrder: false,
        currentOrderId: action.payload,
        preventUnmount: true,
      };

    case 'START_PAYMENT_PROCESSING':
      return {
        ...state,
        isProcessing: true,
        preventUnmount: true,
      };

    case 'PAYMENT_COMPLETED':
      return {
        ...state,
        isProcessing: false,
        isCreatingOrder: false,
        currentOrderId: null,
        preventUnmount: false,
      };

    case 'PAYMENT_FAILED':
      return {
        ...state,
        isProcessing: false,
        isCreatingOrder: false,
        currentOrderId: null,
        preventUnmount: false,
      };

    case 'RESET_PAYMENT_STATE':
      return {
        ...state,
        isProcessing: false,
        isCreatingOrder: false,
        currentOrderId: null,
        preventUnmount: false,
      };

    case 'SET_PAYMENT_METHOD':
      return {
        ...state,
        paymentMethod: action.payload,
      };

    default:
      return state;
  }
}

interface PaymentContextType {
  state: PaymentState;
  startOrderCreation: () => void;
  orderCreated: (orderId: string) => void;
  startPaymentProcessing: () => void;
  paymentCompleted: () => void;
  paymentFailed: () => void;
  resetPaymentState: () => void;
  setPaymentMethod: (method: 'paypal' | 'card') => void;
}

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export function PaymentProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(paymentReducer, initialState);

  // Prevent page unload during payment processing
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (state.preventUnmount || state.isProcessing || state.isCreatingOrder) {
        e.preventDefault();
        e.returnValue = 'Payment in progress. Are you sure you want to leave?';
        return 'Payment in progress. Are you sure you want to leave?';
      }
    };

    const handleVisibilityChange = () => {
      if ((state.preventUnmount || state.isProcessing || state.isCreatingOrder) && document.visibilityState === 'hidden') {
        console.log('Page visibility changed during payment processing');
      }
    };

    // Set global flag
    if (typeof window !== 'undefined') {
      window.paypalPaymentInProgress = state.preventUnmount || state.isProcessing || state.isCreatingOrder;
    }

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (typeof window !== 'undefined') {
        window.paypalPaymentInProgress = false;
      }
    };
  }, [state.preventUnmount, state.isProcessing, state.isCreatingOrder]);

  const startOrderCreation = () => {
    dispatch({ type: 'START_ORDER_CREATION' });
  };

  const orderCreated = (orderId: string) => {
    dispatch({ type: 'ORDER_CREATED', payload: orderId });
  };

  const startPaymentProcessing = () => {
    dispatch({ type: 'START_PAYMENT_PROCESSING' });
  };

  const paymentCompleted = () => {
    dispatch({ type: 'PAYMENT_COMPLETED' });
  };

  const paymentFailed = () => {
    dispatch({ type: 'PAYMENT_FAILED' });
  };

  const resetPaymentState = () => {
    dispatch({ type: 'RESET_PAYMENT_STATE' });
  };

  const setPaymentMethod = (method: 'paypal' | 'card') => {
    dispatch({ type: 'SET_PAYMENT_METHOD', payload: method });
  };

  const value: PaymentContextType = {
    state,
    startOrderCreation,
    orderCreated,
    startPaymentProcessing,
    paymentCompleted,
    paymentFailed,
    resetPaymentState,
    setPaymentMethod,
  };

  return (
    <PaymentContext.Provider value={value}>
      {children}
    </PaymentContext.Provider>
  );
}

export function usePayment() {
  const context = useContext(PaymentContext);
  if (context === undefined) {
    throw new Error('usePayment must be used within a PaymentProvider');
  }
  return context;
} 