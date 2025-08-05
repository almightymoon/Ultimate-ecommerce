import { NextResponse } from 'next/server';
import { getCollection } from '@/lib/database';

export async function POST(request) {
  try {
    const { userId, newRole } = await request.json();

    if (!userId || !newRole) {
      return NextResponse.json(
        { success: false, message: 'User ID and new role are required' },
        { status: 400 }
      );
    }

    // Validate role
    const validRoles = ['user', 'admin', 'super-admin'];
    if (!validRoles.includes(newRole)) {
      return NextResponse.json(
        { success: false, message: 'Invalid role. Must be user, admin, or super-admin' },
        { status: 400 }
      );
    }

    const usersCollection = await getCollection('users');

    // Find user by email or ID
    let user;
    if (userId.includes('@')) {
      // Search by email
      user = await usersCollection.findOne({ email: userId });
    } else {
      // Search by ID
      user = await usersCollection.findOne({ id: userId });
    }

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    // Update user role
    const result = await usersCollection.updateOne(
      { _id: user._id },
      { 
        $set: { 
          role: newRole,
          updatedAt: new Date()
        } 
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `User role updated to ${newRole} successfully`,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: newRole
      }
    });

  } catch (error) {
    console.error('Error updating user role:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
} 