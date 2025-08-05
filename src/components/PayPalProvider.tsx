'use client';

import { PayPalScriptProvider } from '@paypal/react-paypal-js';

const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'test';
const paypalEnv = process.env.PAYPAL_ENV || 'sandbox';

const initialOptions = {
  clientId: paypalClientId,
  currency: 'USD',
  intent: 'capture',
  components: 'buttons'
};

interface PayPalProviderProps {
  children: React.ReactNode;
}

export default function PayPalProvider({ children }: PayPalProviderProps) {
  return (
    <PayPalScriptProvider 
      options={initialOptions}
      deferLoading={false}
    >
      {children}
    </PayPalScriptProvider>
  );
} 