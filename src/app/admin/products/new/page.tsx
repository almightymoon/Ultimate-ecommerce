'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NewProductRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/admin/products/add');
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to Add Product page...</p>
      </div>
    </div>
  );
} 