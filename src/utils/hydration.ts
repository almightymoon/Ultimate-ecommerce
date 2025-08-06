'use client';

import { useEffect } from 'react';

/**
 * Suppresses hydration warnings caused by browser extensions
 * that modify the DOM before React can hydrate
 */
export function useHydrationSuppression() {
  useEffect(() => {
    // Suppress console errors from browser extensions
    const originalError = console.error;
    console.error = (...args) => {
      const message = args[0];
      
      // Suppress hydration warnings from browser extensions
      if (
        typeof message === 'string' && 
        (message.includes('Hydration failed') || 
         message.includes('pronounceRootElement') ||
         message.includes('Server rendered HTML didn\'t match'))
      ) {
        return;
      }
      
      originalError.apply(console, args);
    };

    return () => {
      console.error = originalError;
    };
  }, []);
}

/**
 * Removes browser extension elements that cause hydration issues
 */
export function useCleanupBrowserExtensions() {
  useEffect(() => {
    // Remove pronounce extension elements
    const pronounceElements = document.querySelectorAll('[id*="pronounce"], [class*="pronounce"]');
    pronounceElements.forEach(element => {
      element.remove();
    });

    // Remove other common extension elements that cause issues
    const extensionSelectors = [
      '[id*="grammarly"]',
      '[class*="grammarly"]',
      '[id*="lighthouse"]',
      '[class*="lighthouse"]',
      '[id*="adblock"]',
      '[class*="adblock"]'
    ];

    extensionSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        element.remove();
      });
    });
  }, []);
} 