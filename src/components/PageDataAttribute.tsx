'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function PageDataAttribute() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.body.setAttribute('data-page', pathname || '/');
    }
  }, [pathname]);

  return null;
} 