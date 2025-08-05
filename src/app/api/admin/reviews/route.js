import { NextResponse } from 'next/server';
import { getCollection } from '@/lib/database';

export async function GET() {
  try {
    const reviewsCollection = await getCollection('reviews');
    const reviews = await reviewsCollection.find({}).toArray();
    
    return NextResponse.json({
      success: true,
      reviews: reviews
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { productId, userId, rating, comment, title } = await request.json();
    
    if (!productId || !userId || !rating) {
      return NextResponse.json(
        { success: false, message: 'Product ID, User ID, and rating are required' },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { success: false, message: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    const reviewsCollection = await getCollection('reviews');
    
    // Check if user already reviewed this product
    const existingReview = await reviewsCollection.findOne({ 
      productId: productId,
      userId: userId 
    });
    
    if (existingReview) {
      return NextResponse.json(
        { success: false, message: 'User has already reviewed this product' },
        { status: 400 }
      );
    }

    const newReview = {
      productId,
      userId,
      rating,
      comment: comment || '',
      title: title || '',
      status: 'pending', // pending, approved, rejected
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await reviewsCollection.insertOne(newReview);
    
    return NextResponse.json({
      success: true,
      review: { ...newReview, _id: result.insertedId }
    });
  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create review' },
      { status: 500 }
    );
  }
} 