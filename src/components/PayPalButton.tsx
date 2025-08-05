'use client';

import { PayPalButtons } from '@paypal/react-paypal-js';
import { useState, useCallback, useEffect, useRef } from 'react';

interface PayPalButtonProps {
  amount: number;
  onSuccess: (details: any) => void;
  onError: (error: any) => void;
  onCancel: () => void;
  disabled?: boolean;
  className?: string;
  items?: any[];
}

export default function PayPalButton({ 
  amount, 
  onSuccess, 
  onError, 
  onCancel, 
  disabled = false,
  className = '',
  items = []
}: PayPalButtonProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const isMountedRef = useRef(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const maxRetries = 3;

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const createOrder = useCallback((data: any, actions: any) => {
    if (!isMountedRef.current) return Promise.reject('Component unmounted');
    
    console.log('Creating PayPal order for amount:', amount);
    
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: amount.toFixed(2),
            currency_code: 'USD'
          },
          description: 'UltimateEcommerce Purchase',
          custom_id: `order_${Date.now()}`
        }
      ],
      application_context: {
        shipping_preference: 'NO_SHIPPING',
        return_url: `${window.location.origin}/checkout?paypal_return=true`,
        cancel_url: `${window.location.origin}/checkout?paypal_cancel=true`
      }
    }).then((id: string) => {
      console.log('PayPal order created:', id);
      if (isMountedRef.current) {
        setOrderId(id);
      }
      return id;
    }).catch((error: any) => {
      console.error('Error creating PayPal order:', error);
      throw error;
    });
  }, [amount]);

  const onApprove = useCallback(async (data: any, actions: any) => {
    if (!isMountedRef.current) return;
    
    console.log('PayPal order approved:', data.orderID);
    
    // Verify order ID matches
    if (data.orderID !== orderId) {
      console.warn('Order ID mismatch, ignoring');
      return;
    }

    setIsProcessing(true);
    setHasError(false);

    // Set a timeout for the capture operation
    const captureTimeout = new Promise((_, reject) => {
      timeoutRef.current = setTimeout(() => {
        reject(new Error('PayPal capture timeout'));
      }, 30000); // 30 second timeout
    });

    try {
      // Race between capture and timeout
      const details = await Promise.race([
        actions.order.capture(),
        captureTimeout
      ]);
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      
      console.log('PayPal capture successful:', details);
      
      if (isMountedRef.current) {
        onSuccess(details);
      }
    } catch (error) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      
      console.error('PayPal capture error:', error);
      
      if (isMountedRef.current) {
        // Check if it's a window closed error and we haven't exceeded retries
        if ((error as Error).message?.includes('Window closed') && retryCount < maxRetries) {
          console.log(`Retrying PayPal payment (attempt ${retryCount + 1}/${maxRetries})`);
          setRetryCount(prev => prev + 1);
          setHasError(false);
          setOrderId(null);
          // Small delay before retry
          setTimeout(() => {
            if (isMountedRef.current) {
              setIsProcessing(false);
            }
          }, 1000);
          return;
        }
        
        setHasError(true);
        onError(error);
        setIsProcessing(false);
      }
    }
  }, [orderId, onSuccess, onError, retryCount]);

  const handlePayPalCancel = useCallback(() => {
    if (isMountedRef.current) {
      console.log('PayPal payment cancelled by user');
      setHasError(false);
      setRetryCount(0);
      setOrderId(null);
      onCancel();
    }
  }, [onCancel]);

  const handlePayPalError = useCallback((err: any) => {
    if (isMountedRef.current) {
      console.error('PayPal error:', err);
      
      // Check if it's a window closed error and we haven't exceeded retries
      if (err.message?.includes('Window closed') && retryCount < maxRetries) {
        console.log(`Retrying PayPal payment after error (attempt ${retryCount + 1}/${maxRetries})`);
        setRetryCount(prev => prev + 1);
        setHasError(false);
        setOrderId(null);
        return;
      }
      
      setHasError(true);
      onError(err);
    }
  }, [onError, retryCount]);

  const handleRetry = useCallback(() => {
    if (retryCount >= maxRetries) {
      setRetryCount(0);
    }
    setHasError(false);
    setOrderId(null);
  }, [retryCount]);

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

  // Show retry button if there was an error
  if (hasError) {
    return (
      <div className={`w-full ${className}`}>
        <div className="text-center mb-4">
          <p className="text-red-600 text-sm mb-2">
            Payment failed. Please try again.
          </p>
          {retryCount >= maxRetries && (
            <p className="text-gray-500 text-xs">
              Maximum retries reached. Please refresh the page.
            </p>
          )}
        </div>
        <button
          onClick={handleRetry}
          className="w-full bg-red-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-red-600 transition-colors"
        >
          {retryCount >= maxRetries ? 'Refresh Page' : 'Retry PayPal Payment'}
        </button>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      <PayPalButtons
        createOrder={createOrder}
        onApprove={onApprove}
        onError={handlePayPalError}
        onCancel={handlePayPalCancel}
        style={{
          layout: 'horizontal',
          color: 'blue',
          shape: 'rect',
          label: 'pay'
        }}
        forceReRender={[amount, hasError, retryCount]}
      />
    </div>
  );
} 