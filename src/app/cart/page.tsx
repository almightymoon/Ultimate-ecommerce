'use client';

import React from 'react';
import { useCart } from '@/contexts/CartContext';
import Header from '@/components/Header';

export default function CartPage() {
  const { state, removeItem, updateQuantity, clearCart } = useCart();

  if (state.items.length === 0) {
    return (
      <div style={{ fontFamily: 'Inter, sans-serif', background: '#f8fafc', minHeight: '100vh' }}>
        {/* Header */}
        <header style={{
          background: 'white',
          borderBottom: '1px solid #e5e7eb',
          padding: '1rem 0',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button style={{ padding: '8px 16px', color: '#374151' }}>← Continue Shopping</button>
            </div>
          </div>
        </header>

        {/* Empty Cart */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '60vh',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '6rem', marginBottom: '2rem' }}>🛒</div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#111827', marginBottom: '1rem' }}>
            Your cart is empty
          </h1>
          <p style={{ fontSize: '1.125rem', color: '#6b7280', marginBottom: '2rem', maxWidth: '400px' }}>
            Looks like you haven't added any items to your cart yet. Start shopping to discover amazing products!
          </p>
          <button style={{
            padding: '1rem 2rem',
            backgroundColor: '#22c55e',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '1.125rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}>
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#f8fafc', minHeight: '100vh' }}>
      {/* Header */}
      <header style={{
        background: 'white',
        borderBottom: '1px solid #e5e7eb',
        padding: '1rem 0',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button style={{ padding: '8px 16px', color: '#374151' }}>← Continue Shopping</button>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
          {/* Cart Items */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#111827' }}>
                Shopping Cart ({state.itemCount} items)
              </h1>
              <button
                onClick={clearCart}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: 'transparent',
                  color: '#ef4444',
                  border: '1px solid #ef4444',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '0.875rem'
                }}
              >
                Clear Cart
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {state.items.map((item) => (
                <div key={`${item.id}-${item.variant?.id || 'default'}`} style={{
                  background: 'white',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  display: 'flex',
                  gap: '1.5rem',
                  alignItems: 'center',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
                }}>
                  {/* Product Image */}
                  <div style={{
                    width: '120px',
                    height: '120px',
                    background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '3rem',
                    flexShrink: 0
                  }}>
                    {item.image}
                  </div>

                  {/* Product Info */}
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
                      {item.name}
                    </h3>
                    {item.variant && (
                      <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                        Color: {item.variant.name}
                      </p>
                    )}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span style={{ fontSize: '1.25rem', fontWeight: '700', color: '#22c55e' }}>
                        ${item.price}
                      </span>
                      {item.originalPrice && item.originalPrice > item.price && (
                        <span style={{ 
                          fontSize: '1rem', 
                          color: '#9ca3af', 
                          textDecoration: 'line-through' 
                        }}>
                          ${item.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      style={{
                        width: '36px',
                        height: '36px',
                        border: '1px solid #e5e7eb',
                        background: 'white',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '1.125rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      -
                    </button>
                    <span style={{ 
                      fontSize: '1.125rem', 
                      fontWeight: '600', 
                      minWidth: '40px', 
                      textAlign: 'center' 
                    }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      style={{
                        width: '36px',
                        height: '36px',
                        border: '1px solid #e5e7eb',
                        background: 'white',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '1.125rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      +
                    </button>
                  </div>

                  {/* Total Price */}
                  <div style={{ textAlign: 'right', minWidth: '100px' }}>
                    <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#111827' }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                    {item.originalPrice && (
                      <div style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
                        Save ${((item.originalPrice - item.price) * item.quantity).toFixed(2)}
                      </div>
                    )}
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    style={{
                      padding: '0.5rem',
                      backgroundColor: 'transparent',
                      color: '#ef4444',
                      border: 'none',
                      cursor: 'pointer',
                      fontSize: '1.25rem',
                      borderRadius: '8px',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div style={{ position: 'sticky', top: '100px' }}>
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '2rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827', marginBottom: '1.5rem' }}>
                Order Summary
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6b7280' }}>
                  <span>Subtotal ({state.itemCount} items)</span>
                  <span>${state.total.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6b7280' }}>
                  <span>Shipping</span>
                  <span style={{ color: '#22c55e', fontWeight: '600' }}>Free</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#6b7280' }}>
                  <span>Tax</span>
                  <span>${(state.total * 0.08).toFixed(2)}</span>
                </div>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  fontSize: '1.25rem', 
                  fontWeight: '700', 
                  color: '#111827',
                  borderTop: '1px solid #e5e7eb',
                  paddingTop: '1rem'
                }}>
                  <span>Total</span>
                  <span>${(state.total * 1.08).toFixed(2)}</span>
                </div>
              </div>

              <button style={{
                width: '100%',
                padding: '1rem',
                backgroundColor: '#22c55e',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '1.125rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                marginBottom: '1rem'
              }}>
                Proceed to Checkout
              </button>

              <button style={{
                width: '100%',
                padding: '1rem',
                backgroundColor: 'transparent',
                color: '#22c55e',
                border: '2px solid #22c55e',
                borderRadius: '12px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}>
                Continue Shopping
              </button>

              {/* Security Badge */}
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '0.5rem',
                marginTop: '1.5rem',
                padding: '1rem',
                background: '#f0fdf4',
                borderRadius: '8px',
                color: '#15803d'
              }}>
                <span>🔒</span>
                <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>
                  Secure checkout with SSL encryption
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 