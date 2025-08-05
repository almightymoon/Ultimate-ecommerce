import { NextResponse } from 'next/server';
import { getCollection } from '@/lib/database';
import { ObjectId } from 'mongodb';


export async function GET(request, { params }) {
  try {
    const { id } = await params;
    
    const ordersCollection = await getCollection('orders');
    
    // Fetch the order from the database
    const order = await ordersCollection.findOne({ _id: new ObjectId(id) });
    
    if (!order) {
      return NextResponse.json({
        success: false,
        message: 'Order not found'
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      order
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch order',
      error: error.message
    }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const updateData = await request.json();
    
    const ordersCollection = await getCollection('orders');
    
    // Update the order in the database
    const result = await ordersCollection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { 
        $set: { 
          ...updateData,
          updatedAt: new Date()
        } 
      },
      { returnDocument: 'after' }
    );
    
    if (!result) {
      return NextResponse.json({
        success: false,
        message: 'Order not found'
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      order: result,
      message: 'Order updated successfully'
    });
  } catch (error) {
    console.error('Error updating order:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to update order',
      error: error.message
    }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    
    const ordersCollection = await getCollection('orders');
    
    // Delete the order from the database
    const result = await ordersCollection.deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      return NextResponse.json({
        success: false,
        message: 'Order not found'
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      message: 'Order deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting order:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to delete order',
      error: error.message
    }, { status: 500 });
  }
} 