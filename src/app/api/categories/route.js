import { NextResponse } from 'next/server';
import { getCollection } from '@/lib/database';

// Fallback sample categories if database is not available
const fallbackCategories = [
  {
    id: "smartphones",
    name: "Smartphones",
    description: "Latest mobile devices and smartphones",
    image: "📱",
    productCount: 15,
    subcategories: ["iPhone", "Android", "Accessories"]
  },
  {
    id: "laptops",
    name: "Laptops",
    description: "Professional and gaming laptops",
    image: "💻",
    productCount: 12,
    subcategories: ["MacBook", "Windows", "Gaming", "Business"]
  },
  {
    id: "headphones",
    name: "Headphones",
    description: "Wireless and wired audio solutions",
    image: "🎧",
    productCount: 8,
    subcategories: ["Wireless", "Noise Cancelling", "Gaming", "Studio"]
  },
  {
    id: "smartwatches",
    name: "Smartwatches",
    description: "Fitness and health tracking devices",
    image: "⌚",
    productCount: 6,
    subcategories: ["Apple Watch", "Fitness", "Luxury", "Sports"]
  },
  {
    id: "cameras",
    name: "Cameras",
    description: "Professional and amateur photography equipment",
    image: "📷",
    productCount: 10,
    subcategories: ["DSLR", "Mirrorless", "Action", "Lenses"]
  },
  {
    id: "gaming",
    name: "Gaming",
    description: "Gaming consoles and accessories",
    image: "🎮",
    productCount: 7,
    subcategories: ["Consoles", "Controllers", "VR", "PC Gaming"]
  }
];

export async function GET() {
  try {
    let categories = [];

    try {
      // Try to get categories from database
      const collection = await getCollection('categories');
      categories = await collection.find({}).toArray();
    } catch (dbError) {
      console.log('Database connection failed, using fallback categories:', dbError.message);
      // Use fallback data if database is not available
      categories = [...fallbackCategories];
    }
    
    return NextResponse.json(categories);

  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
} 