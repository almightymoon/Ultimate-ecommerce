'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Search, Filter, Grid, List, Heart, ShoppingCart, Eye, Star } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image?: string; // Make optional since we have images array
  category: string;
  badge?: string;
  description: string;
  stock: number;
  features?: string[];
  specifications?: Record<string, string>;
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

function ProductsContent() {
  const { addItem } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();
  const searchParams = useSearchParams();
  
  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]); // Store all products
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); // Store filtered products
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch categories
        const categoriesResponse = await fetch('/api/categories');
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);
        
        // Fetch products
        const productsResponse = await fetch('/api/products');
        const productsData = await productsResponse.json();
        
        if (productsData.products && Array.isArray(productsData.products)) {
          setAllProducts(productsData.products);
          setFilteredProducts(productsData.products);
        } else {
          setAllProducts([]);
          setFilteredProducts([]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setAllProducts([]);
        setFilteredProducts([]);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Only run once on mount

  // Separate effect for filtering and sorting
  useEffect(() => {
    if (allProducts.length > 0) {
      const filtered = allProducts.filter((product: Product) => {
        const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             product.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
        
        return matchesCategory && matchesSearch && matchesPrice;
      });

      // Sort products
      const sorted = [...filtered].sort((a, b) => {
        switch (sortBy) {
          case 'name':
            return sortOrder === 'asc' 
              ? a.name.localeCompare(b.name)
              : b.name.localeCompare(a.name);
          case 'price':
            return sortOrder === 'asc' 
              ? a.price - b.price
              : b.price - a.price;
          case 'rating':
            return sortOrder === 'asc' 
              ? a.rating - b.rating
              : b.rating - a.rating;
          default:
            return 0;
        }
      });

      setFilteredProducts(sorted);
    }
  }, [selectedCategory, searchTerm, sortBy, sortOrder, priceRange]); // Removed allProducts from dependencies

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images && product.images[0] ? product.images[0] : '📦'
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
        image: product.images && product.images[0] ? product.images[0] : '📦'
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Header />
        <div className="pt-20">
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
              Discover Amazing Products
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our curated collection of premium products with cutting-edge technology and exceptional quality.
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg">
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              {/* Search */}
              <div className="flex-1 w-full lg:w-auto">
                <div className="relative group">
                  <div className="relative transform transition-all duration-300 ease-in-out group-hover:scale-105">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/80 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500"
                    />
                  </div>
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex gap-4">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 bg-white/80 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-gray-900"
                >
                  <option value="all">All Categories</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>

                {/* Sort */}
                <select
                  value={`${sortBy}-${sortOrder}`}
                  onChange={(e) => {
                    const [sort, order] = e.target.value.split('-');
                    setSortBy(sort);
                    setSortOrder(order);
                  }}
                  className="px-4 py-3 bg-white/80 backdrop-blur-sm border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-gray-900"
                >
                  <option key="name-asc" value="name-asc">Name A-Z</option>
                  <option key="name-desc" value="name-desc">Name Z-A</option>
                  <option key="price-asc" value="price-asc">Price Low-High</option>
                  <option key="price-desc" value="price-desc">Price High-Low</option>
                  <option key="rating-desc" value="rating-desc">Rating High-Low</option>
                </select>
              </div>

              {/* Price Range */}
              <div className="flex items-center gap-4">
                <span className="text-gray-900 font-medium">Price:</span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                    className="w-20 px-3 py-2 bg-white/80 backdrop-blur-sm border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500"
                  />
                                      <span className="text-gray-600">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                    className="w-20 px-3 py-2 bg-white/80 backdrop-blur-sm border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500"
                  />
                </div>
              </div>

              {/* View Mode */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    viewMode === 'grid'
                      ? 'bg-purple-500 text-white'
                      : 'bg-white/80 backdrop-blur-sm border border-white/20 text-gray-800 hover:bg-purple-50'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    viewMode === 'list'
                      ? 'bg-purple-500 text-white'
                      : 'bg-white/80 backdrop-blur-sm border border-white/20 text-gray-800 hover:bg-purple-50'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {filteredProducts.length} products found
            </h2>
          </div>

          {/* Products Grid */}
          <div className={`grid gap-8 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {filteredProducts.map((product, index) => (
              <motion.div 
                key={product.id} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative bg-white border border-gray-100 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform-gpu flex flex-col h-full"
              >
                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-4 left-4 z-20">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white shadow-lg ${
                      product.badge === 'New' ? 'bg-blue-500' : 
                      product.badge === 'Best Seller' ? 'bg-yellow-500' :
                      product.badge === 'Hot Deal' ? 'bg-red-500' :
                      product.badge === 'Trending' ? 'bg-purple-500' :
                      product.badge === 'Professional' ? 'bg-indigo-500' :
                      'bg-gray-500'
                    }`}>
                      {product.badge}
                    </span>
                  </div>
                )}

                {/* Quick Actions */}
                <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <button
                    onClick={() => handleWishlistToggle(product)}
                    className={`p-3 rounded-full backdrop-blur-sm transition-all duration-300 shadow-xl hover:scale-110 ${
                      isInWishlist(product.id)
                        ? 'bg-red-500 text-white shadow-red-500/50'
                        : 'bg-white/95 text-gray-600 hover:bg-red-500 hover:text-white hover:shadow-red-500/50'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                  </button>
                  <a
                    href={`/products/${product.id}`}
                    className="p-3 rounded-full bg-white/95 backdrop-blur-sm text-gray-600 hover:bg-purple-500 hover:text-white hover:shadow-purple-500/50 transition-all duration-300 shadow-xl hover:scale-110"
                  >
                    <Eye className="w-4 h-4" />
                  </a>
                </div>

                {/* Product Image Container */}
                <div className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 flex-shrink-0">
                  <div className="aspect-[4/3] relative overflow-hidden">
                    {product.images && product.images[0] && product.images[0].startsWith('http') ? (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-8xl transition-all duration-700 group-hover:scale-110 group-hover:rotate-1">
                        {product.images && product.images[0] ? product.images[0] : '📦'}
                      </div>
                    )}
                    {/* Image Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6 flex-1 flex flex-col">
                  {/* Category and Rating Row */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-block px-3 py-1 bg-purple-50 text-purple-700 text-xs font-medium rounded-full">
                      {product.category}
                    </span>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                    </div>
                  </div>

                  {/* Product Name */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 flex-1">
                    <a 
                      href={`/products/${product.id}`}
                      className="hover:text-purple-600 transition-colors duration-300 cursor-pointer"
                    >
                      {product.name}
                    </a>
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
                    {product.description}
                  </p>

                  {/* Price Section */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-3xl font-bold text-gray-900">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className="text-lg text-gray-500 line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full">
                          Save ${(product.originalPrice - product.price).toFixed(2)}
                        </span>
                        <span className="text-xs text-gray-500">
                          {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% off
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3 mb-4">
                    {/* Primary Action - Add to Cart */}
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-4 px-6 rounded-2xl hover:from-purple-600 hover:to-pink-600 transform hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-xl relative overflow-hidden group"
                    >
                      {/* Button Background Animation */}
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                      
                      {/* Button Content */}
                      <div className="relative z-10 flex items-center gap-3">
                        <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                        <span className="text-lg">Add to Cart</span>
                      </div>
                    </button>

                    {/* Secondary Actions Row */}
                    <div className="flex gap-2">
                      {/* Quick View Button */}
                      <a
                        href={`/products/${product.id}`}
                        className="flex-1 bg-white border-2 border-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-xl hover:border-purple-500 hover:text-purple-600 hover:bg-purple-50 transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg group"
                      >
                        <Eye className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                        <span>Quick View</span>
                      </a>

                      {/* Wishlist Button */}
                      <button
                        onClick={() => handleWishlistToggle(product)}
                        className={`p-3 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg group ${
                          isInWishlist(product.id)
                            ? 'bg-red-50 border-red-300 text-red-600 hover:bg-red-100'
                            : 'bg-white border-gray-200 text-gray-600 hover:border-purple-500 hover:text-purple-600 hover:bg-purple-50'
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${isInWishlist(product.id) ? 'fill-current' : ''} group-hover:scale-110 transition-transform duration-300`} />
                      </button>
                    </div>
                  </div>

                  {/* Availability and Shipping */}
                  <div className="flex items-center justify-between text-sm pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        product.stock > 0 ? 'bg-purple-500' : 'bg-red-500'
                      }`}></div>
                      <span className={`font-medium ${
                        product.stock > 0 ? 'text-purple-600' : 'text-red-600'
                      }`}>
                        {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                    <span className="text-gray-500 flex items-center gap-1">
                      <span className="text-purple-500">🚚</span>
                      Free shipping
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && !loading && (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or browse all categories.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h1 className="text-xl font-semibold text-gray-900 mb-2">
            Loading products...
          </h1>
          <p className="text-gray-600">
            Please wait while we load the products.
          </p>
        </div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}