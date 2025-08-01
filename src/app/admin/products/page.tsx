'use client';

import React, { useState, useEffect } from 'react';
import AdminNav from '@/components/AdminNav';

export default function ProductsManagement() {
  const [products, setProducts] = useState<any[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Electronics', 'Wearables', 'Computers', 'Gaming', 'Cameras', 'Phones', 'Accessories'];
  const statuses = ['All', 'Active', 'Inactive', 'Out of Stock'];

  // Simulate data loading
  useEffect(() => {
    setTimeout(() => {
      setProducts([
        {
          id: 1,
          name: 'Sony WH-1000XM4 Wireless Headphones',
          price: 349.99,
          originalPrice: 399.99,
          category: 'Electronics',
          stock: 45,
          status: 'Active',
          image: '🎧',
          description: 'Industry-leading noise canceling with Dual Noise Sensor technology',
          sku: 'SONY-WH1000XM4',
          rating: 4.8,
          reviews: 1247,
          featured: true,
          createdAt: '2024-01-10'
        },
        {
          id: 2,
          name: 'Apple Watch Series 9',
          price: 399.99,
          originalPrice: 449.99,
          category: 'Wearables',
          stock: 23,
          status: 'Active',
          image: '⌚',
          description: 'Advanced health monitoring with ECG and blood oxygen tracking',
          sku: 'APPLE-WATCH-S9',
          rating: 4.9,
          reviews: 892,
          featured: true,
          createdAt: '2024-01-08'
        },
        {
          id: 3,
          name: 'MacBook Pro 14" M3 Pro',
          price: 1999.99,
          originalPrice: 2199.99,
          category: 'Computers',
          stock: 12,
          status: 'Active',
          image: '💻',
          description: 'Next-generation performance with M3 Pro chip',
          sku: 'APPLE-MBP-14-M3',
          rating: 4.7,
          reviews: 567,
          featured: false,
          createdAt: '2024-01-05'
        },
        {
          id: 4,
          name: 'Canon EOS R6 Mark II',
          price: 2499.99,
          originalPrice: 2799.99,
          category: 'Cameras',
          stock: 8,
          status: 'Active',
          image: '📷',
          description: 'Full-frame mirrorless camera with 4K video recording',
          sku: 'CANON-R6-MK2',
          rating: 4.6,
          reviews: 234,
          featured: false,
          createdAt: '2024-01-03'
        },
        {
          id: 5,
          name: 'PlayStation 5 Console',
          price: 499.99,
          originalPrice: 599.99,
          category: 'Gaming',
          stock: 0,
          status: 'Out of Stock',
          image: '🎮',
          description: 'Next-gen gaming with lightning-fast loading and ray tracing',
          sku: 'SONY-PS5',
          rating: 4.9,
          reviews: 1567,
          featured: true,
          createdAt: '2024-01-01'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredProducts = products && products.length > 0 ? products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || product.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  }).sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];
    
    if (sortBy === 'price' || sortBy === 'stock' || sortBy === 'rating') {
      aValue = parseFloat(aValue);
      bValue = parseFloat(bValue);
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  }) : [];

  const handleAddProduct = (productData: any) => {
    const newProduct = {
      id: products.length + 1,
      ...productData,
      status: 'Active',
      rating: 0,
      reviews: 0,
      featured: false,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setProducts([...products, newProduct]);
    setShowAddModal(false);
  };

  const handleEditProduct = (productData: any) => {
    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct.id ? { ...p, ...productData } : p));
      setEditingProduct(null);
    }
  };

  const handleDeleteProduct = (id: number) => {
    if (confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const toggleFeatured = (id: number) => {
    setProducts(products.map(p => p.id === id ? { ...p, featured: !p.featured } : p));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return { bg: '#dcfce7', color: '#15803d', border: '#bbf7d0' };
      case 'Inactive': return { bg: '#f3f4f6', color: '#6b7280', border: '#e5e7eb' };
      case 'Out of Stock': return { bg: '#fee2e2', color: '#dc2626', border: '#fecaca' };
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
              <p style={{ color: '#64748b', fontSize: '1.125rem' }}>Loading products...</p>
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
              Products Management
            </h1>
            <p style={{ color: '#64748b', fontSize: '1.125rem' }}>
              Manage your product catalog, inventory, and pricing
            </p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            style={{
              padding: '1rem 2rem',
              background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '1rem',
              boxShadow: '0 4px 6px -1px rgba(34, 197, 94, 0.2)',
              transition: 'all 0.2s'
            }} onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 15px -3px rgba(34, 197, 94, 0.3)';
            }} onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(34, 197, 94, 0.2)';
            }}
          >
            ➕ Add New Product
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
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📦</div>
            <p style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.25rem' }}>
              {products.length}
            </p>
            <p style={{ color: '#64748b', fontSize: '0.875rem' }}>Total Products</p>
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
              {products ? products.filter(p => p.featured).length : 0}
            </p>
            <p style={{ color: '#64748b', fontSize: '0.875rem' }}>Featured Products</p>
          </div>
          <div style={{
            background: 'white',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚠️</div>
            <p style={{ fontSize: '1.5rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.25rem' }}>
              {products ? products.filter(p => p.stock === 0).length : 0}
            </p>
            <p style={{ color: '#64748b', fontSize: '0.875rem' }}>Out of Stock</p>
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
              ${products ? products.reduce((sum, p) => sum + p.price, 0).toLocaleString() : '0'}
            </p>
            <p style={{ color: '#64748b', fontSize: '0.875rem' }}>Total Value</p>
          </div>
        </div>

        {/* Filters and Search */}
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
            gridTemplateColumns: '2fr 1fr 1fr 1fr auto',
            gap: '1rem',
            alignItems: 'end'
          }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>
                Search Products
              </label>
              <input
                type="text"
                placeholder="Search by name or SKU..."
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
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  background: 'white'
                }}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
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
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500', color: '#374151' }}>
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  background: 'white'
                }}
              >
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="stock">Stock</option>
                <option value="rating">Rating</option>
                <option value="createdAt">Date Added</option>
              </select>
            </div>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              style={{
                padding: '0.75rem',
                background: '#f1f5f9',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1rem'
              }}
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '1.5rem'
        }}>
          {filteredProducts.map((product) => {
            const statusColors = getStatusColor(product.status);
            return (
              <div key={product.id} style={{
                background: 'white',
                borderRadius: '16px',
                overflow: 'hidden',
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
                {/* Product Image */}
                <div style={{
                  width: '100%',
                  height: '200px',
                  background: 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '4rem',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: product.featured ? '#fbbf24' : 'transparent',
                    color: product.featured ? 'white' : 'transparent',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: '600'
                  }}>
                    {product.featured ? '⭐ Featured' : ''}
                  </div>
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: statusColors.bg,
                    color: statusColors.color,
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    border: `1px solid ${statusColors.border}`
                  }}>
                    {product.status}
                  </div>
                  <div style={{ fontSize: '4rem', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.1))' }}>
                    {product.image}
                  </div>
                </div>

                {/* Product Content */}
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    color: '#1e293b',
                    marginBottom: '0.5rem',
                    lineHeight: '1.4'
                  }}>
                    {product.name}
                  </h3>
                  
                  <p style={{
                    fontSize: '0.875rem',
                    color: '#64748b',
                    marginBottom: '1rem',
                    lineHeight: '1.4'
                  }}>
                    {product.description}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      {[...Array(5)].map((_, i) => (
                        <span key={i} style={{
                          color: i < Math.floor(product.rating) ? '#fbbf24' : '#e5e7eb',
                          fontSize: '0.875rem'
                        }}>
                          ★
                        </span>
                      ))}
                    </div>
                    <span style={{ color: '#64748b', fontSize: '0.875rem' }}>
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div>
                      <span style={{
                        fontSize: '1.25rem',
                        fontWeight: '700',
                        color: '#22c55e'
                      }}>
                        ${product.price}
                      </span>
                      <span style={{
                        fontSize: '0.875rem',
                        color: '#9ca3af',
                        textDecoration: 'line-through',
                        marginLeft: '0.5rem'
                      }}>
                        ${product.originalPrice}
                      </span>
                    </div>
                    <span style={{
                      background: product.stock > 10 ? '#dcfce7' : product.stock > 0 ? '#fef3c7' : '#fee2e2',
                      color: product.stock > 10 ? '#15803d' : product.stock > 0 ? '#d97706' : '#dc2626',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      fontWeight: '600'
                    }}>
                      {product.stock} in stock
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => setEditingProduct(product)}
                      style={{
                        flex: 1,
                        padding: '0.75rem',
                        background: '#dbeafe',
                        border: 'none',
                        borderRadius: '8px',
                        color: '#1d4ed8',
                        cursor: 'pointer',
                        fontWeight: '500',
                        fontSize: '0.875rem'
                      }}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => toggleFeatured(product.id)}
                      style={{
                        padding: '0.75rem',
                        background: product.featured ? '#fef3c7' : '#f3f4f6',
                        border: 'none',
                        borderRadius: '8px',
                        color: product.featured ? '#d97706' : '#6b7280',
                        cursor: 'pointer',
                        fontSize: '1rem'
                      }}
                    >
                      {product.featured ? '⭐' : '☆'}
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      style={{
                        padding: '0.75rem',
                        background: '#fee2e2',
                        border: 'none',
                        borderRadius: '8px',
                        color: '#dc2626',
                        cursor: 'pointer',
                        fontSize: '1rem'
                      }}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div style={{
            background: 'white',
            padding: '4rem 2rem',
            borderRadius: '16px',
            textAlign: 'center',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#1e293b', marginBottom: '0.5rem' }}>
              No products found
            </h3>
            <p style={{ color: '#64748b' }}>
              Try adjusting your search criteria or add a new product.
            </p>
          </div>
        )}

        {/* Add/Edit Product Modal */}
        {(showAddModal || editingProduct) && (
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
              borderRadius: '16px',
              padding: '2rem',
              width: '90%',
              maxWidth: '600px',
              maxHeight: '90vh',
              overflow: 'auto'
            }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem' }}>
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              
              <form onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const formData = new FormData(form);
                const productData = {
                  name: formData.get('name') as string,
                  price: parseFloat(formData.get('price') as string),
                  originalPrice: parseFloat(formData.get('originalPrice') as string),
                  category: formData.get('category') as string,
                  stock: parseInt(formData.get('stock') as string),
                  description: formData.get('description') as string,
                  sku: formData.get('sku') as string,
                  image: formData.get('image') as string
                };
                
                if (editingProduct) {
                  handleEditProduct(productData);
                } else {
                  handleAddProduct(productData);
                }
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Product Name</label>
                    <input
                      name="name"
                      defaultValue={editingProduct?.name}
                      required
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>SKU</label>
                    <input
                      name="sku"
                      defaultValue={editingProduct?.sku}
                      required
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px'
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Price</label>
                    <input
                      name="price"
                      type="number"
                      step="0.01"
                      defaultValue={editingProduct?.price}
                      required
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Original Price</label>
                    <input
                      name="originalPrice"
                      type="number"
                      step="0.01"
                      defaultValue={editingProduct?.originalPrice}
                      required
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Stock</label>
                    <input
                      name="stock"
                      type="number"
                      defaultValue={editingProduct?.stock}
                      required
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px'
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Category</label>
                    <select
                      name="category"
                      defaultValue={editingProduct?.category}
                      required
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px',
                        background: 'white'
                      }}
                    >
                      {categories ? categories.filter(cat => cat !== 'All').map(category => (
                        <option key={category} value={category}>{category}</option>
                      )) : []}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Emoji Icon</label>
                    <input
                      name="image"
                      defaultValue={editingProduct?.image}
                      placeholder="🎧"
                      required
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '8px'
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Description</label>
                  <textarea
                    name="description"
                    defaultValue={editingProduct?.description}
                    required
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      resize: 'vertical'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      setEditingProduct(null);
                    }}
                    style={{
                      padding: '0.75rem 1.5rem',
                      background: '#f1f5f9',
                      border: '1px solid #d1d5db',
                      borderRadius: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      padding: '0.75rem 1.5rem',
                      background: '#22c55e',
                      color: 'white',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: '600',
                      cursor: 'pointer'
                    }}
                  >
                    {editingProduct ? 'Update Product' : 'Add Product'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 