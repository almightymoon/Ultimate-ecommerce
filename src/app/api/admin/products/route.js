import { NextRequest, NextResponse } from 'next/server';
import { getCollection } from '@/lib/database';

export async function POST(request) {
  try {
    const productData = await request.json();

    // Validate required fields
    if (!productData.name || !productData.price || !productData.categoryId || !productData.images) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get products collection
    const productsCollection = await getCollection('products');

    // Generate unique ID
    const productId = `prod-${Date.now()}`;

    // Create product document
    const newProduct = {
      id: productId,
      name: productData.name,
      description: productData.description,
      price: productData.price,
      originalPrice: productData.originalPrice || null,
      category: productData.category,
      categoryId: productData.categoryId,
      images: productData.images, // Cloudinary URLs
      stock: productData.stock || 0,
      sold: productData.sold || 0,
      rating: productData.rating || 0,
      reviews: productData.reviews || 0,
      badge: productData.badge || null,
      discount: productData.discount || 0,
      featured: productData.featured || false,
      status: productData.status || 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Insert product
    const result = await productsCollection.insertOne(newProduct);

    return NextResponse.json({
      success: true,
      message: 'Product created successfully',
      product: {
        id: newProduct.id,
        name: newProduct.name,
        price: newProduct.price,
        images: newProduct.images
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 20;
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    const productsCollection = await getCollection('products');

    // Build query
    let query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }
    if (category) {
      query.categoryId = category;
    }

    // Build sort
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Get total count
    const total = await productsCollection.countDocuments(query);

    // Get products with pagination
    const products = await productsCollection
      .find(query)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    return NextResponse.json({
      success: true,
      products,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    const productsCollection = await getCollection('products');
    
    // Delete all products
    const result = await productsCollection.deleteMany({});
    
    return NextResponse.json({
      success: true,
      message: `Deleted ${result.deletedCount} products`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.error('Error deleting products:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 