'use client';

import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import CartSidebar from './CartSidebar';

export default function Header() {
  const { state } = useCart();
  const { getWishlistCount } = useWishlist();
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const cartItemCount = state.items.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = getWishlistCount();

  return (
    <header style={{
      background: 'white',
      borderBottom: '2px solid #22c55e',
      padding: '1rem 0',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 2px 10px rgba(34, 197, 94, 0.1)'
    }}>
      <div style={{ 
        maxWidth: '1400px', 
        margin: '0 auto', 
        padding: '0 1rem', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        gap: '1rem',
        flexWrap: 'wrap'
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <div style={{
              width: '32px',
              height: '32px',
              background: 'linear-gradient(135deg, #22c55e, #16a34a)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '8px',
              boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)'
            }}>
              <span style={{ color: 'white', fontWeight: 'bold', fontSize: '16px' }}>U</span>
            </div>
            <span style={{ 
              fontSize: '20px', 
              fontWeight: '800', 
              color: '#22c55e',
              letterSpacing: '-0.5px'
            }}>
              UltimateEcommerce
            </span>
          </a>
        </div>

        {/* Navigation - Hidden on small screens */}
        <nav style={{ 
          display: 'flex', 
          gap: '1.5rem',
          flex: 1,
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <a href="/" style={{ 
            color: '#1e293b', 
            textDecoration: 'none', 
            fontWeight: '600',
            fontSize: '14px',
            padding: '6px 12px',
            borderRadius: '6px',
            transition: 'all 0.2s ease',
            whiteSpace: 'nowrap'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#f0fdf4'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            Home
          </a>
          <a href="/products" style={{ 
            color: '#1e293b', 
            textDecoration: 'none', 
            fontWeight: '600',
            fontSize: '14px',
            padding: '6px 12px',
            borderRadius: '6px',
            transition: 'all 0.2s ease',
            whiteSpace: 'nowrap'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#f0fdf4'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            Products
          </a>
          <a href="/categories" style={{ 
            color: '#1e293b', 
            textDecoration: 'none', 
            fontWeight: '600',
            fontSize: '14px',
            padding: '6px 12px',
            borderRadius: '6px',
            transition: 'all 0.2s ease',
            whiteSpace: 'nowrap'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#f0fdf4'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            Categories
          </a>
          <a href="/deals" style={{ 
            color: '#1e293b', 
            textDecoration: 'none', 
            fontWeight: '600',
            fontSize: '14px',
            padding: '6px 12px',
            borderRadius: '6px',
            transition: 'all 0.2s ease',
            whiteSpace: 'nowrap'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#f0fdf4'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            Deals
          </a>
          <a href="/about" style={{ 
            color: '#1e293b', 
            textDecoration: 'none', 
            fontWeight: '600',
            fontSize: '14px',
            padding: '6px 12px',
            borderRadius: '6px',
            transition: 'all 0.2s ease',
            whiteSpace: 'nowrap'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#f0fdf4'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            About
          </a>
          <a href="/contact" style={{ 
            color: '#1e293b', 
            textDecoration: 'none', 
            fontWeight: '600',
            fontSize: '14px',
            padding: '6px 12px',
            borderRadius: '6px',
            transition: 'all 0.2s ease',
            whiteSpace: 'nowrap'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#f0fdf4'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            Contact
          </a>
        </nav>

        {/* Search Bar - Responsive */}
        <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Search..."
              style={{
                padding: '8px 12px 8px 36px',
                border: '2px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '14px',
                width: '200px',
                background: 'white',
                transition: 'all 0.2s ease',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#22c55e'}
              onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
            />
            <span style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#22c55e',
              fontSize: '14px'
            }}>
              🔍
            </span>
          </div>
        </div>

        {/* Actions - Compact */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem',
          flexShrink: 0
        }}>
          <a 
            href="/wishlist"
            style={{ 
              padding: '6px 8px', 
              color: '#1e293b', 
              textDecoration: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              position: 'relative',
              borderRadius: '6px',
              transition: 'all 0.2s ease',
              fontWeight: '500',
              fontSize: '12px'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#f0fdf4'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            ❤️
            {wishlistCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                background: '#ef4444',
                color: 'white',
                borderRadius: '50%',
                width: '16px',
                height: '16px',
                fontSize: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                border: '1px solid white'
              }}>
                {wishlistCount}
              </span>
            )}
          </a>
          <button 
            onClick={() => setIsCartOpen(true)}
            style={{ 
              padding: '6px 8px', 
              color: '#1e293b', 
              textDecoration: 'none',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              position: 'relative',
              borderRadius: '6px',
              transition: 'all 0.2s ease',
              fontWeight: '500',
              fontSize: '12px'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#f0fdf4'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            🛒
            {cartItemCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                background: '#ef4444',
                color: 'white',
                borderRadius: '50%',
                width: '16px',
                height: '16px',
                fontSize: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold',
                border: '1px solid white'
              }}>
                {cartItemCount}
              </span>
            )}
          </button>
          <a href="/login" style={{ 
            padding: '6px 12px', 
            color: '#1e293b', 
            textDecoration: 'none',
            fontWeight: '600',
            borderRadius: '6px',
            transition: 'all 0.2s ease',
            fontSize: '12px',
            whiteSpace: 'nowrap'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#f0fdf4'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            Login
          </a>
          <a href="/signup" style={{
            padding: '8px 16px',
            backgroundColor: '#22c55e',
            color: 'white',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '12px',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 12px rgba(34, 197, 94, 0.3)',
            whiteSpace: 'nowrap'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            Sign Up
          </a>
          <a href="/admin" style={{
            padding: '6px 10px',
            backgroundColor: '#1e293b',
            color: 'white',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '11px',
            fontWeight: '500',
            transition: 'all 0.2s ease',
            whiteSpace: 'nowrap'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = '#374151'}
          onMouseLeave={(e) => e.currentTarget.style.background = '#1e293b'}
          >
            Admin
          </a>
        </div>
      </div>
      
      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
} 