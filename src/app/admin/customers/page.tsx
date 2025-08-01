'use client';

import React, { useState, useEffect } from 'react';
import AdminNav from '@/components/AdminNav';

export default function CustomersManagement() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const statuses = ['All', 'Active', 'Inactive', 'VIP'];

  // Simulate data loading
  useEffect(() => {
    setTimeout(() => {
      setCustomers([
        {
          id: 1,
          name: 'John Smith',
          email: 'john.smith@email.com',
          phone: '+1 (555) 123-4567',
          status: 'Active',
          totalOrders: 15,
          totalSpent: 2499.99,
          lastOrder: '2024-01-15',
          joinDate: '2023-03-10',
          avatar: '👨‍💼'
        },
        {
          id: 2,
          name: 'Sarah Johnson',
          email: 'sarah.j@email.com',
          phone: '+1 (555) 987-6543',
          status: 'VIP',
          totalOrders: 8,
          totalSpent: 4599.99,
          lastOrder: '2024-01-14',
          joinDate: '2023-01-15',
          avatar: '👩‍💼'
        },
        {
          id: 3,
          name: 'Mike Wilson',
          email: 'mike.wilson@email.com',
          phone: '+1 (555) 456-7890',
          status: 'Active',
          totalOrders: 3,
          totalSpent: 1699.98,
          lastOrder: '2024-01-14',
          joinDate: '2023-12-20',
          avatar: '👨‍💻'
        },
        {
          id: 4,
          name: 'Emily Davis',
          email: 'emily.davis@email.com',
          phone: '+1 (555) 321-6540',
          status: 'Active',
          totalOrders: 1,
          totalSpent: 2499.99,
          lastOrder: '2024-01-13',
          joinDate: '2024-01-10',
          avatar: '👩‍🎨'
        },
        {
          id: 5,
          name: 'David Brown',
          email: 'david.brown@email.com',
          phone: '+1 (555) 789-0123',
          status: 'Inactive',
          totalOrders: 0,
          totalSpent: 0,
          lastOrder: null,
          joinDate: '2023-11-05',
          avatar: '👨‍🔧'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || customer.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return { bg: '#dcfce7', color: '#15803d', border: '#bbf7d0' };
      case 'VIP': return { bg: '#fef3c7', color: '#d97706', border: '#fde68a' };
      case 'Inactive': return { bg: '#f3f4f6', color: '#6b7280', border: '#e5e7eb' };
      default: return { bg: '#f3f4f6', color: '#6b7280', border: '#e5e7eb' };
    }
  };

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
              <p style={{ color: '#64748b', fontSize: '1.125rem' }}>Loading customers...</p>
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
              Customers Management
            </h1>
            <p style={{ color: '#64748b', fontSize: '1.125rem' }}>
              Manage your customer database and relationships
            </p>
          </div>
          <button style={{
            padding: '1rem 2rem',
            background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontWeight: '600',
            cursor: 'pointer',
            fontSize: '1rem',
            boxShadow: '0 4px 6px -1px rgba(34, 197, 94, 0.2)'
          }}>
            📊 Export Data
          </button>
        </div>

        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>👥</div>
            <p style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.25rem' }}>
              {customers.length}
            </p>
            <p style={{ color: '#64748b', fontSize: '0.875rem' }}>Total Customers</p>
          </div>
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⭐</div>
            <p style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.25rem' }}>
              {customers.filter(c => c.status === 'VIP').length}
            </p>
            <p style={{ color: '#64748b', fontSize: '0.875rem' }}>VIP Customers</p>
          </div>
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💰</div>
            <p style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.25rem' }}>
              ${customers.reduce((sum, c) => sum + c.totalSpent, 0).toLocaleString()}
            </p>
            <p style={{ color: '#64748b', fontSize: '0.875rem' }}>Total Revenue</p>
          </div>
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📦</div>
            <p style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.25rem' }}>
              {customers.reduce((sum, c) => sum + c.totalOrders, 0)}
            </p>
            <p style={{ color: '#64748b', fontSize: '0.875rem' }}>Total Orders</p>
          </div>
        </div>

        {/* Filters */}
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '16px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e2e8f0',
          marginBottom: '2rem'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr auto',
            gap: '1rem',
            alignItems: 'end'
          }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>
                Search Customers
              </label>
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '0.875rem'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>
                Status
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  background: 'white'
                }}
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
            <button style={{
              padding: '0.75rem 1rem',
              background: '#f1f5f9',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              cursor: 'pointer'
            }}>
              🔍
            </button>
          </div>
        </div>

        {/* Customers Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
          gap: '1.5rem'
        }}>
          {filteredCustomers.map((customer) => {
            const statusColors = getStatusColor(customer.status);
            return (
              <div key={customer.id} style={{
                background: 'white',
                borderRadius: '16px',
                padding: '1.5rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e2e8f0',
                transition: 'all 0.2s'
              }} onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1)';
              }} onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem'
                  }}>
                    {customer.avatar}
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      fontSize: '1.25rem',
                      fontWeight: '600',
                      color: '#1e293b',
                      marginBottom: '0.25rem'
                    }}>
                      {customer.name}
                    </h3>
                    <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                      {customer.email}
                    </p>
                    <span style={{
                      background: statusColors.bg,
                      color: statusColors.color,
                      padding: '0.25rem 0.5rem',
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      border: `1px solid ${statusColors.border}`
                    }}>
                      {customer.status}
                    </span>
                  </div>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem',
                  marginBottom: '1rem'
                }}>
                  <div style={{
                    background: '#f8fafc',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    textAlign: 'center'
                  }}>
                    <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.25rem' }}>
                      Total Orders
                    </p>
                    <p style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1e293b' }}>
                      {customer.totalOrders}
                    </p>
                  </div>
                  <div style={{
                    background: '#f8fafc',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    textAlign: 'center'
                  }}>
                    <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.25rem' }}>
                      Total Spent
                    </p>
                    <p style={{ fontSize: '1.125rem', fontWeight: '600', color: '#22c55e' }}>
                      ${customer.totalSpent.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem',
                  marginBottom: '1.5rem'
                }}>
                  <div>
                    <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.25rem' }}>
                      Phone
                    </p>
                    <p style={{ fontSize: '0.875rem', color: '#1e293b' }}>
                      {customer.phone}
                    </p>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.25rem' }}>
                      Member Since
                    </p>
                    <p style={{ fontSize: '0.875rem', color: '#1e293b' }}>
                      {customer.joinDate}
                    </p>
                  </div>
                </div>

                {customer.lastOrder && (
                  <div style={{
                    background: '#dcfce7',
                    padding: '0.75rem',
                    borderRadius: '8px',
                    marginBottom: '1rem'
                  }}>
                    <p style={{ fontSize: '0.875rem', color: '#15803d', fontWeight: '500' }}>
                      Last Order: {customer.lastOrder}
                    </p>
                  </div>
                )}

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button style={{
                    flex: 1,
                    padding: '0.75rem',
                    background: '#dbeafe',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#1d4ed8',
                    cursor: 'pointer',
                    fontWeight: '500',
                    fontSize: '0.875rem'
                  }}>
                    👁️ View Details
                  </button>
                  <button style={{
                    padding: '0.75rem',
                    background: '#fef3c7',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#d97706',
                    cursor: 'pointer',
                    fontSize: '1rem'
                  }}>
                    📧
                  </button>
                  <button style={{
                    padding: '0.75rem',
                    background: '#f3f4f6',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#6b7280',
                    cursor: 'pointer',
                    fontSize: '1rem'
                  }}>
                    ⚙️
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredCustomers.length === 0 && (
          <div style={{
            background: 'white',
            padding: '4rem 2rem',
            borderRadius: '16px',
            textAlign: 'center',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1e293b', marginBottom: '0.5rem' }}>
              No customers found
            </h3>
            <p style={{ color: '#64748b' }}>
              Try adjusting your search criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 