import { NextResponse } from 'next/server';
import { getCollection } from '@/lib/database';
import { ObjectId } from 'mongodb';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const categoriesCollection = await getCollection('categories');
    
    const category = await categoriesCollection.findOne({ _id: new ObjectId(id) });
    
    if (!category) {
      return NextResponse.json(
        { success: false, message: 'Category not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      category
    });
  } catch (error) {
    console.error('Error fetching category:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch category' },
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const { name, description, image, slug } = await request.json();
    
    const categoriesCollection = await getCollection('categories');
    
    // Check if category exists
    const existingCategory = await categoriesCollection.findOne({ _id: new ObjectId(id) });
    if (!existingCategory) {
      return NextResponse.json(
        { success: false, message: 'Category not found' },
        { status: 404 }
      );
    }
    
    // Check if slug is being changed and if it conflicts with another category
    if (slug && slug !== existingCategory.slug) {
      const slugConflict = await categoriesCollection.findOne({ 
        slug, 
        _id: { $ne: new ObjectId(id) } 
      });
      if (slugConflict) {
        return NextResponse.json(
          { success: false, message: 'Category with this slug already exists' },
          { status: 400 }
        );
      }
    }
    
    const updateData = {
      ...(name && { name }),
      ...(description !== undefined && { description }),
      ...(image !== undefined && { image }),
      ...(slug && { slug }),
      updatedAt: new Date()
    };
    
    const result = await categoriesCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json(
        { success: false, message: 'Category not found' },
        { status: 404 }
      );
    }
    
    // Fetch the updated category
    const updatedCategory = await categoriesCollection.findOne({ _id: new ObjectId(id) });
    
    return NextResponse.json({
      success: true,
      message: 'Category updated successfully',
      category: updatedCategory
    });
  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to update category' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const categoriesCollection = await getCollection('categories');
    
    const result = await categoriesCollection.deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, message: 'Category not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: 'Category deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to delete category' },
      { status: 500 }
    );
  }
} 