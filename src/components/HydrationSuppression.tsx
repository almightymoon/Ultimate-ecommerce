'use client';

import { useEffect } from 'react';
import { useHydrationSuppression, useCleanupBrowserExtensions } from '@/utils/hydration';

export default function HydrationSuppression() {
  useHydrationSuppression();
  useCleanupBrowserExtensions();

  useEffect(() => {
    // Additional cleanup for browser extensions
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element;
            
            // Remove pronounce extension elements
            if (element.id?.includes('pronounce') || element.className?.toString().includes('pronounce')) {
              element.remove();
            }
            
            // Remove other problematic extension elements
            const problematicSelectors = [
              '[id*="grammarly"]',
              '[class*="grammarly"]',
              '[id*="lighthouse"]',
              '[class*="lighthouse"]',
              '[id*="adblock"]',
              '[class*="adblock"]'
            ];
            
            problematicSelectors.forEach(selector => {
              const elements = element.querySelectorAll?.(selector) || [];
              elements.forEach(el => el.remove());
            });
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return null;
} 