import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { getCollection } from '@/lib/database';
import { ObjectId } from 'mongodb';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function GET(request) {
  try {
    // Get token from cookie first
    let token = request.cookies.get('adminToken')?.value;
    
    // If no cookie token, try Authorization header
    if (!token) {
      const authHeader = request.headers.get('authorization');
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7);
      }
    }

    if (!token) {
      return NextResponse.json(
        { success: false, message: 'No token provided' },
        { status: 401 }
      );
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Check if this is an admin token
    if (!decoded.isAdmin) {
      return NextResponse.json(
        { success: false, message: 'Admin access required' },
        { status: 403 }
      );
    }

    // Get fresh user data from database
    const usersCollection = await getCollection('users');
    
    // Convert string userId to ObjectId
    let user;
    try {
      user = await usersCollection.findOne({ _id: new ObjectId(decoded.userId) });
    } catch (error) {
      // If ObjectId conversion fails, try finding by email as fallback
      user = await usersCollection.findOne({ email: decoded.email });
    }

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    // Check if user still has admin role
    if (!['admin', 'super-admin'].includes(user.role)) {
      return NextResponse.json(
        { success: false, message: 'Admin privileges revoked' },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user._id.toString(),
        email: user.email,
        role: user.role,
        name: user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : (user.name || user.email)
      }
    });
  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json(
      { success: false, message: 'Invalid token' },
      { status: 401 }
    );
  }
} 