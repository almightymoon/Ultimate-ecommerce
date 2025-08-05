'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Download, Mail, Home, Package, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import CuteInvoice from '@/components/CuteInvoice';
import ReviewRequest from '@/components/ReviewRequest';

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [orderId, setOrderId] = useState('');
  const [orderData, setOrderData] = useState<any>(null);
  const [showReviewRequest, setShowReviewRequest] = useState(false);

  useEffect(() => {
    const id = searchParams.get('orderId') || 'ORDER-' + Date.now();
    setOrderId(id);
    
    // Get order data from localStorage or create fallback
    const storedOrderData = localStorage.getItem('lastOrderData');
    
    if (storedOrderData) {
      try {
        const parsed = JSON.parse(storedOrderData);
        setOrderData({
          ...parsed,
          orderId: id
        });
      } catch (error) {
        console.error('Error parsing order data:', error);
        createFallbackOrderData(id);
      }
    } else {
      createFallbackOrderData(id);
    }

    // Show review request after 3 seconds
    const timer = setTimeout(() => {
      setShowReviewRequest(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [searchParams]);

  const createFallbackOrderData = (id: string) => {
    setOrderData({
      orderId: id,
      customerName: 'Customer Name',
      customerEmail: 'customer@example.com',
      customerPhone: '(555) 123-4567',
      customerAddress: '123 Main St, City, State 12345',
      items: [
        {
          id: '1',
          name: 'Sample Product',
          price: 29.99,
          quantity: 1,
          image: '📦'
        }
      ],
      subtotal: 29.99,
      tax: 2.40,
      total: 32.39,
      paymentMethod: 'PayPal',
      transactionId: 'TXN-' + Math.random().toString(36).substr(2, 9).toUpperCase()
    });
  };

  const handleReviewSubmit = async (rating: number, review: string) => {
    try {
      // Here you would typically send the review to your backend
      console.log('Review submitted:', { rating, review, orderId });
      
      // You could also store it in localStorage for demo purposes
      const reviews = JSON.parse(localStorage.getItem('reviews') || '[]');
      reviews.push({
        orderId,
        rating,
        review,
        date: new Date().toISOString(),
        productName: orderData?.items?.[0]?.name || 'Product'
      });
      localStorage.setItem('reviews', JSON.stringify(reviews));
      
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  if (!orderData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your invoice...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Cute Invoice */}
        <CuteInvoice
          orderId={orderData.orderId}
          customerName={orderData.customerName}
          customerEmail={orderData.customerEmail}
          customerPhone={orderData.customerPhone}
          customerAddress={orderData.customerAddress}
          items={orderData.items}
          subtotal={orderData.subtotal}
          tax={orderData.tax}
          total={orderData.total}
          paymentMethod={orderData.paymentMethod}
          transactionId={orderData.transactionId}
        />

        {/* Additional Actions */}
        <div className="mt-8 text-center">
          <Link
            href="/orders"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            View All Orders
          </Link>
        </div>
      </div>

      {/* Review Request Modal */}
      <ReviewRequest
        isOpen={showReviewRequest}
        onClose={() => setShowReviewRequest(false)}
        onSubmit={handleReviewSubmit}
        productName={orderData?.items?.[0]?.name || "your recent purchase"}
      />
    </div>
  );
} 