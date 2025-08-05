'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Search, 
  Filter, 
  Mail, 
  Phone, 
  Calendar, 
  Eye, 
  Edit, 
  Trash2,
  MoreVertical,
  UserPlus,
  Download,
  Star,
  ShoppingBag,
  DollarSign,
  Grid,
  List
} from 'lucide-react';

interface Customer {
  _id?: string;
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  totalOrders: number;
  totalSpent: number;
  lastOrder: string;
  status: 'active' | 'inactive' | 'suspended' | 'pending';
  avatar: string;
  role: 'customer' | 'admin' | 'moderator';
  verified: boolean;
  lastLogin: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/admin/customers');
        const data = await response.json();
        
        if (data.success) {
          setCustomers(data.customers || []);
        } else {
          console.error('Failed to fetch customers:', data.message);
          setCustomers([]);
        }
      } catch (error) {
        console.error('Error fetching customers:', error);
        setCustomers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = (customer.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
                         (customer.email?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
    const matchesRole = roleFilter === 'all' || customer.role === roleFilter;
    return matchesSearch && matchesStatus && matchesRole;
  });

  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    let aValue: any = a[sortBy as keyof Customer];
    let bValue: any = b[sortBy as keyof Customer];

    if (sortBy === 'joinDate' || sortBy === 'lastOrder') {
      // Handle invalid dates by using a fallback
      const aDate = aValue ? new Date(aValue).getTime() : 0;
      const bDate = bValue ? new Date(bValue).getTime() : 0;
      aValue = isNaN(aDate) ? 0 : aDate;
      bValue = isNaN(bDate) ? 0 : bDate;
    }

    // Handle undefined/null values
    if (aValue === undefined || aValue === null) aValue = '';
    if (bValue === undefined || bValue === null) bValue = '';

    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50';
      case 'inactive': return 'text-gray-600 bg-gray-50';
      case 'suspended': return 'text-red-600 bg-red-50';
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'text-purple-600 bg-purple-50';
      case 'moderator': return 'text-blue-600 bg-blue-50';
      case 'customer': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const handleDeleteCustomer = async (customerId: string) => {
    if (!confirm('Are you sure you want to delete this customer?')) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/customers/${customerId}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setCustomers(customers.filter(c => c.id !== customerId));
        alert('Customer deleted successfully');
      } else {
        alert('Failed to delete customer');
      }
    } catch (error) {
      console.error('Error deleting customer:', error);
      alert('Error deleting customer');
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedCustomers.length === 0) {
      alert('Please select customers to delete');
      return;
    }

    if (!confirm(`Are you sure you want to delete ${selectedCustomers.length} customers?`)) {
      return;
    }

    try {
      const deletePromises = selectedCustomers.map(customerId =>
        fetch(`/api/admin/customers/${customerId}`, { method: 'DELETE' })
      );
      
      await Promise.all(deletePromises);
      
      setCustomers(customers.filter(customer => !selectedCustomers.includes(customer.id)));
      setSelectedCustomers([]);
      
      alert('Selected customers deleted successfully');
    } catch (error) {
      console.error('Error deleting customers:', error);
      alert('Error deleting customers');
    }
  };

  const handleStatusChange = async (customerId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/customers/${customerId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (response.ok) {
        setCustomers(customers.map(customer => 
          customer.id === customerId 
            ? { ...customer, status: newStatus as any }
            : customer
        ));
        alert(`Customer status updated to ${newStatus}`);
      } else {
        alert('Failed to update customer status');
      }
    } catch (error) {
      console.error('Error updating customer status:', error);
      alert('Error updating customer status');
    }
  };

  const handleSelectAll = () => {
    if (selectedCustomers.length === sortedCustomers.length) {
      setSelectedCustomers([]);
    } else {
      setSelectedCustomers(sortedCustomers.map(c => c.id));
    }
  };

  const handleSelectCustomer = (customerId: string) => {
    setSelectedCustomers(prev => 
      prev.includes(customerId) 
        ? prev.filter(id => id !== customerId)
        : [...prev, customerId]
    );
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
              <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
              <p className="text-gray-600 mt-1">Manage your customer database</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <Download className="w-4 h-4" />
                Export
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all duration-300">
                <UserPlus className="w-4 h-4" />
                Add Customer
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
          <div className="bg-white rounded-2xl shadow-lg p-4 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Customers</p>
                <p className="text-2xl font-bold text-gray-900">{customers.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-4 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Customers</p>
                <p className="text-2xl font-bold text-gray-900">
                  {customers.filter(c => c.status === 'active').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-4 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">
                  {customers.reduce((sum, c) => sum + (c.totalOrders || 0), 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-4 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${customers.reduce((sum, c) => sum + (c.totalSpent || 0), 0).toLocaleString()}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-4 border border-gray-100 mb-4">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search customers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
                <option value="pending">Pending</option>
              </select>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Roles</option>
                <option value="customer">Customer</option>
                <option value="admin">Admin</option>
                <option value="moderator">Moderator</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="name">Sort by Name</option>
                <option value="joinDate">Sort by Join Date</option>
                <option value="totalOrders">Sort by Orders</option>
                <option value="totalSpent">Sort by Spent</option>
                <option value="lastOrder">Sort by Last Order</option>
              </select>
              <button
                onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </button>
            </div>
          </div>
        </motion.div>

        {/* View Controls */}
        <motion.div variants={itemVariants} className="bg-blue-50 rounded-2xl shadow-lg p-6 border-2 border-blue-200 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-3">
                <span className="text-lg font-bold text-blue-900">View Mode:</span>
                <span className="text-sm text-blue-700">Current: {viewMode.toUpperCase()}</span>
              </div>
              <div className="flex border-2 border-blue-300 rounded-xl shadow-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('list')}
                  className={`flex items-center gap-3 px-6 py-3 ${viewMode === 'list' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-blue-600 hover:bg-blue-50'} transition-all duration-200 font-semibold`}
                  title="List View"
                >
                  <List className="w-5 h-5" />
                  <span className="text-base">List View</span>
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`flex items-center gap-3 px-6 py-3 ${viewMode === 'grid' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-blue-600 hover:bg-blue-50'} transition-all duration-200 font-semibold`}
                  title="Grid View"
                >
                  <Grid className="w-5 h-5" />
                  <span className="text-base">Grid View</span>
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-white rounded-lg px-4 py-2 border border-blue-200">
                <span className="text-sm font-medium text-blue-900">
                  {sortedCustomers.length} customers
                </span>
              </div>
              {selectedCustomers.length > 0 && (
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-bold text-red-600 bg-red-100 px-3 py-2 rounded-lg">
                    {selectedCustomers.length} selected
                  </span>
                  <button
                    onClick={handleDeleteSelected}
                    className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors duration-200 font-bold shadow-lg"
                  >
                    🗑️ Delete Selected
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Customers List */}
        <motion.div variants={itemVariants}>
          {loading ? (
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading customers...</p>
            </div>
          ) : sortedCustomers.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 text-center">
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No customers found</h3>
              <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
            </div>
          ) : viewMode === 'list' ? (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left">
                        <input
                          type="checkbox"
                          checked={selectedCustomers.length === sortedCustomers.length && sortedCustomers.length > 0}
                          onChange={handleSelectAll}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Customer</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Contact</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Role</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Join Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Orders</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Total Spent</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {sortedCustomers.map((customer) => (
                      <tr key={customer.id} className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={selectedCustomers.includes(customer.id)}
                            onChange={() => handleSelectCustomer(customer.id)}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center text-lg shadow-sm">
                              {customer.avatar}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{customer.name}</p>
                              <div className="flex items-center space-x-2 mt-1">
                                <p className="text-xs text-gray-500">ID: {customer.id}</p>
                                {customer.verified && (
                                  <span className="px-1.5 py-0.5 rounded-full text-xs font-medium text-green-600 bg-green-50">
                                    ✓ Verified
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <Mail className="w-4 h-4 text-gray-400" />
                              <span className="text-sm font-medium text-gray-900 truncate max-w-32">{customer.email}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Phone className="w-4 h-4 text-gray-400" />
                              <span className="text-sm text-gray-600">{customer.phone}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col space-y-1">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(customer.role || 'customer')}`}>
                              {customer.role ? customer.role.charAt(0).toUpperCase() + customer.role.slice(1) : 'Customer'}
                            </span>
                            {customer.lastLogin && (
                              <span className="text-xs text-gray-500">
                                Last: {new Date(customer.lastLogin).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-900">
                              {new Date(customer.joinDate).toLocaleDateString()}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-gray-900">{customer.totalOrders}</span>
                            {customer.lastOrder && (
                              <span className="text-xs text-gray-500">
                                Last: {new Date(customer.lastOrder).toLocaleDateString()}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-green-600">
                              ${customer.totalSpent.toLocaleString()}
                            </span>
                            {customer.totalOrders > 0 && (
                              <span className="text-xs text-gray-500">
                                Avg: ${(customer.totalSpent / customer.totalOrders).toFixed(2)}
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(customer.status)}`}>
                            {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors duration-200 rounded-lg hover:bg-blue-50" title="View Details">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors duration-200 rounded-lg hover:bg-blue-50" title="Edit Customer">
                              <Edit className="w-4 h-4" />
                            </button>
                            <select
                              value={customer.status}
                              onChange={(e) => handleStatusChange(customer.id, e.target.value)}
                              className="text-xs border border-gray-300 rounded-lg px-2 py-1.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                            >
                              <option value="active">Active</option>
                              <option value="inactive">Inactive</option>
                              <option value="suspended">Suspended</option>
                              <option value="pending">Pending</option>
                            </select>
                            <button 
                              onClick={() => handleDeleteCustomer(customer.id)}
                              className="p-2 text-red-500 hover:text-red-700 transition-colors duration-200 rounded-lg hover:bg-red-100 border border-red-200"
                              title="Delete Customer"
                            >
                              🗑️ Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedCustomers.map((customer) => (
                <motion.div 
                  key={customer.id} 
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 group"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Customer Header */}
                  <div className="p-6 pb-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center text-xl shadow-sm">
                          {customer.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 truncate">{customer.name}</h3>
                          <p className="text-sm text-gray-500 truncate">{customer.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors duration-200 rounded-lg hover:bg-blue-50" title="View Details">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors duration-200 rounded-lg hover:bg-blue-50" title="Edit Customer">
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Role and Status Badges */}
                    <div className="flex items-center space-x-2 mb-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(customer.role || 'customer')}`}>
                        {customer.role ? customer.role.charAt(0).toUpperCase() + customer.role.slice(1) : 'Customer'}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(customer.status)}`}>
                        {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                      </span>
                      {customer.verified && (
                        <span className="px-2 py-1 rounded-full text-xs font-medium text-green-600 bg-green-50">
                          ✓ Verified
                        </span>
                      )}
                    </div>
                  </div>
                  
                  {/* Customer Stats */}
                  <div className="px-6 pb-4">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-1">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span className="text-xs text-gray-500">Phone</span>
                        </div>
                        <p className="text-sm font-medium text-gray-900 truncate">{customer.phone}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-1">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-xs text-gray-500">Joined</span>
                        </div>
                        <p className="text-sm font-medium text-gray-900">
                          {new Date(customer.joinDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-blue-50 rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-1">
                          <ShoppingBag className="w-4 h-4 text-blue-500" />
                          <span className="text-xs text-blue-600">Orders</span>
                        </div>
                        <p className="text-sm font-bold text-blue-900">{customer.totalOrders}</p>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3">
                        <div className="flex items-center space-x-2 mb-1">
                          <DollarSign className="w-4 h-4 text-green-500" />
                          <span className="text-xs text-green-600">Spent</span>
                        </div>
                        <p className="text-sm font-bold text-green-900">${customer.totalSpent.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>

                  {/* Customer Actions */}
                  <div className="px-6 pb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <select
                          value={customer.status}
                          onChange={(e) => handleStatusChange(customer.id, e.target.value)}
                          className="text-xs border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                          <option value="suspended">Suspended</option>
                          <option value="pending">Pending</option>
                        </select>
                      </div>
                      <div className="flex items-center space-x-1">
                        <button 
                          onClick={() => handleDeleteCustomer(customer.id)}
                          className="p-2 text-red-500 hover:text-red-700 transition-colors duration-200 rounded-lg hover:bg-red-100 border border-red-200"
                          title="Delete Customer"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
} 