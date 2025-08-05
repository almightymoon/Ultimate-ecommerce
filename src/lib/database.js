import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ultimate-ecommerce';
const DB_NAME = 'ultimate-ecommerce';

let client;
let db;

export async function connectToDatabase() {
  if (client && db) {
    return { client, db };
  }

  try {
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    db = client.db(DB_NAME);
    
    // Create indexes for better performance
    await createIndexes();
    
    console.log('Connected to MongoDB');
    return { client, db };
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}

async function createIndexes() {
  try {
    // Products collection indexes
    await db.collection('products').createIndex({ id: 1 }, { unique: true, sparse: true });
    await db.collection('products').createIndex({ category: 1 });
    await db.collection('products').createIndex({ price: 1 });
    await db.collection('products').createIndex({ name: 'text', description: 'text' });
    await db.collection('products').createIndex({ createdAt: -1 });
  } catch (error) {
    console.log('Index creation failed, continuing without indexes:', error.message);
  }

  try {
    // Categories collection indexes
    await db.collection('categories').createIndex({ id: 1 }, { unique: true, sparse: true });
    await db.collection('categories').createIndex({ name: 1 });

    // Orders collection indexes
    await db.collection('orders').createIndex({ orderId: 1 }, { unique: true, sparse: true });
    await db.collection('orders').createIndex({ userId: 1 });
    await db.collection('orders').createIndex({ status: 1 });
    await db.collection('orders').createIndex({ createdAt: -1 });

    // Users collection indexes
    await db.collection('users').createIndex({ email: 1 }, { unique: true, sparse: true });
    await db.collection('users').createIndex({ id: 1 }, { unique: true, sparse: true });
    await db.collection('users').createIndex({ role: 1 });
    await db.collection('users').createIndex({ createdAt: -1 });

    // Analytics collection indexes
    await db.collection('analytics').createIndex({ date: 1 });
    await db.collection('analytics').createIndex({ type: 1 });

    // Reviews collection indexes
    await db.collection('reviews').createIndex({ productId: 1 });
    await db.collection('reviews').createIndex({ userId: 1 });
    await db.collection('reviews').createIndex({ rating: 1 });
    await db.collection('reviews').createIndex({ createdAt: -1 });
  } catch (error) {
    console.log('Additional index creation failed, continuing without indexes:', error.message);
  }
}

export async function getCollection(collectionName) {
  const { db } = await connectToDatabase();
  return db.collection(collectionName);
}

export async function closeConnection() {
  if (client) {
    await client.close();
  }
}

// Database schema and sample data
export const databaseSchema = {
  products: {
    id: 'string (unique)',
    name: 'string',
    description: 'string',
    price: 'number',
    originalPrice: 'number (optional)',
    category: 'string',
    categoryId: 'string',
    images: 'array of strings',
    stock: 'number',
    sold: 'number',
    rating: 'number',
    reviews: 'number',
    badge: 'string (optional)',
    discount: 'number (optional)',
    featured: 'boolean',
    status: 'string (active/inactive)',
    createdAt: 'date',
    updatedAt: 'date'
  },
  categories: {
    id: 'string (unique)',
    name: 'string',
    description: 'string',
    image: 'string',
    productCount: 'number',
    status: 'string (active/inactive)',
    createdAt: 'date',
    updatedAt: 'date'
  },
  orders: {
    orderId: 'string (unique)',
    userId: 'string',
    userEmail: 'string',
    userName: 'string',
    items: 'array of order items',
    subtotal: 'number',
    tax: 'number',
    shipping: 'number',
    total: 'number',
    status: 'string (pending/processing/shipped/delivered/cancelled)',
    paymentStatus: 'string (pending/paid/failed)',
    paymentMethod: 'string',
    shippingAddress: 'object',
    billingAddress: 'object',
    trackingNumber: 'string (optional)',
    notes: 'string (optional)',
    createdAt: 'date',
    updatedAt: 'date'
  },
  users: {
    id: 'string (unique)',
    email: 'string (unique)',
    password: 'string (hashed)',
    firstName: 'string',
    lastName: 'string',
    role: 'string (user/admin/super-admin)',
    avatar: 'string (optional)',
    phone: 'string (optional)',
    address: 'object (optional)',
    preferences: 'object (optional)',
    isActive: 'boolean',
    emailVerified: 'boolean',
    lastLogin: 'date (optional)',
    createdAt: 'date',
    updatedAt: 'date'
  },
  analytics: {
    id: 'string (unique)',
    type: 'string (sales/visitors/orders/products)',
    date: 'date',
    data: 'object',
    createdAt: 'date'
  },
  reviews: {
    id: 'string (unique)',
    productId: 'string',
    userId: 'string',
    userName: 'string',
    rating: 'number (1-5)',
    title: 'string',
    comment: 'string',
    images: 'array of strings (optional)',
    helpful: 'number',
    status: 'string (pending/approved/rejected)',
    createdAt: 'date',
    updatedAt: 'date'
  },
  settings: {
    id: 'string (unique)',
    key: 'string',
    value: 'any',
    description: 'string (optional)',
    updatedAt: 'date'
  }
};

// Sample data for initial setup
export const sampleData = {
  categories: [
    {
      id: 'cat-1',
      name: 'Electronics',
      description: 'Latest electronic gadgets and devices',
      image: '📱',
      productCount: 0,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'cat-2',
      name: 'Fashion',
      description: 'Trendy fashion and clothing items',
      image: '👕',
      productCount: 0,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'cat-3',
      name: 'Home & Garden',
      description: 'Home improvement and garden supplies',
      image: '🏠',
      productCount: 0,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ],
  products: [
    {
      id: 'prod-1',
      name: 'Premium Wireless Headphones',
      description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life',
      price: 299.99,
      originalPrice: 399.99,
      category: 'Electronics',
      categoryId: 'cat-1',
      images: [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop&crop=center'
      ],
      stock: 50,
      sold: 25,
      rating: 4.5,
      reviews: 12,
      badge: 'Best Seller',
      discount: 25,
      featured: true,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'prod-2',
      name: 'Smart Fitness Watch',
      description: 'Advanced fitness tracking with heart rate monitor and GPS',
      price: 199.99,
      originalPrice: 249.99,
      category: 'Electronics',
      categoryId: 'cat-1',
      images: [
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=600&h=600&fit=crop&crop=center'
      ],
      stock: 30,
      sold: 15,
      rating: 4.3,
      reviews: 8,
      badge: 'New',
      discount: 20,
      featured: true,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'prod-3',
      name: '4K Ultra HD Smart TV',
      description: '55-inch 4K Ultra HD Smart TV with HDR and built-in streaming apps',
      price: 799.99,
      originalPrice: 999.99,
      category: 'Electronics',
      categoryId: 'cat-1',
      images: [
        'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&h=600&fit=crop&crop=center'
      ],
      stock: 15,
      sold: 8,
      rating: 4.7,
      reviews: 23,
      badge: 'Hot Deal',
      discount: 20,
      featured: true,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'prod-4',
      name: 'Wireless Bluetooth Speaker',
      description: 'Portable waterproof speaker with 360-degree sound and 20-hour battery',
      price: 89.99,
      originalPrice: 129.99,
      category: 'Electronics',
      categoryId: 'cat-1',
      images: ['🔊'],
      stock: 75,
      sold: 42,
      rating: 4.4,
      reviews: 18,
      badge: 'Popular',
      discount: 31,
      featured: false,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'prod-5',
      name: 'Gaming Laptop',
      description: '15.6-inch gaming laptop with RTX 4060, 16GB RAM, and 1TB SSD',
      price: 1299.99,
      originalPrice: 1499.99,
      category: 'Electronics',
      categoryId: 'cat-1',
      images: [
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=600&fit=crop&crop=center'
      ],
      stock: 12,
      sold: 6,
      rating: 4.8,
      reviews: 31,
      badge: 'Limited Stock',
      discount: 13,
      featured: true,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'prod-6',
      name: 'Smartphone Pro Max',
      description: 'Latest smartphone with 6.7-inch display, 256GB storage, and 48MP camera',
      price: 1099.99,
      originalPrice: 1199.99,
      category: 'Electronics',
      categoryId: 'cat-1',
      images: [
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=600&fit=crop&crop=center'
      ],
      stock: 25,
      sold: 18,
      rating: 4.6,
      reviews: 45,
      badge: 'Trending',
      discount: 8,
      featured: true,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'prod-7',
      name: 'Designer Running Shoes',
      description: 'Lightweight running shoes with advanced cushioning technology',
      price: 129.99,
      originalPrice: 159.99,
      category: 'Fashion',
      categoryId: 'cat-2',
      images: ['👟'],
      stock: 60,
      sold: 35,
      rating: 4.2,
      reviews: 28,
      badge: 'Sale',
      discount: 19,
      featured: false,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'prod-8',
      name: 'Premium Denim Jacket',
      description: 'Classic denim jacket with modern fit and sustainable materials',
      price: 89.99,
      originalPrice: 119.99,
      category: 'Fashion',
      categoryId: 'cat-2',
      images: ['🧥'],
      stock: 40,
      sold: 22,
      rating: 4.1,
      reviews: 15,
      badge: 'New Arrival',
      discount: 25,
      featured: false,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'prod-9',
      name: 'Organic Cotton T-Shirt',
      description: 'Comfortable organic cotton t-shirt available in multiple colors',
      price: 24.99,
      originalPrice: 34.99,
      category: 'Fashion',
      categoryId: 'cat-2',
      images: ['👕'],
      stock: 100,
      sold: 67,
      rating: 4.3,
      reviews: 52,
      badge: 'Best Value',
      discount: 29,
      featured: false,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'prod-10',
      name: 'Leather Crossbody Bag',
      description: 'Handcrafted leather crossbody bag with adjustable strap',
      price: 79.99,
      originalPrice: 99.99,
      category: 'Fashion',
      categoryId: 'cat-2',
      images: ['👜'],
      stock: 35,
      sold: 19,
      rating: 4.4,
      reviews: 24,
      badge: 'Handmade',
      discount: 20,
      featured: false,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'prod-11',
      name: 'Professional Coffee Maker',
      description: 'Automatic coffee maker with programmable settings and thermal carafe',
      price: 149.99,
      originalPrice: 199.99,
      category: 'Home & Garden',
      categoryId: 'cat-3',
      images: ['☕'],
      stock: 30,
      sold: 12,
      rating: 4.5,
      reviews: 19,
      badge: 'Premium',
      discount: 25,
      featured: true,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'prod-12',
      name: 'Smart LED Light Bulbs',
      description: 'WiFi-enabled smart LED bulbs with voice control and scheduling',
      price: 49.99,
      originalPrice: 69.99,
      category: 'Home & Garden',
      categoryId: 'cat-3',
      images: ['💡'],
      stock: 80,
      sold: 45,
      rating: 4.2,
      reviews: 33,
      badge: 'Smart Home',
      discount: 29,
      featured: false,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'prod-13',
      name: 'Garden Tool Set',
      description: 'Complete garden tool set with ergonomic handles and storage case',
      price: 89.99,
      originalPrice: 129.99,
      category: 'Home & Garden',
      categoryId: 'cat-3',
      images: ['🌱'],
      stock: 25,
      sold: 8,
      rating: 4.0,
      reviews: 11,
      badge: 'Complete Set',
      discount: 31,
      featured: false,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'prod-14',
      name: 'Yoga Mat Premium',
      description: 'Non-slip yoga mat with alignment lines and carrying strap',
      price: 39.99,
      originalPrice: 59.99,
      category: 'Sports & Outdoors',
      categoryId: 'cat-4',
      images: ['🧘'],
      stock: 70,
      sold: 38,
      rating: 4.6,
      reviews: 41,
      badge: 'Best Seller',
      discount: 33,
      featured: false,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'prod-15',
      name: 'Camping Tent 4-Person',
      description: 'Weather-resistant 4-person camping tent with easy setup',
      price: 199.99,
      originalPrice: 249.99,
      category: 'Sports & Outdoors',
      categoryId: 'cat-4',
      images: ['⛺'],
      stock: 20,
      sold: 7,
      rating: 4.3,
      reviews: 16,
      badge: 'Adventure',
      discount: 20,
      featured: true,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ],
  customers: [
    {
      id: 'cust-1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
      address: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zip: '10001',
        country: 'USA'
      },
      totalOrders: 12,
      totalSpent: 2499.99,
      status: 'active',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date()
    },
    {
      id: 'cust-2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+1 (555) 234-5678',
      address: {
        street: '456 Oak Ave',
        city: 'Los Angeles',
        state: 'CA',
        zip: '90210',
        country: 'USA'
      },
      totalOrders: 8,
      totalSpent: 1899.99,
      status: 'active',
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date()
    },
    {
      id: 'cust-3',
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      phone: '+1 (555) 345-6789',
      address: {
        street: '789 Pine St',
        city: 'Chicago',
        state: 'IL',
        zip: '60601',
        country: 'USA'
      },
      totalOrders: 3,
      totalSpent: 599.99,
      status: 'inactive',
      createdAt: new Date('2024-01-05'),
      updatedAt: new Date()
    }
  ],
  orders: [
    {
      orderId: 'ORD-001',
      customer: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567'
      },
      items: [
        { 
          id: 'prod-1',
          name: 'Premium Wireless Headphones',
          quantity: 1,
          price: 299.99
        }
      ],
      total: 299.99,
      status: 'delivered',
      paymentStatus: 'paid',
      paymentMethod: 'Credit Card',
      shippingAddress: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zip: '10001',
        country: 'USA'
      },
      trackingNumber: 'TRK123456789',
      createdAt: new Date('2024-01-15T10:30:00Z'),
      updatedAt: new Date('2024-01-18T14:20:00Z')
    },
    {
      orderId: 'ORD-002',
      customer: {
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        phone: '+1 (555) 234-5678'
      },
      items: [
        { 
          id: 'prod-2',
          name: 'Smart Fitness Watch',
          quantity: 1,
          price: 199.99
        }
      ],
      total: 199.99,
      status: 'processing',
      paymentStatus: 'paid',
      paymentMethod: 'PayPal',
      shippingAddress: {
        street: '456 Oak Ave',
        city: 'Los Angeles',
        state: 'CA',
        zip: '90210',
        country: 'USA'
      },
      createdAt: new Date('2024-01-14T15:45:00Z'),
      updatedAt: new Date('2024-01-16T09:15:00Z')
    },
    {
      orderId: 'ORD-003',
      customer: {
        name: 'Mike Johnson',
        email: 'mike.johnson@example.com',
        phone: '+1 (555) 345-6789'
      },
      items: [
        { 
          id: 'prod-3',
          name: '4K Ultra HD Smart TV',
          quantity: 1,
          price: 799.99
        }
      ],
      total: 799.99,
      status: 'shipped',
      paymentStatus: 'paid',
      paymentMethod: 'Credit Card',
      shippingAddress: {
        street: '789 Pine St',
        city: 'Chicago',
        state: 'IL',
        zip: '60601',
        country: 'USA'
      },
      trackingNumber: 'TRK987654321',
      createdAt: new Date('2024-01-13T12:00:00Z'),
      updatedAt: new Date('2024-01-17T16:30:00Z')
    }
  ],
  users: [
    {
      id: 'admin-1',
      email: 'almightymooon@gmail.com',
      password: '$2b$10$toFj7nPh6IFOz5o3hKq6W.KN3z6XhG0JgLXE.gdjVViG44/bjdKou', // "admin123" hashed
      firstName: 'Admin',
      lastName: 'User',
      role: 'super-admin',
      avatar: '👤',
      isActive: true,
      emailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ],
  settings: [
    {
      id: 'setting-1',
      key: 'site_name',
      value: 'Ultimate E-Commerce',
      description: 'Website name',
      updatedAt: new Date()
    },
    {
      id: 'setting-2',
      key: 'site_description',
      value: 'Premium shopping experience',
      description: 'Website description',
      updatedAt: new Date()
    },
    {
      id: 'setting-3',
      key: 'currency',
      value: 'USD',
      description: 'Default currency',
      updatedAt: new Date()
    },
    {
      id: 'setting-4',
      key: 'tax_rate',
      value: 8.5,
      description: 'Default tax rate percentage',
      updatedAt: new Date()
    },
    {
      id: 'setting-5',
      key: 'shipping_cost',
      value: 9.99,
      description: 'Default shipping cost',
      updatedAt: new Date()
    }
  ],
  deals: [
    {
      id: 'deal-1',
      title: 'Summer Electronics Sale',
      description: 'Up to 50% off on selected electronics',
      discount: 50,
      startDate: new Date('2024-06-01'),
      endDate: new Date('2025-12-31'),
      category: 'Electronics',
      image: '📱',
      featured: true,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'deal-2',
      title: 'Fashion Flash Sale',
      description: 'Special discounts on trendy fashion items',
      discount: 30,
      startDate: new Date('2024-07-01'),
      endDate: new Date('2025-12-31'),
      category: 'Fashion',
      image: '👕',
      featured: true,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'deal-3',
      title: 'Home & Garden Deals',
      description: 'Great prices on home improvement items',
      discount: 25,
      startDate: new Date('2024-07-15'),
      endDate: new Date('2025-12-31'),
      category: 'Home & Garden',
      image: '🏠',
      featured: false,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]
}; 