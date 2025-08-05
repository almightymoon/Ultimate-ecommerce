import { NextResponse } from 'next/server';
import { getCollection } from '@/lib/database';
import bcrypt from 'bcryptjs';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const usersCollection = await getCollection('users');

    const user = await usersCollection.findOne({ id: id });

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    // Remove password from response
    const { password, ...safeUser } = user;

    return NextResponse.json({
      success: true,
      user: safeUser
    });

  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const userData = await request.json();
    const usersCollection = await getCollection('users');

    // Check if user exists
    const existingUser = await usersCollection.findOne({ id: id });

    if (!existingUser) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    // Prepare update data
    const updateData = {
      ...userData,
      updatedAt: new Date()
    };

    // Hash password if provided
    if (userData.password) {
      updateData.password = await bcrypt.hash(userData.password, 10);
    }

    // Update user
    const result = await usersCollection.updateOne(
      { id: id },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'User updated successfully'
    });

  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    console.log('Attempting to delete user with ID:', id);
    
    const usersCollection = await getCollection('users');

    // Try to find the user first to get more information
    const user = await usersCollection.findOne({ 
      $or: [
        { id: id },
        { _id: id },
        { email: id } // Fallback to email if id is actually an email
      ]
    });

    if (!user) {
      console.log('User not found with ID:', id);
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    console.log('Found user to delete:', { id: user.id, email: user.email });

    // Delete using the actual _id from MongoDB
    const result = await usersCollection.deleteOne({ _id: user._id });

    if (result.deletedCount === 0) {
      console.log('Delete operation failed for user:', id);
      return NextResponse.json(
        { success: false, message: 'Failed to delete user' },
        { status: 500 }
      );
    }

    console.log('Successfully deleted user:', id);
    return NextResponse.json({
      success: true,
      message: 'User deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error: ' + error.message },
      { status: 500 }
    );
  }
} 