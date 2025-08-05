import { NextResponse } from 'next/server';
import { getCollection } from '@/lib/database';

export async function DELETE(request) {
  try {
    const { userIds } = await request.json();
    console.log('Attempting to bulk delete users:', userIds);
    
    const usersCollection = await getCollection('users');

    if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
      return NextResponse.json(
        { success: false, message: 'No user IDs provided' },
        { status: 400 }
      );
    }

    // First, find all users to get their MongoDB _id values
    const users = await usersCollection.find({
      $or: [
        { id: { $in: userIds } },
        { _id: { $in: userIds } },
        { email: { $in: userIds } }
      ]
    }).toArray();

    if (users.length === 0) {
      console.log('No users found to delete');
      return NextResponse.json(
        { success: false, message: 'No users found to delete' },
        { status: 404 }
      );
    }

    console.log('Found users to delete:', users.map(u => ({ id: u.id, email: u.email })));

    // Extract MongoDB _id values
    const mongoIds = users.map(user => user._id);

    // Delete multiple users using MongoDB _id
    const result = await usersCollection.deleteMany({ _id: { $in: mongoIds } });

    console.log('Bulk delete result:', result);

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, message: 'Failed to delete users' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `${result.deletedCount} user${result.deletedCount !== 1 ? 's' : ''} deleted successfully`
    });

  } catch (error) {
    console.error('Error bulk deleting users:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error: ' + error.message },
      { status: 500 }
    );
  }
} 