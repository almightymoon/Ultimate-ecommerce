import { NextResponse } from 'next/server';
import { getCollection } from '@/lib/database';

// Fallback sample deals if database is not available
const fallbackDeals = [
  {
    id: "summer-sale",
    title: "Summer Sale",
    description: "Up to 50% off on selected items",
    discount: 50,
    startDate: new Date('2024-06-01'),
    endDate: new Date('2025-12-31'),
    category: "all",
    image: "🌞",
    featured: true
  },
  {
    id: "tech-deals",
    title: "Tech Deals Week",
    description: "Special discounts on electronics",
    discount: 30,
    startDate: new Date('2024-07-01'),
    endDate: new Date('2025-12-31'),
    category: "smartphones",
    image: "📱",
    featured: true
  },
  {
    id: "gaming-weekend",
    title: "Gaming Weekend",
    description: "Gaming accessories at great prices",
    discount: 25,
    startDate: new Date('2024-07-15'),
    endDate: new Date('2025-12-31'),
    category: "gaming",
    image: "🎮",
    featured: false
  }
];

export async function GET() {
  try {
    let deals = [];

    try {
      // Try to get deals from database
      const collection = await getCollection('deals');
      
      // Get active deals (not expired)
      deals = await collection
        .find({ endDate: { $gt: new Date() } })
        .sort({ endDate: 1 })
        .toArray();
    } catch (dbError) {
      console.log('Database connection failed, using fallback deals:', dbError.message);
      // Use fallback data if database is not available
      deals = fallbackDeals.filter(deal => deal.endDate > new Date());
    }
    
    return NextResponse.json(deals);

  } catch (error) {
    console.error('Error fetching deals:', error);
    return NextResponse.json(
      { error: 'Failed to fetch deals' },
      { status: 500 }
    );
  }
} 