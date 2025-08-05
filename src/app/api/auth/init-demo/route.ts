import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/lib/database';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const usersCollection = await getCollection('users');

    // Check if demo user already exists
    const existingUser = await usersCollection.findOne({ email: 'demo@ultimate.com' });

    if (existingUser) {
      return NextResponse.json({
        message: 'Demo user already exists',
        user: {
          email: 'demo@ultimate.com',
          password: 'demo123456'
        }
      });
    }

    // Create demo user
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash('demo123456', saltRounds);

    const demoUser = {
      name: 'Demo User',
      email: 'demo@ultimate.com',
      password: hashedPassword,
      role: 'user',
      preferences: {
        theme: 'light',
        notifications: true,
        marketing: false,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await usersCollection.insertOne(demoUser);

    return NextResponse.json({
      message: 'Demo user created successfully',
      user: {
        email: 'demo@ultimate.com',
        password: 'demo123456'
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Demo user creation error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 