import { NextResponse } from 'next/server';
import { getCollection } from '@/lib/database';

// Fallback sample products if database is not available
const fallbackProducts = [
  {
    id: "iphone-15-pro-max",
    name: "iPhone 15 Pro Max",
    price: 1299.99,
    originalPrice: 1499.99,
    category: "smartphones",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=600&fit=crop&crop=center",
    images: [
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop&crop=center"
    ],
    description: "The most advanced iPhone ever with A17 Pro chip, titanium design, and 5x optical zoom.",
    rating: 4.9,
    reviews: 1247,
    badge: "New",
    stock: 50
  },
  {
    id: "macbook-pro-14-m3",
    name: "MacBook Pro 14\" M3 Pro",
    price: 1999.99,
    originalPrice: 2199.99,
    category: "laptops",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=600&fit=crop&crop=center",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=600&fit=crop&crop=center"
    ],
    description: "Next-generation performance with M3 Pro chip for professionals.",
    rating: 4.8,
    reviews: 892,
    badge: "Best Seller",
    stock: 30
  },
  {
    id: "sony-wh-1000xm5",
    name: "Sony WH-1000XM5 Wireless Headphones",
    price: 399.99,
    originalPrice: 449.99,
    category: "headphones",
    image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=600&h=600&fit=crop&crop=center",
    images: [
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop&crop=center"
    ],
    description: "Industry-leading noise canceling with Dual Noise Sensor technology.",
    rating: 4.7,
    reviews: 1567,
    badge: "Popular",
    stock: 75
  },
  {
    id: "apple-watch-series-9",
    name: "Apple Watch Series 9",
    price: 399.99,
    originalPrice: 449.99,
    category: "smartwatches",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop&crop=center",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=600&h=600&fit=crop&crop=center"
    ],
    description: "Advanced health monitoring with ECG and blood oxygen tracking.",
    rating: 4.6,
    reviews: 743,
    badge: "Trending",
    stock: 60
  },
  {
    id: "canon-eos-r6-mark-ii",
    name: "Canon EOS R6 Mark II",
    price: 2499.99,
    originalPrice: 2799.99,
    category: "cameras",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&h=600&fit=crop&crop=center",
    images: [
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&h=600&fit=crop&crop=center"
    ],
    description: "Full-frame mirrorless camera with 4K video recording and advanced autofocus.",
    rating: 4.5,
    reviews: 234,
    badge: "Professional",
    stock: 25
  },
  {
    id: "playstation-5",
    name: "PlayStation 5 Console",
    price: 499.99,
    originalPrice: 599.99,
    category: "gaming",
    image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop&crop=center",
    images: [
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop&crop=center"
    ],
    description: "Next-gen gaming with lightning-fast loading and ray tracing.",
    rating: 4.9,
    reviews: 2156,
    badge: "Hot Deal",
    stock: 40
  }
];

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');
    const sort = searchParams.get('sort') || 'name';
    const order = searchParams.get('order') || 'asc';
    const limit = parseInt(searchParams.get('limit')) || 20;
    const page = parseInt(searchParams.get('page')) || 1;
    const skip = (page - 1) * limit;

    let products = [];
    let total = 0;

    try {
      // Try to get products from database
      const collection = await getCollection('products');
      
      // Build query
      let query = {};
      
      if (category && category !== 'all') {
        query.category = category;
      }
      
      if (featured === 'true') {
        query.featured = true;
      }
      
      if (search) {
        query.$or = [
          { name: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ];
      }

      // Build sort object
      const sortObj = {};
      sortObj[sort] = order === 'desc' ? -1 : 1;

      // Get total count for pagination
      total = await collection.countDocuments(query);
      
      // Get products
      products = await collection
        .find(query)
        .sort(sortObj)
        .skip(skip)
        .limit(limit)
        .toArray();

    } catch (dbError) {
      console.log('Database connection failed, using fallback data:', dbError.message);
      
      // Use fallback data if database is not available
      products = [...fallbackProducts];
      total = products.length;
      
      // Apply filters to fallback data
      if (category && category !== 'all') {
        products = products.filter(product => product.category === category);
      }
      
      if (search) {
        const searchLower = search.toLowerCase();
        products = products.filter(product => 
          product.name.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower)
        );
      }
      
      // Apply sorting to fallback data
      products.sort((a, b) => {
        let aValue = a[sort];
        let bValue = b[sort];
        
        if (sort === 'price' || sort === 'rating' || sort === 'reviews' || sort === 'stock') {
          aValue = parseFloat(aValue);
          bValue = parseFloat(bValue);
        }
        
        if (order === 'asc') {
          return aValue > bValue ? 1 : -1;
        } else {
          return aValue < bValue ? 1 : -1;
        }
      });
      
      // Apply pagination to fallback data
      products = products.slice(skip, skip + limit);
    }

    return NextResponse.json({
      products,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
} 