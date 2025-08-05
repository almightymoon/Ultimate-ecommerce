'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { useWishlist } from '@/contexts/WishlistContext';
import Header from '@/components/Header';
import LoadingSpinner from '@/components/LoadingSpinner';
import { motion, AnimatePresence } from 'framer-motion';
import ImageCarousel from '@/components/ImageCarousel';
import { 
  Heart, 
  ShoppingCart, 
  Star, 
  ChevronLeft, 
  ChevronRight,
  Truck,
  Shield,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Minus,
  Plus,
  Share2,
  Eye,
  Package,
  Zap,
  X as XIcon
} from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  badge?: string;
  description: string;
  stock: number;
  features: string[];
  specifications: Record<string, string>;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export default function ProductDetailPage() {
  const params = useParams();
  const { addItem } = useCart();
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlist();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [addingToWishlist, setAddingToWishlist] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchProduct(params.id as string);
    }
  }, [params.id]);

  const fetchProduct = async (id: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/products/${id}`);
      if (response.ok) {
        const data = await response.json();
        setProduct(data);
      } else {
        console.error('Product not found');
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (product && product.stock > 0) {
      setAddingToCart(true);
      setTimeout(() => {
        addItem({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image
        });
        setAddingToCart(false);
      }, 500);
    }
  };

  const handleWishlistToggle = async () => {
    if (product) {
      setAddingToWishlist(true);
      setTimeout(() => {
        if (isInWishlist(product.id)) {
          removeFromWishlist(product.id);
        } else {
          addToWishlist({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image
          });
        }
        setAddingToWishlist(false);
      }, 300);
    }
  };

  const getDiscountPercentage = () => {
    if (product?.originalPrice && product.originalPrice > product.price) {
      return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    }
    return 0;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Header />
        <div className="flex justify-center items-center min-h-[60vh] pt-32">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <Header />
        <div className="flex justify-center items-center min-h-[60vh] pt-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-6xl mb-6">❌</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Product not found
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              The product you're looking for doesn't exist
            </p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Products
            </motion.a>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />

      {/* Product Detail Section */}
      <section className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          >
            {/* Product Images */}
            <div className="space-y-6">
              {/* Image Carousel */}
              <div className="relative">
                <ImageCarousel 
                  images={product.images && product.images.length > 0 ? product.images : [product.image]}
                  productName={product.name}
                  className="w-full"
                />
                
                {/* Badge */}
                {product.badge && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="absolute top-4 left-4 z-20"
                  >
                    <span className={`px-4 py-2 rounded-full text-sm font-bold text-white shadow-lg ${
                      product.badge === 'New' ? 'bg-blue-500' : 
                      product.badge === 'Best Seller' ? 'bg-yellow-500' :
                      product.badge === 'Hot Deal' ? 'bg-red-500' :
                      product.badge === 'Limited Time' ? 'bg-purple-500' :
                      product.badge === 'Popular' ? 'bg-purple-500' : 'bg-gray-500'
                    }`}>
                      {product.badge}
                    </span>
                  </motion.div>
                )}

                {/* Discount Badge */}
                {getDiscountPercentage() > 0 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    className="absolute top-4 right-4 z-20"
                  >
                    <span className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-full text-sm font-bold text-white shadow-lg">
                      -{getDiscountPercentage()}%
                    </span>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Breadcrumb */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-2 text-sm text-gray-600"
              >
                <a href="/products" className="hover:text-purple-600 transition-colors">
                  Products
                </a>
                <ChevronRight className="w-4 h-4" />
                <span className="text-gray-900 font-medium">{product.name}</span>
              </motion.div>

              {/* Product Name */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
              >
                {product.name}
              </motion.h1>

              {/* Rating */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-4"
              >
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) 
                          ? 'fill-yellow-400 text-yellow-400' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-900 font-semibold">{product.rating}</span>
                <span className="text-gray-500">
                  ({product.reviews.toLocaleString()} reviews)
                </span>
              </motion.div>

              {/* Price */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-4"
              >
                <span className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  ${product.price}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-2xl text-gray-400 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-lg text-gray-600 leading-relaxed"
              >
                {product.description}
              </motion.p>

              {/* Stock Status */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex items-center gap-2"
              >
                <div className={`w-3 h-3 rounded-full ${
                  product.stock > 0 ? 'bg-purple-500' : 'bg-red-500'
                }`}></div>
                <span className={`font-semibold ${
                  product.stock > 0 ? 'text-purple-600' : 'text-red-600'
                }`}>
                  {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                </span>
              </motion.div>

              {/* Quantity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="space-y-3"
              >
                <label className="block text-sm font-semibold text-gray-900">
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 border-2 border-gray-200 bg-white rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
                  >
                    <Minus className="w-5 h-5 text-gray-600" />
                  </motion.button>
                  <span className="text-xl font-bold text-gray-900 min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="w-12 h-12 border-2 border-gray-200 bg-white rounded-xl hover:border-purple-500 hover:bg-purple-50 transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
                  >
                    <Plus className="w-5 h-5 text-gray-600" />
                  </motion.button>
                </div>
              </motion.div>

              {/* Actions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="flex gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  disabled={product.stock === 0 || addingToCart}
                  className={`flex-1 py-4 px-6 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all duration-300 ${
                    product.stock > 0 && !addingToCart
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 shadow-xl hover:shadow-2xl'
                      : 'bg-gray-400 text-white cursor-not-allowed'
                  }`}
                >
                  {addingToCart ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <ShoppingCart className="w-5 h-5" />
                  )}
                  {addingToCart ? 'Adding...' : product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleWishlistToggle}
                  disabled={addingToWishlist}
                  className={`p-4 rounded-xl border-2 transition-all duration-300 flex items-center justify-center ${
                    isInWishlist(product.id)
                      ? 'bg-gradient-to-r from-red-500 to-pink-500 border-red-500 text-white shadow-xl'
                      : 'bg-white border-purple-500 text-purple-600 hover:bg-purple-50 shadow-lg hover:shadow-xl'
                  }`}
                >
                  {addingToWishlist ? (
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <Heart className={`w-6 h-6 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                  )}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-4 bg-white border-2 border-gray-300 text-gray-600 rounded-xl hover:border-purple-500 hover:text-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <Share2 className="w-6 h-6" />
                </motion.button>
              </motion.div>

              {/* Trust Badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="grid grid-cols-3 gap-4 pt-6"
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="text-center p-4 rounded-xl hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 transition-all duration-300"
                >
                  <Truck className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-sm font-medium text-gray-700">Free Shipping</div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="text-center p-4 rounded-xl hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 transition-all duration-300"
                >
                  <Shield className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-sm font-medium text-gray-700">Secure Payment</div>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="text-center p-4 rounded-xl hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 transition-all duration-300"
                >
                  <RefreshCw className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-sm font-medium text-gray-700">Easy Returns</div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Features */}
          {product.features && product.features.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="mt-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Key Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {product.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                      <p className="text-gray-700 leading-relaxed">{feature}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Specifications */}
          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.6 }}
              className="mt-16"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                Specifications
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(product.specifications).map(([key, value], index) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.4 + index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                  >
                    <h4 className="text-lg font-semibold text-gray-900 mb-2 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </h4>
                    <p className="text-gray-600">{value}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>


    </div>
  );
} 