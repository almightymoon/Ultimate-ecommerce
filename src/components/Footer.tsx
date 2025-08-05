'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900"></div>
      
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            
          {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">U</span>
                </div>
          <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Ultimate
                  </h3>
                  <p className="text-sm text-gray-400">E-Commerce</p>
                </div>
              </div>
              
              <p className="text-gray-300 leading-relaxed mb-6">
                Experience the future of online shopping with cutting-edge technology, 
                AI-powered recommendations, and seamless checkout.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3 text-gray-300">
                  <Phone className="w-4 h-4 text-purple-400" />
                  <span className="text-sm">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <Mail className="w-4 h-4 text-purple-400" />
                  <span className="text-sm">support@ultimate.com</span>
            </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <MapPin className="w-4 h-4 text-purple-400" />
                  <span className="text-sm">123 Commerce St, Digital City</span>
                </div>
              </div>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {[
                  { icon: Facebook, href: '#', label: 'Facebook' },
                  { icon: Twitter, href: '#', label: 'Twitter' },
                  { icon: Instagram, href: '#', label: 'Instagram' },
                  { icon: Linkedin, href: '#', label: 'LinkedIn' },
                  { icon: Youtube, href: '#', label: 'YouTube' }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg flex items-center justify-center text-gray-300 hover:text-white hover:bg-purple-500/20 hover:border-purple-500/50 transition-all duration-300 group"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  </a>
                ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
              <h4 className="text-lg font-semibold text-white mb-6">Quick Links</h4>
              <ul className="space-y-3">
              {[
                { href: '/products', label: 'All Products' },
                { href: '/categories', label: 'Categories' },
                { href: '/deals', label: 'Deals & Offers' },
                { href: '/about', label: 'About Us' },
                  { href: '/contact', label: 'Contact' },
                  { href: '/blog', label: 'Blog' }
              ].map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-300 text-sm group flex items-center"
                    >
                      <span className="w-1 h-1 bg-purple-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {link.label}
                    </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
              <h4 className="text-lg font-semibold text-white mb-6">Customer Service</h4>
              <ul className="space-y-3">
              {[
                { href: '/faq', label: 'FAQ' },
                { href: '/contact', label: 'Contact Support' },
                { href: '/shipping', label: 'Shipping Info' },
                { href: '/returns', label: 'Returns & Exchanges' },
                  { href: '/privacy', label: 'Privacy Policy' },
                  { href: '/terms', label: 'Terms of Service' }
              ].map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-300 text-sm group flex items-center"
                    >
                      <span className="w-1 h-1 bg-purple-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    {link.label}
                    </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
              <h4 className="text-lg font-semibold text-white mb-6">Stay Updated</h4>
              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                Subscribe to our newsletter for the latest products, exclusive offers, and tech insights.
              </p>
              
              <form className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-purple-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Subscribe Now
              </button>
              </form>
              
              <div className="mt-6 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-gray-300 text-sm">Join 50K+ subscribers</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-gray-400 text-sm">
                © 2024 Ultimate E-Commerce. All rights reserved.
          </div>
          
              <div className="flex items-center space-x-6 text-sm">
                <Link href="/terms" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Terms of Service
                </Link>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Privacy Policy
                </Link>
                <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Cookie Policy
                </Link>
          </div>

              <div className="flex items-center space-x-2 text-gray-400 text-sm">
                <span>Made with</span>
                <div className="w-4 h-4 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-pulse"></div>
                <span>by Ultimate Team</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
} 