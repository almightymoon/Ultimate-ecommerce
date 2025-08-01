import { NextResponse } from 'next/server';
import { getCategoriesCollection } from '@/utils/mongodb';

export async function GET() {
  try {
    const collection = await getCategoriesCollection();
    const categories = await collection.find({}).toArray();
    
    return NextResponse.json(categories);

  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
} 