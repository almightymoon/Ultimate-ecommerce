import { NextResponse } from 'next/server';
import { getCollection } from '@/lib/database';

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    
    const productsCollection = await getCollection('products');
    
    // Delete the product
    const result = await productsCollection.deleteOne({ id: id });
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, message: 'Product not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Product deleted successfully',
      deletedCount: result.deletedCount
    });
    
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const productData = await request.json();
    
    const productsCollection = await getCollection('products');
    
    // Update the product
    const result = await productsCollection.updateOne(
      { id: id },
      { 
        $set: {
          ...productData,
          updatedAt: new Date()
        }
      }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: 'Product not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Product updated successfully',
      modifiedCount: result.modifiedCount
    });
    
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const productData = await request.json();
    
    const productsCollection = await getCollection('products');
    
    // Update the product
    const result = await productsCollection.updateOne(
      { id: id },
      { 
        $set: {
          ...productData,
          updatedAt: new Date()
        }
      }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: 'Product not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Product updated successfully',
      modifiedCount: result.modifiedCount
    });
    
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    
    const productsCollection = await getCollection('products');
    
    // Get the product
    const product = await productsCollection.findOne({ id: id });
    
    if (!product) {
      return NextResponse.json(
        { success: false, message: 'Product not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      product
    });
    
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
} 