import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dytsuek4h',
  api_key: process.env.CLOUDINARY_API_KEY || '116785848947978',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'kkcudnKMxBvdhf-6dgmPihQh4jw',
});

/**
 * Upload image to Cloudinary
 * @param {string} imagePath - Path to image file or base64 string
 * @param {string} folder - Folder name in Cloudinary (optional)
 * @param {Object} options - Additional upload options
 * @returns {Promise<Object>} Upload result
 */
export async function uploadImage(imagePath, folder = 'ultimate-ecommerce', options = {}) {
  try {
    const uploadOptions = {
      folder,
      resource_type: 'auto',
      allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
      transformation: [
        { quality: 'auto:good' },
        { fetch_format: 'auto' }
      ],
      ...options
    };

    const result = await cloudinary.uploader.upload(imagePath, uploadOptions);
    
    return {
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Upload multiple images to Cloudinary
 * @param {Array} imagePaths - Array of image paths or base64 strings
 * @param {string} folder - Folder name in Cloudinary
 * @returns {Promise<Array>} Array of upload results
 */
export async function uploadMultipleImages(imagePaths, folder = 'ultimate-ecommerce') {
  try {
    const uploadPromises = imagePaths.map((imagePath, index) => 
      uploadImage(imagePath, `${folder}/product-${Date.now()}-${index}`)
    );
    
    const results = await Promise.all(uploadPromises);
    return results;
  } catch (error) {
    console.error('Multiple image upload error:', error);
    return [];
  }
}

/**
 * Delete image from Cloudinary
 * @param {string} publicId - Public ID of the image
 * @returns {Promise<Object>} Deletion result
 */
export async function deleteImage(publicId) {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return {
      success: true,
      result
    };
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Generate optimized image URL with transformations
 * @param {string} publicId - Public ID of the image
 * @param {Object} options - Transformation options
 * @returns {string} Optimized image URL
 */
export function getOptimizedImageUrl(publicId, options = {}) {
  const defaultOptions = {
    quality: 'auto:good',
    fetch_format: 'auto',
    ...options
  };

  return cloudinary.url(publicId, defaultOptions);
}

/**
 * Generate thumbnail URL
 * @param {string} publicId - Public ID of the image
 * @param {number} width - Width of thumbnail
 * @param {number} height - Height of thumbnail
 * @returns {string} Thumbnail URL
 */
export function getThumbnailUrl(publicId, width = 300, height = 300) {
  return cloudinary.url(publicId, {
    width,
    height,
    crop: 'fill',
    quality: 'auto:good',
    fetch_format: 'auto'
  });
}

/**
 * Generate product image URL with specific dimensions
 * @param {string} publicId - Public ID of the image
 * @param {number} width - Width of image
 * @param {number} height - Height of image
 * @returns {string} Product image URL
 */
export function getProductImageUrl(publicId, width = 600, height = 600) {
  return cloudinary.url(publicId, {
    width,
    height,
    crop: 'fill',
    quality: 'auto:good',
    fetch_format: 'auto'
  });
}

/**
 * Check if URL is a Cloudinary URL
 * @param {string} url - URL to check
 * @returns {boolean} True if it's a Cloudinary URL
 */
export function isCloudinaryUrl(url) {
  return url && url.includes('res.cloudinary.com');
}

/**
 * Extract public ID from Cloudinary URL
 * @param {string} url - Cloudinary URL
 * @returns {string|null} Public ID or null
 */
export function extractPublicId(url) {
  if (!isCloudinaryUrl(url)) return null;
  
  try {
    const urlParts = url.split('/');
    const uploadIndex = urlParts.findIndex(part => part === 'upload');
    if (uploadIndex === -1) return null;
    
    const publicIdParts = urlParts.slice(uploadIndex + 2);
    const publicId = publicIdParts.join('/').split('.')[0];
    return publicId;
  } catch (error) {
    console.error('Error extracting public ID:', error);
    return null;
  }
} 