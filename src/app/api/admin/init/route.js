import { NextResponse } from 'next/server';
import { getCollection, sampleData } from '@/lib/database';

// POST /api/admin/init - Initialize database with sample data
export async function POST() {
  try {
    const collections = ['categories', 'products', 'users', 'settings', 'deals', 'customers', 'orders'];
    
    for (const collectionName of collections) {
      const collection = await getCollection(collectionName);
      
      // Check if collection already has data
      const existingData = await collection.countDocuments();
      if (existingData > 0) {
        console.log(`Collection ${collectionName} already has data, skipping...`);
        continue;
      }
      
      // Insert sample data
      if (sampleData[collectionName]) {
        const result = await collection.insertMany(sampleData[collectionName]);
        console.log(`Inserted ${result.insertedCount} documents into ${collectionName}`);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Database initialized successfully with sample data'
    });
  } catch (error) {
    console.error('Error initializing database:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to initialize database' },
      { status: 500 }
    );
  }
} 