import { NextResponse } from 'next/server';
import { getCollection } from '@/lib/database';

export async function POST(req) {
  try {
    const orderData = await req.json();
    
    console.log('Received order data:', orderData);
    
    // Save the order to the database
    const ordersCollection = await getCollection('orders');
    
    // Create a new order document
    const newOrder = {
      ...orderData,
      createdAt: new Date(),
      updatedAt: new Date(),
      status: orderData.status || 'pending',
      paymentStatus: orderData.paymentStatus || 'pending'
    };
    
    const result = await ordersCollection.insertOne(newOrder);
    
    console.log('Order saved successfully with ID:', result.insertedId);
    
    return NextResponse.json({ 
      success: true, 
      orderId: result.insertedId.toString(),
      message: 'Order saved successfully'
    });
    
  } catch (error) {
    console.error('Error saving order:', error);
    return NextResponse.json({
      error: 'Failed to save order',
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const ordersCollection = await getCollection('orders');

    let query = {};
    if (userId) {
      query.userId = userId;
    }

    const orders = await ordersCollection.find(query).sort({ createdAt: -1 }).toArray();

    return NextResponse.json({
      success: true,
      orders: orders
    });

  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
} 