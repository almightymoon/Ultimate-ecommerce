'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Package, 
  TrendingUp, 
  TrendingDown,
  Eye,
  Star,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  LineChart,
  PieChart
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState([
    {
      name: 'Total Sales',
      value: '$0',
      change: '+0%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'from-blue-600 to-indigo-600'
    },
    {
      name: 'Orders',
      value: '0',
      change: '+0%',
      changeType: 'positive',
      icon: ShoppingCart,
      color: 'from-indigo-600 to-purple-600'
    },
    {
      name: 'Customers',
      value: '0',
      change: '+0%',
      changeType: 'positive',
      icon: Users,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Products',
      value: '0',
      change: '+0',
      changeType: 'positive',
      icon: Package,
      color: 'from-sky-500 to-blue-500'
    }
  ]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch products count
        const productsResponse = await fetch('/api/admin/products');
        const productsData = await productsResponse.json();
        
        // Fetch orders count (we'll create this API)
        const ordersResponse = await fetch('/api/admin/orders');
        const ordersData = await ordersResponse.json();
        
        // Fetch customers count (we'll create this API)
        const customersResponse = await fetch('/api/admin/customers');
        const customersData = await customersResponse.json();
        
        // Calculate total sales from orders
        const totalSales = ordersData.success ? 
          ordersData.orders.reduce((sum: number, order: any) => sum + (order.total || 0), 0) : 0;
        
        // Update stats with real data
        setStats([
          {
            name: 'Total Sales',
            value: `$${totalSales.toLocaleString()}`,
            change: '+20.1%',
            changeType: 'positive',
            icon: DollarSign,
            color: 'from-blue-600 to-indigo-600'
          },
          {
            name: 'Orders',
            value: ordersData.success ? ordersData.orders.length.toString() : '0',
                          change: '+180.1%',
              changeType: 'positive',
              icon: ShoppingCart,
              color: 'from-indigo-600 to-purple-600'
          },
          {
            name: 'Customers',
            value: customersData.success ? customersData.customers.length.toString() : '0',
                          change: '+19%',
              changeType: 'positive',
              icon: Users,
              color: 'from-blue-500 to-cyan-500'
          },
          {
            name: 'Products',
            value: productsData.success ? productsData.products.length.toString() : '0',
                          change: '+201',
              changeType: 'positive',
              icon: Package,
              color: 'from-sky-500 to-blue-500'
          }
        ]);
        
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);



  const recentOrders = [
    {
      id: 'ORD-001',
      customer: 'John Doe',
      email: 'john@example.com',
      amount: 299.99,
      status: 'delivered',
      date: '2024-01-15'
    },
    {
      id: 'ORD-002',
      customer: 'Jane Smith',
      email: 'jane@example.com',
      amount: 199.99,
      status: 'processing',
      date: '2024-01-14'
    },
    {
      id: 'ORD-003',
      customer: 'Mike Johnson',
      email: 'mike@example.com',
      amount: 599.99,
      status: 'shipped',
      date: '2024-01-13'
    },
    {
      id: 'ORD-004',
      customer: 'Sarah Wilson',
      email: 'sarah@example.com',
      amount: 149.99,
      status: 'pending',
      date: '2024-01-12'
    }
  ];

  const topProducts = [
    {
      name: 'Premium Wireless Headphones',
      sales: 234,
      revenue: 69999.66,
      rating: 4.5
    },
    {
      name: 'Smart Fitness Watch',
      sales: 189,
      revenue: 37799.11,
      rating: 4.3
    },
    {
      name: 'Wireless Earbuds',
      sales: 156,
      revenue: 23399.44,
      rating: 4.7
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'text-green-600 bg-green-100';
      case 'shipped':
        return 'text-blue-600 bg-blue-100';
      case 'processing':
        return 'text-yellow-600 bg-yellow-100';
      case 'pending':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-4 h-4" />;
      case 'shipped':
        return <Package className="w-4 h-4" />;
      case 'processing':
        return <Clock className="w-4 h-4" />;
      case 'pending':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <XCircle className="w-4 h-4" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your store today.</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200">
            Export Report
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200">
            Add Product
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <div className="flex items-center mt-2">
                  {stat.changeType === 'positive' ? (
                    <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-sm font-medium ${
                    stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">from last month</span>
                </div>
              </div>
              <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {/* Sales Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-4"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Sales Overview</h3>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm bg-purple-100 text-purple-600 rounded-md">7D</button>
              <button className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-100 rounded-md">30D</button>
              <button className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-100 rounded-md">90D</button>
            </div>
          </div>
          <div className="h-48 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-purple-400 mx-auto mb-2" />
              <p className="text-gray-500">Sales chart will be displayed here</p>
            </div>
          </div>
        </motion.div>

        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-4"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Revenue Trends</h3>
            <div className="flex space-x-2">
              <button className="px-3 py-1 text-sm bg-purple-100 text-purple-600 rounded-md">Weekly</button>
              <button className="px-3 py-1 text-sm text-gray-500 hover:bg-gray-100 rounded-md">Monthly</button>
            </div>
          </div>
          <div className="h-48 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <LineChart className="w-12 h-12 text-green-400 mx-auto mb-2" />
              <p className="text-gray-500">Revenue chart will be displayed here</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Orders and Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
            <Link href="/admin/orders" className="text-purple-600 hover:text-purple-700 text-sm font-medium">
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{order.customer}</p>
                    <p className="text-sm text-gray-500">{order.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">${order.amount}</p>
                  <p className="text-sm text-gray-500">{order.id}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Top Products</h3>
            <Link href="/admin/products" className="text-purple-600 hover:text-purple-700 text-sm font-medium">
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={product.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{product.name}</p>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">•</span>
                      <span className="text-sm text-gray-500">{product.sales} sold</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">${product.revenue.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">Revenue</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/admin/products/new" className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-200">
            <Package className="w-8 h-8 text-purple-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Add Product</span>
          </Link>
          <Link href="/admin/orders" className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200">
            <ShoppingCart className="w-8 h-8 text-blue-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">View Orders</span>
          </Link>
          <Link href="/admin/customers" className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200">
            <Users className="w-8 h-8 text-green-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Customers</span>
          </Link>
          <Link href="/admin/analytics" className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors duration-200">
            <BarChart3 className="w-8 h-8 text-orange-600 mb-2" />
            <span className="text-sm font-medium text-gray-900">Analytics</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
} 