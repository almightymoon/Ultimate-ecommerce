'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  Download, 
  Calendar,
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  Filter
} from 'lucide-react';

interface ReportData {
  period: {
    start: string;
    end: string;
  };
  metrics: {
    totalRevenue: number;
    totalOrders: number;
    averageOrderValue: number;
    totalProducts: number;
    totalCustomers: number;
  };
  orderStatuses: Record<string, number>;
  dailyRevenue: Array<{
    date: string;
    revenue: number;
  }>;
}

export default function AdminReports() {
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [reportType, setReportType] = useState('overview');
  const [period, setPeriod] = useState('30');
  const [activeTab, setActiveTab] = useState('overview');

  const reportTypes = [
    { value: 'overview', label: 'Overview', icon: BarChart3 },
    { value: 'sales', label: 'Sales', icon: TrendingUp },
    { value: 'products', label: 'Products', icon: Package },
    { value: 'customers', label: 'Customers', icon: Users }
  ];

  const periodOptions = [
    { value: '7', label: 'Last 7 days' },
    { value: '30', label: 'Last 30 days' },
    { value: '90', label: 'Last 90 days' },
    { value: '365', label: 'Last year' }
  ];

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/admin/reports?type=${reportType}&period=${period}`);
        const data = await response.json();
        
        if (data.success) {
          setReportData(data.report);
        } else {
          console.error('Failed to fetch report:', data.message);
        }
      } catch (error) {
        console.error('Error fetching report:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [reportType, period]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      case 'processing': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-3">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
              <p className="text-gray-600 mt-1">Business insights and analytics</p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {periodOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all duration-300">
                <Download className="w-4 h-4" />
                Export Report
              </button>
            </div>
          </div>
        </motion.div>

        {/* Report Type Tabs */}
        <motion.div variants={itemVariants} className="mb-4">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-1">
            <div className="flex space-x-1">
              {reportTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.value}
                    onClick={() => setReportType(type.value)}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      reportType === type.value
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {type.label}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {reportData && (
          <>
            {/* Key Metrics */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
              <div className="bg-white rounded-2xl shadow-lg p-4 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatCurrency(reportData.metrics.totalRevenue)}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-4 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Orders</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatNumber(reportData.metrics.totalOrders)}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <ShoppingCart className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-4 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatCurrency(reportData.metrics.averageOrderValue)}
                    </p>
                  </div>
                                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-4 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Customers</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {formatNumber(reportData.metrics.totalCustomers)}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Charts and Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Revenue Chart */}
              <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-4 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Daily Revenue</h3>
                  <Calendar className="w-5 h-5 text-gray-400" />
                </div>
                <div className="h-64 flex items-end justify-between gap-2">
                  {reportData.dailyRevenue.map((day, index) => {
                    const maxRevenue = Math.max(...reportData.dailyRevenue.map(d => d.revenue));
                    const height = maxRevenue > 0 ? (day.revenue / maxRevenue) * 100 : 0;
                    return (
                      <div key={index} className="flex-1 flex flex-col items-center">
                        <div 
                          className="w-full bg-gradient-to-t from-blue-600 to-indigo-600 rounded-t-lg transition-all duration-300 hover:opacity-80"
                          style={{ height: `${height}%` }}
                        />
                        <p className="text-xs text-gray-500 mt-2 text-center">
                          {formatDate(day.date)}
                        </p>
                        <p className="text-xs font-medium text-gray-700 mt-1">
                          {formatCurrency(day.revenue)}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Order Status Breakdown */}
              <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-4 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Order Status</h3>
                  <Filter className="w-5 h-5 text-gray-400" />
                </div>
                <div className="space-y-3">
                  {Object.entries(reportData.orderStatuses).map(([status, count]) => (
                    <div key={status} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                          {status}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full transition-all duration-300"
                            style={{ 
                              width: `${(count / reportData.metrics.totalOrders) * 100}%` 
                            }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-900 min-w-[3rem] text-right">
                          {count}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Additional Report Details */}
            <motion.div variants={itemVariants} className="mt-4 bg-white rounded-2xl shadow-lg p-4 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Report Details</h3>
                <div className="text-sm text-gray-500">
                  {formatDate(reportData.period.start)} - {formatDate(reportData.period.end)}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Top Performing Products</h4>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">No data available</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Customer Segments</h4>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">No data available</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Growth Trends</h4>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">No data available</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  );
} 