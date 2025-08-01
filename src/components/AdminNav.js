'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminNav() {
  const pathname = usePathname();

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: '📊' },
    { href: '/admin/products', label: 'Products', icon: '🛍️' },
    { href: '/admin/orders', label: 'Orders', icon: '📦' },
    { href: '/admin/customers', label: 'Customers', icon: '👥' },
    { href: '/admin/analytics', label: 'Analytics', icon: '📈' },
    { href: '/admin/settings', label: 'Settings', icon: '⚙️' }
  ];

  return (
    <div style={{
      background: 'white',
      borderBottom: '1px solid #e2e8f0',
      padding: '1rem 0',
      position: 'sticky',
      top: 0,
      zIndex: 100
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #22c55e, #16a34a)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '20px'
            }}>
              A
            </div>
            <h1 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b' }}>Admin Panel</h1>
          </div>
          
          <nav style={{ display: 'flex', gap: '0.5rem' }}>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1rem',
                  background: pathname === item.href ? '#dcfce7' : 'transparent',
                  border: 'none',
                  borderRadius: '6px',
                  color: pathname === item.href ? '#15803d' : '#64748b',
                  textDecoration: 'none',
                  fontWeight: pathname === item.href ? '600' : '500',
                  transition: 'all 0.2s'
                }}
              >
                <span style={{ fontSize: '1rem' }}>{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link href="/" style={{
              padding: '0.5rem 1rem',
              background: '#f1f5f9',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              color: '#64748b',
              textDecoration: 'none',
              fontSize: '0.875rem'
            }}>
              ← Back to Store
            </Link>
            <div style={{
              width: '32px',
              height: '32px',
              background: '#22c55e',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold'
            }}>
              A
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 