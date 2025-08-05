const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://moon:947131@cluster0.gvga3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const DB_NAME = process.env.DB_NAME || 'ultimate-ecommerce';

async function populateDatabase() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db(DB_NAME);
    
    // Sample Categories
    const categories = [
      {
        name: 'Electronics',
        description: 'Latest electronic gadgets and devices',
        slug: 'electronics',
        image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Fashion',
        description: 'Trendy clothing and accessories',
        slug: 'fashion',
        image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Home & Garden',
        description: 'Everything for your home and garden',
        slug: 'home-garden',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sports',
        description: 'Sports equipment and athletic gear',
        slug: 'sports',
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Books',
        description: 'Books for all ages and interests',
        slug: 'books',
        image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    // Sample Products
    const products = [
      {
        name: 'Wireless Bluetooth Headphones',
        description: 'High-quality wireless headphones with noise cancellation',
        price: 129.99,
        originalPrice: 159.99,
        category: 'electronics',
        images: [
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
          'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400'
        ],
        stock: 45,
        sold: 123,
        rating: 4.5,
        reviews: 89,
        featured: true,
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Smart Fitness Watch',
        description: 'Advanced fitness tracking with heart rate monitor',
        price: 199.99,
        originalPrice: 249.99,
        category: 'electronics',
        images: [
          'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
          'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=400'
        ],
        stock: 32,
        sold: 78,
        rating: 4.3,
        reviews: 56,
        featured: true,
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Premium Cotton T-Shirt',
        description: 'Comfortable and stylish cotton t-shirt',
        price: 29.99,
        originalPrice: 39.99,
        category: 'fashion',
        images: [
          'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
          'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400'
        ],
        stock: 120,
        sold: 234,
        rating: 4.7,
        reviews: 156,
        featured: false,
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Garden Tool Set',
        description: 'Complete set of essential garden tools',
        price: 89.99,
        originalPrice: 119.99,
        category: 'home-garden',
        images: [
          'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400',
          'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=400'
        ],
        stock: 18,
        sold: 45,
        rating: 4.2,
        reviews: 34,
        featured: false,
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Basketball',
        description: 'Professional basketball for indoor and outdoor use',
        price: 49.99,
        originalPrice: 69.99,
        category: 'sports',
        images: [
          'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400',
          'https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?w=400'
        ],
        stock: 67,
        sold: 89,
        rating: 4.6,
        reviews: 67,
        featured: false,
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    // Sample Orders
    const orders = [
      {
        userId: 'user1',
        items: [
          {
            productId: 'product1',
            name: 'Wireless Bluetooth Headphones',
            price: 129.99,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'
          }
        ],
        total: 129.99,
        status: 'completed',
        shippingAddress: {
          street: '123 Main St',
          city: 'New York',
          state: 'NY',
          zipCode: '10001',
          country: 'USA'
        },
        paymentMethod: 'credit_card',
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
      },
      {
        userId: 'user2',
        items: [
          {
            productId: 'product2',
            name: 'Smart Fitness Watch',
            price: 199.99,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400'
          },
          {
            productId: 'product3',
            name: 'Premium Cotton T-Shirt',
            price: 29.99,
            quantity: 2,
            image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400'
          }
        ],
        total: 259.97,
        status: 'processing',
        shippingAddress: {
          street: '456 Oak Ave',
          city: 'Los Angeles',
          state: 'CA',
          zipCode: '90210',
          country: 'USA'
        },
        paymentMethod: 'paypal',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      },
      {
        userId: 'user3',
        items: [
          {
            productId: 'product4',
            name: 'Garden Tool Set',
            price: 89.99,
            quantity: 1,
            image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400'
          }
        ],
        total: 89.99,
        status: 'pending',
        shippingAddress: {
          street: '789 Pine St',
          city: 'Chicago',
          state: 'IL',
          zipCode: '60601',
          country: 'USA'
        },
        paymentMethod: 'credit_card',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    // Sample Reviews
    const reviews = [
      {
        productId: 'product1',
        userId: 'user1',
        rating: 5,
        title: 'Excellent sound quality!',
        comment: 'These headphones are amazing. The sound quality is incredible and the battery life is impressive.',
        status: 'approved',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
      },
      {
        productId: 'product1',
        userId: 'user2',
        rating: 4,
        title: 'Great headphones',
        comment: 'Very good sound quality and comfortable to wear. Would recommend!',
        status: 'approved',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
      },
      {
        productId: 'product2',
        userId: 'user3',
        rating: 4,
        title: 'Good fitness tracker',
        comment: 'Tracks my workouts well and the heart rate monitor is accurate.',
        status: 'pending',
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
      },
      {
        productId: 'product3',
        userId: 'user1',
        rating: 5,
        title: 'Perfect fit!',
        comment: 'The t-shirt fits perfectly and the material is very comfortable.',
        status: 'approved',
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)
      }
    ];

    // Sample Users (customers)
    const users = [
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: '$2b$10$yM0KrQSymh2tlcYeN5q9w.sAdOxeR4UhOsphEf6Mf/s5PA3bSzj/m', // password123
        role: 'user',
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: '$2b$10$yM0KrQSymh2tlcYeN5q9w.sAdOxeR4UhOsphEf6Mf/s5PA3bSzj/m', // password123
        role: 'user',
        createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000)
      },
      {
        name: 'Mike Johnson',
        email: 'mike@example.com',
        password: '$2b$10$yM0KrQSymh2tlcYeN5q9w.sAdOxeR4UhOsphEf6Mf/s5PA3bSzj/m', // password123
        role: 'user',
        createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
        updatedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)
      }
    ];

    // Clear existing data
    await db.collection('categories').deleteMany({});
    await db.collection('products').deleteMany({});
    await db.collection('orders').deleteMany({});
    await db.collection('reviews').deleteMany({});
    
    // Don't delete users to preserve admin user
    // await db.collection('users').deleteMany({ role: 'user' });

    // Insert sample data
    const categoriesResult = await db.collection('categories').insertMany(categories);
    console.log(`Inserted ${categoriesResult.insertedCount} categories`);

    const productsResult = await db.collection('products').insertMany(products);
    console.log(`Inserted ${productsResult.insertedCount} products`);

    const ordersResult = await db.collection('orders').insertMany(orders);
    console.log(`Inserted ${ordersResult.insertedCount} orders`);

    const reviewsResult = await db.collection('reviews').insertMany(reviews);
    console.log(`Inserted ${reviewsResult.insertedCount} reviews`);

    // Insert users only if they don't exist
    for (const user of users) {
      const existingUser = await db.collection('users').findOne({ email: user.email });
      if (!existingUser) {
        await db.collection('users').insertOne(user);
        console.log(`Inserted user: ${user.email}`);
      } else {
        console.log(`User already exists: ${user.email}`);
      }
    }

    console.log('Database populated successfully!');
    
  } catch (error) {
    console.error('Error populating database:', error);
  } finally {
    await client.close();
  }
}

populateDatabase(); 