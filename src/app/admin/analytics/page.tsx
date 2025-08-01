'use client';

import React, { useState, useEffect } from 'react';
import AdminNav from '@/components/AdminNav';

export default function AnalyticsDashboard() {
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('30d');

  // Simulate data loading
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const salesData = [
    { month: 'Jan', sales: 45000, orders: 89 },
    { month: 'Feb', sales: 52000, orders: 102 },
    { month: 'Mar', sales: 48000, orders: 95 },
    { month: 'Apr', sales: 61000, orders: 118 },
    { month: 'May', sales: 55000, orders: 107 },
    { month: 'Jun', sales: 72000, orders: 134 }
  ];

  const topCategories = [
    { name: 'Electronics', sales: 45000, percentage: 35 },
    { name: 'Computers', sales: 32000, percentage: 25 },
    { name: 'Wearables', sales: 28000, percentage: 22 },
    { name: 'Gaming', sales: 18000, percentage: 14 },
    { name: 'Cameras', sales: 8000, percentage: 4 }
  ];

  const conversionData = [
    { metric: 'Website Visits', value: 15420, change: '+12.5%' },
    { metric: 'Add to Cart', value: 3855, change: '+8.2%' },
    { metric: 'Checkout Started', value: 1927, change: '+15.3%' },
    { metric: 'Orders Completed', value: 1347, change: '+6.7%' }
  ];

  if (loading) {
    return (
      <div style={{ fontFamily: 'Inter, sans-serif', background: '#f8fafc', minHeight: '100vh' }}>
        <AdminNav />
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '400px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⏳</div>
              <p style={{ color: '#64748b', fontSize: '1.125rem' }}>Loading analytics...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#f8fafc', minHeight: '100vh' }}>
      <AdminNav />
      
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '2rem'
        }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.5rem' }}>
              Analytics Dashboard
            </h1>
            <p style={{ color: '#64748b', fontSize: '1.125rem' }}>
              Track your store performance and customer insights
            </p>
          </div>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            style={{
              padding: '0.75rem 1rem',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              fontSize: '0.875rem',
              background: 'white'
            }}
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
        </div>

        {/* Key Metrics */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
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
              <p style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '0.5rem' }}>Total Revenue</p>
              <p style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                ${salesData.reduce((sum, item) => sum + item.sales, 0).toLocaleString()}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.875rem' }}>↗️ +18.2%</span>
                <span style={{ fontSize: '0.875rem', opacity: 0.8 }}>vs last period</span>
              </div>
            </div>
          </div>

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
                {salesData.reduce((sum, item) => sum + item.orders, 0).toLocaleString()}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.875rem' }}>↗️ +12.8%</span>
                <span style={{ fontSize: '0.875rem', opacity: 0.8 }}>vs last period</span>
              </div>
            </div>
          </div>

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
              <p style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '0.5rem' }}>Conversion Rate</p>
              <p style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                8.7%
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.875rem' }}>↗️ +2.1%</span>
                <span style={{ fontSize: '0.875rem', opacity: 0.8 }}>vs last period</span>
              </div>
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
            padding: '2rem',
            borderRadius: '16px',
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: '-20px', right: '-20px', fontSize: '4rem', opacity: 0.1 }}>
              📊
            </div>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <p style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '0.5rem' }}>Avg Order Value</p>
              <p style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                $537.23
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.875rem' }}>↗️ +4.8%</span>
                <span style={{ fontSize: '0.875rem', opacity: 0.8 }}>vs last period</span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
          {/* Sales Chart */}
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '16px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e2e8f0'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', color: '#1e293b' }}>
              Sales Trend
            </h2>
            <div style={{ height: '300px', display: 'flex', alignItems: 'end', gap: '1rem', padding: '1rem 0' }}>
              {salesData.map((item, index) => {
                const maxSales = Math.max(...salesData.map(d => d.sales));
                const height = (item.sales / maxSales) * 200;
                return (
                  <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{
                      width: '100%',
                      height: `${height}px`,
                      background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                      borderRadius: '8px 8px 0 0',
                      marginBottom: '0.5rem'
                    }} />
                    <span style={{ fontSize: '0.875rem', color: '#64748b', fontWeight: '500' }}>
                      {item.month}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
                      ${item.sales.toLocaleString()}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top Categories */}
          <div style={{
            background: 'white',
            padding: '2rem',
            borderRadius: '16px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e2e8f0'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', color: '#1e293b' }}>
              Top Categories
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {topCategories.map((category, index) => (
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
                      {category.name}
                    </p>
                    <div style={{
                      width: '100%',
                      height: '8px',
                      background: '#e2e8f0',
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <div style={{
                        width: `${category.percentage}%`,
                        height: '100%',
                        background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                        borderRadius: '4px'
                      }} />
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontWeight: '700', color: '#22c55e', fontSize: '1.125rem' }}>
                      ${category.sales.toLocaleString()}
                    </p>
                    <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
                      {category.percentage}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Conversion Funnel */}
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '16px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e2e8f0',
          marginBottom: '2rem'
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', color: '#1e293b' }}>
            Conversion Funnel
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem'
          }}>
            {conversionData.map((item, index) => (
              <div key={index} style={{
                textAlign: 'center',
                padding: '1.5rem',
                background: '#f8fafc',
                borderRadius: '12px',
                border: '1px solid #e2e8f0'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem',
                  fontSize: '1.5rem',
                  color: 'white'
                }}>
                  {index + 1}
                </div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1e293b', marginBottom: '0.5rem' }}>
                  {item.metric}
                </h3>
                <p style={{ fontSize: '1.5rem', fontWeight: '700', color: '#22c55e', marginBottom: '0.5rem' }}>
                  {item.value.toLocaleString()}
                </p>
                <span style={{
                  background: '#dcfce7',
                  color: '#15803d',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: '600'
                }}>
                  {item.change}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Insights */}
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '16px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e2e8f0'
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem', color: '#1e293b' }}>
            Quick Insights
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            <div style={{
              padding: '1.5rem',
              background: '#fef3c7',
              borderRadius: '12px',
              border: '1px solid #fde68a'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '1.5rem' }}>📈</span>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#d97706' }}>
                  Sales Growth
                </h3>
              </div>
              <p style={{ color: '#92400e', fontSize: '0.875rem', lineHeight: '1.5' }}>
                Your sales have increased by 18.2% compared to the previous period. Electronics category is driving the most revenue.
              </p>
            </div>

            <div style={{
              padding: '1.5rem',
              background: '#dbeafe',
              borderRadius: '12px',
              
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '1.5rem' }}>🎯</span>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1d4ed8' }}>
                  Conversion Rate
                </h3>
              </div>
              <p style={{ color: '#1e40af', fontSize: '0.875rem', lineHeight: '1.5' }}>
                Your conversion rate is 8.7%, which is above the industry average. Consider optimizing your checkout process.
              </p>
            </div>

            <div style={{
              padding: '1.5rem',
              background: '#dcfce7',
              borderRadius: '12px',
              border: '1px solid #bbf7d0'

            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '1.5rem' }}>👥</span>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#15803d' }}>
                  Customer Behavior
                </h3>
              </div>
              <p style={{ color: '#166534', fontSize: '0.875rem', lineHeight: '1.5' }}>
                Average order value has increased by 4.8%. Customers are adding more items to their carts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 