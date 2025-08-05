'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

interface Category {
  id?: string;
  _id?: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
  subcategories: string[];
}

export default function CategoriesSection() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data || []);
      } catch (error) {
        setCategories([
          {
            id: "smartphones",
            name: "Smartphones",
            description: "Latest mobile devices and smartphones",
            image: "📱",
            productCount: 15,
            subcategories: ["iPhone", "Android", "Accessories"]
          },
          {
            id: "laptops",
            name: "Laptops",
            description: "Professional and gaming laptops",
            image: "💻",
            productCount: 12,
            subcategories: ["MacBook", "Windows", "Gaming", "Business"]
          },
          {
            id: "headphones",
            name: "Headphones",
            description: "Wireless and wired audio solutions",
            image: "🎧",
            productCount: 8,
            subcategories: ["Wireless", "Noise Cancelling", "Gaming", "Studio"]
          },
          {
            id: "smartwatches",
            name: "Smartwatches",
            description: "Fitness and health tracking devices",
            image: "⌚",
            productCount: 6,
            subcategories: ["Apple Watch", "Fitness", "Luxury", "Sports"]
          },
          {
            id: "cameras",
            name: "Cameras",
            description: "Professional and amateur photography equipment",
            image: "📷",
            productCount: 10,
            subcategories: ["DSLR", "Mirrorless", "Action", "Lenses"]
          },
          {
            id: "gaming",
            name: "Gaming",
            description: "Gaming consoles and accessories",
            image: "🎮",
            productCount: 7,
            subcategories: ["Consoles", "Controllers", "VR", "PC Gaming"]
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (!loading && categories.length > 0) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-5 blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-5 blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full mb-6 shadow-lg"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Browse Categories</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              Explore by
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Category</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Discover our curated collection across all product categories
            </motion.p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {['All', 'Electronics', 'Fashion', 'Home', 'Sports', 'Books'].map((filter, index) => (
              <motion.button
                key={`filter-${filter}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-5 py-3 bg-gradient-to-r from-purple-50 to-pink-50 backdrop-blur-sm text-purple-700 text-base font-medium rounded-full border border-purple-200/50 hover:from-purple-100 hover:to-pink-100 hover:border-purple-300/70 transition-all duration-300"
              >
                {filter}
              </motion.button>
            ))}
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.id || category._id || `category-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group cursor-pointer"
              >
                <Link href={`/categories/${category.id || category._id || category.name.toLowerCase().replace(/\s+/g, '-')}`}>
                  <div className="bg-white/90 backdrop-blur-sm border border-purple-200/50 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 group-hover:bg-white/95 group-hover:border-purple-300/70 h-80 flex flex-col justify-between">
                    <div>
                      <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-4xl mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 overflow-hidden">
                        {category.image && category.image.startsWith('http') ? (
                          <img 
                            src={category.image} 
                            alt={category.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const nextSibling = target.nextSibling as HTMLElement;
                              if (nextSibling) {
                                nextSibling.style.display = 'flex';
                              }
                            }}
                          />
                        ) : null}
                        <span style={{ display: category.image && category.image.startsWith('http') ? 'none' : 'flex' }}>
                          {category.image || '📦'}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-300">
                        {category.name}
                      </h3>
                      <p className="text-lg text-gray-600 mb-4 line-clamp-2">
                        {category.description}
                      </p>
                    </div>
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-5 py-3 rounded-full text-purple-700 font-medium text-base">
                      {category.productCount} Products
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* View All Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-12"
          >
            <Link href="/categories">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-modern text-lg px-8 py-4 flex items-center space-x-2 mx-auto group"
              >
                <span>View All Categories</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full mb-6"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium">Browse Categories</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Explore by
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Category</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Discover our curated collection across all product categories
          </motion.p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="category-card animate-pulse"
            >
              <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 