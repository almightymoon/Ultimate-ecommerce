'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, CheckCircle, AlertCircle } from 'lucide-react';
import ImageUpload from '@/components/ImageUpload';

export default function UploadTestPage() {
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const handleImagesUploaded = (urls: string[]) => {
    setUploadedImages(prev => [...prev, ...urls]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.history.back()}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Cloudinary Image Upload Test</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Info Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Cloudinary Integration</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                This page demonstrates the Cloudinary image upload functionality integrated into your e-commerce application.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">Features:</h3>
                <ul className="space-y-1 text-blue-800">
                  <li>• Drag & drop image upload</li>
                  <li>• Multiple image support</li>
                  <li>• Automatic image optimization</li>
                  <li>• Cloud storage with CDN</li>
                  <li>• Real-time upload progress</li>
                  <li>• Image preview and management</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Upload Component */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload Images</h2>
            <ImageUpload
              onImagesUploaded={handleImagesUploaded}
              multiple={true}
              maxFiles={5}
              folder="ultimate-ecommerce/test"
            />
          </div>

          {/* Uploaded Images Display */}
          {uploadedImages.length > 0 && (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Uploaded Images ({uploadedImages.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {uploadedImages.map((imageUrl, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="space-y-4"
                  >
                    <div className="aspect-square rounded-lg overflow-hidden border border-gray-200">
                      <img
                        src={imageUrl}
                        alt={`Uploaded ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        <span>Successfully uploaded</span>
                      </div>
                      <p className="text-xs text-gray-500 break-all">
                        {imageUrl}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Cloudinary Info */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Cloudinary Configuration</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Cloud Name</h3>
                  <p className="text-sm text-gray-600">dytsuek4h</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">API Key</h3>
                  <p className="text-sm text-gray-600">116785848947978</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Status</h3>
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm">Connected</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="font-semibold text-green-900 mb-2">Benefits of Cloudinary Integration:</h3>
                <ul className="space-y-1 text-green-800 text-sm">
                  <li>• Automatic image optimization and compression</li>
                  <li>• Global CDN for fast image delivery</li>
                  <li>• Responsive images with automatic format selection</li>
                  <li>• Secure cloud storage with backup</li>
                  <li>• Real-time image transformations</li>
                  <li>• Cost-effective image management</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 