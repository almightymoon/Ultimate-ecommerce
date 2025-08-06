'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, MessageCircle, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Tech Enthusiast',
    avatar: '👩‍💻',
    rating: 5,
    content: 'The shopping experience is absolutely incredible! The product quality and customer service exceeded all my expectations.',
    verified: true
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Professional Photographer',
    avatar: '📸',
    rating: 5,
    content: 'As a professional, I need reliable equipment. This platform delivers exactly what I need with stunning quality and fast delivery.',
    verified: true
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Digital Creator',
    avatar: '🎨',
    rating: 5,
    content: 'The shopping experience is seamless and the customer service is outstanding. I love how easy it is to find exactly what I\'m looking for.',
    verified: true
  },
  {
    id: 4,
    name: 'David Thompson',
    role: 'Gaming Streamer',
    avatar: '🎮',
    rating: 5,
    content: 'The gaming section is amazing! I can see all the specs and compare products easily. The delivery was faster than expected.',
    verified: true
  },
  {
    id: 5,
    name: 'Lisa Wang',
    role: 'Fashion Blogger',
    avatar: '👗',
    rating: 5,
    content: 'The mobile experience is perfect for on-the-go shopping. The wishlist feature and notifications keep me updated on my favorite items.',
    verified: true
  },
  {
    id: 6,
    name: 'James Wilson',
    role: 'Software Developer',
    avatar: '💻',
    rating: 5,
    content: 'The technical specifications are detailed and accurate. The comparison tools help me make informed decisions for my development setup.',
    verified: true
  }
];

const stats = [
  { label: 'Happy Customers', value: '50K+', icon: '😊' },
  { label: 'Products Sold', value: '1M+', icon: '📦' },
  { label: 'Average Rating', value: '4.9/5', icon: '⭐' },
  { label: 'Countries Served', value: '150+', icon: '🌍' }
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full mb-6 shadow-lg"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium">Customer Stories</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            What Our
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Customers</span>
            <br />
            Say
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Don&apos;t just take our word for it. Here&apos;s what our satisfied customers have to say about their shopping experience.
          </motion.p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <div className="mb-4">
                <Quote className="w-8 h-8 text-purple-500" />
              </div>
              
              <div className="flex items-center mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              
              <p className="text-gray-700 mb-6 leading-relaxed">
                &quot;{testimonial.content}&quot;
              </p>

              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xl mr-4">
                  {testimonial.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  {testimonial.verified && (
                    <div className="flex items-center mt-1">
                      <span className="text-xs text-purple-600 font-medium">✓ Verified Customer</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-shadow duration-300">
            <span>Join Our Happy Customers</span>
            <span className="ml-2 text-xl">→</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 