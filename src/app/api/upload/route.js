import { NextRequest, NextResponse } from 'next/server';
import { uploadImage, uploadMultipleImages } from '@/lib/cloudinary';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('images');
    const folder = formData.get('folder') || 'ultimate-ecommerce';

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No images provided' },
        { status: 400 }
      );
    }

    // Convert files to base64 strings
    const imagePromises = files.map(async (file) => {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const base64 = buffer.toString('base64');
      const dataURI = `data:${file.type};base64,${base64}`;
      return dataURI;
    });

    const imageDataURIs = await Promise.all(imagePromises);

    // Upload images to Cloudinary
    let uploadResults;
    if (imageDataURIs.length === 1) {
      uploadResults = await uploadImage(imageDataURIs[0], folder);
      uploadResults = [uploadResults];
    } else {
      uploadResults = await uploadMultipleImages(imageDataURIs, folder);
    }

    // Filter successful uploads
    const successfulUploads = uploadResults.filter(result => result.success);
    const failedUploads = uploadResults.filter(result => !result.success);

    if (successfulUploads.length === 0) {
      return NextResponse.json(
        { error: 'Failed to upload images' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      uploaded: successfulUploads,
      failed: failedUploads,
      message: `Successfully uploaded ${successfulUploads.length} image(s)`
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Image upload endpoint. Use POST method with form data containing images.'
  });
} 