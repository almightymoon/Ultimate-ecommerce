'use client';

import React, { useState, useCallback } from 'react';
import { Upload, X, Image as ImageIcon, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageUploadProps {
  onImagesUploaded: (urls: string[]) => void;
  multiple?: boolean;
  maxFiles?: number;
  folder?: string;
  className?: string;
}

interface UploadedImage {
  id: string;
  file: File;
  preview: string;
  uploading: boolean;
  uploaded: boolean;
  url?: string;
  error?: string;
}

export default function ImageUpload({
  onImagesUploaded,
  multiple = true,
  maxFiles = 5,
  folder = 'ultimate-ecommerce',
  className = ''
}: ImageUploadProps) {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = useCallback((files: FileList) => {
    const newImages: UploadedImage[] = Array.from(files).map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file),
      uploading: false,
      uploaded: false
    }));

    if (multiple) {
      setImages(prev => {
        const combined = [...prev, ...newImages];
        return combined.slice(0, maxFiles);
      });
    } else {
      setImages(newImages.slice(0, 1));
    }
  }, [multiple, maxFiles]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files);
    }
  }, [handleFileSelect]);

  const removeImage = useCallback((id: string) => {
    setImages(prev => {
      const image = prev.find(img => img.id === id);
      if (image?.preview) {
        URL.revokeObjectURL(image.preview);
      }
      return prev.filter(img => img.id !== id);
    });
  }, []);

  const uploadImages = async () => {
    if (images.length === 0) return;

    setUploading(true);
    const formData = new FormData();
    
    images.forEach(image => {
      formData.append('images', image.file);
    });
    formData.append('folder', folder);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        const urls = result.uploaded.map((upload: any) => upload.url);
        onImagesUploaded(urls);
        
        // Update images with uploaded status
        setImages(prev => prev.map((img, index) => ({
          ...img,
          uploading: false,
          uploaded: true,
          url: result.uploaded[index]?.url
        })));
      } else {
        throw new Error(result.error || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setImages(prev => prev.map(img => ({
        ...img,
        uploading: false,
        error: 'Upload failed'
      })));
    } finally {
      setUploading(false);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      handleFileSelect(files);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
          isDragOver
            ? 'border-purple-500 bg-purple-50'
            : 'border-gray-300 hover:border-purple-400 hover:bg-gray-50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          multiple={multiple}
          accept="image/*"
          onChange={handleFileInputChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="p-3 bg-purple-100 rounded-full">
              <Upload className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Upload Images
            </h3>
            <p className="text-gray-600">
              Drag and drop images here, or click to select files
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {multiple ? `Up to ${maxFiles} images supported` : 'Single image only'}
            </p>
            {multiple && (
              <p className="text-xs text-blue-600 mt-1 font-medium">
                💡 Tip: You can select multiple images at once
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Image Preview */}
      {images.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-gray-900">
              Selected Images ({images.length})
            </h4>
            <button
              onClick={uploadImages}
              disabled={uploading || images.some(img => img.uploaded)}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              {uploading ? 'Uploading...' : 'Upload Images'}
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <AnimatePresence>
              {images.map((image) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200"
                >
                  <img
                    src={image.preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button
                      onClick={() => removeImage(image.id)}
                      className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Status Indicators */}
                  {image.uploading && (
                    <div className="absolute top-2 right-2 p-1 bg-blue-500 text-white rounded-full">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}

                  {image.uploaded && (
                    <div className="absolute top-2 right-2 p-1 bg-green-500 text-white rounded-full">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                  )}

                  {image.error && (
                    <div className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full">
                      <AlertCircle className="w-4 h-4" />
                    </div>
                  )}

                  {/* File Info */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2 text-xs">
                    <p className="truncate">{image.file.name}</p>
                    <p>{(image.file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
} 