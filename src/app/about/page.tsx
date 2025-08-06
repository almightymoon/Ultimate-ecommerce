'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AboutPage() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hoveredTeam, setHoveredTeam] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleCardHover = (index: number) => {
    setHoveredCard(index);
  };

  const handleCardLeave = () => {
    setHoveredCard(null);
  };

  const handleTeamHover = (index: number) => {
    setHoveredTeam(index);
  };

  const handleTeamLeave = () => {
    setHoveredTeam(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />

      <div className="max-w-7xl mx-auto px-6 py-12 pt-32">
        {/* Hero Section */}
        <motion.div 
          className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >

          <h1 className="text-6xl md:text-7xl font-bold mb-8">
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Revolutionizing
            </span>
            <br />
            <span className="text-gray-800">Online Shopping</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We&apos;re building the future of ecommerce with cutting-edge technology, AI-powered recommendations, 
            and an immersive shopping experience that puts customers first.
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div 
          className={`mb-20 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="bg-white border border-gray-200 rounded-3xl p-12 shadow-xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block mb-6">
                  <span className="text-sm font-semibold text-purple-600 bg-purple-100 px-4 py-2 rounded-full">
                    Our Mission
                  </span>
                </div>
                <h2 className="text-4xl font-bold text-gray-800 mb-6">
                  Creating the Ultimate
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Shopping Experience</span>
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  To create the most advanced ecommerce platform that seamlessly blends cutting-edge technology 
                  with exceptional user experience, making online shopping not just convenient, but truly enjoyable.
                </p>
                <div className="space-y-4">
                  {[
                    'AI-powered product recommendations',
                    '3D product visualization',
                    'Seamless checkout experience',
                    'Real-time inventory tracking'
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center">
                <div className="w-48 h-48 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                  <span className="text-8xl">🎯</span>
                </div>
                <p className="text-purple-600 font-semibold text-lg">Driving innovation in ecommerce</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div 
          className={`mb-20 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-purple-600 bg-purple-100 px-4 py-2 rounded-full">
              Our Values
            </span>
            <h2 className="text-4xl font-bold text-gray-800 mt-4">
              What Drives Us
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Forward</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '💡',
                title: 'Innovation',
                description: "We constantly push the boundaries of what's possible in ecommerce, always looking for new ways to enhance the shopping experience."
              },
              {
                icon: '🤝',
                title: 'Customer First',
                description: "Every decision we make is driven by what's best for our customers. Their satisfaction is our ultimate goal."
              },
              {
                icon: '🔒',
                title: 'Trust & Security',
                description: "We prioritize the security and privacy of our customers' data, implementing the highest standards of protection."
              },
              {
                icon: '⚡',
                title: 'Performance',
                description: 'We believe in delivering lightning-fast experiences that keep our customers engaged and satisfied.'
              },
              {
                icon: '🌱',
                title: 'Sustainability',
                description: "We&apos;re committed to reducing our environmental impact and promoting sustainable shopping practices."
              },
              {
                icon: '🎨',
                title: 'Excellence',
                description: 'We strive for excellence in everything we do, from product quality to customer service.'
              }
            ].map((value, index) => (
              <motion.div 
                key={index} 
                className={`bg-white border border-gray-200 rounded-2xl p-8 text-center transition-all duration-500 cursor-pointer ${
                  hoveredCard === index 
                    ? 'shadow-2xl transform -translate-y-2 border-2 border-purple-500' 
                    : 'shadow-lg hover:shadow-xl'
                }`}
                onMouseEnter={() => handleCardHover(index)}
                onMouseLeave={handleCardLeave}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center text-4xl transition-all duration-300 ${
                  hoveredCard === index 
                    ? 'bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg' 
                    : 'bg-purple-100'
                }`}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team Section */}
        <motion.div 
          className={`mb-20 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="bg-white border border-gray-200 rounded-3xl p-12 shadow-xl">
            <div className="text-center mb-12">
              <span className="text-sm font-semibold text-purple-600 bg-purple-100 px-4 py-2 rounded-full">
                Our Team
              </span>
              <h2 className="text-4xl font-bold text-gray-800 mt-4">
                Meet the
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Innovators</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: 'Sarah Johnson',
                  role: 'CEO & Founder',
                  image: '👩‍💼',
                  description: 'Visionary leader with 15+ years in ecommerce and technology.'
                },
                {
                  name: 'Michael Chen',
                  role: 'CTO',
                  image: '👨‍💻',
                  description: 'Tech innovator specializing in AI and machine learning.'
                },
                {
                  name: 'Emily Rodriguez',
                  role: 'Head of Design',
                  image: '👩‍🎨',
                  description: 'Creative director focused on user experience and visual design.'
                },
                {
                  name: 'David Kim',
                  role: 'Head of Operations',
                  image: '👨‍💼',
                  description: 'Operations expert ensuring seamless customer experiences.'
                }
              ].map((member, index) => (
                <motion.div 
                  key={index} 
                  className={`text-center p-6 rounded-2xl transition-all duration-500 cursor-pointer ${
                    hoveredTeam === index 
                      ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white shadow-2xl transform -translate-y-2' 
                      : 'hover:bg-purple-50'
                  }`}
                  onMouseEnter={() => handleTeamHover(index)}
                  onMouseLeave={handleTeamLeave}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  <div className={`w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center text-4xl transition-all duration-300 ${
                    hoveredTeam === index 
                      ? 'bg-white/20' 
                      : 'bg-purple-100'
                  }`}>
                    {member.image}
                  </div>
                  <h3 className={`text-lg font-bold mb-2 ${
                    hoveredTeam === index ? 'text-white' : 'text-gray-800'
                  }`}>
                    {member.name}
                  </h3>
                  <p className={`font-medium mb-3 ${
                    hoveredTeam === index ? 'text-white/90' : 'text-purple-600'
                  }`}>
                    {member.role}
                  </p>
                  <p className={`text-sm leading-relaxed ${
                    hoveredTeam === index ? 'text-white/80' : 'text-gray-600'
                  }`}>
                    {member.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className={`mb-20 transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-12 text-white shadow-2xl">
            <div className="text-center mb-12">
              <span className="text-sm font-semibold bg-white/20 px-4 py-2 rounded-full">
                Our Impact
              </span>
              <h2 className="text-4xl font-bold mt-4">
                Numbers That
                <span className="text-purple-200"> Matter</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {[
                { number: '50K+', label: 'Happy Customers' },
                { number: '1M+', label: 'Products Sold' },
                { number: '99.9%', label: 'Uptime' },
                { number: '4.9/5', label: 'Customer Rating' }
              ].map((stat, index) => (
                <motion.div 
                  key={index} 
                  className="group"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-lg opacity-90 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className={`transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <div className="bg-white border border-gray-200 rounded-3xl p-12 shadow-xl text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🚀</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Ready to Experience the
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Future?</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join thousands of customers who have already discovered the ultimate shopping experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/products" 
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Start Shopping Now
              </Link>
              <Link 
                href="/contact" 
                className="px-8 py-4 bg-white text-purple-600 font-semibold rounded-full border-2 border-purple-600 hover:bg-purple-600 hover:text-white transition-all duration-300"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 