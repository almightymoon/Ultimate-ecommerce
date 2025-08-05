'use client';

import { useEffect } from 'react';

export default function HydrationFix() {
  useEffect(() => {
    // Fix hydration mismatches caused by browser extensions
    const body = document.body;
    
    // Remove attributes that might be added by browser extensions
    const extensionAttributes = [
      'data-new-gr-c-s-check-loaded',
      'data-gr-ext-installed'
    ];
    
    extensionAttributes.forEach(attr => {
      if (body.hasAttribute(attr)) {
        body.removeAttribute(attr);
      }
    });

    // Remove browser extension elements that cause hydration mismatches
    const extensionElements = [
      '#pronounceRootElement',
      '.pronounceRootElementItem',
      '[id*="pronounce"]',
      '[class*="pronounce"]'
    ];

    extensionElements.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        console.log('🔧 Removing browser extension element:', selector);
        element.remove();
      });
    });

    // Suppress hydration mismatch warnings for known extension attributes and elements
    const originalConsoleError = console.error;
    console.error = (...args) => {
      const message = args.join(' ');
      
      // Suppress hydration mismatch warnings for browser extension attributes and elements
      if (
        message.includes('hydration') &&
        (message.includes('data-new-gr-c-s-check-loaded') ||
         message.includes('data-gr-ext-installed') ||
         message.includes('pronounceRootElement') ||
         message.includes('pronounceRootElementItem'))
      ) {
        console.log('🔧 Suppressed hydration mismatch warning for browser extension:', message.substring(0, 100) + '...');
        return;
      }
      
      originalConsoleError.apply(console, args);
    };

    // Set up a mutation observer to remove extension elements as they're added
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            
            // Check if the added element is a browser extension element
            if (
              element.id === 'pronounceRootElement' ||
              element.classList.contains('pronounceRootElementItem') ||
              element.id?.includes('pronounce') ||
              element.className?.toString().includes('pronounce')
            ) {
              console.log('🔧 Removing dynamically added browser extension element:', element.tagName, element.id, element.className);
              element.remove();
            }
          }
        });
      });
    });

    // Start observing
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      console.error = originalConsoleError;
      observer.disconnect();
    };
  }, []);

  return null;
} 