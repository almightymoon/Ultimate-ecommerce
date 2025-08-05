'use client';

import { useEffect } from 'react';

export default function MetaMaskErrorHandler() {
  useEffect(() => {
    // Suppress MetaMask connection errors that might come from browser extensions
    const originalConsoleError = console.error;
    const originalConsoleWarn = console.warn;

    console.error = (...args) => {
      const message = args.join(' ');
      
      // Suppress MetaMask-related errors
      if (
        message.includes('Failed to connect to MetaMask') ||
        message.includes('MetaMask extension not found') ||
        message.includes('ethereum') ||
        message.includes('wallet')
      ) {
        // Silently ignore MetaMask-related errors
        return;
      }
      
      // Log other errors normally
      originalConsoleError.apply(console, args);
    };

    console.warn = (...args) => {
      const message = args.join(' ');
      
      // Suppress MetaMask-related warnings
      if (
        message.includes('Failed to connect to MetaMask') ||
        message.includes('MetaMask extension not found') ||
        message.includes('ethereum') ||
        message.includes('wallet')
      ) {
        // Silently ignore MetaMask-related warnings
        return;
      }
      
      // Log other warnings normally
      originalConsoleWarn.apply(console, args);
    };

    // Cleanup function
    return () => {
      console.error = originalConsoleError;
      console.warn = originalConsoleWarn;
    };
  }, []);

  return null; // This component doesn't render anything
} 