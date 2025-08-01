'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import Header from '@/components/Header';
import LoadingSpinner from '@/components/LoadingSpinner';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  badge?: string;
  description: string;
  stock: number;
  features: string[];
  specifications: Record<string, string>;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export default function ProductDetailPage() {
  const params = useParams();
  const { addItem } = useCart();
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlist();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (params.id) {
      fetchProduct(params.id as string);
    }
  }, [params.id]);

  const fetchProduct = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/products/${id}`);
      if (response.ok) {
        const data = await response.json();
        setProduct(data);
      } else {
        console.error('Product not found');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image
      });
    }
  };

  const handleWishlistToggle = () => {
    if (product) {
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
    }
  };

  if (loading) {
    return (
      <div style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
        <Header />
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '60vh' 
        }}>
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
        <Header />
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          minHeight: '60vh',
          textAlign: 'center'
        }}>
          <div>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>❌</div>
            <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#374151', marginBottom: '1rem' }}>
              Product not found
            </h2>
            <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>
              The product you're looking for doesn't exist
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
      <Header />

      {/* Product Detail Section */}
      <section style={{
        padding: '4rem 0',
        background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            alignItems: 'start'
          }}>
            {/* Product Images */}
            <div>
              {/* Main Image */}
              <div style={{
                width: '100%',
                height: '500px',
                background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '8rem',
                marginBottom: '1.5rem',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{
                  filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.1))'
                }}>
                  {product.image}
                </div>
                {product.badge && (
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    background: product.badge === 'New' ? '#3b82f6' : 
                             product.badge === 'Best Seller' ? '#f59e0b' :
                             product.badge === 'Hot Deal' ? '#ef4444' :
                             product.badge === 'Limited Time' ? '#8b5cf6' :
                             product.badge === 'Popular' ? '#10b981' : '#6b7280',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '25px',
                    fontSize: '0.875rem',
                    fontWeight: '700',
                    zIndex: 10
                  }}>
                    {product.badge}
                  </div>
                )}
              </div>

              {/* Thumbnail Images */}
              {product.images && product.images.length > 1 && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))',
                  gap: '1rem'
                }}>
                  {product.images.map((image, index) => (
                    <div
                      key={index}
                      style={{
                        width: '80px',
                        height: '80px',
                        background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '2rem',
                        cursor: 'pointer',
                        border: selectedImage === index ? '2px solid #22c55e' : '2px solid transparent',
                        transition: 'all 0.2s ease'
                      }}
                      onClick={() => setSelectedImage(index)}
                    >
                      {product.image}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              {/* Breadcrumb */}
              <div style={{ marginBottom: '1rem' }}>
                <a href="/products" style={{ color: '#6b7280', textDecoration: 'none' }}>
                  Products
                </a>
                <span style={{ margin: '0 0.5rem', color: '#6b7280' }}>›</span>
                <span style={{ color: '#374151', fontWeight: '500' }}>{product.name}</span>
              </div>

              {/* Product Name */}
              <h1 style={{
                fontSize: '2.5rem',
                fontWeight: '800',
                color: '#111827',
                marginBottom: '1rem',
                lineHeight: '1.2'
              }}>
                {product.name}
              </h1>

              {/* Rating */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '2px' }}>
                  {[...Array(5)].map((_, i) => (
                    <span key={i} style={{
                      color: i < Math.floor(product.rating) ? '#fbbf24' : '#e5e7eb',
                      fontSize: '1.25rem'
                    }}>
                      ★
                    </span>
                  ))}
                </div>
                <span style={{ color: '#6b7280', fontSize: '1rem', fontWeight: '500' }}>
                  {product.rating}
                </span>
                <span style={{ color: '#9ca3af', fontSize: '1rem' }}>
                  ({product.reviews.toLocaleString()} reviews)
                </span>
              </div>

              {/* Price */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <span style={{
                  fontSize: '3rem',
                  fontWeight: '800',
                  color: '#22c55e'
                }}>
                  ${product.price}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span style={{
                    fontSize: '1.5rem',
                    color: '#9ca3af',
                    textDecoration: 'line-through'
                  }}>
                    ${product.originalPrice}
                  </span>
                )}
              </div>

              {/* Description */}
              <p style={{
                fontSize: '1.1rem',
                color: '#6b7280',
                lineHeight: '1.6',
                marginBottom: '2rem'
              }}>
                {product.description}
              </p>

              {/* Stock Status */}
              <div style={{ marginBottom: '2rem' }}>
                <span style={{
                  color: product.stock > 0 ? '#22c55e' : '#ef4444',
                  fontWeight: '600',
                  fontSize: '1rem'
                }}>
                  {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                </span>
              </div>

              {/* Quantity */}
              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                  Quantity
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={{
                      width: '40px',
                      height: '40px',
                      border: '1px solid #d1d5db',
                      background: 'white',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '1.25rem',
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
                    color: '#374151',
                    minWidth: '40px',
                    textAlign: 'center'
                  }}>
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    style={{
                      width: '40px',
                      height: '40px',
                      border: '1px solid #d1d5db',
                      background: 'white',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '1.25rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem' }}>
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  style={{
                    flex: 1,
                    padding: '1rem 2rem',
                    backgroundColor: product.stock > 0 ? '#22c55e' : '#9ca3af',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: product.stock > 0 ? 'pointer' : 'not-allowed',
                    fontWeight: '700',
                    fontSize: '1.1rem',
                    transition: 'all 0.2s ease'
                  }} onMouseEnter={(e) => {
                    if (product.stock > 0) {
                      e.currentTarget.style.backgroundColor = '#16a34a';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }
                  }} onMouseLeave={(e) => {
                    if (product.stock > 0) {
                      e.currentTarget.style.backgroundColor = '#22c55e';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }
                  }}>
                  {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>
                <button
                  onClick={handleWishlistToggle}
                  style={{
                    padding: '1rem',
                    backgroundColor: isInWishlist(product.id) ? '#ec4899' : 'transparent',
                    color: isInWishlist(product.id) ? 'white' : '#ec4899',
                    border: '2px solid #ec4899',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem'
                  }} onMouseEnter={(e) => {
                    if (!isInWishlist(product.id)) {
                      e.currentTarget.style.backgroundColor = '#ec4899';
                      e.currentTarget.style.color = 'white';
                    }
                  }} onMouseLeave={(e) => {
                    if (!isInWishlist(product.id)) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#ec4899';
                    }
                  }}>
                  {isInWishlist(product.id) ? '❤️' : '🤍'}
                </button>
              </div>

              {/* Features */}
              {product.features && product.features.length > 0 && (
                <div style={{ marginBottom: '3rem' }}>
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    color: '#111827',
                    marginBottom: '1rem'
                  }}>
                    Key Features
                  </h3>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {product.features.map((feature, index) => (
                      <li key={index} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        marginBottom: '0.75rem',
                        fontSize: '1rem',
                        color: '#6b7280'
                      }}>
                        <span style={{ color: '#22c55e', fontSize: '1.25rem' }}>✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Specifications */}
          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div style={{ marginTop: '4rem' }}>
              <h2 style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '2rem',
                textAlign: 'center'
              }}>
                Specifications
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '2rem'
              }}>
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} style={{
                    background: 'white',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                    border: '1px solid #e5e7eb'
                  }}>
                    <h4 style={{
                      fontSize: '1rem',
                      fontWeight: '600',
                      color: '#374151',
                      marginBottom: '0.5rem',
                      textTransform: 'capitalize'
                    }}>
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </h4>
                    <p style={{
                      fontSize: '1rem',
                      color: '#6b7280'
                    }}>
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
} 