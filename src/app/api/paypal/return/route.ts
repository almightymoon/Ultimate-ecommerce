import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');
  const payerId = searchParams.get('PayerID');

  console.log('🔍 DEBUG: PayPal return with token:', token);
  console.log('🔍 DEBUG: PayPal return with PayerID:', payerId);

  if (!token) {
    return NextResponse.json({ error: 'No token provided' }, { status: 400 });
  }

  try {
    // Capture the payment
    const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    const paypalClientSecret = process.env.PAYPAL_CLIENT_SECRET;
    const paypalEnv = process.env.PAYPAL_ENV || 'sandbox';
    const baseUrl = paypalEnv === 'sandbox' 
      ? 'https://api-m.sandbox.paypal.com' 
      : 'https://api-m.paypal.com';

    console.log('🔍 DEBUG: Capturing PayPal payment for token:', token);

    // Get access token
    const tokenResponse = await fetch(`${baseUrl}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(`${paypalClientId}:${paypalClientSecret}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    if (!tokenResponse.ok) {
      throw new Error('Failed to get PayPal access token');
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Capture the payment
    const captureResponse = await fetch(`${baseUrl}/v2/checkout/orders/${token}/capture`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!captureResponse.ok) {
      throw new Error('Failed to capture PayPal payment');
    }

    const captureData = await captureResponse.json();
    console.log('✅ DEBUG: PayPal payment captured successfully:', captureData);

    return NextResponse.json({
      success: true,
      orderId: token,
      captureData
    });

  } catch (error) {
    console.error('❌ DEBUG: PayPal capture error:', error);
    return NextResponse.json(
      { error: 'Failed to capture payment', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 