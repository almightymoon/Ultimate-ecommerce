'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Search, Filter, Grid, List, Heart, ShoppingCart, Eye, Star, ArrowRight, Clock, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

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

function DealsContent() {
  const { addItem } = useCart();
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlist();
  const searchParams = useSearchParams();
  
  const [deals, setDeals] = useState<Deal[]>([]);
  const [filteredDeals, setFilteredDeals] = useState<Deal[]>([]);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [loading, setLoading] = useState(true);

  // Fetch deals data
  useEffect(() => {
    const fetchDeals = async () => {
      try {
        setLoading(true);
        
        // Fetch deals from API
        const response = await fetch('/api/deals');
        const dealsData = await response.json();
        
        // Transform the data to match our interface
        const transformedDeals: Deal[] = dealsData.map((deal: {
          id: string;
          title: string;
          originalPrice?: number;
          price?: number;
          discount?: number;
          image: string;
          category: string;
          endDate: string;
          stock?: number;
          sold?: number;
          badge?: string;
          description: string;
          featured?: boolean;
        }) => ({
          id: deal.id,
          name: deal.title,
          originalPrice: deal.originalPrice || (deal.price ? deal.price * 1.2 : 100), // Estimate original price
          salePrice: deal.price || (deal.originalPrice ? deal.originalPrice * 0.8 : 80), // Estimate sale price
          discount: deal.discount || 20,
          image: deal.image,
          category: deal.category,
          endTime: deal.endDate,
          stock: deal.stock || 50,
          sold: deal.sold || 0,
          badge: deal.badge || 'Deal',
          description: deal.description,
          featured: deal.featured || false
        }));
        
        setDeals(transformedDeals);
        setFilteredDeals(transformedDeals);
      } catch (error) {
        console.error('Error fetching deals:', error);
        setDeals([]);
        setFilteredDeals([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
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

  const categories = ['all', 'Electronics', 'Fashion', 'Home & Garden'];

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      const searchParams = new URLSearchParams();
      searchParams.set('search', searchTerm.trim());
      window.location.href = `/deals?${searchParams.toString()}`;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Header />
        <div className="pt-32">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
              Hot Deals & Flash Sales
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don&apos;t miss out on these incredible deals! Limited time offers with massive discounts on premium products.
            </p>
          </div>
        </div>
      </section>

      {/* Flash Sale Banner */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl p-6 text-white text-center"
          >
            <div className="flex items-center justify-center space-x-4 mb-4">
              <TrendingUp className="w-8 h-8" />
              <h2 className="text-2xl font-bold">Flash Sale Active!</h2>
            </div>
            <p className="text-lg">Up to 50% off on selected items. Hurry, these deals won&apos;t last!</p>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg">
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              {/* Search */}
              <div className="flex-1 w-full lg:w-auto">
                <form onSubmit={handleSearch} className="relative group">
                  <div className="relative transform transition-all duration-300 ease-in-out group-hover:scale-105">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search deals..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500"
                    />
                  </div>
                </form>
              </div>

              {/* Category Filter */}
              <div className="flex gap-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 bg-white/80 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-gray-900"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 bg-white/80 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-gray-900"
                >
                  <option key="featured" value="featured">Featured</option>
                  <option key="discount" value="discount">Highest Discount</option>
                  <option key="price" value="price">Lowest Price</option>
                  <option key="ending" value="ending">Ending Soon</option>
                </select>

                {/* View Mode */}
                <div className="flex bg-white/80 backdrop-blur-sm border border-white/20 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-3 transition-colors duration-200 ${
                      viewMode === 'grid' ? 'bg-purple-500 text-white' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-3 transition-colors duration-200 ${
                      viewMode === 'list' ? 'bg-purple-500 text-white' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deals Grid */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredDeals.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No Deals Found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
              >
                Clear Filters
              </button>
            </motion.div>
          ) : (
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              {filteredDeals.map((deal, index) => (
                <motion.div
                  key={deal.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`group relative bg-white border border-gray-100 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform-gpu hover:-translate-y-2 ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}
                >
                  {/* Deal Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full">
                      {deal.discount}% OFF
                    </span>
                  </div>

                  {/* Countdown Timer */}
                  <div className="absolute top-4 right-4 z-10">
                    <div className="flex items-center space-x-1 px-2 py-1 bg-black/70 text-white text-xs rounded-full">
                      <Clock className="w-3 h-3" />
                      <span>{formatTimeLeft(deal.endTime)}</span>
                    </div>
                  </div>

                  {/* Product Image */}
                  <div className={`relative overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 ${
                    viewMode === 'list' ? 'w-48 h-48 flex-shrink-0' : 'aspect-[4/3]'
                  }`}>
                    <div className="w-full h-full flex items-center justify-center text-6xl">
                      {deal.image}
                    </div>
                    {/* Image Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Product Info */}
                  <div className={`p-6 flex-1 flex flex-col ${
                    viewMode === 'list' ? 'justify-center' : ''
                  }`}>
                    {/* Category and Rating */}
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-block px-3 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-full">
                        {deal.category}
                      </span>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Product Name */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                      {deal.name}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {deal.description}
                    </p>

                    {/* Pricing */}
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-3xl font-bold text-gray-900">
                          ${deal.salePrice.toFixed(2)}
                        </span>
                        <span className="text-lg text-gray-500 line-through">
                          ${deal.originalPrice.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                          Save ${(deal.originalPrice - deal.salePrice).toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Stock Progress */}
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                        <span>Stock: {deal.stock} left</span>
                        <span>{getStockPercentage(deal.stock, deal.sold)}% remaining</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${getStockPercentage(deal.stock, deal.sold)}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                      <button
                        onClick={() => addItem({
                          id: deal.id,
                          name: deal.name,
                          price: deal.salePrice,
                          image: deal.image
                        })}
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-6 rounded-xl hover:from-purple-600 hover:to-pink-600 transform hover:scale-[1.02] hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                      </button>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            if (isInWishlist(deal.id)) {
                              removeFromWishlist(deal.id);
                            } else {
                              addToWishlist({
                                id: deal.id,
                                name: deal.name,
                                price: deal.salePrice,
                                image: deal.image
                              });
                            }
                          }}
                          className={`flex-1 py-2 px-4 rounded-xl border transition-all duration-300 flex items-center justify-center gap-2 ${
                            isInWishlist(deal.id)
                              ? 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100'
                              : 'border-gray-200 text-gray-600 hover:border-purple-300 hover:text-purple-600'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${isInWishlist(deal.id) ? 'fill-current' : ''}`} />
                          {isInWishlist(deal.id) ? 'Remove' : 'Wishlist'}
                        </button>
                        
                        <button className="flex-1 py-2 px-4 border border-gray-200 text-gray-600 rounded-xl hover:border-purple-300 hover:text-purple-600 transition-all duration-300 flex items-center justify-center gap-2">
                          <Eye className="w-4 h-4" />
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 text-center text-white"
          >
            <h2 className="text-3xl font-bold mb-4">Don&apos;t Miss Out!</h2>
            <p className="text-xl mb-6 opacity-90">
              Subscribe to get notified about new deals and flash sales
            </p>
            <button className="px-8 py-4 bg-white text-purple-600 font-bold rounded-xl hover:bg-gray-100 transition-colors duration-300 flex items-center gap-2 mx-auto">
              <ArrowRight className="w-5 h-5" />
              Subscribe Now
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default function DealsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h1 className="text-xl font-semibold text-gray-900 mb-2">
            Loading deals...
          </h1>
          <p className="text-gray-600">
            Please wait while we load the deals.
          </p>
        </div>
      </div>
    }>
      <DealsContent />
    </Suspense>
  );
} 