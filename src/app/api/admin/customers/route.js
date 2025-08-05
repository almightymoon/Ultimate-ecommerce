import { NextResponse } from 'next/server';
import { getCollection } from '@/lib/database';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 20;
    const search = searchParams.get('search') || '';
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    const customersCollection = await getCollection('users');

    // Build query
    let query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }

    // Build sort
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Get total count
    const total = await customersCollection.countDocuments(query);

    // Get customers with pagination
    const customers = await customersCollection
      .find(query)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    return NextResponse.json({
      success: true,
      customers,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Error fetching customers:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const customerData = await request.json();
    const customersCollection = await getCollection('users');

    // Check if customer already exists
    const existingCustomer = await customersCollection.findOne({ 
      email: customerData.email 
    });

    if (existingCustomer) {
      return NextResponse.json(
        { success: false, message: 'Customer with this email already exists' },
        { status: 400 }
      );
    }

    const newCustomer = {
      name: customerData.name,
      email: customerData.email,
      phone: customerData.phone || '',
      address: customerData.address || {},
      totalOrders: 0,
      totalSpent: 0,
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Insert customer
    const result = await customersCollection.insertOne(newCustomer);

    return NextResponse.json({
      success: true,
      message: 'Customer created successfully',
      customer: {
        id: result.insertedId,
        name: newCustomer.name,
        email: newCustomer.email
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating customer:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
} 