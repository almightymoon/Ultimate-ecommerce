'use client';

import React, { useState } from 'react';
import AdminNav from '@/components/AdminNav';

export default function OrdersManagement() {
  const [orders, setOrders] = useState([
    {
      id: 'ORD-001',
      customer: {
        name: 'John Smith',
        email: 'john.smith@email.com',
        phone: '+1 (555) 123-4567'
      },
      items: [
        { name: 'Sony WH-1000XM4 Wireless Headphones', quantity: 1, price: 349.99 },
        { name: 'Apple Watch Series 9', quantity: 1, price: 399.99 }
      ],
      total: 749.98,
      status: 'Delivered',
      date: '2024-01-15',
      shippingAddress: '123 Main St, New York, NY 10001',
      paymentMethod: 'Credit Card',
      trackingNumber: 'TRK123456789'
    },
    {
      id: 'ORD-002',
      customer: {
        name: 'Sarah Johnson',
        email: 'sarah.j@email.com',
        phone: '+1 (555) 987-6543'
      },
      items: [
        { name: 'MacBook Pro 14" M3 Pro', quantity: 1, price: 1999.99 }
      ],
      total: 1999.99,
      status: 'Shipped',
      date: '2024-01-14',
      shippingAddress: '456 Oak Ave, Los Angeles, CA 90210',
      paymentMethod: 'PayPal',
      trackingNumber: 'TRK987654321'
    },
    {
      id: 'ORD-003',
      customer: {
        name: 'Mike Wilson',
        email: 'mike.wilson@email.com',
        phone: '+1 (555) 456-7890'
      },
      items: [
        { name: 'PlayStation 5 Console', quantity: 1, price: 499.99 },
        { name: 'Samsung Galaxy S24 Ultra', quantity: 1, price: 1199.99 }
      ],
      total: 1699.98,
      status: 'Processing',
      date: '2024-01-14',
      shippingAddress: '789 Pine Rd, Chicago, IL 60601',
      paymentMethod: 'Credit Card',
      trackingNumber: null
    },
    {
      id: 'ORD-004',
      customer: {
        name: 'Emily Davis',
        email: 'emily.davis@email.com',
        phone: '+1 (555) 321-6540'
      },
      items: [
        { name: 'Canon EOS R6 Mark II', quantity: 1, price: 2499.99 }
      ],
      total: 2499.99,
      status: 'Pending',
      date: '2024-01-13',
      shippingAddress: '321 Elm St, Miami, FL 33101',
      paymentMethod: 'Credit Card',
      trackingNumber: null
    }
  ]);

  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const statuses = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || order.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return { bg: '#dcfce7', color: '#15803d' };
      case 'Shipped': return { bg: '#dbeafe', color: '#1d4ed8' };
      case 'Processing': return { bg: '#fef3c7', color: '#d97706' };
      case 'Pending': return { bg: '#fee2e2', color: '#dc2626' };
      case 'Cancelled': return { bg: '#f3f4f6', color: '#6b7280' };
      default: return { bg: '#f3f4f6', color: '#6b7280' };
    }
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

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
            <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.5rem' }}>
              Orders Management
            </h1>
            <p style={{ color: '#64748b' }}>
              Track and manage customer orders, shipping, and delivery
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button style={{
              padding: '0.75rem 1.5rem',
              background: '#f1f5f9',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              cursor: 'pointer'
            }}>
              📊 Export Orders
            </button>
            <button style={{
              padding: '0.75rem 1.5rem',
              background: '#22c55e',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer'
            }}>
              📦 Bulk Actions
            </button>
          </div>
        </div>

        {/* Filters */}
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e2e8f0',
          marginBottom: '2rem',
          display: 'flex',
          gap: '1rem',
          alignItems: 'center'
        }}>
          <div style={{ flex: 1 }}>
            <input
              type="text"
              placeholder="Search orders by ID, customer name, or email..."
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
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            style={{
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

        {/* Orders Table */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e2e8f0',
          overflow: 'hidden'
        }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ background: '#f8fafc' }}>
                <tr>
                  <th style={{ textAlign: 'left', padding: '1rem', color: '#64748b', fontWeight: '600' }}>Order ID</th>
                  <th style={{ textAlign: 'left', padding: '1rem', color: '#64748b', fontWeight: '600' }}>Customer</th>
                  <th style={{ textAlign: 'left', padding: '1rem', color: '#64748b', fontWeight: '600' }}>Items</th>
                  <th style={{ textAlign: 'left', padding: '1rem', color: '#64748b', fontWeight: '600' }}>Total</th>
                  <th style={{ textAlign: 'left', padding: '1rem', color: '#64748b', fontWeight: '600' }}>Status</th>
                  <th style={{ textAlign: 'left', padding: '1rem', color: '#64748b', fontWeight: '600' }}>Date</th>
                  <th style={{ textAlign: 'left', padding: '1rem', color: '#64748b', fontWeight: '600' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order, index) => {
                  const statusColors = getStatusColor(order.status);
                  return (
                    <tr key={order.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '1rem' }}>
                        <p style={{ fontWeight: '600', color: '#1e293b', marginBottom: '0.25rem' }}>
                          {order.id}
                        </p>
                        <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
                          {order.paymentMethod}
                        </p>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <p style={{ fontWeight: '600', color: '#1e293b', marginBottom: '0.25rem' }}>
                          {order.customer.name}
                        </p>
                        <p style={{ fontSize: '0.875rem', color: '#64748b' }}>
                          {order.customer.email}
                        </p>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <div>
                          {order.items.map((item, idx) => (
                            <p key={idx} style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.25rem' }}>
                              {item.quantity}x {item.name}
                            </p>
                          ))}
                        </div>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <p style={{ fontWeight: '600', color: '#22c55e', fontSize: '1.125rem' }}>
                          ${order.total.toFixed(2)}
                        </p>
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{
                          background: statusColors.bg,
                          color: statusColors.color,
                          padding: '0.25rem 0.5rem',
                          borderRadius: '4px',
                          fontSize: '0.875rem',
                          fontWeight: '600'
                        }}>
                          {order.status}
                        </span>
                      </td>
                      <td style={{ padding: '1rem', color: '#64748b' }}>
                        {order.date}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button
                            onClick={() => setSelectedOrder(order)}
                            style={{
                              padding: '0.5rem',
                              background: '#dbeafe',
                              border: 'none',
                              borderRadius: '4px',
                              color: '#1d4ed8',
                              cursor: 'pointer'
                            }}
                          >
                            👁️
                          </button>
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                            style={{
                              padding: '0.5rem',
                              border: '1px solid #d1d5db',
                              borderRadius: '4px',
                              fontSize: '0.75rem',
                              background: 'white'
                            }}
                          >
                            {statuses.filter(s => s !== 'All').map(status => (
                              <option key={status} value={status}>{status}</option>
                            ))}
                          </select>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Details Modal */}
        {selectedOrder && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}>
            <div style={{
              background: 'white',
              borderRadius: '12px',
              padding: '2rem',
              width: '90%',
              maxWidth: '800px',
              maxHeight: '90vh',
              overflow: 'auto'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '1.5rem'
              }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600' }}>
                  Order Details - {selectedOrder.id}
                </h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '1.5rem',
                    cursor: 'pointer',
                    color: '#64748b'
                  }}
                >
                  ✕
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                {/* Customer Information */}
                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
                    Customer Information
                  </h3>
                  <div style={{
                    background: '#f8fafc',
                    padding: '1rem',
                    borderRadius: '8px'
                  }}>
                    <p style={{ marginBottom: '0.5rem' }}>
                      <strong>Name:</strong> {selectedOrder.customer.name}
                    </p>
                    <p style={{ marginBottom: '0.5rem' }}>
                      <strong>Email:</strong> {selectedOrder.customer.email}
                    </p>
                    <p style={{ marginBottom: '0.5rem' }}>
                      <strong>Phone:</strong> {selectedOrder.customer.phone}
                    </p>
                    <p>
                      <strong>Shipping Address:</strong><br />
                      {selectedOrder.shippingAddress}
                    </p>
                  </div>
                </div>

                {/* Order Information */}
                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
                    Order Information
                  </h3>
                  <div style={{
                    background: '#f8fafc',
                    padding: '1rem',
                    borderRadius: '8px'
                  }}>
                    <p style={{ marginBottom: '0.5rem' }}>
                      <strong>Order Date:</strong> {selectedOrder.date}
                    </p>
                    <p style={{ marginBottom: '0.5rem' }}>
                      <strong>Payment Method:</strong> {selectedOrder.paymentMethod}
                    </p>
                    <p style={{ marginBottom: '0.5rem' }}>
                      <strong>Status:</strong> 
                      <span style={{
                        background: getStatusColor(selectedOrder.status).bg,
                        color: getStatusColor(selectedOrder.status).color,
                        padding: '0.25rem 0.5rem',
                        borderRadius: '4px',
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        marginLeft: '0.5rem'
                      }}>
                        {selectedOrder.status}
                      </span>
                    </p>
                    {selectedOrder.trackingNumber && (
                      <p>
                        <strong>Tracking Number:</strong> {selectedOrder.trackingNumber}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div style={{ marginTop: '2rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
                  Order Items
                </h3>
                <div style={{
                  background: '#f8fafc',
                  borderRadius: '8px',
                  overflow: 'hidden'
                }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ background: '#e2e8f0' }}>
                      <tr>
                        <th style={{ textAlign: 'left', padding: '1rem', fontWeight: '600' }}>Item</th>
                        <th style={{ textAlign: 'center', padding: '1rem', fontWeight: '600' }}>Quantity</th>
                        <th style={{ textAlign: 'right', padding: '1rem', fontWeight: '600' }}>Price</th>
                        <th style={{ textAlign: 'right', padding: '1rem', fontWeight: '600' }}>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.items.map((item, index) => (
                        <tr key={index} style={{ borderBottom: '1px solid #e2e8f0' }}>
                          <td style={{ padding: '1rem' }}>{item.name}</td>
                          <td style={{ padding: '1rem', textAlign: 'center' }}>{item.quantity}</td>
                          <td style={{ padding: '1rem', textAlign: 'right' }}>${item.price.toFixed(2)}</td>
                          <td style={{ padding: '1rem', textAlign: 'right', fontWeight: '600' }}>
                            ${(item.quantity * item.price).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot style={{ background: '#e2e8f0' }}>
                      <tr>
                        <td colSpan={3} style={{ padding: '1rem', textAlign: 'right', fontWeight: '600' }}>
                          Total:
                        </td>
                        <td style={{ padding: '1rem', textAlign: 'right', fontWeight: '700', fontSize: '1.125rem' }}>
                          ${selectedOrder.total.toFixed(2)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* Actions */}
              <div style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'flex-end',
                marginTop: '2rem',
                paddingTop: '1rem',
                borderTop: '1px solid #e2e8f0'
              }}>
                <button
                  onClick={() => setSelectedOrder(null)}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: '#f1f5f9',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}
                >
                  Close
                </button>
                <button style={{
                  padding: '0.75rem 1.5rem',
                  background: '#22c55e',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}>
                  Print Invoice
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 