'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import { useAuth } from '@/contexts/AuthContext';
import { ShoppingCart, Heart, Search, Menu, X, Bell, LogOut } from 'lucide-react';

export default function Header() {
  const { state: cartState } = useCart();
  const { state: wishlistState } = useWishlist();
  const auth = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if we're on a page with white background
  const whiteBgPages = ['/products', '/categories', '/cart', '/wishlist', '/login', '/signup', '/about', '/contact', '/deals', '/checkout'];
  const isOnWhiteBg = whiteBgPages.some(page => pathname?.startsWith(page)) || 
                     (typeof window !== 'undefined' && whiteBgPages.some(page => window.location.pathname.startsWith(page)));

  // Check if we're on admin pages
  const isOnAdminPage = pathname?.startsWith('/admin') || 
                       (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin'));

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check for admin authentication
  useEffect(() => {
    const checkAdminStatus = () => {
      const adminToken = localStorage.getItem('adminToken');
      setIsAdmin(!!adminToken);
    };

    // Check initially
    checkAdminStatus();

    // Listen for storage changes (when token is added/removed)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'adminToken') {
        checkAdminStatus();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Also listen for custom events (for same-tab changes)
    const handleCustomStorageChange = () => {
      checkAdminStatus();
    };

    window.addEventListener('adminTokenChanged', handleCustomStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('adminTokenChanged', handleCustomStorageChange);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Use Next.js router for better navigation
      const searchParams = new URLSearchParams();
      searchParams.set('search', searchQuery.trim());
      window.location.href = `/products?${searchParams.toString()}`;
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch(e as React.FormEvent);
    }
  };

  const handleLogout = () => {
    if (isAdmin) {
      // Admin logout
      localStorage.removeItem('adminToken');
      setIsAdmin(false);
      // Dispatch custom event to notify other components
      window.dispatchEvent(new Event('adminTokenChanged'));
      router.push('/admin/login');
    } else {
      // Regular user logout
      auth.logout();
    }
  };

  // Determine header styling based on background
  const getHeaderClasses = () => {
    // Always use solid background on admin pages
    if (isOnAdminPage) {
      return 'bg-white shadow-lg border-b border-gray-200';
    }
    
    if (isOnWhiteBg || isScrolled) {
      return 'bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-lg';
    }
    return 'bg-transparent border-b border-transparent';
  };



  const getIconColor = () => {
    // Always use dark icons on admin pages
    if (isOnAdminPage) {
      return 'text-gray-600 hover:text-purple-600';
    }
    
    if (isOnWhiteBg || isScrolled) {
      return 'text-gray-600 hover:text-purple-600';
    }
    return 'text-white hover:text-purple-300';
  };

  const getSearchInputClasses = () => {
    // Always use consistent search input styling on admin pages
    if (isOnAdminPage) {
      return 'w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500';
    }
    
    if (isOnWhiteBg || isScrolled) {
      return 'w-full pl-10 pr-4 py-2 bg-gray-100 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-500';
    }
    return 'w-full pl-10 pr-4 py-2 bg-white/90 backdrop-blur-sm border border-white/30 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-gray-900 placeholder-gray-600';
  };

  // Get user display info
  const getUserDisplay = () => {
    if (isAdmin) {
      return {
        name: 'Admin User',
        email: 'admin@ultimate.com',
        initial: 'A'
      };
    } else if (auth.state.user) {
      return {
        name: auth.state.user.name || 'User',
        email: auth.state.user.email || '',
        initial: auth.state.user.name?.charAt(0) || 'U'
      };
    }
    return {
      name: 'Guest',
      email: '',
      initial: 'G'
    };
  };

  const userDisplay = getUserDisplay();

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${getHeaderClasses()}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:scale-110 transition-transform duration-300">
                U
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Ultimate
              </h1>
              <p className={`text-xs -mt-1 ${isOnAdminPage ? 'text-gray-600' : (isOnWhiteBg || isScrolled ? 'text-gray-600' : 'text-gray-300')}`}>E-Commerce</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 ml-12">
            <Link href="/" className={`font-medium transition-colors duration-200 ${isOnAdminPage ? 'text-gray-700 hover:text-purple-600' : (isOnWhiteBg || isScrolled ? 'text-gray-700 hover:text-purple-600' : 'text-white hover:text-purple-300')}`}>
              Home
            </Link>
            <Link href="/products" className={`font-medium transition-colors duration-200 ${isOnAdminPage ? 'text-gray-700 hover:text-purple-600' : (isOnWhiteBg || isScrolled ? 'text-gray-700 hover:text-purple-600' : 'text-white hover:text-purple-300')}`}>
              Products
            </Link>
            <Link href="/categories" className={`font-medium transition-colors duration-200 ${isOnAdminPage ? 'text-gray-700 hover:text-purple-600' : (isOnWhiteBg || isScrolled ? 'text-gray-700 hover:text-purple-600' : 'text-white hover:text-purple-300')}`}>
              Categories
            </Link>
            <Link href="/deals" className={`font-medium transition-colors duration-200 ${isOnAdminPage ? 'text-gray-700 hover:text-purple-600' : (isOnWhiteBg || isScrolled ? 'text-gray-700 hover:text-purple-600' : 'text-white hover:text-purple-300')}`}>
              Deals
            </Link>
            <Link href="/about" className={`font-medium transition-colors duration-200 ${isOnAdminPage ? 'text-gray-700 hover:text-purple-600' : (isOnWhiteBg || isScrolled ? 'text-gray-700 hover:text-purple-600' : 'text-white hover:text-purple-300')}`}>
              About
            </Link>
            <Link href="/contact" className={`font-medium transition-colors duration-200 ${isOnAdminPage ? 'text-gray-700 hover:text-purple-600' : (isOnWhiteBg || isScrolled ? 'text-gray-700 hover:text-purple-600' : 'text-white hover:text-purple-300')}`}>
              Contact
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative w-full group">
              <div className="relative transition-all duration-500 ease-in-out  group-hover:shadow-lg group-hover:shadow-purple-500/20  group-hover:z-10">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-purple-500 transition-colors duration-300`} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  onKeyPress={handleSearchKeyPress}
                  className={getSearchInputClasses()}
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-1 rounded-full hover:scale-110 transition-transform duration-200"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className={`relative p-2 transition-colors duration-200 group ${getIconColor()}`}>
              <Bell className="w-6 h-6" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <div className="absolute top-full right-0 mt-2 w-80 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-white/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-800">Notifications</h3>
                    <span className="text-xs text-gray-500">2 new</span>
                  </div>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg border border-purple-100">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        🎉
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">New deals available!</p>
                        <p className="text-xs text-gray-600 mt-1">Up to 70% off on premium products</p>
                        <p className="text-xs text-gray-400 mt-1">2 minutes ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        📦
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">Your order has shipped</p>
                        <p className="text-xs text-gray-600 mt-1">Order #12345 is on its way</p>
                        <p className="text-xs text-gray-400 mt-1">1 hour ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <div className="w-full text-sm text-purple-600 hover:text-purple-700 font-medium cursor-pointer">
                      View all notifications
                    </div>
                  </div>
                </div>
              </div>
            </button>

            {/* Wishlist */}
            <Link href="/wishlist" className={`relative p-2 transition-colors duration-200 group ${getIconColor()}`}>
              <Heart className="w-6 h-6" />
              {wishlistState.items.length > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center font-semibold">
                  {wishlistState.items.length > 99 ? '99+' : wishlistState.items.length}
                </div>
              )}
            </Link>

            {/* Cart */}
            <Link href="/cart" className={`relative p-2 transition-colors duration-200 group ${getIconColor()}`}>
              <ShoppingCart className="w-6 h-6" />
              {cartState.itemCount > 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-purple-500 rounded-full text-xs text-white flex items-center justify-center font-semibold">
                  {cartState.itemCount > 99 ? '99+' : cartState.itemCount}
                </div>
              )}
            </Link>

            {/* User Menu */}
            <div className="relative group">
              <button className={`flex items-center space-x-2 p-2 transition-colors duration-200 ${getIconColor()}`}>
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {userDisplay.initial}
                </div>
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute top-full right-0 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-xl shadow-xl border border-white/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <div className="p-2">
                  {isAdmin ? (
                    <>
                      {/* Admin User Info */}
                      <div className="px-3 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{userDisplay.name}</p>
                        <p className="text-xs text-gray-500">{userDisplay.email}</p>
                      </div>
                      
                      {/* Admin Options */}
                      <Link href="/admin" className="block px-3 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors duration-200">
                        Admin Dashboard
                      </Link>
                      <Link href="/admin/products" className="block px-3 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors duration-200">
                        Manage Products
                      </Link>
                      <Link href="/admin/orders" className="block px-3 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors duration-200">
                        Manage Orders
                      </Link>
                      <Link href="/" className="block px-3 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors duration-200">
                        View Site
                      </Link>
                      
                      {/* Admin Logout */}
                      <button 
                        onClick={handleLogout}
                        className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </>
                  ) : auth.state.isAuthenticated ? (
                    <>
                      {/* Regular User Info */}
                      <div className="px-3 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{userDisplay.name}</p>
                        <p className="text-xs text-gray-500">{userDisplay.email}</p>
                      </div>
                      
                      {/* Authenticated User Options */}
                      <Link href="/profile" className="block px-3 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors duration-200">
                        Profile
                      </Link>
                      <Link href="/orders" className="block px-3 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors duration-200">
                        My Orders
                      </Link>
                      <Link href="/wishlist" className="block px-3 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors duration-200">
                        Wishlist
                      </Link>
                      <Link href="/settings" className="block px-3 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors duration-200">
                        Settings
                      </Link>
                      
                      {/* Regular User Logout */}
                      <button 
                        onClick={handleLogout}
                        className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      {/* Guest User Options */}
                      <Link href="/login" className="block px-3 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors duration-200">
                        Login
                      </Link>
                      <Link href="/signup" className="block px-3 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors duration-200">
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`lg:hidden p-2 transition-colors duration-200 ${getIconColor()}`}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mb-4">
          <form onSubmit={handleSearch} className="relative group">
            <div className="relative transition-all duration-500 ease-in-out group-hover:w-[180%] group-hover:shadow-lg group-hover:shadow-purple-500/20 group-hover:-translate-x-12 group-hover:z-10">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-purple-500 transition-colors duration-300`} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleSearchInputChange}
                onKeyPress={handleSearchKeyPress}
                className={getSearchInputClasses()}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-1 rounded-full hover:scale-110 transition-transform duration-200"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </header>
  );
}