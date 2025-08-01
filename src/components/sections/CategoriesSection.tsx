"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { 
  DevicePhoneMobileIcon,
  ComputerDesktopIcon,
  CameraIcon,
  MusicalNoteIcon,
  ClockIcon,
  CpuChipIcon,
  SpeakerWaveIcon,
  DeviceTabletIcon
} from '@heroicons/react/24/outline';

const categories = [
  {
    id: 1,
    name: 'Smartphones',
    icon: DevicePhoneMobileIcon,
    description: 'Latest mobile devices',
    productCount: 156,
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 2,
    name: 'Laptops',
    icon: ComputerDesktopIcon,
    description: 'High-performance computers',
    productCount: 89,
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 3,
    name: 'Cameras',
    icon: CameraIcon,
    description: 'Professional photography',
    productCount: 234,
    color: 'from-green-500 to-green-600'
  },
  {
    id: 4,
    name: 'Headphones',
    icon: MusicalNoteIcon,
    description: 'Premium audio experience',
    productCount: 178,
    color: 'from-red-500 to-red-600'
  },
  {
    id: 5,
    name: 'Smartwatches',
    icon: ClockIcon,
    description: 'Connected timepieces',
    productCount: 92,
    color: 'from-yellow-500 to-yellow-600'
  },
  {
    id: 6,
    name: 'Gaming',
    icon: CpuChipIcon,
    description: 'Gaming accessories',
    productCount: 145,
    color: 'from-pink-500 to-pink-600'
  },
  {
    id: 7,
    name: 'Speakers',
    icon: SpeakerWaveIcon,
    description: 'Home audio systems',
    productCount: 67,
    color: 'from-indigo-500 to-indigo-600'
  },
  {
    id: 8,
    name: 'Tablets',
    icon: DeviceTabletIcon,
    description: 'Portable computing',
    productCount: 123,
    color: 'from-orange-500 to-orange-600'
  }
];

export function CategoriesSection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Shop by{' '}
            <span className="gradient-text">Category</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover our curated collection of premium products across all categories
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group cursor-pointer"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-br ${category.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {category.description}
                </p>
                <div className="text-xs text-primary-600 dark:text-primary-400 font-medium">
                  {category.productCount} products
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary"
          >
            View All Categories
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
} 