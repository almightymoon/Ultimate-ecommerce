import { NextResponse } from 'next/server';

export async function GET() {
  console.log('🧪 Admin auth test route called');
  return NextResponse.json({
    success: true,
    message: 'Admin auth test route is working'
  });
}

export async function POST(request) {
  console.log('🧪 Admin auth test POST route called');
  const body = await request.json();
  console.log('📝 Request body:', body);
  
  return NextResponse.json({
    success: true,
    message: 'Admin auth test POST route is working',
    receivedData: body
  });
} 