import { NextResponse } from 'next/server';
import { getCollection } from '@/lib/database';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const period = searchParams.get('period') || '30d';
    
    const usersCollection = await getCollection('users');
    const productsCollection = await getCollection('products');
    const ordersCollection = await getCollection('orders');

    // Calculate date range based on period
    const now = new Date();
    let startDate;
    
    switch (period) {
      case '7d':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case '30d':
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
      case '90d':
        startDate = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        break;
      case '1y':
        startDate = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
        break;
      default:
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }

    // Get total users
    const totalUsers = await usersCollection.countDocuments();
    const newUsers = await usersCollection.countDocuments({
      createdAt: { $gte: startDate }
    });

    // Get total products
    const totalProducts = await productsCollection.countDocuments();
    const activeProducts = await productsCollection.countDocuments({ stock: { $gt: 0 } });

    // Get orders data
    const orders = await ordersCollection.find({
      createdAt: { $gte: startDate }
    }).toArray();

    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    // Get category performance
    const categoryStats = await productsCollection.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          totalStock: { $sum: '$stock' }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 5
      }
    ]).toArray();

    // Get monthly sales data for the last 6 months
    const monthlyData = [];
    for (let i = 5; i >= 0; i--) {
      const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);
      
      const monthOrders = await ordersCollection.find({
        createdAt: { $gte: monthStart, $lte: monthEnd }
      }).toArray();
      
      const monthRevenue = monthOrders.reduce((sum, order) => sum + (order.total || 0), 0);
      const monthOrdersCount = monthOrders.length;
      
      monthlyData.push({
        month: monthStart.toLocaleDateString('en-US', { month: 'short' }),
        sales: monthRevenue,
        orders: monthOrdersCount
      });
    }

    // Get user growth data
    const userGrowthData = [];
    for (let i = 5; i >= 0; i--) {
      const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);
      
      const monthUsers = await usersCollection.countDocuments({
        createdAt: { $gte: monthStart, $lte: monthEnd }
      });
      
      userGrowthData.push({
        month: monthStart.toLocaleDateString('en-US', { month: 'short' }),
        users: monthUsers
      });
    }

    // Calculate conversion metrics (simulated)
    const websiteVisits = Math.floor(totalUsers * 15); // Simulated
    const addToCart = Math.floor(websiteVisits * 0.25); // 25% conversion
    const checkoutStarted = Math.floor(addToCart * 0.5); // 50% conversion
    const ordersCompleted = totalOrders;

    const conversionData = [
      { metric: 'Website Visits', value: websiteVisits, change: '+12.5%' },
      { metric: 'Add to Cart', value: addToCart, change: '+8.2%' },
      { metric: 'Checkout Started', value: checkoutStarted, change: '+15.3%' },
      { metric: 'Orders Completed', value: ordersCompleted, change: '+6.7%' }
    ];

    // Get top performing products
    const topProducts = await productsCollection.find({})
      .sort({ rating: -1 })
      .limit(5)
      .toArray();

    // Calculate growth percentages (simulated)
    const revenueGrowth = '+18.2%';
    const ordersGrowth = '+12.8%';
    const conversionRate = totalOrders > 0 ? ((totalOrders / websiteVisits) * 100).toFixed(1) : '0.0';
    const avgOrderGrowth = '+4.8%';

    return NextResponse.json({
      success: true,
      data: {
        period,
        metrics: {
          totalRevenue,
          totalOrders,
          conversionRate: parseFloat(conversionRate),
          avgOrderValue,
          totalUsers,
          newUsers,
          totalProducts,
          activeProducts
        },
        growth: {
          revenue: revenueGrowth,
          orders: ordersGrowth,
          conversion: '+2.1%',
          avgOrder: avgOrderGrowth
        },
        salesData: monthlyData,
        userGrowthData,
        categoryStats,
        conversionData,
        topProducts
      }
    });

  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch analytics data' },
      { status: 500 }
    );
  }
} 