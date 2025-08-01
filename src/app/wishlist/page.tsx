'use client';

import React from 'react';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import Header from '@/components/Header';

export default function WishlistPage() {
  const { state, removeItem, clearWishlist, shareWishlist } = useWishlist();
  const { addItem } = useCart();

  const handleAddToCart = (item: any) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      description: item.description,
      category: item.category
    });
  };

  const handleRemoveFromWishlist = (id: string) => {
    removeItem(id);
  };

  if (state.items.length === 0) {
    return (
      <div style={{ fontFamily: 'Inter, sans-serif', background: '#f8fafc', minHeight: '100vh' }}>
        <Header />
        
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '60vh',
          textAlign: 'center',
          padding: '2rem'
        }}>
          <div style={{ fontSize: '6rem', marginBottom: '2rem' }}>❤️</div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#111827', marginBottom: '1rem' }}>
            Your wishlist is empty
          </h1>
          <p style={{ fontSize: '1.125rem', color: '#6b7280', marginBottom: '2rem', maxWidth: '400px' }}>
            Start adding items to your wishlist to save them for later!
          </p>
          <a href="/products" style={{
            padding: '1rem 2rem',
            backgroundColor: '#22c55e',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '1.125rem',
            fontWeight: '600',
            cursor: 'pointer',
            textDecoration: 'none',
            display: 'inline-block'
          }}>
            Start Shopping
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#f8fafc', minHeight: '100vh' }}>
      <Header />
      
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        {/* Header */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#111827', marginBottom: '0.5rem' }}>
              My Wishlist
            </h1>
            <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>
              {state.items.length} item{state.items.length !== 1 ? 's' : ''} in your wishlist
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              onClick={shareWishlist}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              📤 Share Wishlist
            </button>
            <button
              onClick={clearWishlist}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: 'transparent',
                color: '#ef4444',
                border: '1px solid #ef4444',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Wishlist Items */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '2rem' 
        }}>
          {state.items.map((item) => (
            <div
              key={item.id}
              style={{
                background: 'white',
                borderRadius: '16px',
                padding: '1.5rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 20px 25px rgba(0, 0, 0, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
              }}
            >
              {/* Remove Button */}
              <button
                onClick={() => handleRemoveFromWishlist(item.id)}
                style={{
                  position: 'absolute',
                  top: '1rem',
                  right: '1rem',
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ef4444',
                  fontSize: '1rem'
                }}
              >
                ✕
              </button>

              {/* Product Image */}
              <div style={{
                width: '100%',
                height: '200px',
                background: '#f3f4f6',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '4rem',
                marginBottom: '1rem'
              }}>
                {item.image}
              </div>

              {/* Product Info */}
              <div style={{ marginBottom: '1rem' }}>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '0.5rem',
                  lineHeight: '1.4'
                }}>
                  {item.name}
                </h3>
                {item.description && (
                  <p style={{
                    color: '#6b7280',
                    fontSize: '0.875rem',
                    lineHeight: '1.5',
                    marginBottom: '0.5rem'
                  }}>
                    {item.description}
                  </p>
                )}
                {item.category && (
                  <span style={{
                    background: '#f3f4f6',
                    color: '#374151',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: '500'
                  }}>
                    {item.category}
                  </span>
                )}
              </div>

              {/* Price */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1rem'
              }}>
                <span style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: '#111827'
                }}>
                  ${item.price.toFixed(2)}
                </span>
                <span style={{
                  fontSize: '0.75rem',
                  color: '#6b7280'
                }}>
                  Added {new Date(item.addedAt).toLocaleDateString()}
                </span>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  onClick={() => handleAddToCart(item)}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    backgroundColor: '#22c55e',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                >
                  Add to Cart
                </button>
                <a
                  href={`/products/${item.id}`}
                  style={{
                    padding: '0.75rem 1rem',
                    backgroundColor: 'transparent',
                    color: '#22c55e',
                    border: '1px solid #22c55e',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    textAlign: 'center'
                  }}
                >
                  View
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '2rem',
          marginTop: '2rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
                Wishlist Summary
              </h3>
              <p style={{ color: '#6b7280' }}>
                Total value: ${state.items.reduce((sum, item) => sum + item.price, 0).toFixed(2)}
              </p>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={() => {
                  state.items.forEach(item => handleAddToCart(item));
                }}
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#22c55e',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                Add All to Cart
              </button>
              <a
                href="/products"
                style={{
                  padding: '0.75rem 1.5rem',
                  backgroundColor: 'transparent',
                  color: '#22c55e',
                  border: '1px solid #22c55e',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  textDecoration: 'none'
                }}
              >
                Continue Shopping
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 