import { NextResponse } from 'next/server';
import { getCollection } from '@/lib/database';
import { ObjectId } from 'mongodb';


export async function GET() {
  try {
    const ordersCollection = await getCollection('orders');
    
    // Fetch all orders from the database, sorted by creation date (newest first)
    const orders = await ordersCollection.find({}).sort({ createdAt: -1 }).toArray();
    
    return NextResponse.json({
      success: true,
      orders: orders,
      total: orders.length,
      message: 'Orders fetched successfully'
    });
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to fetch orders',
      error: error.message
    }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { orderId, status, ...updateData } = await request.json();
    
    const ordersCollection = await getCollection('orders');
    
    // Update the order in the database
    const result = await ordersCollection.updateOne(
      { _id: new ObjectId(orderId) },
      { 
        $set: { 
          status: status,
          ...updateData,
          updatedAt: new Date()
        } 
      }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json({
        success: false,
        message: 'Order not found'
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
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

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');
    const orderIds = searchParams.get('orderIds');
    
    const ordersCollection = await getCollection('orders');
    
    if (orderIds) {
      // Bulk delete multiple orders
      const ids = orderIds.split(',');
      const result = await ordersCollection.deleteMany({ _id: { $in: ids.map(id => new ObjectId(id)) } });
      
      return NextResponse.json({
        success: true,
        message: `${result.deletedCount} orders deleted successfully`,
        deletedCount: result.deletedCount
      });
    } else if (orderId) {
      // Delete single order
      const result = await ordersCollection.deleteOne({ _id: new ObjectId(orderId) });
      
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
    } else {
      return NextResponse.json({
        success: false,
        message: 'No order ID provided'
      }, { status: 400 });
    }
  } catch (error) {
    console.error('Error deleting order(s):', error);
    return NextResponse.json({
      success: false,
      message: 'Failed to delete order(s)',
      error: error.message
    }, { status: 500 });
  }
} 