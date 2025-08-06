'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';

interface PayPalButtonWrapperProps {
  amount: number;
  onSuccess: (details: { id: string; transactionId?: string }) => void;
  onError: (error: { message: string }) => void;
  onCancel: () => void;
  disabled?: boolean;
  className?: string;
}

export default function PayPalButtonWrapper({
  amount,
  onSuccess,
  onError,
  onCancel,
  disabled = false,
  className = ''
}: PayPalButtonWrapperProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);

  // Reset error state when amount changes
  useEffect(() => {
    setHasError(false);
  }, [amount]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const createOrder = useCallback((data: any, actions: any) => {
    console.log('Creating PayPal order for amount:', amount);
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: amount.toFixed(2),
            currency_code: 'USD'
          },
          description: 'UltimateEcommerce Purchase'
        }
      ],
      application_context: {
        shipping_preference: 'NO_SHIPPING',
        user_action: 'PAY_NOW'
      }
    }).then((orderId: string) => {
      console.log('PayPal order created:', orderId);
      setOrderId(orderId);
      return orderId;
    });
  }, [amount]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onApprove = useCallback(async (data: any, actions: any) => {
    if (data.orderID !== orderId) {
      console.warn('Order ID mismatch, ignoring');
      return;
    }

    console.log('PayPal payment approved, capturing...');
    setIsProcessing(true);
    setHasError(false);

    try {
      const details = await actions.order.capture();
      console.log('Payment captured successfully:', details);
      
      // Ensure we're still processing before calling success
      if (isProcessing) {
        onSuccess(details);
      }
    } catch (error) {
      console.error('Error capturing payment:', error);
      setHasError(true);
      onError({ message: error instanceof Error ? error.message : String(error) });
    } finally {
      setIsProcessing(false);
    }
  }, [orderId, isProcessing, onSuccess, onError]);

  const handleError = useCallback((err: { message?: string }) => {
    console.error('PayPal error:', err);
    setHasError(true);
          onError({ message: err.message || 'Unknown error' });
  }, [onError]);

  const handleCancel = useCallback(() => {
    console.log('PayPal payment cancelled');
    setHasError(false);
    onCancel();
  }, [onCancel]);

  // Don't render if disabled or processing
  if (disabled || isProcessing) {
    return (
      <div className={`w-full ${className}`}>
        <button
          disabled
          className="w-full bg-gray-300 text-gray-500 py-3 px-6 rounded-lg font-medium cursor-not-allowed"
        >
          {isProcessing ? 'Processing Payment...' : 'PayPal Unavailable'}
        </button>
      </div>
    );
  }

  // Don't render if there was an error
  if (hasError) {
    return (
      <div className={`w-full ${className}`}>
        <button
          onClick={() => {
            setHasError(false);
            setOrderId(null);
          }}
          className="w-full bg-red-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-red-600 transition-colors"
        >
          Retry PayPal Payment
        </button>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
        onError={handleError}
        onCancel={handleCancel}
        style={{
          layout: 'horizontal',
          color: 'blue',
          shape: 'rect',
          label: 'pay'
        }}
        forceReRender={[amount, hasError]}
      />
    </div>
  );
} 