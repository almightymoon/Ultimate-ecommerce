'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Edit, 
  Save, 
  X, 
  CheckCircle, 
  Clock, 
  Truck, 
  Package,
  AlertCircle,
  DollarSign,
  User,
  Calendar,
  MapPin,
  Phone,
  Mail,
  CreditCard,
  Download,
  Share2
} from 'lucide-react';
import CuteInvoice from '@/components/CuteInvoice';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  _id: string;
  userId: string;
  items?: OrderItem[];
  total?: number;
  totals?: {
    subtotal: number;
    shipping: number;
    tax: number;
    total: number;
  };
  status: string;
  shipping?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  shippingAddress?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  payment?: {
    method: string;
    amount: number;
    currency: string;
    status: string;
  };
  paymentMethod?: string;
  createdAt: string;
  updatedAt: string;
  paymentStatus?: string;
}

const statusOptions = [
  { value: 'pending', label: 'Pending', color: 'yellow', icon: Clock, description: 'Order received, waiting to be processed' },
  { value: 'processing', label: 'Processing', color: 'blue', icon: Package, description: 'Order is being prepared for shipping' },
  { value: 'shipped', label: 'Shipped', color: 'purple', icon: Truck, description: 'Order has been shipped and is in transit' },
  { value: 'in_transit', label: 'In Transit', color: 'indigo', icon: Truck, description: 'Order is currently being delivered' },
  { value: 'delivered', label: 'Delivered', color: 'green', icon: CheckCircle, description: 'Order has been successfully delivered' },
  { value: 'cancelled', label: 'Cancelled', color: 'red', icon: AlertCircle, description: 'Order has been cancelled' }
];

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [status, setStatus] = useState('');
  const [showInvoice, setShowInvoice] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/admin/orders/${params.id}`);
        const data = await response.json();
        
        if (data.success) {
          setOrder(data.order);
          setStatus(data.order.status);
        } else {
          console.error('Failed to fetch order:', data.message);
        }
      } catch (error) {
        console.error('Error fetching order:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchOrder();
    }
  }, [params.id]);

  const handleStatusUpdate = async () => {
    try {
      const response = await fetch(`/api/admin/orders/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setOrder(data.order);
        setEditing(false);
      } else {
        console.error('Failed to update order status:', data.message);
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const getStatusColor = (status: string) => {
    const statusOption = statusOptions.find(s => s.value === status);
    return statusOption ? statusOption.color : 'gray';
  };

  const getStatusIcon = (status: string) => {
    const statusOption = statusOptions.find(s => s.value === status);
    return statusOption ? statusOption.icon : Clock;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Not Found</h2>
          <p className="text-gray-600 mb-4">The order you're looking for doesn't exist.</p>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (showInvoice) {
    return (
      <div className="p-6">
        <div className="mb-6">
          <button
            onClick={() => setShowInvoice(false)}
            className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Order Details</span>
          </button>
        </div>
        <CuteInvoice
          orderId={order._id}
          customerName={`User ${order.userId}`}
          customerEmail="customer@example.com"
          customerPhone="+1 (555) 123-4567"
          customerAddress={`${order.shipping?.address || order.shippingAddress?.street || 'N/A'}, ${order.shipping?.city || order.shippingAddress?.city || 'N/A'}, ${order.shipping?.state || order.shippingAddress?.state || 'N/A'} ${order.shipping?.zipCode || order.shippingAddress?.zipCode || 'N/A'}`}
          billingAddress={`${order.shipping?.address || order.shippingAddress?.street || 'N/A'}, ${order.shipping?.city || order.shippingAddress?.city || 'N/A'}, ${order.shipping?.state || order.shippingAddress?.state || 'N/A'} ${order.shipping?.zipCode || order.shippingAddress?.zipCode || 'N/A'}`}
          items={order.items || []}
          subtotal={order.totals?.subtotal || order.total || 0}
          tax={order.totals?.tax || (order.total || 0) * 0.08}
          shipping={order.totals?.shipping || 9.99}
          total={order.totals?.total || (order.total || 0) * 1.08 + 9.99}
          paymentMethod={order.payment?.method || order.paymentMethod || 'N/A'}
          transactionId={`TXN-${order._id.slice(-8)}`}
          orderDate={order.createdAt}
          companyInfo={{
            name: 'Ultimate E-Commerce',
            address: '123 Business St, Tech City, TC 12345',
            phone: '+1 (555) 123-4567',
            email: 'info@ultimate-ecommerce.com',
            website: 'www.ultimate-ecommerce.com'
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
              className="p-3 text-gray-600 hover:text-gray-900 hover:bg-white rounded-xl transition-all duration-200 shadow-sm"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Order #{order._id.slice(-6)}</h1>
              <div className="flex items-center space-x-4 mt-2">
                <p className="text-gray-600">Order details and management</p>
                <span className="text-sm text-gray-500">•</span>
                <p className="text-sm text-gray-500">Created {formatDate(order.createdAt)}</p>
              </div>
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setShowInvoice(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Download className="w-4 h-4" />
              <span>View Invoice</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Order Status</h2>
                <p className="text-sm text-gray-500 mt-1">
                  {statusOptions.find(s => s.value === order.status)?.description || 'Order status information'}
                </p>
              </div>
              {!editing && (
                <button
                  onClick={() => setEditing(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  <span>Update Status</span>
                </button>
              )}
            </div>
            
            {editing ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {statusOptions.map(option => (
                    <div
                      key={option.value}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                        status === option.value
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                      }`}
                      onClick={() => setStatus(option.value)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          status === option.value ? 'bg-purple-500' : 'bg-gray-300'
                        }`}>
                          {(() => {
                            const Icon = option.icon;
                            return <Icon className={`w-5 h-5 ${status === option.value ? 'text-white' : 'text-gray-600'}`} />;
                          })()}
                        </div>
                        <div>
                          <h3 className={`font-semibold ${
                            status === option.value ? 'text-purple-900' : 'text-gray-900'
                          }`}>
                            {option.label}
                          </h3>
                          <p className="text-sm text-gray-600">{option.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={handleStatusUpdate}
                    className="flex items-center space-x-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </button>
                  <button
                    onClick={() => {
                      setEditing(false);
                      setStatus(order.status);
                    }}
                    className="flex items-center space-x-2 px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-${getStatusColor(order.status)}-100`}>
                      {(() => {
                        const Icon = getStatusIcon(order.status);
                        return <Icon className={`w-6 h-6 text-${getStatusColor(order.status)}-600`} />;
                      })()}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {statusOptions.find(s => s.value === order.status)?.label || order.status}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {statusOptions.find(s => s.value === order.status)?.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Last Updated</p>
                    <p className="text-sm font-medium text-gray-900">{formatDate(order.updatedAt)}</p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* Order Items */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Order Items</h2>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {order.items?.length || 0} item{(order.items?.length || 0) !== 1 ? 's' : ''}
              </span>
            </div>
            <div className="space-y-4">
              {order.items?.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-4 p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200"
                >
                  <div className="relative w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
                    {item.image ? (
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                    ) : null}
                    <div className={`absolute inset-0 flex items-center justify-center ${item.image ? 'hidden' : ''}`}>
                      <span className="text-3xl">📦</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-lg mb-1">{item.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        Qty: {item.quantity}
                      </span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
                        ${item.price} each
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">${((item.price || 0) * (item.quantity || 0)).toFixed(2)}</p>
                    <p className="text-sm text-gray-500">Total</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <DollarSign className="w-5 h-5 mr-2 text-green-500" />
              Order Summary
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-semibold text-gray-900">${(order.totals?.subtotal || order.total || 0).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Tax (8%):</span>
                <span className="font-semibold text-gray-900">${((order.totals?.subtotal || order.total || 0) * 0.08).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">Shipping:</span>
                <span className="font-semibold text-gray-900">$9.99</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                  <span className="text-lg font-semibold text-gray-900">Total:</span>
                  <span className="text-2xl font-bold text-green-600">${((order.totals?.total || order.total || 0) + 9.99).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Customer Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <User className="w-5 h-5 mr-2 text-blue-500" />
              Customer Info
            </h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">User {order.userId}</p>
                  <p className="text-sm text-gray-600">Customer ID</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">customer@example.com</p>
                  <p className="text-sm text-gray-600">Email Address</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Phone className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">+1 (555) 123-4567</p>
                  <p className="text-sm text-gray-600">Phone Number</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Shipping Address */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-orange-500" />
              Shipping Address
            </h2>
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-4 rounded-xl border border-orange-200">
              <div className="space-y-2">
                <p className="font-semibold text-gray-900">{order.shipping?.address || order.shippingAddress?.street || 'N/A'}</p>
                <p className="text-gray-700">{order.shipping?.city || order.shippingAddress?.city || 'N/A'}, {order.shipping?.state || order.shippingAddress?.state || 'N/A'} {order.shipping?.zipCode || order.shippingAddress?.zipCode || 'N/A'}</p>
                <p className="text-gray-700">{order.shipping?.country || order.shippingAddress?.country || 'N/A'}</p>
              </div>
              <div className="mt-3 pt-3 border-t border-orange-200">
                <div className="flex items-center space-x-2 text-sm text-orange-700">
                  <MapPin className="w-4 h-4" />
                  <span>Primary shipping address</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Payment Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <CreditCard className="w-5 h-5 mr-2 text-emerald-500" />
              Payment Info
            </h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-emerald-50 rounded-lg">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 capitalize">{order.payment?.method || order.paymentMethod || 'N/A'}</p>
                  <p className="text-sm text-gray-600">Payment Method</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Paid</p>
                  <p className="text-sm text-gray-600">Payment Status</p>
                </div>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-lg border border-green-200">
                <div className="flex items-center space-x-2 text-green-700">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">Payment completed successfully</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 