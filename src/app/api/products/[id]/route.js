import { NextResponse } from 'next/server';
import { getProductsCollection } from '@/utils/mongodb';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const collection = await getProductsCollection();
    
    const product = await collection.findOne({ id });
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(product);

  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
} 