import { NextResponse } from 'next/server';
import { getCollection } from '@/lib/database';

export async function GET() {
  try {
    const categoriesCollection = await getCollection('categories');
    const categories = await categoriesCollection.find({}).toArray();
    
    return NextResponse.json({
      success: true,
      categories: categories
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { name, description, image, slug } = await request.json();
    
    if (!name || !slug) {
      return NextResponse.json(
        { success: false, message: 'Name and slug are required' },
        { status: 400 }
      );
    }

    const categoriesCollection = await getCollection('categories');
    
    // Check if category with same slug already exists
    const existingCategory = await categoriesCollection.findOne({ slug });
    if (existingCategory) {
      return NextResponse.json(
        { success: false, message: 'Category with this slug already exists' },
        { status: 400 }
      );
    }

    const newCategory = {
      name,
      description: description || '',
      image: image || '',
      slug,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await categoriesCollection.insertOne(newCategory);
    
    return NextResponse.json({
      success: true,
      category: { ...newCategory, _id: result.insertedId }
    });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create category' },
      { status: 500 }
    );
  }
} 