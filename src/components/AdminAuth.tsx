'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function AdminAuth({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = () => {
      // If we're already on the login page, don't redirect
      if (pathname === '/admin/login') {
        setIsAuthenticated(true);
        setIsLoading(false);
        return;
      }

      // Check if admin token exists
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        console.log('❌ No admin token found, redirecting to login');
        router.push('/admin/login');
        return;
      }
      
      // Token exists, allow access
      console.log('✅ Admin token found, allowing access');
      setIsAuthenticated(true);
      setIsLoading(false);
    };

    checkAuth();
  }, [router, pathname]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
} 