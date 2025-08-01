'use client';

import React, { useState, useEffect } from 'react';
import AdminNav from '@/components/AdminNav';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalProducts: 0
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [salesData, setSalesData] = useState([]);

  // Simulate data loading
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStats({
        totalSales: 124563.89,
        totalOrders: 1247,
        totalCustomers: 892,
        totalProducts: 156
      });

      setRecentOrders([
        { id: 'ORD-001', customer: 'John Smith', amount: 299.99, status: 'Delivered', date: '2024-01-15', items: 2 },
        { id: 'ORD-002', customer: 'Sarah Johnson', amount: 149.99, status: 'Shipped', date: '2024-01-14', items: 1 },
        { id: 'ORD-003', customer: 'Mike Wilson', amount: 899.99, status: 'Processing', date: '2024-01-14', items: 3 },
        { id: 'ORD-004', customer: 'Emily Davis', amount: 199.99, status: 'Pending', date: '2024-01-13', items: 1 },
        { id: 'ORD-005', customer: 'David Brown', amount: 649.99, status: 'Delivered', date: '2024-01-12', items: 2 }
      ]);

      setTopProducts([
        { name: 'Sony WH-1000XM4', sales: 89, revenue: 31111, growth: 12.5 },
        { name: 'Apple Watch Series 9', sales: 67, revenue: 26799, growth: 8.2 },
        { name: 'MacBook Pro 14"', sales: 23, revenue: 45999, growth: 15.3 },
        { name: 'PlayStation 5', sales: 45, revenue: 22499, growth: 5.7 }
      ]);

      setSalesData([
        { month: 'Jan', sales: 45000 },
        { month: 'Feb', sales: 52000 },
        { month: 'Mar', sales: 48000 },
        { month: 'Apr', sales: 61000 },
        { month: 'May', sales: 55000 },
        { month: 'Jun', sales: 72000 }
      ]);
    }, 1000);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return { bg: '#dcfce7', color: '#15803d', border: '#bbf7d0' };
      case 'Shipped': return { bg: '#dbeafe', color: '#1d4ed8', border: '#bfdbfe' };
      case 'Processing': return { bg: '#fef3c7', color: '#d97706', border: '#fde68a' };
      case 'Pending': return { bg: '#fee2e2', color: '#dc2626', border: '#fecaca' };
      default: return { bg: '#f3f4f6', color: '#6b7280', border: '#e5e7eb' };
    }
  };

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#f8fafc', minHeight: '100vh' }}>
      <AdminNav />
      
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
        {/* Welcome Section */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.5rem' }}>
            Welcome back, Admin! 👋
          </h1>
          <p style={{ color: '#64748b', fontSize: '1.125rem' }}>
            Here's what's happening with your store today
          </p>
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          {/* Total Sales */}
          <div style={{
            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
            padding: '2rem',
            borderRadius: '16px',
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: '-20px', right: '-20px', fontSize: '4rem', opacity: 0.1 }}>
              💰
            </div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <p style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '0.5rem' }}>Total Sales</p>
              <p style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                ${stats.totalSales.toLocaleString()}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.875rem' }}>↗️ +12.5%</span>
                <span style={{ fontSize: '0.875rem', opacity: 0.8 }}>from last month</span>
              </div>
            </div>
          </div>

          {/* Total Orders */}
          <div style={{
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            padding: '2rem',
            borderRadius: '16px',
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: '-20px', right: '-20px', fontSize: '4rem', opacity: 0.1 }}>
              📦
            </div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <p style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '0.5rem' }}>Total Orders</p>
              <p style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                {stats.totalOrders.toLocaleString()}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.875rem' }}>↗️ +8.2%</span>
                <span style={{ fontSize: '0.875rem', opacity: 0.8 }}>from last month</span>
              </div>
            </div>
          </div>

          {/* Total Customers */}
          <div style={{
            background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
            padding: '2rem',
            borderRadius: '16px',
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: '-20px', right: '-20px', fontSize: '4rem', opacity: 0.1 }}>
              👥
            </div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <p style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '0.5rem' }}>Total Customers</p>
              <p style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                {stats.totalCustomers.toLocaleString()}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.875rem' }}>↗️ +15.3%</span>
                <span style={{ fontSize: '0.875rem', opacity: 0.8 }}>from last month</span>
              </div>
            </div>
          </div>

          {/* Total Products */}
          <div style={{
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            padding: '2rem',
            borderRadius: '16px',
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: '-20px', right: '-20px', fontSize: '4rem', opacity: 0.1 }}>
              🛍️
            </div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <p style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '0.5rem' }}>Total Products</p>
              <p style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                {stats.totalProducts.toLocaleString()}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.875rem' }}>↗️ +3.1%</span>
                <span style={{ fontSize: '0.875rem', opacity: 0.8 }}>from last month</span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts and Tables */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
          {/* Recent Orders */}
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '16px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.5rem'
            }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1e293b' }}>
                Recent Orders
              </h2>
              <a href="/admin/orders" style={{
                color: '#22c55e',
                textDecoration: 'none',
                fontWeight: '500',
                fontSize: '0.875rem'
              }}>
                View all →
              </a>
            </div>
            
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                    <th style={{ textAlign: 'left', padding: '1rem 0', color: '#64748b', fontWeight: '600', fontSize: '0.875rem' }}>Order</th>
                    <th style={{ textAlign: 'left', padding: '1rem 0', color: '#64748b', fontWeight: '600', fontSize: '0.875rem' }}>Customer</th>
                    <th style={{ textAlign: 'left', padding: '1rem 0', color: '#64748b', fontWeight: '600', fontSize: '0.875rem' }}>Amount</th>
                    <th style={{ textAlign: 'left', padding: '1rem 0', color: '#64748b', fontWeight: '600', fontSize: '0.875rem' }}>Status</th>
                    <th style={{ textAlign: 'left', padding: '1rem 0', color: '#64748b', fontWeight: '600', fontSize: '0.875rem' }}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order, index) => {
                    const statusColors = getStatusColor(order.status);
                    return (
                      <tr key={order.id} style={{ borderBottom: '1px solid #f8fafc' }}>
                        <td style={{ padding: '1rem 0' }}>
                          <div>
                            <p style={{ fontWeight: '600', color: '#1e293b', marginBottom: '0.25rem' }}>
                              {order.id}
                            </p>
                            <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
                              {order.items} items
                            </p>
                          </div>
                        </td>
                        <td style={{ padding: '1rem 0', color: '#64748b' }}>{order.customer}</td>
                        <td style={{ padding: '1rem 0' }}>
                          <span style={{ fontWeight: '600', color: '#22c55e' }}>
                            ${order.amount.toFixed(2)}
                          </span>
                        </td>
                        <td style={{ padding: '1rem 0' }}>
                          <span style={{
                            background: statusColors.bg,
                            color: statusColors.color,
                            padding: '0.375rem 0.75rem',
                            borderRadius: '20px',
                            fontSize: '0.75rem',
                            fontWeight: '600',
                            border: `1px solid ${statusColors.border}`
                          }}>
                            {order.status}
                          </span>
                        </td>
                        <td style={{ padding: '1rem 0', color: '#64748b', fontSize: '0.875rem' }}>
                          {order.date}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Products */}
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '16px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.5rem'
            }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1e293b' }}>
                Top Products
              </h2>
              <a href="/admin/products" style={{
                color: '#22c55e',
                textDecoration: 'none',
                fontWeight: '500',
                fontSize: '0.875rem'
              }}>
                View all →
              </a>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {topProducts.map((product, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '1rem',
                  background: '#f8fafc',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0'
                }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: '600', color: '#1e293b', marginBottom: '0.25rem' }}>
                      {product.name}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <span style={{ fontSize: '0.875rem', color: '#64748b' }}>
                        {product.sales} sold
                      </span>
                      <span style={{
                        fontSize: '0.75rem',
                        color: '#22c55e',
                        fontWeight: '600'
                      }}>
                        ↗️ +{product.growth}%
                      </span>
                    </div>
                  </div>
                  <span style={{ fontWeight: '700', color: '#22c55e', fontSize: '1.125rem' }}>
                    ${product.revenue.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ marginTop: '2rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1e293b', marginBottom: '1rem' }}>
            Quick Actions
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem'
          }}>
            <a href="/admin/products" style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '12px',
              textDecoration: 'none',
              border: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              transition: 'all 0.2s'
            }} onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1)';
            }} onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: '#dcfce7',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem'
              }}>
                ➕
              </div>
              <div>
                <p style={{ fontWeight: '600', color: '#1e293b', marginBottom: '0.25rem' }}>
                  Add Product
                </p>
                <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
                  Create new product listing
                </p>
              </div>
            </a>

            <a href="/admin/orders" style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '12px',
              textDecoration: 'none',
              border: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              transition: 'all 0.2s'
            }} onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1)';
            }} onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: '#dbeafe',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem'
              }}>
                📦
              </div>
              <div>
                <p style={{ fontWeight: '600', color: '#1e293b', marginBottom: '0.25rem' }}>
                  Manage Orders
                </p>
                <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
                  Track and update orders
                </p>
              </div>
            </a>

            <a href="/admin/analytics" style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '12px',
              textDecoration: 'none',
              border: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              transition: 'all 0.2s'
            }} onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1)';
            }} onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: '#fef3c7',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem'
              }}>
                📊
              </div>
              <div>
                <p style={{ fontWeight: '600', color: '#1e293b', marginBottom: '0.25rem' }}>
                  View Analytics
                </p>
                <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
                  Detailed performance insights
                </p>
              </div>
            </a>

            <a href="/admin/settings" style={{
              background: 'white',
              padding: '1.5rem',
              borderRadius: '12px',
              textDecoration: 'none',
              border: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              transition: 'all 0.2s'
            }} onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.1)';
            }} onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                background: '#f3f4f6',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem'
              }}>
                ⚙️
              </div>
              <div>
                <p style={{ fontWeight: '600', color: '#1e293b', marginBottom: '0.25rem' }}>
                  Settings
                </p>
                <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
                  Configure your store
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 