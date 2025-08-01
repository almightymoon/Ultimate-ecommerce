'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import Header from '@/components/Header';

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
  featured: boolean;
  subcategories: string[];
}

export default function CategoriesPage() {
  const { addItem } = useCart();
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlist();
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);

  // Simulate categories data loading
  useEffect(() => {
    setTimeout(() => {
      const mockCategories: Category[] = [
        {
          id: 'smartphones',
          name: 'Smartphones',
          description: 'Latest mobile phones and accessories from top brands',
          image: '📱',
          productCount: 156,
          featured: true,
          subcategories: ['iPhone', 'Samsung', 'Google Pixel', 'OnePlus', 'Accessories']
        },
        {
          id: 'laptops',
          name: 'Laptops & Computers',
          description: 'High-performance laptops, desktops, and computing accessories',
          image: '💻',
          productCount: 89,
          featured: true,
          subcategories: ['MacBook', 'Dell', 'HP', 'Lenovo', 'Gaming Laptops']
        },
        {
          id: 'headphones',
          name: 'Headphones & Audio',
          description: 'Premium audio equipment for music lovers and professionals',
          image: '🎧',
          productCount: 234,
          featured: true,
          subcategories: ['Wireless', 'Noise Cancelling', 'Gaming', 'Studio', 'Sport']
        },
        {
          id: 'cameras',
          name: 'Cameras & Photography',
          description: 'Professional cameras, lenses, and photography equipment',
          image: '📷',
          productCount: 67,
          featured: false,
          subcategories: ['DSLR', 'Mirrorless', 'Action Cameras', 'Lenses', 'Accessories']
        },
        {
          id: 'smartwatches',
          name: 'Smartwatches & Wearables',
          description: 'Smart watches, fitness trackers, and wearable technology',
          image: '⌚',
          productCount: 123,
          featured: true,
          subcategories: ['Apple Watch', 'Samsung', 'Fitbit', 'Garmin', 'Accessories']
        },
        {
          id: 'gaming',
          name: 'Gaming & Entertainment',
          description: 'Gaming consoles, accessories, and entertainment systems',
          image: '🎮',
          productCount: 98,
          featured: false,
          subcategories: ['PlayStation', 'Xbox', 'Nintendo', 'PC Gaming', 'Accessories']
        },
        {
          id: 'speakers',
          name: 'Speakers & Sound',
          description: 'Home audio systems, portable speakers, and sound equipment',
          image: '🔊',
          productCount: 145,
          featured: false,
          subcategories: ['Bluetooth Speakers', 'Home Theater', 'Portable', 'Smart Speakers']
        },
        {
          id: 'tablets',
          name: 'Tablets & iPads',
          description: 'Tablets, iPads, and mobile computing devices',
          image: '📱',
          productCount: 78,
          featured: false,
          subcategories: ['iPad', 'Samsung Galaxy', 'Amazon Fire', 'Accessories']
        },
        {
          id: 'accessories',
          name: 'Accessories & Peripherals',
          description: 'Essential accessories for all your devices',
          image: '🔌',
          productCount: 456,
          featured: false,
          subcategories: ['Chargers', 'Cables', 'Cases', 'Stands', 'Cables']
        },
        {
          id: 'smart-home',
          name: 'Smart Home',
          description: 'Smart home devices and automation systems',
          image: '🏠',
          productCount: 89,
          featured: false,
          subcategories: ['Smart Speakers', 'Security', 'Lighting', 'Thermostats']
        },
        {
          id: 'drones',
          name: 'Drones & RC',
          description: 'Drones, remote control vehicles, and aerial photography',
          image: '🚁',
          productCount: 34,
          featured: false,
          subcategories: ['Camera Drones', 'Racing Drones', 'RC Cars', 'Accessories']
        }
      ];
      setCategories(mockCategories);
      setFilteredCategories(mockCategories);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter categories based on search and filter
  useEffect(() => {
    let filtered = categories;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.subcategories.some(sub => sub.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply featured filter
    if (selectedFilter === 'featured') {
      filtered = filtered.filter(category => category.featured);
    }

    setFilteredCategories(filtered);
  }, [categories, searchTerm, selectedFilter]);

  if (isLoading) {
    return (
      <div style={{ fontFamily: 'Inter, sans-serif', background: '#f8fafc', minHeight: '100vh' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
            <p style={{ color: '#64748b', fontSize: '1.125rem' }}>Loading categories...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#f8fafc', minHeight: '100vh' }}>
      <Header />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        {/* Hero Section */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '700', color: '#111827', marginBottom: '1rem' }}>
            Browse <span style={{
              background: 'linear-gradient(135deg, #22c55e, #16a34a)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Categories</span>
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#6b7280', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
            Discover our comprehensive range of products organized by category. Find exactly what you're looking for.
          </p>
        </div>

        {/* Search and Filter */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '2rem', marginBottom: '3rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '2rem', alignItems: 'center' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: '500' }}>
                Search Categories
              </label>
              <input
                type="text"
                placeholder="Search by category name, description, or subcategory..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '1rem'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: '500' }}>
                Filter
              </label>
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                style={{
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  background: 'white',
                  minWidth: '150px'
                }}
              >
                <option value="all">All Categories</option>
                <option value="featured">Featured Only</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div style={{ marginBottom: '2rem' }}>
          <p style={{ color: '#6b7280', fontSize: '1rem' }}>
            Showing {filteredCategories.length} of {categories.length} categories
          </p>
        </div>

        {/* Categories Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          {filteredCategories.map((category) => (
            <div key={category.id} style={{
              background: 'white',
              borderRadius: '16px',
              padding: '2rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
              border: category.featured ? '2px solid #22c55e' : '1px solid #e5e7eb'
            }} onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 20px 25px rgba(0, 0, 0, 0.1)';
            }} onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem',
                  marginRight: '1rem'
                }}>
                  {category.image}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#111827' }}>
                      {category.name}
                    </h3>
                    {category.featured && (
                      <span style={{
                        background: '#22c55e',
                        color: 'white',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                        fontWeight: '500'
                      }}>
                        Featured
                      </span>
                    )}
                  </div>
                  <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                    {category.productCount} products
                  </p>
                </div>
              </div>

              <p style={{ color: '#4b5563', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                {category.description}
              </p>

              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.75rem' }}>
                  Popular Subcategories:
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {category.subcategories.slice(0, 4).map((subcategory, index) => (
                    <span key={index} style={{
                      background: '#f3f4f6',
                      color: '#374151',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      fontWeight: '500'
                    }}>
                      {subcategory}
                    </span>
                  ))}
                  {category.subcategories.length > 4 && (
                    <span style={{
                      background: '#f3f4f6',
                      color: '#6b7280',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '4px',
                      fontSize: '0.75rem'
                    }}>
                      +{category.subcategories.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              <a href={`/products?category=${category.id}`} style={{
                display: 'inline-block',
                padding: '0.75rem 1.5rem',
                backgroundColor: '#22c55e',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                transition: 'all 0.2s ease'
              }} onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#16a34a';
              }} onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#22c55e';
              }}>
                Browse {category.name}
              </a>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCategories.length === 0 && (
          <div style={{ textAlign: 'center', background: 'white', borderRadius: '16px', padding: '4rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>
              No categories found
            </h3>
            <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedFilter('all');
              }}
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
              Clear Filters
            </button>
          </div>
        )}

        {/* CTA Section */}
        <div style={{ textAlign: 'center', background: 'white', borderRadius: '16px', padding: '3rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#111827', marginBottom: '1rem' }}>
            Can't Find What You're Looking For?
          </h2>
          <p style={{ fontSize: '1.125rem', color: '#6b7280', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto' }}>
            Browse our complete product catalog or contact our support team for assistance.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
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
              View All Products
            </a>
            <a href="/contact" style={{
              padding: '1rem 2rem',
              backgroundColor: 'transparent',
              color: '#22c55e',
              border: '2px solid #22c55e',
              borderRadius: '12px',
              fontSize: '1.125rem',
              fontWeight: '600',
              cursor: 'pointer',
              textDecoration: 'none',
              display: 'inline-block'
            }}>
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 