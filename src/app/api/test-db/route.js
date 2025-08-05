import { NextResponse } from 'next/server';
import { getCollection } from '@/lib/database';

export async function GET() {
  try {
    console.log('🔍 Testing database connection...');
    
    const usersCollection = await getCollection('users');
    console.log('📊 Users collection obtained');
    
    const userCount = await usersCollection.countDocuments();
    console.log('👥 User count:', userCount);
    
    const adminUser = await usersCollection.findOne({ email: 'almightymooon@gmail.com' });
    console.log('👤 Admin user found:', adminUser ? 'Yes' : 'No');
    
    if (adminUser) {
      console.log('🔑 Admin user role:', adminUser.role);
      console.log('🔐 Admin user has password:', !!adminUser.password);
    }
    
    return NextResponse.json({
      success: true,
      userCount,
      adminUser: adminUser ? {
        email: adminUser.email,
        role: adminUser.role,
        hasPassword: !!adminUser.password
      } : null
    });
  } catch (error) {
    console.error('🚨 Database test error:', error);
    return NextResponse.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
} 