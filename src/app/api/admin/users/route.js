import { NextResponse } from 'next/server';
import { getCollection } from '@/lib/database';
import bcrypt from 'bcryptjs';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 20;
    const role = searchParams.get('role') || '';

    const usersCollection = await getCollection('users');

    // Build query
    let query = {};
    if (role) {
      query.role = role;
    }

    // Get total count
    const total = await usersCollection.countDocuments(query);

    // Get users with pagination
    const users = await usersCollection
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    // Remove password from response
    const safeUsers = users.map(user => {
      const { password, ...safeUser } = user;
      return safeUser;
    });

    return NextResponse.json({
      success: true,
      users: safeUsers,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const userData = await request.json();
    const usersCollection = await getCollection('users');

    // Check if user already exists
    const existingUser = await usersCollection.findOne({ 
      email: userData.email 
    });

    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Generate user ID
    const userId = `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const newUser = {
      id: userId,
      email: userData.email,
      password: hashedPassword,
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      role: userData.role || 'user', // user, admin, super-admin
      avatar: userData.avatar || '👤',
      isActive: true,
      emailVerified: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Insert user
    const result = await usersCollection.insertOne(newUser);

    // Return user without password
    const { password, ...safeUser } = newUser;

    return NextResponse.json({
      success: true,
      message: 'User created successfully',
      user: safeUser
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
} 