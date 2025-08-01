'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import Header from '@/components/Header';

interface Deal {
  id: string;
  name: string;
  originalPrice: number;
  salePrice: number;
  discount: number;
  image: string;
  category: string;
  endTime: string;
  stock: number;
  sold: number;
  badge: string;
  description: string;
  featured: boolean;
}

export default function DealsPage() {
  const { addItem } = useCart();
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlist();
  const [deals, setDeals] = useState<Deal[]>([]);
  const [filteredDeals, setFilteredDeals] = useState<Deal[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [isLoading, setIsLoading] = useState(true);

  // Simulate deals data loading
  useEffect(() => {
    setTimeout(() => {
      const mockDeals: Deal[] = [
        {
          id: '1',
          name: 'iPhone 15 Pro Max - 256GB',
          originalPrice: 1299.99,
          salePrice: 999.99,
          discount: 23,
          image: '📱',
          category: 'Smartphones',
          endTime: '2024-12-31T23:59:59',
          stock: 15,
          sold: 85,
          badge: 'Flash Sale',
          description: 'Latest iPhone with A17 Pro chip and titanium design',
          featured: true
        },
        {
          id: '2',
          name: 'MacBook Pro 16" M3 Pro',
          originalPrice: 2499.99,
          salePrice: 1999.99,
          discount: 20,
          image: '💻',
          category: 'Laptops',
          endTime: '2024-12-25T23:59:59',
          stock: 8,
          sold: 42,
          badge: 'Limited Time',
          description: 'Powerful laptop for professionals and creators',
          featured: true
        },
        {
          id: '3',
          name: 'Sony WH-1000XM5 Headphones',
          originalPrice: 399.99,
          salePrice: 299.99,
          discount: 25,
          image: '🎧',
          category: 'Headphones',
          endTime: '2024-12-28T23:59:59',
          stock: 25,
          sold: 75,
          badge: 'Best Seller',
          description: 'Industry-leading noise cancellation technology',
          featured: true
        },
        {
          id: '4',
          name: 'Samsung Galaxy S24 Ultra',
          originalPrice: 1299.99,
          salePrice: 1099.99,
          discount: 15,
          image: '📱',
          category: 'Smartphones',
          endTime: '2024-12-30T23:59:59',
          stock: 12,
          sold: 38,
          badge: 'New Arrival',
          description: 'Premium Android flagship with S Pen',
          featured: false
        },
        {
          id: '5',
          name: 'iPad Pro 12.9" M2',
          originalPrice: 1199.99,
          salePrice: 899.99,
          discount: 25,
          image: '📱',
          category: 'Tablets',
          endTime: '2024-12-26T23:59:59',
          stock: 18,
          sold: 62,
          badge: 'Hot Deal',
          description: 'Professional tablet for creative work',
          featured: false
        },
        {
          id: '6',
          name: 'Apple Watch Series 9',
          originalPrice: 449.99,
          salePrice: 349.99,
          discount: 22,
          image: '⌚',
          category: 'Smartwatches',
          endTime: '2024-12-29T23:59:59',
          stock: 30,
          sold: 70,
          badge: 'Popular',
          description: 'Advanced health monitoring and fitness tracking',
          featured: false
        },
        {
          id: '7',
          name: 'Canon EOS R6 Mark II',
          originalPrice: 2799.99,
          salePrice: 2199.99,
          discount: 21,
          image: '📷',
          category: 'Cameras',
          endTime: '2024-12-27T23:59:59',
          stock: 5,
          sold: 15,
          badge: 'Exclusive',
          description: 'Professional mirrorless camera for photographers',
          featured: false
        },
        {
          id: '8',
          name: 'PlayStation 5 Console',
          originalPrice: 499.99,
          salePrice: 399.99,
          discount: 20,
          image: '🎮',
          category: 'Gaming',
          endTime: '2024-12-31T23:59:59',
          stock: 10,
          sold: 90,
          badge: 'Gaming',
          description: 'Next-gen gaming console with DualSense controller',
          featured: true
        }
      ];
      setDeals(mockDeals);
      setFilteredDeals(mockDeals);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Filter and sort deals
  useEffect(() => {
    let filtered = deals;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(deal =>
        deal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deal.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deal.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(deal => deal.category === selectedCategory);
    }

    // Apply sorting
    switch (sortBy) {
      case 'discount':
        filtered = filtered.sort((a, b) => b.discount - a.discount);
        break;
      case 'price':
        filtered = filtered.sort((a, b) => a.salePrice - b.salePrice);
        break;
      case 'ending':
        filtered = filtered.sort((a, b) => new Date(a.endTime).getTime() - new Date(b.endTime).getTime());
        break;
      case 'featured':
      default:
        filtered = filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    setFilteredDeals(filtered);
  }, [deals, searchTerm, selectedCategory, sortBy]);

  const categories = ['all', 'Smartphones', 'Laptops', 'Headphones', 'Tablets', 'Smartwatches', 'Cameras', 'Gaming'];

  const formatTimeLeft = (endTime: string) => {
    const now = new Date().getTime();
    const end = new Date(endTime).getTime();
    const timeLeft = end - now;

    if (timeLeft <= 0) return 'Expired';

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const getStockPercentage = (stock: number, sold: number) => {
    const total = stock + sold;
    return Math.round((stock / total) * 100);
  };

  if (isLoading) {
    return (
      <div style={{ fontFamily: 'Inter, sans-serif', background: '#f8fafc', minHeight: '100vh' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
          <div style={{ textAlign: 'center', padding: '4rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
            <p style={{ color: '#64748b', fontSize: '1.125rem' }}>Loading amazing deals...</p>
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
            Amazing <span style={{
              background: 'linear-gradient(135deg, #22c55e, #16a34a)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>Deals</span>
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#6b7280', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
            Don't miss out on these incredible offers! Limited time deals with massive discounts on premium products.
          </p>
        </div>

        {/* Flash Sale Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
          borderRadius: '16px',
          padding: '2rem',
          marginBottom: '3rem',
          color: 'white',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⚡</div>
          <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' }}>
            Flash Sale Alert!
          </h2>
          <p style={{ fontSize: '1.125rem', opacity: 0.9, marginBottom: '1.5rem' }}>
            Up to 50% off on selected items. These deals won't last long!
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <a href="#deals" style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: 'white',
              color: '#dc2626',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: '600'
            }}>
              Shop Now
            </a>
          </div>
        </div>

        {/* Search and Filter */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '2rem', marginBottom: '3rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: '2rem', alignItems: 'end' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: '500' }}>
                Search Deals
              </label>
              <input
                type="text"
                placeholder="Search by product name or description..."
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
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  background: 'white',
                  minWidth: '150px'
                }}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', color: '#374151', fontWeight: '500' }}>
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  background: 'white',
                  minWidth: '150px'
                }}
              >
                <option value="featured">Featured</option>
                <option value="discount">Highest Discount</option>
                <option value="price">Lowest Price</option>
                <option value="ending">Ending Soon</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div style={{ marginBottom: '2rem' }}>
          <p style={{ color: '#6b7280', fontSize: '1rem' }}>
            Showing {filteredDeals.length} of {deals.length} deals
          </p>
        </div>

        {/* Deals Grid */}
        <div id="deals" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          {filteredDeals.map((deal) => (
            <div key={deal.id} style={{
              background: 'white',
              borderRadius: '16px',
              padding: '2rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease',
              border: deal.featured ? '2px solid #22c55e' : '1px solid #e5e7eb',
              position: 'relative'
            }} onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 20px 25px rgba(0, 0, 0, 0.1)';
            }} onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            }}>
              {/* Badge */}
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: deal.badge === 'Flash Sale' ? '#ef4444' : '#22c55e',
                color: 'white',
                padding: '0.25rem 0.75rem',
                borderRadius: '12px',
                fontSize: '0.75rem',
                fontWeight: '600'
              }}>
                {deal.badge}
              </div>

              {/* Product Image */}
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <div style={{
                  width: '120px',
                  height: '120px',
                  background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '3rem',
                  margin: '0 auto'
                }}>
                  {deal.image}
                </div>
              </div>

              {/* Product Info */}
              <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
                {deal.name}
              </h3>
              <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '1rem' }}>
                {deal.description}
              </p>

              {/* Pricing */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <span style={{ fontSize: '1.5rem', fontWeight: '700', color: '#22c55e' }}>
                  ${deal.salePrice}
                </span>
                <span style={{ fontSize: '1rem', color: '#9ca3af', textDecoration: 'line-through' }}>
                  ${deal.originalPrice}
                </span>
                <span style={{
                  background: '#dcfce7',
                  color: '#15803d',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px',
                  fontSize: '0.875rem',
                  fontWeight: '600'
                }}>
                  -{deal.discount}%
                </span>
              </div>

              {/* Time Left */}
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '1rem' }}>⏰</span>
                  <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Ends in:</span>
                </div>
                <div style={{
                  background: '#fef3c7',
                  color: '#92400e',
                  padding: '0.5rem',
                  borderRadius: '8px',
                  textAlign: 'center',
                  fontWeight: '600'
                }}>
                  {formatTimeLeft(deal.endTime)}
                </div>
              </div>

              {/* Stock Progress */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Stock</span>
                  <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                    {deal.stock} left of {deal.stock + deal.sold}
                  </span>
                </div>
                <div style={{
                  width: '100%',
                  height: '8px',
                  background: '#e5e7eb',
                  borderRadius: '4px',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${getStockPercentage(deal.stock, deal.sold)}%`,
                    height: '100%',
                    background: deal.stock < 5 ? '#ef4444' : '#22c55e',
                    transition: 'width 0.3s ease'
                  }} />
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '1rem' }}>
                <a href={`/products/${deal.id}`} style={{
                  flex: 1,
                  padding: '0.75rem',
                  backgroundColor: '#22c55e',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  textAlign: 'center',
                  fontWeight: '600',
                  transition: 'all 0.2s ease'
                }} onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#16a34a';
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#22c55e';
                }}>
                  View Details
                </a>
                <button 
                  onClick={() => addItem({
                    id: deal.id,
                    name: deal.name,
                    price: deal.salePrice,
                    image: deal.image
                  })}
                  style={{
                    padding: '0.75rem 1rem',
                    backgroundColor: 'transparent',
                    color: '#22c55e',
                    border: '2px solid #22c55e',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    transition: 'all 0.2s ease'
                  }} onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#22c55e';
                    e.currentTarget.style.color = 'white';
                  }} onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#22c55e';
                  }}>
                  🛒
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredDeals.length === 0 && (
          <div style={{ textAlign: 'center', background: 'white', borderRadius: '16px', padding: '4rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>
              No deals found
            </h3>
            <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
              Try adjusting your search terms or filters to find amazing deals.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSortBy('featured');
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
            Want More Amazing Deals?
          </h2>
          <p style={{ fontSize: '1.125rem', color: '#6b7280', marginBottom: '2rem', maxWidth: '600px', margin: '0 auto' }}>
            Sign up for our newsletter to get notified about exclusive deals and flash sales.
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
              Browse All Products
            </a>
            <a href="/categories" style={{
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
              View Categories
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 