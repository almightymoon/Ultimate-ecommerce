'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Star, 
  Search, 
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  MessageSquare,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';

interface Review {
  _id: string;
  productId: string;
  userId: string;
  rating: number;
  comment: string;
  title: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
  product?: {
    name: string;
    image: string;
  };
  user?: {
    name: string;
    email: string;
  };
}

export default function AdminReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [sortBy] = useState('createdAt');
  const [sortOrder] = useState<'asc' | 'desc'>('desc');

  const statusOptions = [
    { value: 'all', label: 'All Status', icon: Filter },
    { value: 'pending', label: 'Pending', icon: Clock },
    { value: 'approved', label: 'Approved', icon: CheckCircle },
    { value: 'rejected', label: 'Rejected', icon: XCircle }
  ];

  const ratingOptions = [
    { value: null, label: 'All Ratings' },
    { value: 5, label: '5 Stars' },
    { value: 4, label: '4+ Stars' },
    { value: 3, label: '3+ Stars' },
    { value: 2, label: '2+ Stars' },
    { value: 1, label: '1+ Stars' }
  ];

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/admin/reviews');
        const data = await response.json();
        
        if (data.success) {
          setReviews(data.reviews || []);
        } else {
          console.error('Failed to fetch reviews:', data.message);
          setReviews([]);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (review.product?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (review.user?.name || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || review.status === statusFilter;
    const matchesRating = ratingFilter === null || review.rating >= ratingFilter;
    
    return matchesSearch && matchesStatus && matchesRating;
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    let aValue: string | number | Date = a[sortBy as keyof Review] as string | number | Date;
    let bValue: string | number | Date = b[sortBy as keyof Review] as string | number | Date;
    
    if (sortBy === 'createdAt' || sortBy === 'updatedAt') {
      aValue = new Date(aValue as string).getTime();
      bValue = new Date(bValue as string).getTime();
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleStatusChange = async (reviewId: string, newStatus: 'approved' | 'rejected') => {
    try {
      const response = await fetch(`/api/admin/reviews/${reviewId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (response.ok) {
        setReviews(prev => prev.map(review => 
          review._id === reviewId 
            ? { ...review, status: newStatus, updatedAt: new Date().toISOString() }
            : review
        ));
      } else {
        alert('Failed to update review status');
      }
    } catch (error) {
      console.error('Error updating review status:', error);
      alert('Failed to update review status');
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (!confirm('Are you sure you want to delete this review?')) return;
    
    try {
      const response = await fetch(`/api/admin/reviews/${reviewId}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        setReviews(prev => prev.filter(r => r._id !== reviewId));
      } else {
        alert('Failed to delete review');
      }
    } catch (error) {
      console.error('Error deleting review:', error);
      alert('Failed to delete review');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const stats = {
    total: reviews.length,
    pending: reviews.filter(r => r.status === 'pending').length,
    approved: reviews.filter(r => r.status === 'approved').length,
    rejected: reviews.filter(r => r.status === 'rejected').length,
    averageRating: reviews.length > 0 
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : '0.0'
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

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
              <h1 className="text-3xl font-bold text-gray-900">Reviews</h1>
              <p className="text-gray-600 mt-1">Manage product reviews and ratings</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <Filter className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
          <div className="bg-white rounded-2xl shadow-lg p-4 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Reviews</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
                              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-4 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-4 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-4 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                <p className="text-2xl font-bold text-blue-600">{stats.averageRating}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-blue-600" />
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
                  placeholder="Search reviews..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as 'all' | 'pending' | 'approved' | 'rejected')}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <select
                value={ratingFilter || ''}
                onChange={(e) => setRatingFilter(e.target.value ? Number(e.target.value) : null)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {ratingOptions.map(option => (
                  <option key={option.value || 'all'} value={option.value || ''}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Reviews List */}
        <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg border border-gray-100">
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">
              Reviews ({sortedReviews.length})
            </h2>
          </div>

          {sortedReviews.length === 0 ? (
            <div className="p-8 text-center">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews found</h3>
              <p className="text-gray-500">No reviews match your current filters.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {sortedReviews.map((review) => (
                <div key={review._id} className="p-4 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="flex items-center gap-1">
                          {renderStars(review.rating)}
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(review.status)}`}>
                          {getStatusIcon(review.status)}
                          {review.status}
                        </span>
                      </div>
                      
                      {review.title && (
                        <h3 className="text-lg font-medium text-gray-900 mb-1">{review.title}</h3>
                      )}
                      
                      <p className="text-gray-700 mb-3">{review.comment}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>Product: {review.product?.name || 'Unknown Product'}</span>
                        <span>By: {review.user?.name || 'Anonymous'}</span>
                        <span>{formatDate(review.createdAt)}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      {review.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleStatusChange(review._id, 'approved')}
                            className="p-2 text-green-600 hover:text-green-700 rounded-lg hover:bg-green-50"
                            title="Approve"
                          >
                            <ThumbsUp className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleStatusChange(review._id, 'rejected')}
                            className="p-2 text-red-600 hover:text-red-700 rounded-lg hover:bg-red-50"
                            title="Reject"
                          >
                            <ThumbsDown className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleDeleteReview(review._id)}
                        className="p-2 text-red-400 hover:text-red-600 rounded-lg hover:bg-red-50"
                        title="Delete"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
} 