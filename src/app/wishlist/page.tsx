'use client';

import React, { useState } from 'react';
import { useWishlist } from '@/contexts/WishlistContext';
import { useCart } from '@/contexts/CartContext';
import Header from '@/components/Header';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  ShoppingCart, 
  Trash2, 
  Share2, 
  Gift,
  Star,
  X,
  AlertCircle,
  ArrowRight
} from 'lucide-react';

export default function WishlistPage() {
  const { state, removeItem, clearWishlist, shareWishlist } = useWishlist();
  const { addItem } = useCart();
  const [isRemoving, setIsRemoving] = useState<string | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [addingToCart, setAddingToCart] = useState<string | null>(null);

  const handleAddToCart = async (item: { id: string; name: string; price: number; image: string }) => {
    setAddingToCart(item.id);
    setTimeout(() => {
      addItem({
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image
      });
      setAddingToCart(null);
    }, 300);
  };

  const handleRemoveFromWishlist = async (id: string) => {
    setIsRemoving(id);
    setTimeout(() => {
      removeItem(id);
      setIsRemoving(null);
    }, 300);
  };

  const handleClearWishlist = () => {
    setShowClearConfirm(true);
  };

  const confirmClearWishlist = () => {
    clearWishlist();
    setShowClearConfirm(false);
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Header />
        
        {/* Empty Wishlist */}
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
              <Heart className="w-16 h-16" />
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
            Your wishlist is empty
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-xl text-gray-600 mb-8 max-w-md"
          >
            Start adding items to your wishlist to save them for later!
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
              <Heart className="w-5 h-5" />
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
                      Add to Wishlist
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
          className="grid grid-cols-1 lg:grid-cols-4 gap-8"
        >
          {/* Wishlist Items */}
          <div className="lg:col-span-3">
            {/* Header */}
            <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
              <div>
                <motion.h1 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-3xl md:text-4xl font-bold text-gray-900 mb-2"
                >
                  My Wishlist
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-gray-600 text-lg"
                >
                  {state.items.length} item{state.items.length !== 1 ? 's' : ''} in your wishlist
                </motion.p>
              </div>
              
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={shareWishlist}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white border border-blue-500 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <Share2 className="w-4 h-4" />
                  Share Wishlist
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleClearWishlist}
                  className="px-6 py-3 bg-red-50 text-red-600 border border-red-200 rounded-xl hover:bg-red-100 transition-all duration-300 font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear All
                </motion.button>
              </div>
            </div>

            {/* Wishlist Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {state.items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50, height: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 100
                    }}
                    className={`group relative bg-white border border-gray-100 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform-gpu hover:-translate-y-2 ${
                      isRemoving === item.id ? 'opacity-50 scale-95' : ''
                    }`}
                  >
                    {/* Remove Button */}
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleRemoveFromWishlist(item.id)}
                      className="absolute top-4 right-4 z-10 w-8 h-8 bg-red-50 hover:bg-red-100 border border-red-200 rounded-full flex items-center justify-center text-red-500 hover:text-red-600 transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-md hover:shadow-lg"
                    >
                      <X className="w-4 h-4" />
                    </motion.button>

                    {/* Product Image */}
                    <motion.div 
                      whileHover={{ scale: 1.05, rotate: 2 }}
                      className="w-full h-48 bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center text-4xl relative overflow-hidden border-b border-purple-100"
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
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {item.name}
                      </h3>
                      {item.description && (
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {item.description}
                        </p>
                      )}
                      {item.category && (
                        <span className="inline-block px-3 py-1 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 text-xs font-medium rounded-full mb-3 border border-purple-100">
                          {item.category}
                        </span>
                      )}

                      {/* Price */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                          ${item.price.toFixed(2)}
                        </span>
                        <span className="text-xs text-gray-500">
                          Added {new Date(item.addedAt).toLocaleDateString()}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleAddToCart(item)}
                          disabled={addingToCart === item.id}
                          className={`flex-1 px-4 py-3 rounded-xl transition-all duration-300 font-semibold text-sm flex items-center justify-center gap-2 ${
                            addingToCart === item.id
                              ? 'bg-gray-400 text-white cursor-not-allowed'
                              : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border border-purple-500 hover:from-purple-600 hover:to-pink-600 shadow-md hover:shadow-lg'
                          }`}
                        >
                          {addingToCart === item.id ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <ShoppingCart className="w-4 h-4" />
                          )}
                          {addingToCart === item.id ? 'Adding...' : 'Add to Cart'}
                        </motion.button>
                        <motion.a
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          href={`/products/${item.id}`}
                          className="px-4 py-3 bg-transparent text-purple-600 border border-purple-500 rounded-xl hover:bg-purple-50 transition-all duration-300 font-semibold text-sm text-center shadow-md hover:shadow-lg"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </motion.a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Wishlist Summary */}
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="sticky top-8"
            >
              <div className="bg-white border border-gray-100 rounded-3xl shadow-xl p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Wishlist Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-600">
                    <span>Total Items</span>
                    <span className="font-semibold">{state.items.length}</span>
                  </div>
                  
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                    className="flex justify-between text-gray-600"
                  >
                    <span>Total Value</span>
                    <span className="font-semibold">${state.items.reduce((sum, item) => sum + item.price, 0).toFixed(2)}</span>
                  </motion.div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between text-xl font-bold">
                      <span className="text-gray-900">Estimated Total</span>
                      <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">${state.items.reduce((sum, item) => sum + item.price, 0).toFixed(2)}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      Plus shipping and tax
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      state.items.forEach(item => handleAddToCart(item));
                    }}
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl py-4 flex items-center justify-center gap-2 shadow-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 text-lg"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Add All to Cart
                  </motion.button>
                  
                  <motion.a
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    href="/products"
                    className="w-full px-6 py-4 bg-white border-2 border-purple-500 text-purple-600 font-semibold rounded-xl hover:bg-purple-50 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
                  >
                    <ArrowRight className="w-5 h-5" />
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
                      <Heart className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold bg-gradient-to-r from-purple-700 to-pink-700 bg-clip-text text-transparent">
                        Secure Wishlist
                      </div>
                      <div className="text-sm text-purple-600">
                        Your items are safely saved
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
                      <div className="text-2xl mb-1">💝</div>
                      <div className="text-xs text-gray-600 font-medium">Save Items</div>
                    </motion.div>
                    <motion.div 
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="text-center p-3 rounded-xl hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 transition-all duration-300"
                    >
                      <div className="text-2xl mb-1">🔄</div>
                      <div className="text-xs text-gray-600 font-medium">Easy Access</div>
                    </motion.div>
                    <motion.div 
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="text-center p-3 rounded-xl hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 transition-all duration-300"
                    >
                      <div className="text-2xl mb-1">📱</div>
                      <div className="text-xs text-gray-600 font-medium">Sync Across</div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Clear Wishlist Confirmation Modal */}
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
                <h3 className="text-lg font-semibold text-gray-900">Clear Wishlist?</h3>
              </div>
              
              <p className="text-gray-600 mb-6">
                Are you sure you want to remove all items from your wishlist? This action cannot be undone.
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
                  onClick={confirmClearWishlist}
                  className="flex-1 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
                >
                  Clear Wishlist
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 