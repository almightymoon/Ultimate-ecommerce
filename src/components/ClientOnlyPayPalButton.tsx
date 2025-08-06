'use client';

import { useState, useEffect } from 'react';
import PayPalButtonAlternative from './PayPalButtonAlternative';

interface ClientOnlyPayPalButtonProps {
  amount: number;
  onSuccess: (details: { id: string; transactionId?: string }) => void;
  onError: (error: { message: string }) => void;
  onCancel: () => void;
  disabled?: boolean;
  className?: string;
}

export default function ClientOnlyPayPalButton(props: ClientOnlyPayPalButtonProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className={`${props.className} bg-gray-200 animate-pulse rounded-lg h-12`}></div>
    );
  }

  return <PayPalButtonAlternative {...props} />;
} 