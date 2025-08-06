'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  Package, 
  Truck, 
  CreditCard, 
  Calendar,
  MapPin,
  Phone,
  Mail,
  Download,
  Share2,
  User
} from 'lucide-react';

interface InvoiceProps {
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  billingAddress?: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
  }>;
  subtotal: number;
  tax: number;
  shipping?: number;
  total: number;
  paymentMethod: string;
  transactionId?: string;
  orderDate?: string;
  dueDate?: string;
  companyInfo?: {
    name: string;
    address: string;
    phone: string;
    email: string;
    website: string;
    logo?: string;
  };
}

export default function CuteInvoice({
  orderId,
  customerName,
  customerEmail,
  customerPhone,
  customerAddress,
  billingAddress,
  items,
  subtotal,
  tax,
  shipping = 0,
  total,
  paymentMethod,
  transactionId,
  orderDate,
  dueDate,
  companyInfo = {
    name: 'Ultimate E-Commerce',
    address: '123 Business St, Tech City, TC 12345',
    phone: '+1 (555) 123-4567',
    email: 'info@ultimate-ecommerce.com',
    website: 'www.ultimate-ecommerce.com'
  }
}: InvoiceProps) {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleDownload = () => {
    const invoiceText = `
INVOICE
Order ID: ${orderId}
Date: ${orderDate || currentDate}

Customer: ${customerName}
Email: ${customerEmail}
Phone: ${customerPhone}
Address: ${customerAddress}

Items:
${items.map(item => `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`).join('\n')}

Subtotal: $${subtotal.toFixed(2)}
Tax: $${tax.toFixed(2)}
Total: $${total.toFixed(2)}

Payment Method: ${paymentMethod}
${transactionId ? `Transaction ID: ${transactionId}` : ''}

Thank you for your purchase! 🎉
    `;

    const blob = new Blob([invoiceText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice-${orderId}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Order Confirmation',
        text: `I just placed an order! Order ID: ${orderId}`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(`Order ID: ${orderId}`);
      alert('Order ID copied to clipboard!');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
        
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <span className="text-3xl">🛍️</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">{companyInfo.name}</h1>
                <p className="text-purple-100 text-sm">{companyInfo.address}</p>
                <p className="text-purple-100 text-sm">{companyInfo.phone} • {companyInfo.email}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                <p className="text-sm text-purple-100">Order ID</p>
                <p className="text-xl font-mono font-bold">{orderId}</p>
                <p className="text-xs text-purple-100 mt-1">{orderDate || currentDate}</p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">🎉 Order Confirmed!</h2>
            <p className="text-purple-100 text-lg">Thank you for your purchase</p>
          </div>
        </div>
      </div>

      {/* Invoice Content */}
      <div className="p-8">
        {/* Order Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Customer Info */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <User className="w-5 h-5 mr-2 text-blue-500" />
              Customer Information
            </h3>
            <div className="space-y-2 text-gray-600">
              <p className="font-medium text-gray-800">{customerName}</p>
              <div className="flex items-center text-sm">
                <Mail className="w-4 h-4 mr-1 text-blue-500" />
                {customerEmail}
              </div>
              <div className="flex items-center text-sm">
                <Phone className="w-4 h-4 mr-1 text-blue-500" />
                {customerPhone}
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-green-500" />
              Shipping Address
            </h3>
            <div className="space-y-1 text-gray-600">
              <p className="font-medium text-gray-800">{customerName}</p>
              <p className="text-sm">{customerAddress}</p>
            </div>
          </div>

          {/* Billing Address */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <CreditCard className="w-5 h-5 mr-2 text-purple-500" />
              Billing Address
            </h3>
            <div className="space-y-1 text-gray-600">
              <p className="font-medium text-gray-800">{customerName}</p>
              <p className="text-sm">{billingAddress || customerAddress}</p>
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Package className="w-5 h-5 mr-2 text-purple-500" />
            Order Items
          </h3>
          <div className="space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={item.id || index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center overflow-hidden">
                    {item.image && item.image.startsWith('http') ? (
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
                    <span className={`text-lg ${item.image && item.image.startsWith('http') ? 'hidden' : ''}`}>
                      {item.image || '📦'}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800">{item.name}</h4>
                    <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-800">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Totals */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 mb-8">
          <div className="space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal ({items.length} items)</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            {shipping > 0 && (
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-gray-600">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="border-t pt-3">
              <div className="flex justify-between text-xl font-bold text-gray-800">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            {transactionId && (
              <div className="border-t pt-3">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Transaction ID</span>
                  <span className="font-mono">{transactionId}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <Truck className="w-5 h-5 mr-2 text-blue-500" />
            What's Next?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white rounded-xl">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-blue-500" />
              </div>
              <h4 className="font-medium text-gray-800 mb-1">Order Confirmed</h4>
              <p className="text-sm text-gray-600">We&apos;ve received your order</p>
            </div>
            <div className="text-center p-4 bg-white rounded-xl">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Package className="w-6 h-6 text-green-500" />
              </div>
              <h4 className="font-medium text-gray-800 mb-1">Processing</h4>
              <p className="text-sm text-gray-600">We&apos;re preparing your items</p>
            </div>
            <div className="text-center p-4 bg-white rounded-xl">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Truck className="w-6 h-6 text-purple-500" />
              </div>
              <h4 className="font-medium text-gray-800 mb-1">Shipping</h4>
              <p className="text-sm text-gray-600">On its way to you soon!</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleDownload}
            className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Download className="w-5 h-5" />
            <span>Download Invoice</span>
          </button>
          <button
            onClick={handleShare}
            className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <Share2 className="w-5 h-5" />
            <span>Share Order</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
} 