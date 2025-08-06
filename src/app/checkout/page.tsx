'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import PayPalButtonAlternative from '@/components/PayPalButtonAlternative';
import ReviewRequest from '@/components/ReviewRequest';

import { 
  ArrowLeft, 
  CreditCard, 
  Lock, 
  CheckCircle, 
  AlertCircle,
  Truck,
  Shield,
  RefreshCw
} from 'lucide-react';
import toast from 'react-hot-toast';

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  country: string;
  paymentMethod: 'card' | 'paypal';
}

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { state, clearCart } = useCart();
  const { state: authState } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [cartLoading, setCartLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'success' | 'failed'>('pending');
  const [showReviewRequest, setShowReviewRequest] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    country: 'US',
    paymentMethod: 'paypal'
  });

  const calculateTotals = useCallback(() => {
    const subtotal = state.total;
    const shipping = 0; // Free shipping
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + shipping + tax;
    
    return { subtotal, shipping, tax, total };
  }, [state.total]);

  const handleRedirectPaymentSuccess = useCallback(async (transactionId: string) => {
    setLoading(true);
    try {
      const totals = calculateTotals();
      
      // Create order data for database
      const orderData = {
        userId: authState.user?.id || 'guest',
        items: state.items,
        shipping: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country
        },
        payment: {
          method: 'paypal',
          transactionId: transactionId,
          amount: totals.total,
          currency: 'USD',
          status: 'completed'
        },
        totals: totals
      };

      // Create invoice data for localStorage
      const invoiceData = {
        orderId: `ORDER-${Date.now()}`,
        customerName: `${formData.firstName} ${formData.lastName}`,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        customerAddress: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}`,
        items: state.items,
        subtotal: totals.subtotal,
        tax: totals.tax,
        total: totals.total,
        paymentMethod: 'PayPal',
        transactionId: transactionId
      };

      // Store invoice data in localStorage
      localStorage.setItem('lastOrderData', JSON.stringify(invoiceData));

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (result.success) {
        setOrderId(result.orderId);
        setOrderComplete(true);
        setPaymentStatus('success');
        clearCart();
        toast.success('Payment successful! Your order has been placed.');
        
        // Show review request after a short delay
        setTimeout(() => {
          setShowReviewRequest(true);
        }, 2000);
        
        // Clean up URL
        router.replace('/checkout');
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Error creating order from redirect:', error);
      setPaymentStatus('failed');
      toast.error('Failed to create order. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [formData, state.items, clearCart, router, calculateTotals, authState.user?.id]);

  // Handle PayPal return/cancel URLs
  useEffect(() => {
    const paypalReturn = searchParams.get('paypal_return');
    const paypalCancel = searchParams.get('paypal_cancel');
    const orderSuccess = searchParams.get('orderId');
    const tx = searchParams.get('tx'); // PayPal transaction ID
    const st = searchParams.get('st'); // PayPal status
    
    if (paypalReturn) {
      console.log('PayPal returned successfully');
      // Check if we have transaction details from redirect flow
      if (tx && st === 'Completed') {
        console.log('PayPal redirect flow completed with transaction:', tx);
        // Handle successful redirect payment
        handleRedirectPaymentSuccess(tx);
      } else {
        // This might be from popup flow, wait for actual callback
        console.log('Waiting for PayPal callback from popup flow');
      }
    }
    
    if (paypalCancel) {
      toast.error('PayPal payment was cancelled');
      setStep(2);
      // Clean up URL
      router.replace('/checkout');
    }

    if (orderSuccess) {
      // User is coming from a successful order
      setOrderId(orderSuccess);
      setOrderComplete(true);
      // Clean up URL
      router.replace('/checkout');
    }
  }, [searchParams, router, handleRedirectPaymentSuccess]);

  // Handle cart loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setCartLoading(false);
    }, 500); // Give cart time to load from localStorage

    return () => clearTimeout(timer);
  }, []);

  // Set client flag
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Check authentication
  useEffect(() => {
    if (authState.isInitialized && !authState.isAuthenticated) {
      toast.error('Please login to continue with checkout');
      router.push('/login?redirect=/checkout');
      return;
    }
  }, [authState.isInitialized, authState.isAuthenticated, router]);

  // Pre-fill email when user is authenticated
  useEffect(() => {
    if (authState.isAuthenticated && authState.user?.email && !formData.email) {
      setFormData(prev => ({
        ...prev,
        email: authState.user?.email || ''
      }));
    }
  }, [authState.isAuthenticated, authState.user?.email, formData.email]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const requiredFields = ['email', 'firstName', 'lastName', 'address', 'city', 'state', 'zipCode', 'phone'];
    for (const field of requiredFields) {
      if (!formData[field as keyof FormData]) {
        toast.error(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }
    return true;
  };

  const handleNextStep = () => {
    if (step === 1 && !validateForm()) {
      return;
    }
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handlePayPalSuccess = async (details: { id: string; transactionId?: string }) => {
    setLoading(true);
    try {
      const totals = calculateTotals();
      
      // Create order data for database
      const orderData = {
        userId: authState.user?.id || 'guest',
        items: state.items,
        shipping: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country
        },
        payment: {
          method: 'paypal',
          transactionId: details.id,
          amount: totals.total,
          currency: 'USD',
          status: 'completed'
        },
        totals: totals
      };

      // Create invoice data for localStorage
      const invoiceData = {
        orderId: `ORDER-${Date.now()}`,
        customerName: `${formData.firstName} ${formData.lastName}`,
        customerEmail: formData.email,
        customerPhone: formData.phone,
        customerAddress: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}`,
        items: state.items,
        subtotal: totals.subtotal,
        tax: totals.tax,
        total: totals.total,
        paymentMethod: 'PayPal',
        transactionId: details.id || details.transactionId
      };

      // Store invoice data in localStorage
      localStorage.setItem('lastOrderData', JSON.stringify(invoiceData));

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (result.success) {
        setOrderId(result.orderId);
        setOrderComplete(true);
        setPaymentStatus('success');
        clearCart();
        toast.success('Payment successful! Your order has been placed.');
        
        // Show review request after a short delay
        setTimeout(() => {
          setShowReviewRequest(true);
        }, 2000);
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Failed to create order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePayPalError = (error: unknown) => {
    console.error('PayPal error:', error);
    setPaymentStatus('failed');
    toast.error('Payment failed. Please try again.');
  };

  const handlePayPalCancel = () => {
    toast.error('Payment cancelled.');
  };

  const handleReviewSubmit = async (rating: number, review: string) => {
    try {
      // Store review in localStorage for now (you can send to API later)
      const reviewData = {
        orderId,
        rating,
        review,
        productName: state.items[0]?.name || 'your purchase',
        timestamp: new Date().toISOString()
      };
      
      const existingReviews = JSON.parse(localStorage.getItem('reviews') || '[]');
      existingReviews.push(reviewData);
      localStorage.setItem('reviews', JSON.stringify(existingReviews));
      
      toast.success('Thank you for your review!');
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review. Please try again.');
    }
  };

  const totals = calculateTotals();



  // Show loading state while cart is loading
  if (cartLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h1 className="text-xl font-semibold text-gray-900 mb-2">
            Loading your cart...
          </h1>
          <p className="text-gray-600">
            Please wait while we load your shopping cart.
          </p>
        </div>
      </div>
    );
  }

  // Show loading state while checking authentication
  if (!authState.isInitialized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h1 className="text-xl font-semibold text-gray-900 mb-2">
            Checking authentication...
          </h1>
          <p className="text-gray-600">
            Please wait while we verify your login status.
          </p>
        </div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!authState.isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-8">🔐</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Login Required
          </h1>
          <p className="text-gray-600 mb-8">
            You must be logged in to proceed with checkout.
          </p>
          <button
            onClick={() => router.push('/login?redirect=/checkout')}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
          >
            Login to Continue
          </button>
        </div>
      </div>
    );
  }

  if (state.items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-8">🛒</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Your cart is empty
          </h1>
          <p className="text-gray-600 mb-8">
            Add some items to your cart before proceeding to checkout.
          </p>
                    <button
            onClick={() => router.push('/products')}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-10 h-10 text-green-600" />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Order Confirmed!
          </h1>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
          <div className="bg-white rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600">Order ID</p>
            <p className="font-mono text-lg font-semibold text-gray-900">{orderId}</p>
          </div>
          <button
            onClick={() => router.push('/')}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Checkout Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.back()}
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 rounded-lg hover:bg-gray-100"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
              <p className="text-sm text-gray-600">Complete your purchase securely</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500 bg-green-50 px-3 py-2 rounded-lg">
            <Lock className="w-4 h-4 text-green-600" />
            <span className="text-green-700 font-medium">Secure Checkout</span>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-8">
            {[
              { number: 1, title: 'Shipping', active: step >= 1, completed: step > 1 },
              { number: 2, title: 'Payment', active: step >= 2, completed: step > 2 },
              { number: 3, title: 'Review', active: step >= 3, completed: step > 3 }
            ].map((stepItem, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-lg transition-all duration-300 ${
                  stepItem.completed 
                    ? 'bg-green-500 text-white' 
                    : stepItem.active 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {stepItem.completed ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    stepItem.number
                  )}
                </div>
                <span className={`ml-3 font-medium transition-colors duration-200 ${
                  stepItem.completed 
                    ? 'text-green-600' 
                    : stepItem.active 
                    ? 'text-blue-600' 
                    : 'text-gray-500'
                }`}>
                  {stepItem.title}
                </span>
                {index < 2 && (
                  <div className={`w-20 h-1 ml-8 rounded-full transition-all duration-300 ${
                    stepItem.completed 
                      ? 'bg-green-500' 
                      : stepItem.active 
                      ? 'bg-blue-600' 
                      : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Shipping Information
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-black placeholder-gray-500"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-black placeholder-gray-500"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-black placeholder-gray-500"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-black placeholder-gray-500"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-black placeholder-gray-500"
                      placeholder="Enter your address"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-black placeholder-gray-500"
                        placeholder="Enter city"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-black placeholder-gray-500"
                        placeholder="Enter state"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white text-black placeholder-gray-500"
                        placeholder="Enter ZIP code"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Payment Method
                  </h2>
                  
                  <div className="space-y-4 mb-8">
                    <label className="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 transition-colors duration-200">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="paypal"
                        checked={formData.paymentMethod === 'paypal'}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <div className="ml-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center mr-3">
                            <CreditCard className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-medium text-gray-900">PayPal</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          Pay with your PayPal account or credit card
                        </p>
                      </div>
                    </label>
                  </div>

                  {formData.paymentMethod === 'paypal' && (
                    <div className="border-t pt-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Complete Payment
                      </h3>
                      <div className="w-full">
                        {isClient && (
                          <PayPalButtonAlternative
                            key="paypal-button-stable"
                            amount={totals.total}
                            onSuccess={handlePayPalSuccess}
                            onError={handlePayPalError}
                            onCancel={handlePayPalCancel}
                            disabled={loading}
                            className="w-full"
                          />
                        )}
                        {!isClient && (
                          <div className="w-full bg-gray-200 animate-pulse rounded-lg h-12 flex items-center justify-center">
                            <span className="text-gray-500 text-sm">Loading PayPal...</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="review"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Order Review
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Shipping Address
                      </h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-gray-900">
                          {formData.firstName} {formData.lastName}
                        </p>
                        <p className="text-gray-600">{formData.address}</p>
                        <p className="text-gray-600">
                          {formData.city}, {formData.state} {formData.zipCode}
                        </p>
                        <p className="text-gray-600">{formData.phone}</p>
                        <p className="text-gray-600">{formData.email}</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Payment Method
                      </h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center mr-3">
                            <CreditCard className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-medium text-gray-900">
                            {formData.paymentMethod === 'paypal' ? 'PayPal' : 'Credit Card'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Order Items
                      </h3>
                      <div className="space-y-4">
                        {state.items.map((item) => (
                          <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-4">
                              <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
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
                                <span className={`text-2xl ${item.image && item.image.startsWith('http') ? 'hidden' : ''}`}>
                                  {item.image || '📦'}
                                </span>
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900">{item.name}</h4>
                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-gray-900">
                                ${(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              {step > 1 && (
                <button
                  onClick={handlePreviousStep}
                  className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200"
                >
                  Back
                </button>
              )}
              {step < 3 && formData.paymentMethod !== 'paypal' && (
                <button
                  onClick={handleNextStep}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 ml-auto"
                >
                  Continue
                </button>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <span>Order Summary</span>
                  <div className="ml-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                    {state.itemCount} {state.itemCount === 1 ? 'item' : 'items'}
                  </div>
                </h2>

                {/* Order Items Preview */}
                <div className="mb-6 space-y-3 max-h-48 overflow-y-auto">
                  {state.items.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
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
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 text-sm truncate">{item.name}</h4>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900 text-sm">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                  {state.items.length > 3 && (
                    <div className="text-center text-sm text-gray-500 py-2">
                      +{state.items.length - 3} more items
                    </div>
                  )}
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({state.itemCount} items)</span>
                    <span>${totals.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="text-green-600 font-semibold">Free</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>${totals.tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-xl font-bold text-gray-900">
                      <span>Total</span>
                      <span>${totals.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                {step === 1 && (
                  <button
                    onClick={handleNextStep}
                    disabled={loading}
                    className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    <Lock className="w-5 h-5" />
                    <span>Continue to Payment</span>
                  </button>
                )}

                {step === 2 && formData.paymentMethod === 'paypal' && (
                  <div className="space-y-4">
                    <div className="text-center text-sm text-gray-600 mb-4">
                      Click the PayPal button below to complete your purchase
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <div className="flex items-center justify-center space-x-2 text-gray-600 mb-2">
                        <Lock className="w-4 h-4" />
                        <span className="text-sm font-medium">Secure Payment</span>
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <button
                    onClick={handleNextStep}
                    disabled={loading}
                    className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    <span>Complete Order</span>
                  </button>
                )}

                {/* Security Badge */}
                <div className="mt-6 flex items-center justify-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-2 text-green-700">
                    <Lock className="w-4 h-4" />
                    <span className="text-sm font-medium">Secure checkout with SSL encryption</span>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <Truck className="w-4 h-4" />
                    <span>Free shipping on all orders</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <Shield className="w-4 h-4" />
                    <span>30-day money-back guarantee</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <RefreshCw className="w-4 h-4" />
                    <span>Easy returns & exchanges</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Status Messages */}
      {paymentStatus === 'success' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
        >
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Payment Successful!</span>
          </div>
        </motion.div>
      )}

      {paymentStatus === 'failed' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50"
        >
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5" />
            <span className="font-medium">Payment Failed</span>
          </div>
        </motion.div>
      )}

      {/* Review Request Modal */}
      <ReviewRequest
        isOpen={showReviewRequest}
        onClose={() => setShowReviewRequest(false)}
        onSubmit={handleReviewSubmit}
        productName={state.items[0]?.name || 'your purchase'}
      />
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h1 className="text-xl font-semibold text-gray-900 mb-2">
            Loading checkout...
          </h1>
          <p className="text-gray-600">
            Please wait while we prepare your checkout.
          </p>
        </div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
} 