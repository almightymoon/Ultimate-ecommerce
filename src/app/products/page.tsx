'use client';

import React, { useState, useEffect } from 'react';
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

interface Category {
  id: string;
  name: string;
  icon: string;
  count: number;
  color: string;
  gradient: string;
  description: string;
}

export default function ProductsPage() {
  const { addItem } = useCart();
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlist();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [selectedCategory, searchTerm, sortBy, sortOrder, priceRange]);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        category: selectedCategory,
        search: searchTerm,
        sort: sortBy,
        order: sortOrder,
        limit: '50'
      });
      
      const response = await fetch(`/api/products?${params}`);
      const data = await response.json();
      
      // Check if data.products exists and is an array
      if (!data.products || !Array.isArray(data.products)) {
        console.error('Invalid products data received:', data);
        setProducts([]);
        return;
      }
      
      // Filter by price range
      const filteredProducts = data.products.filter((product: Product) => 
        product.price >= priceRange.min && product.price <= priceRange.max
      );
      
      setProducts(filteredProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
  };

  const handleWishlistToggle = (product: Product) => {
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

  return (
    <div style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
      <Header />

      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '4rem 0',
        color: 'white'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', textAlign: 'center' }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
            fontWeight: '800',
            marginBottom: '1rem',
            letterSpacing: '-0.02em'
          }}>
            Our <span style={{
              background: 'linear-gradient(135deg, #ffd700, #ffed4e)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Products</span>
          </h1>
          <p style={{
            fontSize: '1.2rem',
            opacity: 0.9,
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Discover our curated collection of premium products
          </p>
        </div>
      </section>

      {/* Filters and Search */}
      <section style={{
        background: 'white',
        padding: '2rem 0',
        borderBottom: '1px solid #e5e7eb'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            alignItems: 'end'
          }}>
            {/* Search */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                Search Products
              </label>
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  transition: 'border-color 0.2s ease'
                }}
              />
            </div>

            {/* Category Filter */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  backgroundColor: 'white'
                }}
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                Sort By
              </label>
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-');
                  setSortBy(field);
                  setSortOrder(order);
                }}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  backgroundColor: 'white'
                }}
              >
                <option value="name-asc">Name (A-Z)</option>
                <option value="name-desc">Name (Z-A)</option>
                <option value="price-asc">Price (Low to High)</option>
                <option value="price-desc">Price (High to Low)</option>
                <option value="rating-desc">Rating (High to Low)</option>
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
                Price Range: ${priceRange.min} - ${priceRange.max}
              </label>
              <input
                type="range"
                min="0"
                max="5000"
                step="100"
                value={priceRange.max}
                onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                style={{
                  width: '100%',
                  height: '6px',
                  borderRadius: '3px',
                  background: '#e5e7eb',
                  outline: 'none'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section style={{
        padding: '4rem 0',
        background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          {products.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
              <h2 style={{ fontSize: '2rem', fontWeight: '700', color: '#374151', marginBottom: '1rem' }}>
                No products found
              </h2>
              <p style={{ color: '#6b7280', fontSize: '1.1rem' }}>
                Try adjusting your search criteria or browse all categories
              </p>
            </div>
          ) : (
            <>
              <div style={{ marginBottom: '2rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#374151' }}>
                  {products.length} product{products.length !== 1 ? 's' : ''} found
                </h2>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '2rem'
              }}>
                {products.map((product) => (
                  <div key={product.id} style={{
                    background: 'white',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    position: 'relative'
                  }} onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.boxShadow = '0 20px 25px rgba(0, 0, 0, 0.15)';
                  }} onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
                  }}>
                    {/* Badge */}
                    {product.badge && (
                      <div style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        background: product.badge === 'New' ? '#3b82f6' : 
                                 product.badge === 'Best Seller' ? '#f59e0b' :
                                 product.badge === 'Hot Deal' ? '#ef4444' :
                                 product.badge === 'Limited Time' ? '#8b5cf6' :
                                 product.badge === 'Popular' ? '#10b981' : '#6b7280',
                        color: 'white',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        zIndex: 10
                      }}>
                        {product.badge}
                      </div>
                    )}

                    {/* Product Image */}
                    <div style={{
                      width: '100%',
                      height: '240px',
                      background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '4rem',
                      position: 'relative',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        fontSize: '4rem',
                        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
                      }}>
                        {product.image}
                      </div>
                    </div>

                    {/* Product Content */}
                    <div style={{ padding: '1.5rem' }}>
                      {/* Product Name */}
                      <h3 style={{ 
                        fontSize: '1.125rem', 
                        fontWeight: '600', 
                        marginBottom: '0.5rem', 
                        color: '#111827',
                        lineHeight: '1.4',
                        height: '3rem',
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                      }}>
                        {product.name}
                      </h3>

                      {/* Description */}
                      <p style={{ 
                        fontSize: '0.875rem', 
                        color: '#6b7280', 
                        marginBottom: '1rem',
                        lineHeight: '1.4',
                        height: '2.5rem',
                        overflow: 'hidden',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical'
                      }}>
                        {product.description}
                      </p>

                      {/* Rating */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          {[...Array(5)].map((_, i) => (
                            <span key={i} style={{ 
                              color: i < Math.floor(product.rating) ? '#fbbf24' : '#e5e7eb',
                              fontSize: '1rem'
                            }}>
                              ★
                            </span>
                          ))}
                        </div>
                        <span style={{ color: '#6b7280', fontSize: '0.875rem', fontWeight: '500' }}>
                          {product.rating}
                        </span>
                        <span style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
                          ({product.reviews.toLocaleString()} reviews)
                        </span>
                      </div>

                      {/* Price */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                        <span style={{ 
                          fontSize: '1.5rem', 
                          fontWeight: '700', 
                          color: '#22c55e'
                        }}>
                          ${product.price}
                        </span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span style={{ 
                            fontSize: '1rem', 
                            color: '#9ca3af', 
                            textDecoration: 'line-through'
                          }}>
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>

                      {/* Actions */}
                      <div style={{ display: 'flex', gap: '0.75rem' }}>
                        <button 
                          onClick={() => handleAddToCart(product)}
                          style={{
                            flex: 1,
                            padding: '0.875rem',
                            backgroundColor: '#22c55e',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0.5rem',
                            cursor: 'pointer',
                            fontWeight: '600',
                            fontSize: '0.875rem',
                            transition: 'all 0.2s ease'
                          }} onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#16a34a';
                            e.currentTarget.style.transform = 'translateY(-1px)';
                          }} onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '#22c55e';
                            e.currentTarget.style.transform = 'translateY(0)';
                          }}>
                          Add to Cart
                        </button>
                        <button 
                          onClick={() => handleWishlistToggle(product)}
                          style={{
                            padding: '0.875rem',
                            backgroundColor: isInWishlist(product.id) ? '#ec4899' : 'transparent',
                            color: isInWishlist(product.id) ? 'white' : '#ec4899',
                            border: '1px solid #ec4899',
                            borderRadius: '0.5rem',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.25rem'
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
                        <a href={`/products/${product.id}`} style={{
                          padding: '0.875rem',
                          backgroundColor: 'transparent',
                          color: '#3b82f6',
                          border: '1px solid #3b82f6',
                          borderRadius: '0.5rem',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          fontSize: '0.875rem',
                          fontWeight: '500',
                          textDecoration: 'none',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }} onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#3b82f6';
                          e.currentTarget.style.color = 'white';
                        }} onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = '#3b82f6';
                        }}>
                          View
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
} 