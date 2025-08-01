'use client';

import React, { useState, useEffect } from 'react';

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
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-green-100 font-sans">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-green-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">U</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
              UltimateEcommerce
            </span>
          </div>
          <a 
            href="/" 
            className="px-6 py-2 bg-green-600 text-white rounded-full font-medium hover:bg-green-700 transition-all duration-300 hover:shadow-lg hover:scale-105"
          >
            ← Back to Home
          </a>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-block mb-6">
            <span className="text-sm font-semibold text-green-600 bg-green-100 px-4 py-2 rounded-full">
              About Us
            </span>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold mb-8">
            <span className="bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
              Revolutionizing
            </span>
            <br />
            <span className="text-gray-800">Online Shopping</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're building the future of ecommerce with cutting-edge technology, AI-powered recommendations, 
            and an immersive shopping experience that puts customers first.
          </p>
        </div>

        {/* Mission Section */}
        <div className={`mb-20 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-white rounded-3xl p-12 shadow-2xl border border-green-100">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-block mb-6">
                  <span className="text-sm font-semibold text-green-600 bg-green-100 px-4 py-2 rounded-full">
                    Our Mission
                  </span>
                </div>
                <h2 className="text-4xl font-bold text-gray-800 mb-6">
                  Creating the Ultimate
                  <span className="bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent"> Shopping Experience</span>
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
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center">
                <div className="w-48 h-48 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
                  <span className="text-8xl">🎯</span>
                </div>
                <p className="text-green-600 font-semibold text-lg">Driving innovation in ecommerce</p>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className={`mb-20 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-green-600 bg-green-100 px-4 py-2 rounded-full">
              Our Values
            </span>
            <h2 className="text-4xl font-bold text-gray-800 mt-4">
              What Drives Us
              <span className="bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent"> Forward</span>
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
                description: "We're committed to reducing our environmental impact and promoting sustainable shopping practices."
              },
              {
                icon: '🎨',
                title: 'Excellence',
                description: 'We strive for excellence in everything we do, from product quality to customer service.'
              }
            ].map((value, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-2xl p-8 text-center transition-all duration-500 cursor-pointer ${
                  hoveredCard === index 
                    ? 'shadow-2xl transform -translate-y-2 border-2 border-green-500' 
                    : 'shadow-lg border border-green-100 hover:shadow-xl'
                }`}
                onMouseEnter={() => handleCardHover(index)}
                onMouseLeave={handleCardLeave}
              >
                <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center text-4xl transition-all duration-300 ${
                  hoveredCard === index 
                    ? 'bg-gradient-to-br from-green-500 to-green-600 shadow-lg' 
                    : 'bg-green-100'
                }`}>
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className={`mb-20 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-white rounded-3xl p-12 shadow-2xl border border-green-100">
            <div className="text-center mb-12">
              <span className="text-sm font-semibold text-green-600 bg-green-100 px-4 py-2 rounded-full">
                Our Team
              </span>
              <h2 className="text-4xl font-bold text-gray-800 mt-4">
                Meet the
                <span className="bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent"> Innovators</span>
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
                <div 
                  key={index} 
                  className={`text-center p-6 rounded-2xl transition-all duration-500 cursor-pointer ${
                    hoveredTeam === index 
                      ? 'bg-gradient-to-br from-green-500 to-green-600 text-white shadow-2xl transform -translate-y-2' 
                      : 'hover:bg-green-50'
                  }`}
                  onMouseEnter={() => handleTeamHover(index)}
                  onMouseLeave={handleTeamLeave}
                >
                  <div className={`w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center text-4xl transition-all duration-300 ${
                    hoveredTeam === index 
                      ? 'bg-white/20' 
                      : 'bg-green-100'
                  }`}>
                    {member.image}
                  </div>
                  <h3 className={`text-lg font-bold mb-2 ${
                    hoveredTeam === index ? 'text-white' : 'text-gray-800'
                  }`}>
                    {member.name}
                  </h3>
                  <p className={`font-medium mb-3 ${
                    hoveredTeam === index ? 'text-white/90' : 'text-green-600'
                  }`}>
                    {member.role}
                  </p>
                  <p className={`text-sm leading-relaxed ${
                    hoveredTeam === index ? 'text-white/80' : 'text-gray-600'
                  }`}>
                    {member.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className={`mb-20 transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-3xl p-12 text-white shadow-2xl">
            <div className="text-center mb-12">
              <span className="text-sm font-semibold bg-white/20 px-4 py-2 rounded-full">
                Our Impact
              </span>
              <h2 className="text-4xl font-bold mt-4">
                Numbers That
                <span className="text-green-200"> Matter</span>
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {[
                { number: '50K+', label: 'Happy Customers' },
                { number: '1M+', label: 'Products Sold' },
                { number: '99.9%', label: 'Uptime' },
                { number: '4.9/5', label: 'Customer Rating' }
              ].map((stat, index) => (
                <div key={index} className="group">
                  <div className="text-5xl font-bold mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-lg opacity-90 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className={`transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-white rounded-3xl p-12 shadow-2xl border border-green-100 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🚀</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Ready to Experience the
              <span className="bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent"> Future?</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join thousands of customers who have already discovered the ultimate shopping experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/products" 
                className="px-8 py-4 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                Start Shopping Now
              </a>
              <a 
                href="/contact" 
                className="px-8 py-4 bg-white text-green-600 font-semibold rounded-full border-2 border-green-600 hover:bg-green-600 hover:text-white transition-all duration-300"
              >
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 