'use client';

import React from 'react';
import { useCart } from '@/contexts/CartContext';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const { state, removeItem, updateQuantity, clearCart } = useCart();

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000,
            animation: 'fadeIn 0.3s ease-out'
          }}
          onClick={onClose}
        />
      )}

      {/* Cart Sidebar */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: isOpen ? 0 : '-400px',
          width: '400px',
          height: '100vh',
          background: 'white',
          boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.1)',
          zIndex: 1001,
          transition: 'right 0.3s ease-out',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '1.5rem',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827' }}>
            Shopping Cart ({state.itemCount})
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: '#6b7280',
              padding: '0.5rem'
            }}
          >
            ✕
          </button>
        </div>

        {/* Cart Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
          {state.items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🛒</div>
              <p style={{ color: '#6b7280', marginBottom: '1rem' }}>Your cart is empty</p>
              <button
                onClick={onClose}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#22c55e',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {state.items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    gap: '1rem',
                    padding: '1rem',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    background: '#f9fafb'
                  }}
                >
                  {/* Product Image */}
                  <div 
                    key={`image-${item.id}`}
                    style={{
                      width: '60px',
                      height: '60px',
                      background: '#f3f4f6',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2rem',
                      flexShrink: 0,
                      overflow: 'hidden',
                      position: 'relative'
                    }}
                  >
                    {item.image && item.image.startsWith('http') ? (
                      <img 
                        src={item.image} 
                        alt={item.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                        onError={(e) => {
                          const target = e.currentTarget as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div 
                      style={{
                        display: item.image && item.image.startsWith('http') ? 'none' : 'flex',
                        width: '100%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {item.image || '📦'}
                    </div>
                  </div>

                  {/* Product Details */}
                  <div key={`details-${item.id}`} style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      color: '#111827',
                      marginBottom: '0.25rem',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {item.name}
                    </h3>
                    <p style={{
                      fontSize: '0.875rem',
                      color: '#6b7280',
                      marginBottom: '0.5rem'
                    }}>
                      ${item.price.toFixed(2)}
                    </p>

                    {/* Quantity Controls */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <button
                        key={`decrease-${item.id}`}
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        style={{
                          width: '24px',
                          height: '24px',
                          background: '#f3f4f6',
                          border: '1px solid #d1d5db',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.75rem'
                        }}
                      >
                        -
                      </button>
                      <span 
                        key={`quantity-${item.id}`}
                        style={{
                          fontSize: '0.875rem',
                          fontWeight: '600',
                          minWidth: '20px',
                          textAlign: 'center'
                        }}
                      >
                        {item.quantity}
                      </span>
                      <button
                        key={`increase-${item.id}`}
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        style={{
                          width: '24px',
                          height: '24px',
                          background: '#f3f4f6',
                          border: '1px solid #d1d5db',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.75rem'
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    key={`remove-${item.id}`}
                    onClick={() => removeItem(item.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#ef4444',
                      cursor: 'pointer',
                      padding: '0.25rem',
                      fontSize: '1rem'
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {state.items.length > 0 && (
          <div style={{
            padding: '1.5rem',
            borderTop: '1px solid #e5e7eb',
            background: '#f9fafb'
          }}>
            {/* Subtotal */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '1rem',
              paddingBottom: '1rem',
              borderBottom: '1px solid #e5e7eb'
            }}>
              <span style={{ fontSize: '1rem', color: '#374151' }}>Subtotal:</span>
              <span style={{ fontSize: '1.125rem', fontWeight: '700', color: '#111827' }}>
                ${state.total.toFixed(2)}
              </span>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a
                key="view-cart"
                href="/cart"
                style={{
                  padding: '0.75rem',
                  backgroundColor: '#22c55e',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  textAlign: 'center'
                }}
              >
                View Cart
              </a>
              <a
                key="checkout"
                href="/checkout"
                style={{
                  padding: '0.75rem',
                  backgroundColor: '#1e293b',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  textAlign: 'center'
                }}
              >
                Checkout
              </a>
              <button
                key="clear-cart"
                onClick={clearCart}
                style={{
                  padding: '0.75rem',
                  backgroundColor: 'transparent',
                  color: '#ef4444',
                  border: '1px solid #ef4444',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  cursor: 'pointer'
                }}
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </>
  );
} 