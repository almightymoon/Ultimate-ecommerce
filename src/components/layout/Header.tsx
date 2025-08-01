"use client";

import React, { useState, useEffect } from 'react';
import { 
  ShoppingCartIcon, 
  HeartIcon, 
  UserIcon, 
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon,
  BellIcon
} from '@heroicons/react/24/outline';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // TODO: Implement search functionality
      console.log('Searching for:', searchQuery);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  // Handle theme toggle
  const toggleTheme = () => {
    console.log('Theme toggle clicked');
  };

  const getThemeIcon = () => {
    return <SunIcon style={{ width: '20px', height: '20px' }} />;
  };

  return (
    <header className="header">
      <div className="header-content">
        {/* Logo */}
        <div className="logo">
          <a href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <div style={{ 
              width: '32px', 
              height: '32px', 
              background: 'linear-gradient(135deg, #22c55e, #16a34a)', 
              borderRadius: '8px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              marginRight: '8px'
            }}>
              <span style={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}>U</span>
            </div>
            <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#22c55e' }}>UltimateEcommerce</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="nav">
          <a href="/">Home</a>
          <a href="/products">Products</a>
          <a href="/categories">Categories</a>
          <a href="/deals">Deals</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </nav>

        {/* Desktop Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Search */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            style={{ padding: '8px', color: '#374151', cursor: 'pointer' }}
          >
            <MagnifyingGlassIcon style={{ width: '20px', height: '20px' }} />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            style={{ padding: '8px', color: '#374151', cursor: 'pointer' }}
          >
            {getThemeIcon()}
          </button>

          {/* Cart */}
          <button style={{ padding: '8px', color: '#374151', cursor: 'pointer', position: 'relative' }}>
            <ShoppingCartIcon style={{ width: '20px', height: '20px' }} />
            <span style={{ 
              position: 'absolute', 
              top: '-4px', 
              right: '-4px', 
              width: '20px', 
              height: '20px', 
              backgroundColor: '#22c55e', 
              color: 'white', 
              fontSize: '12px', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              0
            </span>
          </button>

          {/* Wishlist */}
          <button style={{ padding: '8px', color: '#374151', cursor: 'pointer', position: 'relative' }}>
            <HeartIcon style={{ width: '20px', height: '20px' }} />
            <span style={{ 
              position: 'absolute', 
              top: '-4px', 
              right: '-4px', 
              width: '20px', 
              height: '20px', 
              backgroundColor: '#ec4899', 
              color: 'white', 
              fontSize: '12px', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              0
            </span>
          </button>

          {/* User Menu */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <a
              href="/login"
              style={{ padding: '8px 16px', color: '#374151', textDecoration: 'none' }}
            >
              Login
            </a>
            <a
              href="/register"
              style={{ 
                padding: '8px 16px', 
                backgroundColor: '#22c55e', 
                color: 'white', 
                borderRadius: '8px', 
                textDecoration: 'none' 
              }}
            >
              Sign Up
            </a>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{ padding: '8px', color: '#374151', cursor: 'pointer' }}
          >
            {isMobileMenuOpen ? (
              <XMarkIcon style={{ width: '24px', height: '24px' }} />
            ) : (
              <Bars3Icon style={{ width: '24px', height: '24px' }} />
            )}
          </button>
        </div>
      </div>

      {/* Search Bar */}
      {isSearchOpen && (
        <div style={{ padding: '16px', borderTop: '1px solid #e5e7eb' }}>
          <form onSubmit={handleSearch} style={{ position: 'relative' }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products, categories, brands..."
              style={{ 
                width: '100%', 
                padding: '12px 16px 12px 48px', 
                backgroundColor: '#f3f4f6', 
                border: '1px solid #d1d5db', 
                borderRadius: '8px', 
                fontSize: '16px' 
              }}
            />
            <MagnifyingGlassIcon style={{ 
              position: 'absolute', 
              left: '16px', 
              top: '50%', 
              transform: 'translateY(-50%)', 
              width: '20px', 
              height: '20px', 
              color: '#9ca3af' 
            }} />
          </form>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div style={{ 
          backgroundColor: 'white', 
          borderTop: '1px solid #e5e7eb', 
          padding: '24px 16px' 
        }}>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
            <a href="/" style={{ color: '#374151', textDecoration: 'none' }}>Home</a>
            <a href="/products" style={{ color: '#374151', textDecoration: 'none' }}>Products</a>
            <a href="/categories" style={{ color: '#374151', textDecoration: 'none' }}>Categories</a>
            <a href="/deals" style={{ color: '#374151', textDecoration: 'none' }}>Deals</a>
            <a href="/about" style={{ color: '#374151', textDecoration: 'none' }}>About</a>
            <a href="/contact" style={{ color: '#374151', textDecoration: 'none' }}>Contact</a>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '16px', borderTop: '1px solid #e5e7eb' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button onClick={toggleTheme} style={{ padding: '8px', color: '#374151', cursor: 'pointer' }}>
                {getThemeIcon()}
              </button>
              <button style={{ padding: '8px', color: '#374151', cursor: 'pointer' }}>
                <ShoppingCartIcon style={{ width: '20px', height: '20px' }} />
              </button>
              <button style={{ padding: '8px', color: '#374151', cursor: 'pointer' }}>
                <HeartIcon style={{ width: '20px', height: '20px' }} />
              </button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <a href="/login" style={{ padding: '8px 16px', color: '#374151', textDecoration: 'none' }}>
                Login
              </a>
              <a href="/register" style={{ 
                padding: '8px 16px', 
                backgroundColor: '#22c55e', 
                color: 'white', 
                borderRadius: '8px', 
                textDecoration: 'none' 
              }}>
                Sign Up
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
} 