'use client';

import React from 'react';

export default function Footer() {
  return (
    <footer style={{
      background: '#1e293b',
      color: 'white',
      padding: '3rem 0 1rem',
      marginTop: 'auto'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        {/* Main Footer Content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          {/* Company Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
              <div style={{
                width: '32px',
                height: '32px',
                background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '8px'
              }}>
                <span style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}>U</span>
              </div>
              <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#22c55e' }}>UltimateEcommerce</span>
            </div>
            <p style={{ color: '#94a3b8', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              Experience the future of online shopping with cutting-edge technology, AI-powered recommendations, and seamless checkout.
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <a href="#" style={{ color: '#94a3b8', fontSize: '1.5rem' }}>📘</a>
              <a href="#" style={{ color: '#94a3b8', fontSize: '1.5rem' }}>📷</a>
              <a href="#" style={{ color: '#94a3b8', fontSize: '1.5rem' }}>🐦</a>
              <a href="#" style={{ color: '#94a3b8', fontSize: '1.5rem' }}>💼</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Quick Links</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {[
                { href: '/products', label: 'All Products' },
                { href: '/categories', label: 'Categories' },
                { href: '/deals', label: 'Deals & Offers' },
                { href: '/about', label: 'About Us' },
                { href: '/contact', label: 'Contact' }
              ].map((link, index) => (
                <li key={index} style={{ marginBottom: '0.5rem' }}>
                  <a href={link.href} style={{
                    color: '#94a3b8',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease'
                  }} onMouseEnter={(e) => e.target.style.color = '#22c55e'} onMouseLeave={(e) => e.target.style.color = '#94a3b8'}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Customer Service</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {[
                { href: '/faq', label: 'FAQ' },
                { href: '/contact', label: 'Contact Support' },
                { href: '/shipping', label: 'Shipping Info' },
                { href: '/returns', label: 'Returns & Exchanges' },
                { href: '/privacy', label: 'Privacy Policy' }
              ].map((link, index) => (
                <li key={index} style={{ marginBottom: '0.5rem' }}>
                  <a href={link.href} style={{
                    color: '#94a3b8',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease'
                  }} onMouseEnter={(e) => e.target.style.color = '#22c55e'} onMouseLeave={(e) => e.target.style.color = '#94a3b8'}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Account</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {[
                { href: '/login', label: 'Sign In' },
                { href: '/signup', label: 'Create Account' },
                { href: '/profile', label: 'My Profile' },
                { href: '/orders', label: 'Order History' },
                { href: '/wishlist', label: 'Wishlist' }
              ].map((link, index) => (
                <li key={index} style={{ marginBottom: '0.5rem' }}>
                  <a href={link.href} style={{
                    color: '#94a3b8',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease'
                  }} onMouseEnter={(e) => e.target.style.color = '#22c55e'} onMouseLeave={(e) => e.target.style.color = '#94a3b8'}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Stay Updated</h3>
            <p style={{ color: '#94a3b8', marginBottom: '1rem' }}>
              Subscribe to our newsletter for the latest products and exclusive offers.
            </p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="email"
                placeholder="Enter your email"
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  border: '1px solid #475569',
                  borderRadius: '8px',
                  background: '#334155',
                  color: 'white',
                  fontSize: '0.875rem'
                }}
              />
              <button style={{
                padding: '0.75rem 1rem',
                backgroundColor: '#22c55e',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: '600',
                fontSize: '0.875rem'
              }}>
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div style={{
          borderTop: '1px solid #475569',
          paddingTop: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ color: '#94a3b8', fontSize: '0.875rem' }}>
            © 2024 UltimateEcommerce. All rights reserved.
          </div>
          
          <div style={{ display: 'flex', gap: '2rem', fontSize: '0.875rem' }}>
            <a href="/terms" style={{ color: '#94a3b8', textDecoration: 'none' }}>Terms of Service</a>
            <a href="/privacy" style={{ color: '#94a3b8', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="/cookies" style={{ color: '#94a3b8', textDecoration: 'none' }}>Cookie Policy</a>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#94a3b8', fontSize: '0.875rem' }}>
            <span>Made with ❤️ by UltimateEcommerce Team</span>
          </div>
        </div>
      </div>
    </footer>
  );
} 