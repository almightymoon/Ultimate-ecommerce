'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  DollarSign, 
  Package, 
  Star,
  Eye,
  ShoppingCart,
  CreditCard,
  CheckCircle,
  BarChart3,
  PieChart,
  Activity,
  Download,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';

interface AnalyticsData {
  period: string;
  metrics: {
    totalRevenue: number;
    totalOrders: number;
    conversionRate: number;
    avgOrderValue: number;
    totalUsers: number;
    newUsers: number;
    totalProducts: number;
    activeProducts: number;
  };
  growth: {
    revenue: string;
    orders: string;
    conversion: string;
    avgOrder: string;
  };
  salesData: Array<{
    month: string;
    sales: number;
    orders: number;
  }>;
  userGrowthData: Array<{
    month: string;
    users: number;
  }>;
  categoryStats: Array<{
    _id: string;
    count: number;
    totalStock: number;
  }>;
  conversionData: Array<{
    metric: string;
    value: number;
    change: string;
  }>;
  topProducts: Array<{
    id: string;
    name: string;
    price: number;
    rating: number;
    image: string;
  }>;
}

export default function AnalyticsDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchAnalytics = async (period: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`/api/admin/analytics?period=${period}`);
      const result = await response.json();
      
      if (result.success) {
        setData(result.data);
      } else {
        setError(result.message || 'Failed to fetch analytics data');
      }
    } catch (err) {
      console.error('Error fetching analytics:', err);
      setError('Failed to load analytics data');
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    setRefreshing(true);
    await fetchAnalytics(selectedPeriod);
    setRefreshing(false);
  };

  useEffect(() => {
    fetchAnalytics(selectedPeriod);
  }, [selectedPeriod]);

  const getGrowthIcon = (growth: string) => {
    const isPositive = growth.startsWith('+');
    return isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />;
  };

  const getGrowthColor = (growth: string) => {
    const isPositive = growth.startsWith('+');
    return isPositive ? 'text-green-600' : 'text-red-600';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm p-6">
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="text-6xl mb-4">❌</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Analytics</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => fetchAnalytics(selectedPeriod)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
            <p className="text-gray-600">Real-time insights into your store performance</p>
          </div>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option key="7d" value="7d">Last 7 days</option>
              <option key="30d" value="30d">Last 30 days</option>
              <option key="90d" value="90d">Last 90 days</option>
              <option key="1y" value="1y">Last year</option>
            </select>
            <button
              onClick={refreshData}
              disabled={refreshing}
              className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {/* Revenue */}
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 opacity-80" />
              <div className={`flex items-center gap-1 ${getGrowthColor(data.growth.revenue)}`}>
                {getGrowthIcon(data.growth.revenue)}
                <span className="text-sm font-medium">{data.growth.revenue}</span>
              </div>
            </div>
            <h3 className="text-sm font-medium opacity-80 mb-1">Total Revenue</h3>
            <p className="text-2xl font-bold mb-1">${data.metrics.totalRevenue.toLocaleString()}</p>
            <p className="text-sm opacity-80">vs last period</p>
          </div>

          {/* Orders */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <ShoppingBag className="w-8 h-8 opacity-80" />
              <div className={`flex items-center gap-1 ${getGrowthColor(data.growth.orders)}`}>
                {getGrowthIcon(data.growth.orders)}
                <span className="text-sm font-medium">{data.growth.orders}</span>
              </div>
            </div>
            <h3 className="text-sm font-medium opacity-80 mb-1">Total Orders</h3>
            <p className="text-2xl font-bold mb-1">{data.metrics.totalOrders.toLocaleString()}</p>
            <p className="text-sm opacity-80">vs last period</p>
          </div>

          {/* Conversion Rate */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 opacity-80" />
              <div className={`flex items-center gap-1 ${getGrowthColor(data.growth.conversion)}`}>
                {getGrowthIcon(data.growth.conversion)}
                <span className="text-sm font-medium">{data.growth.conversion}</span>
              </div>
            </div>
            <h3 className="text-sm font-medium opacity-80 mb-1">Conversion Rate</h3>
            <p className="text-2xl font-bold mb-1">{data.metrics.conversionRate}%</p>
            <p className="text-sm opacity-80">vs last period</p>
          </div>

          {/* Average Order Value */}
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <Package className="w-8 h-8 opacity-80" />
              <div className={`flex items-center gap-1 ${getGrowthColor(data.growth.avgOrder)}`}>
                {getGrowthIcon(data.growth.avgOrder)}
                <span className="text-sm font-medium">{data.growth.avgOrder}</span>
              </div>
            </div>
            <h3 className="text-sm font-medium opacity-80 mb-1">Avg Order Value</h3>
            <p className="text-2xl font-bold mb-1">${data.metrics.avgOrderValue.toFixed(2)}</p>
            <p className="text-sm opacity-80">vs last period</p>
          </div>
        </motion.div>

        {/* Charts Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
        >
          {/* Sales Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Sales Trend</h2>
              <BarChart3 className="w-5 h-5 text-gray-400" />
            </div>
            <div className="h-64 flex items-end gap-4">
              {data.salesData.map((item, index) => {
                const maxSales = Math.max(...data.salesData.map(d => d.sales));
                const height = maxSales > 0 ? (item.sales / maxSales) * 200 : 0;
                return (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg transition-all duration-300 hover:from-green-600 hover:to-green-500"
                      style={{ height: `${height}px` }}
                    />
                    <span className="text-sm font-medium text-gray-600 mt-2">{item.month}</span>
                    <span className="text-xs text-gray-400">${item.sales.toLocaleString()}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Category Performance */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Top Categories</h2>
              <PieChart className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {data.categoryStats.map((category) => (
                <div key={category._id} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 capitalize">{category._id}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(category.count / Math.max(...data.categoryStats.map(c => c.count))) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <p className="font-semibold text-blue-600">{category.count}</p>
                    <p className="text-xs text-gray-400">products</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Conversion Funnel */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm p-6 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Conversion Funnel</h2>
            <Activity className="w-5 h-5 text-gray-400" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {data.conversionData.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  {index === 0 && <Eye className="w-8 h-8 text-white" />}
                  {index === 1 && <ShoppingCart className="w-8 h-8 text-white" />}
                  {index === 2 && <CreditCard className="w-8 h-8 text-white" />}
                  {index === 3 && <CheckCircle className="w-8 h-8 text-white" />}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.metric}</h3>
                <p className="text-2xl font-bold text-blue-600 mb-2">{item.value.toLocaleString()}</p>
                <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  {item.change}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Additional Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {/* User Growth */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">User Growth</h3>
              <Users className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Users</span>
                <span className="font-semibold">{data.metrics.totalUsers.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">New Users ({selectedPeriod})</span>
                <span className="font-semibold text-green-600">{data.metrics.newUsers.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Product Stats */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Products</h3>
              <Package className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Products</span>
                <span className="font-semibold">{data.metrics.totalProducts.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">In Stock</span>
                <span className="font-semibold text-blue-600">{data.metrics.activeProducts.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Top Products</h3>
              <Star className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-3">
              {data.topProducts.slice(0, 3).map((product, index) => (
                <div key={product.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{product.name}</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">{product.rating}</span>
                    </div>
                  </div>
                  <span className="font-semibold text-gray-900">${product.price}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Insights */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl shadow-sm p-6"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Key Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <h3 className="font-semibold text-green-800">Revenue Growth</h3>
              </div>
              <p className="text-sm text-green-700">
                Your revenue has increased by {data.growth.revenue} compared to the previous period. 
                The {data.categoryStats[0]?._id} category is driving the most sales.
              </p>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-blue-600" />
                <h3 className="font-semibold text-blue-800">User Acquisition</h3>
              </div>
              <p className="text-sm text-blue-700">
                You&apos;ve gained {data.metrics.newUsers} new users in the last {selectedPeriod}. 
                Your conversion rate of {data.metrics.conversionRate}% is above industry average.
              </p>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex items-center gap-2 mb-2">
                <ShoppingBag className="w-5 h-5 text-purple-600" />
                <h3 className="font-semibold text-purple-800">Order Performance</h3>
              </div>
              <p className="text-sm text-purple-700">
                Average order value has increased by {data.growth.avgOrder}. 
                Customers are adding more items to their carts, indicating strong product appeal.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 