import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  console.log('🔍 DEBUG: ===== SERVER-SIDE PAYPAL ORDER CREATION START =====');
  
  try {
    const body = await request.json();
    console.log('🔍 DEBUG: Request body:', body);
    
    const { amount, currency = 'USD' } = body;

    console.log('🔍 DEBUG: Amount:', amount);
    console.log('🔍 DEBUG: Currency:', currency);

    if (!amount || amount <= 0) {
      console.error('❌ DEBUG: Invalid amount:', amount);
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      );
    }

    const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    const paypalClientSecret = process.env.PAYPAL_CLIENT_SECRET;
    const paypalEnv = process.env.PAYPAL_ENV || 'sandbox';

    console.log('🔍 DEBUG: PayPal Client ID:', paypalClientId ? paypalClientId.substring(0, 10) + '...' : 'NOT SET');
    console.log('🔍 DEBUG: PayPal Client Secret:', paypalClientSecret ? 'SET' : 'NOT SET');
    console.log('🔍 DEBUG: PayPal Environment:', paypalEnv);

    // Enhanced environment variable validation
    const missingVars = [];
    if (!paypalClientId) missingVars.push('NEXT_PUBLIC_PAYPAL_CLIENT_ID');
    if (!paypalClientSecret) missingVars.push('PAYPAL_CLIENT_SECRET');
    
    if (missingVars.length > 0) {
      console.error('❌ DEBUG: Missing PayPal environment variables:', missingVars);
      console.error('❌ DEBUG: Please set the following environment variables in your .env.local file:');
      missingVars.forEach(varName => {
        console.error(`❌ DEBUG: - ${varName}`);
      });
      console.error('❌ DEBUG: See PAYPAL_ENV_SETUP.md for setup instructions');
      
      return NextResponse.json(
        { 
          error: 'PayPal not configured', 
          details: `Missing environment variables: ${missingVars.join(', ')}`,
          setup_instructions: 'Please check PAYPAL_ENV_SETUP.md for setup instructions'
        },
        { status: 500 }
      );
    }

    const baseUrl = paypalEnv === 'sandbox' 
      ? 'https://api-m.sandbox.paypal.com' 
      : 'https://api-m.paypal.com';

    console.log('🔍 DEBUG: PayPal API Base URL:', baseUrl);

    // Get access token
    console.log('🔍 DEBUG: Getting PayPal access token...');
    let tokenResponse;
    try {
      tokenResponse = await fetch(`${baseUrl}/v1/oauth2/token`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${Buffer.from(`${paypalClientId}:${paypalClientSecret}`).toString('base64')}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials',
      });
    } catch (fetchError) {
      console.error('❌ DEBUG: Network error getting PayPal access token:', fetchError);
      return NextResponse.json(
        { error: 'Network error connecting to PayPal', details: fetchError instanceof Error ? fetchError.message : 'Unknown network error' },
        { status: 500 }
      );
    }

    console.log('🔍 DEBUG: Token response status:', tokenResponse.status);
    console.log('🔍 DEBUG: Token response headers:', Object.fromEntries(tokenResponse.headers.entries()));

    if (!tokenResponse.ok) {
      let errorText;
      try {
        errorText = await tokenResponse.text();
        console.error('❌ DEBUG: Failed to get PayPal access token');
        console.error('❌ DEBUG: Token response error text:', errorText);
        
        // Try to parse as JSON if possible
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { raw_error: errorText };
        }
        
        return NextResponse.json(
          { error: 'Failed to authenticate with PayPal', details: errorData },
          { status: 500 }
        );
      } catch (textError) {
        console.error('❌ DEBUG: Could not read token error response:', textError);
        return NextResponse.json(
          { error: 'Failed to authenticate with PayPal', details: 'Could not read error response' },
          { status: 500 }
        );
      }
    }

    let tokenData;
    try {
      tokenData = await tokenResponse.json();
    } catch (jsonError) {
      console.error('❌ DEBUG: Could not parse token response as JSON:', jsonError);
      return NextResponse.json(
        { error: 'Invalid response from PayPal authentication', details: 'Could not parse response as JSON' },
        { status: 500 }
      );
    }

    console.log('🔍 DEBUG: Token response data:', { 
      access_token: tokenData.access_token ? 'PRESENT' : 'MISSING',
      token_type: tokenData.token_type,
      expires_in: tokenData.expires_in
    });

    const { access_token } = tokenData;

    if (!access_token) {
      console.error('❌ DEBUG: No access token received from PayPal');
      return NextResponse.json(
        { error: 'No access token received from PayPal' },
        { status: 500 }
      );
    }

    // Create order
    console.log('🔍 DEBUG: Creating PayPal order...');
    const orderData = {
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: currency,
            value: amount.toFixed(2),
          },
          description: 'UltimateEcommerce Purchase',
          custom_id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        },
      ],
      application_context: {
        shipping_preference: 'NO_SHIPPING',
        user_action: 'PAY_NOW',
        return_url: `${request.nextUrl.origin}/checkout?paypal_return=true`,
        cancel_url: `${request.nextUrl.origin}/checkout?paypal_cancel=true`,
      },
    };

    console.log('🔍 DEBUG: Order data:', orderData);

    let orderResponse;
    try {
      orderResponse = await fetch(`${baseUrl}/v2/checkout/orders`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${access_token}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation',
        },
        body: JSON.stringify(orderData),
      });
    } catch (fetchError) {
      console.error('❌ DEBUG: Network error creating PayPal order:', fetchError);
      return NextResponse.json(
        { error: 'Network error creating PayPal order', details: fetchError instanceof Error ? fetchError.message : 'Unknown network error' },
        { status: 500 }
      );
    }

    console.log('🔍 DEBUG: Order response status:', orderResponse.status);
    console.log('🔍 DEBUG: Order response headers:', Object.fromEntries(orderResponse.headers.entries()));

    if (!orderResponse.ok) {
      let errorData;
      try {
        const errorText = await orderResponse.text();
        console.error('❌ DEBUG: PayPal order creation failed');
        console.error('❌ DEBUG: Order response error text:', errorText);
        
        // Try to parse as JSON if possible
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { raw_error: errorText };
        }
        
        return NextResponse.json(
          { error: 'Failed to create PayPal order', details: errorData },
          { status: orderResponse.status }
        );
      } catch (textError) {
        console.error('❌ DEBUG: Could not read order error response:', textError);
        return NextResponse.json(
          { error: 'Failed to create PayPal order', details: 'Could not read error response' },
          { status: 500 }
        );
      }
    }

    let order;
    try {
      order = await orderResponse.json();
    } catch (jsonError) {
      console.error('❌ DEBUG: Could not parse order response as JSON:', jsonError);
      return NextResponse.json(
        { error: 'Invalid response from PayPal order creation', details: 'Could not parse response as JSON' },
        { status: 500 }
      );
    }

    console.log('✅ DEBUG: PayPal order created successfully');
    console.log('✅ DEBUG: Order ID:', order.id);
    console.log('✅ DEBUG: Order status:', order.status);
    console.log('✅ DEBUG: Order links count:', order.links?.length || 0);

    const response = {
      orderId: order.id,
      status: order.status,
      links: order.links,
    };

    console.log('🔍 DEBUG: Returning response:', response);
    return NextResponse.json(response);

  } catch (error) {
    console.error('❌ DEBUG: Error creating PayPal order:', error);
    console.error('❌ DEBUG: Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      name: error instanceof Error ? error.name : 'Unknown',
      stack: error instanceof Error ? error.stack : 'No stack trace'
    });
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 