import { NextResponse } from 'next/server';
import { getDealsCollection } from '@/utils/mongodb';

export async function GET() {
  try {
    const collection = await getDealsCollection();
    
    // Get active deals (not expired)
    const deals = await collection
      .find({ endDate: { $gt: new Date() } })
      .sort({ endDate: 1 })
      .toArray();
    
    return NextResponse.json(deals);

  } catch (error) {
    console.error('Error fetching deals:', error);
    return NextResponse.json(
      { error: 'Failed to fetch deals' },
      { status: 500 }
    );
  }
} 