'use client';

import React, { useState } from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';

interface PayPalButtonAlternativeProps {
  amount: number;
  products?: any[];
  onSuccess: (details: any) => void;
  onError: (error: any) => void;
  onCancel: () => void;
  disabled?: boolean;
  className?: string;
  buttonText?: string;
}

function PayPalButtonAlternative({
  amount,
  products = [],
  onSuccess,
  onError,
  onCancel,
  disabled = false,
  className = '',
  buttonText = 'Pay with PayPal'
}: PayPalButtonAlternativeProps) {
  const [isLoading, setIsLoading] = useState(false);

  if (disabled) {
    return (
      <div className={`w-full ${className}`}>
        <button
          disabled
          className="w-full bg-gray-300 text-gray-700 py-4 px-6 rounded-lg font-medium cursor-not-allowed transition-colors"
        >
          <div className="flex items-center justify-center space-x-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <span>PayPal Unavailable</span>
          </div>
        </button>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      {isLoading && (
        <div className="mb-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
            <span className="text-blue-800 font-medium">Processing your payment...</span>
          </div>
        </div>
      )}
      
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-100 shadow-sm">
        <div className="text-center mb-3">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.067 8.478c.492.315.844.825.844 1.522 0 .697-.352 1.207-.844 1.522-.492.315-1.133.478-1.844.478H5.777c-.711 0-1.352-.163-1.844-.478C3.441 11.207 3.089 10.697 3.089 10c0-.697.352-1.207.844-1.522.492-.315 1.133-.478 1.844-.478h12.446c.711 0 1.352.163 1.844.478z"/>
            </svg>
            <span className="text-blue-800 font-semibold text-sm">Secure Payment</span>
          </div>
          <p className="text-gray-600 text-xs">Powered by PayPal</p>
        </div>
        
        <PayPalButtons
          style={{ 
            layout: 'vertical', 
            height: 50, 
            borderRadius: 12,
            color: 'gold',
            shape: 'rect',
            label: 'pay'
          }}
        createOrder={async () => {
          try {
            const res = await fetch('/api/paypal/create_order', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ amount, products }),
            });
            const data = await res.json();
            console.log('PayPal Order Created:', data);
            if (!data.id) {
              throw new Error(data.error || 'Failed to create PayPal order: No order ID returned');
            }
            return data.id;
          } catch (error) {
            console.error('Create order error:', error);
            throw error;
          }
        }}
        onApprove={async (data, actions) => {
          try {
            if (!actions.order) {
              throw new Error('PayPal order actions not available');
            }
            const details = await actions.order.capture();
            console.log('Payment Approved: ', details);
            // Ensure products array is populated
            let orderProducts = products;
            if ((!orderProducts || orderProducts.length === 0) && details && details.purchase_units) {
              // Try to extract product info from PayPal details
              const items = details.purchase_units[0]?.items;
              if (items && items.length > 0) {
                orderProducts = items.map(item => ({
                  title: item.name,
                  price: Number(item.unit_amount?.value) || 0,
                  quantity: Number(item.quantity) || 1
                }));
              }
            }
            // Save order to database
            const orderRes = await fetch('/api/orders', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                amount: Number(amount),
                products: orderProducts,
                paymentMethod: 'paypal',
                paypalOrderId: data.orderID,
                status: 'paid',
                currency: 'USD',
                paypalDetails: details,
              }),
            });
            const orderData = await orderRes.json();
            if (orderRes.ok) {
              if (onSuccess) onSuccess({ details, orderId: orderData.orderId });
            } else {
              if (onError) onError(orderData.error || 'Failed to save PayPal order');
            }
          } catch (error) {
            console.error('PayPal order save error:', error);
            if (onError) onError(error instanceof Error ? error.message : String(error));
          }
        }}
        onError={(err) => {
          console.error('PayPal Checkout Error: ', err);
          if (onError) onError(err instanceof Error ? err.message : String(err));
        }}
        onCancel={() => {
          console.log('PayPal payment cancelled');
          if (onCancel) onCancel();
        }}
      />
        </div>
      </div>
  );
}

export default React.memo(PayPalButtonAlternative); 