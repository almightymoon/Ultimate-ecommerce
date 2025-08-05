import { NextResponse } from 'next/server';
import { getCollection } from '@/lib/database';

export async function GET() {
  try {
    const usersCollection = await getCollection('users');
    
    // Get a few sample users to see their structure
    const sampleUsers = await usersCollection.find({}).limit(3).toArray();
    
    // Get total count
    const totalUsers = await usersCollection.countDocuments();
    
    return NextResponse.json({
      success: true,
      totalUsers,
      sampleUsers: sampleUsers.map(user => ({
        _id: user._id,
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      }))
    });

  } catch (error) {
    console.error('Error in test endpoint:', error);
    return NextResponse.json(
      { success: false, message: 'Error: ' + error.message },
      { status: 500 }
    );
  }
} 