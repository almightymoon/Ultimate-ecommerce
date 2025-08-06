'use client';

import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import PayPalButtonAlternative from '@/components/PayPalButtonAlternative';

export default function TestPayPalPage() {
  const handleSuccess = (details: { id: string; transactionId?: string }) => {
    console.log('✅ PayPal payment successful:', details);
    alert('Payment successful!');
  };

  const handleError = (error: { message: string }) => {
    console.error('❌ PayPal payment error:', error);
    alert('Payment failed: ' + error.message);
  };

  const handleCancel = () => {
    console.log('🚫 PayPal payment cancelled');
    alert('Payment cancelled');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">PayPal Test Page</h1>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">PayPal Button Test</h2>
        <p className="text-gray-600 mb-4">Amount: $10.50</p>
        
        <PayPalScriptProvider options={{ 
          clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test",
          currency: 'USD',
          intent: 'capture'
        }}>
          <PayPalButtonAlternative
            amount={10.50}
            products={[
              {
                title: "Test Product",
                price: 10.50,
                quantity: 1,
                name: "A test product for PayPal integration"
              }
            ]}
            onSuccess={handleSuccess}
            onError={handleError}
            onCancel={handleCancel}
          />
        </PayPalScriptProvider>
      </div>
    </div>
  );
} 