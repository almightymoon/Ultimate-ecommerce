'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AdminAuth from '@/components/AdminAuth';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  ShoppingCart, 
  Settings, 
  BarChart3, 
  MessageSquare, 
  FileText,
  Menu,
  X,
  LogOut,
  User,
  Bell,
  Search,
  ChevronDown,
  Home,
  Tag,
  Star,
  Truck,
  CreditCard,
  TrendingUp,
  Eye,
  DollarSign
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Suppress hydration warnings caused by browser extensions
  useEffect(() => {
    const originalError = console.error;
    console.error = (...args) => {
      if (args[0]?.includes?.('Hydration failed') || args[0]?.includes?.('pronounceRootElement')) {
        return;
      }
      originalError.apply(console, args);
    };
    
    return () => {
      console.error = originalError;
    };
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const navigation = [
    {
      name: 'Dashboard',
      href: '/admin',
      icon: LayoutDashboard,
      current: pathname === '/admin'
    },
    {
      name: 'Products',
      href: '/admin/products',
      icon: Package,
      current: pathname.startsWith('/admin/products')
    },
    {
      name: 'Categories',
      href: '/admin/categories',
      icon: Tag,
      current: pathname.startsWith('/admin/categories')
    },
    {
      name: 'Orders',
      href: '/admin/orders',
      icon: ShoppingCart,
      current: pathname.startsWith('/admin/orders')
    },
    {
      name: 'Customers',
      href: '/admin/customers',
      icon: Users,
      current: pathname.startsWith('/admin/customers')
    },
    {
      name: 'User Management',
      href: '/admin/users',
      icon: Users,
      current: pathname.startsWith('/admin/users')
    },
    {
      name: 'Reviews',
      href: '/admin/reviews',
      icon: Star,
      current: pathname.startsWith('/admin/reviews')
    },
    {
      name: 'Analytics',
      href: '/admin/analytics',
      icon: BarChart3,
      current: pathname.startsWith('/admin/analytics')
    },
    {
      name: 'Reports',
      href: '/admin/reports',
      icon: FileText,
      current: pathname.startsWith('/admin/reports')
    },
    {
      name: 'Settings',
      href: '/admin/settings',
      icon: Settings,
      current: pathname.startsWith('/admin/settings')
    }
  ];

  const stats = [
    { name: 'Total Sales', value: '$45,231', change: '+20.1%', changeType: 'positive', icon: DollarSign },
    { name: 'Orders', value: '2,350', change: '+180.1%', changeType: 'positive', icon: ShoppingCart },
    { name: 'Customers', value: '1,234', change: '+19%', changeType: 'positive', icon: Users },
    { name: 'Products', value: '573', change: '+201', changeType: 'positive', icon: Package }
  ];

  return (
    <AdminAuth>
      <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-56 bg-white shadow-xl transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
            <Link href="/admin" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">U</span>
              </div>
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Ultimate
                </h1>
                <p className="text-xs text-gray-500">Admin Panel</p>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 rounded-md text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  item.current
                    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                <item.icon className={`mr-3 h-5 w-5 ${
                  item.current ? 'text-white' : 'text-gray-400 group-hover:text-blue-500'
                }`} />
                {item.name}
              </Link>
            ))}
          </nav>

          {/* User section */}
          <div className="border-t border-gray-200 p-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">admin@ultimate.com</p>
              </div>
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="p-1 rounded-md text-gray-400 hover:text-gray-600"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
            
            <AnimatePresence>
              {userDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-2 space-y-1"
                >
                  <Link
                    href="/admin/profile"
                    className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-md"
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                  <Link
                    href="/"
                    className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-md"
                  >
                    <Home className="mr-2 h-4 w-4" />
                    View Site
                  </Link>
                  <button 
                    onClick={async () => {
                      try {
                        await fetch('/api/admin/auth/logout', { method: 'POST' });
                        window.location.href = '/admin/login';
                      } catch (error) {
                        console.error('Logout error:', error);
                      }
                    }}
                    className="flex items-center w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 lg:ml-56">
        {/* Top header */}
        <div className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-200">
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
              >
                <Menu className="w-6 h-6" />
              </button>
              
              {/* Search */}
              <div className="ml-4 flex-1 max-w-lg">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <button className="relative p-2 text-gray-400 hover:text-gray-600">
                <Bell className="w-6 h-6" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </button>

              {/* Quick stats */}
              <div className="hidden md:flex items-center space-x-6">
                {stats.slice(0, 2).map((stat) => (
                  <div key={stat.name} className="text-center">
                    <p className="text-sm font-medium text-gray-900">{stat.value}</p>
                    <p className="text-xs text-gray-500">{stat.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          <div className="p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
    </AdminAuth>
  );
}