'use client';

import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import Header from '@/components/Header';

export default function HomePage() {
  const { addItem } = useCart();
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlist();
  const [activeTab, setActiveTab] = useState('Best Seller');

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
  };

  const handleWishlistToggle = (product: any) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image
      });
    }
  };

  return (
    <div style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif', background: '#ffffff', minHeight: '100vh' }}>
      <Header />

      {/* Hero Section - Clean Design */}
      <section style={{
        background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
        padding: '5rem 0',
        marginBottom: '4rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',
          background: 'radial-gradient(circle at 20% 80%, rgba(34, 197, 94, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)',
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem', position: 'relative', zIndex: 10 }}>
          <div style={{
            background: 'white',
            borderRadius: '24px',
            padding: '4rem',
            textAlign: 'center',
            boxShadow: '0 20px 40px rgba(34, 197, 94, 0.1)',
            border: '1px solid rgba(34, 197, 94, 0.1)'
          }}>
            <div style={{
              display: 'inline-block',
              background: 'linear-gradient(135deg, #22c55e, #16a34a)',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '50px',
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '2rem',
              boxShadow: '0 8px 25px rgba(34, 197, 94, 0.3)'
            }}>
              ✨ Limited Time Offer
            </div>
            
            <h1 style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: '800',
              color: '#1e293b',
              marginBottom: '1.5rem',
              lineHeight: '1.2'
            }}>
              Discover Your
              <br />
              <span style={{ color: '#22c55e' }}>Perfect Style</span>
            </h1>
            
            <p style={{
              fontSize: '1.25rem',
              color: '#64748b',
              marginBottom: '3rem',
              maxWidth: '600px',
              margin: '0 auto 3rem auto',
              lineHeight: '1.6'
            }}>
              Experience the future of fashion with our curated collection of premium products
            </p>

            {/* Product Showcase */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '2rem',
              marginBottom: '3rem',
              flexWrap: 'wrap'
            }}>
              {['👕', '👟', '👜', '⌚'].map((icon, index) => (
                <div
                  key={index}
                  style={{
                    width: '100px',
                    height: '100px',
                    background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2.5rem',
                    border: '2px solid rgba(34, 197, 94, 0.2)',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(34, 197, 94, 0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {icon}
                </div>
              ))}
            </div>

            <button style={{
              background: 'linear-gradient(135deg, #22c55e, #16a34a)',
              color: 'white',
              border: 'none',
              padding: '1.25rem 2.5rem',
              borderRadius: '50px',
              fontSize: '1.125rem',
              fontWeight: '700',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              transition: 'all 0.3s ease',
              boxShadow: '0 10px 30px rgba(34, 197, 94, 0.3)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              🛍️ Start Shopping Now
              <span style={{ fontSize: '1.5rem' }}>→</span>
            </button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section style={{ marginBottom: '4rem' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            color: '#1e293b',
            textAlign: 'center',
            marginBottom: '3rem'
          }}>
            Explore Categories
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem'
          }}>
            {[
              { name: 'Fashion', icon: '👗', gradient: 'linear-gradient(135deg, #22c55e, #16a34a)' },
              { name: 'Electronics', icon: '📱', gradient: 'linear-gradient(135deg, #22c55e, #15803d)' },
              { name: 'Home & Living', icon: '🏠', gradient: 'linear-gradient(135deg, #16a34a, #15803d)' },
              { name: 'Sports', icon: '⚽', gradient: 'linear-gradient(135deg, #15803d, #166534)' },
              { name: 'Beauty', icon: '💄', gradient: 'linear-gradient(135deg, #166534, #14532d)' },
              { name: 'Books', icon: '📚', gradient: 'linear-gradient(135deg, #14532d, #052e16)' }
            ].map((category, index) => (
              <div
                key={index}
                style={{
                  background: 'white',
                  borderRadius: '20px',
                  padding: '2rem',
                  textAlign: 'center',
                  border: '2px solid #f0fdf4',
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px) scale(1.05)';
                  e.currentTarget.style.boxShadow = '0 25px 50px rgba(34, 197, 94, 0.15)';
                  e.currentTarget.style.borderColor = '#22c55e';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.05)';
                  e.currentTarget.style.borderColor = '#f0fdf4';
                }}
              >
                <div style={{
                  width: '80px',
                  height: '80px',
                  background: category.gradient,
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2.5rem',
                  margin: '0 auto 1.5rem',
                  boxShadow: '0 10px 30px rgba(34, 197, 94, 0.2)'
                }}>
                  {category.icon}
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: '#1e293b',
                  marginBottom: '0.5rem'
                }}>
                  {category.name}
                </h3>
                <p style={{
                  color: '#64748b',
                  fontSize: '0.875rem'
                }}>
                  Discover amazing products
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section style={{ marginBottom: '4rem' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
          <h2 style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            color: '#1e293b',
            textAlign: 'center',
            marginBottom: '3rem'
          }}>
            Featured Products
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            {[
              {
                name: 'Premium Wireless Headphones',
                price: 299.99,
                originalPrice: 399.99,
                rating: 4.8,
                reviews: 1247,
                image: '🎧',
                badge: 'Best Seller',
                gradient: 'linear-gradient(135deg, #22c55e, #16a34a)'
              },
              {
                name: 'Smart Fitness Watch',
                price: 199.99,
                originalPrice: 249.99,
                rating: 4.9,
                reviews: 892,
                image: '⌚',
                badge: 'New',
                gradient: 'linear-gradient(135deg, #16a34a, #15803d)'
              },
              {
                name: 'Designer Leather Bag',
                price: 159.99,
                originalPrice: 199.99,
                rating: 4.7,
                reviews: 567,
                image: '👜',
                badge: 'Limited',
                gradient: 'linear-gradient(135deg, #15803d, #166534)'
              }
            ].map((product, index) => (
              <div
                key={index}
                style={{
                  background: 'white',
                  borderRadius: '24px',
                  padding: '2rem',
                  border: '2px solid #f0fdf4',
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 25px 50px rgba(34, 197, 94, 0.15)';
                  e.currentTarget.style.borderColor = '#22c55e';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.05)';
                  e.currentTarget.style.borderColor = '#f0fdf4';
                }}
              >
                {/* Badge */}
                <div style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                  color: 'white',
                  padding: '6px 12px',
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  zIndex: 10
                }}>
                  {product.badge}
                </div>

                {/* Product Image */}
                <div style={{
                  width: '100%',
                  height: '200px',
                  background: product.gradient,
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '4rem',
                  marginBottom: '1.5rem',
                  boxShadow: '0 10px 30px rgba(34, 197, 94, 0.2)'
                }}>
                  {product.image}
                </div>

                {/* Product Info */}
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: '700',
                  color: '#1e293b',
                  marginBottom: '1rem',
                  lineHeight: '1.4'
                }}>
                  {product.name}
                </h3>

                {/* Rating */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    {[...Array(5)].map((_, i) => (
                      <span key={i} style={{
                        color: i < Math.floor(product.rating) ? '#22c55e' : '#e5e7eb',
                        fontSize: '1rem'
                      }}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span style={{ color: '#64748b', fontSize: '0.875rem', fontWeight: '600' }}>
                    {product.rating}
                  </span>
                  <span style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
                    ({product.reviews.toLocaleString()} reviews)
                  </span>
                </div>

                {/* Price */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                  <span style={{
                    fontSize: '1.75rem',
                    fontWeight: '800',
                    color: '#22c55e'
                  }}>
                    ${product.price}
                  </span>
                  <span style={{
                    fontSize: '1.125rem',
                    color: '#9ca3af',
                    textDecoration: 'line-through'
                  }}>
                    ${product.originalPrice}
                  </span>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <button
                    onClick={() => handleAddToCart(product)}
                    style={{
                      flex: 1,
                      padding: '1rem',
                      background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '12px',
                      cursor: 'pointer',
                      fontWeight: '700',
                      fontSize: '0.9rem',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 4px 15px rgba(34, 197, 94, 0.3)'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleWishlistToggle(product)}
                    style={{
                      padding: '1rem',
                      background: isInWishlist(product.name) ? '#fef2f2' : '#f0fdf4',
                      color: isInWishlist(product.name) ? '#ef4444' : '#22c55e',
                      border: `2px solid ${isInWishlist(product.name) ? '#fecaca' : '#bbf7d0'}`,
                      borderRadius: '12px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      fontSize: '1.25rem'
                    }}
                  >
                    {isInWishlist(product.name) ? '❤️' : '🤍'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers Section */}
      <section style={{ marginBottom: '4rem' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
            borderRadius: '24px',
            padding: '3rem',
            border: '2px solid rgba(34, 197, 94, 0.1)',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: '800',
              color: '#1e293b',
              marginBottom: '1rem'
            }}>
              🎉 Special Offers
            </h2>
            <p style={{
              fontSize: '1.25rem',
              color: '#64748b',
              marginBottom: '2rem'
            }}>
              Get up to 70% off on selected items
            </p>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '2rem',
              flexWrap: 'wrap'
            }}>
              <div style={{
                background: 'white',
                padding: '1.5rem 2rem',
                borderRadius: '16px',
                border: '2px solid rgba(34, 197, 94, 0.2)',
                boxShadow: '0 4px 12px rgba(34, 197, 94, 0.1)'
              }}>
                <div style={{ fontSize: '2rem', fontWeight: '800', color: '#22c55e' }}>70%</div>
                <div style={{ color: '#64748b', fontSize: '0.875rem' }}>OFF</div>
              </div>
              <div style={{
                background: 'white',
                padding: '1.5rem 2rem',
                borderRadius: '16px',
                border: '2px solid rgba(34, 197, 94, 0.2)',
                boxShadow: '0 4px 12px rgba(34, 197, 94, 0.1)'
              }}>
                <div style={{ fontSize: '2rem', fontWeight: '800', color: '#22c55e' }}>24h</div>
                <div style={{ color: '#64748b', fontSize: '0.875rem' }}>LEFT</div>
              </div>
              <div style={{
                background: 'white',
                padding: '1.5rem 2rem',
                borderRadius: '16px',
                border: '2px solid rgba(34, 197, 94, 0.2)',
                boxShadow: '0 4px 12px rgba(34, 197, 94, 0.1)'
              }}>
                <div style={{ fontSize: '2rem', fontWeight: '800', color: '#22c55e' }}>500+</div>
                <div style={{ color: '#64748b', fontSize: '0.875rem' }}>ITEMS</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section style={{ marginBottom: '4rem' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{
            background: 'white',
            borderRadius: '24px',
            padding: '3rem',
            border: '2px solid #f0fdf4',
            textAlign: 'center',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)'
          }}>
            <h2 style={{
              fontSize: '2.5rem',
              fontWeight: '800',
              color: '#1e293b',
              marginBottom: '1rem'
            }}>
              Stay Updated
            </h2>
            <p style={{
              fontSize: '1.25rem',
              color: '#64748b',
              marginBottom: '2rem'
            }}>
              Get exclusive deals and new arrivals delivered to your inbox
            </p>
            <div style={{
              display: 'flex',
              gap: '1rem',
              maxWidth: '500px',
              margin: '0 auto',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}>
              <input
                type="email"
                placeholder="Enter your email"
                style={{
                  flex: 1,
                  minWidth: '250px',
                  padding: '1rem 1.5rem',
                  borderRadius: '12px',
                  fontSize: '16px',
                  background: 'white',
                  color: '#1e293b',
                  border: '2px solid #e5e7eb',
                  outline: 'none',
                  transition: 'all 0.2s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = '#22c55e'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              />
              <button style={{
                padding: '1rem 2rem',
                background: 'linear-gradient(135deg, #22c55e, #16a34a)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                cursor: 'pointer',
                fontWeight: '700',
                fontSize: '1rem',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(34, 197, 94, 0.3)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
