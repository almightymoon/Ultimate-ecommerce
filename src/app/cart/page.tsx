'use client';

import React, { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import Header from '@/components/Header';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowLeft, 
  Lock, 
  Shield, 
  Truck, 
  Gift,
  Star,
  X,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export default function CartPage() {
  const { state, removeItem, updateQuantity, clearCart } = useCart();
  const [isRemoving, setIsRemoving] = useState<string | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const handleRemoveItem = async (id: string) => {
    setIsRemoving(id);
    setTimeout(() => {
      removeItem(id);
      setIsRemoving(null);
    }, 300);
  };

  const handleClearCart = () => {
    setShowClearConfirm(true);
  };

  const confirmClearCart = () => {
    clearCart();
    setShowClearConfirm(false);
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Header />

        {/* Empty Cart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center items-center min-h-[60vh] text-center px-4 pt-32"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="relative mb-8"
          >
            <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-6xl mb-4 shadow-2xl">
              <ShoppingCart className="w-16 h-16" />
            </div>
            <motion.div 
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                repeatType: "reverse" 
              }}
              className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg"
            >
              0
            </motion.div>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
          >
            Your cart is empty
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-xl text-gray-600 mb-8 max-w-md"
          >
            Looks like you haven&apos;t added any items to your cart yet. Start shopping to discover amazing products!
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/products"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full px-8 py-4 text-lg flex items-center gap-2 shadow-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
            >
              <ShoppingCart className="w-5 h-5" />
            Start Shopping
            </motion.a>
            
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/deals"
              className="px-8 py-4 bg-white border border-purple-200 text-purple-600 font-semibold rounded-full hover:bg-purple-50 transition-all duration-300 flex items-center gap-2 shadow-lg"
            >
              <Gift className="w-5 h-5" />
              View Deals
            </motion.a>
          </motion.div>

          {/* Recommended Products */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-16 w-full max-w-4xl"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">You might also like</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <motion.div
                  key={item}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="w-full h-32 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl mb-4 flex items-center justify-center border border-purple-100">
                    <div className="text-3xl">🛍️</div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Amazing Product {item}</h3>
                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">$99.99</span>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      Add to Cart
                    </motion.button>
                  </div>
                </motion.div>
              ))}
        </div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-8">
          <div>
                <motion.h1 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-3xl font-bold text-gray-900 mb-2"
                >
                  Shopping Cart
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-gray-600"
                >
                  {state.itemCount} item{state.itemCount !== 1 ? 's' : ''} in your cart
                </motion.p>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClearCart}
                className="px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-xl hover:bg-red-100 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl"
              >
                <Trash2 className="w-4 h-4" />
                Clear Cart
              </motion.button>
            </div>

            <div className="space-y-4">
              <AnimatePresence>
                {state.items.map((item, index) => (
                  <motion.div
                    key={`${item.id}-${item.variant?.id || 'default'}`}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50, height: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 100
                    }}
                    className={`group relative bg-white border border-gray-100 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform-gpu ${
                      isRemoving === item.id ? 'opacity-50 scale-95' : ''
                    }`}
                  >
                    <div className="flex gap-6 items-center">
                  {/* Product Image */}
                      <motion.div 
                        whileHover={{ scale: 1.05, rotate: 2 }}
                        className="w-24 h-24 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl flex items-center justify-center text-3xl flex-shrink-0 shadow-lg border border-purple-100 relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-200/20 to-pink-200/20"></div>
                        <div className="relative z-10 w-full h-full">
                          {item.image && item.image.startsWith('http') ? (
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const target = e.currentTarget as HTMLImageElement;
                                target.style.display = 'none';
                                const fallback = target.nextElementSibling as HTMLElement;
                                if (fallback) fallback.style.display = 'flex';
                              }}
                            />
                          ) : null}
                          <div 
                            className={`w-full h-full flex items-center justify-center ${item.image && item.image.startsWith('http') ? 'hidden' : 'flex'}`}
                          >
                            {item.image || '📦'}
                          </div>
                        </div>
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10"
                        />
                      </motion.div>

                  {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {item.name}
                    </h3>
                    {item.variant && (
                          <p className="text-gray-600 text-sm mb-2">
                        Color: {item.variant.name}
                      </p>
                    )}
                                          <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        ${item.price}
                      </span>
                      {item.originalPrice && item.originalPrice > item.price && (
                      <span className="text-lg text-gray-400 line-through">
                          ${item.originalPrice}
                        </span>
                      )}
                    {item.originalPrice && item.originalPrice > item.price && (
                      <span className="px-2 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-xs font-semibold rounded-full">
                        SAVE {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
                      </span>
                    )}
                  </div>
                  </div>

                  {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-10 h-10 border-2 border-gray-200 bg-white rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-4 h-4 text-gray-600" />
                        </motion.button>
                        
                        <motion.span 
                          key={item.quantity}
                          initial={{ scale: 1.2 }}
                          animate={{ scale: 1 }}
                          className="text-lg font-semibold min-w-[3rem] text-center"
                        >
                      {item.quantity}
                        </motion.span>
                        
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-10 h-10 border-2 border-gray-200 bg-white rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
                        >
                          <Plus className="w-4 h-4 text-gray-600" />
                        </motion.button>
                  </div>

                  {/* Total Price */}
                      <div className="text-right min-w-[120px]">
                        <div className="text-xl font-bold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                    {item.originalPrice && (
                          <div className="text-sm bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-medium">
                        Save ${((item.originalPrice - item.price) * item.quantity).toFixed(2)}
                      </div>
                    )}
                  </div>

                  {/* Remove Button */}
                      <motion.button
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleRemoveItem(item.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                      >
                        <X className="w-5 h-5" />
                      </motion.button>
                </div>
                  </motion.div>
              ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="sticky top-8"
            >
              <div className="bg-white border border-gray-100 rounded-3xl shadow-xl p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({state.itemCount} items)</span>
                    <span className="font-semibold">${state.total.toFixed(2)}</span>
                </div>
                  
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="flex justify-between text-gray-600"
                  >
                  <span>Shipping</span>
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-semibold flex items-center gap-1">
                      <Truck className="w-4 h-4" />
                      Free
                    </span>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1, duration: 0.6 }}
                    className="flex justify-between text-gray-600"
                  >
                    <span>Tax</span>
                    <span className="font-semibold">${(state.total * 0.08).toFixed(2)}</span>
                  </motion.div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-xl font-bold">
                      <span className="text-gray-900">Total</span>
                      <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">${(state.total * 1.08).toFixed(2)}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Including tax and shipping
                    </p>
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.6, duration: 0.6 }}
                      className="mt-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100"
                    >
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-purple-600" />
                        <span className="text-purple-700 font-medium">You&apos;re saving ${(state.total * 0.15).toFixed(2)} with our best prices!</span>
                      </div>
                    </motion.div>
                  </div>
                </div>

                <div className="space-y-4">
                  <motion.a 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href="/checkout"
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl py-4 flex items-center justify-center gap-2 shadow-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 text-lg"
                  >
                    <Lock className="w-5 h-5" />
                    Proceed to Checkout
                  </motion.a>
                  
                  <motion.a 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href="/products"
                    className="w-full px-6 py-4 bg-white border-2 border-purple-500 text-purple-600 font-semibold rounded-xl hover:bg-purple-50 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Continue Shopping
                  </motion.a>
                </div>

                {/* Security Badge */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                  className="mt-6 p-4 bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-xl"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold bg-gradient-to-r from-purple-700 to-pink-700 bg-clip-text text-transparent">
                        Secure Checkout
                      </div>
                      <div className="text-sm text-purple-600">
                        SSL encrypted payment processing
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Trust Badges */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4, duration: 0.6 }}
                  className="mt-6 pt-6 border-t border-gray-200"
                >
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <motion.div 
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="text-center p-3 rounded-xl hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 transition-all duration-300"
                    >
                      <div className="text-2xl mb-1">🚚</div>
                      <div className="text-xs text-gray-600 font-medium">Free Shipping</div>
                    </motion.div>
                    <motion.div 
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="text-center p-3 rounded-xl hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 transition-all duration-300"
                    >
                      <div className="text-2xl mb-1">🔄</div>
                      <div className="text-xs text-gray-600 font-medium">Easy Returns</div>
                    </motion.div>
                    <motion.div 
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="text-center p-3 rounded-xl hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 transition-all duration-300"
                    >
                      <div className="text-2xl mb-1">🛡️</div>
                      <div className="text-xs text-gray-600 font-medium">Secure Payment</div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Clear Cart Confirmation Modal */}
      <AnimatePresence>
        {showClearConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Clear Cart?</h3>
              </div>

              <p className="text-gray-600 mb-6">
                Are you sure you want to remove all items from your cart? This action cannot be undone.
              </p>
              
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowClearConfirm(false)}
                  className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={confirmClearCart}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
                >
                  Clear Cart
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 