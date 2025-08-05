import { NextResponse } from 'next/server';
import { getCollection } from '@/lib/database';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'overview';
    const period = searchParams.get('period') || '30'; // days

    const now = new Date();
    const startDate = new Date(now.getTime() - (parseInt(period) * 24 * 60 * 60 * 1000));

    let reportData = {};

    switch (type) {
      case 'overview':
        reportData = await generateOverviewReport(startDate, now);
        break;
      case 'sales':
        reportData = await generateSalesReport(startDate, now);
        break;
      case 'products':
        reportData = await generateProductsReport(startDate, now);
        break;
      case 'customers':
        reportData = await generateCustomersReport(startDate, now);
        break;
      default:
        reportData = await generateOverviewReport(startDate, now);
    }

    return NextResponse.json({
      success: true,
      report: reportData
    });
  } catch (error) {
    console.error('Error generating report:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to generate report' },
      { status: 500 }
    );
  }
}

async function generateOverviewReport(startDate, endDate) {
  const ordersCollection = await getCollection('orders');
  const productsCollection = await getCollection('products');
  const usersCollection = await getCollection('users');

  // Get orders in date range
  const orders = await ordersCollection.find({
    createdAt: { $gte: startDate, $lte: endDate }
  }).toArray();

  // Get all products
  const products = await productsCollection.find({}).toArray();

  // Get all users
  const users = await usersCollection.find({}).toArray();

  // Calculate metrics
  const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
  const totalOrders = orders.length;
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
  const totalProducts = products.length;
  const totalCustomers = users.filter(user => user.role === 'user').length;

  // Order status breakdown
  const orderStatuses = orders.reduce((acc, order) => {
    const status = order.status || 'pending';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  // Daily revenue for chart
  const dailyRevenue = {};
  orders.forEach(order => {
    const date = new Date(order.createdAt).toDateString();
    dailyRevenue[date] = (dailyRevenue[date] || 0) + (order.total || 0);
  });

  return {
    period: { start: startDate, end: endDate },
    metrics: {
      totalRevenue,
      totalOrders,
      averageOrderValue,
      totalProducts,
      totalCustomers
    },
    orderStatuses,
    dailyRevenue: Object.entries(dailyRevenue).map(([date, revenue]) => ({
      date,
      revenue
    }))
  };
}

async function generateSalesReport(startDate, endDate) {
  const ordersCollection = await getCollection('orders');

  const orders = await ordersCollection.find({
    createdAt: { $gte: startDate, $lte: endDate }
  }).toArray();

  // Sales by product
  const productSales = {};
  orders.forEach(order => {
    order.items?.forEach(item => {
      if (!productSales[item.productId]) {
        productSales[item.productId] = {
          quantity: 0,
          revenue: 0,
          productName: item.name || 'Unknown Product'
        };
      }
      productSales[item.productId].quantity += item.quantity || 0;
      productSales[item.productId].revenue += (item.price || 0) * (item.quantity || 0);
    });
  });

  // Sales by category (if available)
  const categorySales = {};
  orders.forEach(order => {
    order.items?.forEach(item => {
      const category = item.category || 'Uncategorized';
      if (!categorySales[category]) {
        categorySales[category] = {
          quantity: 0,
          revenue: 0
        };
      }
      categorySales[category].quantity += item.quantity || 0;
      categorySales[category].revenue += (item.price || 0) * (item.quantity || 0);
    });
  });

  return {
    period: { start: startDate, end: endDate },
    productSales: Object.entries(productSales).map(([productId, data]) => ({
      productId,
      ...data
    })),
    categorySales: Object.entries(categorySales).map(([category, data]) => ({
      category,
      ...data
    }))
  };
}

async function generateProductsReport(startDate, endDate) {
  const productsCollection = await getCollection('products');
  const ordersCollection = await getCollection('orders');

  const products = await productsCollection.find({}).toArray();
  const orders = await ordersCollection.find({
    createdAt: { $gte: startDate, $lte: endDate }
  }).toArray();

  // Product performance
  const productPerformance = products.map(product => {
    const productOrders = orders.filter(order => 
      order.items?.some(item => item.productId === product._id.toString())
    );
    
    const totalSold = productOrders.reduce((sum, order) => {
      const item = order.items?.find(item => item.productId === product._id.toString());
      return sum + (item?.quantity || 0);
    }, 0);

    const revenue = productOrders.reduce((sum, order) => {
      const item = order.items?.find(item => item.productId === product._id.toString());
      return sum + ((item?.price || 0) * (item?.quantity || 0));
    }, 0);

    return {
      productId: product._id,
      name: product.name,
      price: product.price,
      stock: product.stock || 0,
      totalSold,
      revenue,
      orders: productOrders.length
    };
  });

  // Sort by revenue
  productPerformance.sort((a, b) => b.revenue - a.revenue);

  return {
    period: { start: startDate, end: endDate },
    productPerformance,
    topProducts: productPerformance.slice(0, 10),
    lowStockProducts: productPerformance.filter(p => p.stock < 10)
  };
}

async function generateCustomersReport(startDate, endDate) {
  const usersCollection = await getCollection('users');
  const ordersCollection = await getCollection('orders');

  const customers = await usersCollection.find({ role: 'user' }).toArray();
  const orders = await ordersCollection.find({
    createdAt: { $gte: startDate, $lte: endDate }
  }).toArray();

  // Customer analysis
  const customerAnalysis = customers.map(customer => {
    const customerOrders = orders.filter(order => order.userId === customer._id.toString());
    
    const totalSpent = customerOrders.reduce((sum, order) => sum + (order.total || 0), 0);
    const orderCount = customerOrders.length;
    const averageOrderValue = orderCount > 0 ? totalSpent / orderCount : 0;

    return {
      customerId: customer._id,
      name: customer.name || customer.email,
      email: customer.email,
      totalSpent,
      orderCount,
      averageOrderValue,
      lastOrder: customerOrders.length > 0 
        ? Math.max(...customerOrders.map(o => new Date(o.createdAt).getTime()))
        : null
    };
  });

  // Sort by total spent
  customerAnalysis.sort((a, b) => b.totalSpent - a.totalSpent);

  // Customer segments
  const segments = {
    highValue: customerAnalysis.filter(c => c.totalSpent >= 1000),
    mediumValue: customerAnalysis.filter(c => c.totalSpent >= 100 && c.totalSpent < 1000),
    lowValue: customerAnalysis.filter(c => c.totalSpent < 100)
  };

  return {
    period: { start: startDate, end: endDate },
    customerAnalysis,
    topCustomers: customerAnalysis.slice(0, 10),
    segments
  };
} 