import { NextResponse } from 'next/server';
import { getCollection } from '@/lib/database';
import { ObjectId } from 'mongodb';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const reviewsCollection = await getCollection('reviews');
    
    const review = await reviewsCollection.findOne({ _id: new ObjectId(id) });
    
    if (!review) {
      return NextResponse.json(
        { success: false, message: 'Review not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      review
    });
  } catch (error) {
    console.error('Error fetching review:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch review' },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const { status, rating, comment, title } = await request.json();
    
    const reviewsCollection = await getCollection('reviews');
    
    // Check if review exists
    const existingReview = await reviewsCollection.findOne({ _id: new ObjectId(id) });
    if (!existingReview) {
      return NextResponse.json(
        { success: false, message: 'Review not found' },
        { status: 404 }
      );
    }
    
    // Validate status if provided
    if (status && !['pending', 'approved', 'rejected'].includes(status)) {
      return NextResponse.json(
        { success: false, message: 'Invalid status' },
        { status: 400 }
      );
    }
    
    // Validate rating if provided
    if (rating && (rating < 1 || rating > 5)) {
      return NextResponse.json(
        { success: false, message: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }
    
    const updateData = {
      ...(status && { status }),
      ...(rating && { rating }),
      ...(comment !== undefined && { comment }),
      ...(title !== undefined && { title }),
      updatedAt: new Date()
    };
    
    const result = await reviewsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: 'Review not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Review updated successfully'
    });
  } catch (error) {
    console.error('Error updating review:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update review' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const reviewsCollection = await getCollection('reviews');
    
    const result = await reviewsCollection.deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, message: 'Review not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting review:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete review' },
      { status: 500 }
    );
  }
} 