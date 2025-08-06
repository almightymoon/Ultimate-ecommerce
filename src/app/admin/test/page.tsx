'use client';

import { useEffect, useState } from 'react';

interface User {
  email: string;
  role: string;
  name: string;
}

export default function AdminTest() {
  const [authStatus, setAuthStatus] = useState('Loading...');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/admin/auth/verify', {
          credentials: 'include'
        });
        const data = await response.json();
        
        if (data.success) {
          setAuthStatus('Authenticated');
          setUser(data.user);
        } else {
          setAuthStatus('Not authenticated');
        }
      } catch (error) {
        setAuthStatus('Error: ' + (error instanceof Error ? error.message : 'Unknown error'));
      }
    };

    checkAuth();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Admin Auth Test</h1>
        
        <div className="space-y-4">
          <div>
            <strong>Status:</strong> {authStatus}
          </div>
          
          {user && (
            <div>
              <strong>User:</strong>
              <div className="ml-4 mt-2">
                <div>Email: {user.email}</div>
                <div>Role: {user.role}</div>
                <div>Name: {user.name}</div>
              </div>
            </div>
          )}
          
          <div className="mt-6">
            <a 
              href="/admin" 
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Go to Admin Dashboard
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 